import React from 'react';

const OPTIMISM_LOGO = "https://assets.coingecko.com/coins/images/25244/small/Optimism.png";

export const ChainDisplay: React.FC = () => {
  return (
    <div className="inline-block" title="Optimism">
      <img 
        src={OPTIMISM_LOGO} 
        alt="Optimism" 
        className="w-4 h-4 rounded-full ring-1 ring-[#FF0440]/20"
      />
    </div>
  );
};
