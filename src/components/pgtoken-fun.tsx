import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

// --- Reusable Token Card Component ---
interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  marketCap: string;
  replies?: number;
  isTrending?: boolean;
  createdBy?: string;
  timeAgo?: string;
  priceChange?: string; // New: for price change display
}

const TokenCard: React.FC<TokenCardProps> = ({
  id,
  name,
  symbol,
  description,
  imageUrl,
  marketCap,
  replies,
  isTrending,
  createdBy,
  timeAgo,
  priceChange,
}) => {
  const isPositiveChange = priceChange && parseFloat(priceChange) >= 0;

  return (
    <div className={`
      bg-dark-surface-custom-1 rounded-lg border border-dark-border-custom p-3
      flex ${isTrending ? 'flex-col items-center justify-between w-[170px] h-[210px]' : 'items-start'}
      shadow-md-light hover:border-pump-green transition-all duration-200
      ${isTrending ? '' : 'w-full'}
    `}>
      <img
        src={imageUrl}
        alt={name}
        className={`
          ${isTrending ? 'w-14 h-14 mb-2 mt-2' : 'w-10 h-10 mr-2'}
          rounded-full object-cover border-2 border-pump-green
        `}
      />
      <div className={`flex-1 flex flex-col ${isTrending ? 'items-center justify-between text-center w-full' : ''}`}>
        <h3 className={`font-semibold text-foreground ${isTrending ? 'text-base' : 'text-sm'} leading-tight`}
          style={isTrending ? {minHeight: '38px'} : {}}>
          {name} <span className="text-dark-text-secondary text-xs">({symbol})</span>
        </h3>
        {description && (
          <p className={`text-dark-text-secondary text-[10px] ${isTrending ? 'line-clamp-2 min-h-[28px]' : 'line-clamp-1'}`}
            style={isTrending ? {marginBottom: '8px'} : {}}>
            {description}
          </p>
        )}
        {createdBy && timeAgo && (
          <p className="text-dark-text-secondary text-[9px] mt-1">
            created by: <span className="text-pump-green">{createdBy}</span> ({timeAgo})
          </p>
        )}
        <div className={`flex ${isTrending ? 'justify-center' : ''} items-center mt-1.5 mb-1`}>
          {replies !== undefined && (
            <span className="bg-badge-blue text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold mr-1">
              {replies} replies
            </span>
          )}
          <span className="bg-badge-green text-gray-800 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
            ${marketCap} MC
          </span>
        </div>
        {!isTrending && priceChange && (
          <div className={`text-xs font-semibold mt-1 ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}> 
            {isPositiveChange ? <Icon icon="lucide:arrow-up-right" className="inline-block mr-0.5 align-text-bottom" /> : <Icon icon="lucide:arrow-down-right" className="inline-block mr-0.5 align-text-bottom" />}
            {priceChange}%
          </div>
        )}
      </div>
    </div>
  );
};


const PgTokenFun: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        setTrendingTokens([
          { id: 't1', name: "mog/acc", symbol: "MOG/ACC", description: "The most trending token now!", imageUrl: "https://via.placeholder.com/60/FF5733/FFFFFF?text=MOG", replies: 543, marketCap: "2.1M" },
          { id: 't2', name: "Bitcoin Wizard Apple Hurler", symbol: "BWAH", description: "A classic meme, still strong.", imageUrl: "https://via.placeholder.com/60/33FF57/FFFFFF?text=BWAH", replies: 523, marketCap: "591.4K" },
          { id: 't3', name: "Chill House", symbol: "CHILLHOUSE", description: "Relaxed vibes, chill gains.", imageUrl: "https://via.placeholder.com/60/3357FF/FFFFFF?text=CHL", replies: 176, marketCap: "450K" },
          { id: 't4', name: "Another Trending Token", symbol: "ATT", description: "The token everyone is talking about.", imageUrl: "https://via.placeholder.com/60/FFFF33/000000?text=ATT", replies: 120, marketCap: "1.5M" },
          { id: 't5', name: "Fifth Trending Token", symbol: "FTT", description: "Don't miss out on this rising star.", imageUrl: "https://via.placeholder.com/60/FF33FF/FFFFFF?text=FTT", replies: 99, marketCap: "300K" },
          { id: 't6', name: "Web3 Builder", symbol: "WEB3B", description: "Building the decentralized future.", imageUrl: "https://via.placeholder.com/60/4B0082/FFFFFF?text=W3B", replies: 70, marketCap: "250K" },
        ]);

        setTokens([
          { id: 'c1', name: "Conclave (Elected)", symbol: "CAT", description: "Elected by the community, for the community.", imageUrl: "https://via.placeholder.com/60/FF5733/FFFFFF?text=E", replies: 9, marketCap: "9.9K", createdBy: "DeMaDy", timeAgo: "19m ago", priceChange: "+12.34" },
          { id: 'c2', name: "Nobody knows you're a cat", symbol: "CAT", description: "Incognito mode engaged for true anonymity.", imageUrl: "https://via.placeholder.com/60/33FF57/FFFFFF?text=C", replies: 2, marketCap: "27.7K", createdBy: "Fg3B/A", timeAgo: "18m ago", priceChange: "-5.10" },
          { id: 'c3', name: "Making Outrageous Gains", symbol: "MOG", description: "Achieve financial freedom with MOG.", imageUrl: "https://via.placeholder.com/60/3357FF/FFFFFF?text=M", replies: 5, marketCap: "8.4K", createdBy: "JbnnVv", timeAgo: "15m ago", priceChange: "+2.75" },
          { id: 'c4', name: "MAGA Crusade", symbol: "CRUSADE", description: "Making memes great again, one token at a time.", imageUrl: "https://via.placeholder.com/60/FFFF33/000000?text=MAGA", replies: 0, marketCap: "5.1K", createdBy: "CMSvP", timeAgo: "12m ago", priceChange: "-0.99" },
          { id: 'c5', name: "Gangsta Sugar Glider", symbol: "JIN", description: "Slippin' and glidin' through the crypto space.", imageUrl: "https://via.placeholder.com/60/FF33FF/FFFFFF?text=GSG", replies: 1, marketCap: "4.6K", createdBy: "Bherf42", timeAgo: "10m ago", priceChange: "+8.12" },
          { id: 'c6', name: "Mogdi", symbol: "MOGDI", description: "The original mog token, now back on the scene.", imageUrl: "https://via.placeholder.com/60/33FFFF/000000?text=MD", replies: 129, marketCap: "14.0K", createdBy: "SyJ0E3", timeAgo: "8m ago", priceChange: "+1.50" },
          { id: 'c7', name: "Blockchain Busters", symbol: "BB", description: "Busting blocks and making gains.", imageUrl: "https://via.placeholder.com/60/FF8C00/FFFFFF?text=BB", replies: 3, marketCap: "7.2K", createdBy: "Ghostie", timeAgo: "7m ago", priceChange: "-3.20" },
          { id: 'c8', name: "Decentralized Doggo", symbol: "DOGGO", description: "A community-driven decentralized dog token.", imageUrl: "https://via.placeholder.com/60/8A2BE2/FFFFFF?text=DD", replies: 15, marketCap: "11.5K", createdBy: "WoofWoof", timeAgo: "6m ago", priceChange: "+6.40" },
          { id: 'c9', name: "Meme Coin Master", symbol: "MCM", description: "Mastering the art of meme coin launches.", imageUrl: "https://via.placeholder.com/60/FFD700/000000?text=MC", replies: 22, marketCap: "18.9K", createdBy: "AlphaApe", timeAgo: "5m ago", priceChange: "+9.15" },
          { id: 'c10', name: "Pump & Dump Protector", symbol: "PDP", description: "Protecting degens from bad pumps.", imageUrl: "https://via.placeholder.com/60/00FFFF/000000?text=PDP", replies: 1, marketCap: "3.5K", createdBy: "TheShield", timeAgo: "4m ago", priceChange: "-8.70" },
          { id: 'c11', name: "Pixel Punk Token", symbol: "PPL", description: "Retro vibes, futuristic gains.", imageUrl: "https://via.placeholder.com/60/9400D3/FFFFFF?text=PP", replies: 7, marketCap: "6.8K", createdBy: "PixelArt", timeAgo: "3m ago", priceChange: "+4.90" },
        ]);

      } catch (e) {
        setError("Failed to fetch tokens");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  return (
    <div className="flex-1 p-0 sm:p-6 bg-background text-foreground font-sans max-w-full min-h-screen">
      
      {/* "New Coins" / "Create New Coin" Banner/Card */}
      <div className="relative bg-gradient-to-br from-pump-green/20 to-pump-blue/20 p-4 rounded-xl border border-pump-green/40 mb-8 flex flex-col sm:flex-row items-center justify-between shadow-lg backdrop-blur-md gap-4 min-h-[90px] h-[90px] overflow-hidden">
        {/* 3D SVG Pattern (inspired by market-stats) */}
        <div className="absolute inset-0 opacity-[0.10] z-0 pointer-events-none select-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bannerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CDEB63" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e90ff" stopOpacity="0.5" />
              </linearGradient>
              <pattern id="bannerCubeGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 0 L20 10 L40 0 L20 -10 Z" fill="none" stroke="url(#bannerGrad1)" strokeWidth="0.7" transform="translate(0, 20)" />
                <path d="M0 0 L20 10 L20 30 L0 20 Z" fill="none" stroke="url(#bannerGrad1)" strokeWidth="0.7" transform="translate(0, 20)" />
                <path d="M20 10 L40 0 L40 20 L20 30 Z" fill="none" stroke="url(#bannerGrad1)" strokeWidth="0.7" transform="translate(0, 20)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bannerCubeGrid)" />
          </svg>
        </div>
        <div className="text-foreground flex items-center gap-3 z-10">
          <Icon icon="lucide:sparkles" className="text-pump-green text-2xl animate-pulse" />
          <div className="leading-tight">
            <h3 className="font-bold text-lg">Ready to Launch Your Own Token?</h3>
            <p className="text-xs text-dark-text-secondary">It's fast, fun, and fair on pgtoken.fun!</p>
          </div>
        </div>
        <button className="z-10 bg-pump-green text-background px-5 py-2 rounded-full font-bold shadow-neon-green hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-base">
          <Icon icon="lucide:plus" width={20} height={20} />
          Create Coin
        </button>
      </div>

      {/* Now Trending Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Icon icon="lucide:flame" className="text-pump-orange text-3xl animate-flicker" />
            Now Trending
          </h3>
          <div className="flex items-center gap-1 text-dark-text-secondary">
            <button className="p-1 rounded-full hover:bg-dark-surface-custom-2 transition-colors"><Icon icon="lucide:chevron-left" /></button>
            <button className="p-1 rounded-full hover:bg-dark-surface-custom-2 transition-colors"><Icon icon="lucide:chevron-right" /></button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 py-2 scrollbar-hide min-h-[210px]">
          {loading ? (
            <div className="text-dark-text-secondary text-sm">Loading trending tokens...</div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            trendingTokens.map((token) => (
              <TokenCard key={token.id} {...token} isTrending={true} />
            ))
          )}
        </div>
      </div>

      {/* Filters and additional options */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-dark-text-secondary text-base px-1">
        <label className="flex items-center cursor-pointer gap-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-pump-green bg-dark-surface-custom-2 border-dark-border-custom rounded focus:ring-pump-green" />
          <span>Show animations</span>
        </label>
        <label className="flex items-center cursor-pointer gap-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-pump-green bg-dark-surface-custom-2 border-dark-border-custom rounded focus:ring-pump-green" />
          <span>Include NSFW</span>
        </label>
        <div className="flex items-center ml-auto gap-2 flex-wrap">
          <span className="text-base font-semibold">Categories:</span>
          <span className="bg-dark-surface-custom-2 border border-dark-border-custom text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-dark-border-custom flex items-center gap-1 transition-colors">
            <Icon icon="lucide:zap" className="text-pump-green text-lg" /> Mog Mania
          </span>
          <span className="bg-dark-surface-custom-2 border border-dark-border-custom text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-dark-border-custom flex items-center gap-1 transition-colors">
            <Icon icon="lucide:brain" className="text-pump-purple text-lg" /> AI Revolution
          </span>
          <span className="bg-dark-surface-custom-2 border border-dark-border-custom text-sm px-4 py-2 rounded-full cursor-pointer hover:bg-dark-border-custom flex items-center gap-1 transition-colors">
            <Icon icon="lucide:paw-print" className="text-pump-orange text-lg" /> Animal Identity
          </span>
          <Icon icon="lucide:chevron-right" className="text-xl cursor-pointer hover:text-foreground transition-colors" />
        </div>
      </div>

      {/* Token Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-32">
            <span className="text-lg text-dark-text-secondary animate-pulse">Loading tokens...</span>
          </div>
        ) : error ? (
          <div className="col-span-full flex justify-center items-center h-32">
            <span className="text-red-500 font-semibold text-lg">{error}</span>
          </div>
        ) : (
          tokens.map((token) => (
            <TokenCard key={token.id} {...token} />
          ))
        )}
      </div>
    </div>
  );
};

export default PgTokenFun;