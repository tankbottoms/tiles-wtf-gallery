<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { BigNumber } from 'ethers';
	import { CurrencyName } from '$juicebox/constants';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import { parseWad } from '$juicebox/utils/formatNumber';
	import Icon from './Icon.svelte';
	import Input from './Input.svelte';
	import { V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';

	export let currency = BigNumber.from(V2_CURRENCY_ETH);
	export let inputValue = 0;
	export let initialValue: BigNumber | undefined = undefined;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		if (initialValue) {
			inputValue = parseFloat(formatWad(initialValue));
		}
	});

	/**
	 * onBlur dispatches "setValue" event which handles BigNumber conversion
	 * bind to value directly to get the input without conversion
	 * @param e: Event
	 * @dispatch setValue
	 */
	function onBlur(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = parseWad(target.value);
		dispatch('setValue', { value });
	}

	function onClick() {
		currency = currency.eq(V2_CURRENCY_ETH)
			? BigNumber.from(V2_CURRENCY_USD)
			: BigNumber.from(V2_CURRENCY_ETH);
		dispatch('switchCurrency', { currency });
	}
</script>

<Input placeholder="0" type="number" bind:value={inputValue} on:blur={onBlur} {disabled}>
	<div slot="addon" role="button" class="currency" class:disabled on:click={!disabled && onClick}>
		{CurrencyName[currency.toNumber()]}
		{#if !disabled}
			<Icon name="caret" direction="e" />
		{/if}
	</div>
</Input>

<style>
	.currency {
		cursor: pointer;
		color: var(--text-action-primary);
		background: var(--background-action-secondary);
		font-size: 12px;
		white-space: nowrap;
		padding: 1px 6px;
		margin-left: 0px;
		margin-right: 0px;
		border-radius: 1px;

		display: flex;
		align-items: center;
	}

	.disabled {
		cursor: not-allowed;
		color: var(--text-disabled);
		background: var(--background-disabled);
	}

	:global(.currency svg) {
		margin-left: 4px;
		transform: translate(0, 1px) rotate(90deg) !important;
		width: 0.6em;
		height: 0.6em;
	}
</style>
