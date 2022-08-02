import type { Device, ChainId, Chain, WalletInit, WalletModule } from '@web3-onboard/common';
import type { ChainStyle, ConnectedChain, DeviceNotBrowser, NotifyEventStyles } from './types';
export declare function getDevice(): Device | DeviceNotBrowser;
export declare const notNullish: <T>(value: T) => value is T;
export declare function validEnsChain(chainId: ChainId): boolean;
export declare function isSVG(str: string): boolean;
export declare function shortenAddress(add: string): string;
export declare function shortenEns(ens: string): string;
export declare const chainIdToLabel: Record<string, string>;
export declare const networkToChainId: Record<string, ChainId>;
export declare const chainStyles: Record<string, ChainStyle>;
export declare const unrecognizedChainStyle: {
	icon: string;
	color: string;
};
export declare function getDefaultChainStyles(chainId: string): ChainStyle | undefined;
export declare function connectedToValidAppChain(
	walletConnectedChain: ConnectedChain,
	chains: Chain[]
): boolean;
export declare function initializeWalletModules(
	modules: WalletInit[],
	device: Device
): WalletModule[];
export declare const defaultNotifyEventStyles: Record<string, NotifyEventStyles>;
