import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ProjectList } from "./project-list";
import { Categories } from "./Categories";

export const RetroPGFPage = () => {
  const [viewMode, setViewMode] = React.useState<"grid" | "table">("table");
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("All");

  const ViewControls = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icon icon="lucide:sparkles" className="text-orange-500" />
          RetroPGF Projects
        </h1>
      </div>
      <div className="flex gap-2">
        <Button
          isIconOnly
          size="sm"
          variant={viewMode === "table" ? "solid" : "flat"}
          className={viewMode === "table" ? "bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90" : "hover:bg-[#CDEB63]/10"}
          onClick={() => setViewMode("table")}
        >
          <Icon icon="lucide:table" width={14} height={14} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant={viewMode === "grid" ? "solid" : "flat"}
          className={viewMode === "grid" ? "bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90" : "hover:bg-[#CDEB63]/10"}
          onClick={() => setViewMode("grid")}
        >
          <Icon icon="lucide:grid" width={14} height={14} />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <ViewControls />
      <div className="mb-4">
        <Categories
          selectedFilter={selectedTimeFilter}
          onFilterChange={setSelectedTimeFilter}
          color="default"
        />
      </div>
      <ProjectList 
        viewMode={viewMode} 
        selectedTimeFilter={selectedTimeFilter}
        filterProgram="RetroPGF"
      />
    </div>
  );
};
