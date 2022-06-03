import { JsonRpcBatchProvider } from '@ethersproject/providers';
import { get } from 'svelte/store';

import { readNetwork } from '$stores/web3';

export const readProvider = () => new JsonRpcBatchProvider(get(readNetwork).rpcUrl);
