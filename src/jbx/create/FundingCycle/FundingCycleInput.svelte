<script lang="ts">
	import Dropdown from '$jbx/components/Dropdown.svelte';
	import Input from '$jbx/components/Input.svelte';
	import { BigNumber } from 'ethers';

	function capitalize(s: string) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}
	/**
	 * The dropdown options for the duration input
	 * */
	const OptionValue = {
		days: 60 * 60 * 24,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1
	};

	let options = [];
	Object.keys(OptionValue).forEach((key) => {
		options.push({
			label: capitalize(key),
			value: OptionValue[key]
		});
	});

	/**
	 * Differentiate between the value which is the input * the amount of seconds,
	 * and the inputValue which is just the input
	 * */
	export let value: BigNumber = BigNumber.from(14 * OptionValue.days);
	export let placeholder: string = '14';

	let inputValue: number = 14;
	let option = OptionValue.days;

	$: value = BigNumber.from(inputValue * option);
</script>

<label for="fundingCycle">
	<small>*</small> Funding cycle duration
</label>
<section>
	<div class="input">
		<Input id="fundingCycle" {placeholder} bind:value={inputValue} />
	</div>
	<div class="dropdown">
		<Dropdown bind:value={option} {options} />
	</div>
</section>

<style>
	label {
		display: block;
		margin: 20px 0px 10px;
	}
	small {
		font-size: 8px;
		color: red;
		vertical-align: text-top;
	}

	section {
		display: flex;
	}

	.dropdown {
		width: 150px;
		margin-left: 20px;
	}

	.input {
		flex-grow: 1;
	}
</style>
