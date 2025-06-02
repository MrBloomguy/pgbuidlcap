import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useContracts } from './useContracts';
import type { Comment } from '../types/contracts';

export function useSocialInteractions(domainId: number) {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [upvoteCount, setUpvoteCount] = React.useState(0);
  const [hasUserUpvoted, setHasUserUpvoted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { address } = useAccount();
  const { contracts } = useContracts();

  const loadComments = useCallback(async () => {
    if (!contracts?.socialInteractions) return;
    
    try {
      const comments = await contracts.socialInteractions.getComments(domainId);
      setComments(comments);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  }, [contracts?.socialInteractions, domainId]);

  const loadUpvotes = useCallback(async () => {
    if (!contracts?.socialInteractions || !address) return;
    
    try {
      const [count, hasUpvoted] = await Promise.all([
        contracts.socialInteractions.getDomainUpvoteCount(domainId),
        contracts.socialInteractions.hasUpvoted(domainId, address)
      ]);
      setUpvoteCount(count);
      setHasUserUpvoted(hasUpvoted);
    } catch (error) {
      console.error("Failed to load upvotes:", error);
    }
  }, [contracts?.socialInteractions, domainId, address]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([loadComments(), loadUpvotes()]);
    setIsLoading(false);
  }, [loadComments, loadUpvotes]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addComment = async (content: string) => {
    if (!contracts?.socialInteractions) return;
    
    try {
      await contracts.socialInteractions.addComment(domainId, content);
      await loadComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    }
  };

  const addReply = async (parentCommentId: number, content: string) => {
    if (!contracts?.socialInteractions) return;
    
    try {
      await contracts.socialInteractions.addReply(domainId, parentCommentId, content);
      await loadComments();
    } catch (error) {
      console.error("Failed to add reply:", error);
      throw error;
    }
  };

  const likeComment = async (commentId: number) => {
    if (!contracts?.socialInteractions) return;
    
    try {
      await contracts.socialInteractions.likeComment(domainId, commentId);
      await loadComments();
    } catch (error) {
      console.error("Failed to like comment:", error);
      throw error;
    }
  };

  const upvote = async (content: string = "") => {
    if (!contracts?.socialInteractions) return;
    
    try {
      await contracts.socialInteractions.upvoteDomain(domainId, content);
      await loadUpvotes();
    } catch (error) {
      console.error("Failed to upvote:", error);
      throw error;
    }
  };

  return {
    comments,
    upvoteCount,
    hasUserUpvoted,
    isLoading,
    addComment,
    addReply,
    likeComment,
    upvote,
    refresh: loadData
  };
}
