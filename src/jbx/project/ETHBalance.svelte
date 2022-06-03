<!-- <script lang="ts">
	import { BigNumber } from 'ethers';

	export let amount: BigNumber | string;
	export let precision: number;
	export let padEnd: boolean;

	const isBetweenZeroAndOne =
		(BigNumber.isBigNumber(amount) && betweenZeroAndOne(amount)) ||
		betweenZeroAndOne(parseWad(amount));

	const precisionAdjusted = isBetweenZeroAndOne ? 2 : precision;

	const formattedETHAmount = formatWad(amount, {
		precision: precisionAdjusted ?? 0,
		padEnd: padEnd ?? false
	});
</script>

{#if amount}
	<Tooltip>
		<svelte:fragment slot="title">
			<span>{(Number(amount) / 10 ** 18) * 3000}</span>
		</svelte:fragment>
		<CurrencySymbol currency={'ETH'} />
		<span style="font-family: 'sans-serif';">ETH</span>
		2.01
	</Tooltip>
{/if} -->
