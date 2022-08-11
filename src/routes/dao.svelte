<!-- <script lang="ts" context="module">
	import { browser } from '$app/env';
	export const hydrate = true;
	export const router = browser;
	export const prerender = true;
</script>

<script lang="ts">
	/*
	TODO: Bring in the Juicebox Project UX here
	*/

	import type { V2CurrencyOption } from '$juicebox/models/v2/currencyOption';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';

	import { BigNumber } from 'ethers';
	import { modal } from '$stores';
	import { onMount, setContext } from 'svelte';
	import Button from '$juicebox/components/Button.svelte';
	import Details from '$juicebox/components/project/Details.svelte';
	import Head from '$jbx/project/Head.svelte';
	import Issue from '$jbx/components/Issue.svelte';
	import Modal, { openModal } from '$jbx/components/Modal.svelte';
	import Paid from '$jbx/project/Paid.svelte';
	import Store from '$jbx/utils/Store';

	import { page } from '$app/stores';
	import { contracts, readContract, readContractByAddress } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import { ETH_PAYOUT_SPLIT_GROUP } from '$jbx/constants/v2/splits';
	import { ETH_TOKEN_ADDRESS } from '$jbx/constants/v2/juiceboxTokens';
	import { getProjects, getProjectMetadata } from '$jbx/data/project';
	import Activity from '$jbx/project/Activity.svelte';
	import NextSteps from '$jbx/project/NextSteps.svelte';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$jbx/constants/v2/metadataDomain';
	import Loading from '$jbx/components/Loading.svelte';
	import { Currency } from '$jbx/constants';
	import { getCurrencyConverter } from '$jbx/data/currency';
	import { V2CurrencyName, V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$jbx/utils/v2/currency';
	import ERC20ContractAbi from '$jbx/constants/ERC20ContractAbi';
	import { chainId, provider, readNetwork } from '$stores/web3';

	let project = new Store<V2ProjectContextType>({} as any);

	setContext('PROJECT', project);

	let loading = true;
	let issue: string | false = false;
	let cached = false;
	let cachedRender = true;

	const isNewDeploy = browser ? $page.url.searchParams.get('newDeploy') : false;

	function checkNetworkId(_chainId: number) {
		if ($chainId !== _chainId) throw Error('aborting because network was changed');
	}

	async function fetchProject(cached = false, showLoadingUI = true) {
		if (!browser) return;

		const projectId = BigNumber.from($chainId === 4 ? 98 : 41);

		try {
			const data = await getProjects({
				projectId,
				keys: ['createdAt', 'totalPaid']
			});
			$project.totalVolume = data[0].totalPaid;
			$project.createdAt = data[0].createdAt;
		} catch (e) {
			console.error('error fetching project total paid');
			console.error(e);
		}

		try {
			if (showLoadingUI) loading = true;
			let networkId = Number($readNetwork.id);
			$project.projectId = projectId;

			const metadataCID = await readContract(
				V2ContractName.JBProjects,
				'metadataContentOf',
				[$project.projectId, JUICEBOX_MONEY_METADATA_DOMAIN],
				cached
			);

			checkNetworkId(networkId);
			const metadata = await getProjectMetadata(metadataCID);
			$project.projectMetadata = metadata;

			/****/
			checkNetworkId(networkId);
			const { fundingCycle, metadata: fundingCycleMetadata } = await readContract(
				V2ContractName.JBController,
				'currentFundingCycleOf',
				[$project.projectId],
				cached
			);
			$project.fundingCycle = fundingCycle;
			$project.fundingCycleMetadata = fundingCycleMetadata;

			/****/
			checkNetworkId(networkId);
			const splitResult = await readContract(
				V2ContractName.JBSplitsStore,
				'splitsOf',
				$project.projectId && $project?.fundingCycle?.[1]?.toString()
					? [
							$project.projectId.toHexString(),
							$project?.fundingCycle?.configuration?.toString(),
							ETH_PAYOUT_SPLIT_GROUP
					  ]
					: [],
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

			/****/
			checkNetworkId(networkId);
			try {
				if (!BigNumber.from($project.tokenAddress || 0).eq(0)) {
					$project.tokenAddress = await readContract(
						V2ContractName.JBTokenStore,
						'tokenOf',
						$project.projectId ? [$project.projectId.toHexString()] : [],
						cached
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
						: [],
					cached
				)) || [];

			/****/
			checkNetworkId(networkId);
			[$project.distributionLimit, $project.distributionLimitCurrency] = await readContract(
				V2ContractName.JBController,
				'distributionLimitOf',
				[
					$project.projectId,
					$project.fundingCycle?.[0]?.toString(),
					$project.primaryTerminal,
					ETH_TOKEN_ADDRESS
				],
				cached
			);

			/****/
			checkNetworkId(networkId);
			$project.usedDistributionLimit = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'usedDistributionLimitOf',
				$project.primaryTerminal && $project.projectId && $project.fundingCycle?.[0]
					? [$project.primaryTerminal, $project.projectId, $project.fundingCycle?.[0]]
					: null,
				cached
			);

			/****/
			checkNetworkId(networkId);
			$project.reservedTokenBalance = await readContract(
				V2ContractName.JBController,
				'reservedTokenBalanceOf',
				$project.projectId && $project.fundingCycleMetadata?.[1]
					? [$project.projectId, $project.fundingCycleMetadata?.[1]]
					: [],
				cached
			);

			/****/
			checkNetworkId(networkId);
			const owner = await readContract(
				V2ContractName.JBProjects,
				'ownerOf',
				$project.projectId ? [BigNumber.from($project.projectId).toHexString()] : null,
				cached
			);

			$project.projectOwnerAddress = owner;

			checkNetworkId(networkId);
			const ETHBalance = await readContract(
				V2ContractName.JBSingleTokenPaymentTerminalStore,
				'balanceOf',
				$project.primaryTerminal && $project.projectId
					? [$project.primaryTerminal, $project.projectId]
					: null,
				cached
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

	let count = 0;
	if (browser) {
		let firstTime = true;
		provider.subscribe(($provider) => {
			if (!$provider || !firstTime) return;
			firstTime = false;
			readNetwork.subscribe((network) => {
				const wasCached = cachedRender;
				fetchProject(cachedRender).then(() => {
					wasCached && count === 0 && setTimeout(fetchProject, 2000, false, false);
					count++;
				});
				cachedRender = false;
			});
		});
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
		{:else if loading || !$provider}
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
</style> -->
