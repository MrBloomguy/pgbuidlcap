import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Tooltip } from '@heroui/react';
import { Contract, BrowserProvider } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { ChainDisplay } from './ChainDisplay';  // Import ChainDisplay
import launchpadAbi from '../abi/launchpad.json';
import builderTokenAbi from '../abi/builderToken.json';

const LAUNCHPAD_ADDRESS = "0x0ca78A8FC88B014bC52F11e3FbD71D4C8d10521A";
const OPTIMISM_LOGO = "https://assets.coingecko.com/coins/images/25244/small/Optimism.png";

interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  imageUrl?: string;
  marketCap: string;
  category?: string;
  teamName?: string;
  links?: {
    github?: string;
    website?: string;
    twitter?: string;
    discord?: string;
  };
  fundingGoal?: number;
  replies?: number;
  isTrending?: boolean;
  createdBy?: string;
  timeAgo?: string;
  priceChange?: string;
}

interface TokenTableProps {
  tokens: TokenCardProps[];
}

// Helper Functions
function truncateAddress(address: string): string {
  if (!address) return 'Anonymous';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const intervals = {
    y: 31536000,
    mo: 2592000,
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit}`;
    }
  }
  
  return 'just now';
}

// Helper function to format token description
function formatTokenDescription(name: string, symbol: string): string {
  return `${symbol} token on Optimism Sepolia`;
}

// --- Skeleton Card Component for Loading State
const SkeletonCard: React.FC<{ isTrending?: boolean }> = ({ isTrending = false }) => (
  <div className={`
    bg-dark-surface-custom-1 rounded-lg border border-dark-border-custom p-3
    flex ${isTrending ? 'flex-col items-center justify-between w-[170px] h-[210px]' : 'items-start'}
    animate-pulse
  `}>
    <div className={`bg-dark-surface-custom-2 rounded-full ${isTrending ? 'w-14 h-14 mb-2' : 'w-10 h-10 mr-2'}`} />
    <div className={`flex-1 ${isTrending ? 'flex flex-col items-center w-full' : ''}`}>
      <div className="h-4 bg-dark-surface-custom-2 rounded w-3/4 mb-2" />
      <div className="h-3 bg-dark-surface-custom-2 rounded w-1/2 mb-2" />
      <div className="h-3 bg-dark-surface-custom-2 rounded w-full mb-2" />
      <div className="mt-2 flex gap-2">
        <div className="h-4 w-12 bg-dark-surface-custom-2 rounded-full" />
        <div className="h-4 w-12 bg-dark-surface-custom-2 rounded-full" />
      </div>
    </div>
  </div>
);

// --- Token Card Component
const TokenCard: React.FC<TokenCardProps> = ({
  id,
  name,
  symbol,
  description,
  imageUrl = '',
  marketCap,
  category = 'OTHER',
  teamName,
  links,
  fundingGoal,
  replies,
  isTrending = false,
  createdBy,
  timeAgo,
  priceChange,
}) => {
  const isPositiveChange = priceChange && parseFloat(priceChange) >= 0;
  const chainInfo = <ChainDisplay />;

  const cardContent = (
    <div className={`
      bg-dark-surface-custom-1 rounded-lg border border-dark-border-custom p-3
      flex ${isTrending ? 'flex-col items-center justify-between w-[170px] h-[210px]' : 'items-start'}
    `}>
      <img
        src={imageUrl || '/default-token.png'}
        alt={name}
        className={`
          ${isTrending ? 'w-14 h-14 mb-2 mt-2' : 'w-10 h-10 mr-2'}
          rounded-full object-cover border-2 border-pump-green
          group-hover:scale-110 transition-transform duration-200
        `}
      />
      <div className={`flex-1 flex flex-col ${isTrending ? 'items-center justify-between text-center w-full' : ''}`}>
        <div>
          <h3 className={`font-semibold text-foreground ${isTrending ? 'text-base' : 'text-sm'} leading-tight`}
            style={isTrending ? {minHeight: '38px'} : {}}>
            {name} <span className="text-dark-text-secondary text-xs">({symbol})</span>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] bg-dark-surface-custom-2 px-2 py-0.5 rounded-full text-dark-text-secondary">
              {category}
            </span>
            {teamName && (
              <span className="text-[10px] text-dark-text-secondary">
                by {teamName}
              </span>
            )}
          </div>
        </div>
        {description && (
          <p className={`text-dark-text-secondary text-[10px] ${isTrending ? 'line-clamp-2 min-h-[28px]' : 'line-clamp-1'}`}
            style={isTrending ? {marginBottom: '8px'} : {}}>
            {description}
          </p>
        )}
        {(createdBy || timeAgo) && (
          <p className="text-dark-text-secondary text-[9px] mt-1">
            {createdBy && (
              <>
                <span className="text-dark-text-secondary">by </span>
                <span className="text-pump-green font-medium hover:underline cursor-pointer">
                  {createdBy}
                </span>
              </>
            )}
            {timeAgo && (
              <>
                {createdBy && <span className="ml-1">·</span>}
                <span className="text-dark-text-secondary ml-1">
                  {timeAgo}
                </span>
              </>
            )}
          </p>
        )}
        <div className={`flex ${isTrending ? 'justify-center' : ''} items-center mt-1.5 mb-1`}>
          {chainInfo}
          {replies !== undefined && (
            <span className="bg-badge-blue text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold mr-1">
              {replies} replies
            </span>
          )}
          <span className="bg-badge-green text-gray-800 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
            ${marketCap} MC
          </span>
        </div>
      </div>
    </div>
  );

  return isTrending ? (
    <Link to={`/pgtoken.fun/${id}`} style={{textDecoration: 'none', display: 'block'}}>{cardContent}</Link>
  ) : cardContent;
};

// --- Token Table Component
const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-dark-border-custom">
      <table className="w-full">
        <thead className="bg-dark-surface-custom-2 border-b border-dark-border-custom">
          <tr>
            <th className="text-left p-3 text-xs font-semibold text-dark-text-secondary">Name</th>
            <th className="text-left p-3 text-xs font-semibold text-dark-text-secondary">Symbol</th>
            <th className="text-left p-3 text-xs font-semibold text-dark-text-secondary">Description</th>
            <th className="text-right p-3 text-xs font-semibold text-dark-text-secondary">Market Cap</th>
            <th className="text-right p-3 text-xs font-semibold text-dark-text-secondary">Price Change</th>
            <th className="text-center p-3 text-xs font-semibold text-dark-text-secondary">Replies</th>
            <th className="text-left p-3 text-xs font-semibold text-dark-text-secondary">Created</th>
            <th className="text-center p-3 text-xs font-semibold text-dark-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr 
              key={token.id} 
              className="border-b border-dark-border-custom last:border-b-0 hover:bg-dark-surface-custom-2/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/pgtoken.fun/${token.id}`)}
            >
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <img src={token.imageUrl} alt={token.name} className="w-8 h-8 rounded-full border border-pump-green" />
                  <div>
                    <span className="font-medium text-sm">{token.name}</span>
                    {token.category && (
                      <div className="text-[10px] text-dark-text-secondary mt-0.5">
                        {token.category}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="p-3 text-sm text-dark-text-secondary">{token.symbol}</td>
              <td className="p-3">
                <p className="text-sm text-dark-text-secondary line-clamp-1 max-w-[200px]">
                  {token.description || 'No description'}
                </p>
              </td>
              <td className="p-3 text-right">
                <span className="text-sm font-medium text-foreground">${token.marketCap}</span>
              </td>
              <td className="p-3 text-right">
                {token.priceChange && (
                  <span className={`text-sm font-medium ${parseFloat(token.priceChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <Icon 
                      icon={parseFloat(token.priceChange) >= 0 ? "lucide:arrow-up-right" : "lucide:arrow-down-right"} 
                      className="inline-block mr-0.5 align-text-bottom" 
                    />
                    {token.priceChange}%
                  </span>
                )}
              </td>
              <td className="p-3 text-center">
                {token.replies !== undefined && (
                  <span className="bg-badge-blue text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {token.replies}
                  </span>
                )}
              </td>
              <td className="p-3">
                {(token.createdBy || token.timeAgo) && (
                  <div className="text-[10px] text-dark-text-secondary">
                    <span>by <span className="text-pump-green font-medium">{token.createdBy}</span></span>
                    {token.timeAgo && <span className="block">{token.timeAgo}</span>}
                  </div>
                )}
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-1">
                  {token.links?.github && (
                    <a href={token.links.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-dark-surface-custom-2 text-dark-text-secondary hover:text-foreground transition-colors">
                      <Icon icon="lucide:github" className="w-4 h-4" />
                    </a>
                  )}
                  {token.links?.website && (
                    <a href={token.links.website} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-dark-surface-custom-2 text-dark-text-secondary hover:text-foreground transition-colors">
                      <Icon icon="lucide:globe" className="w-4 h-4" />
                    </a>
                  )}
                  <button className="p-1.5 rounded-lg hover:bg-dark-surface-custom-2 text-dark-text-secondary hover:text-foreground transition-colors">
                    <Icon icon="lucide:star" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Main PgTokenFun Component
export function PGTokenFun() {
  const [tokens, setTokens] = useState<TokenCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function loadTokens() {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedTokens = await fetchOnChainTokens();
        console.log("Setting tokens:", fetchedTokens);
        setTokens(fetchedTokens);
      } catch (err) {
        console.error("Failed to load tokens:", err);
        setError(err instanceof Error ? err.message : "Failed to load tokens");
      } finally {
        setIsLoading(false);
      }
    }

    loadTokens();
  }, []);

  // Fetch tokens from on-chain
  async function fetchOnChainTokens(): Promise<TokenCardProps[]> {
    try {
      if (!(window as any).ethereum) {
        console.warn("No ethereum provider found");
        throw new Error("Please install a Web3 wallet to view tokens");
      }
      
      const provider = new BrowserProvider((window as any).ethereum);
      console.log("Getting network info...");
      const network = await provider.getNetwork();
      console.log("Current network:", {
        name: network.name,
        chainId: network.chainId.toString()
      });
      
      // Check if we're on Optimism Sepolia
      if (network.chainId !== 11155420n) {
        console.warn(`Wrong network detected. Expected: 11155420 (Optimism Sepolia), Got: ${network.chainId}`);
        throw new Error(`Please switch to Optimism Sepolia network. Current network: ${network.name} (${network.chainId})`);
      }

      console.log("Initializing launchpad contract at:", LAUNCHPAD_ADDRESS);
      const launchpad = new Contract(LAUNCHPAD_ADDRESS, launchpadAbi.abi, provider);
      
      console.log("Calling getAllTokens()...");
      let tokenAddresses: string[];
      try {
        tokenAddresses = await launchpad.getAllTokens();
        console.log("Found token addresses:", tokenAddresses);
        
        if (!tokenAddresses) {
          console.warn("getAllTokens() returned null/undefined");
          throw new Error("Failed to fetch token list from contract");
        }
        
        if (tokenAddresses.length === 0) {
          console.log("No tokens found on the launchpad");
          return [];
        }
      } catch (e) {
        console.error("Error in getAllTokens():", e);
        throw new Error(`Failed to fetch token list: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }

      console.log(`Starting to fetch details for ${tokenAddresses.length} tokens...`);
      const tokens = await Promise.all(
        tokenAddresses.map(async (address: string, index: number) => {
          console.log(`[${index + 1}/${tokenAddresses.length}] Processing token at ${address}`);
          try {
            const token = new Contract(address, builderTokenAbi, provider);

            // Helper to try a contract call, fallback to undefined if not implemented
            const tryCall = async (fn: () => Promise<any>, fallback: any = undefined) => {
              try {
                return await fn();
              } catch (e) {
                console.warn(`Fallback for ${address}:`, e);
                return fallback;
              }
            };

            // Fetch basic info
            const [name, symbol, totalSupply, metadata] = await Promise.all([
              tryCall(() => token.name(), 'Unknown Name'),
              tryCall(() => token.symbol(), '???'),
              tryCall(() => token.totalSupply(), BigInt(0)),
              tryCall(() => token.getTokenMetadata(), null)
            ]);

            // Parse metadata if available
            let parsedMetadata;
            try {
              parsedMetadata = metadata ? (
                typeof metadata === 'string' ? JSON.parse(metadata) : metadata
              ) : null;
            } catch (e) {
              parsedMetadata = null;
            }

            const tokenMetadata = {
              description: parsedMetadata?.description || `Token ${symbol} on Optimism Sepolia`,
              category: parsedMetadata?.category || 'OTHER',
              teamName: parsedMetadata?.teamName || '',
              links: parsedMetadata?.links || {},
              fundingGoal: parsedMetadata?.fundingGoal || 0,
              imageUrl: parsedMetadata?.imageUrl || '/default-token.png',
              createdAt: parsedMetadata?.createdAt || Date.now(),
              createdBy: undefined, // Will be set below if possible
            };

            // Try to get creator and creation time, fallback if not implemented
            const [creator, creationTime] = await Promise.all([
              tryCall(() => token.owner(), undefined),
              tryCall(() => token.createdAt(), undefined)
            ]);

            const result = {
              id: address,
              name,
              symbol,
              marketCap: (Number(totalSupply) / 1e18).toFixed(2),
              description: formatTokenDescription(name, symbol),
              category: tokenMetadata.category,
              teamName: tokenMetadata.teamName,
              links: tokenMetadata.links,
              fundingGoal: tokenMetadata.fundingGoal,
              imageUrl: tokenMetadata.imageUrl,
              timeAgo: creationTime ? getTimeAgo(Number(creationTime) * 1000) : undefined,
              createdBy: creator ? truncateAddress(creator) : 'Unknown',
              priceChange: "0",
              replies: 0
            };

            return result;
          } catch (error) {
            console.error(`Failed to process token ${address}:`, error);
            return null;
          }
        })
      );

      const validTokens = tokens.filter(Boolean) as TokenCardProps[];
      console.log(`Successfully fetched ${validTokens.length} out of ${tokenAddresses.length} tokens`);
      return validTokens;
    } catch (err) {
      console.error("Fatal error in fetchOnChainTokens:", err);
      throw err;
    }
  }

  return (
    <div className="flex-1 p-0 sm:p-6 bg-gradient-to-br from-background via-dark-surface-custom-2/60 to-pump-blue/10 text-foreground font-sans max-w-full min-h-screen relative">
      {/* "New Coins" / "Create New Coin" Banner/Card */}
      <div className="relative bg-gradient-to-br from-pump-green/20 to-pump-blue/20 p-4 rounded-xl border border-pump-green/40 mb-8 flex flex-col sm:flex-row items-center justify-between shadow-lg backdrop-blur-md gap-4 min-h-[90px] h-[90px] overflow-hidden">
        {/* 3D SVG Pattern */}
        <div className="absolute inset-0 opacity-[0.10] z-0 pointer-events-none select-none animate-pulse-slow">
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
        <Link
          to="/pgtoken.fun/create"
          className="z-10 bg-[#CDEB63] hover:bg-[#b6d13e] text-black px-5 py-2 rounded-full font-bold shadow-neon-green hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-base border border-[#CDEB63]"
        >
          <Icon icon="lucide:plus" width={20} height={20} />
          Create Coin
        </Link>
      </div>

      {/* Now Trending Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Tooltip content="Live trending tokens!" placement="top">
              <span className="relative">
                <Icon icon="lucide:flame" className="text-pump-orange text-3xl animate-flicker animate-pulse drop-shadow-[0_0_8px_#ff9900]" />
                <span className="absolute top-0 left-0 w-full h-full animate-ping rounded-full bg-pump-orange/30 opacity-60" style={{zIndex:0}} />
              </span>
            </Tooltip>
            Now Trending
          </h3>
          <div className="flex items-center gap-1 text-dark-text-secondary">
            <button className="p-1 rounded-full hover:bg-dark-surface-custom-2 transition-colors" onClick={() => {
              const trendingRow = document.getElementById('trending-row');
              if (trendingRow) trendingRow.scrollBy({ left: -200, behavior: 'smooth' });
            }}><Icon icon="lucide:chevron-left" /></button>
            <button className="p-1 rounded-full hover:bg-dark-surface-custom-2 transition-colors" onClick={() => {
              const trendingRow = document.getElementById('trending-row');
              if (trendingRow) trendingRow.scrollBy({ left: 200, behavior: 'smooth' });
            }}><Icon icon="lucide:chevron-right" /></button>
          </div>
        </div>
        <div id="trending-row" className="flex overflow-x-auto gap-4 py-2 scrollbar-hide min-h-[210px] snap-x snap-mandatory">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} isTrending />)
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            tokens.map((token) => (
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

      {/* View Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-dark-text-secondary">View:</span>
        <button
          className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-[#CDEB63] text-black' : 'bg-dark-surface-custom-2 text-dark-text-secondary'}`}
          onClick={() => setViewType('grid')}
        >
          <Icon icon="lucide:grid" className="w-4 h-4" />
        </button>
        <button
          className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-[#CDEB63] text-black' : 'bg-dark-surface-custom-2 text-dark-text-secondary'}`}
          onClick={() => setViewType('list')}
        >
          <Icon icon="lucide:list" className="w-4 h-4" />
        </button>
      </div>

      {/* Token Grid/List */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
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
      ) : (
        isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-dark-surface-custom-2 rounded-lg w-full"></div>
            <div className="h-10 bg-dark-surface-custom-2 rounded-lg w-full"></div>
            <div className="h-10 bg-dark-surface-custom-2 rounded-lg w-full"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-32">
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4 max-w-md w-full text-center">
              <Icon icon="lucide:alert-circle" className="w-6 h-6 mx-auto mb-2" />
              <span className="font-semibold text-lg block mb-1">{error}</span>
              <span className="text-sm opacity-80">Please make sure you're connected to your wallet and on the Optimism Sepolia network.</span>
            </div>
          </div>
        ) : (
          <TokenTable tokens={tokens} />
        )
      )}
    </div>
  );
};

export default PGTokenFun;

/* Add fade-in and slow pulse keyframes to index.css or global styles:
.fade-in { animation: fadeIn 0.7s cubic-bezier(.39,.575,.565,1) both; }
@keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px);} 100% { opacity: 1; transform: none; } }
.animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .7; } }
.animate-bounce-slow { animation: bounce 2.2s infinite; }
*/

interface ProjectMetadata {
  description: string;
  category: string;
  teamName: string;
  links: {
    github?: string;
    website?: string;
    twitter?: string;
    discord?: string;
  };
  fundingGoal: number;
  initialSupply: number;
  milestones: string[];
  imageUrl?: string;
}
