import React from "react";
import { Button, ButtonGroup, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface CategoriesProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  variant?: 'default' | 'compact' | 'pill';
  showIcons?: boolean;
  color?: 'primary' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const Categories = ({ 
  selectedFilter, 
  onFilterChange, 
  variant = 'default',
  showIcons = true,
  color = 'primary',
  size = 'sm',
  className = ''
}: CategoriesProps) => {
  const allFilters = [
    { label: "DeFi", value: "defi", icon: "lucide:bank" },
    { label: "NFTs", value: "nfts", icon: "lucide:image" },
    { label: "DAOs", value: "daos", icon: "lucide:users" },
    { label: "Gaming", value: "gaming", icon: "lucide:gamepad" },
    { label: "Social", value: "social", icon: "lucide:message-circle" }
  ];

  return (
    <ButtonGroup>
      {allFilters.map(filter => (
        <Button key={filter.value} onClick={() => onFilterChange(filter.value)}>
          {filter.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
