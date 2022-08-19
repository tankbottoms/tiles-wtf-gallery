<script lang="ts">
	import { connectedAccount, readNetwork } from '$stores/web3';
	import { onMount } from 'svelte';
	import { tokens } from '@uniswap/default-token-list';
	import { BigNumber } from 'ethers';
	import Store from '$utils/Store';
	import { setContext } from 'svelte';

	const alchemyApiKeys = {
		mainnet: import.meta.env.VITE_ALCHEMY_MAINNET_API_KEY,
		rinkeby: import.meta.env.VITE_ALCHEMY_RINKEBY_API_KEY
	};

	type Token = typeof tokens[0] & { balance: string; error: any };

	const store = new Store({
		loading: false,
		balances: [] as Token[]
	});

	setContext('TOKEN_BALANCES_STORE', store);

	onMount(() => {
		//
		connectedAccount.subscribe((user) => {
			if (!user) {
				$store.loading = false;
				$store.balances = [];
				return;
			}
			readNetwork.subscribe(async (network) => {
				$store.loading = true;

				const fetchURL = `https://eth-${network.alias}.g.alchemy.com/v2/${
					alchemyApiKeys[network.alias]
				}`;

				const raw = JSON.stringify({
					jsonrpc: '2.0',
					method: 'alchemy_getTokenBalances',
					headers: {
						'Content-Type': 'application/json'
					},
					params: [`${user}`, [...tokens.map((token) => token.address)]],
					id: 42
				});

				// Make the request and print the formatted response:
				const response = await fetch(fetchURL, {
					method: 'POST',
					body: raw,
					redirect: 'follow'
				});
				const jsonResponse = await response.json();
				const { result } = jsonResponse;
				$store.balances = Object.entries(
					Object.fromEntries(
						(result?.tokenBalances || [])
							.map(({ contractAddress, tokenBalance, error }) => {
								const token = tokens.find(
									(tkn) => tkn.address?.toLowerCase() === contractAddress?.toLowerCase()
								);
								return {
									...((token || {}) as typeof token),
									balance: tokenBalance?.padEnd(3, '0'),
									error
								};
							})
							.filter((token) => !token.error)
							.filter((token) => BigNumber.from(token.balance).gt(0))
							.map((balance) => [balance.address, balance])
					)
				).map((e) => e[1]);

				$store.loading = false;
			});
		});
	});
</script>

<slot />
