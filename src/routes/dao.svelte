<script lang="ts" context="module">
	import { browser } from '$app/env';
	export const hydrate = true;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import { BigNumber } from 'ethers';
	import { modal } from '$stores';
	import { onMount, setContext } from 'svelte';
	import Button from '$jbx/components/Button.svelte';
	import Details from '$jbx/project/Details.svelte';
	import Head from '$jbx/project/Head.svelte';
	import Issue from '$jbx/components/Issue.svelte';
	import Modal, { openModal } from '$jbx/components/Modal.svelte';
	import Paid from '$jbx/project/Paid.svelte';
	import Store from '$jbx/utils/Store';

	import { page } from '$app/stores';
	import type { V2ProjectContextType } from '$jbx/create/stores';
	import { contracts, readContract, readContractByAddress } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import { ETH_PAYOUT_SPLIT_GROUP } from '$jbx/constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$jbx/constants/v2/juiceboxTokens';
	import { getProjectMetadata } from '$jbx/data/project';
	import Activity from '$jbx/project/Activity.svelte';
	import NextSteps from '$jbx/project/NextSteps.svelte';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$jbx/constants/v2/metadataDomain';
	import Loading from '$jbx/components/Loading.svelte';
	import { Currency } from '$jbx/constants';
	import { getCurrencyConverter } from '$jbx/data/currency';
	import { V2CurrencyName, V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$jbx/utils/v2/currency';
	import type { V2CurrencyOption } from '$jbx/models/v2/currencyOption';
	import ERC20ContractAbi from '$jbx/constants/ERC20ContractAbi';
	import { chainId, readNetwork } from '$stores/web3';

	let project = new Store<V2ProjectContextType>({} as any);

	setContext('PROJECT', project);

	let loading = true;
	let issue: string | false = false;

	const isNewDeploy = browser ? $page.url.searchParams.get('newDeploy') : false;

	function checkNetworkId(_chainId: number) {
		if ($chainId !== _chainId) throw Error('aborting because network was changed');
	}

	async function fetchProject() {
		if (!browser) return;
		try {
			loading = true;
			let networkId = Number($readNetwork.id);
			$project.projectId = BigNumber.from($chainId === 4 ? 98 : 1);

			const metadataCID = await readContract(V2ContractName.JBProjects, 'metadataContentOf', [
				$project.projectId,
				JUICEBOX_MONEY_METADATA_DOMAIN
			]);

			checkNetworkId(networkId);
			const metadata = await getProjectMetadata(metadataCID);
			$project.projectMetadata = metadata;

			/****/
			checkNetworkId(networkId);
			[$project.fundingCycle, $project.fundingCycleMetadata] = await readContract(
				V2ContractName.JBController,
				'currentFundingCycleOf',
				[$project.projectId]
			);

			/****/
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
					: null
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

			/****/
			checkNetworkId(networkId);
			try {
				if (!BigNumber.from($project.tokenAddress || 0).eq(0)) {
					$project.tokenAddress = await readContract(
						V2ContractName.JBTokenStore,
						'tokenOf',
						$project.projectId ? [$project.projectId.toHexString()] : []
					);

					checkNetworkId(networkId);
					$project.tokenSymbol = await readContractByAddress(
						$project.tokenAddress,
						ERC20ContractAbi,
						'symbol'
					);
				}
			} catch (error) {
				if (!error?.message?.startsWith('aborting')) {
					throw error;
				}
			}

			/****/
			checkNetworkId(networkId);
			$project.primaryTerminal =
				(await readContract(
					V2ContractName.JBDirectory,
					'primaryTerminalOf',
					$project.projectId
						? [
								$project.projectId.toHexString(),
								$project.tokenAddress || '0x0000000000000000000000000000000000000000'
						  ]
						: []
				)) || [];

			/****/
			checkNetworkId(networkId);
			const value = await readContract(
				V2ContractName.JBSplitsStore,
				'splitsOf',
				$project.projectId && $project.fundingCycle?.configuration?.toString()
					? [
							$project.projectId.toHexString(),
							$project.fundingCycle?.configuration?.toString(),
							ETH_PAYOUT_SPLIT_GROUP
					  ]
					: null
			);

			checkNetworkId(networkId);
			$project.payoutSplits = value.map((split) => {
				return {
					percent: split.percent.toNumber(),
					lockedUntil: split.lockedUntil.toNumber(),
					projectId: split.projectId.toHexString(),
					beneficiary: split.beneficiary,
					allocator: split.allocator,
					preferClaimed: split.preferClaimed
				};
			});

			/****/
			checkNetworkId(networkId);
			[$project.distributionLimit, $project.distributionLimitCurrency] = await readContract(
				V2ContractName.JBController,
				'distributionLimitOf',
				[
					$project.projectId,
					$project.fundingCycle?.configuration?.toString(),
					$project.primaryTerminal,
					ETH_TOKEN_ADDRESS
				]
			);

			/****/
			checkNetworkId(networkId);
			$project.usedDistributionLimit = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'usedDistributionLimitOf',
				$project.primaryTerminal && $project.projectId && $project.fundingCycle?.number
					? [$project.primaryTerminal, $project.projectId, $project.fundingCycle?.number]
					: null
			);

			/****/
			checkNetworkId(networkId);
			$project.reservedTokenBalance = await readContract(
				V2ContractName.JBController,
				'reservedTokenBalanceOf',
				$project.projectId && $project.fundingCycleMetadata.reservedRate
					? [$project.projectId, $project.fundingCycleMetadata.reservedRate]
					: []
			);

			/****/
			checkNetworkId(networkId);
			const owner = await readContract(
				V2ContractName.JBProjects,
				'ownerOf',
				$project.projectId ? [BigNumber.from($project.projectId).toHexString()] : null
			);

			$project.projectOwnerAddress = owner;

			checkNetworkId(networkId);
			const ETHBalance = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'balanceOf',
				$project.primaryTerminal && $project.projectId
					? [$project.primaryTerminal, $project.projectId]
					: null
			);
			checkNetworkId(networkId);
			// if ETH, no conversion necessary
			if (BigNumber.from($project.distributionLimitCurrency)?.eq(V2_CURRENCY_USD)) {
				const converter = getCurrencyConverter();
				$project.balanceInDistributionLimitCurrency = converter.wadToCurrency(
					BigNumber.from(ETHBalance),
					V2CurrencyName(
						BigNumber.from($project.distributionLimitCurrency)?.toNumber() as V2CurrencyOption
					),
					V2CurrencyName(Currency.ETH as V2CurrencyOption)
				);
			} else {
				$project.balanceInDistributionLimitCurrency = BigNumber.from(ETHBalance);
			}
			checkNetworkId(networkId);
			loading = false;
		} catch (e) {
			if (!e?.message?.startsWith('aborting')) {
				console.log(e);
				issue = e.message;
			}
		}

		// TODO probably need to go through above and figure out appropiate error messages on
		// a per stage basis
		if (isNewDeploy) {
			openModal(NextSteps);
		}
	}

	onMount(fetchProject);

	$: if ($readNetwork) {
		fetchProject();
	}
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&amp;display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section>
	<div class="content">
		{#if issue}
			<Issue center>
				{issue}
			</Issue>
		{:else if loading}
			<Loading height={500} />
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
			<div style="text-align: center; padding: 20px;">
				<Button type="link" on:click={() => window.scrollTo(0, 0)}>Back to top</Button>
			</div>
		{/if}
	</div>
</section>
<Modal show={$modal} />

<style>
	section {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: transparent;
		font-family: 'DM Mono', monospace;
		font-size: 13px;
	}

	section :global(h1),
	section :global(h2),
	section :global(h3),
	section :global(h4),
	section :global(h5),
	section :global(h6) {
		margin: 0.5rem 0;
		font-weight: normal;
		font-size: 1em;
	}

	section :global(*) {
		box-sizing: border-box;
	}

	section :global(a) {
		color: var(--text-action-primary);
		text-decoration: none;
	}

	.content {
		height: 100%;
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
</style>
