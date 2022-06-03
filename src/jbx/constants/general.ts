/**
 * This is a temporary file to collect the constants created for this svelte version,
 * and will be refactored once a natural structure has emerged.
 */

import { BigNumber } from 'ethers';

export enum Currency {
	ETH = 0,
	USD = 1
}

export const CurrencyName = {
	[Currency.ETH]: 'ETH',
	[Currency.USD]: 'USD'
};

export const CurrencyValue = {
	[Currency.ETH]: BigNumber.from(1),
	[Currency.USD]: BigNumber.from(2)
};

export enum DistributionLimitType {
	None = 0,
	Specific = 1,
	Infinite = 2
}
