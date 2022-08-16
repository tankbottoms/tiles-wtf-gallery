<script lang="ts">
	import Tiles from '$deployments/Tiles';
	import { connectedAccount, readNetwork } from '$stores/web3';
	import Store from '$utils/Store';
	import { getTransactionsByAddress } from '$utils/web3/contractReader';
	import { ethers } from 'ethers';
	import { onMount, setContext } from 'svelte';

	const grabHistoryStore = new Store<{
		loading: boolean;
		transactions: ethers.providers.TransactionResponse[];
		grabHistory: GrabHistoryItem[];
	}>({
		loading: false,
		transactions: [],
		grabHistory: []
	});

	setContext('GRAB_HISTORY_STORE', grabHistoryStore);

	async function fetchHistory() {
		$grabHistoryStore.loading = true;
		try {
			const transactions = await getTransactionsByAddress(Tiles[readNetwork.get().alias]);
			const sorted = transactions.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
			const iface = new ethers.utils.Interface(Tiles.abi);
			const history: GrabHistoryItem[] = [];
			sorted.forEach((tx) => {
				try {
					const decodedData = iface.parseTransaction({ data: tx.data });
					if (decodedData.name === 'grab') {
						history.push({
							caller: tx.from,
							address: decodedData.args[0],
							timestamp: tx.timestamp || 0,
							blockNumber: tx.blockNumber || 0
						});
					}
				} catch {}
			});
			$grabHistoryStore = {
				loading: false,
				transactions,
				grabHistory: history
			};
		} catch (error) {
			console.log('Error: could not fetch history transactions');
		}
		return history;
	}

	onMount(() => {
		let key = '';
		readNetwork.subscribe((net) => {
			connectedAccount.subscribe((user) => {
				const newKey = `${net.alias}-${(user || '')?.toLowerCase()}`;
				if (newKey !== key) {
					fetchHistory().then(() => {
						key = newKey;
					});
				}
			});
		});
	});
</script>

<slot />
