<script lang="ts">
	import { getContext } from 'svelte';
	import { BigNumber } from '@ethersproject/bignumber';
	import { connectedAccount } from '$stores/web3';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { getTotalSplitsPercentage } from '$juicebox/utils/v2/distributions';
	import ETH from './Ethereum.svelte';
	import Icon from './Icon.svelte';
	import InfoSpaceBetween from './InfoSpaceBetween.svelte';
	import PopInfo from './PopInfo.svelte';
	import { DistributionLimitType } from '$juicebox/constants';
	import Money from './Money.svelte';
	import SimpleSplits from './SimpleSplits.svelte';
	import type { Split } from '$juicebox/models/v2/splits';
	import { getEthBalance } from '$juicebox/data/eth';
	import { getDistributionLimitType } from '$juicebox/utils/v2/distributions';
	import { bind } from './Modal.svelte';
	import DistributeFunds from '$juicebox/components/project/DistributeFunds.svelte';
	import OwnerCrown from './OwnerCrown.svelte';
	import { modal } from '$stores';
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import EnsOrAddress from './EnsOrAddress.svelte';
	import Button from './Button.svelte';
	import { formattedNum } from '$juicebox/utils/formatNumber';

	export let currency: BigNumber = BigNumber.from(V2_CURRENCY_ETH);
	export let distributionLimit: BigNumber = BigNumber.from(0);
	export let payoutSplits: Split[];
	// TODO: remove this when create has correct formatted amounts
	export let isPreview: boolean = !!getContext('IS_PREVIEW');

	export let balanceInDistributionLimitCurrency: BigNumber | undefined = undefined;
	export let usedDistributionLimit: BigNumber | undefined = undefined;
	export let projectOwnerAddress: string | undefined = undefined;
	export let hideHeader: boolean = false;

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	const stackLayoutBreakpoint = 500;

	let distributionLimitType: DistributionLimitType;
	let totalSplitPercentagePayoutSplits: number;
	let distributableAmount = BigNumber.from(0);
	let ownerBalance = BigNumber.from(0);
	let drawerShown = false;

	if (usedDistributionLimit) {
		const untapped = distributionLimit.sub(usedDistributionLimit);
		distributableAmount = balanceInDistributionLimitCurrency?.gt(untapped)
			? untapped
			: balanceInDistributionLimitCurrency;
	}

	if (projectOwnerAddress) {
		getEthBalance(projectOwnerAddress).then((balance) => {
			ownerBalance = balance;
		});
	}

	function getOwnerAmountPayoutSplits(summedSplitsPercent: number) {
		const remainingPercent = 100 - summedSplitsPercent;
		return distributionLimit
			.mul(BigNumber.from(Math.floor(remainingPercent * 1_000_000)))
			.div(100_000_000);
	}

	$: {
		distributionLimitType = getDistributionLimitType(distributionLimit);
		totalSplitPercentagePayoutSplits = getTotalSplitsPercentage(payoutSplits || []);
	}
</script>

{#if !hideHeader}
	<InfoSpaceBetween stack={window?.innerWidth < stackLayoutBreakpoint}>
		<div slot="left" class="distribution-splits">
			<div class="available">
				<p><Money {currency} amount={distributableAmount} /></p>
				<PopInfo
					message="The funds available to distribution for this funding cycle (before the 2.5% JBX fee is subtracted). This number won't roll over to the next funding cycle, so funds should be distributed before this funding cycle ends."
					><small class="upper">available</small></PopInfo
				>
			</div>
			{#if distributionLimitType === DistributionLimitType.Infinite}
				<p><small><ETH />0/NO LIMIT distributed</small></p>
			{:else if distributionLimitType === DistributionLimitType.Specific}
				<p>
					<small
						><Money {currency} amount={BigNumber.from(0)} />/<Money
							{currency}
							amount={distributionLimit}
						/>
					</small>
				</p>
			{:else}
				<p>
					<small><Money amount={usedDistributionLimit ?? BigNumber.from(0)} /> distributed</small>
				</p>
			{/if}
			{#if projectOwnerAddress}
				{#await getEthBalance(projectOwnerAddress)}
					<Icon name="loading" spin />
				{:then amount}
					<p>
						<small
							><Money amount={amount ?? BigNumber.from(0)} precision={2} />
							<OwnerCrown /> owner balance</small
						>
					</p>
				{/await}
			{:else}
				<p>
					<small
						><Money amount={ownerBalance ?? BigNumber.from(0)} precision={2} />
						<OwnerCrown /> owner balance</small
					>
				</p>
			{/if}
		</div>
		<!-- TODO check when this is supposed to be disabled and not -->
		<div slot="right">
			<Button
				type="secondary"
				size="sm"
				on:click={() =>
					modal.set(
						bind(DistributeFunds, {
							totalFunds: distributableAmount
						})
					)}
				disabled={isPreview}>Distribute funds</Button
			>
		</div>
	</InfoSpaceBetween>
{/if}
<InfoSpaceBetween stack={window?.innerWidth < stackLayoutBreakpoint}>
	<h4 slot="left">
		<PopInfo message="Available funds are distributed according to the payouts below.">
			Distribution splits
		</PopInfo>
	</h4>
	<div slot="right" style="margin-bottom: 20px" />
</InfoSpaceBetween>
{#each payoutSplits as split}
	<SimpleSplits
		{split}
		{distributionLimitType}
		{distributionLimit}
		{currency}
		crown={projectOwnerAddress?.toLowerCase() === split.beneficiary?.toLowerCase()}
	/>
{:else}
	{#if isPreview}
		<InfoSpaceBetween>
			<p slot="left">
				Project owner (you) <OwnerCrown />:
			</p>
			<p slot="right">
				{#if distributionLimitType !== DistributionLimitType.Infinite}
					100%
					{#if distributionLimitType === DistributionLimitType.Specific}
						(<Money {currency} amount={distributionLimit} precision={2} />)
					{/if}
				{/if}
			</p>
		</InfoSpaceBetween>
	{/if}
{/each}
{#if payoutSplits.length && 100 - totalSplitPercentagePayoutSplits > 0.011}
	<InfoSpaceBetween>
		<p slot="left">
			<span class="flex">
				{#if isPreview || projectOwnerAddress === $connectedAccount}
					Project owner (you)
				{:else}
					<EnsOrAddress address={projectOwnerAddress} />
				{/if}
				<OwnerCrown />:
			</span>
		</p>
		<p slot="right">
			{formattedNum(100 - totalSplitPercentagePayoutSplits, { precision: 2 })}%
			{#if distributionLimitType === DistributionLimitType.Specific}
				(<Money
					{currency}
					amount={getOwnerAmountPayoutSplits(totalSplitPercentagePayoutSplits)}
					precision={2}
				/>)
			{/if}
		</p>
	</InfoSpaceBetween>
{/if}

<style>
	div[slot='left'] {
		display: flex;
		flex-direction: column;
		font-weight: 500;
	}

	p[slot='left'],
	p[slot='right'] {
		color: var(--text-primary);
		font-weight: 400;
	}

	h4 {
		margin-right: 5px;
		margin-bottom: 5px;
		color: var(--text-header);
	}

	p {
		margin: 0;
		color: var(--text-secondary);
	}
	.available {
		display: flex;
	}
	.upper {
		text-transform: uppercase;
		font-weight: 300;
	}
	.available p {
		margin-right: 5px;
		color: var(--text-secondary);
	}

	@media (max-width: 768px) {
		div[slot='right'] {
			margin: 5px 0px;
		}
	}

	@media (max-width: 350px) {
		div[slot='right'] {
			margin: 15px 0px;
		}
	}
</style>
