import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Card,
  CardBody,
  Divider,
  Button,
  Pagination,
  PressEvent,
  Textarea
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatNumber, getPercentageClass } from "../utils/format-utils";
import { UpvoteModal } from "./UpvoteModal";

// Sample comments data structure
const sampleComments = {
  "token-1": [
    {
      id: "c1",
      author: "Alice",
      avatar: "https://i.pravatar.cc/150?u=alice",
      text: "This project looks promising! 🚀",
      timestamp: "2h ago",
      likes: 5
    },
    {
      id: "c2",
      author: "Bob",
      avatar: "https://i.pravatar.cc/150?u=bob",
      text: "Great tokenomics and solid team",
      timestamp: "1h ago",
      likes: 3
    }
  ]
};

interface ProjectListProps {
  viewMode: "grid" | "table";
  selectedTimeFilter: string;
  onTokenSelect: (tokenId: string) => void;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

const CommentThread: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="py-3">
      <div className="flex space-x-3">
        <img src={comment.avatar} alt={comment.author} className="h-8 w-8 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm">{comment.author}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{comment.timestamp}</span>
          </div>
          <p className="text-sm mt-1">{comment.text}</p>
          <div className="flex items-center space-x-6 mt-2">
            <button className="text-gray-500 hover:text-primary flex items-center space-x-1 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{comment.likes}</span>
            </button>
            <button className="text-gray-500 hover:text-primary flex items-center space-x-1 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-2 border-l-2 border-gray-200 pl-4 space-y-3">
          {comment.replies.map(reply => (
            <CommentThread key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProjectList: React.FC<ProjectListProps> = ({
  viewMode,
  selectedTimeFilter,
  onTokenSelect
}) => {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedCommentId, setExpandedCommentId] = React.useState<string | null>(null);
  const [commentText, setCommentText] = React.useState("");
  const [likedTokens, setLikedTokens] = React.useState<Set<string>>(new Set());
  const [upvotedTokens, setUpvotedTokens] = React.useState<Set<string>>(new Set());
  const [upvoteModalToken, setUpvoteModalToken] = React.useState<{
    id: string;
    symbol: string;
    image: string;
  } | null>(null);
  const [comments] = React.useState<Record<string, Comment[]>>({
    "token-1": [
      {
        id: "c1",
        author: "CryptoWhale",
        avatar: "https://i.pravatar.cc/150?u=cryptowhale",
        text: "This project looks very promising! The tokenomics are solid 🚀",
        timestamp: "2h",
        likes: 5,
      },
      {
        id: "c2",
        author: "DeFiExpert",
        avatar: "https://i.pravatar.cc/150?u=defiexpert",
        text: "Great development team behind this. Been following since day one.",
        timestamp: "1h",
        likes: 3,
        replies: [
          {
            id: "c2-r1",
            author: "BlockchainDev",
            avatar: "https://i.pravatar.cc/150?u=blockchaindev",
            text: "Agreed! Their technical documentation is top notch.",
            timestamp: "45m",
            likes: 2,
          }
        ]
      }
    ]
  });

  useEffect(() => {
    async function fetchGitcoinProjects() {
      setLoading(true);
      try {
        // Use a CORS proxy for browser fetch
        const res = await fetch('https://corsproxy.io/?https://gitcoin.co/api/v0.1/grants/');
        if (res.ok) {
          const data = await res.json();
          // Debug log to inspect structure
          console.log('Gitcoin API projects:', data);
          setProjects(Array.isArray(data) ? data.slice(0, 10) : []);
        } else {
          setProjects([]);
        }
      } catch (e) {
        setProjects([]);
      }
      setLoading(false);
    }
    fetchGitcoinProjects();
  }, []);

  const handleComment = (token: { id: string; symbol: string; image: string }) => {
    if (expandedCommentId === token.id) {
      setExpandedCommentId(null);
      setCommentText("");
    } else {
      setExpandedCommentId(token.id);
      setCommentText("");
    }
  };

  const handleSubmitComment = (tokenId: string) => {
    if (commentText.trim()) {
      console.log(`Comment on ${tokenId}: ${commentText}`);
      setCommentText("");
      setExpandedCommentId(null);
    }
  };

  const handleLike = (tokenId: string) => {
    setLikedTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const handleUpvote = (token: { id: string; symbol: string; image: string }) => {
    if (!upvotedTokens.has(token.id)) {
      setUpvoteModalToken(token);
    }
  };

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid-view">
          {loading ? (
            <div className="text-default-500 text-center w-full">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-default-500 text-center w-full">No projects found.</div>
          ) : (
            projects.map((project, idx) => (
              <Card
                key={project.id || idx}
                className="token-grid-card border border-divider hover:bg-default-100/50 transition-colors"
              >
                <CardBody className="p-4 bg-transparent">
                  <div className="flex items-start gap-3">
                    <Avatar
                      src={project.logo_url || "https://via.placeholder.com/150"}
                      className="w-10 h-10"
                      radius="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => onTokenSelect(project.id)}
                          className="font-semibold text-sm hover:text-[#CDEB63] transition-colors"
                        >
                          {project.title || project.name || `Project #${project.id || idx}`}
                        </button>
                        <Icon 
                          icon="lucide:badge-check" 
                          width={14} 
                          height={14} 
                          className="text-[#CDEB63]" 
                        />
                      </div>
                      <p className="text-xs text-default-500">{project.description || "No description"}</p>
                    </div>
                  </div>
                  <Divider className="my-3" />
                  <div className="flex items-center justify-between">
                    <Button
                      size="md"
                      variant="solid"
                      className="social-action-btn bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90"
                      onPress={() => window.open(project.url || `https://gitcoin.co/grants/${project.id}`, '_blank')}
                    >
                      <span className="text-xs font-medium">View</span>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>

        {upvoteModalToken && (
          <UpvoteModal
            isOpen={!!upvoteModalToken}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setUpvoteModalToken(null);
              } else {
                setUpvotedTokens(prev => new Set(prev).add(upvoteModalToken.id));
              }
            }}
            tokenSymbol={upvoteModalToken.symbol}
            tokenImage={upvoteModalToken.image}
          />
        )}
      </>
    );
  }

  return (
    <div className="table-wrapper overflow-hidden flex-1">
      <div className="table-container h-full flex flex-col">
        <Table
          aria-label="Public Goods Projects Table"
          removeWrapper
          className="min-w-full compact-table relative flex-1"
          selectionMode="single"
          onRowAction={onTokenSelect}
        >
          <TableHeader>
            <TableColumn className="text-xs sticky-token-column">#</TableColumn>
            <TableColumn className="text-xs">Project</TableColumn>
            <TableColumn className="text-xs text-right">Total Funding</TableColumn>
            <TableColumn className="text-xs text-right hidden md:table-cell">Funding Status</TableColumn>
            <TableColumn className="text-xs text-right hidden lg:table-cell">Category</TableColumn>
            <TableColumn className="text-xs text-right hidden lg:table-cell">Round</TableColumn>
            <TableColumn className="text-xs text-right hidden md:table-cell">Links</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell">Funding Sources</TableColumn>
            <TableColumn className="text-xs text-right">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-default-500">Loading projects...</TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-default-500">No projects found.</TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow key={project.id || index} className="token-row cursor-pointer">
                  <TableCell className="text-xs">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{project.title || project.name || `Project #${project.id || index}`}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {typeof project.amount_received === 'number' ? `$${formatNumber(project.amount_received)}` : '--'}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {project.status || (project.is_active ? 'Active' : 'Inactive') || '--'}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    {Array.isArray(project.categories) && project.categories.length > 0 ? project.categories[0] : '--'}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    {Array.isArray(project.rounds) && project.rounds.length > 0 ? (project.rounds[0]?.name || project.rounds[0]) : '--'}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
                    ) : '--'}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    {Array.isArray(project.funding_sources) && project.funding_sources.length > 0 ? project.funding_sources.join(', ') : '--'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="solid" className="text-[10px] h-5 px-2 bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90" onPress={() => window.open(project.url || `https://gitcoin.co/grants/${project.id}`, '_blank')}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

