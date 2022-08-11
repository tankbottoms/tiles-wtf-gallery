<script lang="ts">
	import { addressFromEns } from '$utils/web3/address';

	import { utils } from 'ethers';
	import { onMount } from 'svelte';
	import { getTruncatedAddress } from './Address.svelte';

	export let value: string | number | undefined = undefined;
	export let label: string = undefined;
	export let type: string = 'text';
	export let disabled = false;
	export let maxlength: number = undefined;
	export let description = '';

	let addressInput = '';
	let loading = false;
	let mounted = false;

	let counter: NodeJS.Timeout;
	let count = 1;

	onMount(() => {
		if (type === 'address' && typeof value !== 'undefined') {
			addressInput = value as string;
		}
		mounted = true;
	});

	$: addressInput = value as string;

	async function update(addressInput: string) {
		count = 1;
		if (addressInput) {
			if (addressInput.endsWith('.eth')) {
				clearInterval(counter);
				counter = setInterval(() => count++, 1000);
				value = '';
				loading = true;
				const address = await addressFromEns(addressInput);
				value = address;
				loading = false;
				clearInterval(counter);
			} else if (utils.isAddress(addressInput)) {
				value = addressInput;
			} else {
				value = '';
			}
		} else {
			value = '';
		}
		return value;
	}

	$: if (type === 'address' && mounted) {
		update(addressInput);
	}
</script>

{#if label}
	<label for={$$props.id}>{label}</label>
{/if}

<div class="input-wrapper">
	<div class="prefix">
		<slot name="prefix" />
	</div>
	{#if type === 'address'}
		<input
			{...$$restProps}
			type="text"
			bind:value={addressInput}
			on:blur
			on:focus
			{disabled}
			class:hasPrefix={$$slots.prefix}
			class:hasLabel={label}
			spellcheck="false"
		/>
		{#if addressInput && addressInput.endsWith('.eth') && value}
			<div class="ens-right">
				{getTruncatedAddress(`${value}`)}
			</div>
		{:else if loading}
			<div class="ens-right">
				0x{Array((count % 3) + 1)
					.fill('.')
					.join('')}
			</div>
		{/if}
	{:else}
		<input
			{...$$props}
			bind:value
			on:blur
			on:focus
			class:hasPrefix={$$slots.prefix}
			class:hasLabel={label}
			{...typeof maxlength === 'number' ? { maxlength } : {}}
		/>
	{/if}
	<div class="addon">
		<slot name="addon" />
	</div>
</div>
<div class="info">
	{#if description}
		{description}
	{/if}
	{#if maxlength}
		<span class="max-length">{`${value.toString().length} / ${maxlength}`}</span>
	{/if}
</div>

<style>
	input {
		width: 100%;
		background: transparent;
		border: 1px solid var(--stroke-primary);
		transition: border-color 120ms ease-out;
		padding: 4px 11px;
		line-height: 1.5715;
		font-weight: 300;
	}

	input:disabled {
		border: 1px solid var(--stroke-tertiary);
		cursor: not-allowed;
		color: var(--text-disabled);
	}

	input::placeholder {
		color: var(--text-tertiary);
		font-weight: 300;
	}

	input:not(:disabled):focus {
		border: var(--background-action-primary) 1px solid;
		outline: none;
	}

	input:not(:disabled):hover {
		border: var(--background-action-primary) 1px solid;
	}

	.input-wrapper {
		position: relative;
	}

	.addon {
		position: absolute;
		top: 5px;
		right: 10px;
		height: 20px;
	}

	.prefix {
		position: absolute;
		top: 5px;
		left: 10px;
	}

	.hasPrefix {
		text-indent: 15px;
	}

	.hasLabel {
		margin-top: 8px;
		margin-bottom: 16px;
	}
	.ens-right {
		position: absolute;
		top: 50%;
		right: 5px;
		transform: translateY(-50%);
		padding: 1px 2px;
		background: var(--background-l0);
	}

	.info {
		margin-top: 4px;
		display: flex;
		gap: 16px;
		color: var(--text-secondary);
		font-weight: 300;
		font-size: 14px;
	}

	.max-length {
		margin-left: auto;
		min-width: fit-content;
	}
</style>
