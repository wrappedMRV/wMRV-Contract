import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

import { ethers } from "hardhat";
import { WrappedTCO2Factory } from "../typechain/contracts/WrappedTCO2Factory";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2";
import { ERC20 } from '../typechain/@openzeppelin/contracts/token/ERC20/ERC20';
const WrappedTCO2Artifact = require("../artifacts/contracts/WrappedTCO2.sol/WrappedTCO2.json");
const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId === "1337" ) {
    const WrappedTCO2Factory = await get("WrappedTCO2Factory");
    const ToucanCarbonOffsets = await get("ToucanCarbonOffsets");
    const LinkToken = await get("LinkToken");

    const tco2Address = ToucanCarbonOffsets.address;
    const wrappedTCO2Factory = (await ethers.getContractAt(
      "WrappedTCO2Factory",
      WrappedTCO2Factory.address
    )) as WrappedTCO2Factory;
    console.log("Adding request...");
    await wrappedTCO2Factory.addRequest(
      "https://aetlas-api.azurewebsites.net/BeZeroTest?projectId=",
      "0,beZeroRating",
    );

    // Sending the transaction
    const txResponse = await wrappedTCO2Factory.createWrappedTCO2(tco2Address);
    // Waiting for the transaction to be mined
    const txReceipt = await txResponse.wait();

    const LinkTokenFactory = await ethers.getContractFactory("LinkToken");
    const linkTokenContract = await LinkTokenFactory.attach(LinkToken.address) as ERC20;
    // Retrieving the event from the transaction receipt
    const event = txReceipt.events?.find(
      (event) => event.event === "WrappedTCO2Created"
    );
    const wrappedTCO2Address = event?.args?.wrappedTCO2Address;
    await linkTokenContract.transfer(wrappedTCO2Address, networkConfig[chainId]["fee"] || "100000000000000000")

    const wrappedTCO2Contract = (await ethers.getContractAt(
      "WrappedTCO2",
      wrappedTCO2Address
    )) as WrappedTCO2;
    await wrappedTCO2Contract.requestData(0);
    await deployments.save("WrappedTCO2", {
      abi: WrappedTCO2Artifact.abi, // Add the 'abi' property
      address: wrappedTCO2Address,
    });
    console.log("WrappedTCO2 deployed to:", wrappedTCO2Address);
  }
};

func.tags = ["all", "tco2", "main"];

export default func;
