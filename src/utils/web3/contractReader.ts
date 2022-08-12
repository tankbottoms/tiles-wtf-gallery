import { getDefaultProvider, readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, Signer, type ContractInterface, type ContractTransaction } from 'ethers';

import Tiles from '$deployments/Tiles';

import { get } from 'svelte/store';
import { parseCachedData, parseContractResponse } from '../cache';

const etherscanKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

export const contracts = {
	Tiles
};

export async function readContractByAddress(
	contractAddress,
	ABI: ContractInterface,
	functionName: string,
	args = [],
	signer?: Signer
) {
	console.warn(get(readNetwork).alias?.toUpperCase(), contractAddress, functionName, args);
	const contract = new ethers.Contract(
		contractAddress,
		ABI,
		new ethers.providers.JsonRpcProvider(getDefaultProvider().rpcUrl)
	);

	if (signer) {
		return await contract.connect(signer)[functionName](...args);
	}
	if (args.length == 0) {
		return await contract[functionName]();
	}
	return await contract[functionName](...args);
}

export async function readContract(
	contractName: keyof typeof contracts,
	functionName: string,
	args = [],
	cached = false
) {
	console.warn(contractName, functionName, args);
	const cache = await caches.open('CONTRACT_RESPONSE');

	if (contracts[contractName][get(readNetwork).alias]) {
		const contractAddress = contracts[contractName][get(readNetwork).alias];
		const abi = contracts[contractName].abi;
		const id = btoa(
			JSON.stringify({
				chainId: readNetwork.get().id,
				contractAddress,
				functionName,
				args
			})
		);
		if (cached) {
			const response = await cache.match(id);
			if (response) {
				const result = await response.text();
				const data = parseCachedData(JSON.parse(result));
				if (typeof data !== 'undefined' && data !== null) {
					return data;
				}
			} else console.log('ContractReader: cache miss');
		}

		const contract = new ethers.Contract(
			contractAddress,
			abi,
			provider.get() || new ethers.providers.JsonRpcProvider(getDefaultProvider().rpcUrl)
		);

		const response = parseContractResponse(await contract[functionName](...args));
		await cache.put(id, new Response(JSON.stringify(response)));
		return response;
	} else {
		throw Error(`${contractName}: deployment not found on ${get(readNetwork).alias}`);
	}
}

export async function writeContract(
	contractName: keyof typeof contracts,
	functionName: string,
	args = [],
	opts = {}
): Promise<ContractTransaction> {
	const _provider = provider.get();
	if (contracts[contractName][get(readNetwork).alias]) {
		const contract = new ethers.Contract(
			contracts[contractName][get(readNetwork).alias],
			contracts[contractName].abi,
			_provider.getSigner()
		);
		return await contract[functionName](...args, opts);
	} else {
		throw Error(`${contractName}: deployment not found on ${get(readNetwork).alias}`);
	}
}

export async function getTransactionsByAddress(
	address: string
): Promise<ethers.providers.TransactionResponse[]> {
	let provider = new ethers.providers.EtherscanProvider(getDefaultProvider().alias, etherscanKey);
	let history = await provider.getHistory(address);
	return history;
}

export async function getTilesHistory(): Promise<any> {
	const transactions = await getTransactionsByAddress(Tiles[get(readNetwork).alias]);
	const sorted = transactions.sort((a, b) => a.timestamp - b.timestamp);
	const iface = new ethers.utils.Interface(Tiles.abi);
	let tiles = [];
	sorted.forEach((tx) => {
		try {
			const decodedData = iface.parseTransaction({ data: tx.data });
			decodedData.name !== undefined ? tiles.push(decodedData.args[0]) : console.error(decodedData);
			/*
			// TODO: Is there a reason to filter?
			if (decodedData.name === 'grab') {
				tiles.push(decodedData.args[0]);
			} 
			*/
		} catch {}
	});
	return tiles;
}
