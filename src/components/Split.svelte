<script lang="ts">
	import type { Split } from '$models/v2/splits';
	import { formatDate } from '$utils/formatDate';
	import { formatSplitPercent } from '$utils/v2/math';
	import { BigNumber } from 'ethers';
	import Icon from '$components/Icon.svelte';

	export let split: Split;
	export let onRemove: (split: Split) => void = () => {};
	export let onClick: (split: Split) => void = () => {};

	let address =
		split.beneficiary && `${split.beneficiary.slice(0, 6)}...${split.beneficiary.slice(-6)}`;
</script>

<section on:click={() => onClick(split)}>
	<div role="button" on:click={() => onRemove(split)}>
		<Icon name="closeCircle" />
	</div>
	{#if split.projectId && split.projectId != '0x00'}
		<li>
			<p><b>Project ID:</b></p>
			{split.projectId}
		</li>
	{/if}
	{#if split.beneficiary}
		<li>
			<p><b>{split.projectId ? 'Token beneficiary:' : 'Address:'}</b></p>
			<p>{address}</p>
		</li>
	{/if}
	<li>
		<p><b>Percentage:</b></p>
		<p>{formatSplitPercent(BigNumber.from(split.percent))}%</p>
	</li>
	{#if split.lockedUntil}
		<li>
			<p><b>Locked:</b></p>
			<p>until {formatDate(split.lockedUntil * 1000, 'yyyy-MM-dd')}</p>
		</li>
	{/if}
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
		border-color: var(--text-header);
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

	div[role='button'] {
		position: absolute;
		top: 0;
		right: 5px;
		padding: 5px;
		cursor: pointer;
		color: var(--background-action-primary);
	}

	div[role='button']:hover {
		color: var(--icon-warn);
		transform: scale(1.2);
	}
</style>
