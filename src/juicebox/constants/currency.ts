import type * as CSS from 'csstype';

export type CurrencyName = 'ETH' | 'USD';
export type CurrencySymbol = 'Ξ' | 'US$';
export type CurrencyMetadata = {
	name: CurrencyName;
	symbol: CurrencySymbol;
	style?: CSS.Properties;
};

export const CURRENCY_METADATA: Record<CurrencyName, CurrencyMetadata> = {
	ETH: {
		name: 'ETH',
		symbol: 'Ξ',
		style: {
			fontFamily: 'sans-serif'
		}
	},
	USD: {
		name: 'USD',
		symbol: 'US$'
	}
};
