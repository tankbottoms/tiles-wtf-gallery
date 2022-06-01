<script lang="ts">
	import { onMount } from 'svelte';
	import Trans from '$components/Trans.svelte';
	import type { ContractTransaction } from 'ethers';

	export let txnResponse: ContractTransaction;
	export let close: () => void;

	onMount(async () => {
		await txnResponse.wait();
		close();
	});
</script>

<section>
	<div>
		<img src="/images/quint.gif" alt={'Juicebox loading animation'} />
		<h2>
			<Trans>Transaction pending...</Trans>
		</h2>
		<p>
			<Trans>Your transaction has been submitted and is awaiting confirmation.</Trans>
		</p>
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

	img {
		max-width: 100px;
	}
</style>
