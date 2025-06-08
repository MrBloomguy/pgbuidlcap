import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Contract, BrowserProvider } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import launchpadAbi from '../abi/launchpad.json';

const LAUNCHPAD_ADDRESS = "0x0ca78A8FC88B014bC52F11e3FbD71D4C8d10521A";

export const CreateCoinPage: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const navigate = useNavigate();

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
      initialSupply: parseInt((form.elements.namedItem('initialSupply') as HTMLInputElement)?.value || '0'),
      fundingGoal: parseInt((form.elements.namedItem('fundingGoal') as HTMLInputElement)?.value || '0'),
      imageFile: (form.elements.namedItem('imageUpload') as HTMLInputElement)?.files?.[0]
    };

    // Validate required fields
    if (!projectData.name || !projectData.symbol || !projectData.description) {
      setError('Please fill in all required fields');
      return;
    }

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
      console.log("Current network:", network);
      
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
          imageUrl = URL.createObjectURL(projectData.imageFile);
          console.log("Created image URL:", imageUrl);
        } catch (e) {
          console.error('Failed to handle image:', e);
        }
      }

      const contract = new Contract(LAUNCHPAD_ADDRESS, launchpadAbi.abi, signer);
      console.log("Contract instance created with address:", LAUNCHPAD_ADDRESS);
      
      // Create metadata object
      const metadata = {
        description: projectData.description,
        category: projectData.category,
        teamName: projectData.teamName,
        links: projectData.links,
        fundingGoal: projectData.fundingGoal,
        imageUrl: imageUrl,
        createdAt: Date.now(),
        createdBy: address,
      };

      console.log("Sending metadata to contract:", JSON.stringify(metadata, null, 2));

      console.log("Creating token with params:", {
        name: projectData.name,
        symbol: projectData.symbol,
        initialSupply: projectData.initialSupply,
      });

      const tx = await contract.createTokenWithMetadata(
        projectData.name,
        projectData.symbol,
        projectData.initialSupply,
        JSON.stringify(metadata)
      );
      console.log("Transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      // Navigate back to main page
      navigate('/pgtoken.fun');
    } catch (e) {
      console.error('Error creating token:', e);
      setError("Failed to create token on-chain");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto py-2 px-4 max-w-2xl">
      <div className="mb-4">
        <button 
          onClick={() => navigate('/pgtoken.fun')}
          className="text-dark-text-secondary hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <Icon icon="lucide:arrow-left" className="text-sm" />
          Back to Projects
        </button>
      </div>

      <div className="bg-dark-surface-custom-1 rounded-xl border border-dark-border-custom p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="lucide:rocket" className="text-[#CDEB63] text-2xl" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Launch Public Goods Project</h1>
            <p className="text-sm text-dark-text-secondary">Create impact, earn support, build the future</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleCreateCoin}>
          <div>
            <h3 className="text-base font-semibold text-[#CDEB63] mb-3">Basic Information</h3>
            <div className="space-y-3">
              <input 
                name="name" 
                className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" 
                placeholder="Project Name" 
                required 
              />
              <input 
                name="symbol" 
                className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" 
                placeholder="Token Symbol (e.g. PUB)" 
                maxLength={8} 
                required 
              />
              <textarea 
                name="description" 
                className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none resize-none w-full" 
                placeholder="Project Description - What problem does it solve?" 
                rows={3} 
                required 
              />
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#CDEB63] mb-3">Project Category</h3>
            <select 
              name="category" 
              className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" 
              required
            >
              <option value="">Select Category</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="defi">DeFi</option>
              <option value="social">Social Impact</option>
              <option value="climate">Climate Action</option>
              <option value="education">Education</option>
              <option value="opensource">Open Source</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#CDEB63] mb-3">Team & Links</h3>
            <div className="space-y-3">
              <input 
                name="teamName" 
                className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" 
                placeholder="Team Name" 
                required 
              />
              <div className="grid grid-cols-2 gap-3">
                <input 
                  name="github" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Github URL" 
                />
                <input 
                  name="website" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Website URL" 
                />
                <input 
                  name="twitter" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Twitter/X URL" 
                />
                <input 
                  name="discord" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Discord URL" 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#CDEB63] mb-3">Funding & Goals</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input 
                  name="fundingGoal" 
                  type="number" 
                  min="0" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Funding Goal (OP)" 
                  required 
                />
                <input 
                  name="initialSupply" 
                  type="number" 
                  min="1000" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" 
                  placeholder="Token Supply" 
                  required 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#CDEB63] mb-3">Project Image</h3>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded border-2 border-dashed border-dark-border-custom flex items-center justify-center hover:border-[#CDEB63] transition-colors cursor-pointer">
                <Icon icon="lucide:image-plus" className="text-xl text-dark-text-secondary" />
              </div>
              <div className="flex-1">
                <input 
                  type="file" 
                  name="imageUpload"
                  accept="image/*" 
                  className="hidden" 
                  id="imageUpload" 
                />
                <label 
                  htmlFor="imageUpload" 
                  className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-3 py-2 text-sm text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full cursor-pointer block"
                >
                  Choose Image
                </label>
                <p className="text-xs text-dark-text-secondary mt-1">
                  Recommended: 400x400px, max 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 pt-4 border-t border-dark-border-custom">
            <button 
              type="submit" 
              disabled={creating} 
              className="w-full max-w-md bg-[#CDEB63] hover:bg-[#b6d13e] text-black font-bold py-3 rounded-full shadow-neon-green transition-all text-base border border-[#CDEB63] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon icon="lucide:rocket" className="text-sm" />
              {creating ? 'Launching Project...' : 'Launch Project'}
            </button>
            <p className="text-xs text-dark-text-secondary text-center max-w-md">
              By launching, you agree to our community guidelines and terms of service
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
