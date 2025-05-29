import React from "react";
import { Button } from "@heroui/react";

interface TokenPriceChartProps {
  tokenId: string;
}

export const TokenPriceChart: React.FC<TokenPriceChartProps> = ({ tokenId }) => {
  const [timeRange, setTimeRange] = React.useState("24h");
  
  // This would normally be a real chart component using a library like Recharts
  // For this example, we're just showing a placeholder
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs font-medium">Price Chart</div>
        <div className="flex gap-1">
          {["1h", "6h", "24h", "7d", "30d"].map((range) => (
            <Button
              key={range}
              size="sm"
              variant="flat"
              className={`px-2 py-0 text-[10px] min-w-0 h-6 ${timeRange === range ? "bg-content2" : ""}`}
              onPress={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-[200px] bg-content2 rounded-md flex items-center justify-center">
        <span className="text-xs text-default-500">Price chart for {timeRange} would appear here</span>
      </div>
    </div>
  );
};