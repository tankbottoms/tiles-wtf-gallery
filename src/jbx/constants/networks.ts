import { NetworkName } from '$jbx/models/network-name';

const infuraId = import.meta.env.VITE_INFURA_ID;

export type NetworkInfo = {
	name: NetworkName;
	color: string;
	chainId: number;
	blockExplorer: string;
	rpcUrl: string;
	faucet?: string;
	price?: number;
	gasPrice?: number;
};

export const blocknativeNetworks = [
	{
		id: '0x1', // chain ID must be in hexadecimel
		token: 'ETH', // main chain token
		label: 'Ethereum Mainnet',
		alias: NetworkName.mainnet,
		rpcUrl: `https://mainnet.infura.io/v3/${infuraId}`, // rpcURL required for wallet balances
		subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL_MAINNET
	},
	{
		id: '0x4',
		token: 'rETH',
		label: 'Ethereum Rinkeby Testnet',
		alias: NetworkName.rinkeby,
		rpcUrl: `https://rinkeby.infura.io/v3/${infuraId}`,
		subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL_RINKEBY
	}
	// {
	// 	id: '0x3',
	// 	token: 'tROP',
	// 	label: 'Ethereum Ropsten Testnet',
	// 	alias: NetworkName.ropsten,
	// 	rpcUrl: `https://ropsten.infura.io/v3/${infuraId}`
	//  subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL
	// },
	// {
	// 	id: '0x38',
	// 	token: 'BNB',
	// 	label: 'Binance Smart Chain',
	// 	alias: 'bsc',
	// 	rpcUrl: 'https://bsc-dataseed.binance.org/'
	//  subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL
	// },
	// {
	// 	id: '0x89',
	// 	token: 'MATIC',
	// 	label: 'Matic Mainnet',
	// 	alias: NetworkName.matic,
	// 	rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
	//  subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL
	// }
];

export const NETWORKS_BY_ALIAS = Object.values(blocknativeNetworks).reduce(
	(acc, curr) => ({
		...acc,
		[curr.alias]: curr
	}),
	{} as Record<NetworkName, NetworkInfo>
);
