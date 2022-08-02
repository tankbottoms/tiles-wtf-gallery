import type { ConnectOptions, ConnectOptionsString, WalletState } from './types';
declare function connect(options?: ConnectOptions | ConnectOptionsString): Promise<WalletState[]>;
export default connect;
