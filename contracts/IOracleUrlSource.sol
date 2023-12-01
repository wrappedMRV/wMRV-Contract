pragma solidity 0.8.14;

interface IOracleUrlSource {
    struct RequestDetails {
        string url;
        string path;
    }

    function getRequestDetails(
        uint256 id
    ) external view returns (RequestDetails memory);
}
