import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useSocialInteractions } from '../contexts/SocialInteractionsContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

interface DomainActionsProps {
  domainId: string;
}

export const DomainActions: React.FC<DomainActionsProps> = ({ domainId }) => {
  const { address } = useAccount();
  const {
    upvotedDomains,
    upvotedDomainCounts,
    loadDomainInteractions,
    upvoteDomain,
    isLoading,
  } = useSocialInteractions();

  useEffect(() => {
    loadDomainInteractions(domainId);
  }, [domainId, loadDomainInteractions]);

  const handleUpvote = async () => {
    if (!address) {
      toast.error('Please connect your wallet to upvote');
      return;
    }
    
    try {
      await upvoteDomain(domainId);
      toast.success(hasUpvoted ? 'Upvote removed' : 'Domain upvoted!', {
        icon: hasUpvoted ? '⬇️' : '⬆️',
        duration: 2000
      });
    } catch (error) {
      console.error('Failed to upvote:', error);
      toast.error('Failed to update upvote. Please try again.');
    }
  };

  const hasUpvoted = upvotedDomains.has(domainId);
  const upvoteCount = upvotedDomainCounts[domainId] || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2"
    >
      <Button
        variant={hasUpvoted ? "flat" : "light"}
        color={hasUpvoted ? "primary" : "default"}
        startContent={
          isLoading[`upvote:${domainId}`] ? (
            <Icon 
              icon="lucide:loader-2"
              className="animate-spin"
            />
          ) : (
            <Icon 
              icon={hasUpvoted ? "lucide:arrow-big-up-filled" : "lucide:arrow-big-up"} 
              className={`transition-transform duration-200 ${hasUpvoted ? "text-primary-foreground transform scale-110" : ""}`}
            />
          )
        }
        onClick={handleUpvote}
        isDisabled={isLoading[`upvote:${domainId}`] || !address}
        className="transition-all duration-200 hover:scale-105"
      >
        <motion.span
          key={upvoteCount}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-[2ch] inline-block"
        >
          {upvoteCount}
        </motion.span>
      </Button>
    </motion.div>
  );
};
