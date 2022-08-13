<script lang="ts">
	import { BigNumber } from '@ethersproject/bignumber';
	import { formattedNum, fromWad, parseWad } from '$juicebox/utils/formatNumber';
	import { betweenZeroAndOne } from '$juicebox/utils/bigNumbers';
	import Ethereum from './Ethereum.svelte';
	export let amount: BigNumber;
	export let precision = undefined;

	$: amount = amount || BigNumber.from(0);

	$: isBetweenZeroAndOne = BigNumber.isBigNumber(amount)
		? betweenZeroAndOne(amount)
		: betweenZeroAndOne(parseWad(amount));

	$: precisionAdjusted = isBetweenZeroAndOne ? 4 : precision;
	$: formattedETHAmount = formattedNum(
		Number(Number(fromWad(amount)).toFixed(precision ?? 4)).toString(),
		{
			precision,
			thousandsSeparator: ','
		}
	);
</script>

{#if amount}
	<Ethereum />{formattedETHAmount}
{/if}
