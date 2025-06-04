import React from "react";
import { Card, CardBody } from "@heroui/react";
import { formatNumber } from "../utils/format-utils";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the market cap chart
const marketCapData = [
  { date: '01', value: 15500000000, direction: 'up' },
  { date: '02', value: 17500000000, direction: 'up' },
  { date: '03', value: 16800000000, direction: 'down' },
  { date: '04', value: 19200000000, direction: 'up' },
  { date: '05', value: 21000000000, direction: 'up' },
  { date: '06', value: 22580000000, direction: 'up' },
];

export const MarketStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-1 mb-4">
      <Card className="compact-card relative overflow-hidden group bg-gradient-to-br from-background to-background/80 hover:scale-[1.02] transition-transform">
        <div className="absolute inset-0 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#CDEB63', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#CDEB63', stopOpacity: 0.5 }} />
              </linearGradient>
              <filter id="glow1">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <pattern id="cubeGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 0 L20 10 L40 0 L20 -10 Z" fill="none" stroke="#CDEB63" strokeWidth="0.5" transform="translate(0, 20)" />
                <path d="M0 0 L20 10 L20 30 L0 20 Z" fill="none" stroke="#CDEB63" strokeWidth="0.5" transform="translate(0, 20)" />
                <path d="M20 10 L40 0 L40 20 L20 30 Z" fill="none" stroke="#CDEB63" strokeWidth="0.5" transform="translate(0, 20)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cubeGrid)" />
            <g style={{ filter: 'url(#glow1)' }}>
              <circle cx="20" cy="20" r="2" fill="#CDEB63">
                <animate attributeName="opacity" values="1;0.5;1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="30" r="2" fill="#CDEB63">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="40" cy="80" r="2" fill="#CDEB63">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="70" cy="60" r="2" fill="#CDEB63">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <path d="M20 20 L40 80" stroke="#CDEB63" strokeWidth="0.5" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="4;0;4" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M80 30 L70 60" stroke="#CDEB63" strokeWidth="0.5" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="4;0;4" dur="4s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        </div>
        <CardBody className="py-3 px-4 relative">
          <div className="flex flex-col">
            <span className="text-[16px] sm:text-[20px] text-default-500 mb-1">Total Value Locked</span>
            <span className="text-xl sm:text-2xl font-bold text-foreground">${formatNumber(22580000000)}</span>
          </div>
        </CardBody>
      </Card>

      <Card className="compact-card relative overflow-hidden group bg-gradient-to-br from-background to-background/80 hover:scale-[1.02] transition-transform">
        <CardBody className="py-3 px-4 relative">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-[16px] sm:text-[20px] text-default-500">Market Cap</span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-foreground">${formatNumber(marketCapData[marketCapData.length - 1].value)}</span>
              </div>
            </div>
            <div className="h-[24px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={marketCapData} 
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  barGap={1}
                  barCategoryGap={1}
                >
                  <Bar
                    dataKey="value"
                    fill="#1f67d2"
                    isAnimationActive={false}
                    barSize={17}
                    radius={[0, 0, 0, 0]}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${formatNumber(value)}`, 'Value']}
                    labelFormatter={(label) => `Day ${label}`}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}