import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export interface CommentLike {
  comment_id: string;
  user_address: string;
  created_at: string;
}

export interface DomainUpvote {
  domain_id: string;
  user_address: string;
  created_at: string;
}

export interface DatabaseComment {
  id: string;
  domain_id: string;
  content: string;
  author_address: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  likes_count: number;
}

export type CommentLikeChanges = RealtimePostgresChangesPayload<CommentLike>;
export type DomainUpvoteChanges = RealtimePostgresChangesPayload<DomainUpvote>;
export type CommentChanges = RealtimePostgresChangesPayload<DatabaseComment>;
