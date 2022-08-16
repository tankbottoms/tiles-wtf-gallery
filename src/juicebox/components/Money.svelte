<script lang="ts">
	import { BigNumber } from 'ethers';
	import Ethereum from './Ethereum.svelte';
	import USD from './USD.svelte';
	import EthAmount from './ETHAmount.svelte';
	import UsdAmount from './USDAmount.svelte';
	import { V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';

	export let currency: BigNumber = BigNumber.from(V2_CURRENCY_ETH);
	export let amount: BigNumber = BigNumber.from('0');
	export let formatWad = true;
	export let precision = 0;

	$: if (typeof amount === 'number') {		
		console.log(`amount:${amount}`);
	}
</script>

<span>
	{#if formatWad}
		{#if BigNumber.from(currency ?? BigNumber.from(0)).eq(V2_CURRENCY_USD)}
			<UsdAmount {amount} {precision} />
		{:else}
			<EthAmount {amount} {precision} />
		{/if}
	{:else if BigNumber.from(currency).eq(V2_CURRENCY_USD)}
		<USD />{amount}
	{:else}
		<Ethereum />{amount}
	{/if}
</span>

<style>
	span {
		display: inline-flex;
	}
</style>
