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
task("faucet", "Add funds to selected address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async (args, { ethers }) => {
    const receiver = String(args.receiver);
    await faucet(receiver, ethers);
  });
// task("deploy", "Deploy Factory").setAction(async (args, { ethers }) => {
//   await deploy(ethers);
// });

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
        runs: 1000, // Adjust the number of runs to your needs
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337, // We set 1337 to make interacting with MetaMask simpler
      allowUnlimitedContractSize: false,
      hardfork: "merge",
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
    enabled: Boolean(process.env.REPORT_GAS),
  },
};

export default config;
