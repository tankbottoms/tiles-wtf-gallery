import { NetworkName } from '$juicebox/models/network-name';

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
		rpcUrl: `https://ethereum-mainnet-rpc.allthatnode.com/` // rpcURL required for wallet balances
	},
	{
		id: '0x4',
		token: 'rETH',
		label: 'Ethereum Rinkeby Testnet',
		alias: NetworkName.rinkeby,
		rpcUrl: `https://ethereum-rinkeby-rpc.allthatnode.com/`
	}
];

export const NETWORKS_BY_ALIAS = Object.values(blocknativeNetworks).reduce(
	(acc, curr) => ({
		...acc,
		[curr.alias]: curr
	}),
	{} as Record<NetworkName, NetworkInfo>
);
