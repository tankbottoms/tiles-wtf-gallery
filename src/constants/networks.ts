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

export enum NetworkName {
	// localhost = 'localhost',
	// ropsten = 'ropsten',
	mainnet = 'mainnet',
	rinkeby = 'rinkeby',
	// kovan = 'kovan',
	// goerli = 'goerli',
	// xdai = 'xdai',
	// matic = 'matic',
	// mumbai = 'mumbai'
}

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
];

export const NETWORKS_BY_ALIAS = Object.values(blocknativeNetworks).reduce(
	(acc, curr) => ({
		...acc,
		[curr.alias]: curr
	}),
	{} as Record<NetworkName, NetworkInfo>
);
