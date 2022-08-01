import { readContractByAddress } from '$jbx/utils/web3/contractReader';
import tileABI from '$abis/tilesAbi';
import contracts from '$constants/contracts';

export async function getTilePrice(basePrice, multiplier, tierSize) {
	const currentSupply = await readContractByAddress(contracts.tiles, tileABI, 'totalSupply');
	const expectedPrice = currentSupply.div(tierSize).mul(multiplier).mul(basePrice);

	if (expectedPrice.eq(0)) {
		return basePrice;
	}

	return expectedPrice;
}
