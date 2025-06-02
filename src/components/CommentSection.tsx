import React, { useEffect, useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardBody, Button, Textarea, Avatar, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSocialInteractions } from '../contexts/SocialInteractionsContext';
import { Comment } from '../types/social';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentSectionProps {
  domainId: string;
}

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, onLike }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 py-3 hover:bg-default-100 rounded-lg px-3 transition-colors group"
    >
      <Avatar
        src={comment.author.avatar}
        fallback={comment.author.address.substring(0, 2)}
        className="w-8 h-8 text-xs bg-primary text-primary-foreground"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium hover:text-primary transition-colors">
            {comment.author.ensName || 
             `${comment.author.address.substring(0, 6)}...${comment.author.address.substring(-4)}`}
          </span>
          <span className="text-xs text-default-400">
            {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
              Math.floor((new Date(comment.timestamp).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
              'day'
            )}
          </span>
        </div>
        <p className="text-sm mb-2 whitespace-pre-wrap">{comment.content}</p>
        <div className="flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant={comment.hasLiked ? "flat" : "light"}
            color={comment.hasLiked ? "primary" : "default"}
            startContent={
              <Icon 
                icon={comment.hasLiked ? "lucide:heart-fill" : "lucide:heart"} 
                className={comment.hasLiked ? "text-primary-foreground" : ""}
              />
            }
            onClick={() => onLike(comment.id)}
            className="transition-all duration-200 hover:scale-105"
          >
            {comment.likes || 0}
          </Button>
          <Button
            size="sm"
            variant="light"
            startContent={<Icon icon="lucide:message-circle" />}
            onClick={() => onReply(comment.id)}
            className="transition-all duration-200 hover:scale-105"
          >
            Reply
          </Button>
        </div>
        <AnimatePresence>
        {comment.replies && comment.replies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 mt-3 border-l-2 pl-4 border-primary/20">
            {comment.replies.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onLike={onLike}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ domainId }) => {
  const { address } = useAccount();
  const [newComment, setNewComment] = React.useState('');
  const [replyTo, setReplyTo] = React.useState<string | null>(null);
  const {
    comments,
    isLoading,
    loadComments,
    addComment,
    addReply,
    likeComment,
    loadDomainInteractions,
  } = useSocialInteractions();

  useEffect(() => {
    loadComments(domainId);
    loadDomainInteractions(domainId);
  }, [domainId, loadComments, loadDomainInteractions]);

  const handleSubmitComment = async () => {
    if (!address) {
      toast.error('Please connect your wallet to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      if (replyTo) {
        await addReply(domainId, replyTo, newComment);
      } else {
        await addComment(domainId, newComment);
      }
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleReply = (commentId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to reply');
      return;
    }
    setReplyTo(commentId);
  };

  const handleLike = async (commentId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to like comments');
      return;
    }
    await likeComment(commentId);
  };

  const domainComments = comments[domainId] || [];

  return (
    <Card className="mt-6">
      <CardBody className="space-y-4">
        <h3 className="text-lg font-semibold">Comments</h3>
        
        <div className="space-y-2">
          {replyTo && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg"
            >
              <Icon icon="lucide:corner-up-left" className="text-primary" />
              <span className="text-sm">Replying to comment</span>
              <Button
                size="sm"
                variant="light"
                onClick={() => setReplyTo(null)}
                isIconOnly
                className="ml-auto"
              >
                <Icon icon="lucide:x" />
              </Button>
            </motion.div>
          )}
          <Textarea
            placeholder={replyTo ? "Write a reply..." : "Share your thoughts..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            minRows={2}
            className="focus:border-primary"
          />
          <div className="flex justify-end items-center gap-2">
            <Button
              color="primary"
              size="sm"
              onClick={handleSubmitComment}
              isDisabled={!address || !newComment.trim()}
              startContent={<Icon icon={replyTo ? "lucide:corner-up-left" : "lucide:message-circle"} />}
            >
              {replyTo ? 'Reply' : 'Comment'}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {isLoading[`comments:${domainId}`] ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 gap-4"
              >
                <Spinner size="lg" color="primary" />
                <span className="text-sm text-default-400">Loading comments...</span>
              </motion.div>
            ) : domainComments.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {domainComments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    onLike={handleLike}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 gap-4"
              >
                <Icon icon="lucide:message-circle" className="w-12 h-12 text-default-300" />
                <p className="text-center text-default-400">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardBody>
    </Card>
  );
};
