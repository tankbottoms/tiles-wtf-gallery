<script lang="ts">
	import { SECONDS_IN_DAY, SECONDS_IN_HOUR } from '$juicebox/constants/numbers';

	import Dropdown from './Dropdown.svelte';
	import Input from './Input.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { BigNumber } from 'ethers';
	import { getContext, onMount } from 'svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

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

	let mounted = false;

	$: if (mounted) value = BigNumber.from(inputValue * option);

	onMount(() => {
		let seconds = value;
		if ($project.fundingCycle.duration?.gt(0)) {
			seconds = $project.fundingCycle.duration;
		}
		if (seconds.gte(SECONDS_IN_DAY)) {
			option = OptionValue.days;
			inputValue = seconds.div(SECONDS_IN_DAY).toNumber();
			placeholder = inputValue.toString();
		} else if (seconds.gte(SECONDS_IN_HOUR)) {
			option = OptionValue.hours;
			inputValue = seconds.div(SECONDS_IN_HOUR).toNumber();
			placeholder = inputValue.toString();
		} else if (seconds.gte(60)) {
			option = OptionValue.minutes;
			inputValue = seconds.div(60).toNumber();
			placeholder = inputValue.toString();
		} else {
			option = OptionValue.seconds;
			inputValue = seconds.toNumber();
			placeholder = inputValue.toString();
		}
		mounted = true;
	});
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
