<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import * as constants from '@ethersproject/constants';
	import Button from './Button.svelte';
	import FormField from './FormField.svelte';
	import PopInfo from './PopInfo.svelte';
	import Icon from './Icon.svelte';
	import Range from './Range.svelte';
	import CurrencyInput from './CurrencyInput.svelte';
	import type { Split } from '$juicebox/models/v2/splits';
	import { BigNumber } from 'ethers';
	import { formatWad, fromWad, parseWad } from '$juicebox/utils/formatNumber';
	import {
		formatSplitPercent,
		splitPercentFrom,
		SPLITS_TOTAL_PERCENT
	} from '$juicebox/utils/v2/math';
	import { getDistributionPercentFromAmount } from '$juicebox/utils/v2/distributions';
	import Popover from './Popover.svelte';
	import { validateEthAddress } from '$juicebox/utils/validators';
	import { dateToDateInput } from '$juicebox/utils/formatDate';
	import Dropdown from './Dropdown.svelte';
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';

	const feePercentage = 2.5;
	const today = dateToDateInput(new Date());

	const addressField = {
		label: 'Address',
		id: 'address',
		type: 'address',
		placeholder: 'juicebox.eth / 0x0000000000000000000000000000000000000000',
		props: {
			required: true
		}
	};
	const projectField = {
		id: 'projectId',
		label: 'Juicebox Project ID',
		placeholder: 'ID',
		props: {
			type: 'number',
			required: true
		}
	};

	export let close: () => void;
	// The distribution limit dictates if there is a paymount amount field
	export let distributionLimit: number | null = null;
	export let currency: BigNumber = BigNumber.from(V2_CURRENCY_ETH);

	// Wether an already existing split is being edited
	export let split: Split | null = null;
	export let editingIndex: number | null = null;
	// All the existing splits
	export let splits: Split[] = [];

	// A callback function to set the splint in the store
	export let onFinish: (split: Split, distributionLimit: number) => void;
	export let showAmount: boolean;

	enum BeneficiaryType {
		Address = 1,
		ProjectID = 2
	}

	let beneficiaryType: BeneficiaryType = BeneficiaryType.Address;
	let address: Address;
	let projectId: number;
	let amount = 0;
	let amountAfterFee: number;
	let lockedUntil: string | null = null;
	// NOTE: this looks whack, but the range component takes in a list of values
	// and stores don't know how to handle embedded values
	let percent = 0;
	let rangeValue = [percent];
	// let showAmount = distributionLimit && !BigNumber.from(distributionLimit).eq(MAX_DISTRIBUTION_LIMIT);

	let editingExistingSplit = !!split;

	let initialAmount = amount;
	let initialPercentage = editingExistingSplit
		? Number(formatSplitPercent(BigNumber.from(split.percent)))
		: 0;

	$: newDistributionLimit =
		distributionLimit - (distributionLimit * initialPercentage) / 100 + amount;

	onMount(() => {
		if (split) {
			address = split.beneficiary as Address;
			rangeValue[0] =
				BigNumber.from(split.percent)
					.mul(10 ** 12)
					.div(SPLITS_TOTAL_PERCENT)
					.toNumber() /
				10 ** 10;
			if (Number(split.projectId)) {
				projectId = parseInt(split.projectId);
				beneficiaryType = BeneficiaryType.ProjectID;
			} else {
				address = split.beneficiary as Address;
				beneficiaryType = BeneficiaryType.Address;
			}
			if (showAmount) {
				amount = (rangeValue[0] * distributionLimit) / 100;
				initialAmount = amount;
			}
			if (split.lockedUntil) {
				lockedUntil = dateToDateInput(new Date(split.lockedUntil * 1000));
			}
		}

		if (showAmount) {
			setRangeValue({ detail: { value: parseWad(initialAmount) } });
		}
	});

	$: amount = Number(amount.toFixed(2));

	let invalid: { [key: string]: boolean | string } = {
		projectId: false,
		address: false,
		percent: false
	};
	const isInvalid = () => Object.keys(invalid).find((key) => invalid[key]);

	async function validate() {
		if (beneficiaryType === BeneficiaryType.Address) {
			await validateEthAddress(
				address,
				splits,
				editingExistingSplit ? 'Edit' : 'Add',
				editingExistingSplit ? editingIndex : undefined
			).then(
				() => {
					invalid.address = false;
				},
				(msg) => {
					invalid.address = msg;
				}
			);
		} else {
			invalid.projectId = !projectId ? 'Required' : false;
			if (!invalid.projecId) {
				// In the case that we had an invalid address, and switched to project id
				invalid.address = false;
			}
		}
		// await validatePercentage(rangeValue[0]).then(
		// 	() => {
		// 		invalid.percent = false;
		// 	},
		// 	(msg) => {
		// 		invalid.percent = msg;
		// 	}
		// );
	}
	function setAmountAfterFee(percent: number) {
		amountAfterFee = amount - (amount * feePercentage) / 100;
	}
	function setRangeValue(e: { detail: { value: BigNumber } }) {
		const value = e.detail.value;
		amount = Number(fromWad(value));
		let ratio = 0;
		if (editingExistingSplit) {
			const newDistributionLimit = distributionLimit - initialAmount + amount;
			ratio =
				(newDistributionLimit *
					getDistributionPercentFromAmount({
						amount: Number(formatWad(value)),
						distributionLimit: newDistributionLimit.toString()
					})) /
				distributionLimit;
			percent = getDistributionPercentFromAmount({
				amount: Number(formatWad(value)),
				distributionLimit: newDistributionLimit.toString()
			});
		} else {
			ratio = getDistributionPercentFromAmount({
				amount,
				distributionLimit: distributionLimit.toString()
			});
			percent = getDistributionPercentFromAmount({
				amount,
				distributionLimit: (Number(distributionLimit) + amount).toString()
			});
		}
		rangeValue[0] = ratio;
	}

	async function addSplit() {
		await validate();
		if (isInvalid()) {
			console.warn(invalid);
			return;
		}
		let timestamp = 0;
		if (lockedUntil) {
			const date = new Date(lockedUntil);
			timestamp = date.getTime() / 1000;
		}
		// Values derived by looking at DistributionSplitModal
		// in react jb-interface
		const split = {
			allocator: constants.AddressZero,
			beneficiary: address || constants.AddressZero,
			lockedUntil: timestamp,
			percent: splitPercentFrom(rangeValue[0]).toString(),
			preferClaimed: true,
			projectId: projectId ? projectId.toString() : '0x00'
		} as Split;
		onFinish(split, newDistributionLimit);
		close();
	}

	$: {
		if (showAmount) {
			setAmountAfterFee(rangeValue[0]);
		}
	}

	$: {
		if (beneficiaryType === BeneficiaryType.Address) {
			addressField.label = 'Address';
			addressField.props.required = true;
		} else {
			addressField.label = 'Token beneficiary address';
			addressField.props.required = false;
		}
	}
</script>

<h3>{editingExistingSplit ? 'Editing a split' : 'Add a split'}</h3>
<section>
	<Dropdown
		options={[
			{ label: 'Wallet address', value: BeneficiaryType.Address },
			{ label: 'Juicebox Project', value: BeneficiaryType.ProjectID }
		]}
		bind:value={beneficiaryType}
	/>
	{#if beneficiaryType === BeneficiaryType.Address}
		<FormField field={addressField} bind:value={address} />
	{:else}
		<FormField field={projectField} bind:value={projectId} />
		<p class="issue" in:fly={{ duration: 100 }} class:hidden={!invalid.projectId}>
			{invalid.projectId}.
		</p>
		<FormField field={addressField} bind:value={address} />
	{/if}
	<p class="issue" in:fly={{ duration: 100 }} class:hidden={!invalid.address}>{invalid.address}.</p>
	{#if showAmount}
		<div class="gap">
			<label for="payoutAmount" class="small-gap"> Payout amount </label>
			<div style="display: flex;">
				<div style="width: 100%;">
					<CurrencyInput
						on:setValue={setRangeValue}
						{currency}
						initialValue={parseWad(initialAmount)}
						inputValue={amount}
					/>
				</div>
				<span style="padding: 5px;">
					{Number(percent || 0).toFixed(2)}%
				</span>
			</div>
			{#if amount && beneficiaryType === BeneficiaryType.Address}
				<Popover
					placement="right"
					message="Payouts to Ethereum addresses incur a 2.5% fee. Your project will receive JBX in return at the current issuance rate."
				>
					{amountAfterFee.toFixed(2)}{' '}
					after {feePercentage}% JBX membership fee
					<Icon name="questionCircle" />
				</Popover>
			{/if}
		</div>
	{:else}
		<div class="gap">
			<label for="percent">
				<PopInfo message="Percentage this payee will receive of all funds raised."
					>Percent of distribution limit</PopInfo
				>
			</label>
			<!-- NOTE the range reacts to a too large amount by setting it to the max value -->
			<Range bind:values={rangeValue} />
			<p class="issue" in:fly={{ duration: 100 }} class:hidden={!invalid.percent}>
				{invalid.percent}.
			</p>
		</div>
	{/if}
	<label for="lock-date" class="small-gap">Lock until</label>
	<input type="date" id="lock-date" min={today} placeholder="mm/dd/yyyy" bind:value={lockedUntil} />
	<p>
		If locked, this split can't be edited or removed until the lock expires or the funding cycle is
		reconfigured.
	</p>
</section>
<div class="actions">
	<Button on:click={close} size="md" type="secondary">Cancel</Button>
	<Button size="md" on:click={addSplit}>{editingExistingSplit ? 'Edit' : 'Add'} split</Button>
</div>

<style>
	h3 {
		margin: 0;
		color: var(--text-header);
	}
	section {
		margin: 40px 0;
		color: var(--text-primary);
		max-width: 500px;
	}
	label {
		display: block;
		font-weight: 400;
	}
	input[type='date'] {
		background: var(--background-l0);
		border: 1px solid #d9d9d9;
		height: 30px;
		color: var(--text-secondary);
		padding-inline-start: 10px;
	}
	.actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		margin-top: 20px;
	}
	.gap {
		margin: 20px 0;
	}
	.small-gap {
		margin: 10px 0;
	}
	.hidden {
		display: none;
	}

	.issue {
		color: var(--text-failure);
	}
</style>
