import React from "react";
import { Card, CardBody, Avatar, Button, Tabs, Tab, Chip, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Badge {
  id: string;
  name: string;
  icon: string;
  type: 'builder' | 'dev' | 'team' | 'contributor';
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  description: string;
  unlockedAt: string;
}

interface ProfilePageProps {
  isWalletConnected: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ isWalletConnected }) => {
  const [selectedTab, setSelectedTab] = React.useState("overview");

  const mockUserData = {
    name: "Alex Thompson",
    handle: "0x1234...5678",
    bio: "Building public goods for web3 | Full-stack developer | Open source contributor",
    joinedDate: "May 2025",
    points: 1250,
    level: 3,
    rank: "#125",
    contributions: 28,
    projects: [
      { 
        name: "EcoTracker", 
        description: "Open-source carbon footprint tracking dApp",
        status: "active",
        contributors: 12,
        points: 450
      },
      { 
        name: "GiveWell DAO", 
        description: "Decentralized effective altruism platform",
        status: "completed",
        contributors: 8,
        points: 320
      }
    ],
    domains: [
      { name: "alex.youbuidl", status: "active", expiryDate: "2026-05-29" },
      { name: "devs.givestation", status: "active", expiryDate: "2026-05-29" }
    ],
    transactions: [
      { type: "contribute", project: "EcoTracker", date: "2025-05-28", points: 50 },
      { type: "register", domain: "alex.youbuidl", date: "2025-05-27", price: "$25" },
      { type: "milestone", project: "GiveWell DAO", date: "2025-05-26", points: 100 }
    ],
    badges: [
      {
        id: "builder-1",
        name: "Master Builder",
        icon: "lucide:tool",
        type: "builder",
        level: "gold",
        description: "Contributed to 10+ public goods projects",
        unlockedAt: "2025-04-15"
      },
      {
        id: "dev-1",
        name: "Code Wizard",
        icon: "lucide:code",
        type: "dev",
        level: "silver",
        description: "Merged 50+ pull requests",
        unlockedAt: "2025-05-01"
      },
      {
        id: "team-1",
        name: "Team Leader",
        icon: "lucide:users",
        type: "team",
        level: "bronze",
        description: "Led a team of 5+ contributors",
        unlockedAt: "2025-05-20"
      },
      {
        id: "contributor-1",
        name: "Early Contributor",
        icon: "lucide:star",
        type: "contributor",
        level: "diamond",
        description: "One of the first 100 contributors",
        unlockedAt: "2025-03-10"
      }
    ] as Badge[]
  };

  const getBadgeColor = (level: Badge['level']) => {
    switch (level) {
      case 'bronze': return 'text-orange-400';
      case 'silver': return 'text-gray-400';
      case 'gold': return 'text-yellow-400';
      case 'diamond': return 'text-blue-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-3 pb-16">
        {/* Ultra Compact Header */}
        <div className="flex items-center gap-3 py-3 border-b border-divider">
          <div className="relative flex-shrink-0">
            <Avatar
              src="https://i.pravatar.cc/150?img=27"
              className="w-12 h-12"
              isBordered
              color="primary"
            />
            {mockUserData.badges.some(b => b.level === 'diamond') && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-blue-400 text-white rounded-full p-0.5">
                <Icon icon="lucide:diamond" width={10} height={10} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <h1 className="text-base font-bold truncate">{mockUserData.name}</h1>
                <div className="flex items-center gap-1.5 text-default-500">
                  <span className="text-xs truncate">{mockUserData.handle}</span>
                  <Chip size="sm" variant="flat" color="primary" className="h-4 px-1 text-[10px]">
                    Lvl {mockUserData.level}
                  </Chip>
                </div>
              </div>
              {isWalletConnected ? (
                <Button size="sm" isIconOnly variant="light" className="min-w-unit-6 w-6 h-6">
                  <Icon icon="lucide:edit" width={14} height={14} />
                </Button>
              ) : (
                <Button size="sm" color="primary" className="h-7 px-2 text-xs">
                  <Icon icon="lucide:wallet" width={12} height={12} className="mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Inline Stats + Progress */}
        <div className="py-2 border-b border-divider">
          <div className="grid grid-cols-4 gap-1 mb-2">
            <div className="text-center">
              <div className="text-sm font-semibold text-primary">{mockUserData.points}</div>
              <div className="text-[10px] text-default-500">Points</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">{mockUserData.rank}</div>
              <div className="text-[10px] text-default-500">Rank</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">{mockUserData.contributions}</div>
              <div className="text-[10px] text-default-500">Contrib.</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">{mockUserData.projects.length}</div>
              <div className="text-[10px] text-default-500">Projects</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress 
              value={(mockUserData.points % 1500) / 1500 * 100} 
              color="primary" 
              size="sm"
              className="flex-1 h-1"
            />
            <span className="text-[10px] text-primary whitespace-nowrap">
              {mockUserData.points}/1500
            </span>
          </div>
        </div>

        {/* Compact Badges Scroll */}
        <div className="py-2 border-b border-divider">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {mockUserData.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex-none bg-content1 rounded-md p-1.5 border border-divider min-w-[90px]"
              >
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-md bg-content2 ${getBadgeColor(badge.level)}`}>
                    <Icon icon={badge.icon} width={12} height={12} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-medium truncate">{badge.name}</div>
                    <div className="text-[9px] text-default-500 capitalize">{badge.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compact Tabs */}
        <Tabs 
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key.toString())}
          variant="underlined"
          classNames={{
            base: "w-full",
            tabList: "gap-1 w-full relative rounded-none p-0 border-b border-divider h-9",
            cursor: "w-full",
            tab: "h-9 px-2 data-[selected=true]:font-medium",
            tabContent: "text-xs group-data-[selected=true]:text-primary"
          }}
        >
          <Tab 
            key="overview" 
            title={
              <div className="flex items-center gap-1.5">
                <Icon icon="lucide:layout-dashboard" width={14} height={14} />
                <span>Overview</span>
              </div>
            }
          />
          <Tab 
            key="projects" 
            title={
              <div className="flex items-center gap-1.5">
                <Icon icon="lucide:folder" width={14} height={14} />
                <span>Projects</span>
              </div>
            }
          />
          <Tab 
            key="activity" 
            title={
              <div className="flex items-center gap-1.5">
                <Icon icon="lucide:activity" width={14} height={14} />
                <span>Activity</span>
              </div>
            }
          />
        </Tabs>

        {/* Tab Content */}
        <div className="py-2 space-y-2">
          {selectedTab === "overview" && (
            <div className="grid grid-cols-1 gap-2">
              {/* Active Projects Card */}
              <Card className="border border-divider">
                <CardBody className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium">Active Projects</h3>
                    <Button size="sm" variant="light" className="min-w-unit-12 h-6 text-xs">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {mockUserData.projects.map((project, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 py-0.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Icon 
                              icon={project.status === 'active' ? 'lucide:git-branch' : 'lucide:check'} 
                              className={project.status === 'active' ? 'text-primary' : 'text-success'}
                              width={12} 
                              height={12} 
                            />
                            <span className="text-xs font-medium truncate">{project.name}</span>
                          </div>
                          <p className="text-[10px] text-default-500 truncate">{project.description}</p>
                        </div>
                        <Chip 
                          size="sm" 
                          variant="flat"
                          color={project.status === 'active' ? 'primary' : 'success'}
                          className="h-4 px-1 text-[10px]"
                        >
                          {project.points} XP
                        </Chip>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Recent Activity Card */}
              <Card className="border border-divider">
                <CardBody className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-medium">Recent Activity</h3>
                    <Button size="sm" variant="light" className="min-w-unit-12 h-6 text-xs">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {mockUserData.transactions.slice(0, 3).map((tx, idx) => (
                      <div key={idx} className="flex items-center gap-2 py-0.5">
                        <div className="p-1 rounded-full bg-primary/10">
                          <Icon 
                            icon={tx.type === 'contribute' ? 'lucide:git-pull-request' : 
                                 tx.type === 'milestone' ? 'lucide:target' : 'lucide:check-circle'} 
                            className="text-primary"
                            width={12} 
                            height={12} 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium truncate">
                            {tx.type === 'register' ? tx.domain : tx.project}
                          </div>
                          <div className="text-[10px] text-default-500">{tx.date}</div>
                        </div>
                        <div className="text-[10px] font-medium text-primary whitespace-nowrap">
                          {tx.points ? `+${tx.points} XP` : tx.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Badges Tab */}
          {selectedTab === "badges" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockUserData.badges.map((badge) => (
                <Card key={badge.id} className="border border-divider">
                  <CardBody className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-xl bg-content2 ${getBadgeColor(badge.level)}`}>
                        <Icon icon={badge.icon} className="text-2xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{badge.name}</h3>
                          <Chip 
                            size="sm" 
                            variant="flat" 
                            className={getBadgeColor(badge.level)}
                          >
                            {badge.level}
                          </Chip>
                        </div>
                        <p className="text-sm text-default-500 mt-1">{badge.description}</p>
                        <div className="text-xs text-default-400 mt-2">
                          Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Projects Tab */}
          {selectedTab === "projects" && (
            <div className="space-y-4">
              {mockUserData.projects.map((project) => (
                <Card key={project.name} className="border border-divider">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-default-500">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip 
                          size="sm" 
                          color={project.status === 'active' ? 'success' : 'primary'}
                        >
                          {project.status}
                        </Chip>
                        <Button
                          size="sm"
                          variant="flat"
                          disabled={!isWalletConnected}
                        >
                          {project.status === 'active' ? 'View' : 'Coming Soon'}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-default-500">
                        <span>{project.contributors} contributors</span>
                        <span>{project.points} XP</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {!isWalletConnected && (
                <Card className="border border-divider bg-primary/5">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-default-500">Connect wallet to manage projects</p>
                      <Button 
                        color="primary"
                        size="sm"
                        startContent={<Icon icon="lucide:wallet" width={16} height={16} />}
                      >
                        Connect Wallet
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {selectedTab === "activity" && (
            <div className="space-y-4">
              {mockUserData.transactions.map((tx) => (
                <Card key={tx.domain} className="border border-divider">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon 
                            icon={tx.type === 'register' ? 'lucide:check-circle' : 'lucide:send'} 
                            className={tx.type === 'register' ? 'text-success' : 'text-primary'}
                            width={16} 
                            height={16} 
                          />
                          <h3 className="font-semibold">{tx.domain}</h3>
                        </div>
                        <p className="text-sm text-default-500">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{tx.points ? `+${tx.points} XP` : tx.price}</div>
                        <div className="text-sm text-default-500">{tx.type === 'register' ? 'Registration' : 'Offer Made'}</div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
              {!isWalletConnected && (
                <Card className="border border-divider bg-primary/5">
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-default-500">Connect wallet to view your activity</p>
                      <Button 
                        color="primary"
                        size="sm"
                        startContent={<Icon icon="lucide:wallet" width={16} height={16} />}
                      >
                        Connect Wallet
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};