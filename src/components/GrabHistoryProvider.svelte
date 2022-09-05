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
		seizureHistory: GrabHistoryItem[];
		refreshHistory: Function;
	}>({
		loading: false,
		transactions: [],
		grabHistory: [],
		seizureHistory: [],
		refreshHistory: fetchHistory
	});

	setContext('GRAB_HISTORY_STORE', grabHistoryStore);

	async function fetchHistory() {
		$grabHistoryStore.loading = true;
		try {
			const transactions = await getTransactionsByAddress(Tiles[readNetwork.get().alias]);
			const sorted = transactions.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
			const iface = new ethers.utils.Interface(Tiles.abi);
			const history: GrabHistoryItem[] = [];
			const seizureHistory: GrabHistoryItem[] = [];
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
					} else if (decodedData.name === 'mint') {
						history.push({
							caller: tx.from,
							address: tx.from,
							timestamp: tx.timestamp || 0,
							blockNumber: tx.blockNumber || 0
						});
					} else if (decodedData.name === 'seize') {
						seizureHistory.push({
							caller: tx.from,
							address: tx.from,
							timestamp: tx.timestamp || 0,
							blockNumber: tx.blockNumber || 0
						});
					}
				} catch (e) {
					console.log(e);
				}
			});

			$grabHistoryStore = {
				loading: false,
				transactions,
				grabHistory: history.reduce((acc, item) => {
					if (!acc.find((_item) => _item.address === item.address)) acc.push(item);
					return acc;
				}, []),
				seizureHistory,
				refreshHistory: $grabHistoryStore.refreshHistory
			};
		} catch (error) {
			console.log('Error: could not fetch history transactions');
		}
		return $grabHistoryStore.grabHistory;
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
