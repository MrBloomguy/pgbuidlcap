import React from "react";
import { MarketStats } from "./market-stats";
import { TimeFilter } from "./time-filter";
import { TokenList } from "./token-list";
import { TokenDetail } from "./token-detail";
import { ProfilePage } from "./profile-page";
import { Leaderboard } from "./leaderboard";
import { DomainPage } from "./domain-page";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface RoutesProps {
  isWalletConnected: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ isWalletConnected }) => {
  const [currentRoute, setCurrentRoute] = React.useState("home");
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("6H");
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const handleTokenSelect = (tokenId: string) => {
    setSelectedToken(tokenId);
    setCurrentRoute("token");
  };

  const handleBackToHome = () => {
    setCurrentRoute("home");
    setSelectedToken(null);
  };

  // Listen for mobile navigation changes
  React.useEffect(() => {
    const handleMobileNavChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSelectedKey(customEvent.detail.tab);
      setSelectedToken(null); // Reset token selection when changing tabs
    };
    
    window.addEventListener('mobileNavChange', handleMobileNavChange);
    return () => {
      window.removeEventListener('mobileNavChange', handleMobileNavChange);
    };
  }, []);

  const renderContent = () => {
    switch (currentRoute) {
      case "token":
        return (
          <TokenDetail 
            tokenId={selectedToken || ""}
            onBack={handleBackToHome}
          />
        );
      case "profile":
        return (
          <ProfilePage 
            isWalletConnected={isWalletConnected}
            onBack={handleBackToHome}
          />
        );
      case "leaderboard":
        return (
          <Leaderboard 
            onBack={handleBackToHome}
            onSelectToken={handleTokenSelect}
          />
        );
      case "domains":
        return (
          <DomainPage 
            onBack={handleBackToHome}
            isWalletConnected={isWalletConnected}
          />
        );
      case "home":
      default:
        return (
          <>
            <MarketStats />
            
            <div className="mb-2 mt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <TimeFilter 
                  selectedFilter={selectedTimeFilter} 
                  onFilterChange={setSelectedTimeFilter} 
                />
                
                <div className="flex gap-1">
                  <div className="flex border border-divider rounded-md overflow-hidden">
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      aria-label="List View"
                      className={`rounded-none ${viewMode === 'list' ? 'bg-content2' : ''}`}
                      size="sm"
                      onPress={() => setViewMode("list")}
                    >
                      <Icon icon="lucide:list" className="text-sm" />
                    </Button>
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      aria-label="Grid View"
                      className={`rounded-none ${viewMode === 'grid' ? 'bg-content2' : ''}`}
                      size="sm"
                      onPress={() => setViewMode("grid")}
                    >
                      <Icon icon="lucide:grid" className="text-sm" />
                    </Button>
                  </div>
                  
                  <Tooltip content="Filter">
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      aria-label="Filter"
                      className="text-default-500"
                      size="sm"
                    >
                      <Icon icon="lucide:filter" className="text-sm" />
                    </Button>
                  </Tooltip>
                  
                  <Tooltip content="Sort">
                    <Button 
                      isIconOnly 
                      variant="flat" 
                      aria-label="Sort"
                      className="text-default-500"
                      size="sm"
                    >
                      <Icon icon="lucide:arrow-up-down" className="text-sm" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
            
            <TokenList 
              viewMode={viewMode} 
              onSelectToken={handleTokenSelect}
            />
          </>
        );
    }
  };

  return renderContent();
};