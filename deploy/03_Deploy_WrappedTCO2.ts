import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "hardhat";
import { WrappedTCO2Factory } from "../typechain-types/contracts/WrappedTCO2Factory";

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

    console.log("WrappedTCO2 Address:", wrappedTCO2Address);
  }
};

func.tags = ["all", "tco2", "main"];

export default func;
