import { Address } from 'viem';

export const REGISTRAR_ADDRESS: Address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'; // Deployed on Base Mainnet

export const REGISTRAR_ABI = [
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'isAvailable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'getPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRegisteredDomains',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'expiry', type: 'uint256' },
          { internalType: 'string', name: 'extension', type: 'string' }
        ],
        internalType: 'struct YouBuildRegistrar.DomainInfo[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
  }
] as const;
