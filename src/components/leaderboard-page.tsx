import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Button, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Leader {
  id: number;
  address: string;  // ETH address
  ensName?: string; // Optional ENS name
  username?: string; // Optional username
  avatar: string;
  rank: number;
  points: number;
  contributions: number;
  impactScore: number;
  badges: Array<"diamond" | "gold" | "silver" | "bronze">;
  level: number;
}

export const LeaderboardPage: React.FC = (): JSX.Element => {
  const [timeRange, setTimeRange] = React.useState("30d");
  
  const leaders: Leader[] = [
    { 
      id: 1, 
      address: "0x1234...5678",
      ensName: "buildmaster.eth",
      avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=1", 
      rank: 1, 
      points: 1850,
      contributions: 42,
      impactScore: 95.3,
      badges: ["diamond", "gold"],
      level: 5
    },
    { 
      id: 2, 
      address: "0x8765...4321",
      username: "PublicBuilder",
      avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=2", 
      rank: 2, 
      points: 1540,
      contributions: 36,
      impactScore: 87.8,
      badges: ["gold", "silver"],
      level: 4
    },
    { 
      id: 3, 
      address: "0xabcd...efgh",
      ensName: "devguru.eth",
      avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=3", 
      rank: 3, 
      points: 1320,
      contributions: 28,
      impactScore: 82.5,
      badges: ["gold"],
      level: 4
    },
    { 
      id: 4, 
      address: "0xdef0...1234",
      avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=4", 
      rank: 4, 
      points: 980,
      contributions: 23,
      impactScore: 79.2,
      badges: ["silver"],
      level: 3
    },
    { 
      id: 5, 
      address: "0x9876...5432",
      ensName: "codewizard.eth",
      avatar: "https://img.heroui.chat/image/avatar?w=64&h=64&u=5", 
      rank: 5, 
      points: 870,
      contributions: 19,
      impactScore: 76.7,
      badges: ["bronze"],
      level: 3
    },
  ];

  // Helper function to display address or name
  const getDisplayName = (leader: Leader) => {
    return leader.ensName || leader.username || truncateAddress(leader.address);
  };

  // Helper function to truncate ETH address
  const truncateAddress = (address: string) => {
    return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  };

  const getBadgeColor = (badge: "diamond" | "gold" | "silver" | "bronze") => {
    switch (badge) {
      case 'diamond': return 'text-blue-400';
      case 'gold': return 'text-yellow-400';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-orange-400';
      default: return 'text-default-400';
    }
  };
  
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Public Goods Leaderboard</h1>
        
        <div className="flex gap-1">
          {["7d", "30d", "90d", "all"].map((range) => (
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
        aria-label="Public Goods Leaderboard"
        removeWrapper
        className="min-w-full compact-table"
      >
        <TableHeader>
          <TableColumn className="text-xs w-[40px]">RANK</TableColumn>
          <TableColumn className="text-xs">BUILDER</TableColumn>
          <TableColumn className="text-xs text-right">POINTS</TableColumn>
          <TableColumn className="text-xs text-right">IMPACT</TableColumn>
          <TableColumn className="text-xs text-right hidden sm:table-cell">CONTRIB.</TableColumn>
          <TableColumn className="text-xs text-right hidden sm:table-cell">LEVEL</TableColumn>
          <TableColumn className="text-xs text-right w-[80px]">BADGES</TableColumn>
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
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{getDisplayName(leader)}</span>
                    {leader.ensName && leader.username && (
                      <span className="text-xs text-gray-500">{leader.username}</span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs font-medium">{leader.points} XP</span>
                  <Progress 
                    value={(leader.points % 500) / 500 * 100} 
                    color="primary" 
                    size="sm"
                    className="w-12 h-1"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Chip
                  size="sm"
                  variant="flat"
                  color={leader.impactScore >= 90 ? "success" : 
                         leader.impactScore >= 80 ? "primary" : 
                         leader.impactScore >= 70 ? "secondary" : "default"}
                >
                  {leader.impactScore}
                </Chip>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <span className="text-xs">{leader.contributions}</span>
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <div className="flex items-center justify-end gap-1">
                  <Icon icon="lucide:activity" width={12} height={12} />
                  <span className="text-xs">Lvl {leader.level}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {leader.badges.map((badge, idx) => (
                    <Icon 
                      key={idx}
                      icon={badge === 'diamond' ? 'lucide:diamond' : 
                            badge === 'gold' ? 'lucide:medal' : 
                            badge === 'silver' ? 'lucide:award' : 'lucide:trophy'}
                      className={getBadgeColor(badge)}
                      width={14}
                      height={14}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};