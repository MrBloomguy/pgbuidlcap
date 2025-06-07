import React from "react";
import { Routes as Switch, Route, Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
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
import BuidlAgentPage from "./Buidl-agent";
import { DocsPage } from "./docs-page";
import { ProjectDetail } from "./project-detail";
import PgTokenFun from "./pgtoken-fun";

export const Routes: React.FC = () => {
  const [selectedToken, setSelectedToken] = React.useState<string | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<any | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("24H");
  const location = useLocation();

  // Helper to get all projects from ProjectList sampleProjects
  const getAllProjects = () => {
    // This is a workaround for demo/sample data. In a real app, use a global store or fetch from API.
    return [
      {
        id: "1",
        title: "Lit Protocol",
        description: "Decentralized Access Control",
        logo_url: "https://avatars.githubusercontent.com/u/84820891",
        amount_received: 100000,
        status: "Active",
        categories: ["Privacy", "Infrastructure"],
        url: "https://litprotocol.com",
        grant_program: { name: "Optimism RetroPGF", type: "RetroPGF", round: "3" },
        reactions: { likes: 45, comments: 12, upvotes: 89 },
        comments: [
          {
            id: "c1",
            author: "CryptoWhale",
            avatar: "https://i.pravatar.cc/150?u=cryptowhale",
            text: "This project looks very promising! The tokenomics are solid 🚀",
            timestamp: "2h",
            likes: 5,
          },
          {
            id: "c2",
            author: "DeFiExpert",
            avatar: "https://i.pravatar.cc/150?u=defiexpert",
            text: "Great development team behind this. Been following since day one.",
            timestamp: "1h",
            likes: 3,
            replies: [
              {
                id: "c2-r1",
                author: "BlockchainDev",
                avatar: "https://i.pravatar.cc/150?u=blockchaindev",
                text: "Agreed! Their technical documentation is top notch.",
                timestamp: "45m",
                likes: 2,
              }
            ]
          }
        ],
        team: [
          { name: "John Doe", role: "Founder", avatar: "https://i.pravatar.cc/150?u=johndoe" },
          { name: "Jane Smith", role: "Lead Dev", avatar: "https://i.pravatar.cc/150?u=janesmith" }
        ],
        table_positions: [
          { round: "RetroPGF 3", position: 1 },
          { round: "Gitcoin GR18", position: 2 }
        ]
      },
      {
        id: "2",
        title: "Etherscan",
        description: "Blockchain explorer and analytics platform",
        logo_url: "https://etherscan.io/images/brandassets/etherscan-logo-circle.png",
        amount_received: 890000,
        status: "Active",
        categories: ["Infrastructure"],
        url: "https://etherscan.io",
        grant_program: { name: "Optimism RetroPGF", type: "RetroPGF", round: "3" },
        reactions: { likes: 30, comments: 8, upvotes: 50 },
        comments: [],
        team: [
          { name: "Alice Explorer", role: "CEO", avatar: "https://i.pravatar.cc/150?u=aliceexplorer" },
          { name: "Bob Chain", role: "CTO", avatar: "https://i.pravatar.cc/150?u=bobchain" }
        ],
        table_positions: [
          { round: "RetroPGF 3", position: 3 },
          { round: "Gitcoin GR18", position: 5 }
        ]
      },
      {
        id: "3",
        title: "Web3Modal",
        description: "The best-in-class Web3 wallet connection library",
        logo_url: "https://avatars.githubusercontent.com/u/37784886",
        amount_received: 75000,
        status: "Completed",
        categories: ["Developer Tools"],
        url: "https://github.com/WalletConnect/web3modal",
        grant_program: { name: "Gitcoin Grants", type: "Gitcoin", round: "GR18" },
        reactions: { likes: 20, comments: 5, upvotes: 10 },
        comments: [],
        team: [
          { name: "Carlos Wallet", role: "Maintainer", avatar: "https://i.pravatar.cc/150?u=carloswallet" }
        ],
        table_positions: [
          { round: "Gitcoin GR18", position: 4 }
        ]
      },
      {
        id: "4",
        title: "Remix IDE",
        description: "Open source web and desktop application for Ethereum development",
        logo_url: "https://remix.ethereum.org/assets/img/remix-logo.png",
        amount_received: 950000,
        status: "Active",
        categories: ["Developer Tools"],
        url: "https://remix.ethereum.org",
        grant_program: { name: "Optimism RetroPGF", type: "RetroPGF", round: "3" },
        reactions: { likes: 25, comments: 7, upvotes: 15 },
        comments: [],
        team: [
          { name: "Remy Mix", role: "Lead", avatar: "https://i.pravatar.cc/150?u=remymix" }
        ],
        table_positions: [
          { round: "RetroPGF 3", position: 2 }
        ]
      },
      {
        id: "5",
        title: "wagmi",
        description: "React Hooks for Ethereum",
        logo_url: "https://avatars.githubusercontent.com/u/109633172",
        amount_received: 45000,
        status: "Active",
        categories: ["Developer Tools"],
        url: "https://wagmi.sh",
        grant_program: { name: "Gitcoin Grants", type: "Gitcoin", round: "GR19" },
        reactions: { likes: 67, comments: 23, upvotes: 156 },
        comments: [],
        team: [
          { name: "Wagmi Dev", role: "Core Dev", avatar: "https://i.pravatar.cc/150?u=wagmidev" }
        ],
        table_positions: [
          { round: "Gitcoin GR19", position: 1 }
        ]
      }
    ];
  };

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

  const PgTokenFunTokenDetailWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    if (!id) return null;
    return <TokenDetail tokenId={id} onBack={() => navigate('/pgtoken.fun')} />;
  };

  return (
    <Switch>
      <Route path="/" element={
        <Navigate to="/explore" replace />
      } />
      <Route path="/explore" element={
        selectedToken ? (
          (() => {
            const project = getAllProjects().find(p => p.id === selectedToken);
            return <ProjectDetail project={project} onBack={() => setSelectedToken(null)} />;
          })()
        ) : (
          <div className="p-4 space-y-4">
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
      <Route path="/leaderboard" element={
        <Leaderboard 
          onBack={() => null} 
          onSelectToken={(token) => setSelectedToken(token)} 
        />
      } />
      <Route path="/names" element={<DomainsPage />} />
      <Route path="/submit" element={<SubmitPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/search" element={<BuidlAgentPage />} />
      <Route path="/pgtoken-fun" element={<PgTokenFun />} />
      <Route path="/pgtoken.fun" element={<PgTokenFun />} />
      <Route path="/pgtoken.fun/:id" element={<PgTokenFunTokenDetailWrapper />} />
      <Route path="*" element={<Navigate to="/explore" replace />} />
    </Switch>
  );
};