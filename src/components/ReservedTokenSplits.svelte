<script lang="ts">
	import { formatReservedRate } from '$utils/v2/math';
	import Icon from '$components/Icon.svelte';
	import InfoSpaceBetween from './InfoSpaceBetween.svelte';
	import PopInfo from './PopInfo.svelte';
	import SimpleSplits from './SimpleSplits.svelte';
	import Trans from './Trans.svelte';
	import { getTotalSplitsPercentage } from '$utils/v2/distributions';
	import type { BigNumber } from 'ethers';
	import { formatWad } from '$utils/formatNumber';
	import { getTruncatedAddress } from './Address.svelte';
	import type { V2FundingCycleMetadata } from '$models/v2/fundingCycle';
	import type { Split } from '$models/v2/splits';
	import DistributeTokens from '$dao/DistributeTokens.svelte';
	import { openModal } from './Modal.svelte';
	import OwnerCrown from './OwnerCrown.svelte';
	import { connectedAccount } from '$stores/web3';

	export let fundingCycleMetadata: V2FundingCycleMetadata;
	export let reservedTokensSplits: Split[];
	export let isPreview = false;

	export let reservedTokens: BigNumber;
	export let tokenSymbol: string | undefined = undefined;
	export let tokenAddress: string | undefined = undefined;
	export let hideHeader: boolean = false;
	export let projectOwnerAddress: string;

	$: totalSplitPercentageTokenSplits = getTotalSplitsPercentage(reservedTokensSplits || []);
</script>

{#if !hideHeader}
	<InfoSpaceBetween>
		<div slot="left">
			<div class="available">
				<p>{reservedTokens ? formatWad(reservedTokens) : '0'}</p>
				<PopInfo
					message="The amount of tokens this project has reserved. These tokens can be distributed to reserved token beneficiaries."
					><small class="upper">{tokenSymbol || 'Tokens'} reserved</small></PopInfo
				>
			</div>
		</div>
		<div slot="right">
			<button disabled={isPreview} on:click={() => openModal(DistributeTokens)}
				>Distribute {tokenSymbol || 'tokens'}</button
			>
		</div>
	</InfoSpaceBetween>
	{#if tokenAddress}
		<p class="contract-address">
			<Trans>{tokenSymbol || 'Tokens'} contract address {getTruncatedAddress(tokenAddress)}</Trans>
		</p>
	{/if}
{/if}
<h4>
	<PopInfo
		message="A project can reserve a percentage of tokens minted from every payment it receives. Reserved tokens can be distributed according to the allocation below at any time."
		>Reserved {tokenSymbol || 'tokens'}
		<span>({formatReservedRate(fundingCycleMetadata.reservedRate)}%)</span></PopInfo
	>
</h4>
{#each reservedTokensSplits || [] as split}
	<SimpleSplits {split} />
{/each}
{#if projectOwnerAddress}
	<InfoSpaceBetween>
		<p slot="left">
			{$connectedAccount === projectOwnerAddress
				? '(you)'
				: getTruncatedAddress(projectOwnerAddress)}
			<OwnerCrown />:
		</p>
		<p slot="right">{100 - totalSplitPercentageTokenSplits}%</p>
	</InfoSpaceBetween>
{/if}

<style>
	/* TODO these styles are a mess */
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

	span {
		margin-left: 10px;
		color: var(--text-primary);
	}
	.available {
		display: flex;
	}
	.available p {
		margin-right: 5px;
		color: var(--text-secondary);
	}
	.contract-address {
		margin: 0;
		margin-bottom: 20px;
		color: var(--text-secondary);
		font-size: 0.7rem;
	}
	.upper {
		text-transform: uppercase;
		font-weight: 300;
	}
</style>
