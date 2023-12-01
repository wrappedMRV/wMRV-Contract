import { ethers, deployments, network } from "hardhat";
import { expect } from "chai";
import skip from "mocha-skip-if";
import { developmentChains } from "../../helper-hardhat-config";
import { WrappedTCO2 } from "../../typechain/contracts/WrappedTCO2.sol/WrappedTCO2";
skip
  .if(developmentChains.includes(network.name))
  .describe("WrappedTCO2 Integration Tests", () => {
    let wrappedTCO2: WrappedTCO2;

    beforeEach(async () => {
      const WrappedTCO2 = await deployments.get("WrappedTCO2");
      wrappedTCO2 = (await ethers.getContractAt(
        "WrappedTCO2",
        WrappedTCO2.address
      )) as WrappedTCO2;
    });

    it("should successfully make an external API request and get a result", async () => {
      const transaction = await wrappedTCO2.requestData(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "RAW,ETH,USD,VOLUME24HOUR",
        "1000000000000000000"
      );
      await expect(transaction).to.emit(wrappedTCO2, "ChainlinkRequested");

      await transaction.wait();

      //wait 7 min for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 420000));

      //Now check the result
      const result = await wrappedTCO2.projectRatings();
      expect(result).to.be.gt(0);
    }).timeout(520000);
  });
