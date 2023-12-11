require("dotenv").config();

import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

import "hardhat-contract-sizer";
import "hardhat-gas-reporter";

import faucet from "./tasks/faucet";
import "./tasks/withdraw-link";
import "./tasks/accounts";
import "./tasks/fund-link";
import "./tasks/request-data";
import "./tasks/create";

import { networkConfig } from "./helper-hardhat-config";

task("faucet", "Add funds to selected address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async (args, { ethers }) => {
    const receiver = String(args.receiver);
    await faucet(receiver, ethers);
  });

const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || "Your etherscan API key";
const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY || "your private key";
const INFURA_KEY = process.env.INFURA_KEY || "your infura key";
const COMPILER_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1000000,
  },
  metadata: {
    bytecodeHash: "none",
  },
};
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.14",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.8.6",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.8.4",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.8.0",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.8.3",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.6.6",
        settings: COMPILER_SETTINGS,
      },
      {
        version: "0.6.0",
        settings: COMPILER_SETTINGS,
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: false,
      hardfork: "merge",
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      accounts: [DEPLOYER_PRIVATE_KEY],
      saveDeployments: true,
      loggingEnabled: true,
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
    addr1: 2,
    addr2: 3,
  },
  typechain: {
    outDir: "./typechain",
    target: "ethers-v5",
  },
  gasReporter: {
    enabled: false,
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
};

export default config;
