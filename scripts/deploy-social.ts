import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying SocialInteractions contract with account:", deployer.address);

  const SocialInteractions = await ethers.getContractFactory("SocialInteractions");
  const socialInteractions = await SocialInteractions.deploy();
  await socialInteractions.deployed();

  console.log("SocialInteractions deployed to:", socialInteractions.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
