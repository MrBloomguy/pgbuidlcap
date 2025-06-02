import { ethers } from "hardhat";

async function main() {
  console.log("Deploying YouBuildRegistrar...");

  const YouBuildRegistrar = await ethers.getContractFactory("YouBuildRegistrar");
  const registrar = await YouBuildRegistrar.deploy();

  await registrar.waitForDeployment();

  console.log("YouBuildRegistrar deployed to:", await registrar.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
