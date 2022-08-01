const Tiles: ContractDeployment = {
	rinkeby: '0xB9c73D46357708e23B99106FBF9e26C0F0412743',
	mainnet: '',
	abi: [
		{
			inputs: [],
			name: 'mint',
			outputs: [
				{
					internalType: 'uint256',
					name: 'mintedTokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'tile',
					type: 'address'
				}
			],
			name: 'grab',
			outputs: [
				{
					internalType: 'uint256',
					name: 'mintedTokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		},
		{
			inputs: [],
			name: 'totalSupply',
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
					name: '',
					type: 'address'
				}
			],
			name: 'idForAddress',
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
					internalType: 'uint256',
					name: 'id',
					type: 'uint256'
				}
			],
			name: 'ownerOf',
			outputs: [
				{
					internalType: 'address',
					name: 'owner',
					type: 'address'
				}
			],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [],
			name: 'seize',
			outputs: [
				{
					internalType: 'uint256',
					name: 'tokenId',
					type: 'uint256'
				}
			],
			stateMutability: 'payable',
			type: 'function'
		}
	]
};

export default Tiles;
