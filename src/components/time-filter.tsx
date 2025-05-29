import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TimeFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TimeFilter = ({ selectedFilter, onFilterChange }: TimeFilterProps) => {
  const timeFilters = [
    { label: "ALL", icon: "lucide:clock-1" },
    { label: "DAPP", icon: "lucide:clock-6" },
    { label: "INFRA", icon: "lucide:clock" },
    { label: "DEFI", icon: "lucide:calendar" },
    { label: "GITCOIN", icon: "lucide:calendar-range" },
    { label: "GIVETH", icon: "lucide:calendar-range" },
    { label: "SOCIAL", icon: "lucide:calendar-range" },
    { label: "GAMEFI", icon: "lucide:infinity" }
  ];
  
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      <Button 
        isIconOnly
        variant="flat" 
        size="sm" 
        className="text-[#CDEB63]"
        aria-label="Sort"
      >
        <Icon icon="lucide:filter" width={14} height={14} />
      </Button>
      
      {timeFilters.map((filter) => (
        <Button
          key={filter.label}
          size="sm"
          variant={selectedFilter === filter.label ? "solid" : "flat"}
          className={`px-2 py-0 rounded-md ${
            selectedFilter === filter.label 
              ? 'bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90' 
              : 'hover:bg-[#CDEB63]/10'
          }`}
          onPress={() => onFilterChange(filter.label)}
          startContent={
            <Icon 
              icon={filter.icon} 
              width={12}
              height={12}
              className={selectedFilter === filter.label ? "text-black" : "text-[#CDEB63]"}
            />
          }
        >
          <span className={`text-xs ${selectedFilter === filter.label ? "text-black" : ""}`}>
            {filter.label}
          </span>
        </Button>
      ))}
    </div>
  );
};
