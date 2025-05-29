
import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CategoryFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const CategoryFilter = ({ selectedFilter, onFilterChange }: CategoryFilterProps) => {
  const categoryFilters = [
    { label: "ALL", icon: "lucide:grid-3x3" },
    { label: "DEFI", icon: "lucide:coins" },
    { label: "AI", icon: "lucide:bot" },
    { label: "MEME", icon: "lucide:laugh" },
    { label: "GAMING", icon: "lucide:gamepad-2" },
    { label: "NFT", icon: "lucide:image" },
    { label: "L1", icon: "lucide:layers" },
    { label: "L2", icon: "lucide:layers-2" }
  ];
  
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      <Button 
        isIconOnly
        variant="flat" 
        size="sm" 
        className="text-default-500 compact-filter-button"
        aria-label="Sort"
      >
        <Icon icon="lucide:filter" size={14} />
      </Button>
      
      {categoryFilters.map((filter) => (
        <Button
          key={filter.label}
          size="sm"
          variant="flat"
          className={`px-2 py-0 rounded-md compact-filter-button ${selectedFilter === filter.label ? "time-filter-active" : ""}`}
          onPress={() => onFilterChange(filter.label)}
          startContent={<Icon icon={filter.icon} size={12} />}
        >
          <span className="text-xs">{filter.label}</span>
        </Button>
      ))}
    </div>
  );
};

// Keep the old component name as an alias for backward compatibility
export const TimeFilter = CategoryFilter;
