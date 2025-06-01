import React from "react";
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
import { tokens } from "../data/token-data";
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

interface TokenListProps {
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

export const TokenList: React.FC<TokenListProps> = ({
  viewMode,
  selectedTimeFilter,
  onTokenSelect
}) => {
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
          {tokens.map((token) => (
            <Card
              key={token.id}
              className="token-grid-card border border-divider hover:bg-default-100/50 transition-colors"
            >
              <CardBody className="p-4 bg-transparent">
                {/* Header: Token Info - Twitter-style header */}
                <div className="flex items-start gap-3">
                  <Avatar
                    src={token.image}
                    className="w-10 h-10"
                    radius="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => onTokenSelect(token.id)}
                        className="font-semibold text-sm hover:text-[#CDEB63] transition-colors"
                      >
                        {token.symbol}
                      </button>
                      <Icon 
                        icon="lucide:badge-check" 
                        width={14} 
                        height={14} 
                        className="text-[#CDEB63]" 
                      />
                      {token.chain === "ETH" && (
                        <div className="flex items-center gap-1">
                          <span className="text-default-500">·</span>
                          <span className="text-xs text-default-500">ETH</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-default-500">{token.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-medium text-sm">${token.price}</p>
                    <p className={`text-xs ${getPercentageClass(token.change24h)}`}>
                      {token.change24h > 0 ? "+" : ""}{token.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>

                {/* Content - Project Stats */}
                <div className="mt-3 px-2">
                  <div className="flex items-center justify-between text-xs text-default-500 mb-1">
                    <span>24h Volume</span>
                    <span className="font-medium">${formatNumber(token.volume)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-default-500">
                    <span>Transactions</span>
                    <span className="font-medium">{formatNumber(token.transactions)}</span>
                  </div>
                </div>
                
                {/* Divider */}
                <Divider className="my-3" />
                
                {/* Social Actions */}
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="light"
                    className={`social-action-btn hover:bg-[#CDEB63]/10 ${expandedCommentId === token.id ? 'text-[#CDEB63]' : ''}`}
                    startContent={<Icon icon="lucide:message-circle" width={14} height={14} className="text-[#CDEB63]" />}
                    onPress={() => handleComment({id: token.id, symbol: token.symbol, image: token.image})}
                  >
                    <span className="text-xs">23</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="social-action-btn hover:bg-[#CDEB63]/10"
                    startContent={
                      <Icon 
                        icon={likedTokens.has(token.id) ? "lucide:heart-fill" : "lucide:heart"} 
                        width={14} 
                        height={14}
                        className="text-[#CDEB63]"
                      />
                    }
                    onPress={() => handleLike(token.id)}
                  >
                    <span className="text-xs">142</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className={`social-action-btn ${upvotedTokens.has(token.id) ? 'bg-[#CDEB63]/20' : 'hover:bg-[#CDEB63]/10'}`}
                    startContent={
                      <Icon 
                        icon={upvotedTokens.has(token.id) ? "lucide:arrow-big-up-fill" : "lucide:arrow-big-up"} 
                        width={14} 
                        height={14}
                        className="text-[#CDEB63]"
                      />
                    }
                    onPress={() => handleUpvote({id: token.id, symbol: token.symbol, image: token.image})}
                  >
                    <span className="text-xs">45</span>
                  </Button>
                  <Button
                    size="md"
                    variant="solid"
                    className="social-action-btn bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90"
                
                    onPress={() => window.open(`https://funding.example.com/project/${token.id}`, '_blank')}
                  >
                    <span className="text-xs font-medium">Fund</span>
                  </Button>
                </div>

                {/* Expandable Comment Section */}
                {expandedCommentId === token.id && (
                  <div className="mt-3 border-t border-divider pt-3 animate-in slide-in-from-top duration-200">
                    {/* Previous comments */}
                    <div className="mb-4 space-y-1">
                      {comments[token.id]?.map(comment => (
                        <CommentThread key={comment.id} comment={comment} />
                      ))}
                    </div>
                    
                    {/* Comment input */}
                    <div className="flex space-x-3">
                      <img 
                        src="https://i.pravatar.cc/150?u=user" 
                        alt="Your avatar" 
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex-1">
                        <textarea
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full min-h-[80px] p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <div className="mt-2 flex justify-end">
                          <button 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            onClick={() => {
                              // Handle comment submission here
                              setCommentText("");
                            }}
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
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
          aria-label="Cryptocurrency tokens table"
          removeWrapper
          className="min-w-full compact-table relative flex-1"
          selectionMode="single"
          onRowAction={onTokenSelect}
        >
          <TableHeader>
            <TableColumn className="text-xs sticky-token-column">TOKEN</TableColumn>
            <TableColumn className="text-xs text-right scrollable-column">PRICE</TableColumn>
            <TableColumn className="text-xs text-right scrollable-column">AGE</TableColumn>
            <TableColumn className="text-xs text-right scrollable-column">TXNS</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell scrollable-column">VOLUME</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell scrollable-column">6H</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell scrollable-column">24H</TableColumn>
            <TableColumn className="text-xs text-right hidden md:table-cell scrollable-column">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={token.id} className="token-row cursor-pointer">
                <TableCell className="text-xs sticky-token-cell">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {token.chain === "ETH" && (
                        <Avatar
                          src="https://img.heroui.chat/image/avatar?w=32&h=32&u=eth"
                          className="w-3 h-3 -mr-1 z-10"
                          radius="full"
                        />
                      )}
                      {token.chain === "SOL" && (
                        <Avatar
                          src="https://img.heroui.chat/image/avatar?w=32&h=32&u=sol"
                          className="w-3 h-3 -mr-1 z-10"
                          radius="full"
                        />
                      )}
                      <Avatar src={token.image} className="w-5 h-5" radius="sm" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-xs">
                          {token.symbol}
                        </span>
                        <span className="text-[10px] text-default-400">
                          /{token.chain}
                        </span>
                      </div>
                      <p className="text-[10px] text-default-400">{token.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <p className="text-xs font-medium">${typeof token.price === 'string' ? token.price : formatNumber(Number(token.price))}</p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-xs">{token.age}</span>
                </TableCell>
                <TableCell>
                  <div className="text-right">
                    <span className="text-xs">{formatNumber(token.transactions)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <span className="text-xs">${formatNumber(token.volume)}</span>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <span className={`text-xs ${getPercentageClass(token.change6h)}`}>{token.change6h}%</span>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <span className={`text-xs ${getPercentageClass(token.change24h)}`}>{token.change24h}%</span>
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  <Button
                    size="sm"
                    variant="solid"
                    className="text-[10px] h-5 px-2 bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90"
                    onPress={() => window.open(`https://funding.example.com/project/${token.id}`, '_blank')}
                  >
                    Trade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="pagination-container">
        <Pagination
          total={Math.ceil(tokens.length / 10)}
          page={1}
          onChange={() => {}}
          size="sm"
          variant="light"
          showControls
          className="pagination-nav"
        />
      </div>
    </div>
  );
};
