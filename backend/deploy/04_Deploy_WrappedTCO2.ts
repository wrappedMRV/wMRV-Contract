import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

import { ethers } from "hardhat";
import { WrappedTCO2Factory } from "../typechain/contracts/WrappedTCO2Factory";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2";
import { ERC20 } from "../typechain/@openzeppelin/contracts/token/ERC20/ERC20";
const WrappedTCO2Artifact = require("../artifacts/contracts/WrappedTCO2.sol/WrappedTCO2.json");
const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId === "80001") {
    const WrappedTCO2Factory = await get("WrappedTCO2Factory");
    const tco2Address = "0xa5831eb637dff307395b5183c86B04c69C518681";
    const wrappedTCO2Factory = (await ethers.getContractAt(
      "WrappedTCO2Factory",
      WrappedTCO2Factory.address
    )) as WrappedTCO2Factory;
    console.log("Adding request...");
    await wrappedTCO2Factory.addRequest(
      "https://aetlas-api.azurewebsites.net/BeZero?projectId=",
      "0,beZeroRating",
    );
    console.log("Creating WrappedTCO2...");
    // Sending the transaction
    const txResponse = await wrappedTCO2Factory.createWrappedTCO2(tco2Address);
    // Waiting for the transaction to be mined
    const txReceipt = await txResponse.wait();

    const linkTokenAddress = networkConfig[chainId]["linkToken"];
    if (!linkTokenAddress) return;

    const LinkToken = await ethers.getContractFactory("LinkToken");
    const linkTokenContract = (await LinkToken.attach(
      linkTokenAddress
    )) as ERC20;
    // Retrieving the event from the transaction receipt
    const event = txReceipt.events?.find(
      (event) => event.event === "WrappedTCO2Created"
    );

    const wrappedTCO2Address = event?.args?.wrappedTCO2Address;
    console.log("Verify WrappedTCO2 contract");
    console.log(
      `npx hardhat verify --network ${networkConfig[chainId].name} ${
        wrappedTCO2Address
      } ${tco2Address} ${linkTokenAddress} ${wrappedTCO2Factory.address}`
    );
    await linkTokenContract.transfer(
      wrappedTCO2Address,
      networkConfig[chainId]["fee"] || "100000000000000000"
    );

    const wrappedTCO2Contract = (await ethers.getContractAt(
      "WrappedTCO2",
      wrappedTCO2Address
    )) as WrappedTCO2;
    console.log("Requesting data...");
    console.log("wrappedTCO2Contract", wrappedTCO2Contract.address);
    await wrappedTCO2Contract.requestData(0);
    await deployments.save("WrappedTCO2", {
      abi: WrappedTCO2Artifact.abi, // Add the 'abi' property
      address: wrappedTCO2Address,
    });
  }
};

func.tags = ["all", "tco2", "main"];

export default func;
