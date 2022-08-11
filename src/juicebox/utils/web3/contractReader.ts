import { readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, Signer, type ContractInterface, type ContractTransaction } from 'ethers';

import Tiles from '$deployments/Tiles';

import { get } from 'svelte/store';
import { parseCachedData, parseContractResponse } from '../cached';
import JBETHPaymentTerminal from '../../../deployments/mainnet/JBETHPaymentTerminal';
import JBProjectHandles from '../../../deployments/mainnet/JBProjectHandles';
import PublicResolver from '../../../deployments/mainnet/PublicResolver';
import JBProjects from '../../../deployments/mainnet/JBProjects';
import JBController from '../../../deployments/mainnet/JBController';
import JBSplitsStore from '../../../deployments/mainnet/JBSplitsStore';
import JBFundingCycleStore from '../../../deployments/mainnet/JBFundingCycleStore';
import JBTokenStore from '../../../deployments/mainnet/JBTokenStore';

export const contracts = {
	Tiles,
	JBETHPaymentTerminal,
	JBProjectHandles,
	PublicResolver,
	JBProjects,
	JBController,
	JBSplitsStore,
	JBFundingCycleStore,
	JBTokenStore
};

export async function readContractByAddress(
	contractAddress,
	ABI: ContractInterface,
	functionName: string,
	args = [],
	signer?: Signer
) {
	console.log(get(readNetwork).alias?.toUpperCase(), contractAddress, functionName, args);
	const contract = new ethers.Contract(
		contractAddress,
		ABI,
		new ethers.providers.JsonRpcProvider(get(readNetwork).rpcUrl)
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
	console.log(contractName, functionName, args);

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
			} else console.log('cache miss');
		}

		const contract = new ethers.Contract(
			contractAddress,
			abi,
			new ethers.providers.JsonRpcProvider(get(readNetwork).rpcUrl)
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
