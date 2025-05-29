import React from "react";
import { Button } from "@heroui/react";

interface TimeFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TimeFilter = ({ selectedFilter, onFilterChange }: TimeFilterProps) => {
  const timeFilters = ["TRENDING", "5M", "1H", "6H", "24H"];
  
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      <Button 
        isIconOnly
        variant="flat" 
        size="sm" 
        className="text-default-500 compact-filter-button"
        aria-label="Sort"
      >
        <span className="text-sm">≡</span>
      </Button>
      
      {timeFilters.map((filter) => (
        <Button
          key={filter}
          size="sm"
          variant="flat"
          className={`px-2 py-0 rounded-md compact-filter-button ${selectedFilter === filter ? "time-filter-active" : ""}`}
          onPress={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};