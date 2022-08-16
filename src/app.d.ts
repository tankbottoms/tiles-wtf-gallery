/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

export declare global {
	interface ContractDeployment {
		rinkeby: string;
		mainnet: string;
		abi: ContractInterface;
	}

	interface GrabHistoryItem {
		caller: string;
		address: string;
		timestamp: number;
		blockNumber: number;
	}

	enum NetworkName {
		localhost = 'localhost',
		ropsten = 'ropsten',
		mainnet = 'mainnet',
		kovan = 'kovan',
		rinkeby = 'rinkeby',
		goerli = 'goerli',
		xdai = 'xdai',
		matic = 'matic',
		mumbai = 'mumbai'
	}
	type Address = `0x${string}`;
	type Any = any;
}
