import Store from '$jbx/utils/Store';
import { providers } from 'ethers';
import type { OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { coinbaseWallet, gnosis as gnosisModule } from '$jbx/utils/onboard';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import { browser } from '$app/env';
import { blocknativeNetworks } from '$jbx/constants/networks';
import {
	getNetworkAliasByChainId,
	setNetworkAliasInQueryParams
} from '$jbx/utils/web3/networkName';
import { derived } from 'svelte/store';

export const ethPrice = new Store(0);
export const daiPrice = new Store(0);
export const provider = new Store<providers.Web3Provider>();
export const connectedAccount = new Store('');
export const chainId = new Store<number>(4);
export const web3Onboard = new Store<OnboardAPI>();

let unsub;
web3Onboard.subscribe((onboard) => {
	if (!onboard || !browser) return;
	unsub?.();
	const observable = onboard.state.select('wallets');
	unsub = observable.subscribe((state) => {
		const activeWallet = state?.[0];
		const connectedWallets = state.map(({ label }) => label);
		localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
		if (activeWallet) {
			const activeAccount = activeWallet.accounts?.[0];
			const activeChain = activeWallet.chains?.[0];
			if (activeAccount) {
				if (activeChain) {
					connectedAccount.set(activeAccount.address);
					chainId.set(Number(activeChain.id));
					const networkAlias = getNetworkAliasByChainId(activeChain.id);
					setNetworkAliasInQueryParams(networkAlias);
					provider.set(new providers.Web3Provider(activeWallet.provider));
				} else {
					console.log('no active chain');
					connectedAccount.set('');
				}
			} else {
				console.log('no active account');
				connectedAccount.set('');
			}
		} else {
			console.log('no active wallet');
			connectedAccount.set('');
		}
	}).unsubscribe;
});

browser && setTimeout(initialize, 500);
async function initialize() {
	const Onboard = (await import('@web3-onboard/core')).default;
	const injected = injectedModule();
	// initialize the module with options
	const walletConnect = walletConnectModule({
		bridge: 'https://bridge.walletconnect.org/',
		qrcodeModalOptions: {
			mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
		}
	});
	// initialize the module with options
	const coinbase = coinbaseWallet({ darkMode: true });
	const ledger = ledgerModule();
	const trezor = trezorModule({
		email: '<EMAIL_CONTACT>',
		appUrl: './'
	});
	const gnosis = gnosisModule({});

	const onboard = Onboard({
		accountCenter: {
			mobile: {
				enabled: false
			},
			desktop: {
				enabled: false
			}
		},
		wallets: [coinbase, injected, walletConnect, ledger, trezor, gnosis],
		chains: blocknativeNetworks.map((chain) => {
			const { alias, subgraphUrl, ..._chain } = chain;
			return _chain;
		}),
		appMetadata: {
			name: 'Juicebox',
			icon: '/favicon.svg',
			logo: '/favicon.svg',
			description: 'Community funding for people and projects',
			recommendedInjectedWallets: [
				{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
				{ name: 'MetaMask', url: 'https://metamask.io' }
			]
		}
	});
	web3Onboard.set(onboard);
	const previouslyConnectedWallets = JSON.parse(
		localStorage.getItem('connectedWallets') || '[]'
	) as any[];
	if (previouslyConnectedWallets.length) {
		await onboard.connectWallet({
			autoSelect: { label: previouslyConnectedWallets[0], disableModals: true }
		});
	}
}

export async function web3Connect() {
	if (!web3Onboard.get() || !web3Onboard.get().state.get().chains.length) {
		await initialize();
	}
	const onboard = web3Onboard.get();
	if (!onboard) throw Error('web3Onboard is not set');
	console.log('try connect');
	const wallets = await onboard.connectWallet();
	return wallets;
}

export async function web3Disconnect() {
	const onboard = web3Onboard.get();
	if (!onboard) throw Error('web3Onboard is not set');
	await onboard.disconnectWallet({
		label: onboard?.state?.get()?.chains?.[0]?.label
	});
	console.log('disconnected');
	connectedAccount.set('');
	setNetworkAliasInQueryParams('');
	localStorage.setItem('connectedWallets', JSON.stringify([]));
}

export function getSupportedNetworks() {
	const onboard = web3Onboard.get();
	if (!onboard) return [];
	return onboard.state.get().chains;
}

export async function switchNetwork(_chainId: number | string) {
	const onboard = web3Onboard.get();
	if (!onboard) return;
	await onboard.setChain({
		chainId: `0x${Number(_chainId).toString(16)}`
	});
}

export const readNetwork = new Store(blocknativeNetworks[0]);

chainId.subscribe(($chainId) => {
	const net = blocknativeNetworks.find((net) => Number(net.id) === Number($chainId));
	const returnValue = net || blocknativeNetworks[0];
	console.log('Read Network:', returnValue.alias);
	readNetwork.set(returnValue);
});
