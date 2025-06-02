-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  domain_id TEXT NOT NULL,
  content TEXT NOT NULL,
  author_address TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  likes_count INTEGER DEFAULT 0
);

-- Create comment_likes table for tracking who liked which comments
CREATE TABLE IF NOT EXISTS comment_likes (
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  PRIMARY KEY (comment_id, user_address)
);

-- Create domain_upvotes table for tracking domain upvotes
CREATE TABLE IF NOT EXISTS domain_upvotes (
  domain_id TEXT NOT NULL,
  user_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  PRIMARY KEY (domain_id, user_address)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS comments_domain_id_idx ON comments(domain_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON comments(parent_id);
CREATE INDEX IF NOT EXISTS comments_author_address_idx ON comments(author_address);
