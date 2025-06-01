import React from "react";
import { Input, Tabs, Tab, Card, CardBody, Avatar, Button, Chip, Divider, ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react";

interface SearchResult {
  id: string;
  type: "grant" | "project" | "builder" | "domain";
  title: string;
  description: string;
  image?: string;
  status?: "active" | "completed" | "upcoming";
  stats?: {
    points?: number;
    contributions?: number;
    value?: string;
    timeLeft?: string;
    participants?: number;
  };
  tags?: string[];
}

export const SearchPage = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [timeRange, setTimeRange] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("relevant");
  
  const filterOptions = [
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
    { key: "upcoming", label: "Upcoming" }
  ];

  const timeRanges = [
    { key: "all", label: "All time" },
    { key: "week", label: "This week" },
    { key: "month", label: "This month" },
    { key: "year", label: "This year" }
  ];

  const sortOptions = [
    { key: "relevant", label: "Most relevant" },
    { key: "recent", label: "Most recent" },
    { key: "points", label: "Highest points" },
    { key: "contributions", label: "Most contributions" }
  ];

  // Mock search results with more detailed data
  const results: SearchResult[] = [
    {
      id: "1",
      type: "grant",
      title: "Ethereum ESP",
      description: "Ecosystem Support Program & Protocol Guild",
      image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      status: "active",
      stats: {
        value: "$50K-$250K",
        contributions: 156,
        timeLeft: "21 days"
      },
      tags: ["L1", "Infrastructure", "Research"]
    },
    {
      id: "2",
      type: "project",
      title: "Public Goods Network",
      description: "Scaling solutions for public goods funding",
      image: "https://assets.coingecko.com/coins/images/24383/small/aptos_logo.jpg",
      status: "active",
      stats: {
        points: 2450,
        contributions: 89,
        participants: 42
      },
      tags: ["DeFi", "Public Goods", "Infrastructure"]
    },
    {
      id: "3",
      type: "builder",
      title: "buildmaster.eth",
      description: "Core contributor & grant recipient",
      image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=1",
      stats: {
        points: 1850,
        contributions: 42
      },
      tags: ["Developer", "DAO", "Core Contributor"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg pt-2 pb-4 border-b border-divider">
        {/* Main Search Input */}
        <div className="relative mb-4">
          <Input
            classNames={{
              base: "w-full",
              mainWrapper: "h-full",
              input: "text-lg font-medium pl-12 pr-4 py-6 placeholder:text-default-400",
              inputWrapper: "h-14 font-normal bg-default-100/50 hover:bg-default-100 rounded-xl",
            }}
            placeholder="Search grants, projects, builders..."
            size="lg"
            startContent={
              <Icon 
                icon="lucide:search" 
                className="text-default-400 flex-shrink-0 ml-4" 
                width={20} 
                height={20} 
              />
            }
            endContent={
              <Button
                isIconOnly
                variant="light"
                className="text-default-400"
                size="sm"
              >
                <Icon icon="lucide:sliders" width={16} height={16} />
              </Button>
            }
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Category Tabs */}
          <Tabs 
            selectedKey={activeTab}
            onSelectionChange={setActiveTab as any}
            variant="light"
            color="primary"
            classNames={{
              base: "w-auto",
              tabList: "gap-4 w-full relative rounded-none p-0",
              cursor: "bg-primary",
              tab: "px-0 h-8 font-medium",
              tabContent: "text-sm group-data-[selected=true]:text-primary"
            }}
          >
            <Tab 
              key="all" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:layers" width={16} height={16} />
                  <span>All</span>
                </div>
              }
            />
            <Tab 
              key="grants" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:gift" width={16} height={16} />
                  <span>Grants</span>
                </div>
              }
            />
            <Tab 
              key="projects" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:folder" width={16} height={16} />
                  <span>Projects</span>
                </div>
              }
            />
            <Tab 
              key="builders" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:users" width={16} height={16} />
                  <span>Builders</span>
                </div>
              }
            />
            <Tab 
              key="domains" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:globe" width={16} height={16} />
                  <span>Domains</span>
                </div>
              }
            />
          </Tabs>

          <Divider orientation="vertical" className="h-8" />

          {/* Time Filter */}
          <TimeFilter
            selectedFilter={timeRange}
            onFilterChange={setTimeRange}
            variant="pill"
            showIcons={false}
            color="primary"
            className="hide-scrollbar"
          />
          
          <Divider orientation="vertical" className="h-8" />

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Button
              variant="light"
              size="sm"
              className="text-xs"
              endContent={<Icon icon="lucide:chevron-down" width={14} height={14} />}
            >
              Sort by: {sortOptions.find(opt => opt.key === sortBy)?.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedFilters.map((filter) => (
            <Chip
              key={filter}
              onClose={() => setSelectedFilters(prev => prev.filter(f => f !== filter))}
              variant="flat"
              size="sm"
            >
              {filter}
            </Chip>
          ))}
          <Button
            size="sm"
            variant="light"
            className="text-xs"
            onClick={() => setSelectedFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Search Results */}
      <div className="space-y-3">
        {results.map((result) => (
          <Card 
            key={result.id} 
            isPressable 
            className="border border-divider hover:border-primary transition-colors duration-200"
          >
            <CardBody className="p-4">
              <div className="flex gap-4">
                {/* Avatar/Image Section */}
                <div className="flex-shrink-0">
                  {result.image && (
                    <Avatar
                      src={result.image}
                      className="w-12 h-12"
                      isBordered={result.type === "builder"}
                      color="primary"
                    />
                  )}
                </div>
                
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold truncate">{result.title}</h3>
                    <div className="flex items-center gap-1">
                      <Chip 
                        size="sm" 
                        variant="flat" 
                        color="primary" 
                        className="capitalize"
                      >
                        {result.type}
                      </Chip>
                      {result.status && (
                        <Chip 
                          size="sm" 
                          variant="dot" 
                          color={result.status === 'active' ? 'success' : 
                                result.status === 'upcoming' ? 'warning' : 'default'}
                        >
                          {result.status}
                        </Chip>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-default-500 line-clamp-2 mb-2">
                    {result.description}
                  </p>
                  
                  {/* Stats & Metadata */}
                  {result.stats && (
                    <div className="flex items-center gap-4 text-sm text-default-500 mb-2">
                      {result.stats.value && (
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:wallet" width={14} height={14} />
                          <span>{result.stats.value}</span>
                        </div>
                      )}
                      {result.stats.points && (
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:award" width={14} height={14} />
                          <span>{result.stats.points} XP</span>
                        </div>
                      )}
                      {result.stats.contributions && (
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:git-pull-request" width={14} height={14} />
                          <span>{result.stats.contributions} contributions</span>
                        </div>
                      )}
                      {result.stats.timeLeft && (
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:clock" width={14} height={14} />
                          <span>{result.stats.timeLeft} left</span>
                        </div>
                      )}
                      {result.stats.participants && (
                        <div className="flex items-center gap-1">
                          <Icon icon="lucide:users" width={14} height={14} />
                          <span>{result.stats.participants} participants</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Tags */}
                  {result.tags && (
                    <div className="flex gap-1 flex-wrap">
                      {result.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          size="sm" 
                          variant="flat" 
                          className="text-xs bg-default-100"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 self-center">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    endContent={<Icon icon="lucide:arrow-right" width={14} height={14} />}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
