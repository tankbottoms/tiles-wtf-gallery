import { JsonRpcBatchProvider } from '@ethersproject/providers';

import { readNetwork } from '$stores/web3';

export const readProvider = () => new JsonRpcBatchProvider(readNetwork.get().rpcUrl);
