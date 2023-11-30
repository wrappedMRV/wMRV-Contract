// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./WrappedTCO2.sol";

contract WrappedTCO2Factory {
    address[] public wrappedTCO2Contracts;
    mapping(address => address) underlyingToWrapped;

    bytes32 jobId;
    uint256 fee;
    address public oracle;
    address public link;
    // Event to emit when a new WrappedTCO2 is created
    event WrappedTCO2Created(address indexed wrappedTCO2Address);

    constructor(
        address _oracle,
        string memory _jobId, //ca98366cc7314957b8c012c72f05aeeb for uint256 -> https://docs.chain.link/any-api/testnet-oracles
        uint256 _fee, //0.1
        address _link
    ) {
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
        link = _link;
    }

    // Function to create a new WrappedTCO2
    function createWrappedTCO2(address _tco2TokenAddress) public {
        require(
            underlyingToWrapped[_tco2TokenAddress] == address(0),
            "WrappedTCO2 already exists"
        );
        WrappedTCO2 wrappedTCO2 = new WrappedTCO2(
            _tco2TokenAddress,
            oracle,
            jobId,
            fee,
            link
        );
        wrappedTCO2Contracts.push(address(wrappedTCO2));
        underlyingToWrapped[_tco2TokenAddress] = address(wrappedTCO2);
        emit WrappedTCO2Created(address(wrappedTCO2));
    }

    function getWrappedTCO2Contracts() public view returns (address[] memory) {
        return wrappedTCO2Contracts;
    }

    function stringToBytes32(
        string memory source
    ) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
