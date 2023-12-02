// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./WrappedTCO2.sol";
import "./IOracleUrlSource.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedTCO2Factory is Ownable, IOracleUrlSource {
    address[] public wrappedTCO2Contracts;
    mapping(address => address) underlyingToWrapped;

    bytes32 jobId;
    uint256 fee;
    address public oracle;
    address public link;

    // mapping(uint256 => RequestDetails) public requests;
    RequestDetails[] public requests;

    event WrappedTCO2Created(address indexed wrappedTCO2Address);
    event RequestAdded(uint256 indexed id);

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
            link,
            address(this)
        );
        wrappedTCO2Contracts.push(address(wrappedTCO2));
        underlyingToWrapped[_tco2TokenAddress] = address(wrappedTCO2);
        emit WrappedTCO2Created(address(wrappedTCO2));
    }

    function getWrappedTCO2Contracts() public view returns (address[] memory) {
        return wrappedTCO2Contracts;
    }

    function addRequest(
        string memory url,
        string memory path
    ) public onlyOwner {
        requests.push(RequestDetails(url, path));
        emit RequestAdded(requests.length - 1);
    }

    // Function to retrieve request details
    function getRequestDetails(
        uint256 id
    ) public view returns (RequestDetails memory) {
        require(id < requests.length, "Invalid request id");
        return requests[id];
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
