<script lang="ts">
	import { BigNumber } from 'ethers';
	import { fromWad, formatWad, parseWad } from '$utils/formatNumber';
	import { betweenZeroAndOne } from '$utils/bigNumbers';
	import { getCurrencyConverter } from '$data/currency';
	import USD from '$components/USD.svelte';
	import Popover from './Popover.svelte';

	export let amount: BigNumber | number;
	export let precision = 0;
	export let padEnd = false;

	const converter = getCurrencyConverter();

	// Account for being passed a string amount or a BigNumber amount
	const isBetweenZeroAndOne =
		(BigNumber.isBigNumber(amount) && betweenZeroAndOne(amount)) ||
		betweenZeroAndOne(parseWad(amount));

	const precisionAdjusted = isBetweenZeroAndOne ? 4 : precision;

	const formattedUSDAmount = formatWad(amount, {
		precision: precisionAdjusted ?? 0,
		padEnd: padEnd ?? false
	});

	const ETHAmount = converter.usdToWei(fromWad(amount));
	const formattedETHAmount = formatWad(ETHAmount, {
		precision: precisionAdjusted ?? 0,
		padEnd: padEnd ?? false
	});
</script>

{#if amount}
	<Popover message={`${formattedETHAmount}Ξ`}>
		<USD />{formattedUSDAmount}
	</Popover>
{/if}
