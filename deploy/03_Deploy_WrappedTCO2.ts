import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WrappedTCO2Factory } from "../typechain-types/contracts/WrappedTCO2Factory";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2.sol";
const WrappedTCO2Artifact = require("../artifacts/contracts/WrappedTCO2.sol/WrappedTCO2.json");
const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  if (chainId === "1337") {
    const WrappedTCO2Factory = await get("WrappedTCO2Factory");
    const ToucanCarbonOffsets = await get("ToucanCarbonOffsets");
    const tco2Address = ToucanCarbonOffsets.address;
    const wrappedTCO2Factory = (await ethers.getContractAt(
      "WrappedTCO2Factory",
      WrappedTCO2Factory.address
    )) as WrappedTCO2Factory;
    // Sending the transaction
    console.log("Creating WrappedTCO2...");
    const txResponse = await wrappedTCO2Factory.createWrappedTCO2(tco2Address);
    console.log("txResponse:", txResponse);
    // Waiting for the transaction to be mined
    const txReceipt = await txResponse.wait();

    // Retrieving the event from the transaction receipt
    const event = txReceipt.events?.find(
      (event) => event.event === "WrappedTCO2Created"
    );
    const wrappedTCO2Address = event?.args?.wrappedTCO2Address;
    // const wrappedTCO2 = (await ethers.getContractAt(
    //   "WrappedTCO2",
    //   wrappedTCO2Address
    // )) as WrappedTCO2;
    await deployments.save("WrappedTCO2", {
      abi: WrappedTCO2Artifact.abi, // Add the 'abi' property
      address: wrappedTCO2Address,
    });
  }
};

func.tags = ["all", "tco2", "main"];

export default func;
