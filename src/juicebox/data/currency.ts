import { parseEther } from '@ethersproject/units';
import { getEtherPrice } from './eth';
import { CurrencyUtils } from '$juicebox/utils/formatCurrency';
import { V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';
import type { V2CurrencyOption } from '$juicebox/models/v2/currencyOption';

export async function getCurrencyConverter() {
	const usdPerEth = await getEtherPrice();
	return new CurrencyUtils(usdPerEth ?? 0);
}

// Converts an amount (ETH or USD) to WEIw
export async function getWeiConverter({
	currency,
	amount
}: {
	currency: V2CurrencyOption;
	amount: string;
}) {
	const converter = await getCurrencyConverter();
	if (currency === V2_CURRENCY_USD) {
		return converter.usdToWei(amount);
	}
	return parseEther(amount ?? '0');
}
