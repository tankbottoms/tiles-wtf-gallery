export default {
	address: '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB',
	abi: [
		{
			inputs: [],
			name: 'PERMISSION_INDEX_OUT_OF_BOUNDS',
			type: 'error'
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: 'address',
					name: 'operator',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'address',
					name: 'account',
					type: 'address'
				},
				{
					indexed: true,
					internalType: 'uint256',
					name: 'domain',
					type: 'uint256'
				},
				{
					indexed: false,
					internalType: 'uint256[]',
					name: 'permissionIndexes',
					type: 'uint256[]'
				},
				{
					indexed: false,
					internalType: 'uint256',
					name: 'packed',
					type: 'uint256'
				}
			],
			name: 'SetOperator',
			type: 'event'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: '_operator',
					type: 'address'
				},
				{
					internalType: 'address',
					name: '_account',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: '_domain',
					type: 'uint256'
				},
				{
					internalType: 'uint256',
					name: '_permissionIndex',
					type: 'uint256'
				}
			],
			name: 'hasPermission',
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
					internalType: 'address',
					name: '_operator',
					type: 'address'
				},
				{
					internalType: 'address',
					name: '_account',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: '_domain',
					type: 'uint256'
				},
				{
					internalType: 'uint256[]',
					name: '_permissionIndexes',
					type: 'uint256[]'
				}
			],
			name: 'hasPermissions',
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
					internalType: 'address',
					name: '',
					type: 'address'
				},
				{
					internalType: 'address',
					name: '',
					type: 'address'
				},
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256'
				}
			],
			name: 'permissionsOf',
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
					components: [
						{
							internalType: 'address',
							name: 'operator',
							type: 'address'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						},
						{
							internalType: 'uint256[]',
							name: 'permissionIndexes',
							type: 'uint256[]'
						}
					],
					internalType: 'struct JBOperatorData',
					name: '_operatorData',
					type: 'tuple'
				}
			],
			name: 'setOperator',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: 'address',
							name: 'operator',
							type: 'address'
						},
						{
							internalType: 'uint256',
							name: 'domain',
							type: 'uint256'
						},
						{
							internalType: 'uint256[]',
							name: 'permissionIndexes',
							type: 'uint256[]'
						}
					],
					internalType: 'struct JBOperatorData[]',
					name: '_operatorData',
					type: 'tuple[]'
				}
			],
			name: 'setOperators',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		}
	],
	transactionHash: '0xa44831b6e29b1eecfeba50e007bd246da9959d120c897c421e6bb48dcf2ee4bd',
	receipt: {
		to: null,
		from: '0xE9bE6df23C7f9CaBa3005DA2fa2d8714d340D0aF',
		contractAddress: '0xEDB2db4b82A4D4956C3B4aA474F7ddf3Ac73c5AB',
		transactionIndex: 0,
		gasUsed: '573810',
		logsBloom:
			'0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
		blockHash: '0x0a75a192425586e474c62e711ec2610b081af4b0d0a86189f3ec3e05e0581da7',
		transactionHash: '0xa44831b6e29b1eecfeba50e007bd246da9959d120c897c421e6bb48dcf2ee4bd',
		logs: [],
		blockNumber: 10635481,
		cumulativeGasUsed: '573810',
		status: 1,
		byzantium: true
	},
	args: [],
	numDeployments: 1,
	solcInputHash: '87acdcf5deeaa43ae3ecf62f45455645',
	metadata:
		'{"compiler":{"version":"0.8.6+commit.11564f7e"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"PERMISSION_INDEX_OUT_OF_BOUNDS","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"domain","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"permissionIndexes","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"packed","type":"uint256"}],"name":"SetOperator","type":"event"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_domain","type":"uint256"},{"internalType":"uint256","name":"_permissionIndex","type":"uint256"}],"name":"hasPermission","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_domain","type":"uint256"},{"internalType":"uint256[]","name":"_permissionIndexes","type":"uint256[]"}],"name":"hasPermissions","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"permissionsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"domain","type":"uint256"},{"internalType":"uint256[]","name":"permissionIndexes","type":"uint256[]"}],"internalType":"struct JBOperatorData","name":"_operatorData","type":"tuple"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"domain","type":"uint256"},{"internalType":"uint256[]","name":"permissionIndexes","type":"uint256[]"}],"internalType":"struct JBOperatorData[]","name":"_operatorData","type":"tuple[]"}],"name":"setOperators","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"details":"Adheres to - IJBOperatorStore: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.","kind":"dev","methods":{"hasPermission(address,address,uint256,uint256)":{"params":{"_account":"The account that has given out permissions to the operator.","_domain":"The domain that the operator has been given permissions to operate.","_operator":"The operator to check.","_permissionIndex":"The permission index to check for."},"returns":{"_0":"A flag indicating whether the operator has the specified permission."}},"hasPermissions(address,address,uint256,uint256[])":{"params":{"_account":"The account that has given out permissions to the operator.","_domain":"The domain that the operator has been given permissions to operate.","_operator":"The operator to check.","_permissionIndexes":"An array of permission indexes to check for."},"returns":{"_0":"A flag indicating whether the operator has all specified permissions."}},"setOperator((address,uint256,uint256[]))":{"details":"Only an address can set its own operators.","params":{"_operatorData":"The data that specifies the params for the operator being set."}},"setOperators((address,uint256,uint256[])[])":{"details":"Only an address can set its own operators.","params":{"_operatorData":"The data that specify the params for each operator being set."}}},"stateVariables":{"permissionsOf":{"details":"An account can give an operator permissions that only pertain to a specific domain namespace. There is no domain with a value of 0 \\u2013 accounts can use the 0 domain to give an operator permissions to all domains on their behalf.Permissions are stored in a packed `uint256`. Each 256 bits represents the on/off state of a permission. Applications can specify the significance of each index. _operator The address of the operator. _account The address of the account being operated. _domain The domain within which the permissions apply. Applications can use the domain namespace as they wish."}},"version":1},"userdoc":{"kind":"user","methods":{"hasPermission(address,address,uint256,uint256)":{"notice":" Whether or not an operator has the permission to take a certain action pertaining to the specified domain."},"hasPermissions(address,address,uint256,uint256[])":{"notice":" Whether or not an operator has the permission to take certain actions pertaining to the specified domain."},"permissionsOf(address,address,uint256)":{"notice":"The permissions that an operator has been given to operate on a specific domain."},"setOperator((address,uint256,uint256[]))":{"notice":"Sets permissions for an operators."},"setOperators((address,uint256,uint256[])[])":{"notice":"Sets permissions for many operators."}},"notice":"Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.","version":1}},"settings":{"compilationTarget":{"contracts/JBOperatorStore.sol":"JBOperatorStore"},"evmVersion":"berlin","libraries":{},"metadata":{"bytecodeHash":"ipfs","useLiteralContent":true},"optimizer":{"enabled":true,"runs":10000},"remappings":[]},"sources":{"contracts/JBOperatorStore.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./interfaces/IJBOperatorStore.sol\';\\n\\n/** \\n  @notice\\n  Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.\\n\\n  @dev\\n  Adheres to -\\n  IJBOperatorStore: General interface for the methods in this contract that interact with the blockchain\'s state according to the protocol\'s rules.\\n*/\\ncontract JBOperatorStore is IJBOperatorStore {\\n  //*********************************************************************//\\n  // --------------------------- custom errors ------------------------- //\\n  //*********************************************************************//\\n  error PERMISSION_INDEX_OUT_OF_BOUNDS();\\n\\n  //*********************************************************************//\\n  // --------------------- public stored properties -------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice\\n    The permissions that an operator has been given to operate on a specific domain.\\n    \\n    @dev\\n    An account can give an operator permissions that only pertain to a specific domain namespace.\\n    There is no domain with a value of 0 \\u2013 accounts can use the 0 domain to give an operator\\n    permissions to all domains on their behalf.\\n\\n    @dev\\n    Permissions are stored in a packed `uint256`. Each 256 bits represents the on/off state of a permission. Applications can specify the significance of each index.\\n\\n    _operator The address of the operator.\\n    _account The address of the account being operated.\\n    _domain The domain within which the permissions apply. Applications can use the domain namespace as they wish.\\n  */\\n  mapping(address => mapping(address => mapping(uint256 => uint256))) public override permissionsOf;\\n\\n  //*********************************************************************//\\n  // ------------------------- external views -------------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    Whether or not an operator has the permission to take a certain action pertaining to the specified domain.\\n\\n    @param _operator The operator to check.\\n    @param _account The account that has given out permissions to the operator.\\n    @param _domain The domain that the operator has been given permissions to operate.\\n    @param _permissionIndex The permission index to check for.\\n\\n    @return A flag indicating whether the operator has the specified permission.\\n  */\\n  function hasPermission(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex\\n  ) external view override returns (bool) {\\n    if (_permissionIndex > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();\\n\\n    return (((permissionsOf[_operator][_account][_domain] >> _permissionIndex) & 1) == 1);\\n  }\\n\\n  /** \\n    @notice \\n    Whether or not an operator has the permission to take certain actions pertaining to the specified domain.\\n\\n    @param _operator The operator to check.\\n    @param _account The account that has given out permissions to the operator.\\n    @param _domain The domain that the operator has been given permissions to operate.\\n    @param _permissionIndexes An array of permission indexes to check for.\\n\\n    @return A flag indicating whether the operator has all specified permissions.\\n  */\\n  function hasPermissions(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256[] calldata _permissionIndexes\\n  ) external view override returns (bool) {\\n    for (uint256 _i = 0; _i < _permissionIndexes.length; _i++) {\\n      uint256 _permissionIndex = _permissionIndexes[_i];\\n\\n      if (_permissionIndex > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();\\n\\n      if (((permissionsOf[_operator][_account][_domain] >> _permissionIndex) & 1) == 0)\\n        return false;\\n    }\\n    return true;\\n  }\\n\\n  //*********************************************************************//\\n  // ---------------------- external transactions ---------------------- //\\n  //*********************************************************************//\\n\\n  /**\\n    @notice\\n    Sets permissions for an operators.\\n\\n    @dev\\n    Only an address can set its own operators.\\n\\n    @param _operatorData The data that specifies the params for the operator being set.\\n  */\\n  function setOperator(JBOperatorData calldata _operatorData) external override {\\n    // Pack the indexes into a uint256.\\n    uint256 _packed = _packedPermissions(_operatorData.permissionIndexes);\\n\\n    // Store the new value.\\n    permissionsOf[_operatorData.operator][msg.sender][_operatorData.domain] = _packed;\\n\\n    emit SetOperator(\\n      _operatorData.operator,\\n      msg.sender,\\n      _operatorData.domain,\\n      _operatorData.permissionIndexes,\\n      _packed\\n    );\\n  }\\n\\n  /**\\n    @notice\\n    Sets permissions for many operators.\\n\\n    @dev\\n    Only an address can set its own operators.\\n\\n    @param _operatorData The data that specify the params for each operator being set.\\n  */\\n  function setOperators(JBOperatorData[] calldata _operatorData) external override {\\n    for (uint256 _i = 0; _i < _operatorData.length; _i++) {\\n      // Pack the indexes into a uint256.\\n      uint256 _packed = _packedPermissions(_operatorData[_i].permissionIndexes);\\n\\n      // Store the new value.\\n      permissionsOf[_operatorData[_i].operator][msg.sender][_operatorData[_i].domain] = _packed;\\n\\n      emit SetOperator(\\n        _operatorData[_i].operator,\\n        msg.sender,\\n        _operatorData[_i].domain,\\n        _operatorData[_i].permissionIndexes,\\n        _packed\\n      );\\n    }\\n  }\\n\\n  //*********************************************************************//\\n  // --------------------- private helper functions -------------------- //\\n  //*********************************************************************//\\n\\n  /** \\n    @notice \\n    Converts an array of permission indexes to a packed `uint256`.\\n\\n    @param _indexes The indexes of the permissions to pack.\\n\\n    @return packed The packed value.\\n  */\\n  function _packedPermissions(uint256[] calldata _indexes) private pure returns (uint256 packed) {\\n    for (uint256 _i = 0; _i < _indexes.length; _i++) {\\n      uint256 _index = _indexes[_i];\\n\\n      if (_index > 255) revert PERMISSION_INDEX_OUT_OF_BOUNDS();\\n\\n      // Turn the bit at the index on.\\n      packed |= 1 << _index;\\n    }\\n  }\\n}\\n","keccak256":"0x23c019ded9baf011549a1d8442a2689a488e19f084a3ee041f682d715461b838","license":"MIT"},"contracts/interfaces/IJBOperatorStore.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\nimport \'./../structs/JBOperatorData.sol\';\\n\\ninterface IJBOperatorStore {\\n  event SetOperator(\\n    address indexed operator,\\n    address indexed account,\\n    uint256 indexed domain,\\n    uint256[] permissionIndexes,\\n    uint256 packed\\n  );\\n\\n  function permissionsOf(\\n    address _operator,\\n    address _account,\\n    uint256 _domain\\n  ) external view returns (uint256);\\n\\n  function hasPermission(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256 _permissionIndex\\n  ) external view returns (bool);\\n\\n  function hasPermissions(\\n    address _operator,\\n    address _account,\\n    uint256 _domain,\\n    uint256[] calldata _permissionIndexes\\n  ) external view returns (bool);\\n\\n  function setOperator(JBOperatorData calldata _operatorData) external;\\n\\n  function setOperators(JBOperatorData[] calldata _operatorData) external;\\n}\\n","keccak256":"0x50a26fddc575a50176df7deb9225ec1816b0158c9e9b8555e7921a3261254ed8","license":"MIT"},"contracts/structs/JBOperatorData.sol":{"content":"// SPDX-License-Identifier: MIT\\npragma solidity 0.8.6;\\n\\n/** \\n  @member operator The address of the operator.\\n  @member domain The domain within which the operator is being given permissions. A domain of 0 is a wildcard domain, which gives an operator access to all domains.\\n  @member permissionIndexes The indexes of the permissions the operator is being given.\\n*/\\nstruct JBOperatorData {\\n  address operator;\\n  uint256 domain;\\n  uint256[] permissionIndexes;\\n}\\n","keccak256":"0xc108ff9bbeef8783e332522b8bd1c17bba071c34051de72dc5bfe38dfd39a3a3","license":"MIT"}},"version":1}',
	bytecode:
		'0x608060405234801561001057600080fd5b50610973806100206000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c806380deb2301161005057806380deb230146100a95780638d5f697f146100e7578063c161c93f146100fa57600080fd5b80630f5932f01461006c578063529cdd2e14610094575b600080fd5b61007f61007a36600461067b565b61010d565b60405190151581526020015b60405180910390f35b6100a76100a236600461076e565b6101e0565b005b6100d96100b736600461063f565b6000602081815293815260408082208552928152828120909352825290205481565b60405190815260200161008b565b6100a76100f536600461072c565b6102bf565b61007f6101083660046106ea565b61049b565b6000805b828110156101d157600084848381811061012d5761012d61090e565b90506020020135905060ff811115610171576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff888116600090815260208181526040808320938b16835292815282822089835290522054811c6001166101be576000925050506101d7565b50806101c9816108ae565b915050610111565b50600190505b95945050505050565b60006101f76101f26040840184610808565b610522565b90508060008061020a602086018661061d565b73ffffffffffffffffffffffffffffffffffffffff16815260208082019290925260409081016000908120338083529084528282208785018035808552919095529290912093909355919061025f908561061d565b73ffffffffffffffffffffffffffffffffffffffff167f9dee2ffb464e2d0198cd20321be1ae3f79ed49f7ed4abfaa7ee4fe982bbeb3206102a36040870187610808565b866040516102b3939291906107a9565b60405180910390a45050565b60005b818110156104965760006103018484848181106102e1576102e161090e565b90506020028101906102f39190610870565b6101f2906040810190610808565b9050806000808686868181106103195761031961090e565b905060200281019061032b9190610870565b61033990602081019061061d565b73ffffffffffffffffffffffffffffffffffffffff1681526020808201929092526040908101600090812033825290925281209086868681811061037f5761037f61090e565b90506020028101906103919190610870565b602001358152602001908152602001600020819055508383838181106103b9576103b961090e565b90506020028101906103cb9190610870565b60200135338585858181106103e2576103e261090e565b90506020028101906103f49190610870565b61040290602081019061061d565b73ffffffffffffffffffffffffffffffffffffffff167f9dee2ffb464e2d0198cd20321be1ae3f79ed49f7ed4abfaa7ee4fe982bbeb32087878781811061044b5761044b61090e565b905060200281019061045d9190610870565b61046b906040810190610808565b8660405161047b939291906107a9565b60405180910390a4508061048e816108ae565b9150506102c2565b505050565b600060ff8211156104d8576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff808516600090815260208181526040808320938716835292815282822085835290522054600190821c811614949350505050565b6000805b828110156105a15760008484838181106105425761054261090e565b90506020020135905060ff811115610586576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001901b919091179080610599816108ae565b915050610526565b5092915050565b803573ffffffffffffffffffffffffffffffffffffffff811681146105cc57600080fd5b919050565b60008083601f8401126105e357600080fd5b50813567ffffffffffffffff8111156105fb57600080fd5b6020830191508360208260051b850101111561061657600080fd5b9250929050565b60006020828403121561062f57600080fd5b610638826105a8565b9392505050565b60008060006060848603121561065457600080fd5b61065d846105a8565b925061066b602085016105a8565b9150604084013590509250925092565b60008060008060006080868803121561069357600080fd5b61069c866105a8565b94506106aa602087016105a8565b935060408601359250606086013567ffffffffffffffff8111156106cd57600080fd5b6106d9888289016105d1565b969995985093965092949392505050565b6000806000806080858703121561070057600080fd5b610709856105a8565b9350610717602086016105a8565b93969395505050506040820135916060013590565b6000806020838503121561073f57600080fd5b823567ffffffffffffffff81111561075657600080fd5b610762858286016105d1565b90969095509350505050565b60006020828403121561078057600080fd5b813567ffffffffffffffff81111561079757600080fd5b82016060818503121561063857600080fd5b6040815282604082015260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8411156107e257600080fd5b8360051b8086606085013760009083016060019081526020909201929092529392505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261083d57600080fd5b83018035915067ffffffffffffffff82111561085857600080fd5b6020019150600581901b360382131561061657600080fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa18336030181126108a457600080fd5b9190910192915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610907577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220d05e8a761279e7bd7ea368f81c63870af45c8823511c03ab392a4fed5802aa4b64736f6c63430008060033',
	deployedBytecode:
		'0x608060405234801561001057600080fd5b50600436106100675760003560e01c806380deb2301161005057806380deb230146100a95780638d5f697f146100e7578063c161c93f146100fa57600080fd5b80630f5932f01461006c578063529cdd2e14610094575b600080fd5b61007f61007a36600461067b565b61010d565b60405190151581526020015b60405180910390f35b6100a76100a236600461076e565b6101e0565b005b6100d96100b736600461063f565b6000602081815293815260408082208552928152828120909352825290205481565b60405190815260200161008b565b6100a76100f536600461072c565b6102bf565b61007f6101083660046106ea565b61049b565b6000805b828110156101d157600084848381811061012d5761012d61090e565b90506020020135905060ff811115610171576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff888116600090815260208181526040808320938b16835292815282822089835290522054811c6001166101be576000925050506101d7565b50806101c9816108ae565b915050610111565b50600190505b95945050505050565b60006101f76101f26040840184610808565b610522565b90508060008061020a602086018661061d565b73ffffffffffffffffffffffffffffffffffffffff16815260208082019290925260409081016000908120338083529084528282208785018035808552919095529290912093909355919061025f908561061d565b73ffffffffffffffffffffffffffffffffffffffff167f9dee2ffb464e2d0198cd20321be1ae3f79ed49f7ed4abfaa7ee4fe982bbeb3206102a36040870187610808565b866040516102b3939291906107a9565b60405180910390a45050565b60005b818110156104965760006103018484848181106102e1576102e161090e565b90506020028101906102f39190610870565b6101f2906040810190610808565b9050806000808686868181106103195761031961090e565b905060200281019061032b9190610870565b61033990602081019061061d565b73ffffffffffffffffffffffffffffffffffffffff1681526020808201929092526040908101600090812033825290925281209086868681811061037f5761037f61090e565b90506020028101906103919190610870565b602001358152602001908152602001600020819055508383838181106103b9576103b961090e565b90506020028101906103cb9190610870565b60200135338585858181106103e2576103e261090e565b90506020028101906103f49190610870565b61040290602081019061061d565b73ffffffffffffffffffffffffffffffffffffffff167f9dee2ffb464e2d0198cd20321be1ae3f79ed49f7ed4abfaa7ee4fe982bbeb32087878781811061044b5761044b61090e565b905060200281019061045d9190610870565b61046b906040810190610808565b8660405161047b939291906107a9565b60405180910390a4508061048e816108ae565b9150506102c2565b505050565b600060ff8211156104d8576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff808516600090815260208181526040808320938716835292815282822085835290522054600190821c811614949350505050565b6000805b828110156105a15760008484838181106105425761054261090e565b90506020020135905060ff811115610586576040517f8e9503a900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001901b919091179080610599816108ae565b915050610526565b5092915050565b803573ffffffffffffffffffffffffffffffffffffffff811681146105cc57600080fd5b919050565b60008083601f8401126105e357600080fd5b50813567ffffffffffffffff8111156105fb57600080fd5b6020830191508360208260051b850101111561061657600080fd5b9250929050565b60006020828403121561062f57600080fd5b610638826105a8565b9392505050565b60008060006060848603121561065457600080fd5b61065d846105a8565b925061066b602085016105a8565b9150604084013590509250925092565b60008060008060006080868803121561069357600080fd5b61069c866105a8565b94506106aa602087016105a8565b935060408601359250606086013567ffffffffffffffff8111156106cd57600080fd5b6106d9888289016105d1565b969995985093965092949392505050565b6000806000806080858703121561070057600080fd5b610709856105a8565b9350610717602086016105a8565b93969395505050506040820135916060013590565b6000806020838503121561073f57600080fd5b823567ffffffffffffffff81111561075657600080fd5b610762858286016105d1565b90969095509350505050565b60006020828403121561078057600080fd5b813567ffffffffffffffff81111561079757600080fd5b82016060818503121561063857600080fd5b6040815282604082015260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8411156107e257600080fd5b8360051b8086606085013760009083016060019081526020909201929092529392505050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261083d57600080fd5b83018035915067ffffffffffffffff82111561085857600080fd5b6020019150600581901b360382131561061657600080fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa18336030181126108a457600080fd5b9190910192915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610907577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220d05e8a761279e7bd7ea368f81c63870af45c8823511c03ab392a4fed5802aa4b64736f6c63430008060033',
	devdoc: {
		details:
			"Adheres to - IJBOperatorStore: General interface for the methods in this contract that interact with the blockchain's state according to the protocol's rules.",
		kind: 'dev',
		methods: {
			'hasPermission(address,address,uint256,uint256)': {
				params: {
					_account: 'The account that has given out permissions to the operator.',
					_domain: 'The domain that the operator has been given permissions to operate.',
					_operator: 'The operator to check.',
					_permissionIndex: 'The permission index to check for.'
				},
				returns: {
					_0: 'A flag indicating whether the operator has the specified permission.'
				}
			},
			'hasPermissions(address,address,uint256,uint256[])': {
				params: {
					_account: 'The account that has given out permissions to the operator.',
					_domain: 'The domain that the operator has been given permissions to operate.',
					_operator: 'The operator to check.',
					_permissionIndexes: 'An array of permission indexes to check for.'
				},
				returns: {
					_0: 'A flag indicating whether the operator has all specified permissions.'
				}
			},
			'setOperator((address,uint256,uint256[]))': {
				details: 'Only an address can set its own operators.',
				params: {
					_operatorData: 'The data that specifies the params for the operator being set.'
				}
			},
			'setOperators((address,uint256,uint256[])[])': {
				details: 'Only an address can set its own operators.',
				params: {
					_operatorData: 'The data that specify the params for each operator being set.'
				}
			}
		},
		stateVariables: {
			permissionsOf: {
				details:
					'An account can give an operator permissions that only pertain to a specific domain namespace. There is no domain with a value of 0 – accounts can use the 0 domain to give an operator permissions to all domains on their behalf.Permissions are stored in a packed `uint256`. Each 256 bits represents the on/off state of a permission. Applications can specify the significance of each index. _operator The address of the operator. _account The address of the account being operated. _domain The domain within which the permissions apply. Applications can use the domain namespace as they wish.'
			}
		},
		version: 1
	},
	userdoc: {
		kind: 'user',
		methods: {
			'hasPermission(address,address,uint256,uint256)': {
				notice:
					' Whether or not an operator has the permission to take a certain action pertaining to the specified domain.'
			},
			'hasPermissions(address,address,uint256,uint256[])': {
				notice:
					' Whether or not an operator has the permission to take certain actions pertaining to the specified domain.'
			},
			'permissionsOf(address,address,uint256)': {
				notice: 'The permissions that an operator has been given to operate on a specific domain.'
			},
			'setOperator((address,uint256,uint256[]))': {
				notice: 'Sets permissions for an operators.'
			},
			'setOperators((address,uint256,uint256[])[])': {
				notice: 'Sets permissions for many operators.'
			}
		},
		notice:
			'Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.',
		version: 1
	},
	storageLayout: {
		storage: [
			{
				astId: 10181,
				contract: 'contracts/JBOperatorStore.sol:JBOperatorStore',
				label: 'permissionsOf',
				offset: 0,
				slot: '0',
				type: 't_mapping(t_address,t_mapping(t_address,t_mapping(t_uint256,t_uint256)))'
			}
		],
		types: {
			t_address: {
				encoding: 'inplace',
				label: 'address',
				numberOfBytes: '20'
			},
			't_mapping(t_address,t_mapping(t_address,t_mapping(t_uint256,t_uint256)))': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => mapping(address => mapping(uint256 => uint256)))',
				numberOfBytes: '32',
				value: 't_mapping(t_address,t_mapping(t_uint256,t_uint256))'
			},
			't_mapping(t_address,t_mapping(t_uint256,t_uint256))': {
				encoding: 'mapping',
				key: 't_address',
				label: 'mapping(address => mapping(uint256 => uint256))',
				numberOfBytes: '32',
				value: 't_mapping(t_uint256,t_uint256)'
			},
			't_mapping(t_uint256,t_uint256)': {
				encoding: 'mapping',
				key: 't_uint256',
				label: 'mapping(uint256 => uint256)',
				numberOfBytes: '32',
				value: 't_uint256'
			},
			t_uint256: {
				encoding: 'inplace',
				label: 'uint256',
				numberOfBytes: '32'
			}
		}
	}
};
