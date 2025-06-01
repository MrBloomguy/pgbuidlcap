import React from "react";
import { Button, ButtonGroup, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface TimeFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  variant?: 'default' | 'compact' | 'pill';
  showIcons?: boolean;
  color?: 'primary' | 'default';
  size?: 'sm' | 'md';
  className?: string;
  filterType?: 'time' | 'category';
}

export const TimeFilter = ({ 
  selectedFilter, 
  onFilterChange, 
  variant = 'default',
  showIcons = true,
  color = 'primary',
  size = 'sm',
  className = '',
  filterType = 'time'
}: TimeFilterProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const allFilters = filterType === 'time' ? [
    { label: "1H", value: "1h", icon: "lucide:clock-1" },
    { label: "24H", value: "24h", icon: "lucide:clock-3" },
    { label: "7D", value: "7d", icon: "lucide:clock-6" },
    { label: "30D", value: "30d", icon: "lucide:calendar" },
    { label: "ALL", value: "all", icon: "lucide:infinity" }
  ] : [
    { label: "ALL", value: "all", icon: "lucide:layers" },
    { label: "DAPP", value: "dapp", icon: "lucide:box" },
    { label: "INFRA", value: "infra", icon: "lucide:hard-drive" },
    { label: "DEFI", value: "defi", icon: "lucide:landmark" },
    { label: "GITCOIN", value: "gitcoin", icon: "lucide:git-branch" },
    { label: "GIVETH", value: "giveth", icon: "lucide:heart" },
    { label: "SOCIAL", value: "social", icon: "lucide:users" },
    { label: "GAMEFI", value: "gamefi", icon: "lucide:gamepad-2" }
  ];

  // For mobile, show selected filter and ALL button
  const getVisibleFilters = () => {
    if (!isMobile) return allFilters;
    const currentFilter = allFilters.find(f => f.value === selectedFilter);
    return currentFilter?.value === 'all' ? [currentFilter] : [currentFilter, allFilters[0]].filter(Boolean);
  };

  const getColorClasses = (isSelected: boolean) => {
    if (color === 'primary') {
      return isSelected 
        ? 'bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90' 
        : 'hover:bg-[#CDEB63]/10';
    }
    return isSelected
      ? 'bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90'
      : 'hover:bg-[#CDEB63]/10';
  };
  
  const renderFilters = () => {
    switch (variant) {
      case 'compact':
        return (
          <ButtonGroup 
            size={size} 
            variant="flat" 
            className={`relative ${className}`}
            ref={dropdownRef}
          >
            {getVisibleFilters().map((filter) => (
              <Tooltip 
                key={filter.value}
                content={filter.label}
                delay={1000}
              >
                <Button
                  className={`${getColorClasses(selectedFilter === filter.value)} transition-colors duration-150`}
                  onPress={() => {
                    if (isMobile && filter.value === 'all') {
                      setIsDropdownOpen(!isDropdownOpen);
                    } else {
                      onFilterChange(filter.value);
                    }
                  }}
                  isIconOnly={showIcons}
                  endContent={isMobile && filter.value === 'all' ? (
                    <Icon 
                      icon="lucide:chevron-down" 
                      width={14} 
                      height={14} 
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}  
                    />
                  ) : undefined}
                >
                  {showIcons ? (
                    <Icon 
                      icon={filter.icon} 
                      width={size === 'sm' ? 14 : 16}
                      height={size === 'sm' ? 14 : 16}
                      className={selectedFilter === filter.value ? "text-current" : ""}
                    />
                  ) : (
                    <span className="text-xs">{filter.label}</span>
                  )}
                </Button>
              </Tooltip>
            ))}
            
            {isMobile && isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-divider rounded-lg shadow-lg z-50 p-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                {allFilters.filter(f => f.value !== selectedFilter && f.value !== 'all').map((filter) => (
                  <Button
                    key={filter.value}
                    size={size}
                    variant="light"
                    className="w-full justify-start mb-1 last:mb-0 transition-colors duration-150"
                    onPress={() => {
                      onFilterChange(filter.value);
                      setIsDropdownOpen(false);
                    }}
                    startContent={
                      <Icon 
                        icon={filter.icon} 
                        width={size === 'sm' ? 14 : 16}
                        height={size === 'sm' ? 14 : 16}
                      />
                    }
                  >
                    <span className="text-xs">{filter.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </ButtonGroup>
        );

      case 'pill':
        return (
          <div className={`inline-flex rounded-full bg-default-100 p-1 relative ${className}`} ref={dropdownRef}>
            {getVisibleFilters().map((filter) => (
              <Button
                key={filter.value}
                size={size}
                variant="light"
                className={`rounded-full px-3 transition-colors duration-150 ${
                  selectedFilter === filter.value 
                    ? 'bg-[#CDEB63] text-black' 
                    : ''
                }`}
                onPress={() => {
                  if (isMobile && filter.value === 'all') {
                    setIsDropdownOpen(!isDropdownOpen);
                  } else {
                    onFilterChange(filter.value);
                  }
                }}
                startContent={showIcons ? (
                  <Icon 
                    icon={filter.icon} 
                    width={size === 'sm' ? 14 : 16}
                    height={size === 'sm' ? 14 : 16}
                  />
                ) : undefined}
                endContent={isMobile && filter.value === 'all' ? (
                  <Icon 
                    icon="lucide:chevron-down" 
                    width={14} 
                    height={14} 
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                ) : undefined}
              >
                <span className="text-xs">{filter.label}</span>
              </Button>
            ))}

            {isMobile && isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-divider rounded-lg shadow-lg z-50 p-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                {allFilters.filter(f => f.value !== selectedFilter && f.value !== 'all').map((filter) => (
                  <Button
                    key={filter.value}
                    size={size}
                    variant="light"
                    className="w-full justify-start mb-1 last:mb-0 transition-colors duration-150"
                    onPress={() => {
                      onFilterChange(filter.value);
                      setIsDropdownOpen(false);
                    }}
                    startContent={
                      <Icon 
                        icon={filter.icon} 
                        width={size === 'sm' ? 14 : 16}
                        height={size === 'sm' ? 14 : 16}
                      />
                    }
                  >
                    <span className="text-xs">{filter.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="relative" ref={dropdownRef}>
            <div className={`flex items-center gap-2 ${isMobile ? '' : 'overflow-x-auto pb-1'} ${className}`}>
              {getVisibleFilters().map((filter) => (
                <Button
                  key={filter.value}
                  size={size}
                  variant={selectedFilter === filter.value ? "solid" : "flat"}
                  className={`px-3 rounded-md transition-all duration-150 ${getColorClasses(selectedFilter === filter.value)}`}
                  onPress={() => {
                    if (isMobile && filter.value === 'all') {
                      setIsDropdownOpen(!isDropdownOpen);
                    } else {
                      onFilterChange(filter.value);
                    }
                  }}
                  endContent={isMobile && filter.value === 'all' ? (
                    <Icon 
                      icon="lucide:chevron-down" 
                      width={14} 
                      height={14} 
                      className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  ) : undefined}
                  startContent={showIcons ? (
                    <Icon 
                      icon={filter.icon} 
                      width={size === 'sm' ? 14 : 16}
                      height={size === 'sm' ? 14 : 16}
                      className={selectedFilter === filter.value ? "text-current" : ""}
                    />
                  ) : undefined}
                >
                  <span className="text-xs">
                    {filter.label}
                  </span>
                </Button>
              ))}
            </div>

            {isMobile && isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-background border border-divider rounded-lg shadow-lg z-50 p-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                {allFilters.filter(f => f.value !== selectedFilter && f.value !== 'all').map((filter) => (
                  <Button
                    key={filter.value}
                    size={size}
                    variant="light"
                    className="w-full justify-start mb-1 last:mb-0 transition-colors duration-150"
                    onPress={() => {
                      onFilterChange(filter.value);
                      setIsDropdownOpen(false);
                    }}
                    startContent={
                      <Icon 
                        icon={filter.icon} 
                        width={size === 'sm' ? 14 : 16}
                        height={size === 'sm' ? 14 : 16}
                      />
                    }
                  >
                    <span className="text-xs">{filter.label}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return renderFilters();
};
