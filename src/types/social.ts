// Types for comments and social interactions
export interface Comment {
  id: string;
  domainId: string;
  author: {
    address: string;
    ensName?: string;
    avatar?: string;
  };
  content: string;
  timestamp: number;
  likes: number;
  hasLiked?: boolean;
  replies?: Comment[];
}

export interface DomainInteraction {
  domainId: string;
  upvotes: number;
  hasUpvoted: boolean;
  comments: number;
}

// API interfaces for social interactions
export interface SocialInteractionsAPI {
  // Comments
  getComments(domainId: string): Promise<Comment[]>;
  addComment(domainId: string, content: string): Promise<Comment>;
  addReply(domainId: string, parentCommentId: string, content: string): Promise<Comment>;
  likeComment(commentId: string): Promise<void>;
  unlikeComment(commentId: string): Promise<void>;
  
  // Upvotes
  getUpvotes(domainId: string): Promise<number>;
  upvoteDomain(domainId: string): Promise<void>;
  removeUpvote(domainId: string): Promise<void>;
  
  // Interactions
  getDomainInteractions(domainId: string): Promise<DomainInteraction>;
  getUserInteractions(userAddress: string): Promise<{
    upvotedDomains: string[];
    likedComments: string[];
  }>;
}
