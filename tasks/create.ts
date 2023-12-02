import { BigNumber } from "ethers";
import { networkConfig } from "../helper-hardhat-config";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { WrappedTCO2Factory } from "../typechain/contracts/WrappedTCO2Factory";

task("request-data", "Request data from the oracle")
  .addParam("factory", "The address of the WrappedTCO2Factory")

  .addParam("contract", "The address of the TC02 to wrap")
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const { contract: tco2Address, factory: factoryAddress } = taskArgs;
      const networkId = hre.network.config.chainId;

      if (!networkId) return;

      //Get signer information
      const accounts = await hre.ethers.getSigners();
      const signer = accounts[0];

      const WrappedTCO2Factory = await hre.ethers.getContractFactory(
        "WrappedTCO2Factory"
      );
      const wrappedTCO2FactoryContract = (await WrappedTCO2Factory.attach(
        factoryAddress
      )) as WrappedTCO2Factory;

      const txResponse = await wrappedTCO2FactoryContract.createWrappedTCO2(
        tco2Address
      );
      const txReceipt = await txResponse.wait();
      const event = txReceipt.events?.find(
        (event) => event.event === "WrappedTCO2Created"
      );
      const newWrappedTCO2Address = event?.args?.wrappedTCO2Address;
      const [oracle, jobId, fee, link] = await Promise.all([
        wrappedTCO2FactoryContract.oracle(),
        wrappedTCO2FactoryContract.jobId(),
        wrappedTCO2FactoryContract.fee(),
        wrappedTCO2FactoryContract.link(),
      ]);
      console.log("New WrappedTCO2 address: ", newWrappedTCO2Address);
      console.log("To verify the contract, run the following command:");
      console.log(
        `npx hardhat verify --network ${networkConfig[networkId].name} ${newWrappedTCO2Address} ${tco2Address} ${oracle} ${jobId} ${fee} ${link} ${factoryAddress}`
      );
    }
  );
