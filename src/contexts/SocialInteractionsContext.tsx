import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { Comment, DomainInteraction } from '../types/social';
import { supabase } from '../utils/supabase';
import { toast } from 'react-hot-toast';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface SocialInteractionsContextType {
  // Comments
  comments: Record<string, Comment[]>;
  addComment: (domainId: string, content: string) => Promise<void>;
  addReply: (domainId: string, parentCommentId: string, content: string) => Promise<void>;
  likeComment: (commentId: string) => Promise<void>;
  
  // Upvotes
  upvotedDomains: Set<string>;
  upvotedDomainCounts: Record<string, number>;
  upvoteDomain: (domainId: string) => Promise<void>;
  
  // Loading states
  isLoading: Record<string, boolean>;
  loadComments: (domainId: string) => Promise<void>;
  loadDomainInteractions: (domainId: string) => Promise<void>;
  loadUserInteractions: () => Promise<void>;
  subscribeToDomain: (domainId: string) => void;
}

const SocialInteractionsContext = createContext<SocialInteractionsContextType | null>(null);

export const SocialInteractionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [upvotedDomains, setUpvotedDomains] = useState<Set<string>>(new Set());
  const [upvotedDomainCounts, setUpvotedDomainCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  // Refs for managing subscriptions and pending actions
  const subscriptions = useRef<Record<string, RealtimeChannel>>({});
  const pendingActions = useRef<Set<string>>(new Set());

  const isActionPending = useCallback((actionKey: string) => pendingActions.current.has(actionKey), []);
  const addPendingAction = useCallback((actionKey: string) => pendingActions.current.add(actionKey), []);
  const removePendingAction = useCallback((actionKey: string) => pendingActions.current.delete(actionKey), []);

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
      }, async (payload: CommentChanges) => {
        if (payload.eventType === 'INSERT') {
          const newComment = payload.new;
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
              hasLiked: false,
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

    // Subscribe to comment likes
    const likesSub = supabase
      .channel(`comment-likes:${domainId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'comment_likes',
      }, async (payload: CommentLikeChanges) => {
        const commentId = payload.new?.comment_id || payload.old?.comment_id;
        const userAddress = payload.new?.user_address || payload.old?.user_address;
        
        if (!commentId || !userAddress) return;

        // Update the hasLiked state and likes count for the affected comment
        setComments(prev => ({
          ...prev,
          [domainId]: prev[domainId]?.map(comment => {
            if (comment.id === commentId) {
              const isLike = payload.eventType === 'INSERT';
              const isCurrentUser = address === userAddress;
              
              return {
                ...comment,
                hasLiked: isCurrentUser ? isLike : comment.hasLiked,
                likes: comment.likes + (isLike ? 1 : -1)
              };
            }
            // Also update any replies
            if (comment.replies?.length) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        hasLiked: address === userAddress ? isLike : reply.hasLiked,
                        likes: reply.likes + (isLike ? 1 : -1)
                      }
                    : reply
                )
              };
            }
            return comment;
          }) || []
        }));
      })
      .subscribe();

    // Store all subscriptions
    subscriptions.current[domainId] = { commentsSub, upvotesSub, commentLikesSub };
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
  }, [subscribeToDomain, isActionPending, addPendingAction, removePendingAction]);

  // Add a new comment
  const addComment = useCallback(async (domainId: string, content: string) => {
    if (!address || isActionPending(`addComment:${domainId}`)) return;

    const tempId = `temp-${Date.now()}`;
    const newComment: Comment = {
      id: tempId,
      domainId,
      author: {
        address,
      },
      content,
      timestamp: Date.now(),
      likes: 0,
    };

    try {
      addPendingAction(`addComment:${domainId}`);
      
      // Optimistic update
      setComments(prev => ({
        ...prev,
        [domainId]: [...(prev[domainId] || []), newComment],
      }));

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            domain_id: domainId,
            author_address: address,
            content,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Real update with server data
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId]?.map(comment => 
          comment.id === tempId 
            ? {
                ...comment,
                id: data.id,
                timestamp: new Date(data.created_at).getTime(),
              }
            : comment
        ) || [],
      }));

      toast.success('Comment added successfully');
    } catch (error) {
      // Revert optimistic update on error
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId]?.filter(comment => comment.id !== tempId) || [],
      }));
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    } finally {
      removePendingAction(`addComment:${domainId}`);
    }
  }, [address, isActionPending, addPendingAction, removePendingAction]);

  // Add a reply to a comment
  const addReply = useCallback(async (domainId: string, parentCommentId: string, content: string) => {
    if (!address || isActionPending(`addReply:${parentCommentId}`)) return;

    const tempId = `temp-${Date.now()}`;
    const newReply: Comment = {
      id: tempId,
      domainId,
      author: {
        address,
      },
      content,
      timestamp: Date.now(),
      likes: 0,
    };

    try {
      addPendingAction(`addReply:${parentCommentId}`);

      // Optimistic update
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId]?.map(comment => 
          comment.id === parentCommentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment
        ) || []
      }));

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            domain_id: domainId,
            parent_id: parentCommentId,
            author_address: address,
            content,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update with server data
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId]?.map(comment => 
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: (comment.replies || []).map(reply =>
                  reply.id === tempId
                    ? {
                        ...reply,
                        id: data.id,
                        timestamp: new Date(data.created_at).getTime(),
                      }
                    : reply
                )
              }
            : comment
        ) || []
      }));

      toast.success('Reply added successfully');
    } catch (error) {
      // Revert optimistic update
      setComments(prev => ({
        ...prev,
        [domainId]: prev[domainId]?.map(comment => 
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: (comment.replies || []).filter(reply => reply.id !== tempId)
              }
            : comment
        ) || []
      }));
      console.error('Failed to add reply:', error);
      toast.error('Failed to add reply');
    } finally {
      removePendingAction(`addReply:${parentCommentId}`);
    }
  }, [address, isActionPending, addPendingAction, removePendingAction]);

  // Like/unlike a comment
  const likeComment = useCallback(async (commentId: string) => {
    if (!address || isActionPending(`likeComment:${commentId}`)) return;

    try {
      addPendingAction(`likeComment:${commentId}`);

      // Check if user has already liked
      const { data: existingLike, error: checkError } = await supabase
        .from('comment_likes')
        .select()
        .eq('comment_id', commentId)
        .eq('user_address', address)
        .single();

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingLike) {
        // Unlike
        const { error: unlikeError } = await supabase
          .from('comment_likes')
          .delete()
          .eq('comment_id', commentId)
          .eq('user_address', address);

        if (unlikeError) throw unlikeError;
      } else {
        // Like
        const { error: likeError } = await supabase
          .from('comment_likes')
          .insert([
            {
              comment_id: commentId,
              user_address: address
            }
          ]);

        if (likeError) throw likeError;
      }

      toast.success(existingLike ? 'Comment unliked' : 'Comment liked');
    } catch (error) {
      console.error('Failed to toggle comment like:', error);
      toast.error('Failed to update like');
    } finally {
      removePendingAction(`likeComment:${commentId}`);
    }
  }, [address, isActionPending, addPendingAction, removePendingAction]);

  // Upvote/unvote a domain
  const upvoteDomain = useCallback(async (domainId: string) => {
    if (!address || isActionPending(`upvote:${domainId}`)) return;

    const hasUpvoted = upvotedDomains.has(domainId);
    
    try {
      addPendingAction(`upvote:${domainId}`);

      // Optimistic update
      setUpvotedDomains(prev => {
        const updated = new Set(prev);
        if (hasUpvoted) {
          updated.delete(domainId);
        } else {
          updated.add(domainId);
        }
        return updated;
      });

      setUpvotedDomainCounts(prev => ({
        ...prev,
        [domainId]: (prev[domainId] || 0) + (hasUpvoted ? -1 : 1)
      }));

      if (hasUpvoted) {
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

      toast.success(hasUpvoted ? 'Upvote removed' : 'Domain upvoted');
    } catch (error) {
      // Revert optimistic update
      setUpvotedDomains(prev => {
        const updated = new Set(prev);
        if (hasUpvoted) {
          updated.add(domainId);
        } else {
          updated.delete(domainId);
        }
        return updated;
      });

      setUpvotedDomainCounts(prev => ({
        ...prev,
        [domainId]: (prev[domainId] || 0) + (hasUpvoted ? 1 : -1)
      }));

      console.error('Failed to update upvote:', error);
      toast.error('Failed to update upvote');
    } finally {
      removePendingAction(`upvote:${domainId}`);
    }
  }, [address, upvotedDomains, isActionPending, addPendingAction, removePendingAction]);

  // Load domain interactions
  const loadDomainInteractions = useCallback(async (domainId: string) => {
    if (!domainId || isActionPending(`domainInteractions:${domainId}`)) return;

    try {
      addPendingAction(`domainInteractions:${domainId}`);
      setIsLoading(prev => ({ ...prev, [`domainInteractions:${domainId}`]: true }));

      // Get upvote count
      const { count: upvoteCount, error: countError } = await supabase
        .from('domain_upvotes')
        .select('*', { count: 'exact' })
        .eq('domain_id', domainId);

      if (countError) throw countError;

      // Check if user has upvoted
      if (address) {
        const { data: userUpvote, error: upvoteError } = await supabase
          .from('domain_upvotes')
          .select()
          .eq('domain_id', domainId)
          .eq('user_address', address)
          .single();

        if (upvoteError && upvoteError.code !== 'PGRST116') throw upvoteError;

        if (userUpvote) {
          setUpvotedDomains(prev => new Set([...prev, domainId]));
        }
      }

      setUpvotedDomainCounts(prev => ({
        ...prev,
        [domainId]: upvoteCount || 0
      }));

      // Subscribe to real-time updates
      subscribeToDomain(domainId);
    } catch (error) {
      console.error('Failed to load domain interactions:', error);
      toast.error('Failed to load domain interactions');
    } finally {
      removePendingAction(`domainInteractions:${domainId}`);
      setIsLoading(prev => ({ ...prev, [`domainInteractions:${domainId}`]: false }));
    }
  }, [address, subscribeToDomain, isActionPending, addPendingAction, removePendingAction]);

  // Load user's interactions
  const loadUserInteractions = useCallback(async () => {
    if (!address || isActionPending('userInteractions')) return;

    try {
      addPendingAction('userInteractions');
      setIsLoading(prev => ({ ...prev, userInteractions: true }));

      // Get user's upvoted domains
      const { data: upvotedData, error: upvoteError } = await supabase
        .from('domain_upvotes')
        .select('domain_id')
        .eq('user_address', address);

      if (upvoteError) throw upvoteError;

      setUpvotedDomains(new Set(upvotedData.map(item => item.domain_id)));

    } catch (error) {
      console.error('Failed to load user interactions:', error);
      toast.error('Failed to load user interactions');
    } finally {
      removePendingAction('userInteractions');
      setIsLoading(prev => ({ ...prev, userInteractions: false }));
    }
  }, [address, isActionPending, addPendingAction, removePendingAction]);

  const value = {
    comments,
    upvotedDomains,
    upvotedDomainCounts,
    isLoading,
    loadComments,
    addComment,
    addReply,
    likeComment,
    upvoteDomain,
    loadDomainInteractions,
    loadUserInteractions,
    subscribeToDomain,
  };

  return (
    <SocialInteractionsContext.Provider value={value}>
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
