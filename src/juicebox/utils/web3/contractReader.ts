import { connectedAccount, getProvider, readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, type ContractTransaction } from 'ethers';

import Tiles from '$deployments/Tiles';
import { get } from 'svelte/store';
import { parseCachedData, parseContractResponse } from '../cached';
import MainnetJBProjects from '../../../deployments/mainnet/JBProjects';
import MainnetJBController from '../../../deployments/mainnet/JBController';
import MainnetJBETHPaymentTerminal from '../../../deployments/mainnet/JBETHPaymentTerminal';
import MainnetJBFundingCycleStore from '../../../deployments/mainnet/JBFundingCycleStore';
import MainnetJBSingleTokenPaymentTerminalStore from '../../../deployments/mainnet/JBSingleTokenPaymentTerminalStore';
import MainnetJBDirectory from '../../../deployments/mainnet/JBDirectory';
import MainnetJBOperatorStore from '../../../deployments/mainnet/JBOperatorStore';
import MainnetJBSplitsStore from '../../../deployments/mainnet/JBSplitsStore';
import MainnetJBETHERC20ProjectPayerDeployer from '../../../deployments/mainnet/JBETHERC20ProjectPayerDeployer';
import MainnetJBPrices from '../../../deployments/mainnet/JBPrices';
import MainnetJBTokenStore from '../../../deployments/mainnet/JBTokenStore';
import MainnetJBProjectHandles from '../../../deployments/mainnet/JBProjectHandles';
import MinnetPublicResolver from '../../../deployments/mainnet/PublicResolver';

import RinkebyJBProjects from '../../../deployments/rinkeby/JBProjects';
import RinkebyJBController from '../../../deployments/rinkeby/JBController';
import RinkebyJBETHPaymentTerminal from '../../../deployments/rinkeby/JBETHPaymentTerminal';
import RinkebyJBFundingCycleStore from '../../../deployments/rinkeby/JBFundingCycleStore';
import RinkebyJBSingleTokenPaymentTerminalStore from '../../../deployments/rinkeby/JBSingleTokenPaymentTerminalStore';
import RinkebyJBDirectory from '../../../deployments/rinkeby/JBDirectory';
import RinkebyJBOperatorStore from '../../../deployments/rinkeby/JBOperatorStore';
import RinkebyJBSplitsStore from '../../../deployments/rinkeby/JBSplitsStore';
import RinkebyJBETHERC20ProjectPayerDeployer from '../../../deployments/rinkeby/JBETHERC20ProjectPayerDeployer';
import RinkebyJBPrices from '../../../deployments/rinkeby/JBPrices';
import RinkebyJBTokenStore from '../../../deployments/rinkeby/JBTokenStore';
import RinkebyJBProjectHandles from '../../../deployments/rinkeby/JBProjectHandles';
import RinkebyPublicResolver from '../../../deployments/rinkeby/PublicResolver';

import type { V2ContractName } from '$juicebox/models/v2/contracts';

export const contracts = {
	mainnet: {
		Tiles,
		JBController: MainnetJBController,
		JBDirectory: MainnetJBDirectory,
		JBETHPaymentTerminal: MainnetJBETHPaymentTerminal,
		JBFundingCycleStore: MainnetJBFundingCycleStore,
		JBOperatorStore: MainnetJBOperatorStore,
		JBPrices: MainnetJBPrices,
		JBProjects: MainnetJBProjects,
		JBSplitsStore: MainnetJBSplitsStore,
		JBTokenStore: MainnetJBTokenStore,
		JBSingleTokenPaymentTerminalStore: MainnetJBSingleTokenPaymentTerminalStore,
		JBETHERC20ProjectPayerDeployer: MainnetJBETHERC20ProjectPayerDeployer,
		JBProjectHandles: MainnetJBProjectHandles,
		PublicResolver: MinnetPublicResolver
	},
	rinkeby: {
		Tiles,
		JBController: RinkebyJBController,
		JBDirectory: RinkebyJBDirectory,
		JBETHPaymentTerminal: RinkebyJBETHPaymentTerminal,
		JBFundingCycleStore: RinkebyJBFundingCycleStore,
		JBOperatorStore: RinkebyJBOperatorStore,
		JBPrices: RinkebyJBPrices,
		JBProjects: RinkebyJBProjects,
		JBSplitsStore: RinkebyJBSplitsStore,
		JBTokenStore: RinkebyJBTokenStore,
		JBSingleTokenPaymentTerminalStore: RinkebyJBSingleTokenPaymentTerminalStore,
		JBETHERC20ProjectPayerDeployer: RinkebyJBETHERC20ProjectPayerDeployer,
		JBProjectHandles: RinkebyJBProjectHandles,
		PublicResolver: RinkebyPublicResolver
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
	const response = parseContractResponse(await contract[functionName](...args));
	await cache.put(id, new Response(JSON.stringify(response)));
	return response;
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
