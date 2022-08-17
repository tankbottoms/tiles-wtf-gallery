<script lang="ts">
	import { connectedAccount } from '$stores/web3';
	import { contracts, readContract } from '$utils/web3/contractReader';
	import { BigNumber } from 'ethers';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let state: 'Checking' | 'Allowed' | 'Denied' = 'Checking';
	let balance: BigNumber = BigNumber.from(0);

	async function checkAccess(account: string) {
		balance = await readContract('Tiles', 'balanceOf', [account]);
		state = balance.gt(0) ? 'Allowed' : 'Denied';
	}

	$: if ($connectedAccount) {
		state = 'Checking';
		checkAccess($connectedAccount);
	} else {
		state = 'Denied';
		dispatch('Denied', { reason: 'wallet not connected' });
	}

	$: console.log(state);
</script>

{#if state === 'Checking'}
	<slot {state} {balance} account={$connectedAccount} name="Checking" />
{:else if state === 'Allowed'}
	<slot {state} {balance} account={$connectedAccount} />
	<slot {state} {balance} account={$connectedAccount} name="Allowed" />
{:else if state === 'Denied'}
	<slot {state} {balance} account={$connectedAccount} name="Denied" />
{/if}
