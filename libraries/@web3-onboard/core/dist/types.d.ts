import type { SvelteComponent } from 'svelte';
import type {
	AppMetadata,
	Device,
	WalletInit,
	EIP1193Provider,
	WalletModule,
	Chain,
	TokenSymbol
} from '@web3-onboard/common';
import type setChain from './chain';
import type connect from './connect';
import type disconnect from './disconnect';
import type { state } from './store';
import type en from './i18n/en.json';
import type { EthereumTransactionData, Network } from 'bnc-sdk';
export interface InitOptions {
	/**
	 * Wallet modules to be initialized and added to wallet selection modal
	 */
	wallets: WalletInit[];
	/**
	 * The chains that your app works with
	 */
	chains: Chain[];
	/**
	 * Additional metadata about your app to be displayed in the Onboard UI
	 */
	appMetadata?: AppMetadata;
	/**
	 * Define custom copy for the 'en' locale or add locales to i18n your app
	 */
	i18n?: i18nOptions;
	/**
	 * Customize the account center UI
	 */
	accountCenter?: AccountCenterOptions;
	/**
	 * Opt in to Blocknative value add services (transaction updates) by providing
	 * your Blocknative API key, head to https://explorer.blocknative.com/account
	 */
	apiKey?: string;
	/**
	 * Transaction notification options
	 */
	notify?: Partial<NotifyOptions> | Partial<Notify>;
}
export interface OnboardAPI {
	connectWallet: typeof connect;
	disconnectWallet: typeof disconnect;
	setChain: typeof setChain;
	state: {
		select: typeof state.select;
		get: typeof state.get;
		actions: ExposedActions;
	};
}
interface ExposedActions {
	setWalletModules: (wallets: WalletInit[]) => void;
	setLocale: (locale: string) => void;
	updateNotify: (update: Partial<Notify>) => void;
	customNotification: (updatedNotification: CustomNotification) => {
		dismiss: () => void;
		update: UpdateNotification;
	};
	updateBalances: (addresses?: string[]) => Promise<void>;
	updateAccountCenter: (update: AccountCenter | Partial<AccountCenter>) => void;
}
export interface ConnectOptions {
	autoSelect?: {
		label: string;
		disableModals: boolean;
	};
}
export interface ConnectOptionsString {
	autoSelect?: string;
}
export interface DisconnectOptions {
	label: string;
}
export interface WalletWithLoadedIcon extends Omit<WalletModule, 'getIcon'> {
	icon: string;
}
export interface WalletWithLoadingIcon extends Omit<WalletWithLoadedIcon, 'icon'> {
	icon: Promise<string>;
}
export declare type ConnectedChain = {
	id: Chain['id'];
	namespace: Chain['namespace'];
};
export interface WalletState {
	label: string;
	icon: string;
	provider: EIP1193Provider;
	accounts: Account[];
	chains: ConnectedChain[];
	instance?: unknown;
}
export declare type Account = {
	address: Address;
	ens: Ens | null;
	balance: Balances | null;
};
export declare type Balances = Record<TokenSymbol, string> | null;
export interface Ens {
	name: string;
	avatar: Avatar | null;
	contentHash: string | null;
	getText: (key: string) => Promise<string | undefined>;
}
export declare type Avatar = {
	url: string;
	linkage: Array<{
		type: string;
		content: string;
	}>;
};
export declare type Address = string;
export interface AppState {
	chains: Chain[];
	walletModules: WalletModule[];
	wallets: WalletState[];
	accountCenter: AccountCenter;
	locale: Locale;
	notify: Notify;
	notifications: Notification[];
}
export declare type Configuration = {
	svelteInstance: SvelteComponent | null;
	appMetadata: AppMetadata | null;
	device: Device | DeviceNotBrowser;
	apiKey: string;
};
export declare type Locale = string;
export declare type i18nOptions = Record<Locale, i18n>;
export declare type i18n = typeof en;
export declare type CommonPositions = 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
export declare type AccountCenterPosition = CommonPositions;
export declare type NotificationPosition = CommonPositions;
export declare type AccountCenter = {
	enabled: boolean;
	position?: AccountCenterPosition;
	expanded?: boolean;
	minimal?: boolean;
};
export declare type AccountCenterOptions = {
	desktop: Omit<AccountCenter, 'expanded'>;
	mobile: Omit<AccountCenter, 'expanded'>;
};
export declare type Notify = {
	/**
	 * Defines whether whether to subscribe to transaction events or not
	 * default: true
	 */
	enabled: boolean;
	/**
	 * Callback that receives all transaction events
	 * Return a custom notification based on the event
	 * Or return false to disable notification for this event
	 * Or return undefined for a default notification
	 */
	transactionHandler: (event: EthereumTransactionData) => TransactionHandlerReturn;
	/**
	 * Position of notifications that defaults to the same position as the
	 * Account Center (if enabled) of the top right if AC is disabled
	 * and notifications are enabled (enabled by default with API key)
	 */
	position?: NotificationPosition;
};
export declare type NotifyOptions = {
	desktop: Notify;
	mobile: Notify;
};
export declare type Notification = {
	id: string;
	key: string;
	type: NotificationType;
	network: Network;
	startTime?: number;
	eventCode: string;
	message: string;
	autoDismiss: number;
	link?: string;
	onClick?: (event: Event) => void;
};
export declare type TransactionHandlerReturn = CustomNotification | boolean | void;
export declare type CustomNotification = Partial<
	Omit<Notification, 'startTime' | 'network' | 'id' | 'key'>
>;
export declare type CustomNotificationUpdate = Partial<Omit<Notification, 'startTime' | 'network'>>;
export declare type NotificationType = 'pending' | 'success' | 'error' | 'hint';
export interface UpdateNotification {
	(notificationObject: CustomNotification): {
		dismiss: () => void;
		update: UpdateNotification;
	};
}
export declare type Action =
	| AddChainsAction
	| AddWalletAction
	| UpdateWalletAction
	| RemoveWalletAction
	| ResetStoreAction
	| UpdateAccountAction
	| UpdateAccountCenterAction
	| SetWalletModulesAction
	| SetLocaleAction
	| UpdateNotifyAction
	| AddNotificationAction
	| RemoveNotificationAction
	| UpdateAllWalletsAction;
export declare type AddChainsAction = {
	type: 'add_chains';
	payload: Chain[];
};
export declare type AddWalletAction = {
	type: 'add_wallet';
	payload: WalletState;
};
export declare type UpdateWalletAction = {
	type: 'update_wallet';
	payload: {
		id: string;
	} & Partial<WalletState>;
};
export declare type RemoveWalletAction = {
	type: 'remove_wallet';
	payload: {
		id: string;
	};
};
export declare type ResetStoreAction = {
	type: 'reset_store';
	payload: unknown;
};
export declare type UpdateAccountAction = {
	type: 'update_account';
	payload: {
		id: string;
		address: string;
	} & Partial<Account>;
};
export declare type UpdateAccountCenterAction = {
	type: 'update_account_center';
	payload: AccountCenter | Partial<AccountCenter>;
};
export declare type SetWalletModulesAction = {
	type: 'set_wallet_modules';
	payload: WalletModule[];
};
export declare type SetLocaleAction = {
	type: 'set_locale';
	payload: string;
};
export declare type UpdateNotifyAction = {
	type: 'update_notify';
	payload: Partial<Notify>;
};
export declare type AddNotificationAction = {
	type: 'add_notification';
	payload: Notification;
};
export declare type RemoveNotificationAction = {
	type: 'remove_notification';
	payload: Notification['id'];
};
export declare type UpdateAllWalletsAction = {
	type: 'update_balance';
	payload: WalletState[];
};
export declare type ChainStyle = {
	icon: string;
	color: string;
};
export declare type NotifyEventStyles = {
	backgroundColor: string;
	borderColor: string;
	eventIcon: string;
	iconColor?: string;
};
export declare type DeviceNotBrowser = {
	type: null;
	os: null;
	browser: null;
};
export {};
