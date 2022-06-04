import type { V2ContractName } from '$jbx/models/v2/contracts';
import { chainId, readNetwork } from '$stores/web3';
import { provider } from '$stores/web3';
import { ethers, type ContractTransaction } from 'ethers';

import MainnetJBProjects from '../../deployments/mainnet/JBProjects';
import MainnetJBController from '../../deployments/mainnet/JBController';
import MainnetJBETHPaymentTerminal from '../../deployments/mainnet/JBETHPaymentTerminal';
import MainnetJBFundingCycleStore from '../../deployments/mainnet/JBFundingCycleStore';
import MainnetJBSingleTokenPaymentTerminalStore from '../../deployments/mainnet/JBSingleTokenPaymentTerminalStore';
import MainnetJBDirectory from '../../deployments/mainnet/JBDirectory';
import MainnetJBOperatorStore from '../../deployments/mainnet/JBOperatorStore';
import MainnetJBSplitsStore from '../../deployments/mainnet/JBSplitsStore';
import MainnetJBETHERC20ProjectPayerDeployer from '../../deployments/mainnet/JBETHERC20ProjectPayerDeployer';
import MainnetJBPrices from '../../deployments/mainnet/JBPrices';
import MainnetJBTokenStore from '../../deployments/mainnet/JBTokenStore';

import RinkebyJBProjects from '../../deployments/rinkeby/JBProjects';
import RinkebyJBController from '../../deployments/rinkeby/JBController';
import RinkebyJBETHPaymentTerminal from '../../deployments/rinkeby/JBETHPaymentTerminal';
import RinkebyJBFundingCycleStore from '../../deployments/rinkeby/JBFundingCycleStore';
import RinkebyJBSingleTokenPaymentTerminalStore from '../../deployments/rinkeby/JBSingleTokenPaymentTerminalStore';
import RinkebyJBDirectory from '../../deployments/rinkeby/JBDirectory';
import RinkebyJBOperatorStore from '../../deployments/rinkeby/JBOperatorStore';
import RinkebyJBSplitsStore from '../../deployments/rinkeby/JBSplitsStore';
import RinkebyJBETHERC20ProjectPayerDeployer from '../../deployments/rinkeby/JBETHERC20ProjectPayerDeployer';
import RinkebyJBPrices from '../../deployments/rinkeby/JBPrices';
import RinkebyJBTokenStore from '../../deployments/rinkeby/JBTokenStore';
import { get } from 'svelte/store';

export const contracts = {
	mainnet: {
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
		JBETHERC20ProjectPayerDeployer: MainnetJBETHERC20ProjectPayerDeployer
	},
	rinkeby: {
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
		JBETHERC20ProjectPayerDeployer: RinkebyJBETHERC20ProjectPayerDeployer
	}
};

export async function readContractByAddress(
	contractAddress,
	ABI: any[],
	functionName: string,
	args = []
) {
	console.log(contractAddress, functionName, args);
	const contract = new ethers.Contract(
		contractAddress,
		ABI,
		new ethers.providers.JsonRpcProvider(get(readNetwork).rpcUrl)
	);
	return await contract[functionName](...args);
}

export async function readContract(contractName: V2ContractName, functionName: string, args = []) {
	console.log(contractName, functionName, args);
	const contract = new ethers.Contract(
		contracts[get(readNetwork).alias][contractName].address,
		contracts[get(readNetwork).alias][contractName].abi,
		new ethers.providers.JsonRpcProvider(get(readNetwork).rpcUrl)
	);
	return await contract[functionName](...args);
}

export async function writeContract(
	contractName: V2ContractName,
	functionName: string,
	args = [],
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
