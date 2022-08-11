/**
 * This is a temporary file to collect the constants created for this svelte version,
 * and will be refactored once a natural structure has emerged.
 */

import { V2_CURRENCY_ETH, V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';
import { BigNumber } from 'ethers';

export const CurrencyName = {
	[V2_CURRENCY_ETH]: 'ETH',
	[V2_CURRENCY_USD]: 'USD'
};

export const CurrencyValue = {
	[V2_CURRENCY_ETH]: BigNumber.from(V2_CURRENCY_ETH),
	[V2_CURRENCY_USD]: BigNumber.from(V2_CURRENCY_USD)
};

export enum DistributionLimitType {
	None = 0,
	Specific = 1,
	Infinite = 2
}
