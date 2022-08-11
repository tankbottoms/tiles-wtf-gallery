<script lang="ts">
	import Button from './Button.svelte';
	import ETH from './Ethereum.svelte';
	import CurrencyInput from './CurrencyInput.svelte';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import { parseEther } from '@ethersproject/units';
	import { BigNumber } from 'ethers';
	import { getCurrencyConverter, getWeiConverter } from '$juicebox/data/currency';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import type { WeightFunction } from '$juicebox/utils/math';
	import { getContext, onMount } from 'svelte';
	import { V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { useUniswapPriceQuery } from '$juicebox/utils/ERC20UniswapPrice';
	import { useSushiswapPriceQuery } from '$juicebox/utils/ERC20SushiswapPrice';
	import type { Price as UniPrice, Token as UniToken } from '@uniswap/sdk-core';
	import type { Token as SushiToken, Price as SushiPrice } from '@sushiswap/sdk';
	import TokenAmmPriceRow from './TokenAMMPriceRow.svelte';

	export let disabled = false;
	export let onClick: (weiAmount: BigNumber) => void;
	export let payButton: string = 'Pay';
	export let reservedRate: number;
	export let token: string = 'tokens';
	export let weight: BigNumber;
	export let weightingFn: WeightFunction;

	let currency = BigNumber.from(V2_CURRENCY_ETH);
	let receiveText = 'Receive 0 tokens/1 ETH';
	let amount: number = 0;
	let formattedETHAmount: string;
	let converter: any;

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	function onPay() {
		let weiAmount: BigNumber;
		if (currency.eq(V2_CURRENCY_ETH)) {
			weiAmount = parseEther(amount.toString());
		} else {
			weiAmount = parseEther(formattedETHAmount);
		}
		onClick(weiAmount);
	}

	async function getReceiveText(payInCurrency: BigNumber) {
		const formatReceivedTickets = (wei: BigNumber) => {
			const exchangeRate = weightingFn(weight, reservedRate, wei, 'payer');
			return formatWad(exchangeRate, { precision: 0 });
		};

		let weiPayAmt = await getWeiConverter({
			currency: payInCurrency?.toNumber() as any,
			amount: `${amount || 0}`
		});

		const isZero = weiPayAmt.eq(0);

		if (!isZero) {
			const receivedTickets = formatReceivedTickets(weiPayAmt);
			const tokenReceiveText = tokenSymbolText({
				tokenSymbol: token,
				capitalize: false,
				plural: receivedTickets !== '1'
			});

			return `Receive ${receivedTickets} ${tokenReceiveText}`;
		}

		const receivedTickets = formatReceivedTickets(
			(payInCurrency.eq(V2_CURRENCY_ETH) ? parseEther('1') : converter.usdToWei('1')) ??
				BigNumber.from(0)
		);

		const tokenReceiveText = tokenSymbolText({
			tokenSymbol: token,
			capitalize: false,
			plural: receivedTickets !== '1'
		});

		return `Receive ${receivedTickets} ${tokenReceiveText}/1 ${
			payInCurrency.eq(V2_CURRENCY_ETH) ? 'ETH' : 'USD'
		}`;
	}

	let uniswapPriceData: {
		tokenSymbol: string;
		projectTokenPrice: UniPrice<UniToken, UniToken>;
		WETHPrice: UniPrice<UniToken, UniToken>;
		liquidity: string;
	};
	let sushiswapPriceData: {
		tokenSymbol: string;
		midPrice: SushiPrice<SushiToken, SushiToken>;
	};

	let loadingAMMPrice = false;

	onMount(async () => {
		if (payButton === '') {
			payButton = 'Pay';
		}
		converter = await getCurrencyConverter();

		if ($projectContext.tokenSymbol) {
			loadingAMMPrice = true;

			try {
				uniswapPriceData = await useUniswapPriceQuery({
					tokenSymbol: $projectContext.tokenSymbol,
					tokenAddress: $projectContext.tokenAddress
				});
			} catch (error) {}

			try {
				sushiswapPriceData = await useSushiswapPriceQuery({
					tokenSymbol: $projectContext.tokenSymbol,
					tokenAddress: $projectContext.tokenAddress
				});
			} catch (error) {}
			loadingAMMPrice = false;
		}
	});

	$: if (converter) {
		getReceiveText(currency).then((text) => {
			receiveText = text;
		});
		const ETHAmount = converter?.usdToWei(amount?.toString());
		formattedETHAmount = formatWad(ETHAmount, {
			precision: 9
		});
	}
</script>

<div class="wrapper">
	<div class="stacked expand">
		<CurrencyInput bind:currency bind:inputValue={amount} {disabled} />
		<small>{receiveText}</small>
		{#if $projectContext.tokenSymbol}
			<div>
				<small>
					or <a href={null} on:click|self|preventDefault class="link hover-show-amms">
						buy {$projectContext.tokenSymbol} on exchange
						<div class="other-exchanges">
							{#if loadingAMMPrice}
								loading...
							{:else if $projectContext.tokenSymbol}
								<span class="modal-title">Current 3rd Party Exchange Rates</span>
								<div class="exhanges">
									<TokenAmmPriceRow
										exchangeName="Uniswap"
										tokenSymbol={$projectContext.tokenSymbol}
										exchangeLink={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${$projectContext.tokenAddress}`}
										WETHPrice={uniswapPriceData?.WETHPrice.toFixed(0)}
										loading={loadingAMMPrice}
									/>
									<TokenAmmPriceRow
										exchangeName="Sushiswap"
										tokenSymbol={$projectContext.tokenSymbol}
										exchangeLink={`https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=${$projectContext.tokenAddress}`}
										WETHPrice={sushiswapPriceData?.midPrice.toFixed(0)}
										loading={loadingAMMPrice}
									/>
								</div>
							{/if}
						</div>
					</a>
				</small>
			</div>
		{/if}
	</div>
	<div class="stacked">
		<!-- TODO need input from pay button, pass in onClick -->
		<Button {disabled} size="md" on:click={onPay}>{payButton || 'Pay'}</Button>
		{#if currency.eq(V2_CURRENCY_USD)}
			<small>Paid as <ETH />{formattedETHAmount}</small>
		{/if}
	</div>
</div>

<style>
	.hover-show-amms {
		position: relative;
		padding-bottom: 1rem;
	}
	.other-exchanges {
		display: none;
	}
	.hover-show-amms:hover .other-exchanges,
	.other-exchanges:hover {
		display: block;
		position: absolute;
		z-index: 10;
		top: 24px;
		background: var(--background-l0);
		color: var(--text-primary);
		padding: 0.5rem 0.5rem;
		font-size: 0.8rem;
		width: 260px;
		border: 1px solid var(--stroke-tertiary);
	}
	.modal-title {
		margin-top: 0.5rem;
	}
	.wrapper {
		margin-top: 40px;
		display: flex;
	}

	.expand {
		flex: 1;
		margin-right: 10px;
	}

	.stacked {
		display: flex;
		flex-direction: column;
	}

	.stacked:last-of-type {
		text-align: center;
	}
</style>
