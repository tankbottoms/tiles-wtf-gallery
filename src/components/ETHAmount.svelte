<script lang="ts">
	// import { Tooltip } from 'antd'

	import { BigNumber } from 'ethers';
	import { formatWad, parseWad } from '$utils/formatNumber';
	import { betweenZeroAndOne } from '$utils/bigNumbers';

	import Ethereum from '$components/Ethereum.svelte';

	// import CurrencySymbol from '../CurrencySymbol'

	// import ETHToUSD from './ETHToUSD'

	export let amount;
	export let precision = 0;
	export let padEnd = false;

	$: amount = amount || BigNumber.from(0)

	// const isMaxUint =
	//   BigNumber.isBigNumber(amount) &&
	//   (amount.eq(constants.MaxUint256) || amount.eq(MAX_DISTRIBUTION_LIMIT))

	// Account for being passed a string amount or a BigNumber amount
	const isBetweenZeroAndOne =
		(BigNumber.isBigNumber(amount) && betweenZeroAndOne(amount)) ||
		betweenZeroAndOne(parseWad(amount));

	const precisionAdjusted = isBetweenZeroAndOne ? 4 : precision;

	const formattedETHAmount = formatWad(amount, {
		precision: precisionAdjusted,
		padEnd
	});
</script>

{#if amount}
	<Ethereum />{formattedETHAmount}
{/if}
