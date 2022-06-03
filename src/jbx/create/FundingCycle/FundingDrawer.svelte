<script lang="ts">
	import type Store from '$jbx/utils/Store';
	import AddSplitModal from './AddSplitModal.svelte';
	import AlertText from '$jbx/components/AlertText.svelte';
	import HeavyBorderBox from '$jbx/components/HeavyBorderBox.svelte';
	import Input from './FundingCycleInput.svelte';
	import Toggle from '$jbx/components/Toggle.svelte';
	import Button from '$jbx/components/Button.svelte';
	import CurrencyInput from '$jbx/components/CurrencyInput.svelte';
	import DisplaySplit from '$jbx/components/Split.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { bind, openModal } from '$jbx/components/Modal.svelte';
	import { BigNumber } from 'ethers';
	import { MAX_DISTRIBUTION_LIMIT } from '$jbx/utils/v2/math';
	import { Currency, CurrencyValue, DistributionLimitType } from '$jbx/constants';
	import { getContext, onMount } from 'svelte';
	import type { Split } from '$jbx/models/v2/splits';
	import { getDistributionLimitType, getTotalSplitsPercentage } from '$jbx/utils/v2/distributions';
	import { formatWad } from '$jbx/utils/formatNumber';
	import Dropdown from '$jbx/components/Dropdown.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let dirty = getContext('SHOW_DIRTY') as {
		showDirty: Store<boolean>;
		check: (arg1: any, arg2: any) => void;
	};

	export let close: () => void;

	let fundingCyclesActive = false;
	let duration: BigNumber = BigNumber.from(0);
	let distributionLimitType: DistributionLimitType = DistributionLimitType.None;
	let distributionLimit: BigNumber = BigNumber.from(0);
	let distributionLimitCurrency: Currency;
	let splits = $project.payoutSplits;
	let totalSplitsPercentage = getTotalSplitsPercentage(splits);

	let initialState: {};

	onMount(() => {
		if ($project.fundingCycle.duration.gt(0)) {
			duration = $project.fundingCycle.duration;
			fundingCyclesActive = true;
		}
		distributionLimit = $project.distributionLimit;
		distributionLimitType = getDistributionLimitType($project.distributionLimit);
		distributionLimitCurrency = $project.distributionLimitCurrency;

		initialState = {
			duration,
			distributionLimit,
			distributionLimitType,
			distributionLimitCurrency
		};
	});

	$: {
		switch (distributionLimitType) {
			case DistributionLimitType.None:
				distributionLimit = BigNumber.from(0);
				break;
			case DistributionLimitType.Infinite:
				distributionLimit = BigNumber.from(MAX_DISTRIBUTION_LIMIT);
				break;
			// Handled by the eventHandler setValue
			case DistributionLimitType.Specific:
				break;
		}
		totalSplitsPercentage = getTotalSplitsPercentage(splits || []);
	}

	$: {
		dirty?.check(initialState, {
			duration,
			distributionLimit,
			distributionLimitType,
			distributionLimitCurrency
		});
	}

	function setValue(e: any) {
		distributionLimit = e.detail.value;
	}

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

	function saveFundingConfig() {
		project.update((current) => ({
			...current,
			fundingCycle: {
				...current.fundingCycle,
				duration
			},
			distributionLimit,
			distributionLimitCurrency: CurrencyValue[distributionLimitCurrency].toNumber(),
			payoutSplits: splits
		}));
		close();
	}
</script>

<slot name="header" />
<HeavyBorderBox>
	<Toggle bind:checked={fundingCyclesActive}><h3>Funding cycles</h3></Toggle>
	<p>Set the length of your funding cycles, which can enable:</p>
	<ol>
		<li>
			<b>Recurring funding cycles</b> (for example, distribute $30,000 from your project's treasury every
			14 days).
		</li>
		<li>
			A <b>discount rate</b> to automatically reduce the issuance rate of your project's token (tokens/ETH)
			each new funding cycle.
		</li>
	</ol>
	<AlertText>
		With no funding cycles, the project's owner can start a new funding cycle (Funding Cycle #2)
		on-demand.
		<a
			href="https://info.juicebox.money/docs/protocol/learn/risks"
			target="_blank"
			rel="noopener noreferrer">Learn more.</a
		>
	</AlertText>
	{#if fundingCyclesActive}
		<Input bind:value={duration} />
	{/if}
</HeavyBorderBox>
<HeavyBorderBox>
	<h3>Distribution limit</h3>
	<p>Set the amount of funds you'd like to distribute from your treasury each funding cycle.</p>

	<p>
		Any treasury funds within the distribution limit can be paid out to destinations that you can
		define as <b>splits</b>.
		<a href="/">Learn more</a> about payout splits.
	</p>
	<p>
		Any treasury funds in excess of the distribution limit is called <b>overflow.</b>
		Overflow can be claimed by your project's token holders by redeeming their tokens.
		<a href="/">Learn more</a> about overflow.
	</p>
	<label for="distributionLimit">Distribution limit</label>
	<Dropdown
		bind:value={distributionLimitType}
		options={[
			{
				label: 'Zero, no funds can be distributed',
				value: DistributionLimitType.None
			},
			{
				label: 'No limit (infinite)',
				value: DistributionLimitType.Infinite
			},
			{
				label: 'Specific limit',
				value: DistributionLimitType.Specific
			}
		]}
	/>
	<br />
	{#if distributionLimitType === DistributionLimitType.Specific}
		<CurrencyInput
			initialValue={distributionLimit}
			on:setValue={setValue}
			bind:currency={distributionLimitCurrency}
		/>
	{:else if distributionLimitType === DistributionLimitType.None}
		<AlertText
			>With a distribution limit of Zero, no funds can be distributed by the project. All funds
			belong to token holders as overflow.</AlertText
		>
	{:else}
		<AlertText>
			With an infinite distribution limit, all funds can be distributed by the project. The project
			will have no overflow, meaning token holders won't be able to redeem their tokens for treasury
			funds.</AlertText
		>
	{/if}
</HeavyBorderBox>
<HeavyBorderBox>
	<h3>Payout splits</h3>
	{#if distributionLimitType === DistributionLimitType.None}
		<AlertText>Payout splits can't be scheduled when the distribution limit is Zero.</AlertText>
	{:else}
		<!-- TODO href for jb treasury -->
		<AlertText
			>Distributing payouts to addresses outside the Juicebox contracts incurs a 2.5% JBX membership
			fee. The ETH from the fee will go to the <a href="/#">JuiceboxDAO treasury</a>, and the
			resulting JBX will go to the project's owner.</AlertText
		>
		{#each splits as split, editingIndex}
			<DisplaySplit
				{split}
				onRemove={removeSplit}
				onClick={(split) => {
					openModal(
						bind(AddSplitModal, {
							currency: distributionLimitCurrency,
							distributionLimit: formatWad(distributionLimit),
							showAmount: distributionLimitType === DistributionLimitType.Specific,
							editingIndex,
							onFinish: editSplit,
							split,
							splits
						})
					);
				}}
			/>
		{/each}
		{#if splits.length}
			<p>Total: {totalSplitsPercentage}%</p>
			{#if totalSplitsPercentage > 100}
				<p class="issue">The total of your splits is more than 100%.</p>
			{/if}
		{/if}
		<Button
			type="tertiary"
			size="md"
			disabled={totalSplitsPercentage > 100}
			on:click={() => {
				openModal(
					bind(AddSplitModal, {
						currency: distributionLimitCurrency,
						distributionLimit: formatWad(distributionLimit),
						showAmount: distributionLimitType === DistributionLimitType.Specific,
						onFinish: addSplit,
						splits
					})
				);
			}}>Add a split</Button
		>
	{/if}
</HeavyBorderBox>
<Button disabled={totalSplitsPercentage > 100} on:click={saveFundingConfig}>
	Save funding configuration
</Button>

<style>
	h3 {
		color: var(--text-header);
	}

	h3 {
		font-weight: 400;
		margin: 0;
		margin-bottom: 10px;
	}

	p {
		font-weight: 300;
	}

	label {
		font-weight: 400;
	}

	.issue {
		color: var(--text-failure);
	}
</style>
