import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from 'react-sparklines';
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
  Textarea,
  Chip,
  Tooltip,
  Input
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

// Adding reaction counts interface
interface ReactionCounts {
  likes: number;
  comments: number;
  upvotes: number;
}

interface Project {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  url?: string;
  logo_url?: string;
  amount_received?: number;
  status?: string;
  is_active?: boolean;
  categories?: string[];
  rounds?: Array<{
    name: string;
    type: string;
    round_number?: number;
  }>;
  funding_sources?: string[];
  funding_history?: number[];
  grant_program?: {
    name: string;
    type: string; // "RetroPGF", "Gitcoin", etc.
    round?: string;
  };
  reactions?: ReactionCounts;
  comments?: Comment[];
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
    <div className="group py-3 px-4 -mx-4 hover:bg-default-100/50 transition-colors">
      <div className="flex gap-3">
        <Avatar
          src={comment.avatar}
          className="w-8 h-8"
          radius="full"
          alt={comment.author}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm hover:underline cursor-pointer">{comment.author}</span>
            <span className="text-default-400 text-sm">·</span>
            <span className="text-default-400 text-sm">{comment.timestamp}</span>
          </div>
          <p className="text-sm mt-1 text-default-600">{comment.text}</p>
          <div className="flex items-center -ml-2 mt-1">
            <Button
              size="sm"
              variant="light"
              className="group/like gap-2 h-8 text-default-500"
              startContent={
                <Icon 
                  icon="lucide:heart" 
                  width={16}
                  className="group-hover/like:text-danger transition-colors" 
                />
              }
            >
              <span className="text-sm group-hover/like:text-danger transition-colors">
                {comment.likes || 0}
              </span>
            </Button>
            <Button
              size="sm"
              variant="light"
              className="group/reply gap-2 h-8 text-default-500"
              startContent={
                <Icon 
                  icon="lucide:message-circle" 
                  width={16}
                  className="group-hover/reply:text-primary transition-colors"
                />
              }
            >
              <span className="text-sm group-hover/reply:text-primary transition-colors">
                Reply
              </span>
            </Button>
          </div>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-3 space-y-3">
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
    // Helper function to generate random funding history
    const generateFundingHistory = (finalAmount: number) => {
      const history = [];
      let current = finalAmount * 0.2; // Start at 20% of final amount
      for (let i = 0; i < 6; i++) {
        history.push(current);
        current += (finalAmount - current) * (0.1 + Math.random() * 0.3);
      }
      history.push(finalAmount);
      return history;
    };

    // Simulate loading projects from an API
    const sampleProjects = [
      {
        id: "1",
        title: "Lit Protocol",
        description: "Decentralized Access Control",
        logo_url: "https://avatars.githubusercontent.com/u/84820891",
        amount_received: 100000,
        funding_history: generateFundingHistory(100000),
        status: "Active",
        categories: ["Privacy", "Infrastructure"],
        rounds: [{ name: "OP3", type: "public" }],
        url: "https://litprotocol.com",
        grant_program: {
          name: "Optimism RetroPGF",
          type: "RetroPGF",
          round: "3"
        },
        reactions: {
          likes: 45,
          comments: 12,
          upvotes: 89
        }
      },
      {
        id: "2",
        title: "Etherscan",
        description: "Blockchain explorer and analytics platform",
        logo_url: "https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
        amount_received: 890000,
        funding_history: generateFundingHistory(890000),
        status: "Active",
        categories: ["Infrastructure"],
        url: "https://etherscan.io",
        grant_program: {
          name: "Optimism RetroPGF",
          type: "RetroPGF",
          round: "3"
        },
        reactions: {
          likes: 30,
          comments: 8,
          upvotes: 50
        }
      },
      {
        id: "3",
        title: "Web3Modal",
        description: "The best-in-class Web3 wallet connection library",
        logo_url: "https://avatars.githubusercontent.com/u/37784886",
        amount_received: 75000,
        funding_history: generateFundingHistory(75000),
        status: "Completed",
        categories: ["Developer Tools"],
        rounds: [{ name: "GR18", type: "public" }],
        url: "https://github.com/WalletConnect/web3modal",
        grant_program: {
          name: "Gitcoin Grants",
          type: "Gitcoin",
          round: "GR18"
        },
        reactions: {
          likes: 20,
          comments: 5,
          upvotes: 10
        }
      },
      {
        id: "4",
        title: "Remix IDE",
        description: "Open source web and desktop application for Ethereum development",
        logo_url: "https://remix.ethereum.org/assets/img/remix-logo.png",
        amount_received: 950000,
        funding_history: generateFundingHistory(950000),
        status: "Active",
        categories: ["Developer Tools"],
        url: "https://remix.ethereum.org",
        grant_program: {
          name: "Optimism RetroPGF",
          type: "RetroPGF",
          round: "3"
        },
        reactions: {
          likes: 25,
          comments: 7,
          upvotes: 15
        }
      },
      {
        id: "5",
        title: "wagmi",
        description: "React Hooks for Ethereum",
        logo_url: "https://avatars.githubusercontent.com/u/109633172",
        amount_received: 45000,
        funding_history: generateFundingHistory(45000),
        status: "Active",
        categories: ["Developer Tools"],
        rounds: [{ name: "GR19", type: "public" }],
        url: "https://wagmi.sh",
        grant_program: {
          name: "Gitcoin Grants",
          type: "Gitcoin",
          round: "GR19"
        },
        reactions: {
          likes: 67,
          comments: 23,
          upvotes: 156
        }
      }
    ];

    setProjects(sampleProjects);
    setLoading(false);
  }, []);

  const handleComment = (project: Project) => {
    if (expandedCommentId === project.id) {
      setExpandedCommentId(null);
      setCommentText("");
    } else {
      setExpandedCommentId(project.id);
      setCommentText("");
    }
  };

  const handleSubmitComment = (project: Project) => {
    if (!commentText.trim()) return;

    // Create new comment
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "Current User",
      avatar: "https://i.pravatar.cc/150?u=currentuser",
      text: commentText.trim(),
      timestamp: "now",
      likes: 0
    };

    // Optimistically update UI
    setProjects(prev => prev.map(p => {
      if (p.id === project.id) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment],
          reactions: {
            ...p.reactions,
            comments: (p.reactions?.comments || 0) + 1
          }
        };
      }
      return p;
    }));

    setCommentText("");
  };

  const handleLike = (project: Project) => {
    setLikedTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(project.id)) {
        newSet.delete(project.id);
      } else {
        newSet.add(project.id);
      }
      return newSet;
    });

    // Optimistically update the likes count
    setProjects(prev => prev.map(p => {
      if (p.id === project.id) {
        const delta = likedTokens.has(project.id) ? -1 : 1;
        return {
          ...p,
          reactions: {
            ...p.reactions,
            likes: (p.reactions?.likes || 0) + delta
          }
        };
      }
      return p;
    }));
  };

  const handleUpvote = (project: Project) => {
    if (!upvotedTokens.has(project.id)) {
      setUpvoteModalToken({
        id: project.id,
        symbol: project.title || project.name || '',
        image: project.logo_url || ''
      });

      // Optimistically update the upvotes count
      setProjects(prev => prev.map(p => {
        if (p.id === project.id) {
          return {
            ...p,
            reactions: {
              ...p.reactions,
              upvotes: (p.reactions?.upvotes || 0) + 1
            }
          };
        }
        return p;
      }));
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
                className="border-b border-divider hover:bg-default-100/50 transition-colors rounded-xl overflow-hidden"
              >
                <CardBody className="px-4 py-2.5">
                  <div className="flex gap-2.5">
                    <Avatar
                      src={project.logo_url || "https://via.placeholder.com/150"}
                      className="w-9 h-9 shrink-0"
                      radius="full"
                      alt={project.title || "Project Logo"}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap mb-0.5">
                        <div className="flex items-center gap-1 min-w-0 flex-shrink">
                          <button 
                            onClick={() => onTokenSelect(project.id)}
                            className="font-semibold text-[15px] hover:underline truncate max-w-[200px]"
                          >
                            {project.title || project.name || `Project #${project.id || idx}`}
                          </button>
                          <Icon 
                            icon="lucide:badge-check" 
                            width={16} 
                            className="text-[#1d9bf0] shrink-0" 
                          />
                          <span className="text-neutral-500 text-[15px]">·</span>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={project.grant_program?.type === 'RetroPGF' ? 'warning' : 'primary'}
                          className="h-[18px] px-1.5 text-xs bg-[#1d9bf01a] text-[#1d9bf0] font-medium shrink-0"
                        >
                          ${formatNumber(project.amount_received || 0)}
                        </Chip>
                      </div>
                      
                      <p className="text-[15px] text-neutral-800 dark:text-neutral-200 leading-5 mb-1.5 line-clamp-2">
                        {project.description || "No description"}
                      </p>
                      
                      {project.categories && project.categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mb-2">
                          {project.categories.slice(0, 3).map((category, i) => (
                            <Chip
                              key={i}
                              size="sm"
                              variant="flat"
                              className="h-[20px] px-2 text-xs bg-[#1d9bf01a] text-[#1d9bf0] font-medium shrink-0"
                            >
                              {category}
                            </Chip>
                          ))}
                          {project.categories.length > 3 && (
                            <span className="text-xs text-neutral-500">
                              +{project.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center -ml-2 mt-1">
                        <Button
                          className={`group gap-2 h-9 px-2 ${likedTokens.has(project.id) ? "text-[#f91880]" : "text-neutral-500"}`}
                          size="sm"
                          variant="light"
                          onPress={() => handleLike(project)}
                        >
                          <Icon 
                            icon={likedTokens.has(project.id) ? "lucide:heart-fill" : "lucide:heart"} 
                            width={18}
                            className="group-hover:text-[#f91880] transition-colors"
                          />
                          <span className="text-sm">{project.reactions?.likes || 0}</span>
                        </Button>

                        <Button
                          className="group gap-2 h-9 px-2 text-neutral-500"
                          size="sm"
                          variant="light"
                          onPress={() => handleComment(project)}
                        >
                          <Icon 
                            icon="lucide:message-circle" 
                            width={18}
                            className="group-hover:text-[#1d9bf0] transition-colors"
                          />
                          <span className="text-sm">{project.reactions?.comments || 0}</span>
                        </Button>

                        <Button
                          className={`group gap-2 h-9 px-2 ${upvotedTokens.has(project.id) ? "text-[#00ba7c]" : "text-neutral-500"}`}
                          size="sm"
                          variant="light"
                          onPress={() => handleUpvote(project)}
                        >
                          <Icon 
                            icon={upvotedTokens.has(project.id) ? "lucide:rocket" : "lucide:rocket"}
                            width={18}
                            className="group-hover:text-[#00ba7c] transition-colors"
                          />
                          <span className="text-sm">{project.reactions?.upvotes || 0}</span>
                        </Button>

                        <div className="ml-auto">
                          <Button
                            size="sm"
                            variant="flat"
                            className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8] h-8 px-4"
                            onPress={() => window.open(project.url || `https://gitcoin.co/grants/${project.id}`, '_blank')}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>

                {/* Comments section */}
                {expandedCommentId === project.id && (
                  <div className="border-t border-divider">
                    <div className="p-3 space-y-4">
                      {project.comments?.map((comment) => (
                        <CommentThread key={comment.id} comment={comment} />
                      ))}
                      <div className="flex gap-3">
                        <Avatar
                          src="https://i.pravatar.cc/150?u=user"
                          className="w-8 h-8"
                          radius="full"
                        />
                        <div className="flex-1">
                          <Textarea
                            value={commentText}
                            onValueChange={setCommentText}
                            placeholder="Post your reply"
                            minRows={1}
                            maxRows={4}
                            classNames={{
                              input: "bg-transparent resize-none text-[15px] p-3",
                              inputWrapper: "bg-default-100 hover:bg-default-200 transition-colors rounded-2xl"
                            }}
                          />
                          {commentText.trim() && (
                            <div className="flex justify-end mt-2">
                              <Button
                                size="sm"
                                className="bg-[#1d9bf0] text-white font-bold rounded-full px-4 hover:bg-[#1a8cd8]"
                                onPress={() => handleSubmitComment(project)}
                              >
                                Reply
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
            <TableColumn className="text-xs text-right w-[100px]">Graph</TableColumn>
            <TableColumn className="text-xs text-right hidden md:table-cell">Status</TableColumn>
            <TableColumn className="text-xs text-right hidden lg:table-cell">Category</TableColumn>
            <TableColumn className="text-xs text-right">Grant Program</TableColumn>
            <TableColumn className="text-xs text-right hidden lg:table-cell">Round</TableColumn>
            <TableColumn className="text-xs text-right hidden md:table-cell">Links</TableColumn>
            <TableColumn className="text-xs text-right">Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-default-500">Loading projects...</TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-default-500">No projects found.</TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow key={project.id || index} className="token-row cursor-pointer">
                  <TableCell className="text-xs">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={project.logo_url || "https://via.placeholder.com/150"}
                        className="w-8 h-8 shrink-0"
                        radius="sm"
                      />
                      <div>
                        <div className="font-medium">{project.title || project.name || `Project #${project.id || index}`}</div>
                        <Tooltip content={project.description}>
                          <div className="text-xs text-default-400">{(project.description || "").split(" ").slice(0, 3).join(" ")}</div>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {typeof project.amount_received === 'number' ? `$${formatNumber(project.amount_received)}` : '--'}
                  </TableCell>
                  <TableCell>
                    <div className="w-[100px] h-[40px]">
                      <Sparklines data={project.funding_history || []} height={40} width={100}>
                        <SparklinesLine style={{ fill: "url(#gradient)" }} color={project.grant_program?.type === 'RetroPGF' ? "#f97316" : "#06b6d4"} />
                        <defs>
                          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={project.grant_program?.type === 'RetroPGF' ? "#f97316" : "#06b6d4"} stopOpacity={0.2}/>
                            <stop offset="100%" stopColor={project.grant_program?.type === 'RetroPGF' ? "#f97316" : "#06b6d4"} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </Sparklines>
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {project.status || (project.is_active ? 'Active' : 'Inactive') || '--'}
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    {Array.isArray(project.categories) && project.categories.length > 0 ? project.categories[0] : '--'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 justify-end">
                      <Avatar
                        src={project.grant_program?.type === 'RetroPGF' 
                          ? "https://assets.optimism.io/4c7095fb2f0bc0c4.png" 
                          : "https://assets.coingecko.com/coins/images/11022/small/gitcoin.png"}
                        className="w-5 h-5"
                        radius="sm"
                      />
                      <Chip 
                        size="sm"
                        variant="dot"
                        className="px-2 py-1 h-6"
                        color={project.grant_program?.type === 'RetroPGF' ? 'warning' : 'primary'}
                      >
                        {project.grant_program?.type === 'RetroPGF' ? 'RetroPGF' : 'Gitcoin'}
                      </Chip>
                    </div>
                  </TableCell>
                  <TableCell className="text-right hidden lg:table-cell">
                    {project.grant_program?.type === 'RetroPGF' ? (
                      <span className="font-medium">Round {project.grant_program.round}</span>
                    ) : (
                      Array.isArray(project.rounds) && project.rounds.length > 0 ? (project.rounds[0]?.name || project.rounds[0]) : '--'
                    )}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
                    ) : '--'}
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

