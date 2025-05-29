import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Tooltip,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { formatNumber, getPercentageClass } from "../utils/format-utils";
import { tokens } from "../data/token-data";

interface TokenTableProps {
  onTokenSelect?: (tokenId: string) => void;
}

export const TokenTable = ({ onTokenSelect }: TokenTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table
        aria-label="Cryptocurrency tokens table"
        removeWrapper
        className="min-w-full compact-table"
        selectionMode="single"
        onRowAction={(key) => onTokenSelect && onTokenSelect(key as string)}
      >
        <TableHeader>
          <TableColumn className="text-xs w-[40px]">#</TableColumn>
          <TableColumn className="text-xs">Project</TableColumn>
          <TableColumn className="text-xs text-right">
            Total Funding
          </TableColumn>
          <TableColumn className="text-xs text-right hidden md:table-cell">
            Funding Status
          </TableColumn>
          <TableColumn className="text-xs text-right hidden lg:table-cell">
            Category
          </TableColumn>
          <TableColumn className="text-xs text-right hidden lg:table-cell">
            Round
          </TableColumn>
          <TableColumn className="text-xs text-right hidden md:table-cell">
            Links
          </TableColumn>
          <TableColumn className="text-xs text-right hidden sm:table-cell">
            Funding Sources
          </TableColumn>
          <TableColumn className="text-xs text-right hidden xl:table-cell">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody>
          {tokens.map((token, index) => (
            <TableRow key={token.id} className="token-row cursor-pointer">
              <TableCell className="text-xs">{index + 1}</TableCell>
              <TableCell>
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
                  <p className="text-xs font-medium">${token.price}</p>
                  {token.priceUsd && (
                    <p className="text-[10px] text-default-400">
                      ${token.priceUsd}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                <Chip size="sm" variant="flat" color="success">
                  Active
                </Chip>
              </TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                <span className="text-xs">DeFi</span>
              </TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                <span className="text-xs">Series A</span>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                <div className="flex gap-1">
                  <Icon icon="lucide:external-link" size={12} className="text-primary cursor-pointer" />
                  <Icon icon="lucide:twitter" size={12} className="text-primary cursor-pointer" />
                </div>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <div className="flex gap-1 flex-wrap">
                  <Chip size="sm" variant="flat" color="primary">VC Fund</Chip>
                  <Chip size="sm" variant="flat" color="secondary">Angel</Chip>
                </div>
              </TableCell>
              <TableCell className="text-right hidden xl:table-cell">
                <div className="flex gap-1">
                  <Icon icon="lucide:eye" size={12} className="text-default-400 cursor-pointer" />
                  <Icon icon="lucide:bookmark" size={12} className="text-default-400 cursor-pointer" />
                  <Icon icon="lucide:share-2" size={12} className="text-default-400 cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
