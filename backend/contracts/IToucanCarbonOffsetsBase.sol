// SPDX-FileCopyrightText: 2022 Toucan Labs
//
// SPDX-License-Identifier: UNLICENSED

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity 0.8.14;

import "./IToucanCarbonOffsets.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IToucanCarbonOffsetsBase is IToucanCarbonOffsets, IERC20 {
    function getGlobalProjectVintageIdentifiers()
        external
        view
        returns (string memory, string memory);
}