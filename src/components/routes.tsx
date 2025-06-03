import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate } from "react-router-dom";
import { MarketStats } from "./market-stats";
import { ProjectList } from "./project-list";
import { TokenDetail } from "./token-detail";
import { ProfilePage } from "./profile-page";
import { Leaderboard } from "./leaderboard";
import { DomainsPage } from "./domains-page";
import { SubmitPage } from "./submit-page";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TimeFilter } from "./time-filter";
import { AdminDashboard } from "./admin-dashboard";

export const Routes: React.FC = () => {
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("24H");

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
    <Router>
      <Switch>
        <Route path="/" element={
          selectedToken ? (
            <TokenDetail tokenId={selectedToken} onBack={() => setSelectedToken(null)} />
          ) : (
            <div className="space-y-4">
              <MarketStats />
              <ViewControls />
              <ProjectList 
                viewMode={viewMode} 
                onTokenSelect={setSelectedToken}
                selectedTimeFilter={selectedTimeFilter}
              />
            </div>
          )
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/leaderboard" element={<Leaderboard onBack={() => {}} onSelectToken={setSelectedToken} />} />
        <Route path="/domains" element={<DomainsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Switch>
    </Router>
  );
};