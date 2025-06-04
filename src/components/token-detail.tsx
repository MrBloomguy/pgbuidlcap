import React from "react";
import { Card, CardBody, CardHeader, Button, Tabs, Tab, Chip, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { tokens } from "../data/token-data";
import { formatNumber, getPercentageClass } from "../utils/format-utils";

interface TokenDetailProps {
  tokenId: string;
  onBack: () => void;
}

export const TokenDetail: React.FC<TokenDetailProps> = ({ tokenId, onBack }) => {
  const token = tokens.find(t => t.id === tokenId);
  const [selectedTab, setSelectedTab] = React.useState("overview");
  
  if (!token) {
    return <div>Token not found</div>;
  }
  
  const statsItems = [
    { label: "Market Cap", value: `$${formatNumber(token.volume * 10)}` },
    { label: "Volume (24h)", value: `$${formatNumber(token.volume)}` },
    { label: "Liquidity", value: `$${formatNumber(token.liquidity)}` },
    { label: "Transactions", value: formatNumber(token.transactions) },
  ];
  
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-2">
        <Button 
          isIconOnly 
          variant="light" 
          size="sm" 
          onPress={onBack}
          aria-label="Back"
        >
          <Icon icon="lucide:arrow-left" size={16} />
        </Button>
        <h1 className="text-lg font-semibold">Project Details</h1>
      </div>
      
      <Card className="token-detail-card">
        <CardHeader className="flex justify-between items-center pb-0">
          <div className="flex items-center gap-2">
            <Avatar
              src={token.image}
              className="w-8 h-8"
              radius="sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-md font-bold">{token.symbol}</h2>
                <Chip size="sm" variant="flat" color="primary">{token.chain}</Chip>
              </div>
              <p className="text-xs text-default-500">{token.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="flat" 
              color="primary"
              startContent={<Icon icon="lucide:star" size={14} />}
            >
              Watch
            </Button>
            <Button 
              size="sm" 
              variant="solid" 
              color="primary"
              startContent={<Icon icon="lucide:arrow-right-left" size={14} />}
            >
              Trade
            </Button>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold">${token.priceUsd || "0.00"}</div>
              <div className={`flex items-center gap-1 text-xs ${getPercentageClass(token.change24h)}`}>
                <Icon 
                  icon={token.change24h >= 0 ? "lucide:trending-up" : "lucide:trending-down"} 
                  size={14} 
                />
                <span>{token.change24h}% (24h)</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="light"
                className="social-action-btn"
                isIconOnly
              >
                <Icon icon="lucide:share-2" size={14} />
              </Button>
              <Button 
                size="sm" 
                variant="light"
                className="social-action-btn"
                isIconOnly
              >
                <Icon icon="lucide:bell" size={14} />
              </Button>
              <Button 
                size="sm" 
                variant="light"
                className="social-action-btn"
                isIconOnly
              >
                <Icon icon="lucide:more-horizontal" size={14} />
              </Button>
            </div>
          </div>
          
          <div className="token-stats-grid mb-4">
            {statsItems.map((item, index) => (
              <Card key={index} className="compact-card">
                <CardBody className="p-2">
                  <p className="text-[10px] text-default-500">{item.label}</p>
                  <p className="text-xs font-semibold">{item.value}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          
          <Tabs 
            aria-label="Token information tabs" 
            selectedKey={selectedTab} 
            onSelectionChange={(key) => setSelectedTab(key as string)}
            size="sm"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-1 tabs-container",
              tab: "px-3 h-9 text-xs mobile-tab",
              cursor: "w-full",
              tabContent: "group-data-[selected=true]:font-semibold"
            }}
          >
            <Tab 
              key="overview" 
              title={
                <div className="flex items-center gap-1.5">
                  <Icon icon="lucide:layout-dashboard" width={14} height={14} />
                  <span>Overview</span>
                </div>
              }
            />
            <Tab 
              key="chart" 
              title={
                <div className="flex items-center gap-1.5">
                  <Icon icon="lucide:line-chart" width={14} height={14} />
                  <span>Chart</span>
                </div>
              }
            />
            <Tab 
              key="trades" 
              title={
                <div className="flex items-center gap-1.5">
                  <Icon icon="lucide:repeat" width={14} height={14} />
                  <span>Trades</span>
                </div>
              }
            />
            <Tab 
              key="holders" 
              title={
                <div className="flex items-center gap-1.5">
                  <Icon icon="lucide:users" width={14} height={14} />
                  <span>Holders</span>
                </div>
              }
            />
            <Tab key="info" title="Info" />
          </Tabs>
          
          <div className="token-tab-content p-2 mt-2">
            {selectedTab === "overview" && (
              <div className="text-xs">
                <p className="mb-2">
                  {token.name} ({token.symbol}) is a cryptocurrency token on the {token.chain} blockchain.
                  It was created {token.age} ago and has seen {formatNumber(token.transactions)} transactions.
                </p>
                <p>
                  Current market statistics show a trading volume of ${formatNumber(token.volume)} in the last 24 hours
                  with a price change of {token.change24h}%. The token has ${formatNumber(token.liquidity)} in liquidity.
                </p>
              </div>
            )}
            {selectedTab === "chart" && <div className="text-center py-8 text-xs text-default-500">Chart data loading...</div>}
            {selectedTab === "trades" && <div className="text-center py-8 text-xs text-default-500">Recent trades loading...</div>}
            {selectedTab === "holders" && <div className="text-center py-8 text-xs text-default-500">Holder information loading...</div>}
            {selectedTab === "info" && <div className="text-center py-8 text-xs text-default-500">Token information loading...</div>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};