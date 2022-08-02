import type { InitOptions, OnboardAPI } from './types';
export type {
	InitOptions,
	OnboardAPI,
	ConnectOptions,
	DisconnectOptions,
	WalletState,
	ConnectedChain,
	AccountCenter,
	AppState,
	CustomNotification,
	Notification,
	Notify,
	UpdateNotification
} from './types';
export type { EIP1193Provider } from '@web3-onboard/common';
declare function init(options: InitOptions): OnboardAPI;
export default init;
