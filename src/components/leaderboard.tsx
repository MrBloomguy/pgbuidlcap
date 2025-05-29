import React from "react";
import { Button, Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { tokens } from "../data/token-data";
import { formatNumber } from "../utils/format-utils";

interface LeaderboardProps {
  onBack: () => void;
  onSelectToken: (tokenId: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, onSelectToken }) => {
  const [leaderboardType, setLeaderboardType] = React.useState("tokens");
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button 
          variant="light" 
          size="sm" 
          onPress={onBack}
          startContent={<Icon icon="lucide:arrow-left" size={14} />}
        >
          Back
        </Button>
        
        <div className="flex gap-1">
          <Button 
            variant="flat" 
            size="sm" 
            color="secondary"
            startContent={<Icon icon="lucide:refresh-cw" size={14} />}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <Card>
        <CardBody className="p-3">
          <h2 className="text-base font-semibold mb-3">Leaderboard</h2>
          
          <div className="flex border border-divider rounded-md overflow-hidden mb-3">
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${leaderboardType === 'tokens' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setLeaderboardType("tokens")}
            >
              Top Tokens
            </Button>
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${leaderboardType === 'gainers' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setLeaderboardType("gainers")}
            >
              Top Gainers
            </Button>
            <Button 
              variant="flat" 
              className={`rounded-none flex-1 text-xs ${leaderboardType === 'traders' ? 'bg-content2' : ''}`}
              size="sm"
              onPress={() => setLeaderboardType("traders")}
            >
              Top Traders
            </Button>
          </div>
          
          {leaderboardType === "tokens" && (
            <div className="space-y-1">
              {tokens
                .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                .slice(0, 10)
                .map((token, index) => (
                  <div 
                    key={token.id} 
                    className="flex items-center justify-between p-2 leaderboard-item rounded-md cursor-pointer"
                    onClick={() => onSelectToken(token.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium w-5 text-center">{index + 1}</span>
                      <Avatar
                        src={token.image}
                        className="w-5 h-5"
                        radius="sm"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-xs">{token.symbol}</span>
                          <span className="text-[10px] text-default-400">/{token.chain}</span>
                        </div>
                        <p className="text-[10px] text-default-400">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">${token.priceUsd || token.price}</p>
                      <p className="text-[10px] text-default-400">Vol: ${formatNumber(token.volume)}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          {leaderboardType === "gainers" && (
            <div className="space-y-1">
              {tokens
                .sort((a, b) => b.change24h - a.change24h)
                .slice(0, 10)
                .map((token, index) => (
                  <div 
                    key={token.id} 
                    className="flex items-center justify-between p-2 leaderboard-item rounded-md cursor-pointer"
                    onClick={() => onSelectToken(token.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium w-5 text-center">{index + 1}</span>
                      <Avatar
                        src={token.image}
                        className="w-5 h-5"
                        radius="sm"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-xs">{token.symbol}</span>
                          <span className="text-[10px] text-default-400">/{token.chain}</span>
                        </div>
                        <p className="text-[10px] text-default-400">{token.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium positive-change">+{token.change24h}%</p>
                      <p className="text-[10px] text-default-400">${token.priceUsd || token.price}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          {leaderboardType === "traders" && (
            <div className="space-y-1">
              {[...Array(10)].map((_, index) => {
                const profit = Math.floor(Math.random() * 10000) + 1000;
                const trades = Math.floor(Math.random() * 1000) + 100;
                
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 leaderboard-item rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium w-5 text-center">{index + 1}</span>
                      <Avatar
                        src={`https://img.heroui.chat/image/avatar?w=32&h=32&u=trader${index}`}
                        className="w-5 h-5"
                        radius="full"
                      />
                      <div>
                        <span className="font-medium text-xs">Trader {(10000 + index).toString().substring(1)}</span>
                        <p className="text-[10px] text-default-400 font-mono">0x{Math.random().toString(16).substring(2, 10)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium positive-change">+${formatNumber(profit)}</p>
                      <p className="text-[10px] text-default-400">{trades} trades</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};