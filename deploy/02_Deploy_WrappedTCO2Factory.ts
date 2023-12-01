import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";

const func: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let linkTokenAddress: string;
  let oracleAddress: string;

  if (chainId === "1337") {
    const LinkToken = await get("LinkToken");
    linkTokenAddress = LinkToken.address;
    const MockOracle = await get("MockOracle");
    oracleAddress = MockOracle.address;
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken as string;
    oracleAddress = networkConfig[chainId].oracle as string;
  }
  const { jobId, fee } = networkConfig[chainId];
  console.log([oracleAddress, jobId, fee, linkTokenAddress]);
  await deploy("WrappedTCO2Factory", {
    from: deployer,
    args: [oracleAddress, jobId, fee, linkTokenAddress],
    log: true,
  });
};

func.tags = ["all", "factory", "tco2", "main"];

export default func;
