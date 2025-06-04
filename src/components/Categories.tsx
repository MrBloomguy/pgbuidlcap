import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
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
    { label: "Social", value: "social", icon: "lucide:message-circle" },
    { label: "AI", value: "ai", icon: "lucide:cpu" },
    { label: "Infrastructure", value: "infra", icon: "lucide:server" },
    { label: "ReFi", value: "refi", icon: "lucide:leaf" }
  ];

  const mainFilters = allFilters.slice(0, 3);
  const moreFilters = allFilters.slice(3);

  const renderCategoryButton = (filter: typeof allFilters[0]) => (
    <Button
      key={filter.value}
      size="sm"
      variant={selectedFilter === filter.value ? "solid" : "light"}
      className={`category-button whitespace-nowrap ${
        selectedFilter === filter.value 
          ? "bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]" 
          : "hover:bg-default-100"
      }`}
      onPress={() => onFilterChange(filter.value)}
      startContent={
        showIcons ? (
          <Icon 
            icon={filter.icon} 
            className={selectedFilter === filter.value ? "text-white" : "text-default-500"} 
          />
        ) : null
      }
    >
      <span>{filter.label}</span>
    </Button>
  );

  return (
    <div className="category-tabs-container flex items-center gap-2">
      {/* Main categories - always visible */}
      <div className="flex items-center gap-2">
        {mainFilters.map(renderCategoryButton)}
      </div>

      {/* More dropdown - visible on mobile */}
      <div className="block sm:hidden">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="light"
              className="more-categories-button whitespace-nowrap"
              endContent={<Icon icon="lucide:chevron-down" />}
            >
              
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            className="more-categories-dropdown"
            aria-label="More categories"
            onAction={(key) => onFilterChange(key as string)}
            selectedKeys={new Set([selectedFilter])}
          >
            {moreFilters.map((filter) => (
              <DropdownItem
                key={filter.value}
                className="text-sm"
                startContent={showIcons ? <Icon icon={filter.icon} /> : null}
              >
                {filter.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Additional categories - visible on desktop */}
      <div className="hidden sm:flex items-center gap-2">
        {moreFilters.map(renderCategoryButton)}
      </div>
    </div>
  );
};
