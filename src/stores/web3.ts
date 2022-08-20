import type { OnboardAPI } from '@web3-onboard/core';
import Store from '$utils/Store';
import { ethers, providers } from 'ethers';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { coinbaseWallet, gnosis as gnosisModule } from '$utils/onboard';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import { browser } from '$app/env';
import { blocknativeNetworks } from '$constants/networks';
import { getNetworkAliasByChainId, setNetworkAliasInQueryParams } from '$utils/web3/networkName';
import { pageReady } from '$stores';
import { get } from 'svelte/store';

export const ethPrice = new Store(1);
export const daiPrice = new Store(1);
export const provider = new Store<providers.Web3Provider>();
export const connectedAccount = new Store('');
export const chainId = new Store<number>(Number(getDefaultProvider().id));
export const web3Onboard = new Store<OnboardAPI>();

pageReady.update((state) => {
	state.web3 = false;
	return state;
});

let pendingInitialization: Promise<any>;

let unsub: Function;
web3Onboard.subscribe((onboard) => {
	if (!onboard || !browser) return;
	try {
		unsub?.();
	} catch (e) {
		console.log(`[stores/web3.ts] `, e);
	}
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
					const newNet = blocknativeNetworks.find(
						(net) => Number(net.id) === Number(activeChain.id)
					);
					if (newNet && Number(readNetwork.get().id) !== Number(newNet.id)) {
						readNetwork.set(newNet);
					}
					const networkAlias = getNetworkAliasByChainId(activeChain.id);
					setNetworkAliasInQueryParams(networkAlias);
					provider.set(new providers.Web3Provider(activeWallet.provider));
				} else {
					console.log(`[stores/web3.ts]['no active chain']`);
					connectedAccount.set('');
				}
			} else {
				console.log(`[stores/web3.ts]['no active account']`);
				connectedAccount.set('');
			}
		} else {
			console.log(`[stores/web3.ts]['no active wallet']`);
			connectedAccount.set('');
		}
	}).unsubscribe;
});

if (browser) {
	setTimeout(async () => {
		readNetwork.subscribe((net) => {
			const returnValue = connectedAccount.get() ? net : getDefaultProvider();
			console.log(`[stores/web3.ts]['read network'] ` + returnValue.alias);
			if (chainId.get() !== Number(returnValue.id)) chainId.set(Number(net.id));
		});
		pendingInitialization = initialize();
		try {
			await pendingInitialization;
		} catch (error) {
			console.log(`[stores/web3.ts]['failed to initialize wallet']`, error);
			pendingInitialization = null as any;
		}
	});
}
async function initialize() {
	const Onboard = (await import('@web3-onboard/core')).default;
	await new Promise((r) => setTimeout(r, 1000));
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
			desktop: {
				enabled: false
			},
			mobile: {
				enabled: false
			}
		},
		wallets: [coinbase, injected, walletConnect, ledger, trezor, gnosis],
		chains: blocknativeNetworks.map((chain) => {
			return {
				id: chain.id,
				token: chain.token,
				label: chain.label,
				rpcUrl: chain.rpcUrl
			};
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
	pageReady.update((state) => {
		state.web3 = true;
		return state;
	});
}

export async function web3Connect() {
	await pendingInitialization;
	const onboard = web3Onboard.get();
	if (!onboard) {
		return console.error('web3Onboard is not set');
	}
	if (!web3Onboard.get().state.get().chains.length) {
		console.log('wallet initializing...');
		await initialize();
		console.log('wallet initialized');
	}
	if (web3Onboard.get().state.get().chains?.length) {
		const wallets = await onboard.connectWallet();
		return wallets;
	} else {
		window.location.reload();
		console.log('error initializing wallet', web3Onboard.get().state.get().chains);
	}
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

export const readNetwork = new Store(getDefaultProvider());

export function getProvider() {
	return provider.get() || new ethers.providers.JsonRpcProvider(readNetwork.get().rpcUrl);
}

export function getDefaultProvider(): typeof blocknativeNetworks[0] {
	if (browser) {
		const defaultNetworkAlias =
			connectedAccount.get() && readNetwork.get()
				? readNetwork.get().alias
				: new URLSearchParams(location.search).get('network');
		return (
			blocknativeNetworks.find((net) => net.alias === defaultNetworkAlias) || blocknativeNetworks[0]
		);
	}
	return blocknativeNetworks[0];
}
