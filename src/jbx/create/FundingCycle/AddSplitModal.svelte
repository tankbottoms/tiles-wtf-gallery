<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import * as constants from '@ethersproject/constants';
	import Button from '$jbx/components/Button.svelte';
	import FormField from '$jbx/components/FormField.svelte';
	import PopInfo from '$jbx/components/PopInfo.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import Range from '$jbx/components/Range.svelte';
	import CurrencyInput from '$jbx/components/CurrencyInput.svelte';
	import type { Split } from '$jbx/models/v2/splits';
	import type { Currency } from '$jbx/constants';
	import { BigNumber } from 'ethers';
	import { formatWad } from '$jbx/utils/formatNumber';
	import { formatSplitPercent, MAX_DISTRIBUTION_LIMIT, splitPercentFrom } from '$jbx/utils/v2/math';
	import {
		getDistributionPercentFromAmount,
		getDistributionAmountFromPercentAfterFee
	} from '$jbx/utils/v2/distributions';
	import Popover from '$jbx/components/Popover.svelte';
	import { validateEthAddress, validatePercentage } from '$jbx/utils/validators';
	import { dateToDateInput } from '$jbx/utils/formatDate';
	import Dropdown from '$jbx/components/Dropdown.svelte';

	const feePercentage = '2.5';
	const today = dateToDateInput(new Date());

	const addressField = {
		label: 'Address',
		id: 'address',
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
	export let currency: Currency | null = null;

	// Wether an already existing split is being edited
	export let split: Split | null = null;
	export let editingIndex: number | null = null;
	// All the existing splits
	export let splits: Split[] = [];
	// A callback function to set the splint in the store
	export let onFinish: (split: Split) => void;
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

	onMount(() => {
		if (split) {
			address = split.beneficiary as Address;
			rangeValue[0] = parseFloat(formatSplitPercent(BigNumber.from(split.percent)));
			if (split.projectId) {
				projectId = parseInt(split.projectId);
				beneficiaryType = BeneficiaryType.ProjectID;
			}
			if (showAmount) {
				amount = (rangeValue[0] / 100) * distributionLimit;
			}
			if (split.lockedUntil) {
				lockedUntil = dateToDateInput(new Date(split.lockedUntil * 1000));
			}
		}
	});

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
		await validatePercentage(rangeValue[0]).then(
			() => {
				invalid.percent = false;
			},
			(msg) => {
				invalid.percent = msg;
			}
		);
	}
	function setAmountAfterFee(percent: number) {
		amountAfterFee = getDistributionAmountFromPercentAfterFee({
			percent,
			distributionLimit: distributionLimit.toString(),
			feePercentage
		});
	}
	function setRangeValue(e: { detail: { value: BigNumber } }) {
		const value = e.detail.value;
		percent = getDistributionPercentFromAmount({
			amount: formatWad(value),
			distributionLimit: distributionLimit.toString()
		});
		rangeValue[0] = percent;
	}

	async function addSplit() {
		await validate();
		if (isInvalid()) {
			console.warn(invalid);
			return;
		}
		let timestamp: number;
		if (lockedUntil) {
			const date = new Date(lockedUntil);
			timestamp = date.getTime() / 1000;
		}
		// Values derived by looking at DistributionSplitModal
		// in react jb-interface
		const split = {
			allocator: undefined,
			beneficiary: address || constants.AddressZero,
			lockedUntil: timestamp,
			percent: splitPercentFrom(rangeValue[0]).toNumber(),
			preferClaimed: true,
			projectId: projectId ? projectId.toString() : undefined
		} as Split;
		onFinish(split);
		close();
	}

	$: {
		if (showAmount) {
			// Set the input value when the range value changes
			amount = (rangeValue[0] / 100) * distributionLimit;
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
			<CurrencyInput on:setValue={setRangeValue} disabled {currency} inputValue={amount} />

			{#if amount && beneficiaryType === BeneficiaryType.Address}
				<Popover
					placement="right"
					message="Payouts to Ethereum addresses incur a 2.5% fee. Your project will receive JBX in return at the current issuance rate."
				>
					{amountAfterFee}{' '}
					after {feePercentage}% JBX membership fee
					<Icon name="questionCircle" />
				</Popover>
			{/if}
		</div>
	{/if}
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
