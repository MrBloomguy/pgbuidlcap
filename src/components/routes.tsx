import React from "react";
import { MarketStats } from "./market-stats";
import { TokenList } from "./token-list";
import { TokenDetail } from "./token-detail";
import { ProfilePage } from "./profile-page";
import { Leaderboard } from "./leaderboard";
import { DomainPage } from "./domain-page";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface RoutesProps {
  isWalletConnected: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ isWalletConnected }) => {
  const [currentRoute, setCurrentRoute] = React.useState("home");
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("24H");

  // Listen for mobile navigation changes
  React.useEffect(() => {
    const handleMobileNavChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setCurrentRoute(customEvent.detail.tab);
      setSelectedToken(null); // Reset token selection when changing tabs
    };
    
    window.addEventListener('mobileNavChange', handleMobileNavChange);
    return () => {
      window.removeEventListener('mobileNavChange', handleMobileNavChange);
    };
  }, []);

  const renderContent = () => {
    switch (currentRoute) {
      case "home":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <MarketStats />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={selectedTimeFilter === "24H" ? "solid" : "flat"}
                  onPress={() => setSelectedTimeFilter("24H")}
                >
                  24H
                </Button>
                <Button
                  size="sm"
                  variant={selectedTimeFilter === "7D" ? "solid" : "flat"}
                  onPress={() => setSelectedTimeFilter("7D")}
                >
                  7D
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant={viewMode === "list" ? "solid" : "flat"}
                  onPress={() => setViewMode("list")}
                >
                  <Icon icon="lucide:list" width={16} height={16} />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant={viewMode === "grid" ? "solid" : "flat"}
                  onPress={() => setViewMode("grid")}
                >
                  <Icon icon="lucide:grid" width={16} height={16} />
                </Button>
              </div>
            </div>
            <TokenList 
              viewMode={viewMode} 
              onSelectToken={(tokenId) => {
                setSelectedToken(tokenId);
                setCurrentRoute("token");
              }}
            />
          </div>
        );
      
      case "explore":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <Leaderboard 
              onBack={() => setCurrentRoute("home")}
              onSelectToken={(tokenId) => {
                setSelectedToken(tokenId);
                setCurrentRoute("token");
              }}
            />
          </div>
        );
      
      case "domains":
        return (
          <DomainPage 
            onBack={() => setCurrentRoute("home")}
            isWalletConnected={isWalletConnected}
          />
        );
      
      case "profile":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <ProfilePage 
              isWalletConnected={isWalletConnected}
            />
          </div>
        );
      
      case "token":
        return selectedToken ? (
          <TokenDetail
            tokenId={selectedToken}
            onBack={() => setCurrentRoute("home")}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
};