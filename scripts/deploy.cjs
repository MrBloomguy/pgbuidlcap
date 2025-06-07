async function main() {
  console.log("Deploying BuilderLaunchpad...");
  const hre = require("hardhat");
  const BuilderLaunchpad = await hre.ethers.getContractFactory("BuilderLaunchpad");
  const launchpad = await BuilderLaunchpad.deploy();
  await launchpad.waitForDeployment();
  console.log("BuilderLaunchpad deployed to:", await launchpad.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
