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
  Pagination
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatNumber, getPercentageClass } from "../utils/format-utils";
import { tokens } from "../data/token-data";
import { CommentModal } from "./CommentModal";
import { RepostModal } from "./RepostModal";

interface TokenListProps {
  viewMode: "list" | "grid";
  onSelectToken: (tokenId: string) => void;
}

export const TokenList: React.FC<TokenListProps> = ({
  viewMode,
  onSelectToken,
}) => {
  const [commentModalToken, setCommentModalToken] = React.useState<{
    id: string;
    symbol: string;
    image: string;
  } | null>(null);
  const [repostModalToken, setRepostModalToken] = React.useState<{
    id: string;
    symbol: string;
    image: string;
  } | null>(null);
  const [likedTokens, setLikedTokens] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(tokens.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTokens = tokens.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLike = (tokenId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedTokens((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const handleComment = (
    token: { id: string; symbol: string; image: string },
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setCommentModalToken(token);
  };

  const handleRepost = (
    token: { id: string; symbol: string; image: string },
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setRepostModalToken(token);
  };

  if (viewMode === "grid") {
    return (
      <>
        <div className="grid-view">
          {currentTokens.map((token) => (
            <Card
              key={token.id}
              className="token-grid-card cursor-pointer"
              isPressable
              onPress={() => onSelectToken(token.id)}
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-2 mb-2">
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
                    <Avatar src={token.image} className="w-6 h-6" radius="sm" />
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

                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <p className="text-[10px] text-default-400">Price</p>
                    <p className="font-medium">
                      ${token.priceUsd || token.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-default-400">24h</p>
                    <p className={getPercentageClass(token.change24h)}>
                      {token.change24h}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-default-400">Volume</p>
                    <p>${formatNumber(token.volume)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-default-400">Actions</p>
                    <Button
                      size="sm"
                      color="primary"
                      variant="solid"
                      className="text-[10px] h-5 px-2 mt-1"
                      onPress={() => window.open(`https://funding.example.com/project/${token.id}`, '_blank')}
                    >
                      Fund
                    </Button>
                  </div>
                </div>

                <Divider className="my-2" />

                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant="light"
                    className="social-action-btn"
                    startContent={
                      <Icon icon="lucide:message-circle" size={14} />
                    }
                    onPress={(e) =>
                      handleComment(
                        {
                          id: token.id,
                          symbol: token.symbol,
                          image: token.image,
                        },
                        e,
                      )
                    }
                  >
                    <span className="text-[10px]">Comment</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="social-action-btn"
                    startContent={
                      <Icon
                        icon={
                          likedTokens.has(token.id)
                            ? "lucide:heart-fill"
                            : "lucide:heart"
                        }
                        size={14}
                        className={
                          likedTokens.has(token.id) ? "text-danger" : ""
                        }
                      />
                    }
                    onPress={(e) => handleLike(token.id, e)}
                  >
                    <span className="text-[10px]">Like</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="social-action-btn"
                    startContent={<Icon icon="lucide:repeat" size={14} />}
                    onPress={(e) =>
                      handleRepost(
                        {
                          id: token.id,
                          symbol: token.symbol,
                          image: token.image,
                        },
                        e,
                      )
                    }
                  >
                    <span className="text-[10px]">Repost</span>
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {commentModalToken && (
          <CommentModal
            isOpen={!!commentModalToken}
            onOpenChange={(isOpen) => !isOpen && setCommentModalToken(null)}
            tokenSymbol={commentModalToken.symbol}
            tokenImage={commentModalToken.image}
          />
        )}

        {repostModalToken && (
          <RepostModal
            isOpen={!!repostModalToken}
            onOpenChange={(isOpen) => !isOpen && setRepostModalToken(null)}
            tokenSymbol={repostModalToken.symbol}
            tokenImage={repostModalToken.image}
          />
        )}
      </>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <Table
          aria-label="Cryptocurrency tokens table"
          removeWrapper
          className="min-w-full compact-table relative"
          selectionMode="single"
          onRowAction={onSelectToken}
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
            {currentTokens.map((token, index) => (
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
                <TableCell className="text-right">
                  <span className="text-xs">{formatNumber(token.transactions)}</span>
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
                    color="primary"
                    variant="solid"
                    className="text-[10px] h-5 px-2"
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
          total={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="sm"
          variant="light"
          showControls
          className="pagination-nav"
        />
      </div>
    </div>
  );
};
