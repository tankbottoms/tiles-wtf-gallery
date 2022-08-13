import { blocknativeNetworks } from '$constants/networks';
import { providers } from 'ethers';

function getTruncatedAddress(address: string) {
	return address && address.startsWith('0x')
		? `${address.slice(0, 6)}...${address.slice(-6)}`
		: address;
}

export async function ensFromAddress(address: string, truncate: boolean = false) {
	const privider = new providers.JsonRpcProvider(blocknativeNetworks[0].rpcUrl);
	try {
		const ens = await privider.lookupAddress(address);
		return ens || (truncate ? getTruncatedAddress(address) : address);
	} catch (error) {
		return truncate ? getTruncatedAddress(address) : address;
	}
}

export async function addressFromEns(ens: string, truncate: boolean = false) {
	const privider = new providers.JsonRpcProvider(blocknativeNetworks[0].rpcUrl);
	try {
		const address = await privider.resolveName(ens);
		return address;
	} catch (error) {}
}
