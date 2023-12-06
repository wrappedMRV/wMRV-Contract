// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./WrappedTCO2.sol";
import "./IOracleUrlSource.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WrappedTCO2Factory
 * @dev Factory contract to create WrappedTCO2 tokens and manage Chainlink oracle requests.
 */
contract WrappedTCO2Factory is Ownable, IOracleUrlSource {
    address[] public wrappedTCO2Contracts;
    mapping(address => address) public underlyingToWrapped;

    bytes32 public jobId;
    uint256 public fee;
    address public oracle;
    address public link;

    RequestDetails[] public requests;

    event WrappedTCO2Created(address indexed wrappedTCO2Address);
    event RequestAdded(uint256 indexed id);

    /**
     * @dev Constructor for WrappedTCO2Factory.
     * @param _oracle Oracle address for Chainlink requests.
     * @param _jobId Job ID for Chainlink oracle.
     * @param _fee Fee for oracle requests.
     * @param _link LINK token address.
     */
    constructor(
        address _oracle,
        string memory _jobId,
        uint256 _fee,
        address _link
    ) {
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
        link = _link;
    }

    /**
     * @dev Creates a new WrappedTCO2 contract.
     * @param _tco2TokenAddress Address of the underlying Toucan Carbon Offsets token.
     */
    function createWrappedTCO2(address _tco2TokenAddress) public {
        require(
            underlyingToWrapped[_tco2TokenAddress] == address(0),
            "WrappedTCO2 already exists"
        );
        WrappedTCO2 wrappedTCO2 = new WrappedTCO2(
            _tco2TokenAddress,
            link,
            address(this)
        );
        wrappedTCO2Contracts.push(address(wrappedTCO2));
        underlyingToWrapped[_tco2TokenAddress] = address(wrappedTCO2);
        emit WrappedTCO2Created(address(wrappedTCO2));
    }

    function createWrappedTCO2s(address[] memory _tco2TokensAddress) public {
        for (uint256 i = 0; i < _tco2TokensAddress.length; i++) {
            createWrappedTCO2(_tco2TokensAddress[i]);
        }
    }

    /**
     * @dev Retrieves the list of WrappedTCO2 contract addresses.
     * @return An array of WrappedTCO2 contract addresses.
     */
    function getWrappedTCO2Contracts() public view returns (address[] memory) {
        return wrappedTCO2Contracts;
    }

    /**
     * @dev Adds a new Chainlink oracle request configuration.
     * @param url The URL for the oracle request.
     * @param path The JSON path for the data point in the API response.
     */
    function addRequest(
        string memory url,
        string memory path
    ) public onlyOwner {
        requests.push(RequestDetails(url, path));
        emit RequestAdded(requests.length - 1);
    }

    /**
     * @dev Retrieves details of a specific Chainlink oracle request configuration.
     * @param id The ID of the request configuration.
     * @return The request details, including URL and JSON path.
     */
    function getRequestDetails(
        uint256 id
    ) public view returns (RequestDetails memory) {
        require(id < requests.length, "Invalid request id");
        return requests[id];
    }

    /**
     * @dev Converts a string to bytes32.
     * @param source The string to convert.
     * @return result The resulting bytes32 value.
     */
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
