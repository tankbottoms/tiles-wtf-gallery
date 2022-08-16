<script lang="ts">
	import { connectedAccount } from '$stores/web3';
	import { contracts, readContract } from '$utils/web3/contractReader';
	import { BigNumber } from 'ethers';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let state: 'checking' | 'allowed' | 'denied' = 'checking';
	let balance: BigNumber = BigNumber.from(0);

	async function checkAccess(account: string) {
		balance = await readContract('Tiles', 'balanceOf', [account]);
		state = balance.gt(0) ? 'allowed' : 'denied';
	}

	$: if ($connectedAccount) {
		state = 'checking';
		checkAccess($connectedAccount);
	} else {
		state = 'denied';
		dispatch('denied', { reason: 'wallet not connected' });
	}

	$: console.log(state);
</script>

{#if state === 'checking'}
	<slot {state} {balance} account={$connectedAccount} name="checking" />
{:else if state === 'allowed'}
	<slot {state} {balance} account={$connectedAccount} />
	<slot {state} {balance} account={$connectedAccount} name="allowed" />
{:else if state === 'denied'}
	<slot {state} {balance} account={$connectedAccount} name="denied" />
{/if}
