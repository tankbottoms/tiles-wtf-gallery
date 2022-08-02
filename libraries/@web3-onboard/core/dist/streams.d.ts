import type { Chain } from '@web3-onboard/common';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import type { WalletState, ConnectOptions } from './types';
export declare const reset$: Subject<void>;
export declare const disconnectWallet$: Subject<string>;
export declare const connectWallet$: BehaviorSubject<{
	autoSelect?: ConnectOptions['autoSelect'];
	actionRequired?: string;
	inProgress: boolean;
}>;
export declare const switchChainModal$: BehaviorSubject<{
	chain: Chain;
}>;
export declare const wallets$: Observable<WalletState[]>;
export declare const onMount$: Observable<void>;
export declare const onDestroy$: Observable<void>;
export declare const afterUpdate$: Observable<void>;
export declare const beforeUpdate$: Observable<void>;
