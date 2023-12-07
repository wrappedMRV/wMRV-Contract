pragma solidity 0.8.14;

interface IOracleUrlSource {
    struct RequestDetails {
        string url;
        string path;
    }

    function getRequestDetails(
        uint256 id
    ) external view returns (RequestDetails memory);

    function jobId() external view returns (bytes32);

    function fee() external view returns (uint256);

    function oracle() external view returns (address);

    function link() external view returns (address);
}
