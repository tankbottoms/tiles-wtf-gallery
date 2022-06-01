import type WalletConnectWeb3ProviderType from '@walletconnect/web3-provider';
import Store from '$utils/Store';
import { browser } from '$app/env';
import { providers } from 'ethers';
// import { toasts } from 'svelte-toasts';
// import environment from '$env/index';

export const networks = {
	ETHEREUM: [
		{
			name: 'Ethereum',
			symbol: 'ETH',
			chainId: 1
		},
		{
			name: 'Rinkeby',
			symbol: 'RETH',
			chainId: 4
		}
	],

};

function isMobile() { 
	// NOTE: Either of these would be nice to get working, but having trouble accessing 
	// navigator and screen
	//return navigator.userAgentData.isMobile
	// return screen.width < 738 && ('ontouchstart' in document.documentElement);
    // if(!window) {
    //     return false;
    // }
	return false;
	// return  ('ontouchstart' in window.document.documentElement)
}

function setWalletName() {
	if(isMobile()) {
		return 'walletconnect';
	}
	if(browser) {
		const persistedWallet = localStorage.getItem('wallet-name');
		if(persistedWallet) {
			return persistedWallet;
		}
		return "metamask" as any
	}
	return "walletconnect"
}

export const walletName = new Store<'metamask' | 'walletconnect'>(
	setWalletName()
);

export const ethPrice = new Store(0);
export const daiPrice = new Store(0);
export const provider = new Store<providers.Web3Provider>();
export const connectedAccount = new Store('');
export const chainId = new Store<number>(0);
export const disconnected = new Store(
	browser ? localStorage.getItem('disconnected') === 'true' : false
);

walletName.subscribe((name) => browser && localStorage.setItem('wallet-name', name));

export async function walletConnect(startup = false): Promise<void> {
	if (walletName.get() === 'walletconnect') {
		const WalletConnectWeb3Provider = (
			await import('@walletconnect/web3-provider/dist/umd/index.min')
		).default;
		const wc = new (WalletConnectWeb3Provider as typeof WalletConnectWeb3ProviderType)({
			infuraId: import.meta.env.VITE_INFURA_API_KEY as string
		});
		try {
			if (startup) wc.connector.accounts.length && wc.enable();
			else await wc.enable();
			if (wc.connected) {
				await initialize(wc);
				await connectWallet(true);
				await getConnectedAccount();
			}
		} catch (e: any) {
			console.error(e.message);
		}
	} else {
		initialize();
	}
}

export async function disconnectWalletConnect() {
	if (walletName.get() === 'walletconnect') {
		const _provider = provider.get().provider as any;
		_provider.disconnect();
		_provider.qrcodeModal.close();
	}
	provider.set(null);
}

export async function initialize(_provider = browser && window['ethereum']): Promise<void> {
	if (!_provider) return;
	provider.set(new providers.Web3Provider(browser && _provider));
	if (browser) {
		(window as any).provider = provider.get();
	}
	chainId.set(Number(_provider.chainId));
	if (
		walletName.get() === 'walletconnect' &&
		!networks.ETHEREUM.find((net) => net.chainId === chainId.get())
	) {
		alert('Wrong network');
		// toasts.add({
		// 	title: 'Wrong Network',
		// 	description: 'please connect to eth mainnet',
		// 	duration: 10000,
		// 	type: 'error',
		// 	placement: 'top-right',
		// 	onClick: () => {
		// 		_provider.disconnect();
		// 		window.location.reload();
		// 	},
		// 	onRemove: () => {
		// 		_provider.disconnect();
		// 		window.location.reload();
		// 	}
		// });
		return;
	}
	provider.get().on('network', (network) => {
		chainId.set(Number(network.chainId));
	});
	if (walletName.get() === 'walletconnect') {
		_provider.connector.on('disconnect', (_) => {
			window.location.reload();
		});
	} else {
		const $provider = provider.get();
		try {
			const account = await $provider.getSigner().getAddress();
			if (account) {
				connectedAccount.set(account);
			}
		} catch (e) {
			connectWallet();
		}
	}
	_provider.on('chainChanged', () => {
		window.location.reload();
	});
	_provider.on('accountsChanged', () => {
		window.location.reload();
	});
}

export async function getConnectedAccount(): Promise<string | null> {
	try {
		const address = (await provider.get().getSigner().getAddress()) as string;
		connectedAccount.set(address);
		disconnected.set(false);
		return address;
	} catch (e: any) {
		return null;
	}
}

export async function connectWallet(isWalletConnect = false): Promise<string> {
	if (!isWalletConnect) await provider.get().send('eth_requestAccounts', []);
	const signer = provider.get().getSigner();
	(await signer.getAddress()) as string;
	await getConnectedAccount();
	return (await signer.getAddress()) as string;
}

export async function disconnectWallet() {
	connectedAccount.set('');
	disconnected.set(true);
}

disconnected.subscribe((value) => {
	if (browser) {
		localStorage.setItem('disconnected', JSON.stringify(value));
	}
});

// Commented to disable auto-connect
// if (browser && !disconnected.get()) {
// 	setTimeout(() => walletConnect(true));
// 	getConnectedAccount();
// }
