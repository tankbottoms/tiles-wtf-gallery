<script lang="ts">
	import { BigNumber } from 'ethers';
	import { getTotalSplitsPercentage } from '$utils/v2/distributions';
	import ETH from '$components/Ethereum.svelte';
	import Icon from '$components/Icon.svelte';
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import PopInfo from '$components/PopInfo.svelte';
	import { Currency, DistributionLimitType } from '$constants';
	import Money from '$components/Money.svelte';
	import SimpleSplits from '$components/SimpleSplits.svelte';
	import type { Split } from '$models/v2/splits';
	import { getEthBalance } from '$data/eth';
	import { getDistributionLimitType } from '$utils/v2/distributions';
	import { bind } from '$components/Modal.svelte';
	import DistributeFunds from '$dao/DistributeFunds.svelte';
	import OwnerCrown from './OwnerCrown.svelte';
	import { getTruncatedAddress } from './Address.svelte';
	import { modal } from '$stores';

	export let currency: Currency = Currency.ETH;
	export let distributionLimit: BigNumber = BigNumber.from(0);
	export let payoutSplits: Split[];
	// TODO: remove this when create has correct formatted amounts
	export let isPreview: boolean = false;

	export let balanceInDistributionLimitCurrency: BigNumber | undefined = undefined;
	export let usedDistributionLimit: BigNumber | undefined = undefined;
	export let projectOwnerAddress: string | undefined = undefined;
	export let hideHeader: boolean = false;

	let distributionLimitType: DistributionLimitType;
	let totalSplitPercentagePayoutSplits: number;
	let distributableAmount = BigNumber.from(0);
	let ownerBalance = BigNumber.from(0);

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
		return distributionLimit.mul(BigNumber.from(remainingPercent * 100)).div(100_00);
	}

	$: {
		distributionLimitType = getDistributionLimitType(distributionLimit);
		totalSplitPercentagePayoutSplits = getTotalSplitsPercentage(payoutSplits || []);
	}
</script>

{#if !hideHeader}
	<InfoSpaceBetween>
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
				<p><small><Money amount={usedDistributionLimit} /> distributed</small></p>
			{/if}
			{#if projectOwnerAddress}
				{#await getEthBalance(projectOwnerAddress)}
					<Icon name="loading" spin />
				{:then amount}
					<p><small><Money {amount} precision={2} /> <OwnerCrown /> owner balance</small></p>
				{/await}
			{:else}
				<p>
					<small
						><Money amount={ownerBalance} precision={2} />
						<OwnerCrown /> owner balance</small
					>
				</p>
			{/if}
		</div>
		<!-- TODO check when this is supposed to be disabled and not -->
		<div slot="right">
			<button
				on:click={() =>
					modal.set(
						bind(DistributeFunds, {
							totalFunds: distributableAmount
						})
					)}
				disabled={distributableAmount?.gte(distributionLimit)}>Distribute funds</button
			>
		</div>
	</InfoSpaceBetween>
{/if}
<h4>
	<PopInfo message="Available funds are distributed according to the payouts below."
		>Distribution splits</PopInfo
	>
</h4>
{#if payoutSplits.length === 0}
	<InfoSpaceBetween>
		<p slot="left">
			{isPreview ? '(you)' : getTruncatedAddress(projectOwnerAddress)}
			<OwnerCrown /> :
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
{#each payoutSplits as split}
	<SimpleSplits {split} {distributionLimitType} {distributionLimit} {currency} />
{/each}
{#if payoutSplits.length}
	<InfoSpaceBetween>
		<p slot="left">Project owner {isPreview ? '(you)' : ''} <OwnerCrown />:</p>
		<p slot="right">
			{100 - totalSplitPercentagePayoutSplits}%
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
	button {
		background: transparent;
		border: 1px solid var(--stroke-disabled);
		color: var(--text-disabled);
		cursor: pointer;
	}
	button:not(:disabled) {
		border: 1px solid var(--stroke-disabled);
		color: var(--text-primary);
	}
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
</style>
