// SPDX-FileCopyrightText: 2021 Toucan Labs
//
// SPDX-License-Identifier: UNLICENSED

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity 0.8.14;

import "../IToucanCarbonOffsets.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @notice Implementation contract of the TCO2 tokens (ERC20)
/// These tokenized carbon offsets are specific to a vintage and its associated attributes
/// In order to mint TCO2s a user must deposit a matching CarbonOffsetBatch
/// @dev Each TCO2 contract is deployed via a Beacon Proxy in `ToucanCarbonOffsetsFactory`
contract ToucanCarbonOffsets is IToucanCarbonOffsets, ERC20 {
    constructor() ERC20("Toucan Carbon Offsets", "TCO2") {}

    function getGlobalProjectVintageIdentifiers()
        external
        view
        returns (string memory, string memory)
    {
        return ("123", "Project-Name");
    }

    function retireFrom(
        address account,
        uint256 amount
    ) external returns (uint256 retirementEventId) {
        _burn(account, amount);
        return 1;
    }

    function burnFrom(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function getAttributes()
        external
        view
        returns (ProjectData memory, VintageData memory)
    {
        VintageData memory vintageData = VintageData({
            name: "",
            startTime: 0,
            endTime: 0,
            projectTokenId: 0,
            totalVintageQuantity: 0,
            isCorsiaCompliant: false,
            isCCPcompliant: false,
            coBenefits: "",
            correspAdjustment: "",
            additionalCertification: "",
            uri: "",
            registry: ""
        });
        ProjectData memory projectData = ProjectData({
            projectId: "",
            standard: "",
            methodology: "",
            region: "",
            storageMethod: "",
            method: "",
            emissionType: "",
            category: "",
            uri: "",
            beneficiary: address(0)
        });
        return (projectData, vintageData);
    }

    function standardRegistry() external view returns (string memory) {
        return "";
    }

    function retireAndMintCertificate(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external {
        _burn(msg.sender, amount);
    }

    function retireAndMintCertificateForEntity(
        address retiringEntity,
        CreateRetirementRequestParams calldata params
    ) external {
        _burn(msg.sender, params.amount);
    }

    function projectVintageTokenId() external view returns (uint256) {
        return 1;
    }
}
