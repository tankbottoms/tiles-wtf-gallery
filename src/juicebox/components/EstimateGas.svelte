<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	let baseGasFee = '';
	let gasUnit = 'gwei';
	let blockNumber = 0;

	onMount(async () => {
		const result = await axios.get(
			`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/web3/currentGas`,
			{
				headers: {
					apikey: import.meta.env.VITE_API_KEY
				}
			}
		);
		if ((200 >= result.status || result.status < 400) && result.data) {
			const response = result.data;
			baseGasFee = parseInt(response?.blockPrices?.[0]?.baseFeePerGas).toFixed();
			blockNumber = response.currentBlockNumber;
		}
	});
</script>

{#if baseGasFee}
	<div class="gas">
		<div class="left">{baseGasFee} {gasUnit?.toLowerCase() || 'gwei'}</div>
		<div class="right">{blockNumber}</div>
	</div>
{/if}

<style>
	.gas {
		background: white;
		color: #333;
		position: absolute;
		right: 0;
		bottom: 0;
		display: flex;
		user-select: none;
		cursor: pointer;
	}
	.left,
	.right {
		padding: 0.2rem 0.6rem;
	}
	.right {
		background: #333;
		color: white;
	}
</style>
