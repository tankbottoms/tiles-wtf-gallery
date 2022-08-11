import { connectedAccount, getProvider, readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, type ContractTransaction } from 'ethers';

import Tiles from '$deployments/Tiles';

import { get } from 'svelte/store';
import { parseCachedData, parseContractResponse } from '../cached';
import JBETHPaymentTerminalMainnet from '../../../deployments/mainnet/JBETHPaymentTerminal';
import JBProjectHandlesMainnet from '../../../deployments/mainnet/JBProjectHandles';
import PublicResolverMainnet from '../../../deployments/mainnet/PublicResolver';
import JBProjectsMainnet from '../../../deployments/mainnet/JBProjects';
import JBControllerMainnet from '../../../deployments/mainnet/JBController';
import JBSplitsStoreMainnet from '../../../deployments/mainnet/JBSplitsStore';
import JBFundingCycleStoreMainnet from '../../../deployments/mainnet/JBFundingCycleStore';
import JBTokenStoreMainnet from '../../../deployments/mainnet/JBTokenStore';
import JBETHERC20ProjectPayerDeployerMainnet from '../../../deployments/mainnet/JBETHERC20ProjectPayerDeployer';

import JBETHPaymentTerminalRinkeby from '../../../deployments/mainnet/JBETHPaymentTerminal';
import JBProjectHandlesRinkeby from '../../../deployments/mainnet/JBProjectHandles';
import PublicResolverRinkeby from '../../../deployments/mainnet/PublicResolver';
import JBProjectsRinkeby from '../../../deployments/mainnet/JBProjects';
import JBControllerRinkeby from '../../../deployments/mainnet/JBController';
import JBSplitsStoreRinkeby from '../../../deployments/mainnet/JBSplitsStore';
import JBFundingCycleStoreRinkeby from '../../../deployments/mainnet/JBFundingCycleStore';
import JBTokenStoreRinkeby from '../../../deployments/mainnet/JBTokenStore';
import JBETHERC20ProjectPayerDeployerRinkeby from '../../../deployments/mainnet/JBETHERC20ProjectPayerDeployer';
import type { V2ContractName } from '$juicebox/models/v2/contracts';

export const contracts = {
	mainnet: {
		Tiles,
		JBETHPaymentTerminalMainnet,
		JBProjectHandlesMainnet,
		PublicResolverMainnet,
		JBProjectsMainnet,
		JBControllerMainnet,
		JBSplitsStoreMainnet,
		JBFundingCycleStoreMainnet,
		JBTokenStoreMainnet,
		JBETHERC20ProjectPayerDeployerMainnet
	},
	rinkeby: {
		JBETHPaymentTerminalRinkeby,
		JBProjectHandlesRinkeby,
		PublicResolverRinkeby,
		JBProjectsRinkeby,
		JBControllerRinkeby,
		JBSplitsStoreRinkeby,
		JBFundingCycleStoreRinkeby,
		JBTokenStoreRinkeby,
		JBETHERC20ProjectPayerDeployerRinkeby
	}

};

export async function readContractByAddress(
	contractAddress,
	ABI: any[],
	functionName: string,
	args: Any[] = [],
	cached = false
) {
	const cache = await caches.open('CONTRACT_RESPONSE');
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

	const contract = new ethers.Contract(contractAddress, ABI, getProvider());

	if (connectedAccount.get() && getProvider()) {
		const response = parseContractResponse(await contract[functionName](...args));
		await cache.put(id, new Response(JSON.stringify(response)));
		return response;
	} else {
		const response = await fetch(
			`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/web3/readContract`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					apikey: import.meta.env.VITE_API_KEY
				},
				body: JSON.stringify({
					chainId: readNetwork.get().id,
					address: contractAddress,
					abi: ABI,
					function: functionName,
					args: [...args]
				})
			}
		);

		const jsonResponse = await response.json();

		await cache.put(id, new Response(JSON.stringify(jsonResponse)));

		return parseCachedData(jsonResponse);
	}
}

export async function readContract(
	contractName: V2ContractName,
	functionName: string,
	args: Any[] = [],
	cached = false
) {
	console.log(contractName, functionName, args);

	const contractAddress = contracts[get(readNetwork).alias][contractName].address;
	const abi = contracts[get(readNetwork).alias][contractName].abi;
	return await readContractByAddress(contractAddress, abi, functionName, args, cached);
}

export async function writeContract(
	contractName: V2ContractName,
	functionName: string,
	args: Any[] = [],
	opts = {}
): Promise<ContractTransaction> {
	const _provider = provider.get();
	const contract = new ethers.Contract(
		contracts[get(readNetwork).alias][contractName].address,
		contracts[get(readNetwork).alias][contractName].abi,
		_provider.getSigner()
	);
	return await contract[functionName](...args, opts);
}

