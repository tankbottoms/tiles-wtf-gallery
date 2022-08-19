<script lang="ts">
	import TokenGated from '$components/TokenGated.svelte';
	//

	function handleAccessDenied() {
		console.log('handle access denied');
	}
	import { connectedAccount, web3Connect } from '$stores/web3';
	import { getContext } from 'svelte';
	import { utils } from 'ethers';
	import ProjectLogo from '$juicebox/components/ProjectLogo.svelte';
	import Loading from '$juicebox/components/Loading.svelte';
	import { formattedNum } from '$juicebox/utils/formatNumber';
	import type { tokens } from '@uniswap/default-token-list';
	import type Store from '$utils/Store';

	type Token = typeof tokens[0] & { balance: string; error: any };

	const store = getContext('TOKEN_BALANCES_STORE') as Store<{
		loading: boolean;
		balances: Token[];
	}>;

	$: balances = $store?.balances;
	$: loading = $store?.loading;

	$: console.log($store)
</script>

<main>
	<TokenGated on:denied={handleAccessDenied}>
		{#if $connectedAccount}
			<section class="balances">
				{#if loading}
					<Loading height={200} />
				{:else}
					<h2>Token Holdings</h2>
					{#each balances as balance}
						<div class="balance">
							<ProjectLogo
								uri={balance.logoURI?.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')}
								size={40}
							/>
							<div class="token-name-symbol">
								<div>{balance.name}</div>
								<div>{balance.symbol}</div>
							</div>
							<div class="balance">
								{formattedNum(utils.formatUnits(balance.balance, balance.decimals), {
									precision: 4
								})}
								{balance.symbol}
							</div>
						</div>
					{:else}
						wallet does not hold tokens
					{/each}
				{/if}
			</section>
		{:else}
			<section class="not-connected">
				<a href={null} alt={''} on:click={web3Connect}>connect wallet</a>
			</section>
		{/if}
		<p slot="denied" let:account>
			{#if account}
				Sorry, you do not have access to this page
			{:else}
				Please connect to a wallet
			{/if}
		</p>
		<p slot="checking">loading...</p>
	</TokenGated>
</main>

<style>
	main {
		min-height: calc(100vh - 85px);
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 3rem;
		box-sizing: border-box;
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
		/* align-items: center; */
		color: inherit;
	}
	.token-name-symbol {
		display: flex;
		flex-direction: column;
		width: 200px;
	}
</style>
