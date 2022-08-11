<script lang="ts">
	import { onMount } from 'svelte';
	import Trans from './Trans.svelte';
	import type { ContractTransaction } from 'ethers';
	import Icon from './Icon.svelte';

	export let txnResponse: ContractTransaction;
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
			<img src="/images/quint.gif" alt={'Juicebox loading animation'} />
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
	img {
		max-width: 100px;
	}
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
