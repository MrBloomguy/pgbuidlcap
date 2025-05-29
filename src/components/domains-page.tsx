import React from "react";
import { Card, CardBody, CardHeader, Avatar, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const DomainsPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("all");
  
  const domains = [
    { id: 1, name: "ethereum.eth", owner: "0x1a2b...3c4d", price: "1.5 ETH", expiry: "2025-06-15", image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=eth1" },
    { id: 2, name: "solana.sol", owner: "0x4e5f...6g7h", price: "25 SOL", expiry: "2024-12-30", image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=sol1" },
    { id: 3, name: "crypto.eth", owner: "0x8i9j...0k1l", price: "3.2 ETH", expiry: "2026-03-22", image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=eth2" },
    { id: 4, name: "defi.sol", owner: "0x2m3n...4o5p", price: "18 SOL", expiry: "2025-08-10", image: "https://img.heroui.chat/image/avatar?w=64&h=64&u=sol2" },
  ];
  
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Domains</h1>
        <Button 
          size="sm" 
          color="primary"
          startContent={<Icon icon="lucide:plus" size={14} />}
        >
          Register
        </Button>
      </div>
      
      <div className="flex border-b border-divider mb-4">
        {["all", "eth", "sol", "watchlist"].map((tab) => (
          <button
            key={tab}
            className={`domain-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all" ? "All Domains" : 
             tab === "eth" ? "Ethereum" : 
             tab === "sol" ? "Solana" : "Watchlist"}
          </button>
        ))}
      </div>
      
      <div className="grid-view">
        {domains.map((domain) => (
          <Card key={domain.id} className="token-grid-card">
            <CardHeader className="flex gap-3 p-3">
              <Avatar src={domain.image} radius="sm" size="sm" />
              <div className="flex flex-col">
                <p className="text-xs font-bold">{domain.name}</p>
                <p className="text-[10px] text-default-500">Owner: {domain.owner}</p>
              </div>
            </CardHeader>
            <CardBody className="p-3 pt-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-default-500">Price</p>
                  <p className="text-xs font-semibold">{domain.price}</p>
                </div>
                <div>
                  <p className="text-[10px] text-default-500">Expires</p>
                  <p className="text-xs">{domain.expiry}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                color="primary" 
                variant="flat" 
                className="w-full mt-2"
                startContent={<Icon icon="lucide:shopping-cart" size={14} />}
              >
                Make Offer
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};