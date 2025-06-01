import React from "react";
import { MarketStats } from "./market-stats";
import { TokenList } from "./token-list";
import { TokenDetail } from "./token-detail";
import { ProfilePage } from "./profile-page";
import { Leaderboard } from "./leaderboard";
import { DomainPage } from "./domain-page";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TimeFilter } from "./time-filter";

export const Routes: React.FC = () => {
  const [currentRoute, setCurrentRoute] = React.useState("explore");
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table");
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

  const ViewControls = () => (
    <div className="flex items-center justify-between">
      <TimeFilter
        selectedFilter={selectedTimeFilter}
        onFilterChange={setSelectedTimeFilter}
        color="default"
      />
      <div className="flex gap-2">
        <Button
          isIconOnly
          size="sm"
          variant={viewMode === "table" ? "solid" : "flat"}
          className={viewMode === "table" ? "bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90" : "hover:bg-[#CDEB63]/10"}
          onClick={() => setViewMode("table")}
        >
          <Icon icon="lucide:table" width={14} height={14} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant={viewMode === "grid" ? "solid" : "flat"}
          className={viewMode === "grid" ? "bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90" : "hover:bg-[#CDEB63]/10"}
          onClick={() => setViewMode("grid")}
        >
          <Icon icon="lucide:grid" width={14} height={14} />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {selectedToken ? (
        <TokenDetail tokenId={selectedToken} onBack={() => setSelectedToken(null)} />
      ) : (
        <>
          {currentRoute === "explore" && (
            <div className="space-y-4">
              <MarketStats />
              <ViewControls />
              <TokenList 
                viewMode={viewMode} 
                onTokenSelect={setSelectedToken}
                selectedTimeFilter={selectedTimeFilter}
              />
            </div>
          )}
          {currentRoute === "profile" && <ProfilePage />}
          {currentRoute === "leaderboard" && (
            <Leaderboard 
              onBack={() => setCurrentRoute("explore")}
              onSelectToken={setSelectedToken}
            />
          )}
          {currentRoute === "domains" && <DomainPage />}
        </>
      )}
    </>
  );
};