import { Token, WETH9, Route, Pair, CurrencyAmount } from '@sushiswap/sdk';
import IUniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import { WAD_DECIMALS } from '$juicebox/constants/numbers';
import { readNetwork } from '$stores/web3';
import { readContractByAddress } from './web3/contractReader';

/**
 * Fetches information about a pair and constructs a pair from the given two tokens.
 * @param tokenA first token
 * @param tokenB second token
 * @param provider the provider to use to fetch the data
 * Source: https://github.com/Uniswap/v2-sdk/blob/a88048e9c4198a5bdaea00883ca00c8c8e582605/src/fetcher.ts
 */
async function fetchPairData(tokenA: Token, tokenB: Token): Promise<Pair> {
	const pairAddress = Pair.getAddress(tokenA, tokenB);

	const { reserve0, reserve1 } = await readContractByAddress(
		pairAddress,
		IUniswapV2PairABI.abi,
		'getReserves'
	);

	const balances = tokenA.sortsBefore(tokenB) ? [reserve0, reserve1] : [reserve1, reserve0];

	return new Pair(
		CurrencyAmount.fromRawAmount(tokenA, balances[0]),
		CurrencyAmount.fromRawAmount(tokenB, balances[1])
	);
}

type Props = {
	tokenSymbol: string;
	tokenAddress: string;
};

export async function useSushiswapPriceQuery({ tokenSymbol, tokenAddress }: Props) {
	const networkId = Number(readNetwork.get().id);
	const PROJECT_TOKEN = new Token(networkId, tokenAddress, WAD_DECIMALS, tokenSymbol);
	const WETH = WETH9[networkId];

	const pair = await fetchPairData(PROJECT_TOKEN, WETH);

	const route = new Route([pair], WETH, PROJECT_TOKEN);
	return {
		tokenSymbol,
		midPrice: route.midPrice
	};
}
