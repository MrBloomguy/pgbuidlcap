import React from 'react';
import { Chain, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, optimismSepolia, arbitrum } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

// WalletConnect configuration
const projectId = '37b5e2fccd46c838885f41186745251e';

const metadata = {
  name: 'YouBuidl',
  description: 'YouBuidl Social Platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://youbuidl.xyz',
  icons: ['/youbuidlsocialsvg.svg']
};

const chains = [mainnet, polygon, optimism, optimismSepolia, arbitrum];

const { publicClient } = configureChains(
  chains,
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: metadata.name,
  projectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  persister: null
});

export const WalletConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="bg-[#CDEB63]/10 text-[#CDEB63] hover:bg-[#CDEB63]/20 w-8 h-8 rounded-lg font-medium flex items-center justify-center"
                    title={chain.name}
                  >
                    {chain.hasIcon && (
                      <div className="w-5 h-5">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name}
                            src={chain.iconUrl}
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    )}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="bg-[#CDEB63] text-black hover:bg-[#CDEB63]/90 px-3 py-2 rounded-lg font-medium flex items-center gap-2"
                  >
                    {account.address?.substring(0, 4)}...{account.address?.substring(account.address.length - 4)}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

// Wrap the app with WagmiConfig
export const WalletConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          chains={chains}
          showRecentTransactions
          appInfo={{ appName: metadata.name }}
          modalSize="compact"
          initialChain={optimismSepolia}
          enableNetworkView
          theme={{
            colors: {
              accentColor: '#CDEB63',
              accentColorForeground: 'black',
              modalBackground: '#000000',
              modalBackdrop: 'rgba(0, 0, 0, 0.5)',
              modalText: '#FFFFFF',
              connectButtonBackground: '#CDEB63',
              connectButtonText: '#000000'
            },
            radii: {
              connectButton: 'medium',
              modal: '12px'
            },
            shadows: {
              connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }
          }}
          enableTestnets
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
