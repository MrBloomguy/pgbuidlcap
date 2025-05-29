import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const LeaderboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState("24h");
  
  const leaders = [
    { id: 1, name: "CryptoWhale", avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=1", rank: 1, volume: 12500000, change: 15.3, tokens: 42 },
    { id: 2, name: "BlockchainBaron", avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=2", rank: 2, volume: 8750000, change: 7.8, tokens: 36 },
    { id: 3, name: "TokenTrader", avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=3", rank: 3, volume: 6320000, change: -2.5, tokens: 28 },
    { id: 4, name: "CoinCollector", avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=4", rank: 4, volume: 5180000, change: 9.2, tokens: 53 },
    { id: 5, name: "SatoshiFan", avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=5", rank: 5, volume: 4250000, change: -1.7, tokens: 31 },
  ];
  
  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(volume);
  };
  
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Leaderboard</h1>
        
        <div className="flex gap-1">
          {["24h", "7d", "30d", "all"].map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? "solid" : "flat"}
              color={timeRange === range ? "primary" : "default"}
              onPress={() => setTimeRange(range)}
              className="compact-filter-button"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      
      <Table 
        aria-label="Leaderboard table"
        removeWrapper
        className="min-w-full compact-table"
      >
        <TableHeader>
          <TableColumn className="text-xs w-[40px]">RANK</TableColumn>
          <TableColumn className="text-xs">TRADER</TableColumn>
          <TableColumn className="text-xs text-right">VOLUME</TableColumn>
          <TableColumn className="text-xs text-right">CHANGE</TableColumn>
          <TableColumn className="text-xs text-right hidden sm:table-cell">TOKENS</TableColumn>
          <TableColumn className="text-xs text-right w-[80px]">ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {leaders.map((leader) => (
            <TableRow key={leader.id} className="token-row">
              <TableCell className="text-xs">
                <Chip 
                  size="sm" 
                  variant={leader.rank <= 3 ? "solid" : "flat"} 
                  color={leader.rank === 1 ? "warning" : leader.rank === 2 ? "primary" : leader.rank === 3 ? "secondary" : "default"}
                >
                  {leader.rank}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar
                    src={leader.avatar}
                    className="w-6 h-6"
                    radius="full"
                  />
                  <span className="text-xs font-medium">{leader.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-xs font-medium">{formatVolume(leader.volume)}</span>
              </TableCell>
              <TableCell className={`text-right ${leader.change >= 0 ? 'positive-change' : 'negative-change'}`}>
                <div className="flex items-center justify-end gap-1">
                  <Icon 
                    icon={leader.change >= 0 ? "lucide:trending-up" : "lucide:trending-down"} 
                    size={12} 
                  />
                  <span className="text-xs">{Math.abs(leader.change)}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <span className="text-xs">{leader.tokens}</span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="light"
                  isIconOnly
                  className="ml-auto"
                >
                  <Icon icon="lucide:user-plus" size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};