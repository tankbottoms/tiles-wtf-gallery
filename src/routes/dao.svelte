<script lang="ts" context="module">
	import { browser } from '$app/env';
	export const hydrate = true;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import type {
		UserTokenBalanceContext,
		V2ProjectContextType
	} from '$juicebox/models/project-type';
	import type { V2CurrencyOption } from '$juicebox/models/v2/currencyOption';
	import { BigNumber, constants, ethers } from 'ethers';
	import { modal } from '$stores';
	import { setContext } from 'svelte';	
	import Details from '$juicebox/components/project/Details.svelte';
	import Head from '$juicebox/components/project/Head.svelte';
	import Issue from '$juicebox/components/Issue.svelte';
	import Modal from '$juicebox/components/Modal.svelte';
	import Paid from '$juicebox/components/Paid.svelte';
	import Store from '$utils/Store';
	import { readContract, readContractByAddress } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import {
		ETH_PAYOUT_SPLIT_GROUP,
		RESERVED_TOKEN_SPLIT_GROUP
	} from '$juicebox/constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { getProjects, getProjectMetadata } from '$juicebox/data/project';
	import Activity from '$juicebox/components/project/Activity.svelte';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$juicebox/constants/v2/metadataDomain';
	import Loading from '$juicebox/components/Loading.svelte';
	import { getCurrencyConverter } from '$juicebox/data/currency';
	import { V2CurrencyName, V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';
	import ERC20ContractAbi from '$juicebox/constants/ERC20ContractAbi';
	import { chainId, connectedAccount, getProvider, provider, readNetwork } from '$stores/web3';
	import { V2OperatorPermission } from '$juicebox/constants/v2/operatorPermission';
	import { blocknativeNetworks } from '$constants/networks';

	const projectId = BigNumber.from($chainId === 4 ? 98 : 41);

	let project = new Store<V2ProjectContextType>({} as any);
	const userTokenBalance = new Store<UserTokenBalanceContext>({
		claimedBalance: BigNumber.from(0),
		unclaimedBalance: BigNumber.from(0),
		totalBalance: BigNumber.from(0)
	});

	setContext('PROJECT', project);
	setContext('USER_TOKEN_BALANCE', userTokenBalance);

	let loading = true;
	let issue: string | false = false;
	let cachedRender = true;

	function checkNetworkId(_chainId: number) {
		if (Number($readNetwork.id) !== _chainId) {
			console.log('Network changed', $chainId, _chainId);
			throw {
				message: `aborting: network was changed (from: ${_chainId} to: ${$chainId})`,
				errorCode: 'networkChanged'
			};
		}
	}

	async function fetchProject(cached = false, showLoadingUI = true) {
		if (!browser) return;
		if (showLoadingUI) loading = true;
		issue = '';
		let networkId = Number($readNetwork.id);
		if ($connectedAccount && !blocknativeNetworks.find((net) => Number(net.id) === $chainId)) {
			issue = 'Current network is not supported';
			loading = false;
			return;
		}
		$project.projectId = BigNumber.from(projectId);

		try {
			const [resultingProject] = await getProjects({
				keys: ['projectId', 'handle'],
				projectId: projectId
			});
			if (resultingProject && resultingProject.handle) {
				$project.handle = resultingProject.handle;
			}
		} catch (e) {
			console.error(e);
		}

		try {
			checkNetworkId(networkId);
			const data = await getProjects({
				projectId,
				keys: ['createdAt', 'totalPaid']
			});
			$project.totalVolume = data[0].totalPaid;
			$project.createdAt = data[0].createdAt;
			checkNetworkId(networkId);
		} catch (error) {
			// NOTE: no need to fail here as this info is not critical
			console.error('Could not fetch createdAt and totalPaid');
			console.error(error);
		}

		try {
			checkNetworkId(networkId);
			const metadataCID = await readContract(
				V2ContractName.JBProjects,
				'metadataContentOf',
				[$project.projectId, JUICEBOX_MONEY_METADATA_DOMAIN],
				cached
			);
			checkNetworkId(networkId);
			const metadata = await getProjectMetadata(metadataCID);
			$project.projectMetadata = metadata;
			if (!metadata) return;
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading project metadata';
			return;
		}

		try {
			checkNetworkId(networkId);
			const { fundingCycle, metadata: fundingCycleMetadata } = await readContract(
				V2ContractName.JBController,
				'currentFundingCycleOf',
				[$project.projectId],
				cached
			);

			$project.fundingCycle = fundingCycle;
			$project.fundingCycleMetadata = fundingCycleMetadata;
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading current funding cycle';
			return;
		}

		try {
			checkNetworkId(networkId);
			const { fundingCycle, metadata: fundingCycleMetadata } = await readContract(
				V2ContractName.JBController,
				'queuedFundingCycleOf',
				[projectId],
				cached
			);

			$project.queuedFundingCycle = fundingCycle;
			$project.queuedFundingCycleMetadata = fundingCycleMetadata;
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading current funding cycle';
			return;
		}

		try {
			checkNetworkId(networkId);
			const splitResult = await readContract(
				V2ContractName.JBSplitsStore,
				'splitsOf',
				$project.projectId && $project?.fundingCycle?.configuration?.toString()
					? [
							$project.projectId.toHexString(),
							$project?.fundingCycle?.configuration?.toString(),
							ETH_PAYOUT_SPLIT_GROUP
					  ]
					: null,
				cached
			);

			checkNetworkId(networkId);
			$project.payoutSplits = splitResult.map((split) => {
				return {
					percent: split?.percent?.toNumber(),
					lockedUntil: split?.lockedUntil?.toNumber(),
					projectId: split?.projectId?.toHexString(),
					beneficiary: split?.beneficiary,
					allocator: split?.allocator,
					preferClaimed: split?.preferClaimed
				};
			});
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading payout splits';
			return;
		}

		try {
			checkNetworkId(networkId);
			const splitResult = await readContract(
				V2ContractName.JBSplitsStore,
				'splitsOf',
				[
					$project.projectId,
					$project.fundingCycle?.configuration?.toString(),
					RESERVED_TOKEN_SPLIT_GROUP
				],
				cached
			);

			checkNetworkId(networkId);
			$project.reservedTokensSplits = splitResult.map((split) => {
				return {
					percent: split?.percent?.toNumber(),
					lockedUntil: split?.lockedUntil?.toNumber(),
					projectId: split?.projectId?.toHexString(),
					beneficiary: split?.beneficiary,
					allocator: split?.allocator,
					preferClaimed: split?.preferClaimed
				};
			});
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading reserved tokens splits';
			return;
		}

		try {
			checkNetworkId(networkId);
			$project.tokenAddress = await readContract(
				V2ContractName.JBTokenStore,
				'tokenOf',
				$project.projectId ? [$project.projectId.toHexString()] : [],
				cached
			);
			if ($project.tokenAddress && $project.tokenAddress !== constants.AddressZero) {
				checkNetworkId(networkId);
				$project.tokenSymbol = await readContractByAddress(
					$project.tokenAddress,
					ERC20ContractAbi,
					'symbol',
					[],
					cached
				);
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading token address/symbol';
			return;
		}

		try {
			checkNetworkId(networkId);
			$project.totalTokenSupply = await readContract(V2ContractName.JBTokenStore, 'totalSupplyOf', [
				BigNumber.from($project.projectId).toHexString()
			]);
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading total token supply';
			return;
		}

		try {
			checkNetworkId(networkId);
			[$project.primaryTerminal] =
				(await readContract(
					V2ContractName.JBDirectory,
					'terminalsOf',
					[$project.projectId],
					cached
				)) || [];
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading primary terminal of project';
			return;
		}

		try {
			checkNetworkId(networkId);
			if ($project.primaryTerminal) {
				[$project.distributionLimit, $project.distributionLimitCurrency] = await readContract(
					V2ContractName.JBController,
					'distributionLimitOf',
					[
						$project.projectId,
						$project.fundingCycle?.configuration?.toString(),
						$project.primaryTerminal,
						ETH_TOKEN_ADDRESS
					],
					cached
				);
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading distributionLimit';
			return;
		}

		try {
			checkNetworkId(networkId);
			$project.primaryTerminalCurrentOverflow = BigNumber.from(0);
			if ($project.primaryTerminal && $project.primaryTerminal !== ethers.constants.AddressZero) {
				$project.primaryTerminalCurrentOverflow = await readContract(
					V2ContractName.JBSingleTokenPaymentTerminalStore,
					'currentOverflowOf',
					[$project.primaryTerminal, $project.projectId]
				);
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading owner of project';
			return;
		}

		try {
			checkNetworkId(networkId);
			if ($project.primaryTerminal) {
				$project.usedDistributionLimit = await readContract(
					V2ContractName.JBSingleTokenPaymentTerminalStore,
					'usedDistributionLimitOf',
					$project.primaryTerminal && $project.projectId && $project.fundingCycle?.number
						? [$project.primaryTerminal, $project.projectId, $project.fundingCycle?.number]
						: null,
					cached
				);
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			console.error(error);
			loading = false;
			issue = 'error reading usedDistributionLimitOf';
			return;
		}

		try {
			checkNetworkId(networkId);
			$project.reservedTokenBalance = await readContract(
				V2ContractName.JBController,
				'reservedTokenBalanceOf',
				$project.projectId && $project.fundingCycleMetadata.reservedRate
					? [$project.projectId, $project.fundingCycleMetadata.reservedRate]
					: [],
				cached
			);
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading reservedTokenBalanceOf';
			return;
		}

		try {
			checkNetworkId(networkId);
			const owner = await readContract(
				V2ContractName.JBProjects,
				'ownerOf',
				$project.projectId ? [BigNumber.from($project.projectId).toHexString()] : null,
				cached
			);

			$project.projectOwnerAddress = owner;
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading owner of project';
			return;
		}

		try {
			const isOwner =
				$connectedAccount &&
				$project.projectOwnerAddress &&
				$connectedAccount.toLowerCase() === $project.projectOwnerAddress.toLowerCase();
			for (const permission of [
				V2OperatorPermission.ISSUE,
				V2OperatorPermission.REDEEM,
				V2OperatorPermission.CLAIM
			]) {
				checkNetworkId(networkId);
				$project.hasIssueTicketsPermissions = $project.hasIssueTicketsPermissions || {};
				$project.hasIssueTicketsPermissions[permission] = $connectedAccount
					? isOwner ||
					  (await readContract(
							V2ContractName.JBOperatorStore,
							'hasPermissions',
							[$connectedAccount, $project.projectOwnerAddress, $project.projectId, [permission]],
							cached
					  ))
					: false;
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading permissions';
			return;
		}

		try {
			checkNetworkId(networkId);
			if ($project.primaryTerminal) {
				const ETHBalance = await readContract(
					V2ContractName.JBSingleTokenPaymentTerminalStore,
					'balanceOf',
					$project.primaryTerminal && $project.projectId
						? [$project.primaryTerminal, $project.projectId]
						: null,
					cached
				);
				// if ETH, no conversion necessary
				if (BigNumber.from($project.distributionLimitCurrency)?.eq(V2_CURRENCY_USD)) {
					const converter = await getCurrencyConverter();
					$project.balanceInDistributionLimitCurrency = converter.wadToCurrency(
						BigNumber.from(ETHBalance),
						V2CurrencyName(
							BigNumber.from($project.distributionLimitCurrency)?.toNumber() as V2CurrencyOption
						),
						V2CurrencyName(V2_CURRENCY_ETH as V2CurrencyOption)
					);
				} else {
					$project.balanceInDistributionLimitCurrency = BigNumber.from(ETHBalance);
				}
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			loading = false;
			console.error(error);
			issue = 'error reading balance of project';
			return;
		}

		try {
			if ($connectedAccount) {
				checkNetworkId(networkId);
				const tokenAddress = $project.tokenAddress;
				if (
					tokenAddress &&
					tokenAddress !== constants.AddressZero &&
					tokenAddress.toLowerCase() !== ETH_TOKEN_ADDRESS.toLowerCase()
				) {
					$userTokenBalance.claimedBalance = await readContractByAddress(
						$project.tokenAddress,
						ERC20ContractAbi,
						'balanceOf',
						[$connectedAccount]
					);
				}
				$userTokenBalance.unclaimedBalance = await readContract(
					V2ContractName.JBTokenStore,
					'unclaimedBalanceOf',
					[$connectedAccount, $project.projectId]
				);
				$userTokenBalance.totalBalance = await readContract(
					V2ContractName.JBTokenStore,
					'balanceOf',
					[$connectedAccount, $project.projectId]
				);
			}
		} catch (error) {
			if (error.errorCode === 'networkChanged') return fetchProject(cached, showLoadingUI);
			console.error(error);
			// loading = false;
			// issue = 'error reading token balance';
			// return;
		}

		console.log(`Project #${$project.projectId}`, $project);

		loading = false;
	}

	let count = 0;
	if (browser) {
		readNetwork.subscribe((network) => {
			const wasCached = cachedRender;
			fetchProject(cachedRender).then(() => {
				wasCached && count === 0 && setTimeout(fetchProject, 2000, false, false);
				count++;
			});
			cachedRender = false;
		});
	}
</script>

<svelte:head>
	{#if $project?.projectMetadata?.name}
		<title>{$project?.projectMetadata?.name} | Juicebox</title>
	{:else}
		<title>Project | Tiles</title>
	{/if}
</svelte:head>

<br />
<br />

<section>
	<div class="content">
		{#if issue}
			<Issue center>
				{issue}
			</Issue>
		{:else if loading}
			<div class="loading">
				<Loading height={800} />
			</div>
		{:else}
			<div>
				<Head />
				<!-- <Stats /> -->
				<Paid />
				<div class="row">
					<Details />
					<Activity />
				</div>
			</div>
		{/if}
	</div>
</section>
<br />

<Modal show={$modal} />

<style>
	section {
		display: flex;
		flex-direction: column;
		padding-bottom: 82px;
		background: transparent;
	}

	.content {
		max-width: 1080px;
		margin: 0px auto;
		padding: 20px;
		width: 100%;
	}

	.row {
		display: flex;
		flex-flow: row wrap;
		margin-left: -20px;
		margin-right: -20px;
		padding-bottom: 40px;
		row-gap: 0px;
	}
	.loading {
		display: block;
		height: 90vh;
		max-height: 1080px;
	}
</style>
