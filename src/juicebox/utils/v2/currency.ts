import type { V2CurrencyETH, V2CurrencyOption, V2CurrencyUSD } from '$juicebox/models/v2/currencyOption';

import {
	type CurrencyMetadata,
	type CurrencyName,
	type CurrencySymbol,
	CURRENCY_METADATA
} from '$juicebox/constants/currency';

// If a project has no fund access constraint,
// then currency will be 0.
// If this is the case, then we'll display the amount as ETH
export const NO_CURRENCY = 0;
export const V2_CURRENCY_ETH: V2CurrencyETH = 1;
export const V2_CURRENCY_USD: V2CurrencyUSD = 2;

export const V2_CURRENCY_METADATA: Record<V2CurrencyOption, CurrencyMetadata> = {
	[V2_CURRENCY_ETH]: CURRENCY_METADATA.ETH,
	[V2_CURRENCY_USD]: CURRENCY_METADATA.USD
};

const CURRENCY_MAP: { [key in V2CurrencyOption]: V2CurrencyOption } = {
	[V2_CURRENCY_ETH]: V2_CURRENCY_ETH,
	[V2_CURRENCY_USD]: V2_CURRENCY_USD
};

export const V2CurrencyName = (currency?: V2CurrencyOption): CurrencyName | undefined =>
	currency !== undefined ? V2_CURRENCY_METADATA[currency]?.name : undefined;

export const getV2CurrencyOption = (currencyName: CurrencyName): V2CurrencyOption =>
	currencyName === 'ETH' ? V2_CURRENCY_ETH : V2_CURRENCY_USD;

export const V2CurrencySymbol = (currency?: V2CurrencyOption): CurrencySymbol | undefined =>
	currency !== undefined ? V2_CURRENCY_METADATA[currency]?.symbol : undefined;

export const V2CurrencyStyle = (currency?: V2CurrencyOption) =>
	currency !== undefined ? V2_CURRENCY_METADATA[currency]?.style : undefined;

export const toV2Currency = (v1Currency: V2CurrencyOption): V2CurrencyOption => {
	return CURRENCY_MAP[v1Currency];
};
