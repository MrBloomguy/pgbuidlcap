import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import { Tooltip } from '@heroui/react';
import launchpadAbi from '../abi/launchpad.json';
import builderTokenAbi from '../abi/builderToken.json';
import { useAccount, useNetwork } from 'wagmi';
import { Contract, BrowserProvider } from 'ethers';

// --- Reusable Token Card Component
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
  priceChange?: string;
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

  const cardContent = (
    <div className={`
      bg-dark-surface-custom-1 rounded-lg border border-dark-border-custom p-3
      flex ${isTrending ? 'flex-col items-center justify-between w-[170px] h-[210px]' : 'items-start'}
      shadow-md-light hover:border-pump-green transition-all duration-200
      ${isTrending ? '' : 'w-full'}
      cursor-pointer group
      hover:scale-[1.04] hover:shadow-xl hover:z-10
      transition-transform duration-200 ease-out
      fade-in
    `}>
      <img
        src={imageUrl}
        alt={name}
        className={`
          ${isTrending ? 'w-14 h-14 mb-2 mt-2' : 'w-10 h-10 mr-2'}
          rounded-full object-cover border-2 border-pump-green
          group-hover:scale-110 transition-transform duration-200
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
        {/* Trending card overlay button */}
        {isTrending && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-pump-green text-background px-3 py-1 rounded-full font-bold shadow-neon-green text-xs">View Details</span>
          </div>
        )}
      </div>
    </div>
  );

  // If trending, wrap in Link to token-details page
  return isTrending ? (
    <Link to={`/pgtoken.fun/${id}`} style={{textDecoration: 'none', position: 'relative', display: 'block'}}>{cardContent}</Link>
  ) : cardContent;
};

const SkeletonCard = ({ isTrending = false }) => (
  <div className={`
    bg-dark-surface-custom-2 rounded-lg border border-dark-border-custom animate-pulse
    ${isTrending ? 'w-[170px] h-[210px]' : 'w-full h-[140px]'}
    flex flex-col items-center justify-center
  `}>
    <div className={`bg-dark-border-custom rounded-full ${isTrending ? 'w-14 h-14 mb-2 mt-2' : 'w-10 h-10 mr-2'}`}></div>
    <div className="h-4 bg-dark-border-custom rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-dark-border-custom rounded w-1/2"></div>
  </div>
);

const LAUNCHPAD_ADDRESS = "0x0ca78A8FC88B014bC52F11e3FbD71D4C8d10521A";

const PgTokenFun: React.FC = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [creating, setCreating] = useState(false);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  // Fetch tokens from on-chain
  async function fetchOnChainTokens() {
    if (!(window as any).ethereum) return [];
    const provider = new BrowserProvider((window as any).ethereum);
    const launchpad = new Contract(LAUNCHPAD_ADDRESS, launchpadAbi.abi, provider);
    let tokenAddresses: string[] = [];
    try {
      tokenAddresses = await launchpad.getAllTokens();
    } catch (e) {
      return [];
    }
    const tokens = await Promise.all(tokenAddresses.map(async (address: string) => {
      try {
        const token = new Contract(address, builderTokenAbi, provider);
        const [name, symbol, totalSupply] = await Promise.all([
          token.name(),
          token.symbol(),
          token.totalSupply(),
        ]);
        return {
          id: address,
          name,
          symbol,
          marketCap: totalSupply.toString(),
          imageUrl: '',
          description: '',
        };
      } catch {
        return null;
      }
    }));
    return tokens.filter(Boolean);
  }

  // Fetch tokens from backend
  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      setError("");
      try {
        const tokens = await fetchOnChainTokens();
        setTokens(tokens);
        setTrendingTokens(tokens.slice(0, 6));
      } catch (e: any) {
        setError(e.message || "Failed to fetch tokens");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // Handle create coin (on-chain)
  const handleCreateCoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Gather form data
    const projectData = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value.trim(),
      symbol: (form.elements.namedItem('symbol') as HTMLInputElement)?.value.trim(),
      description: (form.elements.namedItem('description') as HTMLInputElement)?.value.trim(),
      category: (form.elements.namedItem('category') as HTMLSelectElement)?.value,
      teamName: (form.elements.namedItem('teamName') as HTMLInputElement)?.value.trim(),
      links: {
        github: (form.elements.namedItem('github') as HTMLInputElement)?.value.trim(),
        website: (form.elements.namedItem('website') as HTMLInputElement)?.value.trim(),
        twitter: (form.elements.namedItem('twitter') as HTMLInputElement)?.value.trim(),
        discord: (form.elements.namedItem('discord') as HTMLInputElement)?.value.trim()
      },
      fundingGoal: Number((form.elements.namedItem('fundingGoal') as HTMLInputElement)?.value),
      initialSupply: Number((form.elements.namedItem('initialSupply') as HTMLInputElement)?.value),
      milestones: (form.elements.namedItem('milestones') as HTMLTextAreaElement)?.value.split('\n').filter(Boolean),
      imageFile: (document.getElementById('imageUpload') as HTMLInputElement)?.files?.[0]
    };

    // Validate project data
    if (!projectData.name || !projectData.symbol || !projectData.description || !projectData.category || 
        !projectData.teamName || !projectData.fundingGoal || !projectData.initialSupply || !projectData.milestones.length) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate links format if provided
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const validateUrl = (url: string) => !url || urlPattern.test(url);
    
    if (!Object.values(projectData.links).every(validateUrl)) {
      setError('Please enter valid URLs for project links');
      return;
    }

    // Validate token parameters
    if (projectData.initialSupply < 1000) {
      setError('Initial token supply must be at least 1000');
      return;
    }

    if (projectData.fundingGoal <= 0) {
      setError('Funding goal must be greater than 0');
      return;
    }

    setCreating(true);
    try {
      // Get signer from window.ethereum
      if (!(window as any).ethereum) throw new Error('No wallet found');
      const provider = new BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      // Check if user is on Optimism Sepolia (chainId 11155420)
      const network = await provider.getNetwork();
      if (network.chainId !== 11155420n) {
        // Prompt user to switch network
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa37dc' }], // 0xaa37dc = 11155420 in hex
        });
        setCreating(false);
        setError('Please switch your wallet to Optimism Sepolia and try again.');
        return;
      }
      // Handle image upload first if there's an image file
      let imageUrl = '';
      if (projectData.imageFile) {
        try {
          // TODO: Replace with your actual image upload service
          // For now, we'll create an object URL as a placeholder
          imageUrl = URL.createObjectURL(projectData.imageFile);
        } catch (e) {
          console.error('Failed to handle image:', e);
        }
      }

      const contract = new Contract(LAUNCHPAD_ADDRESS, launchpadAbi.abi, signer);
      const tx = await contract.createToken(
        projectData.name, 
        projectData.symbol, 
        projectData.initialSupply
      );
      await tx.wait();

      // TODO: Store additional project metadata in a separate call or database
      const projectMetadata = {
        description: projectData.description,
        category: projectData.category,
        teamName: projectData.teamName,
        links: projectData.links,
        fundingGoal: projectData.fundingGoal,
        milestones: projectData.milestones,
        imageUrl
      };

      setShowCreateModal(false);
      setShowToast(true);
      const tokens = await fetchOnChainTokens();
      setTokens(tokens);
      setTrendingTokens(tokens.slice(0, 6));
      // Optionally: fetch tokens from chain or backend here
    } catch (e) {
      setError("Failed to create token on-chain");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 p-0 sm:p-6 bg-gradient-to-br from-background via-dark-surface-custom-2/60 to-pump-blue/10 text-foreground font-sans max-w-full min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#CDEB63] text-black px-6 py-3 rounded-2xl shadow-xl font-semibold animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <Icon icon="lucide:check-circle" className="text-green-600 text-xl" />
            <span>Project Successfully Launched! 🚀</span>
          </div>
          <p className="text-xs opacity-75">Your public goods project is now live on Optimism Sepolia</p>
        </div>
      )}
      {/* Create Coin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl shadow-2xl border border-[#CDEB63] bg-dark-surface-custom-1 animate-fade-in">
            <div className="flex flex-col items-center p-7 gap-4">
              <button className="absolute top-4 right-4 text-xl text-dark-text-secondary hover:text-foreground" onClick={() => setShowCreateModal(false)}>
                <Icon icon="lucide:x" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="lucide:rocket" className="text-[#CDEB63] text-3xl animate-bounce" />
                <h2 className="text-2xl font-bold text-[#CDEB63]">Launch Public Goods Project</h2>
              </div>
              <p className="text-center text-base text-dark-text-secondary max-w-xs mb-2">
                Launch a public goods project with its own governance token and funding structure on Optimism Sepolia.
              </p>
              <form className="flex flex-col gap-3 w-full mt-2" onSubmit={handleCreateCoin}>
                <div className="border-b border-dark-border-custom pb-4 mb-2">
                  <h3 className="text-sm font-semibold text-[#CDEB63] mb-3">Basic Information</h3>
                  <input name="name" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full mb-2" placeholder="Project Name" required />
                  <input name="symbol" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full mb-2" placeholder="Token Symbol (e.g. PUB)" maxLength={8} required />
                  <textarea name="description" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none resize-none w-full" placeholder="Project Description - What problem does it solve?" rows={3} required />
                </div>
                
                <div className="border-b border-dark-border-custom pb-4 mb-2">
                  <h3 className="text-sm font-semibold text-[#CDEB63] mb-3">Project Category & Type</h3>
                  <select name="category" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full mb-2" required>
                    <option value="">Select Category</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="defi">DeFi</option>
                    <option value="social">Social Impact</option>
                    <option value="climate">Climate Action</option>
                    <option value="education">Education</option>
                    <option value="opensource">Open Source</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="px-3 py-1 rounded-full text-xs border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Retroactive</button>
                    <button type="button" className="px-3 py-1 rounded-full text-xs border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Proactive</button>
                    <button type="button" className="px-3 py-1 rounded-full text-xs border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Quadratic</button>
                  </div>
                </div>

                <div className="border-b border-dark-border-custom pb-4 mb-2">
                  <h3 className="text-sm font-semibold text-[#CDEB63] mb-3">Team & Links</h3>
                  <input name="teamName" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full mb-2" placeholder="Team Name" required />
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input name="github" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Github URL" />
                    <input name="website" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Website URL" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input name="twitter" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Twitter/X URL" />
                    <input name="discord" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Discord URL" />
                  </div>
                </div>

                <div className="border-b border-dark-border-custom pb-4 mb-2">
                  <h3 className="text-sm font-semibold text-[#CDEB63] mb-3">Funding & Goals</h3>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input name="fundingGoal" type="number" min="0" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Funding Goal (OP)" required />
                    <input name="initialSupply" type="number" min="1000" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Token Supply" required />
                  </div>
                  <textarea name="milestones" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none resize-none w-full mb-2" placeholder="Key Milestones (one per line)" rows={3} required />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#CDEB63] mb-3">Project Image</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-dark-border-custom flex items-center justify-center hover:border-[#CDEB63] transition-colors cursor-pointer">
                      <Icon icon="lucide:image-plus" className="text-2xl text-dark-text-secondary" />
                    </div>
                    <div className="flex-1">
                      <input name="imageUrl" type="file" accept="image/*" className="hidden" id="imageUpload" />
                      <label htmlFor="imageUpload" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full cursor-pointer block">
                        Choose Image
                      </label>
                      <p className="text-xs text-dark-text-secondary mt-1">Recommended: 400x400px, max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <button type="submit" disabled={creating} className="bg-[#CDEB63] hover:bg-[#b6d13e] text-black font-bold py-3 rounded-full shadow-neon-green transition-all text-lg border border-[#CDEB63] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <Icon icon="lucide:rocket" />
                    {creating ? 'Launching Project...' : 'Launch Project'}
                  </button>
                  <p className="text-xs text-dark-text-secondary text-center">
                    By launching, you agree to our community guidelines and terms of service
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* "New Coins" / "Create New Coin" Banner/Card */}
      <div className="relative bg-gradient-to-br from-pump-green/20 to-pump-blue/20 p-4 rounded-xl border border-pump-green/40 mb-8 flex flex-col sm:flex-row items-center justify-between shadow-lg backdrop-blur-md gap-4 min-h-[90px] h-[90px] overflow-hidden">
        {/* 3D SVG Pattern (inspired by market-stats) */}
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
        <button
          className="z-10 bg-[#CDEB63] hover:bg-[#b6d13e] text-black px-5 py-2 rounded-full font-bold shadow-neon-green hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 text-base border border-[#CDEB63]"
          onClick={() => setShowCreateModal(true)}
        >
          <Icon icon="lucide:plus" width={20} height={20} />
          Create Coin
        </button>
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
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} isTrending />)
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

      {/* Token Grid */}
      <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
        {loading ? (
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
    </div>
  );
};

export default PgTokenFun;

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