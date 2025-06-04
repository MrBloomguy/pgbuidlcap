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
import { Categories } from "./Categories";
import { AdminDashboard } from "./admin-dashboard";
import { PGAgentPage } from "./pgagent-page";
import { DocsPage } from "./docs-page";
import { TokenClaimerPage } from "./token-claimer-page";

export const Routes: React.FC = () => {
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("24H");

  const ViewControls = () => (
    <div className="flex items-center justify-between">
      <Categories
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
        <Route path="/profile/:address" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/names" element={<DomainsPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/pgagent" element={<PGAgentPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/claim" element={<TokenClaimerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Switch>
    </Router>
  );
};