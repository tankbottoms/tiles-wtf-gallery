import { BigNumber } from '@ethersproject/bignumber';
import { readContract } from './web3/contractReader';

export async function getTilePrice(basePrice: BigNumber, multiplier: number, tierSize: number) {
	console.log(await readContract('Tiles', 'totalSupply'));
	const currentSupply = BigNumber.from(await readContract('Tiles', 'totalSupply'));

	const expectedPrice = currentSupply.div(tierSize).mul(multiplier).mul(basePrice);

	if (expectedPrice.eq(0)) {
		return BigNumber.from(basePrice);
	}

	return expectedPrice;
}
