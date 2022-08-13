export default {
	address: '0xD8B4359143eda5B2d763E127Ed27c77addBc47d3',
	abi: [
		{
			inputs: [
				{
					internalType: 'contract IJBOperatorStore',
					name: '_operatorStore',
					type: 'address'
				}
			],
			stateMutability: 'nonpayable',
			type: 'constructor'
		},
		{
			inputs: [],
			name: 'UNAUTHORIZED',
			type: 'error'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'approved',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'Approval',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'operator',
					type: 'address'
				},
				{
					indexed: false,
					internalType: 'bool',
					name: 'approved',
					type: 'bool'
				}
			],
			name: 'ApprovalForAll',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'uint256',
					name: 'projectId',
					type: 'uint256'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					components: [
						{
							internalType: 'string',
							name: 'content',
							type: 'string'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						}
					],
					indexed: false,
					internalType: 'struct JBProjectMetadata',
					name: 'metadata',
					type: 'tuple'
				},
				{
					indexed: false,
					internalType: 'address',
					name: 'caller',
					type: 'address'
				}
			],
			name: 'Create',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'delegator',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'fromDelegate',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'toDelegate',
					type: 'address'
				}
			],
			name: 'DelegateChanged',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'delegate',
					type: 'address'
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'previousBalance',
					type: 'uint256'
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'newBalance',
					type: 'uint256'
				}
			],
			name: 'DelegateVotesChanged',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'previousOwner',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'newOwner',
					type: 'address'
				}
			],
			name: 'OwnershipTransferred',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'uint256',
					name: 'projectId',
					type: 'uint256'
				},
				{
					components: [
						{
							internalType: 'string',
							name: 'content',
							type: 'string'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						}
					],
					indexed: false,
					internalType: 'struct JBProjectMetadata',
					name: 'metadata',
					type: 'tuple'
				},
				{
					indexed: false,
					internalType: 'address',
					name: 'caller',
					type: 'address'
				}
			],
			name: 'SetMetadata',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'contract IJBTokenUriResolver',
					name: 'resolver',
					type: 'address'
				},
				{
					indexed: false,
					internalType: 'address',
					name: 'caller',
					type: 'address'
				}
			],
			name: 'SetTokenUriResolver',
			type: 'event'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'from',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'Transfer',
			type: 'event'
		},
		{
			inputs: [],
			name: 'DOMAIN_SEPARATOR',
			outputs: [
				{
					internalType: 'bytes32',
					name: '',
					type: 'bytes32'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'approve',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				}
			],
			name: 'balanceOf',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'count',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: '_owner',
					type: 'address'
				},
				{
					components: [
						{
							internalType: 'string',
							name: 'content',
							type: 'string'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						}
					],
					internalType: 'struct JBProjectMetadata',
					name: '_metadata',
					type: 'tuple'
				}
			],
			name: 'createFor',
			outputs: [
				{
					internalType: 'uint256',
					name: 'projectId',
					type: 'uint256'
				}
			],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'delegatee',
					type: 'address'
				}
			],
			name: 'delegate',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'delegatee',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'nonce',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: 'expiry',
					type: 'uint256'
				},
				{
					internalType: 'uint8',
					name: 'v',
					type: 'uint8'
				},
				{
					internalType: 'bytes32',
					name: 'r',
					type: 'bytes32'
				},
				{
					internalType: 'bytes32',
					name: 's',
					type: 'bytes32'
				}
			],
			name: 'delegateBySig',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'account',
					type: 'address'
				}
			],
			name: 'delegates',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'getApproved',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'blockNumber',
					type: 'uint256'
				}
			],
			name: 'getPastTotalSupply',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'account',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'blockNumber',
					type: 'uint256'
				}
			],
			name: 'getPastVotes',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'account',
					type: 'address'
				}
			],
			name: 'getVotes',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'operator',
					type: 'address'
				}
			],
			name: 'isApprovedForAll',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			name: 'metadataContentOf',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'name',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				}
			],
			name: 'nonces',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'operatorStore',
			outputs: [
				{
					internalType: 'contract IJBOperatorStore',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'owner',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'ownerOf',
			outputs: [
				{
					internalType: 'address',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'renounceOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'from',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'safeTransferFrom',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'from',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				},
				{
					internalType: 'bytes',
					name: '_data',
					type: 'bytes'
				}
			],
			name: 'safeTransferFrom',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'operator',
					type: 'address'
				},
				{
					internalType: 'bool',
					name: 'approved',
					type: 'bool'
				}
			],
			name: 'setApprovalForAll',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_projectId',
					type: 'uint256'
				},
				{
					components: [
						{
							internalType: 'string',
							name: 'content',
							type: 'string'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						}
					],
					internalType: 'struct JBProjectMetadata',
					name: '_metadata',
					type: 'tuple'
				}
			],
			name: 'setMetadataOf',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'contract IJBTokenUriResolver',
					name: '_newResolver',
					type: 'address'
				}
			],
			name: 'setTokenUriResolver',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'bytes4',
					name: '_interfaceId',
					type: 'bytes4'
				}
			],
			name: 'supportsInterface',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'symbol',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'uint256',
					name: '_projectId',
					type: 'uint256'
				}
			],
			name: 'tokenURI',
			outputs: [
				{
					internalType: 'string',
					name: '',
					type: 'string'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'tokenUriResolver',
			outputs: [
				{
					internalType: 'contract IJBTokenUriResolver',
					name: '',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'from',
					type: 'address'
				},
				{
					internalType: 'address',
					name: 'to',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			name: 'transferFrom',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'newOwner',
					type: 'address'
				}
			],
			name: 'transferOwnership',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		}
	],
	transactionHash: '0xfcf0651b641366a5f941154e7c4c6bdde277e9e8f43be74f2fe68481f5f35277',
	receipt: {
		to: null,
		from: '0xE9bE6df23C7f9CaBa3005DA2fa2d8714d340D0aF',
		contractAddress: '0xD8B4359143eda5B2d763E127Ed27c77addBc47d3',
		transactionIndex: 17,
		gasUsed: '2824579',
		logsBloom:
			'0x00000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000001000000000000000000000000000000000000020000000000000000000800040000000000000000000001000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000020000000000000000000000000000',
		blockHash: '0x161df7e26ef6e521c50f9bcd49cd4891467b248b553b2965ee3dd6bc05f9b20f',
		transactionHash: '0xfcf0651b641366a5f941154e7c4c6bdde277e9e8f43be74f2fe68481f5f35277',
		logs: [
			{
				transactionIndex: 17,
				blockNumber: 14730693,
				transactionHash: '0xfcf0651b641366a5f941154e7c4c6bdde277e9e8f43be74f2fe68481f5f35277',
				address: '0xD8B4359143eda5B2d763E127Ed27c77addBc47d3',
				topics: [
					'0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0',
					'0x0000000000000000000000000000000000000000000000000000000000000000',
					'0x000000000000000000000000e9be6df23c7f9caba3005da2fa2d8714d340d0af'
				],
				data: '0x',
				logIndex: 68,
				blockHash: '0x161df7e26ef6e521c50f9bcd49cd4891467b248b553b2965ee3dd6bc05f9b20f'
			}
		],
		blockNumber: 14730693,
		cumulativeGasUsed: '4812732',
		status: 1,
		byzantium: true
	},
	args: ['0x6F3C5afCa0c9eDf3926eF2dDF17c8ae6391afEfb'],
	numDeployments: 1,
	solcInputHash: '87acdcf5deeaa43ae3ecf62f45455645',
	metadata:
		'{"compiler":{"version":"0.8.6+commit.11564f7e"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract IJBOperatorStore","name":"_operatorStore","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"UNAUTHORIZED","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"projectId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"domain","type":"uint256"}],"indexed":false,"internalType":"struct JBProjectMetadata","name":"metadata","type":"tuple"},{"indexed":false,"internalType":"address","name":"caller","type":"address"}],"name":"Create","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"projectId","type":"uint256"},{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"domain","type":"uint256"}],"indexed":false,"internalType":"struct JBProjectMetadata","name":"metadata","type":"tuple"},{"indexed":false,"internalType":"address","name":"caller","type":"address"}],"name":"SetMetadata","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IJBTokenUriResolver","name":"resolver","type":"address"},{"indexed":false,"internalType":"address","name":"caller","type":"address"}],"name":"SetTokenUriResolver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"domain","type":"uint256"}],"internalType":"struct JBProjectMetadata","name":"_metadata","type":"tuple"}],"name":"createFor","outputs":[{"internalType":"uint256","name":"projectId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastTotalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPastVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"metadataContentOf","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operatorStore","outputs":[{"internalType":"contract IJBOperatorStore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"},{"components":[{"internalType":"string","name":"content","type":"string"},{"internalType":"uint256","name":"domain","type":"uint256"}],"internalType":"struct JBProjectMetadata","name":"_metadata","type":"tuple"}],"name":"setMetadataOf","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IJBTokenUriResolver","name":"_newResolver","type":"address"}],"name":"setTokenUriResolver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"_interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_projectId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenUriResolver","outputs":[{"internalType":"contract IJBTokenUriResolver","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"details":"Projects are represented as ERC-721\'s.Adheres to - IJBProjects: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.Inherits from - JBOperatable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions. ERC721Votes: A checkpointable standard definition for non-fungible tokens (NFTs). Ownable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions.","kind":"dev","methods":{"DOMAIN_SEPARATOR()":{"details":"Returns the contract\'s {EIP712} domain separator."},"approve(address,uint256)":{"details":"See {IERC721-approve}."},"balanceOf(address)":{"details":"See {IERC721-balanceOf}."},"constructor":{"params":{"_operatorStore":"A contract storing operator assignments."}},"createFor(address,(string,uint256))":{"details":" Anyone can create a project on an owner\'s behalf.","params":{"_metadata":"A struct containing metadata content about the project, and domain within which the metadata applies.","_owner":"The address that will be the owner of the project."},"returns":{"projectId":"The token ID of the newly created project."}},"delegate(address)":{"details":"Delegates votes from the sender to `delegatee`."},"delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)":{"details":"Delegates votes from signer to `delegatee`."},"delegates(address)":{"details":"Returns the delegate that `account` has chosen."},"getApproved(uint256)":{"details":"See {IERC721-getApproved}."},"getPastTotalSupply(uint256)":{"details":"Returns the total supply of votes available at the end of a past block (`blockNumber`). NOTE: This value is the sum of all available votes, which is not necessarily the sum of all delegated votes. Votes that have not been delegated are still part of total supply, even though they would not participate in a vote. Requirements: - `blockNumber` must have been already mined"},"getPastVotes(address,uint256)":{"details":"Returns the amount of votes that `account` had at the end of a past block (`blockNumber`). Requirements: - `blockNumber` must have been already mined"},"getVotes(address)":{"details":"Returns the current amount of votes that `account` has."},"isApprovedForAll(address,address)":{"details":"See {IERC721-isApprovedForAll}."},"name()":{"details":"See {IERC721Metadata-name}."},"nonces(address)":{"details":"Returns an address nonce."},"owner()":{"details":"Returns the address of the current owner."},"ownerOf(uint256)":{"details":"See {IERC721-ownerOf}."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"safeTransferFrom(address,address,uint256)":{"details":"See {IERC721-safeTransferFrom}."},"safeTransferFrom(address,address,uint256,bytes)":{"details":"See {IERC721-safeTransferFrom}."},"setApprovalForAll(address,bool)":{"details":"See {IERC721-setApprovalForAll}."},"setMetadataOf(uint256,(string,uint256))":{"details":" Only a project\'s owner or operator can set its metadata. Applications can use the domain namespace as they wish.","params":{"_metadata":"A struct containing metadata content, and domain within which the metadata applies. ","_projectId":"The ID of the project who\'s metadata is being changed."}},"setTokenUriResolver(address)":{"params":{"_newResolver":"The address of the new resolver."}},"supportsInterface(bytes4)":{"details":" See {IERC165-supportsInterface}.","params":{"_interfaceId":"The ID of the interface to check for adherance to."}},"symbol()":{"details":"See {IERC721Metadata-symbol}."},"tokenURI(uint256)":{"params":{"_projectId":"The ID of the project to get a URI of."},"returns":{"_0":"The token URI to use for the provided `_projectId`."}},"transferFrom(address,address,uint256)":{"details":"See {IERC721-transferFrom}."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"stateVariables":{"count":{"details":"The count is incremented with each new project created.  The resulting ERC-721 token ID for each project is the newly incremented count value."}},"version":1},"userdoc":{"kind":"user","methods":{"count()":{"notice":" The number of projects that have been created using this contract."},"createFor(address,(string,uint256))":{"notice":" Create a new project for the specified owner, which mints an NFT (ERC-721) into their wallet."},"metadataContentOf(uint256,uint256)":{"notice":" The metadata for each project, which can be used across several domains. _projectId The ID of the project to which the metadata belongs. _domain The domain within which the metadata applies. Applications can use the domain namespace as they wish."},"operatorStore()":{"notice":" A contract storing operator assignments."},"setMetadataOf(uint256,(string,uint256))":{"notice":" Allows a project owner to set the project\'s metadata content for a particular domain namespace. "},"setTokenUriResolver(address)":{"notice":" Sets the address of the resolver used to retrieve the tokenURI of projects."},"supportsInterface(bytes4)":{"notice":"Indicates if this contract adheres to the specified interface."},"tokenURI(uint256)":{"notice":" Returns the URI where the ERC-721 standard JSON of a project is hosted."},"tokenUriResolver()":{"notice":"The contract resolving each project ID to its ERC721 URI."}},"notice":" Stores project ownership and metadata.","version":1}},"settings":{"compilationTarget":{"contracts/JBProjects.sol":"JBProjects"},"evmVersion":"berlin","libraries":{},"metadata":{"bytecodeHash":"ipfs","useLiteralContent":true},"optimizer":{"enabled":true,"runs":10000},"remappings":[]},"sources":{"@openzeppelin/contracts/access/Ownable.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (access/Ownable.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../utils/Context.sol\\";\\n\\n/**\\n * @dev Contract module which provides a basic access control mechanism, where\\n * there is an account (an owner) that can be granted exclusive access to\\n * specific functions.\\n *\\n * By default, the owner account will be the one that deploys the contract. This\\n * can later be changed with {transferOwnership}.\\n *\\n * This module is used through inheritance. It will make available the modifier\\n * `onlyOwner`, which can be applied to your functions to restrict their use to\\n * the owner.\\n */\\nabstract contract Ownable is Context {\\n    address private _owner;\\n\\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\\n\\n    /**\\n     * @dev Initializes the contract setting the deployer as the initial owner.\\n     */\\n    constructor() {\\n        _transferOwnership(_msgSender());\\n    }\\n\\n    /**\\n     * @dev Returns the address of the current owner.\\n     */\\n    function owner() public view virtual returns (address) {\\n        return _owner;\\n    }\\n\\n    /**\\n     * @dev Throws if called by any account other than the owner.\\n     */\\n    modifier onlyOwner() {\\n        require(owner() == _msgSender(), \\"Ownable: caller is not the owner\\");\\n        _;\\n    }\\n\\n    /**\\n     * @dev Leaves the contract without owner. It will not be possible to call\\n     * `onlyOwner` functions anymore. Can only be called by the current owner.\\n     *\\n     * NOTE: Renouncing ownership will leave the contract without an owner,\\n     * thereby removing any functionality that is only available to the owner.\\n     */\\n    function renounceOwnership() public virtual onlyOwner {\\n        _transferOwnership(address(0));\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Can only be called by the current owner.\\n     */\\n    function transferOwnership(address newOwner) public virtual onlyOwner {\\n        require(newOwner != address(0), \\"Ownable: new owner is the zero address\\");\\n        _transferOwnership(newOwner);\\n    }\\n\\n    /**\\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\\n     * Internal function without access restriction.\\n     */\\n    function _transferOwnership(address newOwner) internal virtual {\\n        address oldOwner = _owner;\\n        _owner = newOwner;\\n        emit OwnershipTransferred(oldOwner, newOwner);\\n    }\\n}\\n","keccak256":"0x24e0364e503a9bbde94c715d26573a76f14cd2a202d45f96f52134ab806b67b9","license":"MIT"},"@openzeppelin/contracts/governance/utils/IVotes.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (governance/utils/IVotes.sol)\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Common interface for {ERC20Votes}, {ERC721Votes}, and other {Votes}-enabled contracts.\\n *\\n * _Available since v4.5._\\n */\\ninterface IVotes {\\n    /**\\n     * @dev Emitted when an account changes their delegate.\\n     */\\n    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);\\n\\n    /**\\n     * @dev Emitted when a token transfer or delegate change results in changes to a delegate\'s number of votes.\\n     */\\n    event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);\\n\\n    /**\\n     * @dev Returns the current amount of votes that `account` has.\\n     */\\n    function getVotes(address account) external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the amount of votes that `account` had at the end of a past block (`blockNumber`).\\n     */\\n    function getPastVotes(address account, uint256 blockNumber) external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the total supply of votes available at the end of a past block (`blockNumber`).\\n     *\\n     * NOTE: This value is the sum of all available votes, which is not necessarily the sum of all delegated votes.\\n     * Votes that have not been delegated are still part of total supply, even though they would not participate in a\\n     * vote.\\n     */\\n    function getPastTotalSupply(uint256 blockNumber) external view returns (uint256);\\n\\n    /**\\n     * @dev Returns the delegate that `account` has chosen.\\n     */\\n    function delegates(address account) external view returns (address);\\n\\n    /**\\n     * @dev Delegates votes from the sender to `delegatee`.\\n     */\\n    function delegate(address delegatee) external;\\n\\n    /**\\n     * @dev Delegates votes from signer to `delegatee`.\\n     */\\n    function delegateBySig(\\n        address delegatee,\\n        uint256 nonce,\\n        uint256 expiry,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) external;\\n}\\n","keccak256":"0x3b2ad1fa2949d64c4819626773da0ae6899d6a8e603403c7cae06c3375448b8a","license":"MIT"},"@openzeppelin/contracts/governance/utils/Votes.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (governance/utils/Votes.sol)\\npragma solidity ^0.8.0;\\n\\nimport \\"../../utils/Context.sol\\";\\nimport \\"../../utils/Counters.sol\\";\\nimport \\"../../utils/Checkpoints.sol\\";\\nimport \\"../../utils/cryptography/draft-EIP712.sol\\";\\nimport \\"./IVotes.sol\\";\\n\\n/**\\n * @dev This is a base abstract contract that tracks voting units, which are a measure of voting power that can be\\n * transferred, and provides a system of vote delegation, where an account can delegate its voting units to a sort of\\n * \\"representative\\" that will pool delegated voting units from different accounts and can then use it to vote in\\n * decisions. In fact, voting units _must_ be delegated in order to count as actual votes, and an account has to\\n * delegate those votes to itself if it wishes to participate in decisions and does not have a trusted representative.\\n *\\n * This contract is often combined with a token contract such that voting units correspond to token units. For an\\n * example, see {ERC721Votes}.\\n *\\n * The full history of delegate votes is tracked on-chain so that governance protocols can consider votes as distributed\\n * at a particular block number to protect against flash loans and double voting. The opt-in delegate system makes the\\n * cost of this history tracking optional.\\n *\\n * When using this module the derived contract must implement {_getVotingUnits} (for example, make it return\\n * {ERC721-balanceOf}), and can use {_transferVotingUnits} to track a change in the distribution of those units (in the\\n * previous example, it would be included in {ERC721-_beforeTokenTransfer}).\\n *\\n * _Available since v4.5._\\n */\\nabstract contract Votes is IVotes, Context, EIP712 {\\n    using Checkpoints for Checkpoints.History;\\n    using Counters for Counters.Counter;\\n\\n    bytes32 private constant _DELEGATION_TYPEHASH =\\n        keccak256(\\"Delegation(address delegatee,uint256 nonce,uint256 expiry)\\");\\n\\n    mapping(address => address) private _delegation;\\n    mapping(address => Checkpoints.History) private _delegateCheckpoints;\\n    Checkpoints.History private _totalCheckpoints;\\n\\n    mapping(address => Counters.Counter) private _nonces;\\n\\n    /**\\n     * @dev Returns the current amount of votes that `account` has.\\n     */\\n    function getVotes(address account) public view virtual override returns (uint256) {\\n        return _delegateCheckpoints[account].latest();\\n    }\\n\\n    /**\\n     * @dev Returns the amount of votes that `account` had at the end of a past block (`blockNumber`).\\n     *\\n     * Requirements:\\n     *\\n     * - `blockNumber` must have been already mined\\n     */\\n    function getPastVotes(address account, uint256 blockNumber) public view virtual override returns (uint256) {\\n        return _delegateCheckpoints[account].getAtBlock(blockNumber);\\n    }\\n\\n    /**\\n     * @dev Returns the total supply of votes available at the end of a past block (`blockNumber`).\\n     *\\n     * NOTE: This value is the sum of all available votes, which is not necessarily the sum of all delegated votes.\\n     * Votes that have not been delegated are still part of total supply, even though they would not participate in a\\n     * vote.\\n     *\\n     * Requirements:\\n     *\\n     * - `blockNumber` must have been already mined\\n     */\\n    function getPastTotalSupply(uint256 blockNumber) public view virtual override returns (uint256) {\\n        require(blockNumber < block.number, \\"Votes: block not yet mined\\");\\n        return _totalCheckpoints.getAtBlock(blockNumber);\\n    }\\n\\n    /**\\n     * @dev Returns the current total supply of votes.\\n     */\\n    function _getTotalSupply() internal view virtual returns (uint256) {\\n        return _totalCheckpoints.latest();\\n    }\\n\\n    /**\\n     * @dev Returns the delegate that `account` has chosen.\\n     */\\n    function delegates(address account) public view virtual override returns (address) {\\n        return _delegation[account];\\n    }\\n\\n    /**\\n     * @dev Delegates votes from the sender to `delegatee`.\\n     */\\n    function delegate(address delegatee) public virtual override {\\n        address account = _msgSender();\\n        _delegate(account, delegatee);\\n    }\\n\\n    /**\\n     * @dev Delegates votes from signer to `delegatee`.\\n     */\\n    function delegateBySig(\\n        address delegatee,\\n        uint256 nonce,\\n        uint256 expiry,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) public virtual override {\\n        require(block.timestamp <= expiry, \\"Votes: signature expired\\");\\n        address signer = ECDSA.recover(\\n            _hashTypedDataV4(keccak256(abi.encode(_DELEGATION_TYPEHASH, delegatee, nonce, expiry))),\\n            v,\\n            r,\\n            s\\n        );\\n        require(nonce == _useNonce(signer), \\"Votes: invalid nonce\\");\\n        _delegate(signer, delegatee);\\n    }\\n\\n    /**\\n     * @dev Delegate all of `account`\'s voting units to `delegatee`.\\n     *\\n     * Emits events {DelegateChanged} and {DelegateVotesChanged}.\\n     */\\n    function _delegate(address account, address delegatee) internal virtual {\\n        address oldDelegate = delegates(account);\\n        _delegation[account] = delegatee;\\n\\n        emit DelegateChanged(account, oldDelegate, delegatee);\\n        _moveDelegateVotes(oldDelegate, delegatee, _getVotingUnits(account));\\n    }\\n\\n    /**\\n     * @dev Transfers, mints, or burns voting units. To register a mint, `from` should be zero. To register a burn, `to`\\n     * should be zero. Total supply of voting units will be adjusted with mints and burns.\\n     */\\n    function _transferVotingUnits(\\n        address from,\\n        address to,\\n        uint256 amount\\n    ) internal virtual {\\n        if (from == address(0)) {\\n            _totalCheckpoints.push(_add, amount);\\n        }\\n        if (to == address(0)) {\\n            _totalCheckpoints.push(_subtract, amount);\\n        }\\n        _moveDelegateVotes(delegates(from), delegates(to), amount);\\n    }\\n\\n    /**\\n     * @dev Moves delegated votes from one delegate to another.\\n     */\\n    function _moveDelegateVotes(\\n        address from,\\n        address to,\\n        uint256 amount\\n    ) private {\\n        if (from != to && amount > 0) {\\n            if (from != address(0)) {\\n                (uint256 oldValue, uint256 newValue) = _delegateCheckpoints[from].push(_subtract, amount);\\n                emit DelegateVotesChanged(from, oldValue, newValue);\\n            }\\n            if (to != address(0)) {\\n                (uint256 oldValue, uint256 newValue) = _delegateCheckpoints[to].push(_add, amount);\\n                emit DelegateVotesChanged(to, oldValue, newValue);\\n            }\\n        }\\n    }\\n\\n    function _add(uint256 a, uint256 b) private pure returns (uint256) {\\n        return a + b;\\n    }\\n\\n    function _subtract(uint256 a, uint256 b) private pure returns (uint256) {\\n        return a - b;\\n    }\\n\\n    /**\\n     * @dev Consumes a nonce.\\n     *\\n     * Returns the current value and increments nonce.\\n     */\\n    function _useNonce(address owner) internal virtual returns (uint256 current) {\\n        Counters.Counter storage nonce = _nonces[owner];\\n        current = nonce.current();\\n        nonce.increment();\\n    }\\n\\n    /**\\n     * @dev Returns an address nonce.\\n     */\\n    function nonces(address owner) public view virtual returns (uint256) {\\n        return _nonces[owner].current();\\n    }\\n\\n    /**\\n     * @dev Returns the contract\'s {EIP712} domain separator.\\n     */\\n    // solhint-disable-next-line func-name-mixedcase\\n    function DOMAIN_SEPARATOR() external view returns (bytes32) {\\n        return _domainSeparatorV4();\\n    }\\n\\n    /**\\n     * @dev Must return the voting units held by an account.\\n     */\\n    function _getVotingUnits(address) internal virtual returns (uint256);\\n}\\n","keccak256":"0x2fcce3e523c1bb7913bccb9de353bd2def3f0f00063bb57e60c6826d75b876a7","license":"MIT"},"@openzeppelin/contracts/token/ERC721/ERC721.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (token/ERC721/ERC721.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"./IERC721.sol\\";\\nimport \\"./IERC721Receiver.sol\\";\\nimport \\"./extensions/IERC721Metadata.sol\\";\\nimport \\"../../utils/Address.sol\\";\\nimport \\"../../utils/Context.sol\\";\\nimport \\"../../utils/Strings.sol\\";\\nimport \\"../../utils/introspection/ERC165.sol\\";\\n\\n/**\\n * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including\\n * the Metadata extension, but not including the Enumerable extension, which is available separately as\\n * {ERC721Enumerable}.\\n */\\ncontract ERC721 is Context, ERC165, IERC721, IERC721Metadata {\\n    using Address for address;\\n    using Strings for uint256;\\n\\n    // Token name\\n    string private _name;\\n\\n    // Token symbol\\n    string private _symbol;\\n\\n    // Mapping from token ID to owner address\\n    mapping(uint256 => address) private _owners;\\n\\n    // Mapping owner address to token count\\n    mapping(address => uint256) private _balances;\\n\\n    // Mapping from token ID to approved address\\n    mapping(uint256 => address) private _tokenApprovals;\\n\\n    // Mapping from owner to operator approvals\\n    mapping(address => mapping(address => bool)) private _operatorApprovals;\\n\\n    /**\\n     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.\\n     */\\n    constructor(string memory name_, string memory symbol_) {\\n        _name = name_;\\n        _symbol = symbol_;\\n    }\\n\\n    /**\\n     * @dev See {IERC165-supportsInterface}.\\n     */\\n    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {\\n        return\\n            interfaceId == type(IERC721).interfaceId ||\\n            interfaceId == type(IERC721Metadata).interfaceId ||\\n            super.supportsInterface(interfaceId);\\n    }\\n\\n    /**\\n     * @dev See {IERC721-balanceOf}.\\n     */\\n    function balanceOf(address owner) public view virtual override returns (uint256) {\\n        require(owner != address(0), \\"ERC721: balance query for the zero address\\");\\n        return _balances[owner];\\n    }\\n\\n    /**\\n     * @dev See {IERC721-ownerOf}.\\n     */\\n    function ownerOf(uint256 tokenId) public view virtual override returns (address) {\\n        address owner = _owners[tokenId];\\n        require(owner != address(0), \\"ERC721: owner query for nonexistent token\\");\\n        return owner;\\n    }\\n\\n    /**\\n     * @dev See {IERC721Metadata-name}.\\n     */\\n    function name() public view virtual override returns (string memory) {\\n        return _name;\\n    }\\n\\n    /**\\n     * @dev See {IERC721Metadata-symbol}.\\n     */\\n    function symbol() public view virtual override returns (string memory) {\\n        return _symbol;\\n    }\\n\\n    /**\\n     * @dev See {IERC721Metadata-tokenURI}.\\n     */\\n    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {\\n        require(_exists(tokenId), \\"ERC721Metadata: URI query for nonexistent token\\");\\n\\n        string memory baseURI = _baseURI();\\n        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : \\"\\";\\n    }\\n\\n    /**\\n     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each\\n     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty\\n     * by default, can be overriden in child contracts.\\n     */\\n    function _baseURI() internal view virtual returns (string memory) {\\n        return \\"\\";\\n    }\\n\\n    /**\\n     * @dev See {IERC721-approve}.\\n     */\\n    function approve(address to, uint256 tokenId) public virtual override {\\n        address owner = ERC721.ownerOf(tokenId);\\n        require(to != owner, \\"ERC721: approval to current owner\\");\\n\\n        require(\\n            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),\\n            \\"ERC721: approve caller is not owner nor approved for all\\"\\n        );\\n\\n        _approve(to, tokenId);\\n    }\\n\\n    /**\\n     * @dev See {IERC721-getApproved}.\\n     */\\n    function getApproved(uint256 tokenId) public view virtual override returns (address) {\\n        require(_exists(tokenId), \\"ERC721: approved query for nonexistent token\\");\\n\\n        return _tokenApprovals[tokenId];\\n    }\\n\\n    /**\\n     * @dev See {IERC721-setApprovalForAll}.\\n     */\\n    function setApprovalForAll(address operator, bool approved) public virtual override {\\n        _setApprovalForAll(_msgSender(), operator, approved);\\n    }\\n\\n    /**\\n     * @dev See {IERC721-isApprovedForAll}.\\n     */\\n    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {\\n        return _operatorApprovals[owner][operator];\\n    }\\n\\n    /**\\n     * @dev See {IERC721-transferFrom}.\\n     */\\n    function transferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) public virtual override {\\n        //solhint-disable-next-line max-line-length\\n        require(_isApprovedOrOwner(_msgSender(), tokenId), \\"ERC721: transfer caller is not owner nor approved\\");\\n\\n        _transfer(from, to, tokenId);\\n    }\\n\\n    /**\\n     * @dev See {IERC721-safeTransferFrom}.\\n     */\\n    function safeTransferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) public virtual override {\\n        safeTransferFrom(from, to, tokenId, \\"\\");\\n    }\\n\\n    /**\\n     * @dev See {IERC721-safeTransferFrom}.\\n     */\\n    function safeTransferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId,\\n        bytes memory _data\\n    ) public virtual override {\\n        require(_isApprovedOrOwner(_msgSender(), tokenId), \\"ERC721: transfer caller is not owner nor approved\\");\\n        _safeTransfer(from, to, tokenId, _data);\\n    }\\n\\n    /**\\n     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients\\n     * are aware of the ERC721 protocol to prevent tokens from being forever locked.\\n     *\\n     * `_data` is additional data, it has no specified format and it is sent in call to `to`.\\n     *\\n     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.\\n     * implement alternative mechanisms to perform token transfer, such as signature-based.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` cannot be the zero address.\\n     * - `to` cannot be the zero address.\\n     * - `tokenId` token must exist and be owned by `from`.\\n     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _safeTransfer(\\n        address from,\\n        address to,\\n        uint256 tokenId,\\n        bytes memory _data\\n    ) internal virtual {\\n        _transfer(from, to, tokenId);\\n        require(_checkOnERC721Received(from, to, tokenId, _data), \\"ERC721: transfer to non ERC721Receiver implementer\\");\\n    }\\n\\n    /**\\n     * @dev Returns whether `tokenId` exists.\\n     *\\n     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.\\n     *\\n     * Tokens start existing when they are minted (`_mint`),\\n     * and stop existing when they are burned (`_burn`).\\n     */\\n    function _exists(uint256 tokenId) internal view virtual returns (bool) {\\n        return _owners[tokenId] != address(0);\\n    }\\n\\n    /**\\n     * @dev Returns whether `spender` is allowed to manage `tokenId`.\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must exist.\\n     */\\n    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {\\n        require(_exists(tokenId), \\"ERC721: operator query for nonexistent token\\");\\n        address owner = ERC721.ownerOf(tokenId);\\n        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));\\n    }\\n\\n    /**\\n     * @dev Safely mints `tokenId` and transfers it to `to`.\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must not exist.\\n     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _safeMint(address to, uint256 tokenId) internal virtual {\\n        _safeMint(to, tokenId, \\"\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is\\n     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.\\n     */\\n    function _safeMint(\\n        address to,\\n        uint256 tokenId,\\n        bytes memory _data\\n    ) internal virtual {\\n        _mint(to, tokenId);\\n        require(\\n            _checkOnERC721Received(address(0), to, tokenId, _data),\\n            \\"ERC721: transfer to non ERC721Receiver implementer\\"\\n        );\\n    }\\n\\n    /**\\n     * @dev Mints `tokenId` and transfers it to `to`.\\n     *\\n     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must not exist.\\n     * - `to` cannot be the zero address.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _mint(address to, uint256 tokenId) internal virtual {\\n        require(to != address(0), \\"ERC721: mint to the zero address\\");\\n        require(!_exists(tokenId), \\"ERC721: token already minted\\");\\n\\n        _beforeTokenTransfer(address(0), to, tokenId);\\n\\n        _balances[to] += 1;\\n        _owners[tokenId] = to;\\n\\n        emit Transfer(address(0), to, tokenId);\\n\\n        _afterTokenTransfer(address(0), to, tokenId);\\n    }\\n\\n    /**\\n     * @dev Destroys `tokenId`.\\n     * The approval is cleared when the token is burned.\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must exist.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _burn(uint256 tokenId) internal virtual {\\n        address owner = ERC721.ownerOf(tokenId);\\n\\n        _beforeTokenTransfer(owner, address(0), tokenId);\\n\\n        // Clear approvals\\n        _approve(address(0), tokenId);\\n\\n        _balances[owner] -= 1;\\n        delete _owners[tokenId];\\n\\n        emit Transfer(owner, address(0), tokenId);\\n\\n        _afterTokenTransfer(owner, address(0), tokenId);\\n    }\\n\\n    /**\\n     * @dev Transfers `tokenId` from `from` to `to`.\\n     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.\\n     *\\n     * Requirements:\\n     *\\n     * - `to` cannot be the zero address.\\n     * - `tokenId` token must be owned by `from`.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function _transfer(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) internal virtual {\\n        require(ERC721.ownerOf(tokenId) == from, \\"ERC721: transfer from incorrect owner\\");\\n        require(to != address(0), \\"ERC721: transfer to the zero address\\");\\n\\n        _beforeTokenTransfer(from, to, tokenId);\\n\\n        // Clear approvals from the previous owner\\n        _approve(address(0), tokenId);\\n\\n        _balances[from] -= 1;\\n        _balances[to] += 1;\\n        _owners[tokenId] = to;\\n\\n        emit Transfer(from, to, tokenId);\\n\\n        _afterTokenTransfer(from, to, tokenId);\\n    }\\n\\n    /**\\n     * @dev Approve `to` to operate on `tokenId`\\n     *\\n     * Emits a {Approval} event.\\n     */\\n    function _approve(address to, uint256 tokenId) internal virtual {\\n        _tokenApprovals[tokenId] = to;\\n        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);\\n    }\\n\\n    /**\\n     * @dev Approve `operator` to operate on all of `owner` tokens\\n     *\\n     * Emits a {ApprovalForAll} event.\\n     */\\n    function _setApprovalForAll(\\n        address owner,\\n        address operator,\\n        bool approved\\n    ) internal virtual {\\n        require(owner != operator, \\"ERC721: approve to caller\\");\\n        _operatorApprovals[owner][operator] = approved;\\n        emit ApprovalForAll(owner, operator, approved);\\n    }\\n\\n    /**\\n     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.\\n     * The call is not executed if the target address is not a contract.\\n     *\\n     * @param from address representing the previous owner of the given token ID\\n     * @param to target address that will receive the tokens\\n     * @param tokenId uint256 ID of the token to be transferred\\n     * @param _data bytes optional data to send along with the call\\n     * @return bool whether the call correctly returned the expected magic value\\n     */\\n    function _checkOnERC721Received(\\n        address from,\\n        address to,\\n        uint256 tokenId,\\n        bytes memory _data\\n    ) private returns (bool) {\\n        if (to.isContract()) {\\n            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {\\n                return retval == IERC721Receiver.onERC721Received.selector;\\n            } catch (bytes memory reason) {\\n                if (reason.length == 0) {\\n                    revert(\\"ERC721: transfer to non ERC721Receiver implementer\\");\\n                } else {\\n                    assembly {\\n                        revert(add(32, reason), mload(reason))\\n                    }\\n                }\\n            }\\n        } else {\\n            return true;\\n        }\\n    }\\n\\n    /**\\n     * @dev Hook that is called before any token transfer. This includes minting\\n     * and burning.\\n     *\\n     * Calling conditions:\\n     *\\n     * - When `from` and `to` are both non-zero, ``from``\'s `tokenId` will be\\n     * transferred to `to`.\\n     * - When `from` is zero, `tokenId` will be minted for `to`.\\n     * - When `to` is zero, ``from``\'s `tokenId` will be burned.\\n     * - `from` and `to` are never both zero.\\n     *\\n     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].\\n     */\\n    function _beforeTokenTransfer(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) internal virtual {}\\n\\n    /**\\n     * @dev Hook that is called after any transfer of tokens. This includes\\n     * minting and burning.\\n     *\\n     * Calling conditions:\\n     *\\n     * - when `from` and `to` are both non-zero.\\n     * - `from` and `to` are never both zero.\\n     *\\n     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].\\n     */\\n    function _afterTokenTransfer(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) internal virtual {}\\n}\\n","keccak256":"0x3b3dad958abecd3f0f43af1bf3fddaa7725cab576ebe7cc931a1ff07248a3491","license":"MIT"},"@openzeppelin/contracts/token/ERC721/IERC721.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (token/ERC721/IERC721.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../../utils/introspection/IERC165.sol\\";\\n\\n/**\\n * @dev Required interface of an ERC721 compliant contract.\\n */\\ninterface IERC721 is IERC165 {\\n    /**\\n     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.\\n     */\\n    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);\\n\\n    /**\\n     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.\\n     */\\n    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);\\n\\n    /**\\n     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.\\n     */\\n    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);\\n\\n    /**\\n     * @dev Returns the number of tokens in ``owner``\'s account.\\n     */\\n    function balanceOf(address owner) external view returns (uint256 balance);\\n\\n    /**\\n     * @dev Returns the owner of the `tokenId` token.\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must exist.\\n     */\\n    function ownerOf(uint256 tokenId) external view returns (address owner);\\n\\n    /**\\n     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients\\n     * are aware of the ERC721 protocol to prevent tokens from being forever locked.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` cannot be the zero address.\\n     * - `to` cannot be the zero address.\\n     * - `tokenId` token must exist and be owned by `from`.\\n     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.\\n     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function safeTransferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) external;\\n\\n    /**\\n     * @dev Transfers `tokenId` token from `from` to `to`.\\n     *\\n     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` cannot be the zero address.\\n     * - `to` cannot be the zero address.\\n     * - `tokenId` token must be owned by `from`.\\n     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function transferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) external;\\n\\n    /**\\n     * @dev Gives permission to `to` to transfer `tokenId` token to another account.\\n     * The approval is cleared when the token is transferred.\\n     *\\n     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.\\n     *\\n     * Requirements:\\n     *\\n     * - The caller must own the token or be an approved operator.\\n     * - `tokenId` must exist.\\n     *\\n     * Emits an {Approval} event.\\n     */\\n    function approve(address to, uint256 tokenId) external;\\n\\n    /**\\n     * @dev Returns the account approved for `tokenId` token.\\n     *\\n     * Requirements:\\n     *\\n     * - `tokenId` must exist.\\n     */\\n    function getApproved(uint256 tokenId) external view returns (address operator);\\n\\n    /**\\n     * @dev Approve or remove `operator` as an operator for the caller.\\n     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.\\n     *\\n     * Requirements:\\n     *\\n     * - The `operator` cannot be the caller.\\n     *\\n     * Emits an {ApprovalForAll} event.\\n     */\\n    function setApprovalForAll(address operator, bool _approved) external;\\n\\n    /**\\n     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.\\n     *\\n     * See {setApprovalForAll}\\n     */\\n    function isApprovedForAll(address owner, address operator) external view returns (bool);\\n\\n    /**\\n     * @dev Safely transfers `tokenId` token from `from` to `to`.\\n     *\\n     * Requirements:\\n     *\\n     * - `from` cannot be the zero address.\\n     * - `to` cannot be the zero address.\\n     * - `tokenId` token must exist and be owned by `from`.\\n     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.\\n     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.\\n     *\\n     * Emits a {Transfer} event.\\n     */\\n    function safeTransferFrom(\\n        address from,\\n        address to,\\n        uint256 tokenId,\\n        bytes calldata data\\n    ) external;\\n}\\n","keccak256":"0x516a22876c1fab47f49b1bc22b4614491cd05338af8bd2e7b382da090a079990","license":"MIT"},"@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (token/ERC721/IERC721Receiver.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @title ERC721 token receiver interface\\n * @dev Interface for any contract that wants to support safeTransfers\\n * from ERC721 asset contracts.\\n */\\ninterface IERC721Receiver {\\n    /**\\n     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}\\n     * by `operator` from `from`, this function is called.\\n     *\\n     * It must return its Solidity selector to confirm the token transfer.\\n     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.\\n     *\\n     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.\\n     */\\n    function onERC721Received(\\n        address operator,\\n        address from,\\n        uint256 tokenId,\\n        bytes calldata data\\n    ) external returns (bytes4);\\n}\\n","keccak256":"0xd5fa74b4fb323776fa4a8158800fec9d5ac0fec0d6dd046dd93798632ada265f","license":"MIT"},"@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/IERC721Metadata.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../IERC721.sol\\";\\n\\n/**\\n * @title ERC-721 Non-Fungible Token Standard, optional metadata extension\\n * @dev See https://eips.ethereum.org/EIPS/eip-721\\n */\\ninterface IERC721Metadata is IERC721 {\\n    /**\\n     * @dev Returns the token collection name.\\n     */\\n    function name() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the token collection symbol.\\n     */\\n    function symbol() external view returns (string memory);\\n\\n    /**\\n     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.\\n     */\\n    function tokenURI(uint256 tokenId) external view returns (string memory);\\n}\\n","keccak256":"0x75b829ff2f26c14355d1cba20e16fe7b29ca58eb5fef665ede48bc0f9c6c74b9","license":"MIT"},"@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (token/ERC721/extensions/draft-ERC721Votes.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../ERC721.sol\\";\\nimport \\"../../../governance/utils/Votes.sol\\";\\n\\n/**\\n * @dev Extension of ERC721 to support voting and delegation as implemented by {Votes}, where each individual NFT counts\\n * as 1 vote unit.\\n *\\n * Tokens do not count as votes until they are delegated, because votes must be tracked which incurs an additional cost\\n * on every transfer. Token holders can either delegate to a trusted representative who will decide how to make use of\\n * the votes in governance decisions, or they can delegate to themselves to be their own representative.\\n *\\n * _Available since v4.5._\\n */\\nabstract contract ERC721Votes is ERC721, Votes {\\n    /**\\n     * @dev Adjusts votes when tokens are transferred.\\n     *\\n     * Emits a {Votes-DelegateVotesChanged} event.\\n     */\\n    function _afterTokenTransfer(\\n        address from,\\n        address to,\\n        uint256 tokenId\\n    ) internal virtual override {\\n        _transferVotingUnits(from, to, 1);\\n        super._afterTokenTransfer(from, to, tokenId);\\n    }\\n\\n    /**\\n     * @dev Returns the balance of `account`.\\n     */\\n    function _getVotingUnits(address account) internal virtual override returns (uint256) {\\n        return balanceOf(account);\\n    }\\n}\\n","keccak256":"0x83d13d46981acb303a29c45c4675923e3260a9831ba1fc387164f2311903c7fe","license":"MIT"},"@openzeppelin/contracts/utils/Address.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (utils/Address.sol)\\n\\npragma solidity ^0.8.1;\\n\\n/**\\n * @dev Collection of functions related to the address type\\n */\\nlibrary Address {\\n    /**\\n     * @dev Returns true if `account` is a contract.\\n     *\\n     * [IMPORTANT]\\n     * ====\\n     * It is unsafe to assume that an address for which this function returns\\n     * false is an externally-owned account (EOA) and not a contract.\\n     *\\n     * Among others, `isContract` will return false for the following\\n     * types of addresses:\\n     *\\n     *  - an externally-owned account\\n     *  - a contract in construction\\n     *  - an address where a contract will be created\\n     *  - an address where a contract lived, but was destroyed\\n     * ====\\n     *\\n     * [IMPORTANT]\\n     * ====\\n     * You shouldn\'t rely on `isContract` to protect against flash loan attacks!\\n     *\\n     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets\\n     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract\\n     * constructor.\\n     * ====\\n     */\\n    function isContract(address account) internal view returns (bool) {\\n        // This method relies on extcodesize/address.code.length, which returns 0\\n        // for contracts in construction, since the code is only stored at the end\\n        // of the constructor execution.\\n\\n        return account.code.length > 0;\\n    }\\n\\n    /**\\n     * @dev Replacement for Solidity\'s `transfer`: sends `amount` wei to\\n     * `recipient`, forwarding all available gas and reverting on errors.\\n     *\\n     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost\\n     * of certain opcodes, possibly making contracts go over the 2300 gas limit\\n     * imposed by `transfer`, making them unable to receive funds via\\n     * `transfer`. {sendValue} removes this limitation.\\n     *\\n     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].\\n     *\\n     * IMPORTANT: because control is transferred to `recipient`, care must be\\n     * taken to not create reentrancy vulnerabilities. Consider using\\n     * {ReentrancyGuard} or the\\n     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].\\n     */\\n    function sendValue(address payable recipient, uint256 amount) internal {\\n        require(address(this).balance >= amount, \\"Address: insufficient balance\\");\\n\\n        (bool success, ) = recipient.call{value: amount}(\\"\\");\\n        require(success, \\"Address: unable to send value, recipient may have reverted\\");\\n    }\\n\\n    /**\\n     * @dev Performs a Solidity function call using a low level `call`. A\\n     * plain `call` is an unsafe replacement for a function call: use this\\n     * function instead.\\n     *\\n     * If `target` reverts with a revert reason, it is bubbled up by this\\n     * function (like regular Solidity function calls).\\n     *\\n     * Returns the raw returned data. To convert to the expected return value,\\n     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].\\n     *\\n     * Requirements:\\n     *\\n     * - `target` must be a contract.\\n     * - calling `target` with `data` must not revert.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCall(address target, bytes memory data) internal returns (bytes memory) {\\n        return functionCall(target, data, \\"Address: low-level call failed\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with\\n     * `errorMessage` as a fallback revert reason when `target` reverts.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        return functionCallWithValue(target, data, 0, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but also transferring `value` wei to `target`.\\n     *\\n     * Requirements:\\n     *\\n     * - the calling contract must have an ETH balance of at least `value`.\\n     * - the called Solidity function must be `payable`.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCallWithValue(\\n        address target,\\n        bytes memory data,\\n        uint256 value\\n    ) internal returns (bytes memory) {\\n        return functionCallWithValue(target, data, value, \\"Address: low-level call with value failed\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but\\n     * with `errorMessage` as a fallback revert reason when `target` reverts.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function functionCallWithValue(\\n        address target,\\n        bytes memory data,\\n        uint256 value,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        require(address(this).balance >= value, \\"Address: insufficient balance for call\\");\\n        require(isContract(target), \\"Address: call to non-contract\\");\\n\\n        (bool success, bytes memory returndata) = target.call{value: value}(data);\\n        return verifyCallResult(success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but performing a static call.\\n     *\\n     * _Available since v3.3._\\n     */\\n    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {\\n        return functionStaticCall(target, data, \\"Address: low-level static call failed\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\\n     * but performing a static call.\\n     *\\n     * _Available since v3.3._\\n     */\\n    function functionStaticCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal view returns (bytes memory) {\\n        require(isContract(target), \\"Address: static call to non-contract\\");\\n\\n        (bool success, bytes memory returndata) = target.staticcall(data);\\n        return verifyCallResult(success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],\\n     * but performing a delegate call.\\n     *\\n     * _Available since v3.4._\\n     */\\n    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {\\n        return functionDelegateCall(target, data, \\"Address: low-level delegate call failed\\");\\n    }\\n\\n    /**\\n     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],\\n     * but performing a delegate call.\\n     *\\n     * _Available since v3.4._\\n     */\\n    function functionDelegateCall(\\n        address target,\\n        bytes memory data,\\n        string memory errorMessage\\n    ) internal returns (bytes memory) {\\n        require(isContract(target), \\"Address: delegate call to non-contract\\");\\n\\n        (bool success, bytes memory returndata) = target.delegatecall(data);\\n        return verifyCallResult(success, returndata, errorMessage);\\n    }\\n\\n    /**\\n     * @dev Tool to verifies that a low level call was successful, and revert if it wasn\'t, either by bubbling the\\n     * revert reason using the provided one.\\n     *\\n     * _Available since v4.3._\\n     */\\n    function verifyCallResult(\\n        bool success,\\n        bytes memory returndata,\\n        string memory errorMessage\\n    ) internal pure returns (bytes memory) {\\n        if (success) {\\n            return returndata;\\n        } else {\\n            // Look for revert reason and bubble it up if present\\n            if (returndata.length > 0) {\\n                // The easiest way to bubble the revert reason is using memory via assembly\\n\\n                assembly {\\n                    let returndata_size := mload(returndata)\\n                    revert(add(32, returndata), returndata_size)\\n                }\\n            } else {\\n                revert(errorMessage);\\n            }\\n        }\\n    }\\n}\\n","keccak256":"0x3777e696b62134e6177440dbe6e6601c0c156a443f57167194b67e75527439de","license":"MIT"},"@openzeppelin/contracts/utils/Checkpoints.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (utils/Checkpoints.sol)\\npragma solidity ^0.8.0;\\n\\nimport \\"./math/Math.sol\\";\\nimport \\"./math/SafeCast.sol\\";\\n\\n/**\\n * @dev This library defines the `History` struct, for checkpointing values as they change at different points in\\n * time, and later looking up past values by block number. See {Votes} as an example.\\n *\\n * To create a history of checkpoints define a variable type `Checkpoints.History` in your contract, and store a new\\n * checkpoint for the current transaction block using the {push} function.\\n *\\n * _Available since v4.5._\\n */\\nlibrary Checkpoints {\\n    struct Checkpoint {\\n        uint32 _blockNumber;\\n        uint224 _value;\\n    }\\n\\n    struct History {\\n        Checkpoint[] _checkpoints;\\n    }\\n\\n    /**\\n     * @dev Returns the value in the latest checkpoint, or zero if there are no checkpoints.\\n     */\\n    function latest(History storage self) internal view returns (uint256) {\\n        uint256 pos = self._checkpoints.length;\\n        return pos == 0 ? 0 : self._checkpoints[pos - 1]._value;\\n    }\\n\\n    /**\\n     * @dev Returns the value at a given block number. If a checkpoint is not available at that block, the closest one\\n     * before it is returned, or zero otherwise.\\n     */\\n    function getAtBlock(History storage self, uint256 blockNumber) internal view returns (uint256) {\\n        require(blockNumber < block.number, \\"Checkpoints: block not yet mined\\");\\n\\n        uint256 high = self._checkpoints.length;\\n        uint256 low = 0;\\n        while (low < high) {\\n            uint256 mid = Math.average(low, high);\\n            if (self._checkpoints[mid]._blockNumber > blockNumber) {\\n                high = mid;\\n            } else {\\n                low = mid + 1;\\n            }\\n        }\\n        return high == 0 ? 0 : self._checkpoints[high - 1]._value;\\n    }\\n\\n    /**\\n     * @dev Pushes a value onto a History so that it is stored as the checkpoint for the current block.\\n     *\\n     * Returns previous value and new value.\\n     */\\n    function push(History storage self, uint256 value) internal returns (uint256, uint256) {\\n        uint256 pos = self._checkpoints.length;\\n        uint256 old = latest(self);\\n        if (pos > 0 && self._checkpoints[pos - 1]._blockNumber == block.number) {\\n            self._checkpoints[pos - 1]._value = SafeCast.toUint224(value);\\n        } else {\\n            self._checkpoints.push(\\n                Checkpoint({_blockNumber: SafeCast.toUint32(block.number), _value: SafeCast.toUint224(value)})\\n            );\\n        }\\n        return (old, value);\\n    }\\n\\n    /**\\n     * @dev Pushes a value onto a History, by updating the latest value using binary operation `op`. The new value will\\n     * be set to `op(latest, delta)`.\\n     *\\n     * Returns previous value and new value.\\n     */\\n    function push(\\n        History storage self,\\n        function(uint256, uint256) view returns (uint256) op,\\n        uint256 delta\\n    ) internal returns (uint256, uint256) {\\n        return push(self, op(latest(self), delta));\\n    }\\n}\\n","keccak256":"0x24d6e2b60f45018f2ae12f9460ff757ca337d2d2ee58eb6c93db292d19035775","license":"MIT"},"@openzeppelin/contracts/utils/Context.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Provides information about the current execution context, including the\\n * sender of the transaction and its data. While these are generally available\\n * via msg.sender and msg.data, they should not be accessed in such a direct\\n * manner, since when dealing with meta-transactions the account sending and\\n * paying for execution may not be the actual sender (as far as an application\\n * is concerned).\\n *\\n * This contract is only required for intermediate, library-like contracts.\\n */\\nabstract contract Context {\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n}\\n","keccak256":"0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7","license":"MIT"},"@openzeppelin/contracts/utils/Counters.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/Counters.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @title Counters\\n * @author Matt Condon (@shrugs)\\n * @dev Provides counters that can only be incremented, decremented or reset. This can be used e.g. to track the number\\n * of elements in a mapping, issuing ERC721 ids, or counting request ids.\\n *\\n * Include with `using Counters for Counters.Counter;`\\n */\\nlibrary Counters {\\n    struct Counter {\\n        // This variable should never be directly accessed by users of the library: interactions must be restricted to\\n        // the library\'s function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add\\n        // this feature: see https://github.com/ethereum/solidity/issues/4637\\n        uint256 _value; // default: 0\\n    }\\n\\n    function current(Counter storage counter) internal view returns (uint256) {\\n        return counter._value;\\n    }\\n\\n    function increment(Counter storage counter) internal {\\n        unchecked {\\n            counter._value += 1;\\n        }\\n    }\\n\\n    function decrement(Counter storage counter) internal {\\n        uint256 value = counter._value;\\n        require(value > 0, \\"Counter: decrement overflow\\");\\n        unchecked {\\n            counter._value = value - 1;\\n        }\\n    }\\n\\n    function reset(Counter storage counter) internal {\\n        counter._value = 0;\\n    }\\n}\\n","keccak256":"0xf0018c2440fbe238dd3a8732fa8e17a0f9dce84d31451dc8a32f6d62b349c9f1","license":"MIT"},"@openzeppelin/contracts/utils/Strings.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/Strings.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev String operations.\\n */\\nlibrary Strings {\\n    bytes16 private constant _HEX_SYMBOLS = \\"0123456789abcdef\\";\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` decimal representation.\\n     */\\n    function toString(uint256 value) internal pure returns (string memory) {\\n        // Inspired by OraclizeAPI\'s implementation - MIT licence\\n        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol\\n\\n        if (value == 0) {\\n            return \\"0\\";\\n        }\\n        uint256 temp = value;\\n        uint256 digits;\\n        while (temp != 0) {\\n            digits++;\\n            temp /= 10;\\n        }\\n        bytes memory buffer = new bytes(digits);\\n        while (value != 0) {\\n            digits -= 1;\\n            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));\\n            value /= 10;\\n        }\\n        return string(buffer);\\n    }\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.\\n     */\\n    function toHexString(uint256 value) internal pure returns (string memory) {\\n        if (value == 0) {\\n            return \\"0x00\\";\\n        }\\n        uint256 temp = value;\\n        uint256 length = 0;\\n        while (temp != 0) {\\n            length++;\\n            temp >>= 8;\\n        }\\n        return toHexString(value, length);\\n    }\\n\\n    /**\\n     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.\\n     */\\n    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {\\n        bytes memory buffer = new bytes(2 * length + 2);\\n        buffer[0] = \\"0\\";\\n        buffer[1] = \\"x\\";\\n        for (uint256 i = 2 * length + 1; i > 1; --i) {\\n            buffer[i] = _HEX_SYMBOLS[value & 0xf];\\n            value >>= 4;\\n        }\\n        require(value == 0, \\"Strings: hex length insufficient\\");\\n        return string(buffer);\\n    }\\n}\\n","keccak256":"0x32c202bd28995dd20c4347b7c6467a6d3241c74c8ad3edcbb610cd9205916c45","license":"MIT"},"@openzeppelin/contracts/utils/cryptography/ECDSA.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (utils/cryptography/ECDSA.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"../Strings.sol\\";\\n\\n/**\\n * @dev Elliptic Curve Digital Signature Algorithm (ECDSA) operations.\\n *\\n * These functions can be used to verify that a message was signed by the holder\\n * of the private keys of a given address.\\n */\\nlibrary ECDSA {\\n    enum RecoverError {\\n        NoError,\\n        InvalidSignature,\\n        InvalidSignatureLength,\\n        InvalidSignatureS,\\n        InvalidSignatureV\\n    }\\n\\n    function _throwError(RecoverError error) private pure {\\n        if (error == RecoverError.NoError) {\\n            return; // no error: do nothing\\n        } else if (error == RecoverError.InvalidSignature) {\\n            revert(\\"ECDSA: invalid signature\\");\\n        } else if (error == RecoverError.InvalidSignatureLength) {\\n            revert(\\"ECDSA: invalid signature length\\");\\n        } else if (error == RecoverError.InvalidSignatureS) {\\n            revert(\\"ECDSA: invalid signature \'s\' value\\");\\n        } else if (error == RecoverError.InvalidSignatureV) {\\n            revert(\\"ECDSA: invalid signature \'v\' value\\");\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the address that signed a hashed message (`hash`) with\\n     * `signature` or error string. This address can then be used for verification purposes.\\n     *\\n     * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:\\n     * this function rejects them by requiring the `s` value to be in the lower\\n     * half order, and the `v` value to be either 27 or 28.\\n     *\\n     * IMPORTANT: `hash` _must_ be the result of a hash operation for the\\n     * verification to be secure: it is possible to craft signatures that\\n     * recover to arbitrary addresses for non-hashed data. A safe way to ensure\\n     * this is by receiving a hash of the original message (which may otherwise\\n     * be too long), and then calling {toEthSignedMessageHash} on it.\\n     *\\n     * Documentation for signature generation:\\n     * - with https://web3js.readthedocs.io/en/v1.3.4/web3-eth-accounts.html#sign[Web3.js]\\n     * - with https://docs.ethers.io/v5/api/signer/#Signer-signMessage[ethers]\\n     *\\n     * _Available since v4.3._\\n     */\\n    function tryRecover(bytes32 hash, bytes memory signature) internal pure returns (address, RecoverError) {\\n        // Check the signature length\\n        // - case 65: r,s,v signature (standard)\\n        // - case 64: r,vs signature (cf https://eips.ethereum.org/EIPS/eip-2098) _Available since v4.1._\\n        if (signature.length == 65) {\\n            bytes32 r;\\n            bytes32 s;\\n            uint8 v;\\n            // ecrecover takes the signature parameters, and the only way to get them\\n            // currently is to use assembly.\\n            assembly {\\n                r := mload(add(signature, 0x20))\\n                s := mload(add(signature, 0x40))\\n                v := byte(0, mload(add(signature, 0x60)))\\n            }\\n            return tryRecover(hash, v, r, s);\\n        } else if (signature.length == 64) {\\n            bytes32 r;\\n            bytes32 vs;\\n            // ecrecover takes the signature parameters, and the only way to get them\\n            // currently is to use assembly.\\n            assembly {\\n                r := mload(add(signature, 0x20))\\n                vs := mload(add(signature, 0x40))\\n            }\\n            return tryRecover(hash, r, vs);\\n        } else {\\n            return (address(0), RecoverError.InvalidSignatureLength);\\n        }\\n    }\\n\\n    /**\\n     * @dev Returns the address that signed a hashed message (`hash`) with\\n     * `signature`. This address can then be used for verification purposes.\\n     *\\n     * The `ecrecover` EVM opcode allows for malleable (non-unique) signatures:\\n     * this function rejects them by requiring the `s` value to be in the lower\\n     * half order, and the `v` value to be either 27 or 28.\\n     *\\n     * IMPORTANT: `hash` _must_ be the result of a hash operation for the\\n     * verification to be secure: it is possible to craft signatures that\\n     * recover to arbitrary addresses for non-hashed data. A safe way to ensure\\n     * this is by receiving a hash of the original message (which may otherwise\\n     * be too long), and then calling {toEthSignedMessageHash} on it.\\n     */\\n    function recover(bytes32 hash, bytes memory signature) internal pure returns (address) {\\n        (address recovered, RecoverError error) = tryRecover(hash, signature);\\n        _throwError(error);\\n        return recovered;\\n    }\\n\\n    /**\\n     * @dev Overload of {ECDSA-tryRecover} that receives the `r` and `vs` short-signature fields separately.\\n     *\\n     * See https://eips.ethereum.org/EIPS/eip-2098[EIP-2098 short signatures]\\n     *\\n     * _Available since v4.3._\\n     */\\n    function tryRecover(\\n        bytes32 hash,\\n        bytes32 r,\\n        bytes32 vs\\n    ) internal pure returns (address, RecoverError) {\\n        bytes32 s = vs & bytes32(0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);\\n        uint8 v = uint8((uint256(vs) >> 255) + 27);\\n        return tryRecover(hash, v, r, s);\\n    }\\n\\n    /**\\n     * @dev Overload of {ECDSA-recover} that receives the `r and `vs` short-signature fields separately.\\n     *\\n     * _Available since v4.2._\\n     */\\n    function recover(\\n        bytes32 hash,\\n        bytes32 r,\\n        bytes32 vs\\n    ) internal pure returns (address) {\\n        (address recovered, RecoverError error) = tryRecover(hash, r, vs);\\n        _throwError(error);\\n        return recovered;\\n    }\\n\\n    /**\\n     * @dev Overload of {ECDSA-tryRecover} that receives the `v`,\\n     * `r` and `s` signature fields separately.\\n     *\\n     * _Available since v4.3._\\n     */\\n    function tryRecover(\\n        bytes32 hash,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) internal pure returns (address, RecoverError) {\\n        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature\\n        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines\\n        // the valid range for s in (301): 0 < s < secp256k1n \\u00f7 2 + 1, and for v in (302): v \\u2208 {27, 28}. Most\\n        // signatures from current libraries generate a unique signature with an s-value in the lower half order.\\n        //\\n        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value\\n        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or\\n        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept\\n        // these malleable signatures as well.\\n        if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {\\n            return (address(0), RecoverError.InvalidSignatureS);\\n        }\\n        if (v != 27 && v != 28) {\\n            return (address(0), RecoverError.InvalidSignatureV);\\n        }\\n\\n        // If the signature is valid (and not malleable), return the signer address\\n        address signer = ecrecover(hash, v, r, s);\\n        if (signer == address(0)) {\\n            return (address(0), RecoverError.InvalidSignature);\\n        }\\n\\n        return (signer, RecoverError.NoError);\\n    }\\n\\n    /**\\n     * @dev Overload of {ECDSA-recover} that receives the `v`,\\n     * `r` and `s` signature fields separately.\\n     */\\n    function recover(\\n        bytes32 hash,\\n        uint8 v,\\n        bytes32 r,\\n        bytes32 s\\n    ) internal pure returns (address) {\\n        (address recovered, RecoverError error) = tryRecover(hash, v, r, s);\\n        _throwError(error);\\n        return recovered;\\n    }\\n\\n    /**\\n     * @dev Returns an Ethereum Signed Message, created from a `hash`. This\\n     * produces hash corresponding to the one signed with the\\n     * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]\\n     * JSON-RPC method as part of EIP-191.\\n     *\\n     * See {recover}.\\n     */\\n    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {\\n        // 32 is the length in bytes of hash,\\n        // enforced by the type signature above\\n        return keccak256(abi.encodePacked(\\"\\\\x19Ethereum Signed Message:\\\\n32\\", hash));\\n    }\\n\\n    /**\\n     * @dev Returns an Ethereum Signed Message, created from `s`. This\\n     * produces hash corresponding to the one signed with the\\n     * https://eth.wiki/json-rpc/API#eth_sign[`eth_sign`]\\n     * JSON-RPC method as part of EIP-191.\\n     *\\n     * See {recover}.\\n     */\\n    function toEthSignedMessageHash(bytes memory s) internal pure returns (bytes32) {\\n        return keccak256(abi.encodePacked(\\"\\\\x19Ethereum Signed Message:\\\\n\\", Strings.toString(s.length), s));\\n    }\\n\\n    /**\\n     * @dev Returns an Ethereum Signed Typed Data, created from a\\n     * `domainSeparator` and a `structHash`. This produces hash corresponding\\n     * to the one signed with the\\n     * https://eips.ethereum.org/EIPS/eip-712[`eth_signTypedData`]\\n     * JSON-RPC method as part of EIP-712.\\n     *\\n     * See {recover}.\\n     */\\n    function toTypedDataHash(bytes32 domainSeparator, bytes32 structHash) internal pure returns (bytes32) {\\n        return keccak256(abi.encodePacked(\\"\\\\x19\\\\x01\\", domainSeparator, structHash));\\n    }\\n}\\n","keccak256":"0xcc3242e2da994240b4abb0c6c4cf9e2925eec55583e583cfb141d16002c13d7b","license":"MIT"},"@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/cryptography/draft-EIP712.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"./ECDSA.sol\\";\\n\\n/**\\n * @dev https://eips.ethereum.org/EIPS/eip-712[EIP 712] is a standard for hashing and signing of typed structured data.\\n *\\n * The encoding specified in the EIP is very generic, and such a generic implementation in Solidity is not feasible,\\n * thus this contract does not implement the encoding itself. Protocols need to implement the type-specific encoding\\n * they need in their contracts using a combination of `abi.encode` and `keccak256`.\\n *\\n * This contract implements the EIP 712 domain separator ({_domainSeparatorV4}) that is used as part of the encoding\\n * scheme, and the final step of the encoding to obtain the message digest that is then signed via ECDSA\\n * ({_hashTypedDataV4}).\\n *\\n * The implementation of the domain separator was designed to be as efficient as possible while still properly updating\\n * the chain id to protect against replay attacks on an eventual fork of the chain.\\n *\\n * NOTE: This contract implements the version of the encoding known as \\"v4\\", as implemented by the JSON RPC method\\n * https://docs.metamask.io/guide/signing-data.html[`eth_signTypedDataV4` in MetaMask].\\n *\\n * _Available since v3.4._\\n */\\nabstract contract EIP712 {\\n    /* solhint-disable var-name-mixedcase */\\n    // Cache the domain separator as an immutable value, but also store the chain id that it corresponds to, in order to\\n    // invalidate the cached domain separator if the chain id changes.\\n    bytes32 private immutable _CACHED_DOMAIN_SEPARATOR;\\n    uint256 private immutable _CACHED_CHAIN_ID;\\n    address private immutable _CACHED_THIS;\\n\\n    bytes32 private immutable _HASHED_NAME;\\n    bytes32 private immutable _HASHED_VERSION;\\n    bytes32 private immutable _TYPE_HASH;\\n\\n    /* solhint-enable var-name-mixedcase */\\n\\n    /**\\n     * @dev Initializes the domain separator and parameter caches.\\n     *\\n     * The meaning of `name` and `version` is specified in\\n     * https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator[EIP 712]:\\n     *\\n     * - `name`: the user readable name of the signing domain, i.e. the name of the DApp or the protocol.\\n     * - `version`: the current major version of the signing domain.\\n     *\\n     * NOTE: These parameters cannot be changed except through a xref:learn::upgrading-smart-contracts.adoc[smart\\n     * contract upgrade].\\n     */\\n    constructor(string memory name, string memory version) {\\n        bytes32 hashedName = keccak256(bytes(name));\\n        bytes32 hashedVersion = keccak256(bytes(version));\\n        bytes32 typeHash = keccak256(\\n            \\"EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)\\"\\n        );\\n        _HASHED_NAME = hashedName;\\n        _HASHED_VERSION = hashedVersion;\\n        _CACHED_CHAIN_ID = block.chainid;\\n        _CACHED_DOMAIN_SEPARATOR = _buildDomainSeparator(typeHash, hashedName, hashedVersion);\\n        _CACHED_THIS = address(this);\\n        _TYPE_HASH = typeHash;\\n    }\\n\\n    /**\\n     * @dev Returns the domain separator for the current chain.\\n     */\\n    function _domainSeparatorV4() internal view returns (bytes32) {\\n        if (address(this) == _CACHED_THIS && block.chainid == _CACHED_CHAIN_ID) {\\n            return _CACHED_DOMAIN_SEPARATOR;\\n        } else {\\n            return _buildDomainSeparator(_TYPE_HASH, _HASHED_NAME, _HASHED_VERSION);\\n        }\\n    }\\n\\n    function _buildDomainSeparator(\\n        bytes32 typeHash,\\n        bytes32 nameHash,\\n        bytes32 versionHash\\n    ) private view returns (bytes32) {\\n        return keccak256(abi.encode(typeHash, nameHash, versionHash, block.chainid, address(this)));\\n    }\\n\\n    /**\\n     * @dev Given an already https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct[hashed struct], this\\n     * function returns the hash of the fully encoded EIP712 message for this domain.\\n     *\\n     * This hash can be used together with {ECDSA-recover} to obtain the signer of a message. For example:\\n     *\\n     * ```solidity\\n     * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(\\n     *     keccak256(\\"Mail(address to,string contents)\\"),\\n     *     mailTo,\\n     *     keccak256(bytes(mailContents))\\n     * )));\\n     * address signer = ECDSA.recover(digest, signature);\\n     * ```\\n     */\\n    function _hashTypedDataV4(bytes32 structHash) internal view virtual returns (bytes32) {\\n        return ECDSA.toTypedDataHash(_domainSeparatorV4(), structHash);\\n    }\\n}\\n","keccak256":"0x6688fad58b9ec0286d40fa957152e575d5d8bd4c3aa80985efdb11b44f776ae7","license":"MIT"},"@openzeppelin/contracts/utils/introspection/ERC165.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC165.sol)\\n\\npragma solidity ^0.8.0;\\n\\nimport \\"./IERC165.sol\\";\\n\\n/**\\n * @dev Implementation of the {IERC165} interface.\\n *\\n * Contracts that want to implement ERC165 should inherit from this contract and override {supportsInterface} to check\\n * for the additional interface id that will be supported. For example:\\n *\\n * ```solidity\\n * function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\\n *     return interfaceId == type(MyInterface).interfaceId || super.supportsInterface(interfaceId);\\n * }\\n * ```\\n *\\n * Alternatively, {ERC165Storage} provides an easier to use but more expensive implementation.\\n */\\nabstract contract ERC165 is IERC165 {\\n    /**\\n     * @dev See {IERC165-supportsInterface}.\\n     */\\n    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {\\n        return interfaceId == type(IERC165).interfaceId;\\n    }\\n}\\n","keccak256":"0xd10975de010d89fd1c78dc5e8a9a7e7f496198085c151648f20cba166b32582b","license":"MIT"},"@openzeppelin/contracts/utils/introspection/IERC165.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/introspection/IERC165.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Interface of the ERC165 standard, as defined in the\\n * https://eips.ethereum.org/EIPS/eip-165[EIP].\\n *\\n * Implementers can declare support of contract interfaces, which can then be\\n * queried by others ({ERC165Checker}).\\n *\\n * For an implementation, see {ERC165}.\\n */\\ninterface IERC165 {\\n    /**\\n     * @dev Returns true if this contract implements the interface defined by\\n     * `interfaceId`. See the corresponding\\n     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]\\n     * to learn more about how these ids are created.\\n     *\\n     * This function call must use less than 30 000 gas.\\n     */\\n    function supportsInterface(bytes4 interfaceId) external view returns (bool);\\n}\\n","keccak256":"0x447a5f3ddc18419d41ff92b3773fb86471b1db25773e07f877f548918a185bf1","license":"MIT"},"@openzeppelin/contracts/utils/math/Math.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts (last updated v4.5.0-rc.0) (utils/math/Math.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Standard math utilities missing in the Solidity language.\\n */\\nlibrary Math {\\n    /**\\n     * @dev Returns the largest of two numbers.\\n     */\\n    function max(uint256 a, uint256 b) internal pure returns (uint256) {\\n        return a >= b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the smallest of two numbers.\\n     */\\n    function min(uint256 a, uint256 b) internal pure returns (uint256) {\\n        return a < b ? a : b;\\n    }\\n\\n    /**\\n     * @dev Returns the average of two numbers. The result is rounded towards\\n     * zero.\\n     */\\n    function average(uint256 a, uint256 b) internal pure returns (uint256) {\\n        // (a + b) / 2 can overflow.\\n        return (a & b) + (a ^ b) / 2;\\n    }\\n\\n    /**\\n     * @dev Returns the ceiling of the division of two numbers.\\n     *\\n     * This differs from standard division with `/` in that it rounds up instead\\n     * of rounding down.\\n     */\\n    function ceilDiv(uint256 a, uint256 b) internal pure returns (uint256) {\\n        // (a + b - 1) / b can overflow on addition, so we distribute.\\n        return a / b + (a % b == 0 ? 0 : 1);\\n    }\\n\\n    /**\\n     * @dev Returns the absolute unsigned value of a signed value.\\n     */\\n    function abs(int256 n) internal pure returns (uint256) {\\n        unchecked {\\n            // must be unchecked in order to support `n = type(int256).min`\\n            return uint256(n >= 0 ? n : -n);\\n        }\\n    }\\n}\\n","keccak256":"0xfd72a0ff0d22c0868fdfa802257bc1c11895f5ad9f43bc1558010ffc03d3824b","license":"MIT"},"@openzeppelin/contracts/utils/math/SafeCast.sol":{"content":"// SPDX-License-Identifier: MIT\\n// OpenZeppelin Contracts v4.4.1 (utils/math/SafeCast.sol)\\n\\npragma solidity ^0.8.0;\\n\\n/**\\n * @dev Wrappers over Solidity\'s uintXX/intXX casting operators with added overflow\\n * checks.\\n *\\n * Downcasting from uint256/int256 in Solidity does not revert on overflow. This can\\n * easily result in undesired exploitation or bugs, since developers usually\\n * assume that overflows raise errors. `SafeCast` restores this intuition by\\n * reverting the transaction when such an operation overflows.\\n *\\n * Using this library instead of the unchecked operations eliminates an entire\\n * class of bugs, so it\'s recommended to use it always.\\n *\\n * Can be combined with {SafeMath} and {SignedSafeMath} to extend it to smaller types, by performing\\n * all math on `uint256` and `int256` and then downcasting.\\n */\\nlibrary SafeCast {\\n    /**\\n     * @dev Returns the downcasted uint224 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint224).\\n     *\\n     * Counterpart to Solidity\'s `uint224` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 224 bits\\n     */\\n    function toUint224(uint256 value) internal pure returns (uint224) {\\n        require(value <= type(uint224).max, \\"SafeCast: value doesn\'t fit in 224 bits\\");\\n        return uint224(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint128 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint128).\\n     *\\n     * Counterpart to Solidity\'s `uint128` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 128 bits\\n     */\\n    function toUint128(uint256 value) internal pure returns (uint128) {\\n        require(value <= type(uint128).max, \\"SafeCast: value doesn\'t fit in 128 bits\\");\\n        return uint128(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint96 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint96).\\n     *\\n     * Counterpart to Solidity\'s `uint96` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 96 bits\\n     */\\n    function toUint96(uint256 value) internal pure returns (uint96) {\\n        require(value <= type(uint96).max, \\"SafeCast: value doesn\'t fit in 96 bits\\");\\n        return uint96(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint64 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint64).\\n     *\\n     * Counterpart to Solidity\'s `uint64` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 64 bits\\n     */\\n    function toUint64(uint256 value) internal pure returns (uint64) {\\n        require(value <= type(uint64).max, \\"SafeCast: value doesn\'t fit in 64 bits\\");\\n        return uint64(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint32 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint32).\\n     *\\n     * Counterpart to Solidity\'s `uint32` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 32 bits\\n     */\\n    function toUint32(uint256 value) internal pure returns (uint32) {\\n        require(value <= type(uint32).max, \\"SafeCast: value doesn\'t fit in 32 bits\\");\\n        return uint32(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint16 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint16).\\n     *\\n     * Counterpart to Solidity\'s `uint16` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 16 bits\\n     */\\n    function toUint16(uint256 value) internal pure returns (uint16) {\\n        require(value <= type(uint16).max, \\"SafeCast: value doesn\'t fit in 16 bits\\");\\n        return uint16(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted uint8 from uint256, reverting on\\n     * overflow (when the input is greater than largest uint8).\\n     *\\n     * Counterpart to Solidity\'s `uint8` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 8 bits.\\n     */\\n    function toUint8(uint256 value) internal pure returns (uint8) {\\n        require(value <= type(uint8).max, \\"SafeCast: value doesn\'t fit in 8 bits\\");\\n        return uint8(value);\\n    }\\n\\n    /**\\n     * @dev Converts a signed int256 into an unsigned uint256.\\n     *\\n     * Requirements:\\n     *\\n     * - input must be greater than or equal to 0.\\n     */\\n    function toUint256(int256 value) internal pure returns (uint256) {\\n        require(value >= 0, \\"SafeCast: value must be positive\\");\\n        return uint256(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted int128 from int256, reverting on\\n     * overflow (when the input is less than smallest int128 or\\n     * greater than largest int128).\\n     *\\n     * Counterpart to Solidity\'s `int128` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 128 bits\\n     *\\n     * _Available since v3.1._\\n     */\\n    function toInt128(int256 value) internal pure returns (int128) {\\n        require(value >= type(int128).min && value <= type(int128).max, \\"SafeCast: value doesn\'t fit in 128 bits\\");\\n        return int128(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted int64 from int256, reverting on\\n     * overflow (when the input is less than smallest int64 or\\n     * greater than largest int64).\\n     *\\n     * Counterpart to Solidity\'s `int64` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 64 bits\\n     *\\n     * _Available since v3.1._\\n     */\\n    function toInt64(int256 value) internal pure returns (int64) {\\n        require(value >= type(int64).min && value <= type(int64).max, \\"SafeCast: value doesn\'t fit in 64 bits\\");\\n        return int64(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted int32 from int256, reverting on\\n     * overflow (when the input is less than smallest int32 or\\n     * greater than largest int32).\\n     *\\n     * Counterpart to Solidity\'s `int32` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 32 bits\\n     *\\n     * _Available since v3.1._\\n     */\\n    function toInt32(int256 value) internal pure returns (int32) {\\n        require(value >= type(int32).min && value <= type(int32).max, \\"SafeCast: value doesn\'t fit in 32 bits\\");\\n        return int32(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted int16 from int256, reverting on\\n     * overflow (when the input is less than smallest int16 or\\n     * greater than largest int16).\\n     *\\n     * Counterpart to Solidity\'s `int16` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 16 bits\\n     *\\n     * _Available since v3.1._\\n     */\\n    function toInt16(int256 value) internal pure returns (int16) {\\n        require(value >= type(int16).min && value <= type(int16).max, \\"SafeCast: value doesn\'t fit in 16 bits\\");\\n        return int16(value);\\n    }\\n\\n    /**\\n     * @dev Returns the downcasted int8 from int256, reverting on\\n     * overflow (when the input is less than smallest int8 or\\n     * greater than largest int8).\\n     *\\n     * Counterpart to Solidity\'s `int8` operator.\\n     *\\n     * Requirements:\\n     *\\n     * - input must fit into 8 bits.\\n     *\\n     * _Available since v3.1._\\n     */\\n    function toInt8(int256 value) internal pure returns (int8) {\\n        require(value >= type(int8).min && value <= type(int8).max, \\"SafeCast: value doesn\'t fit in 8 bits\\");\\n        return int8(value);\\n    }\\n\\n    /**\\n     * @dev Converts an unsigned uint256 into a signed int256.\\n     *\\n     * Requirements:\\n     *\\n     * - input must be less than or equal to maxInt256.\\n     */\\n    function toInt256(uint256 value) internal pure returns (int256) {\\n        // Note: Unsafe cast below is okay because `type(int256).max` is guaranteed to be positive\\n        require(value <= uint256(type(int256).max), \\"SafeCast: value doesn\'t fit in an int256\\");\\n        return int256(value);\\n    }\\n}\\n","keccak256":"0x5c6caab697d302ad7eb59c234a4d2dbc965c1bae87709bd2850060b7695b28c7","license":"MIT"},"contracts/JBProjects.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'@openzeppelin/contracts/access/Ownable.sol\';\\nimport \'@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol\';\\nimport \'./abstract/JBOperatable.sol\';\\nimport \'./interfaces/IJBProjects.sol\';\\nimport \'./libraries/JBOperations.sol\';\\n\\n/** \\n  @notice \\n  Stores project ownership and metadata.\\n\\n  @dev\\n  Projects are represented as ERC-721\'s.\\n\\n  @dev\\n  Adheres to -\\n  IJBProjects: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.\\n\\n  @dev\\n  Inherits from -\\n  JBOperatable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions.\\n  ERC721Votes: A checkpointable standard definition for non-fungible tokens (NFTs).\\n  Ownable: Includes convenience functionality for checking a message sender\'s permissions before executing certain transactions.\\n*/\\ncontract JBProjects is IJBProjects, JBOperatable, ERC721Votes, Ownable {\\n  //*********************************************************************//\\n  // --------------------- public stored properties -------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    The number of projects that have been created using this contract.\\n\\n    @dev\\n    The count is incremented with each new project created. \\n    The resulting ERC-721 token ID for each project is the newly incremented count value.\\n  */\\n  uint256 public override count = 0;\\n\\n  /** \\n    @notice \\n    The metadata for each project, which can be used across several domains.\\n\\n    _projectId The ID of the project to which the metadata belongs.\\n    _domain The domain within which the metadata applies. Applications can use the domain namespace as they wish.\\n  */\\n  mapping(uint256 => mapping(uint256 => string)) public override metadataContentOf;\\n\\n  /**\\n    @notice\\n    The contract resolving each project ID to its ERC721 URI.\\n  */\\n  IJBTokenUriResolver public override tokenUriResolver;\\n\\n  //*********************************************************************//\\n  // -------------------------- public views --------------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    Returns the URI where the ERC-721 standard JSON of a project is hosted.\\n\\n    @param _projectId The ID of the project to get a URI of.\\n\\n    @return The token URI to use for the provided `_projectId`.\\n  */\\n  function tokenURI(uint256 _projectId) public view override returns (string memory) {\\n    // If there\'s no resolver, there\'s no URI.\\n    if (tokenUriResolver == IJBTokenUriResolver(address(0))) return \'\';\\n\\n    // Return the resolved URI.\\n    return tokenUriResolver.getUri(_projectId);\\n  }\\n\\n  /**\\n    @notice\\n    Indicates if this contract adheres to the specified interface.\\n\\n    @dev \\n    See {IERC165-supportsInterface}.\\n\\n    @param _interfaceId The ID of the interface to check for adherance to.\\n  */\\n  function supportsInterface(bytes4 _interfaceId)\\n    public\\n    view\\n    virtual\\n    override(IERC165, ERC721)\\n    returns (bool)\\n  {\\n    return\\n      _interfaceId == type(IJBProjects).interfaceId ||\\n      _interfaceId == type(IJBOperatable).interfaceId ||\\n      super.supportsInterface(_interfaceId);\\n  }\\n\\n  //*********************************************************************//\\n  // -------------------------- constructor ---------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @param _operatorStore A contract storing operator assignments.\\n  */\\n  constructor(IJBOperatorStore _operatorStore)\\n    ERC721(\'Juicebox Projects\', \'JUICEBOX\')\\n    EIP712(\'Juicebox Projects\', \'1\')\\n    JBOperatable(_operatorStore)\\n  // solhint-disable-next-line no-empty-blocks\\n  {\\n\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------------- external transactions ---------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice \\n    Create a new project for the specified owner, which mints an NFT (ERC-721) into their wallet.\\n\\n    @dev \\n    Anyone can create a project on an owner\'s behalf.\\n\\n    @param _owner The address that will be the owner of the project.\\n    @param _metadata A struct containing metadata content about the project, and domain within which the metadata applies.\\n\\n    @return projectId The token ID of the newly created project.\\n  */\\n  function createFor(address _owner, JBProjectMetadata calldata _metadata)\\n    external\\n    override\\n    returns (uint256 projectId)\\n  {\\n    // Increment the count, which will be used as the ID.\\n    projectId = ++count;\\n\\n    // Mint the project.\\n    _safeMint(_owner, projectId);\\n\\n    // Set the metadata if one was provided.\\n    if (bytes(_metadata.content).length > 0)\\n      metadataContentOf[projectId][_metadata.domain] = _metadata.content;\\n\\n    emit Create(projectId, _owner, _metadata, msg.sender);\\n  }\\n\\n  /**\\n    @notice \\n    Allows a project owner to set the project\'s metadata content for a particular domain namespace. \\n\\n    @dev \\n    Only a project\'s owner or operator can set its metadata.\\n\\n    @dev \\n    Applications can use the domain namespace as they wish.\\n\\n    @param _projectId The ID of the project who\'s metadata is being changed.\\n    @param _metadata A struct containing metadata content, and domain within which the metadata applies. \\n  */\\n  function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata)\\n    external\\n    override\\n    requirePermission(ownerOf(_projectId), _projectId, JBOperations.SET_METADATA)\\n  {\\n    // Set the project\'s new metadata content within the specified domain.\\n    metadataContentOf[_projectId][_metadata.domain] = _metadata.content;\\n\\n    emit SetMetadata(_projectId, _metadata, msg.sender);\\n  }\\n\\n  /**\\n    @notice \\n    Sets the address of the resolver used to retrieve the tokenURI of projects.\\n\\n    @param _newResolver The address of the new resolver.\\n  */\\n  function setTokenUriResolver(IJBTokenUriResolver _newResolver) external override onlyOwner {\\n    // Store the new resolver.\\n    tokenUriResolver = _newResolver;\\n\\n    emit SetTokenUriResolver(_newResolver, msg.sender);\\n  }\\n}\\n","keccak256":"0x20c5eb394b7fc148dfce35ddea57d5db0751deee84e7486d7c657e0aebc41f19","license":"MIT"},"contracts/abstract/JBOperatable.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./../interfaces/IJBOperatable.sol\';\\n\\n/** \\n  @notice\\n  Modifiers to allow access to functions based on the message sender\'s operator status.\\n\\n  @dev\\n  Adheres to -\\n  IJBOperatable: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.\\n*/\\nabstract contract JBOperatable is IJBOperatable {\\n  //*********************************************************************//\\n  // --------------------------- custom errors -------------------------- //\\n  //*********************************************************************//\\n  error UNAUTHORIZED();\\n\\n  //*********************************************************************//\\n  // ---------------------------- modifiers ---------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice\\n    Only allows the speficied account or an operator of the account to proceed. \\n\\n    @param _account The account to check for.\\n    @param _domain The domain namespace to look for an operator within. \\n    @param _permissionIndex The index of the permission to check for. \\n  */\\n  modifier requirePermission(\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex\\n  ) {\\n    _requirePermission(_account, _domain, _permissionIndex);\\n    _;\\n  }\\n\\n  /** \\n    @notice\\n    Only allows the speficied account, an operator of the account to proceed, or a truthy override flag. \\n\\n    @param _account The account to check for.\\n    @param _domain The domain namespace to look for an operator within. \\n    @param _permissionIndex The index of the permission to check for. \\n    @param _override A condition to force allowance for.\\n  */\\n  modifier requirePermissionAllowingOverride(\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex,\\n    bool _override\\n  ) {\\n    _requirePermissionAllowingOverride(_account, _domain, _permissionIndex, _override);\\n    _;\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------- public immutable stored properties --------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    A contract storing operator assignments.\\n  */\\n  IJBOperatorStore public immutable override operatorStore;\\n\\n  //*********************************************************************//\\n  // -------------------------- constructor ---------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @param _operatorStore A contract storing operator assignments.\\n  */\\n  constructor(IJBOperatorStore _operatorStore) {\\n    operatorStore = _operatorStore;\\n  }\\n\\n  //*********************************************************************//\\n  // -------------------------- internal views ------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice\\n    Require the message sender is either the account or has the specified permission.\\n\\n    @param _account The account to allow.\\n    @param _domain The domain namespace within which the permission index will be checked.\\n    @param _permissionIndex The permission index that an operator must have within the specified domain to be allowed.\\n  */\\n  function _requirePermission(\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex\\n  ) internal view {\\n    if (\\n      msg.sender != _account &&\\n      !operatorStore.hasPermission(msg.sender, _account, _domain, _permissionIndex) &&\\n      !operatorStore.hasPermission(msg.sender, _account, 0, _permissionIndex)\\n    ) revert UNAUTHORIZED();\\n  }\\n\\n  /** \\n    @notice\\n    Require the message sender is either the account, has the specified permission, or the override condition is true.\\n\\n    @param _account The account to allow.\\n    @param _domain The domain namespace within which the permission index will be checked.\\n    @param _domain The permission index that an operator must have within the specified domain to be allowed.\\n    @param _override The override condition to allow.\\n  */\\n  function _requirePermissionAllowingOverride(\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex,\\n    bool _override\\n  ) internal view {\\n    if (\\n      !_override &&\\n      msg.sender != _account &&\\n      !operatorStore.hasPermission(msg.sender, _account, _domain, _permissionIndex) &&\\n      !operatorStore.hasPermission(msg.sender, _account, 0, _permissionIndex)\\n    ) revert UNAUTHORIZED();\\n  }\\n}\\n","keccak256":"0x9a5781d40c6b8013249653253369cda2047aa35329a1fcd4dc6353cd2dde30a6","license":"MIT"},"contracts/interfaces/IJBOperatable.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./IJBOperatorStore.sol\';\\n\\ninterface IJBOperatable {\\n  function operatorStore() external view returns (IJBOperatorStore);\\n}\\n","keccak256":"0x150097e253a667d2336367445bea019bb3669ef7c82d358befe1f4cdd480e9aa","license":"MIT"},"contracts/interfaces/IJBOperatorStore.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./../structs/JBOperatorData.sol\';\\n\\ninterface IJBOperatorStore {\\n  event SetOperator(\\n    address indexed operator,\\n    address indexed account,\\n    uint256 indexed domain,\\n    uint256[] permissionIndexes,\\n    uint256 packed\\n  );\\n\\n  function permissionsOf(\\n    address _operator,\\n    address _account,\\n    uint256 _domain\\n  ) external view returns (uint256);\\n\\n  function hasPermission(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex\\n  ) external view returns (bool);\\n\\n  function hasPermissions(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256[] calldata _permissionIndexes\\n  ) external view returns (bool);\\n\\n  function setOperator(JBOperatorData calldata _operatorData) external;\\n\\n  function setOperators(JBOperatorData[] calldata _operatorData) external;\\n}\\n","keccak256":"0x50a26fddc575a50176df7deb9225ec1816b0158c9e9b8555e7921a3261254ed8","license":"MIT"},"contracts/interfaces/IJBProjects.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'@openzeppelin/contracts/token/ERC721/IERC721.sol\';\\nimport \'./../structs/JBProjectMetadata.sol\';\\nimport \'./IJBTokenUriResolver.sol\';\\n\\ninterface IJBProjects is IERC721 {\\n  event Create(\\n    uint256 indexed projectId,\\n    address indexed owner,\\n    JBProjectMetadata metadata,\\n    address caller\\n  );\\n\\n  event SetMetadata(uint256 indexed projectId, JBProjectMetadata metadata, address caller);\\n\\n  event SetTokenUriResolver(IJBTokenUriResolver indexed resolver, address caller);\\n\\n  function count() external view returns (uint256);\\n\\n  function metadataContentOf(uint256 _projectId, uint256 _domain)\\n    external\\n    view\\n    returns (string memory);\\n\\n  function tokenUriResolver() external view returns (IJBTokenUriResolver);\\n\\n  function createFor(address _owner, JBProjectMetadata calldata _metadata)\\n    external\\n    returns (uint256 projectId);\\n\\n  function setMetadataOf(uint256 _projectId, JBProjectMetadata calldata _metadata) external;\\n\\n  function setTokenUriResolver(IJBTokenUriResolver _newResolver) external;\\n}\\n","keccak256":"0x602bad7e8cce6e9d53fe5e3532c5d4428d02206f8df48b246aac7ee8a6dcc98d","license":"MIT"},"contracts/interfaces/IJBTokenUriResolver.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\ninterface IJBTokenUriResolver {\\n  function getUri(uint256 _projectId) external view returns (string memory tokenUri);\\n}\\n","keccak256":"0xa64ece706d7ce399095f403b08383391c089da4995b5ee000b278d93d242a475","license":"MIT"},"contracts/libraries/JBOperations.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nlibrary JBOperations {\\n  uint256 public constant RECONFIGURE = 1;\\n  uint256 public constant REDEEM = 2;\\n  uint256 public constant MIGRATE_CONTROLLER = 3;\\n  uint256 public constant MIGRATE_TERMINAL = 4;\\n  uint256 public constant PROCESS_FEES = 5;\\n  uint256 public constant SET_METADATA = 6;\\n  uint256 public constant ISSUE = 7;\\n  uint256 public constant CHANGE_TOKEN = 8;\\n  uint256 public constant MINT = 9;\\n  uint256 public constant BURN = 10;\\n  uint256 public constant CLAIM = 11;\\n  uint256 public constant TRANSFER = 12;\\n  uint256 public constant REQUIRE_CLAIM = 13;\\n  uint256 public constant SET_CONTROLLER = 14;\\n  uint256 public constant SET_TERMINALS = 15;\\n  uint256 public constant SET_PRIMARY_TERMINAL = 16;\\n  uint256 public constant USE_ALLOWANCE = 17;\\n  uint256 public constant SET_SPLITS = 18;\\n}\\n","keccak256":"0x828971de3d07c31e294c188335e250ee0b28919dd86f0dd570f89b97cca13932","license":"MIT"},"contracts/structs/JBOperatorData.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\n/** \\n  @member operator The address of the operator.\\n  @member domain The domain within which the operator is being given permissions. A domain of 0 is a wildcard domain, which gives an operator access to all domains.\\n  @member permissionIndexes The indexes of the permissions the operator is being given.\\n*/\\nstruct JBOperatorData {\\n  address operator;\\n  uint256 domain;\\n  uint256[] permissionIndexes;\\n}\\n","keccak256":"0xc108ff9bbeef8783e332522b8bd1c17bba071c34051de72dc5bfe38dfd39a3a3","license":"MIT"},"contracts/structs/JBProjectMetadata.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\n/** \\n  @member content The metadata content.\\n  @member domain The domain within which the metadata applies.\\n*/\\nstruct JBProjectMetadata {\\n  string content;\\n  uint256 domain;\\n}\\n","keccak256":"0x5ea56d46d07944aacfe540ee9290f10a70d77b537650a0b28975e2e88fa5b9a4","license":"MIT"}},"version":1}',
	bytecode:
		'0x6101606040526000600b553480156200001757600080fd5b5060405162003451380380620034518339810160408190526200003a916200028a565b6040805180820182526011808252704a75696365626f782050726f6a6563747360781b60208084018290528451808601865260018152603160f81b818301528551808701875293845283820192835285518087019096526008865267094aa92868a849eb60c31b918601919091526001600160601b0319606087901b166080528251939490939091620000d19160009190620001e4565b508051620000e7906001906020840190620001e4565b505082516020938401208251928401929092206101008390526101208190524660c0818152604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8189018190528183019790975260608181019590955260808101939093523060a0808501829052825180860382018152949093019091528251929096019190912090529290921b60e05261014052506200018b3362000192565b50620002f9565b600a80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001f290620002bc565b90600052602060002090601f01602090048101928262000216576000855562000261565b82601f106200023157805160ff191683800117855562000261565b8280016001018555821562000261579182015b828111156200026157825182559160200191906001019062000244565b506200026f92915062000273565b5090565b5b808211156200026f576000815560010162000274565b6000602082840312156200029d57600080fd5b81516001600160a01b0381168114620002b557600080fd5b9392505050565b600181811c90821680620002d157607f821691505b60208210811415620002f357634e487b7160e01b600052602260045260246000fd5b50919050565b60805160601c60a05160c05160e05160601c6101005161012051610140516130e96200036860003960006115d301526000611622015260006115fd0152600061155601526000611580015260006115aa0152600081816103e2015281816116d0015261179f01526130e96000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c8063666d87a01161010f578063a22cb465116100a2578063c87b56dd11610071578063c87b56dd1461042a578063e131fc0c1461043d578063e985e9c514610450578063f2fde38b1461048c57600080fd5b8063a22cb465146103ca578063ad007d63146103dd578063b88d4fde14610404578063c3cda5201461041757600080fd5b80638da5cb5b116100de5780638da5cb5b1461038b5780638e539e8c1461039c57806395d89b41146103af5780639ab24eb0146103b757600080fd5b8063666d87a01461034a57806370a082311461035d578063715018a6146103705780637ecebe001461037857600080fd5b80633644e5151161018757806342842e0e1161015657806342842e0e146102e5578063587cde1e146102f85780635c19a95c146103245780636352211e1461033757600080fd5b80633644e515146102a457806336574975146102ac57806339fbc775146102bf5780633a46b1a8146102d257600080fd5b8063081812fc116101c3578063081812fc1461023e578063095ea7b31461026957806323b872dd1461027e5780632407497e1461029157600080fd5b806301ffc9a7146101ea57806306661abd1461021257806306fdde0314610229575b600080fd5b6101fd6101f8366004612b84565b61049f565b60405190151581526020015b60405180910390f35b61021b600b5481565b604051908152602001610209565b610231610547565b6040516102099190612d09565b61025161024c366004612c35565b6105d9565b6040516001600160a01b039091168152602001610209565b61027c610277366004612ad9565b610684565b005b61027c61028c36600461296b565b6107b6565b61027c61029f366004612915565b61083d565b61021b610903565b61027c6102ba366004612c4e565b610912565b6102316102cd366004612c7f565b61099c565b61021b6102e0366004612ad9565b610a41565b61027c6102f336600461296b565b610a6a565b610251610306366004612915565b6001600160a01b039081166000908152600660205260409020541690565b61027c610332366004612915565b610a85565b610251610345366004612c35565b610a94565b61021b610358366004612a89565b610b1f565b61021b61036b366004612915565b610bd2565b61027c610c6c565b61021b610386366004612915565b610cd2565b600a546001600160a01b0316610251565b61021b6103aa366004612c35565b610cf0565b610231610d4c565b61021b6103c5366004612915565b610d5b565b61027c6103d8366004612a5b565b610d7c565b6102517f000000000000000000000000000000000000000000000000000000000000000081565b61027c6104123660046129ac565b610d87565b61027c610425366004612b05565b610e15565b610231610438366004612c35565b610f4b565b600d54610251906001600160a01b031681565b6101fd61045e366004612932565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61027c61049a366004612915565b61100b565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167faa91a66f00000000000000000000000000000000000000000000000000000000148061053257507fffffffff0000000000000000000000000000000000000000000000000000000082167fad007d6300000000000000000000000000000000000000000000000000000000145b806105415750610541826110ed565b92915050565b60606000805461055690612f1f565b80601f016020809104026020016040519081016040528092919081815260200182805461058290612f1f565b80156105cf5780601f106105a4576101008083540402835291602001916105cf565b820191906000526020600020905b8154815290600101906020018083116105b257829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166106685760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061068f82610a94565b9050806001600160a01b0316836001600160a01b031614156107195760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f7200000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b336001600160a01b03821614806107355750610735813361045e565b6107a75760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161065f565b6107b183836111d0565b505050565b6107c03382611256565b6108325760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161065f565b6107b183838361135e565b600a546001600160a01b031633146108975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b600d80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040513381527fe7784d93cfbfa4408e19577e6cc0436f4dbb51214b70e100905dfce9def88c169060200160405180910390a250565b600061090d611549565b905090565b61091b82610a94565b826006610929838383611670565b6109338480612dcb565b6000878152600c60209081526040808320898301358452909152902061095a929091612855565b50847fd07720acb527321c9d1766f359139d0e0e3551bd99fb3ca353d4f008f3aad8e6853360405161098d929190612d1c565b60405180910390a25050505050565b600c602090815260009283526040808420909152908252902080546109c090612f1f565b80601f01602080910402602001604051908101604052809291908181526020018280546109ec90612f1f565b8015610a395780601f10610a0e57610100808354040283529160200191610a39565b820191906000526020600020905b815481529060010190602001808311610a1c57829003601f168201915b505050505081565b6001600160a01b0382166000908152600760205260408120610a639083611852565b9392505050565b6107b183838360405180602001604052806000815250610d87565b33610a90818361198b565b5050565b6000818152600260205260408120546001600160a01b0316806105415760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e0000000000000000000000000000000000000000000000606482015260840161065f565b6000600b60008154610b3090612f6d565b91829055509050610b418382611a15565b6000610b4d8380612dcb565b90501115610b8857610b5f8280612dcb565b6000838152600c602090815260408083208783013584529091529020610b86929091612855565b505b826001600160a01b0316817fa1c6fd563bcbc3222f6031d7c26ff58cd6c701abff0bfffe652d055ce40629d48433604051610bc4929190612d1c565b60405180910390a392915050565b60006001600160a01b038216610c505760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f206164647265737300000000000000000000000000000000000000000000606482015260840161065f565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b03163314610cc65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b610cd06000611a2f565b565b6001600160a01b038116600090815260096020526040812054610541565b6000438210610d415760405162461bcd60e51b815260206004820152601a60248201527f566f7465733a20626c6f636b206e6f7420796574206d696e6564000000000000604482015260640161065f565b610541600883611852565b60606001805461055690612f1f565b6001600160a01b038116600090815260076020526040812061054190611a99565b610a90338383611b1f565b610d913383611256565b610e035760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161065f565b610e0f84848484611c0c565b50505050565b83421115610e655760405162461bcd60e51b815260206004820152601860248201527f566f7465733a207369676e617475726520657870697265640000000000000000604482015260640161065f565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b038816918101919091526060810186905260808101859052600090610edf90610ed79060a00160405160208183030381529060405280519060200120611c95565b858585611cfe565b9050610eea81611d26565b8614610f385760405162461bcd60e51b815260206004820152601460248201527f566f7465733a20696e76616c6964206e6f6e6365000000000000000000000000604482015260640161065f565b610f42818861198b565b50505050505050565b600d546060906001600160a01b0316610f7257505060408051602081019091526000815290565b600d546040517fda0544aa000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063da0544aa9060240160006040518083038186803b158015610fcf57600080fd5b505afa158015610fe3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105419190810190612bbe565b600a546001600160a01b031633146110655760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b6001600160a01b0381166110e15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161065f565b6110ea81611a2f565b50565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061118057507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061054157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610541565b600081815260046020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b038416908117909155819061121d82610a94565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166112e05760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e0000000000000000000000000000000000000000606482015260840161065f565b60006112eb83610a94565b9050806001600160a01b0316846001600160a01b031614806113265750836001600160a01b031661131b846105d9565b6001600160a01b0316145b8061135657506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661137182610a94565b6001600160a01b0316146113ed5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161065f565b6001600160a01b0382166114685760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161065f565b6114736000826111d0565b6001600160a01b038316600090815260036020526040812080546001929061149c908490612edc565b90915550506001600160a01b03821660009081526003602052604081208054600192906114ca908490612e89565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a46107b1838383611d4e565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156115a257507f000000000000000000000000000000000000000000000000000000000000000046145b156115cc57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b336001600160a01b0384161480159061174c57506040517fc161c93f0000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b03848116602483015260448201849052606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f9060840160206040518083038186803b15801561171257600080fd5b505afa158015611726573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174a9190612b67565b155b801561181b57506040517fc161c93f0000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b03848116602483015260006044830152606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f9060840160206040518083038186803b1580156117e157600080fd5b505afa1580156117f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118199190612b67565b155b156107b1576040517f075fd2b100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60004382106118a35760405162461bcd60e51b815260206004820181905260248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e6564604482015260640161065f565b825460005b818110156119085760006118bc8284611d5a565b9050848660000182815481106118d4576118d4613004565b60009182526020909120015463ffffffff1611156118f457809250611902565b6118ff816001612e89565b91505b506118a8565b8115611961578461191a600184612edc565b8154811061192a5761192a613004565b60009182526020909120015464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16611964565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1695945050505050565b6001600160a01b0382811660008181526006602052604080822080548686167fffffffffffffffffffffffff0000000000000000000000000000000000000000821681179092559151919094169392849290917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a46107b18183611a1086611d75565b611d80565b610a90828260405180602001604052806000815250611eae565b600a80546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80546000908015611af75782611ab0600183612edc565b81548110611ac057611ac0613004565b60009182526020909120015464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16611afa565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b816001600160a01b0316836001600160a01b03161415611b815760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161065f565b6001600160a01b0383811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611c1784848461135e565b611c2384848484611f37565b610e0f5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b6000610541611ca2611549565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611d0f878787876120e1565b91509150611d1c816121ce565b5095945050505050565b6001600160a01b03811660009081526009602052604090208054600181018255905b50919050565b6107b1838360016123bf565b6000611d696002848418612ea1565b610a6390848416612e89565b600061054182610bd2565b816001600160a01b0316836001600160a01b031614158015611da25750600081115b156107b1576001600160a01b03831615611e30576001600160a01b03831660009081526007602052604081208190611ddd9061242f8561243b565b91509150846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7248383604051611e25929190918252602082015260400190565b60405180910390a250505b6001600160a01b038216156107b1576001600160a01b03821660009081526007602052604081208190611e66906124698561243b565b91509150836001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724838360405161098d929190918252602082015260400190565b611eb88383612475565b611ec56000848484611f37565b6107b15760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b60006001600160a01b0384163b156120d9576040517f150b7a020000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063150b7a0290611f94903390899088908890600401612ccd565b602060405180830381600087803b158015611fae57600080fd5b505af1925050508015611fde575060408051601f3d908101601f19168201909252611fdb91810190612ba1565b60015b61208e573d80801561200c576040519150601f19603f3d011682016040523d82523d6000602084013e612011565b606091505b5080516120865760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050611356565b506001611356565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561211857506000905060036121c5565b8460ff16601b1415801561213057508460ff16601c14155b1561214157506000905060046121c5565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612195573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166121be576000600192509250506121c5565b9150600090505b94509492505050565b60008160048111156121e2576121e2612fd5565b14156121eb5750565b60018160048111156121ff576121ff612fd5565b141561224d5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161065f565b600281600481111561226157612261612fd5565b14156122af5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161065f565b60038160048111156122c3576122c3612fd5565b14156123375760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b600481600481111561234b5761234b612fd5565b14156110ea5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b6001600160a01b0383166123de576123db60086124698361243b565b50505b6001600160a01b0382166123fd576123fa600861242f8361243b565b50505b6001600160a01b038381166000908152600660205260408082205485841683529120546107b192918216911683611d80565b6000610a638284612edc565b60008061245d8561245861244e88611a99565b868863ffffffff16565b6125d7565b91509150935093915050565b6000610a638284612e89565b6001600160a01b0382166124cb5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161065f565b6000818152600260205260409020546001600160a01b0316156125305760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161065f565b6001600160a01b0382166000908152600360205260408120805460019290612559908490612e89565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4610a9060008383611d4e565b81546000908190816125e886611a99565b905060008211801561262657504386612602600185612edc565b8154811061261257612612613004565b60009182526020909120015463ffffffff16145b156126b05761263485612741565b86612640600185612edc565b8154811061265057612650613004565b9060005260206000200160000160046101000a8154817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff02191690837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff160217905550612733565b8560000160405180604001604052806126c8436127d9565b63ffffffff1681526020016126dc88612741565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff90811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b9250839150505b9250929050565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8211156127d55760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203260448201527f3234206269747300000000000000000000000000000000000000000000000000606482015260840161065f565b5090565b600063ffffffff8211156127d55760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201527f3220626974730000000000000000000000000000000000000000000000000000606482015260840161065f565b82805461286190612f1f565b90600052602060002090601f01602090048101928261288357600085556128e7565b82601f106128ba578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008235161785556128e7565b828001600101855582156128e7579182015b828111156128e75782358255916020019190600101906128cc565b506127d59291505b808211156127d557600081556001016128ef565b600060408284031215611d4857600080fd5b60006020828403121561292757600080fd5b8135610a6381613062565b6000806040838503121561294557600080fd5b823561295081613062565b9150602083013561296081613062565b809150509250929050565b60008060006060848603121561298057600080fd5b833561298b81613062565b9250602084013561299b81613062565b929592945050506040919091013590565b600080600080608085870312156129c257600080fd5b84356129cd81613062565b935060208501356129dd81613062565b925060408501359150606085013567ffffffffffffffff811115612a0057600080fd5b8501601f81018713612a1157600080fd5b8035612a24612a1f82612e61565b612e30565b818152886020838501011115612a3957600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b60008060408385031215612a6e57600080fd5b8235612a7981613062565b9150602083013561296081613077565b60008060408385031215612a9c57600080fd5b8235612aa781613062565b9150602083013567ffffffffffffffff811115612ac357600080fd5b612acf85828601612903565b9150509250929050565b60008060408385031215612aec57600080fd5b8235612af781613062565b946020939093013593505050565b60008060008060008060c08789031215612b1e57600080fd5b8635612b2981613062565b95506020870135945060408701359350606087013560ff81168114612b4d57600080fd5b9598949750929560808101359460a0909101359350915050565b600060208284031215612b7957600080fd5b8151610a6381613077565b600060208284031215612b9657600080fd5b8135610a6381613085565b600060208284031215612bb357600080fd5b8151610a6381613085565b600060208284031215612bd057600080fd5b815167ffffffffffffffff811115612be757600080fd5b8201601f81018413612bf857600080fd5b8051612c06612a1f82612e61565b818152856020838501011115612c1b57600080fd5b612c2c826020830160208601612ef3565b95945050505050565b600060208284031215612c4757600080fd5b5035919050565b60008060408385031215612c6157600080fd5b82359150602083013567ffffffffffffffff811115612ac357600080fd5b60008060408385031215612c9257600080fd5b50508035926020909101359150565b60008151808452612cb9816020860160208601612ef3565b601f01601f19169290920160200192915050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152612cff6080830184612ca1565b9695505050505050565b602081526000610a636020830184612ca1565b60408152600083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1853603018112612d5457600080fd5b8401803567ffffffffffffffff811115612d6d57600080fd5b803603861315612d7c57600080fd5b604080850152806080850152806020830160a0860137600060a082860101526020860135606085015260a0601f19601f83011685010192505050610a6360208301846001600160a01b03169052565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612e0057600080fd5b83018035915067ffffffffffffffff821115612e1b57600080fd5b60200191503681900382131561273a57600080fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612e5957612e59613033565b604052919050565b600067ffffffffffffffff821115612e7b57612e7b613033565b50601f01601f191660200190565b60008219821115612e9c57612e9c612fa6565b500190565b600082612ed7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612eee57612eee612fa6565b500390565b60005b83811015612f0e578181015183820152602001612ef6565b83811115610e0f5750506000910152565b600181811c90821680612f3357607f821691505b60208210811415611d48577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612f9f57612f9f612fa6565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6001600160a01b03811681146110ea57600080fd5b80151581146110ea57600080fd5b7fffffffff00000000000000000000000000000000000000000000000000000000811681146110ea57600080fdfea26469706673582212209a1a1c3e24181aa7dce102ae0268cb95471face0b3f66f5e29f7456d22f20b0864736f6c63430008060033',
	deployedBytecode:
		'0x608060405234801561001057600080fd5b50600436106101e55760003560e01c8063666d87a01161010f578063a22cb465116100a2578063c87b56dd11610071578063c87b56dd1461042a578063e131fc0c1461043d578063e985e9c514610450578063f2fde38b1461048c57600080fd5b8063a22cb465146103ca578063ad007d63146103dd578063b88d4fde14610404578063c3cda5201461041757600080fd5b80638da5cb5b116100de5780638da5cb5b1461038b5780638e539e8c1461039c57806395d89b41146103af5780639ab24eb0146103b757600080fd5b8063666d87a01461034a57806370a082311461035d578063715018a6146103705780637ecebe001461037857600080fd5b80633644e5151161018757806342842e0e1161015657806342842e0e146102e5578063587cde1e146102f85780635c19a95c146103245780636352211e1461033757600080fd5b80633644e515146102a457806336574975146102ac57806339fbc775146102bf5780633a46b1a8146102d257600080fd5b8063081812fc116101c3578063081812fc1461023e578063095ea7b31461026957806323b872dd1461027e5780632407497e1461029157600080fd5b806301ffc9a7146101ea57806306661abd1461021257806306fdde0314610229575b600080fd5b6101fd6101f8366004612b84565b61049f565b60405190151581526020015b60405180910390f35b61021b600b5481565b604051908152602001610209565b610231610547565b6040516102099190612d09565b61025161024c366004612c35565b6105d9565b6040516001600160a01b039091168152602001610209565b61027c610277366004612ad9565b610684565b005b61027c61028c36600461296b565b6107b6565b61027c61029f366004612915565b61083d565b61021b610903565b61027c6102ba366004612c4e565b610912565b6102316102cd366004612c7f565b61099c565b61021b6102e0366004612ad9565b610a41565b61027c6102f336600461296b565b610a6a565b610251610306366004612915565b6001600160a01b039081166000908152600660205260409020541690565b61027c610332366004612915565b610a85565b610251610345366004612c35565b610a94565b61021b610358366004612a89565b610b1f565b61021b61036b366004612915565b610bd2565b61027c610c6c565b61021b610386366004612915565b610cd2565b600a546001600160a01b0316610251565b61021b6103aa366004612c35565b610cf0565b610231610d4c565b61021b6103c5366004612915565b610d5b565b61027c6103d8366004612a5b565b610d7c565b6102517f000000000000000000000000000000000000000000000000000000000000000081565b61027c6104123660046129ac565b610d87565b61027c610425366004612b05565b610e15565b610231610438366004612c35565b610f4b565b600d54610251906001600160a01b031681565b6101fd61045e366004612932565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b61027c61049a366004612915565b61100b565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167faa91a66f00000000000000000000000000000000000000000000000000000000148061053257507fffffffff0000000000000000000000000000000000000000000000000000000082167fad007d6300000000000000000000000000000000000000000000000000000000145b806105415750610541826110ed565b92915050565b60606000805461055690612f1f565b80601f016020809104026020016040519081016040528092919081815260200182805461058290612f1f565b80156105cf5780601f106105a4576101008083540402835291602001916105cf565b820191906000526020600020905b8154815290600101906020018083116105b257829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166106685760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061068f82610a94565b9050806001600160a01b0316836001600160a01b031614156107195760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f7200000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b336001600160a01b03821614806107355750610735813361045e565b6107a75760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161065f565b6107b183836111d0565b505050565b6107c03382611256565b6108325760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161065f565b6107b183838361135e565b600a546001600160a01b031633146108975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b600d80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040513381527fe7784d93cfbfa4408e19577e6cc0436f4dbb51214b70e100905dfce9def88c169060200160405180910390a250565b600061090d611549565b905090565b61091b82610a94565b826006610929838383611670565b6109338480612dcb565b6000878152600c60209081526040808320898301358452909152902061095a929091612855565b50847fd07720acb527321c9d1766f359139d0e0e3551bd99fb3ca353d4f008f3aad8e6853360405161098d929190612d1c565b60405180910390a25050505050565b600c602090815260009283526040808420909152908252902080546109c090612f1f565b80601f01602080910402602001604051908101604052809291908181526020018280546109ec90612f1f565b8015610a395780601f10610a0e57610100808354040283529160200191610a39565b820191906000526020600020905b815481529060010190602001808311610a1c57829003601f168201915b505050505081565b6001600160a01b0382166000908152600760205260408120610a639083611852565b9392505050565b6107b183838360405180602001604052806000815250610d87565b33610a90818361198b565b5050565b6000818152600260205260408120546001600160a01b0316806105415760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e0000000000000000000000000000000000000000000000606482015260840161065f565b6000600b60008154610b3090612f6d565b91829055509050610b418382611a15565b6000610b4d8380612dcb565b90501115610b8857610b5f8280612dcb565b6000838152600c602090815260408083208783013584529091529020610b86929091612855565b505b826001600160a01b0316817fa1c6fd563bcbc3222f6031d7c26ff58cd6c701abff0bfffe652d055ce40629d48433604051610bc4929190612d1c565b60405180910390a392915050565b60006001600160a01b038216610c505760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f206164647265737300000000000000000000000000000000000000000000606482015260840161065f565b506001600160a01b031660009081526003602052604090205490565b600a546001600160a01b03163314610cc65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b610cd06000611a2f565b565b6001600160a01b038116600090815260096020526040812054610541565b6000438210610d415760405162461bcd60e51b815260206004820152601a60248201527f566f7465733a20626c6f636b206e6f7420796574206d696e6564000000000000604482015260640161065f565b610541600883611852565b60606001805461055690612f1f565b6001600160a01b038116600090815260076020526040812061054190611a99565b610a90338383611b1f565b610d913383611256565b610e035760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f766564000000000000000000000000000000606482015260840161065f565b610e0f84848484611c0c565b50505050565b83421115610e655760405162461bcd60e51b815260206004820152601860248201527f566f7465733a207369676e617475726520657870697265640000000000000000604482015260640161065f565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b038816918101919091526060810186905260808101859052600090610edf90610ed79060a00160405160208183030381529060405280519060200120611c95565b858585611cfe565b9050610eea81611d26565b8614610f385760405162461bcd60e51b815260206004820152601460248201527f566f7465733a20696e76616c6964206e6f6e6365000000000000000000000000604482015260640161065f565b610f42818861198b565b50505050505050565b600d546060906001600160a01b0316610f7257505060408051602081019091526000815290565b600d546040517fda0544aa000000000000000000000000000000000000000000000000000000008152600481018490526001600160a01b039091169063da0544aa9060240160006040518083038186803b158015610fcf57600080fd5b505afa158015610fe3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105419190810190612bbe565b600a546001600160a01b031633146110655760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161065f565b6001600160a01b0381166110e15760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161065f565b6110ea81611a2f565b50565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd00000000000000000000000000000000000000000000000000000000148061118057507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061054157507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610541565b600081815260046020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b038416908117909155819061121d82610a94565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166112e05760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e0000000000000000000000000000000000000000606482015260840161065f565b60006112eb83610a94565b9050806001600160a01b0316846001600160a01b031614806113265750836001600160a01b031661131b846105d9565b6001600160a01b0316145b8061135657506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661137182610a94565b6001600160a01b0316146113ed5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201527f6f776e6572000000000000000000000000000000000000000000000000000000606482015260840161065f565b6001600160a01b0382166114685760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161065f565b6114736000826111d0565b6001600160a01b038316600090815260036020526040812080546001929061149c908490612edc565b90915550506001600160a01b03821660009081526003602052604081208054600192906114ca908490612e89565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a46107b1838383611d4e565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156115a257507f000000000000000000000000000000000000000000000000000000000000000046145b156115cc57507f000000000000000000000000000000000000000000000000000000000000000090565b50604080517f00000000000000000000000000000000000000000000000000000000000000006020808301919091527f0000000000000000000000000000000000000000000000000000000000000000828401527f000000000000000000000000000000000000000000000000000000000000000060608301524660808301523060a0808401919091528351808403909101815260c0909201909252805191012090565b336001600160a01b0384161480159061174c57506040517fc161c93f0000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b03848116602483015260448201849052606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f9060840160206040518083038186803b15801561171257600080fd5b505afa158015611726573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174a9190612b67565b155b801561181b57506040517fc161c93f0000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b03848116602483015260006044830152606482018390527f0000000000000000000000000000000000000000000000000000000000000000169063c161c93f9060840160206040518083038186803b1580156117e157600080fd5b505afa1580156117f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118199190612b67565b155b156107b1576040517f075fd2b100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60004382106118a35760405162461bcd60e51b815260206004820181905260248201527f436865636b706f696e74733a20626c6f636b206e6f7420796574206d696e6564604482015260640161065f565b825460005b818110156119085760006118bc8284611d5a565b9050848660000182815481106118d4576118d4613004565b60009182526020909120015463ffffffff1611156118f457809250611902565b6118ff816001612e89565b91505b506118a8565b8115611961578461191a600184612edc565b8154811061192a5761192a613004565b60009182526020909120015464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16611964565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1695945050505050565b6001600160a01b0382811660008181526006602052604080822080548686167fffffffffffffffffffffffff0000000000000000000000000000000000000000821681179092559151919094169392849290917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a46107b18183611a1086611d75565b611d80565b610a90828260405180602001604052806000815250611eae565b600a80546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80546000908015611af75782611ab0600183612edc565b81548110611ac057611ac0613004565b60009182526020909120015464010000000090047bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16611afa565b60005b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169392505050565b816001600160a01b0316836001600160a01b03161415611b815760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161065f565b6001600160a01b0383811660008181526005602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611c1784848461135e565b611c2384848484611f37565b610e0f5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b6000610541611ca2611549565b836040517f19010000000000000000000000000000000000000000000000000000000000006020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000611d0f878787876120e1565b91509150611d1c816121ce565b5095945050505050565b6001600160a01b03811660009081526009602052604090208054600181018255905b50919050565b6107b1838360016123bf565b6000611d696002848418612ea1565b610a6390848416612e89565b600061054182610bd2565b816001600160a01b0316836001600160a01b031614158015611da25750600081115b156107b1576001600160a01b03831615611e30576001600160a01b03831660009081526007602052604081208190611ddd9061242f8561243b565b91509150846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7248383604051611e25929190918252602082015260400190565b60405180910390a250505b6001600160a01b038216156107b1576001600160a01b03821660009081526007602052604081208190611e66906124698561243b565b91509150836001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724838360405161098d929190918252602082015260400190565b611eb88383612475565b611ec56000848484611f37565b6107b15760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b60006001600160a01b0384163b156120d9576040517f150b7a020000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063150b7a0290611f94903390899088908890600401612ccd565b602060405180830381600087803b158015611fae57600080fd5b505af1925050508015611fde575060408051601f3d908101601f19168201909252611fdb91810190612ba1565b60015b61208e573d80801561200c576040519150601f19603f3d011682016040523d82523d6000602084013e612011565b606091505b5080516120865760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e7465720000000000000000000000000000606482015260840161065f565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a0200000000000000000000000000000000000000000000000000000000149050611356565b506001611356565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561211857506000905060036121c5565b8460ff16601b1415801561213057508460ff16601c14155b1561214157506000905060046121c5565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015612195573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166121be576000600192509250506121c5565b9150600090505b94509492505050565b60008160048111156121e2576121e2612fd5565b14156121eb5750565b60018160048111156121ff576121ff612fd5565b141561224d5760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161065f565b600281600481111561226157612261612fd5565b14156122af5760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161065f565b60038160048111156122c3576122c3612fd5565b14156123375760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b600481600481111561234b5761234b612fd5565b14156110ea5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161065f565b6001600160a01b0383166123de576123db60086124698361243b565b50505b6001600160a01b0382166123fd576123fa600861242f8361243b565b50505b6001600160a01b038381166000908152600660205260408082205485841683529120546107b192918216911683611d80565b6000610a638284612edc565b60008061245d8561245861244e88611a99565b868863ffffffff16565b6125d7565b91509150935093915050565b6000610a638284612e89565b6001600160a01b0382166124cb5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161065f565b6000818152600260205260409020546001600160a01b0316156125305760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161065f565b6001600160a01b0382166000908152600360205260408120805460019290612559908490612e89565b909155505060008181526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a4610a9060008383611d4e565b81546000908190816125e886611a99565b905060008211801561262657504386612602600185612edc565b8154811061261257612612613004565b60009182526020909120015463ffffffff16145b156126b05761263485612741565b86612640600185612edc565b8154811061265057612650613004565b9060005260206000200160000160046101000a8154817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff02191690837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff160217905550612733565b8560000160405180604001604052806126c8436127d9565b63ffffffff1681526020016126dc88612741565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff90811690915282546001810184556000938452602093849020835194909301519091166401000000000263ffffffff909316929092179101555b9250839150505b9250929050565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8211156127d55760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203260448201527f3234206269747300000000000000000000000000000000000000000000000000606482015260840161065f565b5090565b600063ffffffff8211156127d55760405162461bcd60e51b815260206004820152602660248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360448201527f3220626974730000000000000000000000000000000000000000000000000000606482015260840161065f565b82805461286190612f1f565b90600052602060002090601f01602090048101928261288357600085556128e7565b82601f106128ba578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008235161785556128e7565b828001600101855582156128e7579182015b828111156128e75782358255916020019190600101906128cc565b506127d59291505b808211156127d557600081556001016128ef565b600060408284031215611d4857600080fd5b60006020828403121561292757600080fd5b8135610a6381613062565b6000806040838503121561294557600080fd5b823561295081613062565b9150602083013561296081613062565b809150509250929050565b60008060006060848603121561298057600080fd5b833561298b81613062565b9250602084013561299b81613062565b929592945050506040919091013590565b600080600080608085870312156129c257600080fd5b84356129cd81613062565b935060208501356129dd81613062565b925060408501359150606085013567ffffffffffffffff811115612a0057600080fd5b8501601f81018713612a1157600080fd5b8035612a24612a1f82612e61565b612e30565b818152886020838501011115612a3957600080fd5b8160208401602083013760006020838301015280935050505092959194509250565b60008060408385031215612a6e57600080fd5b8235612a7981613062565b9150602083013561296081613077565b60008060408385031215612a9c57600080fd5b8235612aa781613062565b9150602083013567ffffffffffffffff811115612ac357600080fd5b612acf85828601612903565b9150509250929050565b60008060408385031215612aec57600080fd5b8235612af781613062565b946020939093013593505050565b60008060008060008060c08789031215612b1e57600080fd5b8635612b2981613062565b95506020870135945060408701359350606087013560ff81168114612b4d57600080fd5b9598949750929560808101359460a0909101359350915050565b600060208284031215612b7957600080fd5b8151610a6381613077565b600060208284031215612b9657600080fd5b8135610a6381613085565b600060208284031215612bb357600080fd5b8151610a6381613085565b600060208284031215612bd057600080fd5b815167ffffffffffffffff811115612be757600080fd5b8201601f81018413612bf857600080fd5b8051612c06612a1f82612e61565b818152856020838501011115612c1b57600080fd5b612c2c826020830160208601612ef3565b95945050505050565b600060208284031215612c4757600080fd5b5035919050565b60008060408385031215612c6157600080fd5b82359150602083013567ffffffffffffffff811115612ac357600080fd5b60008060408385031215612c9257600080fd5b50508035926020909101359150565b60008151808452612cb9816020860160208601612ef3565b601f01601f19169290920160200192915050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152612cff6080830184612ca1565b9695505050505050565b602081526000610a636020830184612ca1565b60408152600083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1853603018112612d5457600080fd5b8401803567ffffffffffffffff811115612d6d57600080fd5b803603861315612d7c57600080fd5b604080850152806080850152806020830160a0860137600060a082860101526020860135606085015260a0601f19601f83011685010192505050610a6360208301846001600160a01b03169052565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112612e0057600080fd5b83018035915067ffffffffffffffff821115612e1b57600080fd5b60200191503681900382131561273a57600080fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715612e5957612e59613033565b604052919050565b600067ffffffffffffffff821115612e7b57612e7b613033565b50601f01601f191660200190565b60008219821115612e9c57612e9c612fa6565b500190565b600082612ed7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015612eee57612eee612fa6565b500390565b60005b83811015612f0e578181015183820152602001612ef6565b83811115610e0f5750506000910152565b600181811c90821680612f3357607f821691505b60208210811415611d48577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612f9f57612f9f612fa6565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6001600160a01b03811681146110ea57600080fd5b80151581146110ea57600080fd5b7fffffffff00000000000000000000000000000000000000000000000000000000811681146110ea57600080fdfea26469706673582212209a1a1c3e24181aa7dce102ae0268cb95471face0b3f66f5e29f7456d22f20b0864736f6c63430008060033',
	devdoc: {
		details:
			"Projects are represented as ERC-721's.Adheres to - IJBProjects: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.Inherits from - JBOperatable: Includes convenience functionality for checking a message sender's permissions before executing certain transactions. ERC721Votes: A checkpointable standard definition for non-fungible tokens (NFTs). Ownable: Includes convenience functionality for checking a message sender's permissions before executing certain transactions.",
		kind: 'dev',
		methods: {
			'DOMAIN_SEPARATOR()': {
				details: "Returns the contract's {EIP712} domain separator."
			},
			'approve(address,uint256)': {
				details: 'See {IERC721-approve}.'
			},
			'balanceOf(address)': {
				details: 'See {IERC721-balanceOf}.'
			},
			constructor: {
				params: {
					_operatorStore: 'A contract storing operator assignments.'
				}
			},
			'createFor(address,(string,uint256))': {
				details: " Anyone can create a project on an owner's behalf.",
				params: {
					_metadata:
						'A struct containing metadata content about the project, and domain within which the metadata applies.',
					_owner: 'The address that will be the owner of the project.'
				},
				returns: {
					projectId: 'The token ID of the newly created project.'
				}
			},
			'delegate(address)': {
				details: 'Delegates votes from the sender to `delegatee`.'
			},
			'delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)': {
				details: 'Delegates votes from signer to `delegatee`.'
			},
			'delegates(address)': {
				details: 'Returns the delegate that `account` has chosen.'
			},
			'getApproved(uint256)': {
				details: 'See {IERC721-getApproved}.'
			},
			'getPastTotalSupply(uint256)': {
				details:
					'Returns the total supply of votes available at the end of a past block (`blockNumber`). NOTE: This value is the sum of all available votes, which is not necessarily the sum of all delegated votes. Votes that have not been delegated are still part of total supply, even though they would not participate in a vote. Requirements: - `blockNumber` must have been already mined'
			},
			'getPastVotes(address,uint256)': {
				details:
					'Returns the amount of votes that `account` had at the end of a past block (`blockNumber`). Requirements: - `blockNumber` must have been already mined'
			},
			'getVotes(address)': {
				details: 'Returns the current amount of votes that `account` has.'
			},
			'isApprovedForAll(address,address)': {
				details: 'See {IERC721-isApprovedForAll}.'
			},
			'name()': {
				details: 'See {IERC721Metadata-name}.'
			},
			'nonces(address)': {
				details: 'Returns an address nonce.'
			},
			'owner()': {
				details: 'Returns the address of the current owner.'
			},
			'ownerOf(uint256)': {
				details: 'See {IERC721-ownerOf}.'
			},
			'renounceOwnership()': {
				details:
					'Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.'
			},
			'safeTransferFrom(address,address,uint256)': {
				details: 'See {IERC721-safeTransferFrom}.'
			},
			'safeTransferFrom(address,address,uint256,bytes)': {
				details: 'See {IERC721-safeTransferFrom}.'
			},
			'setApprovalForAll(address,bool)': {
				details: 'See {IERC721-setApprovalForAll}.'
			},
			'setMetadataOf(uint256,(string,uint256))': {
				details:
					" Only a project's owner or operator can set its metadata. Applications can use the domain namespace as they wish.",
				params: {
					_metadata:
						'A struct containing metadata content, and domain within which the metadata applies. ',
					_projectId: "The ID of the project who's metadata is being changed."
				}
			},
			'setTokenUriResolver(address)': {
				params: {
					_newResolver: 'The address of the new resolver.'
				}
			},
			'supportsInterface(bytes4)': {
				details: ' See {IERC165-supportsInterface}.',
				params: {
					_interfaceId: 'The ID of the interface to check for adherance to.'
				}
			},
			'symbol()': {
				details: 'See {IERC721Metadata-symbol}.'
			},
			'tokenURI(uint256)': {
				params: {
					_projectId: 'The ID of the project to get a URI of.'
				},
				returns: {
					_0: 'The token URI to use for the provided `_projectId`.'
				}
			},
			'transferFrom(address,address,uint256)': {
				details: 'See {IERC721-transferFrom}.'
			},
			'transferOwnership(address)': {
				details:
					'Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.'
			}
		},
		stateVariables: {
			count: {
				details:
					'The count is incremented with each new project created.  The resulting ERC-721 token ID for each project is the newly incremented count value.'
			}
		},
		version: 1
	},
	userdoc: {
		kind: 'user',
		methods: {
			'count()': {
				notice: ' The number of projects that have been created using this contract.'
			},
			'createFor(address,(string,uint256))': {
				notice:
					' Create a new project for the specified owner, which mints an NFT (ERC-721) into their wallet.'
			},
			'metadataContentOf(uint256,uint256)': {
				notice:
					' The metadata for each project, which can be used across several domains. _projectId The ID of the project to which the metadata belongs. _domain The domain within which the metadata applies. Applications can use the domain namespace as they wish.'
			},
			'operatorStore()': {
				notice: ' A contract storing operator assignments.'
			},
			'setMetadataOf(uint256,(string,uint256))': {
				notice:
					" Allows a project owner to set the project's metadata content for a particular domain namespace. "
			},
			'setTokenUriResolver(address)': {
				notice: ' Sets the address of the resolver used to retrieve the tokenURI of projects.'
			},
			'supportsInterface(bytes4)': {
				notice: 'Indicates if this contract adheres to the specified interface.'
			},
			'tokenURI(uint256)': {
				notice: ' Returns the URI where the ERC-721 standard JSON of a project is hosted.'
			},
			'tokenUriResolver()': {
				notice: 'The contract resolving each project ID to its ERC721 URI.'
			}
		},
		notice: ' Stores project ownership and metadata.',
		version: 1
	},
	storageLayout: {
		storage: [
			{
				astId: 1611,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_name',
				offset: 0,
				slot: '0',
				type: 't_string_storage'
			},
			{
				astId: 1613,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_symbol',
				offset: 0,
				slot: '1',
				type: 't_string_storage'
			},
			{
				astId: 1617,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_owners',
				offset: 0,
				slot: '2',
				type: 't_mapping(t_uint256,t_address)'
			},
			{
				astId: 1621,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_balances',
				offset: 0,
				slot: '3',
				type: 't_mapping(t_address,t_uint256)'
			},
			{
				astId: 1625,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_tokenApprovals',
				offset: 0,
				slot: '4',
				type: 't_mapping(t_uint256,t_address)'
			},
			{
				astId: 1631,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_operatorApprovals',
				offset: 0,
				slot: '5',
				type: 't_mapping(t_address,t_mapping(t_address,t_bool))'
			},
			{
				astId: 259,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_delegation',
				offset: 0,
				slot: '6',
				type: 't_mapping(t_address,t_address)'
			},
			{
				astId: 264,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_delegateCheckpoints',
				offset: 0,
				slot: '7',
				type: 't_mapping(t_address,t_struct(History)2972_storage)'
			},
			{
				astId: 267,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_totalCheckpoints',
				offset: 0,
				slot: '8',
				type: 't_struct(History)2972_storage'
			},
			{
				astId: 272,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_nonces',
				offset: 0,
				slot: '9',
				type: 't_mapping(t_address,t_struct(Counter)3219_storage)'
			},
			{
				astId: 53,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: '_owner',
				offset: 0,
				slot: '10',
				type: 't_address'
			},
			{
				astId: 10615,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: 'count',
				offset: 0,
				slot: '11',
				type: 't_uint256'
			},
			{
				astId: 10623,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: 'metadataContentOf',
				offset: 0,
				slot: '12',
				type: 't_mapping(t_uint256,t_mapping(t_uint256,t_string_storage))'
			},
			{
				astId: 10628,
				contract: 'contracts/JBProjects.sol:JBProjects',
				label: 'tokenUriResolver',
				offset: 0,
				slot: '13',
				type: 't_contract(IJBTokenUriResolver)19226'
			}
		],
		types: {
			t_address: {
				encoding: 'inplace',
				label: 'address',
				numberOfBytes: '20'
			},
			't_array(t_struct(Checkpoint)2967_storage)dyn_storage': {
				base: 't_struct(Checkpoint)2967_storage',
				encoding: 'dynamic_array',
				label: 'struct Checkpoints.Checkpoint[]',
				numberOfBytes: '32'
			},
			t_bool: {
				encoding: 'inplace',
				label: 'bool',
				numberOfBytes: '1'
			},
			't_contract(IJBTokenUriResolver)19226': {
				encoding: 'inplace',
				label: 'contract IJBTokenUriResolver',
				numberOfBytes: '20'
			},
			't_mapping(t_address,t_address)': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => address)',
				numberOfBytes: '32',
				value: 't_address'
			},
			't_mapping(t_address,t_bool)': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => bool)',
				numberOfBytes: '32',
				value: 't_bool'
			},
			't_mapping(t_address,t_mapping(t_address,t_bool))': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => mapping(address => bool))',
				numberOfBytes: '32',
				value: 't_mapping(t_address,t_bool)'
			},
			't_mapping(t_address,t_struct(Counter)3219_storage)': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => struct Counters.Counter)',
				numberOfBytes: '32',
				value: 't_struct(Counter)3219_storage'
			},
			't_mapping(t_address,t_struct(History)2972_storage)': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => struct Checkpoints.History)',
				numberOfBytes: '32',
				value: 't_struct(History)2972_storage'
			},
			't_mapping(t_address,t_uint256)': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => uint256)',
				numberOfBytes: '32',
				value: 't_uint256'
			},
			't_mapping(t_uint256,t_address)': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => address)',
				numberOfBytes: '32',
				value: 't_address'
			},
			't_mapping(t_uint256,t_mapping(t_uint256,t_string_storage))': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => mapping(uint256 => string))',
				numberOfBytes: '32',
				value: 't_mapping(t_uint256,t_string_storage)'
			},
			't_mapping(t_uint256,t_string_storage)': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => string)',
				numberOfBytes: '32',
				value: 't_string_storage'
			},
			t_string_storage: {
				encoding: 'bytes',
				label: 'string',
				numberOfBytes: '32'
			},
			't_struct(Checkpoint)2967_storage': {
				encoding: 'inplace',
				label: 'struct Checkpoints.Checkpoint',
				members: [
					{
						astId: 2964,
						contract: 'contracts/JBProjects.sol:JBProjects',
						label: '_blockNumber',
						offset: 0,
						slot: '0',
						type: 't_uint32'
					},
					{
						astId: 2966,
						contract: 'contracts/JBProjects.sol:JBProjects',
						label: '_value',
						offset: 4,
						slot: '0',
						type: 't_uint224'
					}
				],
				numberOfBytes: '32'
			},
			't_struct(Counter)3219_storage': {
				encoding: 'inplace',
				label: 'struct Counters.Counter',
				members: [
					{
						astId: 3218,
						contract: 'contracts/JBProjects.sol:JBProjects',
						label: '_value',
						offset: 0,
						slot: '0',
						type: 't_uint256'
					}
				],
				numberOfBytes: '32'
			},
			't_struct(History)2972_storage': {
				encoding: 'inplace',
				label: 'struct Checkpoints.History',
				members: [
					{
						astId: 2971,
						contract: 'contracts/JBProjects.sol:JBProjects',
						label: '_checkpoints',
						offset: 0,
						slot: '0',
						type: 't_array(t_struct(Checkpoint)2967_storage)dyn_storage'
					}
				],
				numberOfBytes: '32'
			},
			t_uint224: {
				encoding: 'inplace',
				label: 'uint224',
				numberOfBytes: '28'
			},
			t_uint256: {
				encoding: 'inplace',
				label: 'uint256',
				numberOfBytes: '32'
			},
			t_uint32: {
				encoding: 'inplace',
				label: 'uint32',
				numberOfBytes: '4'
			}
		}
	}
};
