<script lang="ts" context="module">
	import { browser } from '$app/env';
	export const hydrate = true;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	import { BigNumber } from 'ethers';
	import { onMount, setContext } from 'svelte';
	import { modal } from '$stores';
	import Details from '$dao/Details.svelte';
	import Head from '$dao/Head.svelte';
	import Paid from '$dao/Paid.svelte';
	import Store from '$utils/Store';

	import type { V2ProjectContextType } from '$models/project-type';
	import { readContract, readContractByAddress } from '$utils/web3/contractReader';
	import { V2ContractName } from '$models/v2/contracts';
	import { ETH_PAYOUT_SPLIT_GROUP } from '$constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$constants/v2/juiceboxTokens';
	import { getProjectMetadata } from '$data/project';
	import Activity from '$dao/Activity.svelte';
	import Modal from '$components/Modal.svelte';
	import Loading from '$components/Loading.svelte';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$constants/v2/metadataDomain';
	import { Currency } from '$constants';
	import { getCurrencyConverter } from '$data/currency';
	import { V2CurrencyName, V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$utils/v2/currency';
	import type { V2CurrencyOption } from '$models/v2/currencyOption';
	import ERC20ContractAbi from '$constants/ERC20ContractAbi';

	let project = new Store<V2ProjectContextType>({} as any);

	setContext('PROJECT', project);

	let loading = true;
	let issue: string | false = false;

	onMount(async () => {
		try {
			// TODO this is where we set the projectID for tiles v2
			$project.projectId = BigNumber.from(98);
			const metadataCID = await readContract(V2ContractName.JBProjects, 'metadataContentOf', [
				$project.projectId,
				JUICEBOX_MONEY_METADATA_DOMAIN
			]);

			const metadata = await getProjectMetadata(metadataCID);
			$project.projectMetadata = metadata;

			/****/
			[$project.fundingCycle, $project.fundingCycleMetadata] = await readContract(
				V2ContractName.JBController,
				'currentFundingCycleOf',
				[$project.projectId]
			);

			/****/
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

			const terminals =
				(await readContract(
					V2ContractName.JBDirectory,
					'terminalsOf',
					$project.projectId ? [$project.projectId.toHexString()] : []
				)) || [];

			$project.primaryTerminal = terminals?.[0];

			/****/
			try {
				$project.tokenAddress = await readContract(
					V2ContractName.JBTokenStore,
					'tokenOf',
					$project.projectId ? [$project.projectId.toHexString()] : []
				);

				$project.tokenSymbol = await readContractByAddress(
					$project.tokenAddress,
					ERC20ContractAbi,
					'symbol'
				);
			} catch (error) {}

			/****/
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
			[$project.distributionLimit, $project.distributionLimitCurrency] = await readContract(
				V2ContractName.JBController,
				'distributionLimitOf',
				$project.projectId &&
					$project.fundingCycle?.configuration?.toString() &&
					$project.primaryTerminal
					? [
							$project.projectId,
							$project.fundingCycle?.configuration?.toString(),
							$project.primaryTerminal,
							ETH_TOKEN_ADDRESS
					  ]
					: []
			);

			/****/
			$project.usedDistributionLimit = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'usedDistributionLimitOf',
				$project.primaryTerminal && $project.projectId && $project.fundingCycle?.number
					? [$project.primaryTerminal, $project.projectId, $project.fundingCycle?.number]
					: null
			);

			/****/

			$project.reservedTokenBalance = await readContract(
				V2ContractName.JBController,
				'reservedTokenBalanceOf',
				$project.projectId && $project.fundingCycleMetadata.reservedRate
					? [$project.projectId, $project.fundingCycleMetadata.reservedRate]
					: []
			);

			/****/

			const owner = await readContract(
				V2ContractName.JBProjects,
				'ownerOf',
				$project.projectId ? [BigNumber.from($project.projectId).toHexString()] : null
			);

			$project.projectOwnerAddress = owner;

			const ETHBalance = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'balanceOf',
				$project.primaryTerminal && $project.projectId
					? [$project.primaryTerminal, $project.projectId]
					: null
			);

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

			loading = false;
		} catch (e) {
			console.log(e);
			issue = e.message;
		}
	});
</script>

<section>
	<div class="content">
		{#if issue}
			{issue}
		{:else if loading}
			<Loading height={500} />
		{:else}
			<div>
				<Head />
				<Paid />
				<div class="row">
					<Details />
					<Activity />
				</div>
			</div>
			<div style="text-align: center; padding: 20px;">
				<button type="link" on:click={() => window.scrollTo(0, 0)}>Back to top</button>
			</div>
		{/if}
	</div>
</section>
<Modal show={$modal} />

<style>
	section {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		height: 100%;
		background: transparent;
	}

	.content {
		height: 100%;
		max-width: 1080px;
		margin: 0px auto;
		padding-top: 40px;
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
