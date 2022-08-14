import Tiles from '$deployments/Tiles';
import { readNetwork } from '$stores/web3';
import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { getTransactionsByAddress, readContract } from './web3/contractReader';

export async function getTilePrice(basePrice: BigNumber, multiplier: number, tierSize: number) {
	const currentSupply = BigNumber.from(await readContract('Tiles', 'totalSupply'));
	const expectedPrice = currentSupply.div(tierSize).mul(multiplier).mul(basePrice);
	if (expectedPrice.eq(0)) {
		return BigNumber.from(basePrice);
	}

	return expectedPrice;
}

export async function getTilesHistory() {
	const transactions = await getTransactionsByAddress(Tiles[readNetwork.get().alias]);
	const sorted = transactions.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
	const iface = new ethers.utils.Interface(Tiles.abi);
	let tiles: { address: string; timestamp: number; blockNumber: number }[] = [];
	sorted.forEach((tx) => {
		try {
			const decodedData = iface.parseTransaction({ data: tx.data });
			if (decodedData.name === 'grab') {
				tiles.push({
					address: decodedData.args[0],
					timestamp: tx.timestamp || 0,
					blockNumber: tx.blockNumber || 0
				});
			}
		} catch {}
	});
	return tiles;
}
