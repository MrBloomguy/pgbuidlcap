import React from "react";
import { ProjectList } from "../../components/project-list";
import { Categories } from "../../components/Categories";

export const RetroPGFPage = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("all");
  
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">RetroPGF Projects</h1>
      </div>
      
      <div className="flex items-center justify-between">
        <Categories
          selectedFilter={selectedTimeFilter}
          onFilterChange={setSelectedTimeFilter}
          color="default"
        />
      </div>

      <ProjectList 
        viewMode="table" 
        selectedTimeFilter={selectedTimeFilter}
        filterProgram="RetroPGF"
      />
    </div>
  );
};
