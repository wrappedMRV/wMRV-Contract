import { expect } from "./chai-setup";
import {
  ethers,
  deployments,
  network,
  getNamedAccounts,
  getChainId,
} from "hardhat";
import { WrappedTCO2 } from "../typechain/contracts/WrappedTCO2";
import { ToucanCarbonOffsets } from "../typechain/contracts/mocks/ToucanCarbonOffsets";
import { MockOracle } from "../typechain/contracts/mocks/MockOracle";
import { LinkToken } from "../typechain/contracts/mocks/LinkToken.sol/LinkToken";
import { autoFundCheck } from "../utils";
import { networkConfig } from "../helper-hardhat-config";
import { BigNumber, Signer } from "ethers";
import deploy from "../tasks/deploy";
import { SignerWithAddress } from "hardhat-deploy-ethers/signers";

describe("WrappedTCO2 Contract", function () {
  let toucanCarbonOffsetsMock: ToucanCarbonOffsets;
  let wrappedTCO2: WrappedTCO2;
  let oracle: MockOracle;
  let deployerAddress: string;
  let addr1: string, addr2: string;
  let linkToken: LinkToken;
  let user1: SignerWithAddress;
  beforeEach(async () => {
    const namedAccounts = await getNamedAccounts();
    const signers = await ethers.getSigners();
    user1 = signers[1];

    deployerAddress = namedAccounts.deployer;
    addr1 = await user1.getAddress();
    addr2 = namedAccounts.addr2;
    const deployer = signers.find(
      (signer) => signer.address === namedAccounts.deployer
    );

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
    it("Should set the name", async function () {
      expect(await wrappedTCO2.name()).to.equal("wTCO2-123-Project-Name");
    });
    it("Should set the symbol", async function () {
      expect(await wrappedTCO2.symbol()).to.equal("wTCO2-123");
    });
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await wrappedTCO2.balanceOf(deployerAddress);
      expect(await wrappedTCO2.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("ERC20 functionality", function () {
    it("Should mint tokens on wrap", async function () {
      const wrapAmount = ethers.utils.parseEther("10");

      await toucanCarbonOffsetsMock.mint(deployerAddress, wrapAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, wrapAmount);
      await wrappedTCO2.wrap(wrapAmount);
      expect(await wrappedTCO2.balanceOf(deployerAddress)).to.equal(wrapAmount);
    });
  });

  describe("Transactions", function () {
    
    it("Should transfer tokens between accounts", async function () {
      await toucanCarbonOffsetsMock.mint(deployerAddress, 1000);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, 1000);
      await wrappedTCO2.wrap(1000);
      // Transfer 50 tokens from owner to addr1
      await wrappedTCO2.transfer(addr1, 50);
      const addr1Balance = await wrappedTCO2.balanceOf(addr1);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      await wrappedTCO2.connect(user1).transfer(addr2, 50);
      const addr2Balance = await wrappedTCO2.balanceOf(addr2);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await wrappedTCO2.balanceOf(deployerAddress);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        wrappedTCO2.connect(user1).transfer(deployerAddress, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await wrappedTCO2.balanceOf(deployerAddress)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      await toucanCarbonOffsetsMock.mint(deployerAddress, 1000);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, 1000);
      await wrappedTCO2.wrap(1000);
      const initialOwnerBalance = await wrappedTCO2.balanceOf(deployerAddress);

      // Transfer 100 tokens from owner to addr1.
      await wrappedTCO2.transfer(addr1, 100);

      // Transfer another 50 tokens from owner to addr2.
      await wrappedTCO2.transfer(addr2, 50);

      // Check balances
      const finalOwnerBalance = await wrappedTCO2.balanceOf(deployerAddress);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await wrappedTCO2.balanceOf(addr1);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await wrappedTCO2.balanceOf(addr2);
      expect(addr2Balance).to.equal(50);
    });
  });

  describe("Allowances", function () {
    it("Should set allowance for other addresses", async function () {

      await wrappedTCO2.approve(addr1, 100);
      const allowance = await wrappedTCO2.allowance(deployerAddress, addr1);
      expect(allowance).to.equal(100);
    });

    it("Should update allowances after transfers", async function () {
      await toucanCarbonOffsetsMock.mint(deployerAddress, 1000);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, 1000);
      await wrappedTCO2.wrap(1000);
      const transferAmount = 50;
      await wrappedTCO2.approve(addr1, 100);
      await wrappedTCO2
        .connect(user1)
        .transferFrom(deployerAddress, addr2, transferAmount);

      const allowanceAfter = await wrappedTCO2.allowance(
        deployerAddress,
        addr1
      );
      expect(allowanceAfter).to.equal(100 - transferAmount);
    });
  });
  describe("Chainlink Oracle functionality", function () {
    it("Should be able to request data", async function () {
      const tx = wrappedTCO2.requestData(0);
      await expect(tx).to.emit(wrappedTCO2, "ChainlinkRequested");

      // const tx_receipt = await tx.wait();
      // const requestId = BigNumber.from(
      //   tx_receipt.events && tx_receipt.events[0].topics[1]
      // );
      // expect(requestId).to.be.gt(0);
    });
  });
  describe("Wrap and unwrap functionality", function () {
    it("Should wrap and unwrap tokens", async function () {
      const wrapAmount = ethers.utils.parseEther("10");

      await toucanCarbonOffsetsMock.mint(deployerAddress, wrapAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, wrapAmount);
      await wrappedTCO2.wrap(wrapAmount);
      expect(await wrappedTCO2.balanceOf(deployerAddress)).to.equal(wrapAmount);

      await wrappedTCO2.unwrap(wrapAmount);
      expect(await wrappedTCO2.balanceOf(deployerAddress)).to.equal(0);
    });
    it("Should fail to unwrap if not enough tokens", async function () {
      const wrapAmount = ethers.utils.parseEther("10");

      await toucanCarbonOffsetsMock.mint(deployerAddress, wrapAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, wrapAmount);
      await wrappedTCO2.wrap(wrapAmount);
      expect(await wrappedTCO2.balanceOf(deployerAddress)).to.equal(wrapAmount);
      await expect(wrappedTCO2.unwrap(wrapAmount.add(1))).to.be.revertedWith(
        "Insufficient balance"
      );
    });
  });

  describe("Interaction with ToucanCarbonOffsets", function () {
    it("Should interact correctly with retireFrom", async function () {
      const retireAmount = ethers.utils.parseEther("5");
      await toucanCarbonOffsetsMock.mint(deployerAddress, retireAmount);

      await toucanCarbonOffsetsMock.approve(wrappedTCO2.address, retireAmount);
      await wrappedTCO2.retireFrom(deployerAddress, retireAmount);
    });
    it("should return project and vintage data", async function () {
      const [projectData, vintageData] = await wrappedTCO2.getAttributes();

      // Asserting VintageData fields
      expect(vintageData.name).to.equal("");
      expect(vintageData.startTime).to.equal(0);
      expect(vintageData.endTime).to.equal(0);
      expect(vintageData.projectTokenId).to.equal(0);
      expect(vintageData.totalVintageQuantity).to.equal(0);
      expect(vintageData.isCorsiaCompliant).to.equal(false);
      expect(vintageData.isCCPcompliant).to.equal(false);
      expect(vintageData.coBenefits).to.equal("");
      expect(vintageData.correspAdjustment).to.equal("");
      expect(vintageData.additionalCertification).to.equal("");
      expect(vintageData.uri).to.equal("");

      // Asserting ProjectData fields
      expect(projectData.projectId).to.equal("");
      expect(projectData.standard).to.equal("");
      expect(projectData.methodology).to.equal("");
      expect(projectData.region).to.equal("");
      expect(projectData.storageMethod).to.equal("");
      expect(projectData.method).to.equal("");
      expect(projectData.emissionType).to.equal("");
      expect(projectData.category).to.equal("");
      expect(projectData.uri).to.equal("");
      expect(projectData.beneficiary).to.equal(ethers.constants.AddressZero);
    });

    it("should return an empty string for standard registry", async function () {
      const standardRegistry = await wrappedTCO2.standardRegistry();
      expect(standardRegistry).to.equal("");
    });
    it("should return a specific project vintage token ID", async function () {
      const tokenId = await wrappedTCO2.projectVintageTokenId();
      expect(tokenId).to.equal(1);
    });
  });
});
