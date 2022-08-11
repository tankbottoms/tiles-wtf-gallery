<script lang="ts">
	import { onMount } from 'svelte';
	import { readProvider } from '$juicebox/constants/readProvider';
	import { formattedNum } from '$juicebox/utils/formatNumber';
	import { fromWad } from '$juicebox/utils/formatNumber';
	import { querySubgraphExhaustive } from '$juicebox/utils/graph';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import Button from '../Button.svelte';
	import Input from '../Input.svelte';

	export let projectId: number | undefined;
	export let tokenSymbol: string | undefined;
	export let projectName: string | undefined;
	export let close: VoidFunction | undefined;

	let latestBlockNumber: number;
	let blockNumber: number;
	let loading: boolean;

	let formattedBlockNumber: string;

	async function download() {
		if (blockNumber === undefined || !projectId) return;

		const rows = [
			[
				'Wallet address',
				`Total ${tokenSymbolText({ tokenSymbol })} balance`,
				'Unclaimed balance',
				'Claimed balance',
				'Total ETH paid',
				'Last paid timestamp'
			] // CSV header row
		];

		loading = true;

		try {
			console.log(blockNumber, projectId);
			const participants = await querySubgraphExhaustive({
				entity: 'participant',
				keys: [
					'wallet',
					'totalPaid',
					'balance',
					'stakedBalance',
					'unstakedBalance',
					'lastPaidTimestamp'
				],
				orderBy: 'balance',
				orderDirection: 'desc',
				block: {
					number: blockNumber
				},
				where: {
					key: 'projectId',
					value: projectId
				}
			});

			if (!participants) {
				throw new Error('No data.');
			}

			participants.forEach((p) => {
				let date = new Date((p.lastPaidTimestamp ?? 0) * 1000).toUTCString();

				if (date.includes(',')) date = date.split(',')[1];

				rows.push([
					p.wallet ?? '--',
					fromWad(p.balance),
					fromWad(p.stakedBalance),
					fromWad(p.unstakedBalance),
					fromWad(p.totalPaid),
					date
				]);
			});

			const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
			const encodedUri = encodeURI(csvContent);
			const link = document.createElement('a');
			link.setAttribute('href', encodedUri);
			link.setAttribute('download', `@${projectName}_holders-block${blockNumber}.csv`);
			document.body.appendChild(link);

			link.click();

			loading = false;
		} catch (e) {
			console.error('Error downloading participants', e);
			loading = false;
		}
	}

	onMount(() => {
		readProvider()
			.getBlockNumber()
			.then((val) => {
				blockNumber = val;
				latestBlockNumber = val;
				formattedBlockNumber = val.toString();
			});
	});

	$: {
		blockNumber = formattedBlockNumber
			? Number(formattedBlockNumber.replace(/,/g, '').replace(/\./g, ''))
			: blockNumber;
		formattedBlockNumber = formattedNum(blockNumber, {
			thousandsSeparator: ',',
			decimalSeparator: '.'
		});
	}
</script>

<section>
	<h4>
		Download CSV of {tokenSymbolText({ tokenSymbol })} holders
	</h4>
	<p>Block number</p>
	<Input bind:value={formattedBlockNumber}>
		<span
			slot="addon"
			on:click={() => {
				formattedBlockNumber = formattedNum(latestBlockNumber, {
					thousandsSeparator: ',',
					decimalSeparator: '.'
				});
			}}>Latest</span
		>
	</Input>
	<div class="buttons">
		<Button size="md" type="secondary" on:click={close}>Close</Button>
		<Button size="md" {loading} on:click={download}>Download CSV</Button>
	</div>
</section>

<style>
	h4 {
		color: var(--text-header);
	}

	p {
		color: var(--text-secondary);
		display: 'block';
		margin-top: 20;
		margin-bottom: 5px;
	}

	section {
		min-width: 300px;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	span[slot='addon'] {
		background: var(--background-action-secondary);
		cursor: pointer;
		padding: 3px;
	}
</style>
