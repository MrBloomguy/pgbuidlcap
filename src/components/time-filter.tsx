      <div className={`flex items-center gap-1 overflow-x-auto hide-scrollbar filter-section ${className}`}>
        {filters.map((filter) => (
          <Button
            key={filter.key}
            size="sm"
            variant={selectedFilter === filter.key ? "solid" : "light"}
            className={`px-2.5 h-7 text-xs whitespace-nowrap ${
              selectedFilter === filter.key 
                ? "bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]" 
                : "hover:bg-default-100"
            }`}
            onPress={() => onFilterChange(filter.key)}
          >
            {showIcons && filter.icon && (
              <Icon 
                icon={filter.icon} 
                width={12} 
                height={12}
                className={selectedFilter === filter.key ? "text-white" : "text-default-500"}
              />
            )}
            <span>{filter.label}</span>
          </Button>
        ))}
      </div>