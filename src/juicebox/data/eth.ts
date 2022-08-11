import { getProvider, readNetwork } from '$stores/web3';
import EACAggregatorProxyAbi from '$juicebox/constants/EACAggregatorProxyAbi';
import { readContractByAddress } from '$utils/web3/contractReader';
import { browser } from '$app/env';

const chainlinkEthPrice = {
	mainnet: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
	rinkeby: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e'
};

export async function getEtherPrice() {
	if (!browser) return 0;
	const data = JSON.parse(localStorage.getItem('ETH_PRICE_DATA') || '{}');
	if (Date.now() - (data.updatedAt ?? 0) > 1000 * 60 * 30) {
		const feed = await readContractByAddress(
			chainlinkEthPrice[readNetwork.get().alias],
			EACAggregatorProxyAbi,
			'latestRoundData'
		);
		const price = feed.answer.div(10 ** 8).toString();
		localStorage.setItem(
			'ETH_PRICE_DATA',
			JSON.stringify({
				price: feed.answer.div(10 ** 8).toString(),
				updatedAt: feed.updatedAt.toNumber() * 1000
			})
		);
		return Number(price);
	}
	return Number(data.price);
}

export async function getEthBalance(address: string) {
	return await getProvider().getBalance(address);
}
