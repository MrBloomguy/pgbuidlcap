const { config: dotenvConfig } = require("dotenv");
dotenvConfig();

require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const OPTIMISM_SEPOLIA_RPC_URL = process.env.OPTIMISM_SEPOLIA_RPC_URL || "";

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    optimism_sepolia: {
      url: OPTIMISM_SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155420,
    },
  },
  etherscan: {
    apiKey: {
      optimism_sepolia: process.env.OPTIMISM_API_KEY || "",
    },
    customChains: [
      {
        network: "optimism_sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io/",
        },
      },
    ],
  },
};
