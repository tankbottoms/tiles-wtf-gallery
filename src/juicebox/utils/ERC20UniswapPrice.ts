import { Pool } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import IUniswapV3FactoryABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { FACTORY_ADDRESS as UNISWAP_V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import * as ethersConstants from '@ethersproject/constants';

import { WETH } from '$juicebox/constants/tokens';
import { WAD_DECIMALS } from '$juicebox/constants/numbers';
import { readContractByAddress } from './web3/contractReader';
import type { BigNumber } from 'ethers';
import { readNetwork } from '$stores/web3';

interface Immutables {
	factory: string;
	token0: string;
	token1: string;
	fee: number;
	tickSpacing: number;
	maxLiquidityPerTick: BigNumber;
}

interface State {
	liquidity: BigNumber;
	sqrtPriceX96: BigNumber;
	tick: number;
	observationIndex: number;
	observationCardinality: number;
	observationCardinalityNext: number;
	feeProtocol: number;
	unlocked: boolean;
}

type Props = {
	tokenSymbol: string;
	tokenAddress: string;
};

/**
 * Pools are created at a specific fee tier.
 * https://docs.uniswap.org/protocol/concepts/V3-overview/fees#pool-fees-tiers
 */
const UNISWAP_FEES_BPS = [10000, 3000, 500];

/**
 * Hook to fetch the Uniswap price for a given token.
 * Uniswap-related code inspired by https://docs.uniswap.org/sdk/guides/fetching-prices.
 */
export function useUniswapPriceQuery({ tokenSymbol, tokenAddress }: Props) {
	/**
	 * Recursively attempts to find liquidty pool at a given [fee].
	 * Recurs through each fee tier until a pool is found.
	 * If no pool is found, return undefined.
	 * @returns contract address of liquidty pool
	 */
	const getPoolAddress = async (
		fee: number | undefined = UNISWAP_FEES_BPS[0]
	): Promise<string | undefined> => {
		const poolAddress = await readContractByAddress(
			UNISWAP_V3_FACTORY_ADDRESS,
			IUniswapV3FactoryABI.abi,
			'getPool',
			[tokenAddress, WETH, fee]
		);

		if (poolAddress && poolAddress !== ethersConstants.AddressZero) {
			return poolAddress;
		}

		// If we've got no more fees to search on, bail.
		const feeIdx = UNISWAP_FEES_BPS.findIndex((f) => f === fee);
		if (feeIdx === UNISWAP_FEES_BPS.length - 1) {
			return undefined;
		}

		return getPoolAddress(UNISWAP_FEES_BPS[feeIdx + 1]);
	};

	async function getPoolImmutables(address: string, abi: any) {
		const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
			readContractByAddress(address, abi, 'factory', []),
			readContractByAddress(address, abi, 'token0', []),
			readContractByAddress(address, abi, 'token1', []),
			readContractByAddress(address, abi, 'fee', []),
			readContractByAddress(address, abi, 'tickSpacing', []),
			readContractByAddress(address, abi, 'maxLiquidityPerTick', [])
		]);

		const immutables: Immutables = {
			factory,
			token0,
			token1,
			fee,
			tickSpacing,
			maxLiquidityPerTick
		};

		return immutables;
	}
	async function getPoolState(address: string, abi: any) {
		const [slot, liquidity] = await Promise.all([
			readContractByAddress(address, abi, 'slot0'),
			readContractByAddress(address, abi, 'liquidity')
		]);
		const PoolState: State = {
			liquidity,
			sqrtPriceX96: slot[0],
			tick: slot[1],
			observationIndex: slot[2],
			observationCardinality: slot[3],
			observationCardinalityNext: slot[4],
			feeProtocol: slot[5],
			unlocked: slot[6]
		};

		return PoolState;
	}
	async function fetchUniswapPrice() {
		try {
			const poolAddress = await getPoolAddress();
			if (!poolAddress) {
				throw new Error('No liquidity pool found.');
			}

			const [immutables, state] = await Promise.all([
				getPoolImmutables(poolAddress, IUniswapV3PoolABI.abi),
				getPoolState(poolAddress, IUniswapV3PoolABI.abi)
			]);

			const PROJECT_TOKEN = new Token(
				Number(readNetwork.get().id),
				immutables.token0,
				WAD_DECIMALS,
				tokenSymbol
			);
			const WETH = new Token(Number(readNetwork.get().id), immutables.token1, WAD_DECIMALS, 'WETH');

			const projectTokenETHPool = new Pool(
				PROJECT_TOKEN,
				WETH,
				immutables.fee,
				state.sqrtPriceX96.toString(),
				state.liquidity.toString(),
				state.tick
			);

			const projectTokenPrice = projectTokenETHPool.token0Price;
			const WETHPrice = projectTokenETHPool.token1Price;
			return {
				tokenSymbol,
				projectTokenPrice,
				WETHPrice,
				liquidity: projectTokenETHPool.liquidity.toString()
			};
		} catch (e) {
			console.log('can not fetch AMMs');
		}
	}
	return fetchUniswapPrice();
}
