import type { WalletState } from './types';
declare function setChain(options: {
	chainId: string;
	chainNamespace?: string;
	wallet?: WalletState['label'];
}): Promise<boolean>;
export default setChain;
