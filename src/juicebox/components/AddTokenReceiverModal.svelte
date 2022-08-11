<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { BigNumber, constants } from 'ethers';
	import { formatSplitPercent, splitPercentFrom } from '$juicebox/utils/v2/math';
	import Button from './Button.svelte';
	import FormField from './FormField.svelte';
	import Range from './Range.svelte';
	import type { Split } from '$juicebox/models/v2/splits';
	import { validateEthAddress, validatePercentage } from '$juicebox/utils/validators';
	import { dateToDateInput } from '$juicebox/utils/formatDate';

	const today = dateToDateInput(new Date());

	const addressField = {
		label: 'Beneficiary Address',
		id: 'address',
		type: 'address',
		placeholder: 'juicebox.eth / 0x0000000000000000000000000000000000000000',
		props: {
			required: true
		}
	};

	export let close: () => void;
	// Wether an already existing split is being edited
	export let split: Split | null = null;
	export let editingIndex: number | null = null;
	// All the existing splits
	export let splits: Split[] = [];
	// A callback function to set the splint in the store
	export let onFinish: (split: Split) => void;

	export let reservedRate: number;

	let address: Address;
	let lockedUntil: string | null = null;
	// NOTE: this looks whack, but the range component takes in a list of values
	// and stores don't know how to handle embedded values
	let percent = 0;
	let rangeValue = [percent];

	let editingExistingSplit = !!split;
	let extra: string;

	onMount(() => {
		if (split) {
			address = split.beneficiary as Address;
			rangeValue[0] = parseFloat(formatSplitPercent(BigNumber.from(split.percent)));
			if (split.lockedUntil) {
				lockedUntil = dateToDateInput(new Date(split.lockedUntil * 1000));
			}
		}
	});

	let invalid: { [key: string]: boolean | string } = {
		address: false,
		percent: false
	};
	const isInvalid = () => Object.keys(invalid).find((key) => invalid[key]);

	// Clarifies that the slider percentage is of the overall reserved allocation
	// and shows the percentage of all newly minted tokens only if percent != 0
	function generateExtra(percent) {
		const realTokenAllocation = (reservedRate ?? 0) * percent;
		const realTokenAllocationPercent = (realTokenAllocation / 100).toFixed(2);
		const extra =
			`The percent this individual receives of the overall ${reservedRate}% reserved token allocation` +
			`${
				realTokenAllocation
					? ' ' + `(${realTokenAllocationPercent}% of all newly minted tokens).`
					: '.'
			}`;
		return extra;
	}

	async function validate() {
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
		await validatePercentage(rangeValue[0]).then(
			() => {
				invalid.percent = false;
			},
			(msg) => {
				invalid.percent = msg;
			}
		);
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
			lockedUntil: timestamp,
			projectId: '0x00',
			beneficiary: address,
			allocator: constants.AddressZero,
			percent: splitPercentFrom(rangeValue[0]).toNumber(),
			preferClaimed: true
		};
		onFinish(split);
		close();
	}

	$: {
		extra = generateExtra(rangeValue[0]);
	}
</script>

<h3>{editingExistingSplit ? 'Edit token receiver' : 'Add token receiver'}</h3>
<section>
	<FormField field={addressField} bind:value={address} />
	<p class="issue" in:fly={{ duration: 100 }} class:hidden={!invalid.address}>{invalid.address}.</p>

	<p>This address will receive the tokens minted from paying this project.</p>
	<div class="gap">
		<label for="percent"> Percent allocation </label>
		<!-- NOTE the range reacts to a too large amount by setting it to the max value -->
		<Range bind:values={rangeValue} step={0.01} />
		<p>{extra}</p>
		<p class="issue" in:fly={{ duration: 100 }} class:hidden={!invalid.percent}>
			{invalid.percent}.
		</p>
	</div>
	<label for="lock-date" class="small-gap">Lock until</label>
	<input
		type="date"
		id="lock-date"
		min={today}
		placeholder="Select date"
		bind:value={lockedUntil}
	/>
	<p>
		If locked, this split can't be edited or removed until the lock expires or the funding cycle is
		reconfigured.
	</p>
</section>
<div class="actions">
	<Button on:click={close} size="md" type="secondary">Cancel</Button>
	<Button size="md" on:click={addSplit}
		>{editingExistingSplit ? 'Save' : 'Add'} token receiver</Button
	>
</div>

<style>
	h3 {
		margin: 0;
		color: var(--text-header);
	}
	section {
		margin: 40px 0;
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
	p {
		color: var(--text-secondary);
		font-weight: 300;
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
