// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WrappedTCO2.sol";

contract WrappedTCO2Factory {
    address[] public wrappedTCO2Contracts;
    mapping(address => address) underlyingToWrapped;
    // Event to emit when a new WrappedTCO2 is created
    event WrappedTCO2Created(address indexed wrappedTCO2Address);

    // Function to create a new WrappedTCO2
    function createWrappedTCO2(
        address _tco2TokenAddress,
        address _ratingsOracleAddress
    ) public {
        require(
            underlyingToWrapped[_tco2TokenAddress] == address(0),
            "WrappedTCO2 already exists"
        );
        WrappedTCO2 wrappedTCO2 = new WrappedTCO2(
            _tco2TokenAddress,
            _ratingsOracleAddress
        );
        wrappedTCO2Contracts.push(address(wrappedTCO2));
        underlyingToWrapped[_tco2TokenAddress] = address(wrappedTCO2);
        emit WrappedTCO2Created(address(wrappedTCO2));
    }

    function getWrappedTCO2Contracts() public view returns (address[] memory) {
        return wrappedTCO2Contracts;
    }
}
