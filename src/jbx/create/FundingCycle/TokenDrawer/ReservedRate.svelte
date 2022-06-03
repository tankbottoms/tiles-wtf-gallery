<script lang="ts">
	import type { BigNumberish } from 'ethers';
	import { DEFAULT_ISSUANCE_RATE } from '$jbx/utils/v2/math';
	import { formattedNum } from '$jbx/utils/formatNumber';
	import Button from '$jbx/components/Button.svelte';
	import Toggle from '$jbx/components/Toggle.svelte';
	import InfoBox from '$jbx/components/InfoBox.svelte';
	import Range from '$jbx/components/Range.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import DisplaySplit from '$jbx/components/Split.svelte';
	import { bind, openModal } from '$jbx/components/Modal.svelte';
	import type { Split } from '$jbx/models/v2/splits';
	import { getTotalSplitsPercentage } from '$jbx/utils/v2/distributions';

	import AddTokenReceiverModal from './AddTokenReceiverModal.svelte';

	export let reservedRate: number = 0;
	export let checked: boolean = reservedRate > 0;
	export let splits: Split[] = [];
	let totalSplitsPercentage = getTotalSplitsPercentage(splits);

	let rangeValue: number[] = [reservedRate];
	// let splits = reservedTokensSplits.get();

	// TODO these split functions are copied from FundingDrawer.svelte, think of nice abstraction
	function addSplit(split: Split) {
		splits = [...splits, split];
	}

	function editSplit(split: Split) {
		splits = splits.map((m, i) => {
			// TODO maybe make a derived hash of the split
			if (split.beneficiary === m.beneficiary || split.projectId === m.projectId) {
				return { ...m, ...split };
			} else {
				return m;
			}
		});
	}

	function removeSplit(split: Split) {
		splits = splits.filter(
			(s) => s.beneficiary !== split.beneficiary || s.projectId !== split.projectId
		);
	}

	// Reserved tokens received by project per ETH
	let initialReservedTokensPerEth: BigNumberish;
	// Tokens received by contributor's per ETH
	let initialIssuanceRate: BigNumberish;
	$: {
		totalSplitsPercentage = getTotalSplitsPercentage(splits || []);
		reservedRate = rangeValue[0];
		initialReservedTokensPerEth = DEFAULT_ISSUANCE_RATE * ((reservedRate ?? 0) / 100);
		initialIssuanceRate = DEFAULT_ISSUANCE_RATE - initialReservedTokensPerEth;
	}
</script>

<header>
	<Toggle id="reserved" bind:checked
		><h3>
			Reserved rate
			{#if !reservedRate}
				<span>(0%)</span>
			{/if}
		</h3></Toggle
	>
</header>
{#if checked}
	<Range bind:values={rangeValue} />
{/if}
<InfoBox
	info={`Initial issuance rate will be ${formattedNum(
		initialIssuanceRate
	)} tokens / ETH for contributors. ${formattedNum(
		initialReservedTokensPerEth
	)} tokens / 1 ETH will be reserved by the project.`}
/>
<br />
<p>
	Whenever someone pays your project, this percentage of tokens will be reserved and the rest will
	go to the payer.
</p>
<p>
	By default, these tokens are reserved for the project owner, but you can also allocate portions to
	other wallet addresses.
</p>
{#if reservedRate > 0}
	<h4>Reserved token allocation (optional)</h4>
	{#each splits as split, editingIndex}
		<DisplaySplit
			{split}
			onRemove={removeSplit}
			onClick={(split) => {
				openModal(
					bind(AddTokenReceiverModal, {
						reservedRate,
						editingIndex,
						onFinish: editSplit,
						split,
						splits
					})
				);
			}}
		/>
	{/each}
	<InfoSpaceBetween>
		<p slot="left" class:issue={totalSplitsPercentage > 100}>Total: {totalSplitsPercentage}%</p>
		<p slot="right">{100 - totalSplitsPercentage}% to project owner</p>
	</InfoSpaceBetween>
	{#if totalSplitsPercentage > 100}
		<p class="issue">The total of your splits is more than 100%.</p>
	{/if}
	<Button
		type="tertiary"
		size="md"
		on:click={() =>
			openModal(bind(AddTokenReceiverModal, { reservedRate, onFinish: addSplit, splits }))}
	>
		Add token receiver</Button
	>
	<p>
		Allocate a portion of your project's reserved tokens to other Ethereum wallets or Juicebox
		projects.
	</p>
{/if}

<style>
	p {
		color: var(--text-secondary);
	}

	.issue {
		color: var(--text-failure);
	}
</style>
