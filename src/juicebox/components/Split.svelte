<script lang="ts">
	import type { Split } from '$juicebox/models/v2/splits';
	import { formatDate } from '$juicebox/utils/formatDate';
	import { SPLITS_TOTAL_PERCENT } from '$juicebox/utils/v2/math';
	import { BigNumber } from 'ethers';
	import CloseButton from './CloseButton.svelte';
	import EnsOrAddress from './EnsOrAddress.svelte';
	import EthAmount from './ETHAmount.svelte';
	import OwnerCrown from './OwnerCrown.svelte';

	export let split: Split;
	export let distributionLimit: BigNumber = undefined;
	export let showAmount = false;
	export let disabled = false;
	export let onRemove: (split: Split) => void = () => {};
	export let onClick: (split: Split) => void = () => {};
	export let isOwner = false;

	function handleClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const tree = [target, target.parentElement, target.parentElement.parentElement];
		for (const elm of tree) {
			if (elm.classList.contains('wrap')) {
				onClick(split);
			}
		}
	}

	let address = split.beneficiary;
</script>

<section>
	{#if !disabled}
		<div class="close-wrapper">
			<CloseButton on:click={() => onRemove(split)} />
		</div>
	{/if}

	<div class="wrap" on:click={disabled ? null : handleClick}>
		{#if split.projectId && split.projectId != '0x00'}
			<li>
				<p><b>Project ID:</b></p>
				{split.projectId}
			</li>
		{/if}
		{#if split.beneficiary}
			<li>
				<p><b>{split.projectId || isOwner ? 'Token beneficiary:' : 'Address:'}</b></p>
				<p>
					{#if isOwner}
						Project Owner <OwnerCrown />
					{:else}
						<EnsOrAddress {address} />
					{/if}
				</p>
			</li>
		{/if}
		<li>
			<p><b>Percentage:</b></p>
			<p>
				{#if showAmount && distributionLimit}
					<EthAmount
						amount={BigNumber.from(split.percent).mul(distributionLimit).div(SPLITS_TOTAL_PERCENT)}
						precision={2}
					/>
				{/if}
				{Number(
					(
						BigNumber.from(split.percent)
							.mul(10 ** 12)
							.div(SPLITS_TOTAL_PERCENT)
							.toNumber() /
						10 ** 10
					).toFixed(2)
				)}%
			</p>
		</li>
		{#if split.lockedUntil}
			<li>
				<p><b>Locked:</b></p>
				<p>until {formatDate(split.lockedUntil * 1000, 'yyyy-MM-dd')}</p>
			</li>
		{/if}
	</div>
</section>

<style>
	section {
		position: relative;
		margin-bottom: 10px;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		color: var(--text-primary);
		padding: 5px 11px;
		transition: all 0.3s;
		width: 100%;
	}
	section:hover {
		cursor: pointer;
	}
	li {
		list-style: none;
		/* display: flex; */
		/* max-width: 400px; */
	}

	p {
		display: inline-block;
		font-weight: 300;
		font-size: 14px;
		margin: 5px 0px;
	}
	p:first-of-type {
		width: 200px;
	}

	:global(.close-wrapper .close) {
		top: 0.5rem;
		right: 0.5rem;
		transform: scale(0.8);
	}
</style>
