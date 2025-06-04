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
  isLast?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply, onLike, isLast = false }) => {
  const formattedDate = new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.floor((new Date(comment.timestamp).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  );

  const handleReplyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onReply(comment.id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onLike(comment.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <div className="flex gap-3 py-3 px-4 hover:bg-default-100/50 transition-colors">
        <div className="flex flex-col items-center">
          <Avatar
            src={comment.author.avatar}
            fallback={comment.author.address.substring(0, 2)}
            className="w-10 h-10 text-sm bg-primary text-primary-foreground"
            radius="full"
          />
          {!isLast && (
            <div className="w-0.5 flex-1 bg-neutral-200 dark:bg-neutral-800 mt-2" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-[15px] hover:underline cursor-pointer">
              {comment.author.ensName || 
               `${comment.author.address.substring(0, 6)}...${comment.author.address.substring(-4)}`}
            </span>
            <span className="text-neutral-500 text-[15px]">·</span>
            <span className="text-neutral-500 text-[15px] hover:underline cursor-pointer">
              {formattedDate}
            </span>
          </div>
          <p className="text-[15px] whitespace-pre-wrap mt-0.5 mb-2">{comment.content}</p>
          <div className="flex items-center -ml-2">
            <Button
              className="group gap-2 h-9 px-2 text-neutral-500"
              size="sm"
              variant="light"
              onPress={handleReplyClick}
            >
              <Icon 
                icon="lucide:message-circle" 
                width={18}
                className="group-hover:text-[#1d9bf0] transition-colors"
              />
              <span className="text-sm">{comment.replies?.length || 0}</span>
            </Button>

            <Button
              className={`group gap-2 h-9 px-2 ${comment.hasLiked ? "text-[#f91880]" : "text-neutral-500"}`}
              size="sm"
              variant="light"
              onPress={handleLikeClick}
            >
              <Icon 
                icon={comment.hasLiked ? "lucide:heart-fill" : "lucide:heart"}
                width={18}
                className="group-hover:text-[#f91880] transition-colors"
              />
              <span className="text-sm">{comment.likes || 0}</span>
            </Button>
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-[52px]">
          {comment.replies.map((reply, index) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              isLast={index === comment.replies!.length - 1}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ domainId }) => {
  const { address } = useAccount();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { comments, isLoading, loadComments, addComment, addReply, likeComment } = useSocialInteractions();

  useEffect(() => {
    loadComments(domainId);
  }, [domainId, loadComments]);

  const handleSubmitComment = useCallback(async () => {
    if (!address) {
      toast.error('Please connect your wallet to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      if (replyTo) {
        await addReply(domainId, replyTo, newComment);
      } else {
        await addComment(domainId, newComment);
      }
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      toast.error('Failed to post comment');
    }
  }, [address, domainId, newComment, replyTo, addComment, addReply]);

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const handleLike = async (commentId: string) => {
    if (!address) {
      toast.error('Please connect your wallet to like comments');
      return;
    }

    try {
      await likeComment(domainId, commentId);
    } catch (error) {
      toast.error('Failed to like comment');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar
            src={address ? `https://avatar.vercel.sh/${address}` : undefined}
            fallback="?"
            className="w-10 h-10"
            radius="full"
          />
          <div className="flex-1">
            <Textarea
              placeholder="Post your reply"
              value={newComment}
              onValueChange={setNewComment}
              classNames={{
                base: "w-full",
                input: "text-[17px] min-h-[120px] p-0 border-none bg-transparent focus:ring-0 placeholder:text-neutral-500",
              }}
              minRows={2}
              maxRows={6}
            />
            {replyTo && (
              <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-default-100/50">
                <span className="text-sm text-neutral-500">Replying to comment</span>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setReplyTo(null)}
                  className="ml-auto"
                >
                  <Icon icon="lucide:x" width={16} />
                </Button>
              </div>
            )}
            <div className="flex justify-end mt-3">
              <Button
                className="bg-[#1d9bf0] text-white font-semibold hover:bg-[#1a8cd8] rounded-full px-5"
                size="lg"
                isDisabled={!address || !newComment.trim()}
                onPress={handleSubmitComment}
              >
                {replyTo ? 'Reply' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {comments.map((comment, index) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onLike={handleLike}
            isLast={index === comments.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
