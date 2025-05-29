import React from "react";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <aside className={`w-48 bg-content1 border-r border-divider h-[calc(100vh-48px)] overflow-y-auto transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:static top-12 left-0 z-40`}>
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold">MY WATCHLIST</h2>
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="light" aria-label="Refresh">
              <Icon icon="lucide:refresh-cw" className="text-default-500" size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Settings">
              <Icon icon="lucide:settings" className="text-default-500" size={14} />
            </Button>
          </div>
        </div>
        
        <div className="text-[10px] text-default-500 py-2">
          Your Watchlist is empty.
          <br />
          Click <Icon icon="lucide:star" className="inline mx-1" size={12} /> to add
        </div>
      </div>
      
      <Divider />
      
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold">DASHBOARDS</h2>
          <Button isIconOnly size="sm" variant="light" aria-label="Expand">
            <Icon icon="lucide:chevron-down" className="text-default-500" size={14} />
          </Button>
        </div>
        
        <div className="space-y-1">
          {[
            { icon: "lucide:bar-chart-2", label: "Chain Rankings" },
            { icon: "lucide:bar-chart", label: "DEX Rankings" },
            { icon: "lucide:layers", label: "New Pools" },
            { icon: "lucide:tag", label: "Categories" },
            { icon: "lucide:cpu", label: "AI Agents" },
          ].map((item, index) => (
            <Button 
              key={index}
              variant="light" 
              className="w-full justify-start text-xs h-7 py-0"
              startContent={<Icon icon={item.icon} size={14} />}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
      
      <Divider />
      
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold">CHAINS</h2>
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="light" aria-label="Search">
              <Icon icon="lucide:search" className="text-default-500" size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Expand">
              <Icon icon="lucide:chevron-down" className="text-default-500" size={14} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          {[
            { icon: "logos:ethereum", label: "Ethereum" },
            { icon: "logos:solana", label: "Solana" },
            { icon: "logos:binance", label: "BNB Chain" },
            { icon: "logos:arbitrum", label: "Arbitrum" },
            { icon: "logos:base", label: "Base" },
          ].map((item, index) => (
            <Button 
              key={index}
              variant="light" 
              className="w-full justify-start text-xs h-7 py-0"
              startContent={<Icon icon={item.icon} size={14} />}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};