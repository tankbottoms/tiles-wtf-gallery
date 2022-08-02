import type { DisconnectOptions, WalletState } from './types';
declare function disconnect(options: DisconnectOptions): Promise<WalletState[]>;
export default disconnect;
