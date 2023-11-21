// SPDX-FileCopyrightText: 2023 Toucan Labs
//
// SPDX-License-Identifier: UNLICENSED

// If you encounter a vulnerability or an issue, please contact <security@toucan.earth> or visit security.toucan.earth
pragma solidity 0.8.14;

import '../ToucanCarbonOffsetsEscrowTypes.sol';
import '../bases/ToucanCarbonOffsetsWithBatchBaseTypes.sol';

interface IToucanCarbonOffsetsEscrow {
    function createDetokenizationRequest(
        address user,
        uint256 amount,
        uint256[] calldata batchTokenIds
    ) external returns (uint256);

    function createRetirementRequest(
        address user,
        CreateRetirementRequestParams calldata params
    ) external returns (uint256);

    function finalizeDetokenizationRequest(uint256 requestId) external;

    function finalizeRetirementRequest(uint256 requestId) external;

    function revertDetokenizationRequest(uint256 requestId) external;

    function revertRetirementRequest(uint256 requestId) external;

    function detokenizationRequests(uint256 requestId)
        external
        view
        returns (DetokenizationRequest memory);

    function retirementRequests(uint256 requestId)
        external
        view
        returns (RetirementRequest memory);
}
