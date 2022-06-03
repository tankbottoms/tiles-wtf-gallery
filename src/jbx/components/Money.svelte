<script lang="ts">
	import { BigNumber } from 'ethers';
	import { Currency } from '$jbx/constants';
	import { betweenZeroAndOne } from '$jbx/utils/bigNumbers';
	import Ethereum from '$jbx/components/Ethereum.svelte';
	import USD from '$jbx/components/USD.svelte';
	import EthAmount from './ETHAmount.svelte';
	import UsdAmount from './USDAmount.svelte';
	import { V2_CURRENCY_USD } from '$jbx/utils/v2/currency';

	export let currency: Currency | BigNumber = Currency.ETH;
	export let amount: BigNumber | number = BigNumber.from('0');
	export let formatWad = true;
	export let precision = 0;
</script>

{#if formatWad}
	{#if BigNumber.from(currency).eq(V2_CURRENCY_USD)}
		<UsdAmount {amount} {precision} />
	{:else}
		<EthAmount {amount} {precision} />
	{/if}
{:else if BigNumber.from(currency).eq(V2_CURRENCY_USD)}
	<USD />{amount}
{:else}
	<Ethereum />{amount}
{/if}
