import React from "react";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const searchCategories = [
    { key: "all", label: "All" },
    { key: "grants", label: "Grants" },
    { key: "projects", label: "Projects" },
    { key: "builders", label: "Builders" },
    { key: "gitcoin", label: "Gitcoin" },
    { key: "retropgf", label: "RetroPGF" }
];

export const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [recentSearches] = React.useState([
        "Gitcoin Round 18",
        "Ethereum ESP",
        "Builder House",
        "Graph Grants"
    ]);

    return (
        <div className="relative">
            <div className="flex gap-2">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[24rem]",
                        mainWrapper: "h-full",
                        input: "text-sm font-medium placeholder:text-default-400",
                        inputWrapper: "h-8 font-normal text-default-300 bg-default-100/60 border border-default-200 rounded-md hover:border-default-300 focus-within:border-primary focus-within:bg-background transition-all duration-200",
                    }}
                    placeholder="Search grants, projects, or builders..."
                    size="sm"
                    radius="md"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    onClick={() => setSearchQuery(prev => prev)}
                    startContent={
                        <Icon 
                            icon="lucide:search" 
                            className="text-default-400 flex-shrink-0" 
                            width={16} 
                            height={16} 
                        />
                    }
                    endContent={
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                    size="sm" 
                                    variant="light" 
                                    isIconOnly
                                    className="text-default-400"
                                >
                                    <Icon icon="lucide:filter" width={14} height={14} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Search categories"
                                selectionMode="single"
                                selectedKeys={[selectedCategory]}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0];
                                    if (typeof selected === 'string') {
                                        setSelectedCategory(selected);
                                    }
                                }}
                            >
                                {searchCategories.map((category) => (
                                    <DropdownItem key={category.key}>
                                        {category.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    }
                />
            </div>

            {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-background border border-default-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50">
                    {/* Recent Searches */}
                    <div className="mb-4">
                        <p className="text-xs font-semibold mb-2 text-default-500">Recent Searches</p>
                        <div className="flex flex-wrap gap-2">
                            {recentSearches.map((search, index) => (
                                <Chip 
                                    key={index}
                                    variant="flat"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => setSearchQuery(search)}
                                >
                                    {search}
                                </Chip>
                            ))}
                        </div>
                    </div>

                    {/* Search Results */}
                    <div>
                        <p className="text-xs font-semibold mb-2 text-default-500">Search Results</p>
                        <div className="space-y-2">
                            {/* Example search result */}
                            <div className="flex items-center gap-2 p-2 hover:bg-default-100 rounded-md cursor-pointer">
                                <Icon icon="lucide:flag" className="text-primary" width={16} height={16} />
                                <div>
                                    <p className="text-sm font-medium">Gitcoin Grants</p>
                                    <p className="text-xs text-default-500">Public Goods Funding</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
