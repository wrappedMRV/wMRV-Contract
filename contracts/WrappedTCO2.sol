// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

import "./IToucanCarbonOffsets.sol";
import "./IOracleUrlSource.sol";

interface IToucanCarbonOffsetsBase is IToucanCarbonOffsets, IERC20 {
    function getGlobalProjectVintageIdentifiers()
        external
        view
        returns (string memory, string memory);
}

// mumbai contracts of toucan : https://app.toucan.earth/contracts#polygon-mumbai
// facets to get test assets : https://faucet.toucan.earth/
// EXample contract: https://github.com/smartcontractkit/chainlink-fullstack/blob/main/packages/hardhat/contracts/APIConsumer.sol
contract WrappedTCO2 is ERC20, ChainlinkClient {
    using Chainlink for Chainlink.Request;
    bytes32 jobId;
    uint256 fee;
    address public oracle;
    IOracleUrlSource public oracleUrlSource;
    IToucanCarbonOffsetsBase public tco2Token;
    mapping(bytes32 => uint256) private requestIdToId;

    mapping(uint256 => uint256) public projectRatings;

    string private _name;
    string private _symbol;

    constructor(
        address _tco2TokenAddress,
        address _oracle,
        bytes32 _jobId, //ca98366cc7314957b8c012c72f05aeeb for uint256 -> https://docs.chain.link/any-api/testnet-oracles
        uint256 _fee, //0.1
        address _link,
        address _dataSource
    ) ERC20("", "") {
        tco2Token = IToucanCarbonOffsetsBase(_tco2TokenAddress);

        string memory globalProjectId;
        string memory vintageName;
        (globalProjectId, vintageName) = tco2Token
            .getGlobalProjectVintageIdentifiers();

        _name = string(
            abi.encodePacked("wTCO2-", globalProjectId, "-", vintageName)
        );

        _symbol = string(
            abi.encodePacked("wTCO2-", globalProjectId, "-", vintageName)
        );

        if (_link == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_link);
        }
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
        oracleUrlSource = IOracleUrlSource(_dataSource);
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function wrap(uint256 amount) public {
        require(
            tco2Token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        _mint(msg.sender, amount);
    }

    function unwrap(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        require(tco2Token.transfer(msg.sender, amount), "Transfer failed");
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data.
     */
    function requestData(uint256 id) public returns (bytes32 requestId) {
        //Should the user pay?
        // require(
        //     IERC20(chainlinkTokenAddress()).transferFrom(
        //         msg.sender,
        //         address(this),
        //         fee
        //     ),
        //     "Unable to transfer LINK"
        // );

        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        IOracleUrlSource.RequestDetails memory requestDetails = oracleUrlSource
            .getRequestDetails(id);
        request.add("get", requestDetails.url);
        request.add("path", requestDetails.path);

        // Sends the request
        requestId = sendChainlinkRequestTo(oracle, request, fee);
        requestIdToId[requestId] = id;

        return requestId;
    }

    function fulfill(
        bytes32 _requestId,
        uint256 _data
    ) public recordChainlinkFulfillment(_requestId) {
        uint256 id = requestIdToId[_requestId];
        projectRatings[id] = _data;

        delete requestIdToId[_requestId];
    }

    function retireFrom(
        address account,
        uint256 amount
    ) external returns (uint256 retirementEventId) {
        return tco2Token.retireFrom(account, amount);
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
        _burn(msg.sender, amount);
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
        _burn(msg.sender, params.amount);
        tco2Token.retireAndMintCertificateForEntity(retiringEntity, params);
    }

    function projectVintageTokenId() external view returns (uint256) {
        return tco2Token.projectVintageTokenId();
    }
}
