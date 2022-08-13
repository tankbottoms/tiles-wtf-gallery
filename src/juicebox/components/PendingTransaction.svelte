<script lang="ts">
	import { onMount } from 'svelte';
	import Trans from './Trans.svelte';
	import type { ContractTransaction } from 'ethers';
	import Icon from './Icon.svelte';

	export let txnResponse: ContractTransaction;
	export let functionName = '';
	export let close: () => void;

	let errorMessage = '';

	onMount(async () => {
		try {
			await txnResponse.wait();
			close();
		} catch (error) {
			errorMessage = error.message?.match(/^[\w\s]+/)?.[0];
		}
	});
</script>

<section>
	<div>
		{#if errorMessage}
			<h2>
				<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
			</h2>
			<p class="error">{errorMessage}</p>
		{:else}
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
</style>
