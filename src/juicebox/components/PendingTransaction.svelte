<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Trans from './Trans.svelte';
	import type { ContractTransaction } from 'ethers';
	import Icon from './Icon.svelte';
	import { generateRandomAddresses, generateTile } from '$tiles/tilesStandalone';

	export let txnResponse: ContractTransaction;
	export let functionName = '';
	export let close: () => void;

	let errorMessage = '';
	let tile = '';
	let interval: NodeJS.Timeout;

	onMount(async () => {
		try {
			const addresses = generateRandomAddresses(25);
			let i = 0;
			setInterval(() => {
				tile = generateTile(addresses[i++ % addresses.length]);
			}, 200);
			await txnResponse.wait();
			close();
		} catch (error) {
			errorMessage = error.message?.match(/^[\w\s]+/)?.[0];
		}
	});

	onDestroy(() => clearInterval(interval));
</script>

<section>
	<div>
		{#if errorMessage}
			<h2>
				<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
			</h2>
			<p class="error">{errorMessage}</p>
		{:else}
			{#if tile}
				<div class="tile">
					<div>
						{@html tile}
					</div>
				</div>
			{/if}
			{#if functionName}
				<h2>
					Method:
					<span style="text-transform: capitalize;">
						{functionName}
					</span>
				</h2>
			{/if}
			<h2>
				<Trans>Transaction pending...</Trans>
			</h2>
			<p>
				<Trans>Your transaction has been submitted and is awaiting confirmation.</Trans>
			</p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2rem 0;
	}

	div {
		max-width: 400px;
		text-align: center;
	}
	.tile {
		width: 200px;
		height: 200px;
	}
	.tile > :global(div) {
		transform: translate(30%, -27%) scale(0.6);
	}
</style>
