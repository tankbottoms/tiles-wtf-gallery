<script lang="ts">
	import { connectedAccount, readNetwork, web3Connect } from '$stores/web3';
	import { onMount } from 'svelte';
	import { tokens } from '@uniswap/default-token-list';
	import { BigNumber, utils } from 'ethers';
	import ProjectLogo from '$juicebox/components/ProjectLogo.svelte';
	import Loading from '$juicebox/components/Loading.svelte';
	import { formattedNum } from '$juicebox/utils/formatNumber';

	const alchemyApiKeys = {
		mainnet: import.meta.env.VITE_ALCHEMY_MAINNET_API_KEY,
		rinkeby: import.meta.env.VITE_ALCHEMY_RINKEBY_API_KEY
	};

	type Token = typeof tokens[0];

	let balances: (Token & { balance: string; error: any })[] = [];
	let loading = false;

	onMount(() => {
		//
		connectedAccount.subscribe((user) => {
			if (!user) return;
			readNetwork.subscribe(async (network) => {
				loading = true;
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
				balances = Object.entries(
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

				console.log({ balances });

				loading = false;
			});
		});
	});
</script>

<main>
	{#if $connectedAccount}
		<section class="balances">
			{#if loading}
				<Loading height={200} />
			{:else}
				<h2>Token Holdings</h2>
				{#each balances as balance}
					<a href="./{balance.symbol}-{balance.address}" class="balance">
						<ProjectLogo
							uri={balance.logoURI?.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')}
							size={40}
						/>
						<div class="token-name-symbol">
							<div>{balance.name}</div>
							<div>{balance.symbol}</div>
						</div>
						<div class="balance">
							{formattedNum(utils.formatUnits(balance.balance, balance.decimals), { precision: 4 })}
							{balance.symbol}
						</div>
					</a>
				{:else}
					wallet does not hold tokens
				{/each}
			{/if}
		</section>
	{:else}
		<!--  -->
		<section class="not-connected">
			<a href={null} alt={''} on:click={web3Connect}>connect wallet</a>
		</section>
	{/if}
</main>

<style>
	main {
		min-height: calc(100vh - 85px);
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.not-connected {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		flex-grow: 1;
	}
	.balances {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 3rem;
	}
	.balance {
		padding: 0.25rem 0.5rem;
		display: flex;
		gap: 1rem;
		background: #f0f0f0;
		align-items: center;
		color: inherit;
	}
	.token-name-symbol {
		display: flex;
		flex-direction: column;
		width: 200px;
	}
</style>
