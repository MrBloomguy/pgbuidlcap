import React from "react";
import { Card, CardBody, Avatar, Button, Tabs, Tab, Chip, Progress, Divider, Modal, ModalContent, Input, Textarea } from "@heroui/react";
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
  <div className="flex items-center gap-3 p-3 bg-default-50 rounded-xl">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon icon={icon} className="text-primary" />
    </div>
    <div>
      <p className="text-sm text-default-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

interface EditModalState {
  isOpen: boolean;
  type: 'avatar' | 'profile' | null;
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
  const shortAddress = address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

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
        base: "bg-blue-50 border-blue-500",
        content: "text-blue-600",
        dot: "bg-blue-500"
      };
      case 'gold': return {
        base: "bg-yellow-50 border-yellow-500",
        content: "text-yellow-600",
        dot: "bg-yellow-500"
      };
      case 'silver': return {
        base: "bg-gray-50 border-gray-500",
        content: "text-gray-600",
        dot: "bg-gray-500"
      };
      default: return {
        base: "bg-amber-50 border-amber-500",
        content: "text-amber-600",
        dot: "bg-amber-500"
      };
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 overflow-y-auto max-h-[calc(100vh-3rem)]">
      {/* Profile Header */}
      <Card className="w-full mb-6">
        <CardBody className="p-0">
          {/* Cover Image */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-[#CDEB63]/20 to-[#CDEB63]/10 relative">
            <Button
              isIconOnly
              className="absolute top-4 right-4 bg-background/50 backdrop-blur-md"
              variant="light"
              size="sm"
              onPress={() => setEditModal({ isOpen: true, type: 'profile' })}
            >
              <Icon icon="lucide:edit" width={14} />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="px-4 pb-4 md:px-6 md:pb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start relative">
              {/* Avatar */}
              <div className="relative -mt-12 md:-mt-16">
                <Avatar
                  src={getAvatarUrl(ensAvatar, address || '', theme as 'light' | 'dark')}
                  className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-background"
                  alt={displayName}
                />
                <Button
                  isIconOnly
                  className="absolute bottom-0 right-0 bg-background shadow-lg"
                  variant="light"
                  size="sm"
                  onPress={() => setEditModal({ isOpen: true, type: 'avatar' })}
                >
                  <Icon icon="lucide:edit-3" width={14} />
                </Button>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold">{displayName}</h1>
                  <p className="text-default-400">{shortAddress}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {/* Wallet Balance */}
                  <Chip
                    size="sm"
                    variant="dot"
                    classNames={{
                      base: "bg-success-50 border-success-500",
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
                <p className="text-sm text-default-500 max-w-2xl">
                  {bio}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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

      {/* Edit Modals */}
      <Modal 
        isOpen={editModal.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) setEditModal({ isOpen: false, type: null });
        }}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editModal.type === 'avatar' ? 'Customize Avatar' : 'Edit Profile'}
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

            {editModal.type === 'avatar' ? (
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
        </ModalContent>
      </Modal>

      {/* Tabs Navigation */}
      <Tabs 
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab as any}
        className="w-full"
        variant="underlined"
        size="lg"
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:layout-dashboard" width={16} />
              <span>Overview</span>
            </div>
          }
        >
          <div className="grid md:grid-cols-2 gap-6 py-4">
            {/* Active Projects */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Active Projects</h3>
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon icon="lucide:boxes" className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Project Name</h4>
                        <p className="text-sm text-default-400">Description of the project goes here</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Chip size="sm" variant="flat">Active</Chip>
                          <span className="text-xs text-default-400">Updated 2h ago</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardBody>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Icon icon="lucide:git-commit" className="text-success" width={14} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Contributed</span> to Project Name
                        </p>
                        <span className="text-xs text-default-400">2 hours ago</span>
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
              <Icon icon="lucide:git-merge" width={16} />
              <span>Contributions</span>
            </div>
          }
        >
          {/* Contributions content */}
        </Tab>
        <Tab
          key="projects"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:folder" width={16} />
              <span>Projects</span>
            </div>
          }
        >
          {/* Projects content */}
        </Tab>
        <Tab
          key="badges"
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:medal" width={16} />
              <span>Badges</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {badges.map((badge) => (
              <Card key={badge.id} className="border border-divider">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBadgeColor(badge.level).base}`}>
                      <Icon icon={badge.icon} className={getBadgeColor(badge.level).content} width={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{badge.name}</h4>
                        <Chip
                          size="sm"
                          variant="flat"
                          classNames={{
                            base: getBadgeColor(badge.level).base,
                            content: getBadgeColor(badge.level).content
                          }}
                        >
                          {badge.level}
                        </Chip>
                      </div>
                      <p className="text-sm text-default-400 mt-1">{badge.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Icon icon="lucide:clock" className="text-default-400" width={12} />
                        <span className="text-xs text-default-400">
                          Unlocked {new Date(badge.unlockedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
