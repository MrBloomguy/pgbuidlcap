import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import { Contract } from 'ethers';
import type { SocialInteractionsContract } from '../types/contracts';

// Contract ABIs and addresses
import SocialInteractionsABI from '../abi/socialInteractions.json';
import { SOCIAL_INTERACTIONS_ADDRESS } from '../constants/addresses';

interface ContractsContextType {
  socialInteractions?: SocialInteractionsContract;
  isLoading: boolean;
  error?: Error;
}

const ContractsContext = createContext<ContractsContextType>({
  isLoading: true
});

export function ContractsProvider({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useState<ContractsContextType>({
    isLoading: true
  });
  
  const { chain } = useNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    async function initializeContracts() {
      if (!provider || !signer || !chain) {
        setContracts({ isLoading: false });
        return;
      }

      try {
        const socialInteractions = new Contract(
          SOCIAL_INTERACTIONS_ADDRESS[chain.id],
          SocialInteractionsABI,
          signer
        ) as unknown as SocialInteractionsContract;

        setContracts({
          socialInteractions,
          isLoading: false
        });
      } catch (error) {
        console.error('Failed to initialize contracts:', error);
        setContracts({
          isLoading: false,
          error: error as Error
        });
      }
    }

    initializeContracts();
  }, [provider, signer, chain]);

  return (
    <ContractsContext.Provider value={contracts}>
      {children}
    </ContractsContext.Provider>
  );
}

export function useContracts() {
  return useContext(ContractsContext);
}
