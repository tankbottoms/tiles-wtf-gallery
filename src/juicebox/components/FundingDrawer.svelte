<script lang="ts">
	import type Store from '$utils/Store';
	import AddSplitModal from './AddSplitModal.svelte';
	import AlertText from './AlertText.svelte';
	import HeavyBorderBox from './HeavyBorderBox.svelte';
	import Icon from './Icon.svelte';
	import FundingCycleInput from './FundingCycleInput.svelte';
	import Toggle from './Toggle.svelte';
	import Button from './Button.svelte';
	import DisplaySplit from './Split.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { bind, openModal as open } from './Modal.svelte';
	import { BigNumber, constants } from 'ethers';
	import { MAX_DISTRIBUTION_LIMIT, SPLITS_TOTAL_PERCENT } from '$juicebox/utils/v2/math';
	import { DistributionLimitType } from '$juicebox/constants';
	import { getContext, onMount } from 'svelte';
	import type { Split } from '$juicebox/models/v2/splits';
	import {
		getDistributionLimitType,
		getTotalSplitsPercentage
	} from '$juicebox/utils/v2/distributions';
	import { formatWad, parseWad } from '$juicebox/utils/formatNumber';
	import CollapsibleSection from './CollapsibleSection.svelte';
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import Ethereum from './Ethereum.svelte';
	import Usd from './USD.svelte';
	import Radio from './Radio.svelte';
	import { connectedAccount } from '$stores/web3';
	import SetdistributionLimitModal from './SetdistributionLimitModal.svelte';
	import { daysToMillis } from './project/Graph/utils';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let dirty = getContext('SHOW_DIRTY') as {
		showDirty: Store<boolean>;
		check: (arg1: any, arg2: any) => void;
	};

	export let close: () => void;
	export let openModal: (arg1: any) => void = open;

	let fundingCyclesActive = false;
	let duration: BigNumber = BigNumber.from(Math.floor(daysToMillis(14) / 1000));
	let distributionLimitType: DistributionLimitType = DistributionLimitType.Specific;
	let distributionLimit: BigNumber = BigNumber.from(0);
	let distributionLimitCurrency: BigNumber;
	let splits = $project.payoutSplits;

	let initialState: {};
	let distributionLimitInput = 0;
	let distributionLimitCurrencyInput = BigNumber.from(V2_CURRENCY_ETH);
	let payoutType = 'amount';

	$: totalSplitsPercentage = getTotalSplitsPercentage(splits);
	$: projectOwnerSplit = {
		allocator: constants.AddressZero,
		beneficiary: $connectedAccount || constants.AddressZero,
		lockedUntil: 0,
		percent: SPLITS_TOTAL_PERCENT,
		preferClaimed: true,
		projectId: '0x00'
	} as Split;

	$: shownSplits = payoutType === 'percentage' ? [projectOwnerSplit, ...splits] : splits;

	let mounted = false;

	onMount(() => {
		if ($project.fundingCycle.duration.gt(0)) {
			duration = $project.fundingCycle.duration;
			fundingCyclesActive = true;
		}
		distributionLimit = $project.distributionLimit;
		distributionLimitType = splits.length
			? getDistributionLimitType($project.distributionLimit)
			: DistributionLimitType.Specific;
		distributionLimitCurrency = $project.distributionLimitCurrency;
		distributionLimitInput = Number(formatWad(distributionLimit));

		initialState = {
			duration,
			distributionLimit,
			distributionLimitType,
			distributionLimitCurrency
		};
		mounted = true;
	});

	function resetSplits(splits: Split[]): Split[] {
		let total = splits.reduce(
			(acc, split) => BigNumber.from(split.percent).add(acc),
			BigNumber.from(0)
		);
		return splits.map((split) => ({
			...split,
			percent: BigNumber.from(split.percent).mul(SPLITS_TOTAL_PERCENT).div(total).toNumber()
		}));
	}

	function setValue(e: any) {
		distributionLimit = e.detail.value;
	}

	function addSplit(split: Split, distLimit: number) {
		if (payoutType === 'amount') {
			splits = resetSplits([...splits, split]);

			if (typeof distLimit !== 'undefined') {
				distributionLimitInput = distLimit;
			}
		} else {
			projectOwnerSplit.percent = Math.max(
				0,
				BigNumber.from(projectOwnerSplit.percent).sub(split.percent).toNumber()
			);
			splits = resetSplits([projectOwnerSplit, ...splits, split]).slice(1);
		}
	}

	function editSplit(split: Split, distLimit: number) {
		if (payoutType === 'amount') {
			splits = resetSplits(
				splits.map((m, i) => {
					// TODO maybe make a derived hash of the split
					if (
						split.beneficiary === m.beneficiary ||
						(Number(split.projectId) && split.projectId === m.projectId)
					) {
						return { ...m, ...split };
					} else {
						return m;
					}
				})
			);

			if (typeof distLimit !== 'undefined') {
				distributionLimitInput = distLimit;
			}
		} else {
			projectOwnerSplit.percent = Math.max(
				0,
				BigNumber.from(projectOwnerSplit.percent).sub(split.percent).toNumber()
			);
			splits = resetSplits([
				projectOwnerSplit,
				...splits.map((m, i) => {
					// TODO maybe make a derived hash of the split
					if (
						split.beneficiary === m.beneficiary ||
						(Number(split.projectId) && split.projectId === m.projectId)
					) {
						return { ...m, ...split };
					} else {
						return m;
					}
				})
			]).slice(1);
		}
	}

	function removeSplit(split: Split) {
		if (payoutType === 'amount') {
			let total = splits.reduce(
				(acc, split) => BigNumber.from(Math.floor(Number(split.percent))).add(acc),
				BigNumber.from(0)
			);
			splits = resetSplits(
				splits.filter((s) => s.beneficiary !== split.beneficiary || s.projectId !== split.projectId)
			);
			distributionLimitInput -=
				(Number(split.percent) * distributionLimitInput) / total?.toNumber();

			distributionLimitInput = Math.max(0, distributionLimitInput);
		} else {
			projectOwnerSplit.percent = Math.min(
				SPLITS_TOTAL_PERCENT,
				Math.max(
					Math.max(0, Number(projectOwnerSplit.percent)) + Number(split.percent),
					Math.min(100, BigNumber.from(projectOwnerSplit.percent).add(split.percent).toNumber())
				)
			);
			splits = resetSplits([
				projectOwnerSplit,
				...splits.filter(
					(s) => s.beneficiary !== split.beneficiary || s.projectId !== split.projectId
				)
			]).slice(1);
		}
	}

	function saveFundingConfig() {
		let _distributionLimit = distributionLimit;

		switch (payoutType) {
			case 'amount':
				if (splits.length) {
					_distributionLimit = distributionLimit;
				} else {
					_distributionLimit = BigNumber.from(0);
				}
				break;
			case 'percentage':
				_distributionLimit = MAX_DISTRIBUTION_LIMIT;
				break;
		}

		project.update((current) => ({
			...current,
			fundingCycle: {
				...current.fundingCycle,
				duration
			},
			distributionLimit: _distributionLimit,
			distributionLimitCurrency,
			payoutSplits: splits
		}));
		close();
	}

	function setDistributionLimit() {
		openModal(
			bind(SetdistributionLimitModal, {
				onClose: () => {
					console.log('on close');
				},
				onOk: (_distributionLimit: number, _distributionLimitCurrency: BigNumber) => {
					distributionLimitInput = _distributionLimit || 0;
					distributionLimitCurrency = _distributionLimitCurrency;
				}
			})
		);
	}

	$: if (mounted) {
		if (payoutType === 'amount') {
			if (!splits.length) {
				projectOwnerSplit.percent = SPLITS_TOTAL_PERCENT;
			} else {
				if (distributionLimit.eq(0) && mounted) {
					setDistributionLimit();
				}
			}
		} else if (splits.length && projectOwnerSplit.percent === SPLITS_TOTAL_PERCENT) {
			let total = splits.reduce(
				(acc, split) => BigNumber.from(split.percent).add(acc),
				BigNumber.from(0)
			);
			projectOwnerSplit.percent = Math.max(
				0,
				Math.min(100, BigNumber.from(projectOwnerSplit.percent).sub(total).toNumber())
			);
		}
	}

	$: {
		distributionLimitCurrency = distributionLimitCurrencyInput;
		switch (payoutType) {
			case 'amount':
				if (splits.length) {
					distributionLimit = BigNumber.from(parseWad(distributionLimitInput || '0'));
				} else {
					distributionLimit = BigNumber.from(0);
				}
				break;
			case 'percentage':
				distributionLimit = BigNumber.from(MAX_DISTRIBUTION_LIMIT);
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

	$: if (mounted && !fundingCyclesActive) {
		$project.fundingCycle.duration = BigNumber.from(0);
	}
</script>

<slot name="header" />
<HeavyBorderBox>
	<header>
		<Toggle bind:checked={fundingCyclesActive}>
			<h3>Automate funding cycles</h3>
		</Toggle>
	</header>
	<AlertText>
		With no funding cycles, the project's owner can start a new funding cycle (Funding Cycle #2)
		on-demand.
		<a
			href="https://info.juicebox.money/docs/protocol/learn/risks"
			target="_blank"
			rel="noopener noreferrer">Learn more.</a
		>
	</AlertText>

	<CollapsibleSection color={'var(--text-primary)'} expanded={false}>
		<h4 slot="header">What are automated funding cycles?</h4>

		<p>Automated funding cycles enable the following characteristics:</p>

		<ol>
			<li>
				<p>
					<b>Recurring funding cycles</b>. For example, distribute funds from your project's
					treasury every week.
				</p>
			</li>
			<li>
				<p>
					<b>Discount rate</b>, to reduce your project token's issuance rate (tokens per ETH) each
					funding cycle.
				</p>
			</li>
		</ol>
	</CollapsibleSection>

	{#if fundingCyclesActive}
		<FundingCycleInput bind:value={duration} />
	{/if}
</HeavyBorderBox>
<HeavyBorderBox>
	<h3>Payouts</h3>
	<p class="secondaryInfo">Choose how you would like to configure your payouts.</p>
	<div>
		<p>
			Use <strong>Amounts</strong> when you want to configure a
			<strong>distribution limit</strong>. Treasury funds that exceed the distribution limit are
			called <strong>overflow</strong>. Token holders can redeem (burn) their tokens for a portion
			of the overflow.
			<a
				href="https://info.juicebox.money/protocol/learn/topics/overflow"
				target="_blank"
				rel="noopener noreferrer">Learn more</a
			>.
		</p>
		<p>
			Use <strong>Percentages</strong> when you want to configure an
			<strong>infinite distribution limit.</strong>
			With an infinite distribution limit, your project reserves all funds for itself. Your project won't
			have overflow, so tokens can never be redeemed for ETH.
			<a
				href="https://info.juicebox.money/protocol/learn/topics/overflow"
				target="_blank"
				rel="noopener noreferrer">Learn more</a
			>.
		</p>
	</div>

	<div>
		<div class="flex gap-1">
			<div>
				<Radio name="payouts" value="amount" bind:group={payoutType} />
			</div>
			<div>
				<div>Amounts</div>
				<div>
					Distribute a specific amount of funds to entities each funding cycle. Your distribution
					limit will equal the <strong>sum of all payout amounts.</strong>
				</div>
			</div>
		</div>
		<br />
		<div class="flex gap-1">
			<div>
				<Radio name="payouts" value="percentage" bind:group={payoutType} />
			</div>
			<div>
				<div>Percentages</div>
				<div>
					Distribute a percentage of all funds received to entities. Your distribution limit will be
					<strong>infinite</strong>.
				</div>
			</div>
		</div>
	</div>

	<br />

	{#if payoutType === 'percentage'}
		{#each splits as split, editingIndex}
			<DisplaySplit
				{split}
				{distributionLimit}
				showAmount={false}
				disabled={split === projectOwnerSplit}
				onRemove={removeSplit}
				onClick={(split) => {
					openModal(
						bind(AddSplitModal, {
							currency: distributionLimitCurrency,
							distributionLimit: formatWad(distributionLimit),
							showAmount: payoutType === 'amount',
							editingIndex,
							onFinish: editSplit,
							split,
							splits: shownSplits
						})
					);
				}}
			/>
		{/each}
		{#if BigNumber.from(projectOwnerSplit.percent).gt(0)}
			<DisplaySplit
				isOwner={true}
				split={projectOwnerSplit}
				{distributionLimit}
				disabled={true}
				onRemove={removeSplit}
				onClick={(split) => {
					openModal(
						bind(AddSplitModal, {
							currency: distributionLimitCurrency,
							distributionLimit: formatWad(distributionLimit),
							showAmount: payoutType === 'amount',
							editingIndex: 0,
							onFinish: editSplit,
							split,
							splits: shownSplits
						})
					);
				}}
			/>
		{/if}
	{:else if payoutType === 'amount'}
		{#each splits as split, editingIndex}
			<DisplaySplit
				{split}
				{distributionLimit}
				showAmount={payoutType === 'amount'}
				disabled={split === projectOwnerSplit}
				onRemove={removeSplit}
				onClick={(split) => {
					openModal(
						bind(AddSplitModal, {
							currency: distributionLimitCurrency,
							distributionLimit: formatWad(distributionLimit),
							showAmount: payoutType === 'amount',
							editingIndex,
							onFinish: editSplit,
							split,
							splits: shownSplits
						})
					);
				}}
			/>
		{/each}
	{/if}

	{#if splits.length}
		<p>
			Total:
			{BigNumber.from(projectOwnerSplit.percent).gt(0)
				? Number(totalSplitsPercentage.toFixed(2))
				: 100}%
		</p>
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
					showAmount: payoutType === 'amount',
					onFinish: addSplit,
					splits
				})
			);
		}}
	>
		Add a split
	</Button>

	<div style="margin-top: 2rem;" />

	<div class="ant-space-item">
		<div style="display: flex; justify-content: space-between;">
			<span class="secondaryInfo">Distribution Limit <Icon name="questionCircle" />:</span>
			<span>
				<strong>
					<span class="secondaryInfo">
						{#await getDistributionLimitType(distributionLimit) then distributionLimitType}
							{#if distributionLimitType === DistributionLimitType.None}
								Zero
							{:else if distributionLimitType === DistributionLimitType.Infinite}
								No limit (infinite)
							{:else if distributionLimitType === DistributionLimitType.Specific}
								{#if distributionLimitCurrency.eq(V2_CURRENCY_ETH)}
									<Ethereum />{formatWad(distributionLimit)}
								{:else}
									<Usd />{formatWad(distributionLimit)}
								{/if}
							{/if}
						{/await}
					</span>
				</strong>
			</span>
		</div>
	</div>
</HeavyBorderBox>
<Button disabled={totalSplitsPercentage > 100} on:click={saveFundingConfig}>
	Save funding configuration
</Button>

<style>
	header {
		margin-bottom: 10px;
	}

	h3 {
		font-weight: 400;
		margin: 0;
	}

	h4[slot='header'] {
		margin: 0px;
		margin-left: 10px;
	}

	p {
		font-weight: 300;
	}

	b {
		font-weight: 600;
	}

	/* label {
		font-weight: 400;
	} */

	.issue {
		color: var(--text-failure);
	}

	.flex {
		display: flex;
		align-items: baseline;
	}
	.gap-1 {
		gap: 1rem;
	}

	.secondaryInfo {
		color: var(--text-tertiary);
	}
</style>
