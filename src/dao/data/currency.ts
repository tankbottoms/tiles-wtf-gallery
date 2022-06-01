import { parseEther } from '@ethersproject/units';
import { getEtherPrice } from '$data/eth';
import { CurrencyUtils } from '$utils/formatCurrency';
import { V2_CURRENCY_USD } from '$utils/v2/currency';
import type { CurrencyOption } from '$models/currencyOption';

export function getCurrencyConverter() {
	const usdPerEth = getEtherPrice();
	return new CurrencyUtils(usdPerEth);
}

// Converts an amount (ETH or USD) to WEIw
export function getWeiConverter({
	currency,
	amount
}: {
	currency: CurrencyOption;
	amount: string;
}) {
	const converter = getCurrencyConverter();
	if (currency === V2_CURRENCY_USD) {
		return converter.usdToWei(amount);
	}
	return parseEther(amount ?? '0');
}
