export const wrappedTCO02Abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tco2TokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_link",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_dataSource",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "ChainlinkRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burnFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_requestId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "fulfill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAttributes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "standard",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "methodology",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "region",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "storageMethod",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "method",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "emissionType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "beneficiary",
            "type": "address"
          }
        ],
        "internalType": "struct ProjectData",
        "name": "",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint64",
            "name": "startTime",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "endTime",
            "type": "uint64"
          },
          {
            "internalType": "uint256",
            "name": "projectTokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint64",
            "name": "totalVintageQuantity",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "isCorsiaCompliant",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isCCPcompliant",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "coBenefits",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "correspAdjustment",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "additionalCertification",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "uri",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "registry",
            "type": "string"
          }
        ],
        "internalType": "struct VintageData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "oracleUrlSource",
    "outputs": [
      {
        "internalType": "contract IOracleUrlSource",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projectRatings",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "projectVintageTokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "requestData",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "requestDataAndPayLink",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "requestId",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "retiringEntityString",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "beneficiaryString",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "retirementMessage",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "retireAndMintCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "retiringEntity",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "retiringEntityString",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "beneficiary",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "beneficiaryString",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "retirementMessage",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "beneficiaryLocation",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "consumptionCountryCode",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "consumptionPeriodStart",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "consumptionPeriodEnd",
            "type": "uint256"
          }
        ],
        "internalType": "struct CreateRetirementRequestParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "retireAndMintCertificateForEntity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "retireFrom",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "retirementEventId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "standardRegistry",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tco2Token",
    "outputs": [
      {
        "internalType": "contract IToucanCarbonOffsetsBase",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "unwrap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "wrap",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
