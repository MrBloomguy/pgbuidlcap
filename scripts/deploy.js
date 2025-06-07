"use strict";
async function main() {
    console.log("Deploying YouBuildRegistrar...");
    const hre = require("hardhat");
    const YouBuildRegistrar = await hre.ethers.getContractFactory("YouBuildRegistrar");
    const registrar = await YouBuildRegistrar.deploy();
    await registrar.waitForDeployment();
    console.log("YouBuildRegistrar deployed to:", await registrar.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
