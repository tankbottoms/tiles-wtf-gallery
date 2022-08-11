import { getDefaultProvider, readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, Signer, type ContractTransaction } from 'ethers';

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
		JBETHPaymentTerminal: JBETHPaymentTerminalMainnet,
		JBProjectHandles: JBProjectHandlesMainnet,
		PublicResolver: PublicResolverMainnet,
		JBProjects: JBProjectsMainnet,
		JBController: JBControllerMainnet,
		JBSplitsStore: JBSplitsStoreMainnet,
		JBFundingCycleStore: JBFundingCycleStoreMainnet,
		JBTokenStore: JBTokenStoreMainnet,
		JBETHERC20ProjectPayerDeployer: JBETHERC20ProjectPayerDeployerMainnet
	},
	rinkeby: {
		Tiles,
		JBETHPaymentTerminal: JBETHPaymentTerminalRinkeby,
		JBProjectHandles: JBProjectHandlesRinkeby,
		PublicResolver: PublicResolverRinkeby,
		JBProjects: JBProjectsRinkeby,
		JBController: JBControllerRinkeby,
		JBSplitsStore: JBSplitsStoreRinkeby,
		JBFundingCycleStore: JBFundingCycleStoreRinkeby,
		JBTokenStore: JBTokenStoreRinkeby,
		JBETHERC20ProjectPayerDeployer: JBETHERC20ProjectPayerDeployerRinkeby
	}
};

export async function readContractByAddress(
	contractAddress,
	ABI: any[],
	functionName: string,
	args: Any[] = [],
	cached = false,
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
	contractName: V2ContractName,
	functionName: string,
	args: Any[] = [],
	cached = false
) {
	console.log(contractName, functionName, args);

	const cache = await caches.open('CONTRACT_RESPONSE');

	if (contracts[get(readNetwork).alias][contractName]) {
		const contractAddress = contracts[get(readNetwork).alias][contractName].address;
		const abi = contracts[get(readNetwork).alias][contractName].abi;
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

