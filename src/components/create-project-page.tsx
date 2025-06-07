import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Contract, BrowserProvider } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import launchpadAbi from '../abi/launchpad.json';

const LAUNCHPAD_ADDRESS = "0x0ca78A8FC88B014bC52F11e3FbD71D4C8d10521A";

const CreateProjectPage: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const navigate = useNavigate();

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
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

      // Navigate back to main page with success message
      navigate('/?status=success');
    } catch (e) {
      setError("Failed to create token on-chain");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')}
          className="text-dark-text-secondary hover:text-foreground transition-colors flex items-center gap-2"
        >
          <Icon icon="lucide:arrow-left" />
          Back to Projects
        </button>
      </div>

      <div className="bg-dark-surface-custom-1 rounded-2xl border border-dark-border-custom p-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon icon="lucide:rocket" className="text-[#CDEB63] text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Launch Public Goods Project</h1>
            <p className="text-dark-text-secondary">Create impact, earn support, build the future</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-500">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleCreateProject}>
          <div className="border-b border-dark-border-custom pb-6">
            <h3 className="text-lg font-semibold text-[#CDEB63] mb-4">Basic Information</h3>
            <div className="space-y-4">
              <input name="name" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" placeholder="Project Name" required />
              <input name="symbol" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" placeholder="Token Symbol (e.g. PUB)" maxLength={8} required />
              <textarea name="description" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none resize-none w-full" placeholder="Project Description - What problem does it solve?" rows={4} required />
            </div>
          </div>
          
          <div className="border-b border-dark-border-custom pb-6">
            <h3 className="text-lg font-semibold text-[#CDEB63] mb-4">Project Category & Type</h3>
            <div className="space-y-4">
              <select name="category" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" required>
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
                <button type="button" className="px-4 py-2 rounded-full text-sm border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Retroactive</button>
                <button type="button" className="px-4 py-2 rounded-full text-sm border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Proactive</button>
                <button type="button" className="px-4 py-2 rounded-full text-sm border border-[#CDEB63] text-[#CDEB63] hover:bg-[#CDEB63]/10">Quadratic</button>
              </div>
            </div>
          </div>

          <div className="border-b border-dark-border-custom pb-6">
            <h3 className="text-lg font-semibold text-[#CDEB63] mb-4">Team & Links</h3>
            <div className="space-y-4">
              <input name="teamName" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full" placeholder="Team Name" required />
              <div className="grid grid-cols-2 gap-4">
                <input name="github" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Github URL" />
                <input name="website" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Website URL" />
                <input name="twitter" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Twitter/X URL" />
                <input name="discord" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Discord URL" />
              </div>
            </div>
          </div>

          <div className="border-b border-dark-border-custom pb-6">
            <h3 className="text-lg font-semibold text-[#CDEB63] mb-4">Funding & Goals</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input name="fundingGoal" type="number" min="0" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Funding Goal (OP)" required />
                <input name="initialSupply" type="number" min="1000" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none" placeholder="Token Supply" required />
              </div>
              <textarea name="milestones" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none resize-none w-full" placeholder="Key Milestones (one per line)" rows={4} required />
            </div>
          </div>

          <div className="border-b border-dark-border-custom pb-6">
            <h3 className="text-lg font-semibold text-[#CDEB63] mb-4">Project Image</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-dark-border-custom flex items-center justify-center hover:border-[#CDEB63] transition-colors cursor-pointer">
                <Icon icon="lucide:image-plus" className="text-3xl text-dark-text-secondary" />
              </div>
              <div className="flex-1">
                <input name="imageUrl" type="file" accept="image/*" className="hidden" id="imageUpload" />
                <label htmlFor="imageUpload" className="bg-dark-surface-custom-2 border border-dark-border-custom rounded px-4 py-3 text-foreground placeholder:text-dark-text-secondary focus:border-[#CDEB63] outline-none w-full cursor-pointer block">
                  Choose Image
                </label>
                <p className="text-xs text-dark-text-secondary mt-2">Recommended: 400x400px, max 2MB</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4">
            <button 
              type="submit" 
              disabled={creating} 
              className="w-full max-w-md bg-[#CDEB63] hover:bg-[#b6d13e] text-black font-bold py-4 rounded-full shadow-neon-green transition-all text-lg border border-[#CDEB63] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon icon="lucide:rocket" />
              {creating ? 'Launching Project...' : 'Launch Project'}
            </button>
            <p className="text-sm text-dark-text-secondary text-center max-w-md">
              By launching, you agree to our community guidelines and terms of service
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
