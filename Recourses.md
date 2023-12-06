### Recourses on Mumbai

https://app.toucan.earth/contracts#polygon-mumbai
mumbai contracts of toucan : https://app.toucan.earth/contracts#polygon-mumbai

- facets to get test assets : https://faucet.toucan.earth/
- test tco2: https://mumbai.polygonscan.com/address/0xa5831eb637dff307395b5183c86b04c69c518681

https://polygonscan.com/address/0xc645b80fd8a23a1459d59626ba3f872e8a59d4cb

### Recourses on ChainLink

https://docs.chain.link/any-api/testnet-oracles
https://docs.chain.link/any-api/get-request/examples/multi-variable-responses
- EXample contract: https://github.com/smartcontractkit/chainlink-fullstack/blob/main/packages/hardhat/contracts/APIConsumer.sol
- https://github.com/smartcontractkit/hardhat-starter-kit

TCO2 that worked: 0xa5831eb637dff307395b5183c86B04c69C518681 




jobId for string: 7d80a6386ef543a3abb52817f6707e3b


Verify WrappedTCO2 
 npx hardhat verify --network mumbai WrappedTCO2 _tco2TokenAddress _link _dataSource
 npx hardhat verify --network mumbai 0x8D96EEc6BA8ed9f54a253C0902eBEF1a1329e32e 0xa5831eb637dff307395b5183c86B04c69C518681 0x326C977E6efc84E512bB9C30f76E30c160eD06FB 0x6Ca8268e0D7D6048A663ABaE96501D8c4a6C65ba