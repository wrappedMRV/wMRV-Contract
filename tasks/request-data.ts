import { BigNumber } from "ethers";
import { networkConfig } from "../helper-hardhat-config";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2.sol/WrappedTCO2";

task("request-data", "Request data from the oracle")
  .addParam("contract", "The address of the wTC02 to request data from")
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const { contract: wtco2Address } = taskArgs;
      const networkId = hre.network.config.chainId;

      if (!networkId) return;

      //Get signer information
      const accounts = await hre.ethers.getSigners();
      const signer = accounts[0];
      const linkTokenAddress = networkConfig[networkId]["linkToken"];
      const fee = networkConfig[networkId]["fee"];
      const LinkToken = await hre.ethers.getContractFactory("LinkToken");

      if (!linkTokenAddress) return;
      if (!fee) return;

      const linkTokenContract = await LinkToken.attach(linkTokenAddress);

      const balance = await linkTokenContract.balanceOf(wtco2Address);
      console.log(
        `LINK balance of sender ${
          signer.address
        } is + ${hre.ethers.utils.formatEther(balance)}`
      );
      const WrappedTCO2 = await hre.ethers.getContractFactory("WrappedTCO2");
      const wrappedTCO2Contract = (await WrappedTCO2.attach(
        wtco2Address
      )) as WrappedTCO2;

      const feeBN = BigNumber.from(fee);
      if (balance.gte(feeBN)) {
        const result = await wrappedTCO2Contract.requestData();
        await result.wait();
        console.log(
          `requestData has been done by ${signer.address} to ${wtco2Address}.Transaction Hash: ${result.hash}`
        );
      } else {
        console.log(
          `wTC)2 doesn't have enough LINK. Current balance is ${hre.ethers.utils.formatEther(
            balance
          )} LINK and transfer amount is ${hre.ethers.utils.formatEther(
            fee
          )} LINK`
        );
      }
    }
  );
