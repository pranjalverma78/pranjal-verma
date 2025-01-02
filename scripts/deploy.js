const hre = require("hardhat");

async function main() {
  // Get the contract factory using Hardhat's ethers
  const Upload = await hre.ethers.getContractFactory("Upload");

  // Deploy the contract
  const upload = await Upload.deploy();

  // Wait for the contract to be mined
  const add = await upload.getAddress();

  // Log the deployed contract's address
  console.log("Contract deployed to:", add);
}

// Run the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
