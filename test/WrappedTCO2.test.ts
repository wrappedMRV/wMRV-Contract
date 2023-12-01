import { expect } from "./chai-setup";
import {
  ethers,
  deployments,
  network,
  getNamedAccounts,
  getChainId,
} from "hardhat";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2.sol/WrappedTCO2";
import { ToucanCarbonOffsets } from "../typechain/contracts/mocks/ToucanCarbonOffsets";
import { MockOracle } from "../typechain-types/contracts/mocks/MockOracle";
import { LinkToken } from "../typechain-types/contracts/mocks/LinkToken";
import { autoFundCheck } from "../utils";
import { networkConfig } from "../helper-hardhat-config";
import { BigNumber } from "ethers";

describe("WrappedTCO2 Contract", function () {
  let toucanCarbonOffsetsMock: ToucanCarbonOffsets;
  let wrappedTCO2: WrappedTCO2;
  let oracle: MockOracle;
  let deployer: string;
  let linkToken: LinkToken;

  beforeEach(async () => {
    const { deployer: deployer2 } = await getNamedAccounts();
    deployer = deployer2;

    const chainId = await getChainId();
    await deployments.fixture(["mocks", "tco2", "main"]);
    const LinkToken = await deployments.get("LinkToken");
    linkToken = (await ethers.getContractAt(
      "LinkToken",
      LinkToken.address
    )) as LinkToken;

    const linkTokenAddress = linkToken.address;

    const WrappedTCO2 = await deployments.get("WrappedTCO2");
    wrappedTCO2 = (await ethers.getContractAt(
      "WrappedTCO2",
      WrappedTCO2.address
    )) as WrappedTCO2;
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

    if (await autoFundCheck(wrappedTCO2.address, chainId, linkTokenAddress)) {
      const fundAmount = networkConfig[chainId]["fundAmount"];
      await linkToken.transfer(wrappedTCO2.address, fundAmount);
    }
  });

  describe("Deployment", function () {
    it("Should set the right oracle address", async function () {
      expect(await wrappedTCO2.oracle()).to.equal(oracle.address);
    });

    // Add more deployment-related tests here
  });

  describe("ERC20 functionality", function () {
    it("Should mint tokens on wrap", async function () {
      const wrapAmount = ethers.utils.parseEther("10");

      await toucanCarbonOffsetsMock.mint(deployer, wrapAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, wrapAmount);
      await wrappedTCO2.wrap(wrapAmount);
      expect(await wrappedTCO2.balanceOf(deployer)).to.equal(wrapAmount);
    });

    // Add more ERC20 functionality tests here
  });

  describe("Chainlink Oracle functionality", function () {
    it("Should be able to request data", async function () {
      const tx = wrappedTCO2.requestData(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "RAW,ETH,USD,VOLUME24HOUR",
        "1000000000000000000"
      );
      await expect(tx).to.emit(wrappedTCO2, "ChainlinkRequested");

      // const tx_receipt = await tx.wait();
      // const requestId = BigNumber.from(
      //   tx_receipt.events && tx_receipt.events[0].topics[1]
      // );
      // expect(requestId).to.be.gt(0);
    });

    // Add more Chainlink Oracle tests here
  });

  describe("Interaction with ToucanCarbonOffsets", function () {
    it("Should interact correctly with retireFrom", async function () {
      const retireAmount = ethers.utils.parseEther("5");
      await toucanCarbonOffsetsMock.mint(deployer, retireAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, retireAmount);
      await wrappedTCO2.retireFrom(deployer, retireAmount);
      // Add assertions based on your mock implementation
    });

    // Add more tests for interactions with ToucanCarbonOffsets here
  });

  // Additional tests for other functions of WrappedTCO2
});
