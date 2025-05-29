import React from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Tabs, Tab, Divider, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ProfilePageProps {
  isWalletConnected: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ isWalletConnected }) => {
  const [selectedTab, setSelectedTab] = React.useState("portfolio");
  
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-300">
        <Avatar
          src="https://img.heroui.chat/image/avatar?w=128&h=128&u=profile"
          className="w-20 h-20 mb-4"
          isBordered
          color="primary"
        />
        <h2 className="text-lg font-semibold mb-2">Connect Wallet</h2>
        <p className="text-xs text-default-500 text-center mb-6 max-w-xs">
          Connect your wallet to view your profile, portfolio, and transaction history.
        </p>
        <Button 
          color="primary"
          startContent={<Icon icon="lucide:wallet" />}
        >
          Connect Wallet
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-in fade-in duration-300">
      <Card className="profile-header mb-4">
        <CardBody className="p-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar
              src="https://img.heroui.chat/image/avatar?w=128&h=128&u=profile"
              className="w-16 h-16"
              isBordered
              color="primary"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-md font-semibold">Crypto Trader</h2>
              <p className="text-xs text-default-500 mb-2">0x1a2b...3c4d</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Chip size="sm" variant="flat" color="primary">Rank #42</Chip>
                <Chip size="sm" variant="flat" color="success">Verified</Chip>
                <Chip size="sm" variant="flat" color="secondary">Pro Trader</Chip>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="flat"
                startContent={<Icon icon="lucide:share-2" size={14} />}
              >
                Share
              </Button>
              <Button 
                size="sm" 
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:settings" size={14} />}
              >
                Settings
              </Button>
            </div>
          </div>
          
          <Divider className="my-3" />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-xs text-default-500">Portfolio Value</p>
              <p className="text-sm font-semibold">$24,850.75</p>
            </div>
            <div>
              <p className="text-xs text-default-500">Tokens</p>
              <p className="text-sm font-semibold">18</p>
            </div>
            <div>
              <p className="text-xs text-default-500">NFTs</p>
              <p className="text-sm font-semibold">7</p>
            </div>
            <div>
              <p className="text-xs text-default-500">Domains</p>
              <p className="text-sm font-semibold">3</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <Tabs 
        aria-label="Profile tabs" 
        selectedKey={selectedTab} 
        onSelectionChange={(key) => setSelectedTab(key as string)}
        size="sm"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-2",
          cursor: "w-full",
          tab: "px-2 py-1 text-xs"
        }}
      >
        <Tab key="portfolio" title="Portfolio" />
        <Tab key="activity" title="Activity" />
        <Tab key="nfts" title="NFTs" />
        <Tab key="domains" title="Domains" />
      </Tabs>
      
      <div className="mt-4 min-h-[200px] text-center text-xs text-default-500 py-12">
        {selectedTab === "portfolio" && "Your portfolio will appear here"}
        {selectedTab === "activity" && "Your activity will appear here"}
        {selectedTab === "nfts" && "Your NFTs will appear here"}
        {selectedTab === "domains" && "Your domains will appear here"}
      </div>
    </div>
  );
};