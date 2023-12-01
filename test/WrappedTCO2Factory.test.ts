import { expect } from "./chai-setup";
import {
  ethers,
  deployments,
  network,
  getNamedAccounts,
  getChainId,
} from "hardhat";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2.sol/WrappedTCO2";
import { WrappedTCO2Factory } from "../typechain/contracts/WrappedTCO2Factory";

import { ToucanCarbonOffsets } from "../typechain/contracts/mocks/ToucanCarbonOffsets";
import { MockOracle } from "../typechain/contracts/mocks/MockOracle";
import { LinkToken } from "../typechain/contracts/mocks/LinkToken.sol/LinkToken";
import { autoFundCheck } from "../utils";
import { networkConfig } from "../helper-hardhat-config";
import { BigNumber } from "ethers";

describe("WrappedTCO2Factory contract", function () {
  let toucanCarbonOffsetsMock: ToucanCarbonOffsets;
  let wrappedTCO2Factory: WrappedTCO2Factory;
  let oracle: MockOracle;
  let deployer: string;
  let linkToken: LinkToken;

  beforeEach(async () => {
    await deployments.fixture(["mocks", "factory"]);

    const { deployer: deployer2 } = await getNamedAccounts();
    deployer = deployer2;

    const chainId = await getChainId();
    const LinkToken = await deployments.get("LinkToken");
    linkToken = (await ethers.getContractAt(
      "LinkToken",
      LinkToken.address
    )) as LinkToken;

    const WrappedTCO2Factory = await deployments.get("WrappedTCO2Factory");
    wrappedTCO2Factory = (await ethers.getContractAt(
      "WrappedTCO2Factory",
      WrappedTCO2Factory.address
    )) as WrappedTCO2Factory;
    const ToucanCarbonOffsets = await deployments.get("ToucanCarbonOffsets");
    toucanCarbonOffsetsMock = (await ethers.getContractAt(
      "ToucanCarbonOffsets",
      ToucanCarbonOffsets.address
    )) as ToucanCarbonOffsets;
    const MockOracle = await deployments.get("MockOracle");
    oracle = (await ethers.getContractAt(
      "MockOracle",
      MockOracle.address
    )) as MockOracle;
  });

  describe("Creating WrappedTCO2", function () {
    it("Should create a new WrappedTCO2 contract", async function () {
      const tco2TokenAddress = toucanCarbonOffsetsMock.address;
      const txResponse = await wrappedTCO2Factory.createWrappedTCO2(
        tco2TokenAddress
      );
      const txReceipt = await txResponse.wait();
      const event = txReceipt.events?.find(
        (event) => event.event === "WrappedTCO2Created"
      );
      const newWrappedTCO2Address = event?.args?.wrappedTCO2Address;

      expect(newWrappedTCO2Address).to.be.properAddress;
      expect(await wrappedTCO2Factory.getWrappedTCO2Contracts()).to.include(
        newWrappedTCO2Address
      );
    });

    it("Should not allow creating a WrappedTCO2 with the same TCO2 token address", async function () {
      const tco2TokenAddress = toucanCarbonOffsetsMock.address;

      await wrappedTCO2Factory.createWrappedTCO2(tco2TokenAddress);
      await expect(
        wrappedTCO2Factory.createWrappedTCO2(tco2TokenAddress)
      ).to.be.revertedWith("WrappedTCO2 already exists");
    });
  });
});
