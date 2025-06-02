import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { Comment, DomainInteraction } from '../types/social';
import { supabase } from '../utils/supabase';
import { toast } from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface SocialInteractionsContextType {
  // Comments
  comments: Record<string, Comment[]>;
  addComment: (domainId: string, content: string) => Promise<void>;
  addReply: (domainId: string, parentCommentId: string, content: string) => Promise<void>;
  likeComment: (domainId: string, commentId: string) => Promise<void>;
  
  // Upvotes
  upvotedDomains: Set<string>;
  upvotedDomainCounts: Record<string, number>;
  upvoteDomain: (domainId: string) => Promise<void>;
  
  // Loading states
  isLoading: Record<string, boolean>;
  loadComments: (domainId: string) => Promise<void>;
  loadDomainInteractions: (domainId: string) => Promise<void>;
  loadUserInteractions: () => Promise<void>;
}

const SocialInteractionsContext = createContext<SocialInteractionsContextType | null>(null);

export const SocialInteractionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [upvotedDomains, setUpvotedDomains] = useState<Set<string>>(new Set());
  const [upvotedDomainCounts, setUpvotedDomainCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  // Ref to store active subscriptions
  const subscriptions = useRef<Record<string, RealtimeChannel>>({});

  // Function to subscribe to a domain's real-time updates
  const subscribeToDomain = useCallback((domainId: string) => {
    // Unsubscribe from any existing subscription for this domain
    if (subscriptions.current[domainId]) {
      subscriptions.current[domainId].unsubscribe();
    }

    // Subscribe to comments
    const commentsSub = supabase
      .channel(`comments:${domainId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comments',
        filter: `domain_id=eq.${domainId}`
      }, async (payload) => {
        if (payload.eventType === 'INSERT') {
          const newComment = payload.new as any;
          setComments(prev => ({
            ...prev,
            [domainId]: [...(prev[domainId] || []), {
              id: newComment.id,
              domainId: newComment.domain_id,
              author: {
                address: newComment.author_address,
              },
              content: newComment.content,
              timestamp: new Date(newComment.created_at).getTime(),
              likes: newComment.likes_count || 0,
            }]
          }));
        } else if (payload.eventType === 'DELETE') {
          setComments(prev => ({
            ...prev,
            [domainId]: prev[domainId]?.filter(comment => comment.id !== payload.old.id) || []
          }));
        } else if (payload.eventType === 'UPDATE') {
          setComments(prev => ({
            ...prev,
            [domainId]: prev[domainId]?.map(comment => 
              comment.id === payload.new.id 
                ? { ...comment, likes: payload.new.likes_count || 0 }
                : comment
            ) || []
          }));
        }
      })
      .subscribe();

    // Subscribe to upvotes
    const upvotesSub = supabase
      .channel(`upvotes:${domainId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'domain_upvotes',
        filter: `domain_id=eq.${domainId}`
      }, async (payload) => {
        // Update upvote count
        const { count } = await supabase
          .from('domain_upvotes')
          .select('*', { count: 'exact' })
          .eq('domain_id', domainId);

        setUpvotedDomainCounts(prev => ({
          ...prev,
          [domainId]: count || 0
        }));

        // Update user's upvoted status if relevant
        if (address) {
          if (payload.eventType === 'INSERT' && payload.new.user_address === address) {
            setUpvotedDomains(prev => new Set([...prev, domainId]));
          } else if (payload.eventType === 'DELETE' && payload.old.user_address === address) {
            setUpvotedDomains(prev => {
              const updated = new Set(prev);
              updated.delete(domainId);
              return updated;
            });
          }
        }
      })
      .subscribe();

    subscriptions.current[domainId] = commentsSub;
  }, [address]);

  // Cleanup subscriptions when component unmounts
  useEffect(() => {
    return () => {
      Object.values(subscriptions.current).forEach(sub => sub.unsubscribe());
    };
  }, []);

  // Load user interactions when wallet is connected
  useEffect(() => {
    if (address) {
      loadUserInteractions();
    }
  }, [address]);

  // Helper to check if an action is pending
  const isActionPending = (actionKey: string) => pendingActions.current.has(actionKey);
  const addPendingAction = (actionKey: string) => pendingActions.current.add(actionKey);
  const removePendingAction = (actionKey: string) => pendingActions.current.delete(actionKey);

  // Helper to set loading state for specific actions
  const setLoadingState = (key: string, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }));
  };

  // Load user's interactions (liked comments and upvoted domains)
  const loadUserInteractions = useCallback(async () => {
    if (!address || isActionPending('loadUserInteractions')) return;
    
    try {
      addPendingAction('loadUserInteractions');
      setLoadingState('userInteractions', true);

      const [upvotesResponse, likesResponse] = await Promise.all([
        supabase
          .from('domain_upvotes')
          .select('domain_id')
          .eq('user_address', address),
        supabase
          .from('comment_likes')
          .select('comment_id')
          .eq('user_address', address)
      ]);

      if (upvotesResponse.error) throw upvotesResponse.error;
      if (likesResponse.error) throw likesResponse.error;

      setUpvotedDomains(new Set(upvotesResponse.data.map(d => d.domain_id)));
      
      // Update comment likes in existing comments
      if (likesResponse.data.length > 0) {
        const likedCommentIds = new Set(likesResponse.data.map(l => l.comment_id));
        setComments(prev => {
          const updated = { ...prev };
          for (const domainId in updated) {
            updated[domainId] = updated[domainId].map(comment => ({
              ...comment,
              hasLiked: likedCommentIds.has(comment.id),
              replies: comment.replies?.map(reply => ({
                ...reply,
                hasLiked: likedCommentIds.has(reply.id)
              }))
            }));
          }
          return updated;
        });
      }
    } catch (error) {
      console.error('Failed to load user interactions:', error);
      toast.error('Failed to load your interactions');
    } finally {
      setLoadingState('userInteractions', false);
      removePendingAction('loadUserInteractions');
    }
  }, [address]);

  // Load comments for a domain
  const loadComments = useCallback(async (domainId: string) => {
    if (!domainId || isActionPending(`loadComments:${domainId}`)) return;

    try {
      addPendingAction(`loadComments:${domainId}`);
      setIsLoading(prev => ({ ...prev, [`comments:${domainId}`]: true }));

      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('domain_id', domainId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedComments = commentsData.map(comment => ({
        id: comment.id,
        domainId: comment.domain_id,
        author: {
          address: comment.author_address,
        },
        content: comment.content,
        timestamp: new Date(comment.created_at).getTime(),
        likes: comment.likes_count || 0,
      }));

      setComments(prev => ({
        ...prev,
        [domainId]: formattedComments,
      }));

      // Setup real-time subscription
      subscribeToDomain(domainId);
    } catch (error) {
      console.error('Failed to load comments:', error);
      toast.error('Failed to load comments');
    } finally {
      removePendingAction(`loadComments:${domainId}`);
      setIsLoading(prev => ({ ...prev, [`comments:${domainId}`]: false }));
    }
  }, [subscribeToDomain]);

  // Add a new comment
  const addComment = useCallback(async (domainId: string, content: string) => {
    if (!address) {
      toast.error('Please connect your wallet to comment');
      return;
    }
    
    const tempId = `temp-${Date.now()}`;
    const timestamp = Date.now();
    
    // Optimistically add the comment
    const optimisticComment: Comment = {
      id: tempId,
      domainId,
      author: {
        address,
      },
      content,
      timestamp,
      likes: 0,
      hasLiked: false
    };

    setComments(prev => ({
      ...prev,
      [domainId]: [optimisticComment, ...(prev[domainId] || [])]
    }));
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ 
          domain_id: domainId,
          content,
          author_address: address
        }])
        .select()
        .single();

      if (error) throw error;

      // Replace optimistic comment with real one
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId].map(c => 
          c.id === tempId ? {
            ...c,
            id: data.id,
            timestamp: new Date(data.created_at).getTime()
          } : c
        )
      }));

      toast.success('Comment added successfully');
    } catch (error) {
      // Remove optimistic comment on error
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId].filter(c => c.id !== tempId)
      }));
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    }
  }, [address]);

  // Add a reply to a comment
  const addReply = useCallback(async (domainId: string, parentCommentId: string, content: string) => {
    if (!address) {
      toast.error('Please connect your wallet to reply');
      return;
    }
    
    const tempId = `temp-reply-${Date.now()}`;
    const timestamp = Date.now();
    
    // Optimistically add the reply
    const optimisticReply: Comment = {
      id: tempId,
      domainId,
      author: {
        address,
      },
      content,
      timestamp,
      likes: 0,
      hasLiked: false
    };

    setComments(prev => {
      const updated = [...prev[domainId]];
      const parentIndex = updated.findIndex(c => c.id === parentCommentId);
      if (parentIndex > -1) {
        updated[parentIndex] = {
          ...updated[parentIndex],
          replies: [...(updated[parentIndex].replies || []), optimisticReply]
        };
      }
      return { ...prev, [domainId]: updated };
    });
    
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          domain_id: domainId,
          content,
          author_address: address,
          parent_id: parentCommentId
        }])
        .select()
        .single();

      if (error) throw error;

      // Replace optimistic reply with real one
      setComments(prev => {
        const updated = [...prev[domainId]];
        const parentIndex = updated.findIndex(c => c.id === parentCommentId);
        if (parentIndex > -1) {
          updated[parentIndex] = {
            ...updated[parentIndex],
            replies: updated[parentIndex].replies?.map(r =>
              r.id === tempId ? {
                ...r,
                id: data.id,
                timestamp: new Date(data.created_at).getTime()
              } : r
            )
          };
        }
        return { ...prev, [domainId]: updated };
      });

      toast.success('Reply added successfully');
    } catch (error) {
      // Remove optimistic reply on error
      setComments(prev => {
        const updated = [...prev[domainId]];
        const parentIndex = updated.findIndex(c => c.id === parentCommentId);
        if (parentIndex > -1) {
          updated[parentIndex] = {
            ...updated[parentIndex],
            replies: updated[parentIndex].replies?.filter(r => r.id !== tempId)
          };
        }
        return { ...prev, [domainId]: updated };
      });
      console.error('Failed to add reply:', error);
      toast.error('Failed to add reply');
    }
  }, [address]);

  // Like/unlike a comment
  const likeComment = useCallback(async (domainId: string, commentId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to like comments');
      return;
    }

    if (isActionPending(`like:${commentId}`)) return;
    
    try {
      addPendingAction(`like:${commentId}`);
      
      // Find the comment and check its current like status
      let comment: Comment | undefined;
      let parentComment: Comment | undefined;
      
      setComments(prev => {
        const updated = [...prev[domainId]];
        const parentIndex = updated.findIndex(c => c.id === commentId);
        if (parentIndex > -1) {
          comment = updated[parentIndex];
          updated[parentIndex] = {
            ...updated[parentIndex],
            hasLiked: !updated[parentIndex].hasLiked,
            likes: updated[parentIndex].likes + (updated[parentIndex].hasLiked ? -1 : 1)
          };
        } else {
          // Search in replies
          for (const c of updated) {
            const replyIndex = c.replies?.findIndex(r => r.id === commentId);
            if (replyIndex !== undefined && replyIndex > -1) {
              parentComment = c;
              comment = c.replies![replyIndex];
              updated[updated.indexOf(c)] = {
                ...c,
                replies: c.replies!.map((r, i) => i === replyIndex ? {
                  ...r,
                  hasLiked: !r.hasLiked,
                  likes: r.likes + (r.hasLiked ? -1 : 1)
                } : r)
              };
              break;
            }
          }
        }
        return { ...prev, [domainId]: updated };
      });

      if (!comment) throw new Error('Comment not found');
      
      const isUnlike = comment.hasLiked;
      
      if (isUnlike) {
        const { error } = await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_address', address);

        if (error) throw error;
        
        await supabase.rpc('decrement_comment_likes', {
          comment_id: commentId
        });
      } else {
        const { error } = await supabase
          .from('comment_likes')
          .insert([
            { comment_id: commentId, user_address: address }
          ]);

        if (error) throw error;
        
        await supabase.rpc('increment_comment_likes', {
          comment_id: commentId
        });
      }
    } catch (error) {
      // Revert optimistic update
      setComments(prev => {
        const updated = [...prev[domainId]];
        const parentIndex = updated.findIndex(c => c.id === commentId);
        if (parentIndex > -1) {
          updated[parentIndex] = {
            ...updated[parentIndex],
            hasLiked: !updated[parentIndex].hasLiked,
            likes: updated[parentIndex].likes + (updated[parentIndex].hasLiked ? 1 : -1)
          };
        } else {
          // Revert in replies
          for (const c of updated) {
            const replyIndex = c.replies?.findIndex(r => r.id === commentId);
            if (replyIndex !== undefined && replyIndex > -1) {
              updated[updated.indexOf(c)] = {
                ...c,
                replies: c.replies!.map((r, i) => i === replyIndex ? {
                  ...r,
                  hasLiked: !r.hasLiked,
                  likes: r.likes + (r.hasLiked ? 1 : -1)
                } : r)
              };
              break;
            }
          }
        }
        return { ...prev, [domainId]: updated };
      });
      console.error('Failed to update like:', error);
      toast.error('Failed to update like');
    } finally {
      removePendingAction(`like:${commentId}`);
    }
  }, [address]);

  // Upvote/unupvote a domain
  const upvoteDomain = useCallback(async (domainId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to upvote');
      return;
    }

    if (isActionPending(`upvote:${domainId}`)) return;
    
    const isUnvoting = upvotedDomains.has(domainId);
    
    // Optimistic update
    setUpvotedDomains(prev => {
      const updated = new Set(prev);
      if (isUnvoting) {
        updated.delete(domainId);
      } else {
        updated.add(domainId);
      }
      return updated;
    });

    setUpvotedDomainCounts(prev => ({
      ...prev,
      [domainId]: (prev[domainId] || 0) + (isUnvoting ? -1 : 1)
    }));
    
    try {
      addPendingAction(`upvote:${domainId}`);
      
      if (isUnvoting) {
        const { error } = await supabase
          .from('domain_upvotes')
          .delete()
          .eq('domain_id', domainId)
          .eq('user_address', address);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('domain_upvotes')
          .insert([
            { domain_id: domainId, user_address: address }
          ]);

        if (error) throw error;
      }

      toast.success(isUnvoting ? 'Upvote removed' : 'Domain upvoted successfully');
    } catch (error) {
      // Revert optimistic update
      setUpvotedDomains(prev => {
        const updated = new Set(prev);
        if (isUnvoting) {
          updated.add(domainId);
        } else {
          updated.delete(domainId);
        }
        return updated;
      });

      setUpvotedDomainCounts(prev => ({
        ...prev,
        [domainId]: (prev[domainId] || 0) + (isUnvoting ? 1 : -1)
      }));

      console.error('Failed to update upvote:', error);
      toast.error('Failed to update upvote');
    } finally {
      removePendingAction(`upvote:${domainId}`);
    }
  }, [address, upvotedDomains]);

  // Load domain interactions including upvote counts
  const loadDomainInteractions = useCallback(async (domainId: string) => {
    if (isActionPending(`loadDomainInteractions:${domainId}`)) return;
    
    try {
      addPendingAction(`loadDomainInteractions:${domainId}`);
      setLoadingState(`domainInteractions:${domainId}`, true);

      // Get total upvote count and user's upvote status
      const [{ count }, userUpvote] = await Promise.all([
        supabase
          .from('domain_upvotes')
          .select('*', { count: 'exact', head: true })
          .eq('domain_id', domainId),
        address ? supabase
          .from('domain_upvotes')
          .select('domain_id')
          .eq('domain_id', domainId)
          .eq('user_address', address)
          .maybeSingle()
        : Promise.resolve({ data: null, error: null })
      ]);

      setUpvotedDomainCounts(prev => ({
        ...prev,
        [domainId]: count || 0
      }));

      if (address && userUpvote?.data) {
        setUpvotedDomains(prev => new Set([...prev, domainId]));
      }
    } catch (error) {
      console.error('Failed to load domain interactions:', error);
      toast.error('Failed to load domain interactions');
    } finally {
      setLoadingState(`domainInteractions:${domainId}`, false);
      removePendingAction(`loadDomainInteractions:${domainId}`);
    }
  }, [address]);

  return (
    <SocialInteractionsContext.Provider
      value={{
        comments,
        addComment,
        addReply,
        likeComment,
        upvotedDomains,
        upvotedDomainCounts,
        upvoteDomain,
        isLoading,
        loadComments,
        loadDomainInteractions,
        loadUserInteractions
      }}
    >
      {children}
    </SocialInteractionsContext.Provider>
  );
};

export const useSocialInteractions = () => {
  const context = useContext(SocialInteractionsContext);
  if (!context) {
    throw new Error('useSocialInteractions must be used within a SocialInteractionsProvider');
  }
  return context;
};
