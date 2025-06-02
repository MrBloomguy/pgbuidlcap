import React from "react";
import { Card, CardBody, Avatar, Button, Tabs, Tab, Chip, Progress, Divider, Modal, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAccount, useEnsName, useEnsAvatar, useBalance } from 'wagmi';
import { useTheme } from "@heroui/use-theme";
import { getAvatarUrl, generateAvatar, saveAvatarSettings, AvatarCustomization } from '../utils/avatar-utils';

interface Badge {
  id: string;
  name: string;
  icon: string;
  type: 'builder' | 'dev' | 'team' | 'contributor';
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  description: string;
  unlockedAt: string;
}

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
  <div className="flex flex-col items-center gap-3 p-4 bg-content1/50 backdrop-blur-sm rounded-2xl hover:bg-content1 transition-all border border-content1 group">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon icon={icon} className="text-primary w-7 h-7" />
    </div>
    <div className="text-center">
      <p className="text-xs text-default-400 mb-1 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

interface EditModalState {
  isOpen: boolean;
  type: 'avatar' | 'profile' | 'share' | null;
}

export const ProfilePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [editModal, setEditModal] = React.useState<EditModalState>({ isOpen: false, type: null });
  const [bio, setBio] = React.useState("Building public goods for web3 | Full-stack developer | Open source contributor");
  const [avatarSettings, setAvatarSettings] = React.useState<AvatarCustomization>({});
  
  const { address, isConnecting, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { data: balance } = useBalance({ address });
  const { theme } = useTheme();

  // Handler for avatar customization
  const handleAvatarCustomize = () => {
    const newSettings: AvatarCustomization = {
      ...avatarSettings,
      seed: Math.random().toString(), // Generate new random avatar
    };
    setAvatarSettings(newSettings);
    if (address) {
      saveAvatarSettings(address, newSettings);
    }
  };

  // Handler for profile edit
  const handleProfileEdit = (newBio: string) => {
    setBio(newBio);
    setEditModal({ isOpen: false, type: null });
  };

  // If wallet is not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <Icon icon="lucide:wallet" className="w-16 h-16 text-default-300" />
        <h2 className="text-xl font-bold text-default-600">Connect Your Wallet</h2>
        <p className="text-default-400 text-center max-w-md">
          Connect your wallet to view your profile, contributions, and builder stats.
        </p>
      </div>
    );
  }

  // Loading state while fetching wallet data
  if (isConnecting) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }

  const displayName = ensName || address;
  const shortAddress = address ? 
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

  // Helper function to format the balance with appropriate decimal places
  const formatBalance = () => {
    if (!balance?.formatted) return '0.0000';
    const num = Number(balance.formatted);
    return num < 0.0001 ? '<0.0001' : num.toFixed(4);
  };

  // Example badges data (replace with actual data from your API/state)
  const badges: Badge[] = [
    { 
      id: '1', 
      name: 'Early Builder',
      icon: 'lucide:hammer',
      type: 'builder',
      level: 'gold',
      description: 'One of the first builders on the platform',
      unlockedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Code Contributor',
      icon: 'lucide:git-pull-request',
      type: 'dev',
      level: 'silver',
      description: 'Contributed to multiple open source projects',
      unlockedAt: '2024-02-01'
    }
  ];

  const getBadgeColor = (level: 'bronze' | 'silver' | 'gold' | 'diamond') => {
    switch (level) {
      case 'diamond': return {
        base: "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 border border-blue-200 shadow-sm hover:shadow-md transition-shadow",
        content: "text-blue-700 font-medium",
        dot: "bg-gradient-to-r from-blue-400 to-blue-600",
        icon: "text-blue-600"
      };
      case 'gold': return {
        base: "bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-50 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow",
        content: "text-yellow-700 font-medium",
        dot: "bg-gradient-to-r from-yellow-400 to-amber-500",
        icon: "text-yellow-600"
      };
      case 'silver': return {
        base: "bg-gradient-to-r from-gray-50 via-slate-100 to-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow",
        content: "text-gray-700 font-medium",
        dot: "bg-gradient-to-r from-gray-400 to-slate-500",
        icon: "text-gray-600"
      };
      default: return {
        base: "bg-gradient-to-r from-orange-50 via-amber-100 to-orange-50 border border-amber-200 shadow-sm hover:shadow-md transition-shadow",
        content: "text-amber-700 font-medium",
        dot: "bg-gradient-to-r from-amber-400 to-orange-500",
        icon: "text-amber-600"
      };
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-4 relative pb-20 md:pb-4">
      {/* Profile Header */}
      <Card className="w-full overflow-visible rounded-2xl border-none shadow-lg">
        <CardBody className="p-0">
          {/* Cover Image */}
          <div className="relative">
            <div className="h-40 sm:h-48 md:h-56 bg-gradient-to-br from-primary/30 via-primary/20 to-background/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-30 mix-blend-soft-light"></div>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                isIconOnly
                className="bg-background/80 backdrop-blur-xl hover:bg-background shadow-lg transition-all"
                variant="flat"
                size="sm"
                onPress={() => setEditModal({ isOpen: true, type: 'share' })}
              >
                <Icon icon="lucide:share" width={14} />
              </Button>
              <Button
                isIconOnly
                className="bg-background/80 backdrop-blur-xl hover:bg-background shadow-lg transition-all"
                variant="flat"
                size="sm"
                onPress={() => setEditModal({ isOpen: true, type: 'profile' })}
              >
                <Icon icon="lucide:edit" width={14} />
              </Button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-4 pb-6 md:px-6 md:pb-8">
            <div className="flex flex-col items-center relative">
              {/* Avatar */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 md:static md:transform-none">
                <Avatar
                  src={getAvatarUrl(ensAvatar, address || '', theme as 'light' | 'dark')}
                  className="w-28 h-28 md:w-32 md:h-32 ring-4 ring-background shadow-xl"
                  alt={displayName}
                />
                <Button
                  isIconOnly
                  className="absolute bottom-0 right-0 bg-background shadow-lg"
                  variant="flat"
                  size="sm"
                  onPress={() => setEditModal({ isOpen: true, type: 'avatar' })}
                >
                  <Icon icon="lucide:edit-3" width={14} />
                </Button>
              </div>

              {/* Profile Details */}
              <div className="w-full mt-14 md:mt-6 space-y-6 text-center">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{displayName}</h1>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-default-400 text-sm font-medium tracking-wide">{shortAddress}</p>
                    <Button
                      isIconOnly
                      className="w-6 h-6 min-w-unit-6 bg-default-100/50 hover:bg-default-200/50"
                      variant="light"
                      size="sm"
                      onPress={() => navigator.clipboard.writeText(address || '')}
                    >
                      <Icon icon="lucide:copy" className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {/* Wallet Balance */}
                  <Chip
                    size="sm"
                    variant="dot"
                    classNames={{
                      base: "bg-success-50/50 backdrop-blur-sm border-success-500",
                      content: "text-success-600 text-small font-medium",
                      dot: "bg-success-500"
                    }}
                    startContent={
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:wallet" width={12} />
                        <span>
                          {formatBalance()} {balance?.symbol || 'ETH'}
                        </span>
                      </div>
                    }
                  />

                  {/* Active Badges */}
                  {badges.slice(0, 3).map((badge) => (
                    <Chip
                      key={badge.id}
                      size="sm"
                      variant="dot"
                      classNames={{
                        base: getBadgeColor(badge.level).base,
                        content: getBadgeColor(badge.level).content,
                        dot: getBadgeColor(badge.level).dot,
                      }}
                      startContent={
                        <div className="flex items-center gap-1">
                          <Icon icon={badge.icon} width={12} />
                          <span>{badge.name}</span>
                        </div>
                      }
                    />
                  ))}
                </div>

                {/* Bio */}
                <div className="max-w-2xl mx-auto px-4">
                  <p className="text-sm text-default-500 leading-relaxed">
                    {bio}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 px-2">
                  <StatCard
                    label="Experience"
                    value="1,250"
                    icon="lucide:star"
                  />
                  <StatCard
                    label="Contributions"
                    value="28"
                    icon="lucide:git-merge"
                  />
                  <StatCard
                    label="Projects"
                    value="4"
                    icon="lucide:folder"
                  />
                  <StatCard
                    label="Reputation"
                    value="#125"
                    icon="lucide:award"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 md:hidden z-50 flex flex-col-reverse gap-3">
        <Button
          isIconOnly
          variant="solid"
          color="primary"
          className="w-12 h-12 rounded-full shadow-xl bg-gradient-to-r from-primary to-primary-600 hover:opacity-90 transition-all"
          onPress={() => setEditModal({ isOpen: true, type: 'profile' })}
        >
          <Icon icon="lucide:edit" className="w-5 h-5" />
        </Button>
        <Button
          isIconOnly
          variant="flat"
          className="w-12 h-12 rounded-full shadow-xl bg-background/80 backdrop-blur-xl hover:bg-background transition-all"
          onPress={() => setEditModal({ isOpen: true, type: 'share' })}
        >
          <Icon icon="lucide:share" className="w-5 h-5" />
        </Button>
      </div>

      {/* Edit Modals */}
      {editModal.isOpen && (
        <Modal
          isOpen={true}
          onClose={() => setEditModal({ isOpen: false, type: null })}
          className="max-w-md mx-4"
        >
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editModal.type === 'avatar' ? 'Customize Avatar' : 
                 editModal.type === 'share' ? 'Share Profile' :
                 'Edit Profile'}
              </h3>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setEditModal({ isOpen: false, type: null })}
              >
                <Icon icon="lucide:x" width={16} />
              </Button>
            </div>

            {editModal.type === 'share' ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button
                    variant="flat"
                    color="default"
                    className="w-full justify-start px-4"
                    startContent={<Icon icon="lucide:link" width={18} />}
                  >
                    Copy Profile Link
                  </Button>
                  <Button
                    variant="flat"
                    color="default"
                    className="w-full justify-start px-4"
                    startContent={<Icon icon="lucide:twitter" width={18} />}
                  >
                    Share on Twitter
                  </Button>
                  <Button
                    variant="flat"
                    color="default"
                    className="w-full justify-start px-4"
                    startContent={<Icon icon="lucide:share" width={18} />}
                  >
                    More Options
                  </Button>
                </div>
              </div>
            ) : editModal.type === 'avatar' ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Avatar
                    src={generateAvatar(address || '', theme as 'light' | 'dark', avatarSettings)}
                    className="w-32 h-32"
                    alt="Preview"
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="flat"
                    color="primary"
                    onPress={handleAvatarCustomize}
                    startContent={<Icon icon="lucide:refresh-cw" width={16} />}
                  >
                    Generate New
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="light"
                onPress={() => setEditModal({ isOpen: false, type: null })}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  if (editModal.type === 'profile') {
                    handleProfileEdit(bio);
                  } else {
                    setEditModal({ isOpen: false, type: null });
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Tabs Navigation */}
      <div className="overflow-x-auto">
        <Tabs 
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab as any}
          className="w-full"
          variant="underlined"
          size="sm"
          classNames={{
            base: "w-full",
            tabList: "gap-2 w-full relative rounded-none p-0 border-b border-divider",
            tab: "max-w-fit px-2 h-10",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
        >
          <Tab
            key="overview"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:layout-dashboard" className="w-4 h-4" />
                <span className="text-sm">Overview</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 py-3 sm:py-4">            {/* Active Projects */}
            <Card className="bg-background/60 backdrop-blur-lg">
              <CardBody className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Active Projects</h3>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    className="hidden sm:flex"
                  >
                    <Icon icon="lucide:plus" width={16} />
                  </Button>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-content1/50 backdrop-blur-sm border border-content1 hover:bg-content1 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon icon="lucide:boxes" className="text-primary w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">Project Name</h4>
                        <p className="text-sm text-default-400 line-clamp-2">Description of the project goes here with more details about what it does</p>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Chip size="sm" variant="flat" color="primary">Active</Chip>
                          <span className="text-xs text-default-400">Updated 2h ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-background/60 backdrop-blur-lg">
              <CardBody className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold">Recent Activity</h3>
                  <Button
                    variant="light"
                    size="sm"
                    className="hidden sm:flex"
                    endContent={<Icon icon="lucide:chevron-right" width={16} />}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-content1/50 backdrop-blur-sm border border-content1 hover:bg-content1 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Icon icon="lucide:git-commit" className="text-success" width={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">
                          <span className="font-medium">Contributed</span> to Project Name
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-default-400">2 hours ago</span>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-success/10 text-success">+28 XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            </div>
          </Tab>
          <Tab
            key="contributions"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:git-merge" className="w-4 h-4" />
                <span className="text-sm">Contributions</span>
              </div>
            }
          >
            <div className="py-3">
              {/* Contributions content */}
            </div>
          </Tab>
          <Tab
            key="projects"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:folder" className="w-4 h-4" />
                <span className="text-sm">Projects</span>
              </div>
            }
          >
            <div className="py-3">
              {/* Projects content */}
            </div>
          </Tab>
          <Tab
            key="badges"
            title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:medal" className="w-4 h-4" />
                <span className="text-sm">Badges</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 py-3 sm:py-4">
              {badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`group cursor-pointer border border-divider hover:border-transparent ${getBadgeColor(badge.level).base}`}
                >
                  <CardBody className="p-3 sm:p-5">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon 
                          icon={badge.icon} 
                          className={`${getBadgeColor(badge.level).icon} group-hover:scale-110 transition-all`} 
                          width={20} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{badge.name}</h4>
                            <div className="flex items-center gap-2">
                              <Chip
                                size="sm"
                                variant="flat"
                                classNames={{
                                  base: `bg-white/50 backdrop-blur-sm border-none`,
                                  content: getBadgeColor(badge.level).content
                                }}
                              >
                                {badge.level}
                              </Chip>
                              <span className="text-xs text-default-400 flex items-center gap-1">
                                <Icon icon="lucide:clock" width={12} />
                                {new Date(badge.unlockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-default-600">{badge.description}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
