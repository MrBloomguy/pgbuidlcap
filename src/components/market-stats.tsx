import React from "react";
import { Card, CardBody } from "@heroui/react";
import { formatNumber } from "../utils/format-utils";

export const MarketStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
      <Card className="compact-card">
        <CardBody className="py-2">
          <div className="flex flex-col">
            <span className="text-[20px] text-default-500">Explore, track and fund public goods.</span>
            <span className="text-sm font-bold">${formatNumber(22580000000)}</span>
          </div>
        </CardBody>
      </Card>

      <Card className="compact-card">
        <CardBody className="py-2">
          <div className="flex flex-col">
            <span className="text-[20px] text-default-500">Explore, track and fund public goods.</span>
            <span className="text-sm font-bold">${formatNumber(22580000000)}</span>
          </div>
        </CardBody>
      </Card>

    </div>
  );
};