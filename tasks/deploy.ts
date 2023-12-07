import { HardhatEthersHelpers } from "hardhat-deploy-ethers/types";

async function deploy(ethers: HardhatEthersHelpers) {
  const WrappedTCO2Factory = await ethers.getContractFactory(
    "WrappedTCO2Factory"
  );
  const WrappedTCO2FactoryContact = await WrappedTCO2Factory.deploy();
  await WrappedTCO2FactoryContact.deployed();
  console.log(
    "WrappedTCO2Factory deployed to:",
    WrappedTCO2FactoryContact.address
  );
  return WrappedTCO2FactoryContact.address;
}

export default deploy;
