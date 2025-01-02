require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337,
      privateKey: process.env.PrivateKey,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};