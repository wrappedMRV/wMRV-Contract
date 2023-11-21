// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ToucanProtocol/interfaces/IToucanCarbonOffsets.sol";

contract WrappedTCO2 is ERC20, IToucanCarbonOffsets {
    IToucanCarbonOffsets public tco2Token;
    AggregatorV3Interface public ratingsOracle;

    uint256 public projectRatings;

    constructor(
        address _tco2TokenAddress,
        address _ratingsOracleAddress
    ) ERC20("WrappedTCO2", "WTCO2") {
        tco2Token = ERC20(_tco2TokenAddress);
        ratingsOracle = AggregatorV3Interface(_ratingsOracleAddress);
    }

    function wrap(uint256 amount) public {
        require(
            tco2Token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        _mint(msg.sender, amount);
        updateRating();
    }

    function unwrap(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        require(tco2Token.transfer(msg.sender, amount), "Transfer failed");
    }

    function updateRating() public {
        (, int256 rating, , , ) = ratingsOracle.latestRoundData();
        projectRatings = uint256(rating);
    }

    function retireFrom(
        address account,
        uint256 amount
    ) external returns (uint256 retirementEventId) {
        tco2Token.retireFrom(account, amount);
    }

    function burnFrom(address account, uint256 amount) external {
        tco2Token.burnFrom(account, amount);
    }

    function getAttributes()
        external
        view
        returns (ProjectData memory, VintageData memory)
    {
        return tco2Token.getAttributes();
    }

    function standardRegistry() external view returns (string memory) {
        return tco2Token.standardRegistry();
    }

    function retireAndMintCertificate(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external {
        tco2Token.retireAndMintCertificate(
            retiringEntityString,
            beneficiary,
            beneficiaryString,
            retirementMessage,
            amount
        );
    }

    function retireAndMintCertificateForEntity(
        address retiringEntity,
        CreateRetirementRequestParams calldata params
    ) external {
        tco2Token.retireAndMintCertificateForEntity(retiringEntity, params);
    }

    function projectVintageTokenId() external view returns (uint256) {
        return tco2Token.projectVintageTokenId();
    }
}
