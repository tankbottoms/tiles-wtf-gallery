import Joi from 'joi';
import type { ChainId, WalletInit, WalletModule } from '@web3-onboard/common';
import type {
	InitOptions,
	WalletState,
	ConnectOptions,
	DisconnectOptions,
	ConnectOptionsString,
	AccountCenter,
	TransactionHandlerReturn,
	NotifyOptions,
	Notification,
	CustomNotification,
	CustomNotificationUpdate,
	Notify
} from './types';
declare type ValidateReturn = Joi.ValidationResult | null;
export declare function validateWallet(data: WalletState | Partial<WalletState>): ValidateReturn;
export declare function validateInitOptions(data: InitOptions): ValidateReturn;
export declare function validateWalletModule(data: WalletModule): ValidateReturn;
export declare function validateConnectOptions(
	data: ConnectOptions | ConnectOptionsString
): ValidateReturn;
export declare function validateDisconnectOptions(data: DisconnectOptions): ValidateReturn;
export declare function validateString(str: string): ValidateReturn;
export declare function validateSetChainOptions(data: {
	chainId: ChainId;
	chainNamespace?: string;
	wallet?: WalletState['label'];
}): ValidateReturn;
export declare function validateAccountCenterUpdate(
	data: AccountCenter | Partial<AccountCenter>
): ValidateReturn;
export declare function validateWalletInit(data: WalletInit[]): ValidateReturn;
export declare function validateLocale(data: string): ValidateReturn;
export declare function validateNotify(data: Partial<Notify>): ValidateReturn;
export declare function validateNotifyOptions(data: Partial<NotifyOptions>): ValidateReturn;
export declare function validateTransactionHandlerReturn(
	data: TransactionHandlerReturn
): ValidateReturn;
export declare function validateNotification(data: Notification): ValidateReturn;
export declare function validateCustomNotificationUpdate(
	data: CustomNotificationUpdate
): ValidateReturn;
export declare function validateCustomNotification(data: CustomNotification): ValidateReturn;
export declare function validateUpdateBalances(data: WalletState[]): ValidateReturn;
export {};
