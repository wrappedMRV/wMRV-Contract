import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { ethers } from "ethers";

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
    const wrappedTCO2FactoryAddress = WrappedTCO2Factory.address;
    const ToucanCarbonOffsets = await get("ToucanCarbonOffsets");
    const tco2Address = ToucanCarbonOffsets.address;
  }
};

func.tags = ["all", "api", "main"];

export default func;
