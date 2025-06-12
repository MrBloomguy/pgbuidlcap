import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Button, Progress, ButtonGroup, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { supabase } from "../utils/supabase";

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
  growth: number; // Weekly growth rate
  badges: Array<"diamond" | "gold" | "silver" | "bronze">;
  level: number;
  specialties: string[];
  activity: {
    weeklyCommits: number;
    proposalsCreated: number;
    proposalsReviewed: number;
  };
}

export const LeaderboardPage: React.FC = (): JSX.Element => {
  const [timeRange, setTimeRange] = React.useState("all");
  const [category, setCategory] = React.useState("builders");
  const [view, setView] = React.useState<"table" | "grid">("table");
  
  const timeRanges = ["1d", "7d", "30d", "90d", "all"];
  const categories = [
    { key: "builders", label: "Builders", icon: "lucide:code" },
    { key: "projects", label: "Projects", icon: "lucide:folder" },
    { key: "grants", label: "Grants", icon: "lucide:gift" },
    { key: "domains", label: "Domains", icon: "lucide:globe" }
  ];
  
  // Replace hardcoded leaders with Supabase fetch
  const [leaders, setLeaders] = React.useState<Leader[]>([]);
  const [loadingLeaders, setLoadingLeaders] = React.useState(true);
  const [errorLeaders, setErrorLeaders] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchLeaders() {
      setLoadingLeaders(true);
      setErrorLeaders(null);
      try {
        // Example: fetch top users from a 'user_badges' table, adjust as needed
        const { data, error } = await supabase
          .from('user_badges')
          .select('user_address, level, name, icon')
          .order('level', { ascending: false })
          .limit(10);
        if (error) throw error;
        // Map to Leader interface (mocked fields for missing data)
        setLeaders((data || []).map((row: any, i: number) => ({
          id: i + 1,
          address: row.user_address,
          avatar: `https://img.heroui.chat/image/avatar?w=64&h=64&u=${row.user_address}`,
          rank: i + 1,
          points: (row.level === 'diamond' ? 400 : row.level === 'gold' ? 300 : row.level === 'silver' ? 200 : 100) * 10, // Example points
          contributions: 0, // Not available in this table
          impactScore: 80 + i, // Example
          growth: 5 + i, // Example
          badges: [row.level],
          level: row.level === 'diamond' ? 4 : row.level === 'gold' ? 3 : row.level === 'silver' ? 2 : 1,
          specialties: [row.name],
          activity: {
            weeklyCommits: 0,
            proposalsCreated: 0,
            proposalsReviewed: 0
          }
        )));
      } catch (e: any) {
        setErrorLeaders(e.message || 'Failed to load leaderboard');
      } finally {
        setLoadingLeaders(false);
      }
    }
    fetchLeaders();
  }, [timeRange, category]);
  
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

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'warning';
      case 2: return 'primary';
      case 3: return 'secondary';
      default: return 'default';
    }
  };
  
  // Show loading and error states before rendering leaderboard
  if (loadingLeaders) return <div className="p-8 text-center">Loading leaderboard...</div>;
  if (errorLeaders) return <div className="p-8 text-center text-red-500">{errorLeaders}</div>;
  if (!leaders || leaders.length === 0) return <div className="p-8 text-center">No leaderboard data found.</div>;

  return (
    <div className="animate-in fade-in duration-300 max-w-7xl mx-auto px-4">
      {/* Leaderboard Header */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Public Goods Leaderboard</h1>
            <p className="text-default-500 text-sm">Celebrating top contributors in the ecosystem</p>
          </div>
          
          <div className="flex items-center gap-2">
            <ButtonGroup>
              <Button
                size="sm"
                variant={view === "table" ? "solid" : "flat"}
                color={view === "table" ? "primary" : "default"}
                onClick={() => setView("table")}
                startContent={<Icon icon="lucide:list" width={14} height={14} />}
              >
                List
              </Button>
              <Button
                size="sm"
                variant={view === "grid" ? "solid" : "flat"}
                color={view === "grid" ? "primary" : "default"}
                onClick={() => setView("grid")}
                startContent={<Icon icon="lucide:grid" width={14} height={14} />}
              >
                Grid
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Category Filter */}
          <TimeFilter
            selectedFilter={category}
            onFilterChange={setCategory}
            variant="default"
            filterType="category"
            color="primary"
            className="flex-1 md:flex-none"
          />

          {/* Time Range Filter */}
          <TimeFilter
            selectedFilter={timeRange}
            onFilterChange={setTimeRange}
            variant="compact"
            showIcons={false}
            color="primary"
          />
        </div>
      </div>

      {/* Leaderboard Content */}
      {view === "table" ? (
        <Table 
          aria-label="Public Goods Leaderboard"
          removeWrapper
          className="min-w-full"
        >
          <TableHeader>
            <TableColumn className="text-xs w-[40px]">RANK</TableColumn>
            <TableColumn className="text-xs">BUILDER</TableColumn>
            <TableColumn className="text-xs text-right">POINTS</TableColumn>
            <TableColumn className="text-xs text-right">IMPACT</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell">GROWTH</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell">CONTRIB.</TableColumn>
            <TableColumn className="text-xs text-right hidden sm:table-cell">LEVEL</TableColumn>
            <TableColumn className="text-xs text-right w-[100px]">BADGES</TableColumn>
          </TableHeader>
          <TableBody>
            {leaders.map((leader) => (
              <TableRow key={leader.id} className="hover:bg-default-100">
                <TableCell>
                  <Chip 
                    size="sm" 
                    variant={leader.rank <= 3 ? "solid" : "flat"} 
                    color={getRankColor(leader.rank)}
                    className="min-w-[32px] justify-center"
                  >
                    {leader.rank}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={leader.avatar}
                      className="w-8 h-8"
                      radius="full"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{getDisplayName(leader)}</span>
                      <div className="flex items-center gap-1">
                        {leader.specialties.slice(0, 2).map((specialty, idx) => (
                          <Chip key={idx} size="sm" variant="flat" className="text-[10px] h-4 px-1">
                            {specialty}
                          </Chip>
                        ))}
                        {leader.specialties.length > 2 && (
                          <span className="text-[10px] text-default-400">+{leader.specialties.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-sm font-medium">{leader.points.toLocaleString()} XP</span>
                    <Progress 
                      value={(leader.points % 500) / 500 * 100} 
                      color="primary" 
                      size="sm"
                      className="w-16 h-1"
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
                  <div className="flex items-center justify-end gap-1">
                    <Icon 
                      icon={leader.growth > 0 ? "lucide:trending-up" : "lucide:trending-down"} 
                      className={leader.growth > 0 ? "text-success" : "text-danger"}
                      width={14} 
                      height={14} 
                    />
                    <span className="text-sm">{leader.growth}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <span className="text-sm">{leader.contributions}</span>
                </TableCell>
                <TableCell className="text-right hidden sm:table-cell">
                  <div className="flex items-center justify-end gap-1">
                    <Icon icon="lucide:activity" className="text-primary" width={14} height={14} />
                    <span className="text-sm">Lvl {leader.level}</span>
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
                        width={16}
                        height={16}
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaders.map((leader) => (
            <Card key={leader.id} className="border border-divider">
              <CardBody className="p-4">
                {/* Header with Rank & Points */}
                <div className="flex items-center justify-between mb-4">
                  <Chip 
                    size="sm" 
                    variant={leader.rank <= 3 ? "solid" : "flat"} 
                    color={getRankColor(leader.rank)}
                    className="min-w-[32px] justify-center"
                  >
                    #{leader.rank}
                  </Chip>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:award" className="text-primary" width={14} height={14} />
                    <span className="text-sm font-medium">{leader.points.toLocaleString()} XP</span>
                  </div>
                </div>

                {/* Builder Info */}
                <div className="flex items-start gap-3 mb-4">
                  <Avatar
                    src={leader.avatar}
                    className="w-12 h-12"
                    radius="full"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1">{getDisplayName(leader)}</h3>
                    <div className="flex flex-wrap gap-1">
                      {leader.specialties.map((specialty, idx) => (
                        <Chip key={idx} size="sm" variant="flat" className="text-xs">
                          {specialty}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-default-100 rounded-lg">
                    <div className="text-sm font-medium">{leader.activity.weeklyCommits}</div>
                    <div className="text-xs text-default-500">Commits</div>
                  </div>
                  <div className="text-center p-2 bg-default-100 rounded-lg">
                    <div className="text-sm font-medium">{leader.activity.proposalsCreated}</div>
                    <div className="text-xs text-default-500">Proposals</div>
                  </div>
                  <div className="text-center p-2 bg-default-100 rounded-lg">
                    <div className="text-sm font-medium">{leader.activity.proposalsReviewed}</div>
                    <div className="text-xs text-default-500">Reviews</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {leader.badges.map((badge, idx) => (
                      <Icon 
                        key={idx}
                        icon={badge === 'diamond' ? 'lucide:diamond' : 
                              badge === 'gold' ? 'lucide:medal' : 
                              badge === 'silver' ? 'lucide:award' : 'lucide:trophy'}
                        className={getBadgeColor(badge)}
                        width={18}
                        height={18}
                      />
                    ))}
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={leader.impactScore >= 90 ? "success" : 
                           leader.impactScore >= 80 ? "primary" : 
                           leader.impactScore >= 70 ? "secondary" : "default"}
                  >
                    Impact Score: {leader.impactScore}
                  </Chip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};