import React from "react";
import { Button, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <aside className={`w-48 bg-content1 border-r border-divider h-[calc(100vh-48px)] overflow-y-auto transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:static top-12 left-0 z-40`}>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold tracking-wide text-default-700">MY WATCHLIST</h2>
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="light" aria-label="Refresh" className="h-6 w-6 min-w-6">
              <Icon icon="lucide:refresh-cw" className="text-default-500" size={12} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Settings" className="h-6 w-6 min-w-6">
              <Icon icon="lucide:settings" className="text-default-500" size={12} />
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-default-500 py-2 px-1">
          Your Watchlist is empty.
          <br />
          Click <Icon icon="lucide:star" className="inline mx-1" size={12} /> to add
        </div>
      </div>
      
      <Divider />
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold tracking-wide text-default-700">DASHBOARDS</h2>
          <Button isIconOnly size="sm" variant="light" aria-label="Expand" className="h-6 w-6 min-w-6">
            <Icon icon="lucide:chevron-down" className="text-default-500" size={12} />
          </Button>
        </div>
        
        <div className="space-y-1">
          {[
            { icon: "lucide:trending-up", label: "Chain Rankings" },
            { icon: "lucide:activity", label: "DEX Rankings" },
            { icon: "lucide:layers", label: "New Pools" },
            { icon: "lucide:tag", label: "Categories" },
            { icon: "lucide:bot", label: "AI Agents" },
          ].map((item, index) => (
            <Button 
              key={index}
              variant="light" 
              className="w-full justify-start text-xs h-8 py-1 px-2 hover:bg-default-100"
              startContent={
                <div className="flex items-center justify-center w-5 h-5">
                  <Icon icon={item.icon} size={16} className="text-default-600" />
                </div>
              }
            >
              <span className="ml-1 truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <Divider />
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold tracking-wide text-default-700">CHAINS</h2>
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="light" aria-label="Search" className="h-6 w-6 min-w-6">
              <Icon icon="lucide:search" className="text-default-500" size={12} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Expand" className="h-6 w-6 min-w-6">
              <Icon icon="lucide:chevron-down" className="text-default-500" size={12} />
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          {[
            { icon: "cryptocurrency:eth", label: "Ethereum", color: "text-blue-500" },
            { icon: "cryptocurrency:sol", label: "Solana", color: "text-purple-500" },
            { icon: "cryptocurrency:bnb", label: "BNB Chain", color: "text-yellow-500" },
            { icon: "cryptocurrency:arb", label: "Arbitrum", color: "text-blue-400" },
            { icon: "cryptocurrency:base", label: "Base", color: "text-blue-600" },
          ].map((item, index) => (
            <Button 
              key={index}
              variant="light" 
              className="w-full justify-start text-xs h-8 py-1 px-2 hover:bg-default-100"
              startContent={
                <div className="flex items-center justify-center w-5 h-5">
                  <Icon icon={item.icon} size={16} className={item.color} />
                </div>
              }
            >
              <span className="ml-1 truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-2 border-t border-divider">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-default-500">CryptoTracker</span>
            <span className="text-xs text-default-400">v1.0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Button isIconOnly size="sm" variant="light" aria-label="Help">
              <Icon icon="lucide:help-circle" className="text-default-500" size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="GitHub">
              <Icon icon="lucide:github" className="text-default-500" size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="light" aria-label="Discord">
              <Icon icon="lucide:message-circle" className="text-default-500" size={14} />
            </Button>
          </div>
          <div className="text-xs text-default-400 text-center">
            © 2024 CryptoTracker
          </div>
        </div>
      </div>
    </aside>
  );
};