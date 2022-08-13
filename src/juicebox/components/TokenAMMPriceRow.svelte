<script lang="ts">
	import { formattedNum } from '$juicebox/utils/formatNumber';
	import Icon from './Icon.svelte';

	export let exchangeName: 'Uniswap' | 'Sushiswap';
	export let tokenSymbol: string;
	export let exchangeLink: string;
	export let WETHPrice: string;

	const icon = exchangeName?.toLowerCase() as 'uniswap' | 'sushiswap';
</script>

<div class="token-amm-price-row">
	<div class="left">
		<Icon name={icon} />
		<span class="name">
			{exchangeName}
		</span>
	</div>
	<div class="right">
		{#if WETHPrice}
			<a href={exchangeLink} target="_blank">
				{`${formattedNum(WETHPrice)} ${tokenSymbol}/1 ETH`}
				<Icon name="link" />
			</a>
		{:else}
			Unavailable
		{/if}
	</div>
</div>

<style>
	.token-amm-price-row {
		display: flex;
		font-size: 0.7rem;
		padding: 0.25rem 0;
		justify-content: space-between;
		align-items: center;
	}
	.name {
		display: inline-block;
		transform: translateY(-2px);
	}
</style>
