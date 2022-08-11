<script lang="ts">
	import { formatDate } from '$juicebox/utils/formatDate';
	import Button from '../Button.svelte';
	import PopInfo from '../PopInfo.svelte';
	import type { WhereConfig } from '$juicebox/utils/graph';
	import { getContext, onMount } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { getAllProjectEvents } from '$juicebox/data/event';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import { ethers } from 'ethers';
	import { ensFromAddress } from '$juicebox/utils/web3/address';
	import type { ProjectEvent } from '$juicebox/models/subgraph-entities/vX/project-event';

	export let close;

	let loading: boolean;
	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	const resolved: Record<string, { ens: string; timestamp: number }> = {};

	onMount(() => {
		const jsonString = localStorage.getItem('resolved-ens') || '{}';
		const addresses = JSON.parse(jsonString) || {};
		for (const address in addresses) {
			const _address = address.toLowerCase();
			resolved[_address] = {
				ens: addresses[_address].ens,
				timestamp: addresses[_address].timestamp
			};
		}
	});

	function checkCache(address: string) {
		const THREE_DAYS = 3 * 86400_000;
		const _address = (address || '').toLowerCase();
		if (resolved[_address] && resolved[_address].timestamp > Date.now() - THREE_DAYS) {
			return resolved[_address].ens;
		}
		return '';
	}

	function setResolved(ens: string, address: string) {
		if (ens) {
			const _address = address.toLowerCase();
			resolved[_address] = { ens, timestamp: Date.now() };
			localStorage.setItem('resolved-ens', JSON.stringify(resolved));
		}
		return true;
	}

	async function getEns(address: string) {
		const ens = checkCache(address) || (await ensFromAddress(address));
		setResolved(ens, address);
		return ens === address ? '' : ens;
	}

	async function getEvents(filter?: keyof ProjectEvent) {
		loading = true;
		let where: WhereConfig<'projectEvent'>[] = [
			{ key: 'cv', value: '2' },
			{ key: 'projectId', value: $project.projectId.toNumber() }
		];
		if (filter) {
			where.push({
				key: filter,
				operator: 'not',
				value: null
			});
		}
		return await getAllProjectEvents(where);
	}

	function downloadCsv(rows: string[][], name: string) {
		const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', `@${$project.projectMetadata.name}_${name}.csv`);
		document.body.appendChild(link);

		link.click();
		loading = false;
	}
	async function downloadPayments() {
		try {
			const events = await getEvents('payEvent');
			const rows = [
				['Date', `Ethereum address`, 'Ens', 'Amount', 'Tokens returned', 'Transaction Id'] // CSV header row
			];
			const tokens =
				$project.tokenAddress && $project.tokenAddress === ethers.constants.AddressZero
					? $project.tokenAddress
					: $project.projectId.toString();
			for await (const e of events) {
				const info = e.payEvent;
				let date = formatDate((info.timestamp ?? 0) * 1000);
				const ens = await getEns(info.beneficiary);
				rows.push([
					date,
					info.beneficiary,
					ens,
					formatWad(info.amount, {
						precision: 4,
						padEnd: false
					}),
					tokens,
					info.txHash
				]);
			}
			downloadCsv(rows, 'payments');
		} catch (e) {
			console.error('Error downloading events', e);
			loading = false;
		}
	}
	async function downloadRedeemed() {
		try {
			const events = await getEvents('redeemEvent');
			const rows = [
				[
					'Date',
					`Ethereum address`,
					'Ens',
					'Token address',
					'Amount being redeemed',
					'Amount in ethereum returned',
					'Transaction Id'
				] // CSV header row
			];
			for await (const e of events) {
				const info = e.redeemEvent;
				let date = formatDate((info.timestamp ?? 0) * 1000);
				const ens = await getEns(info.beneficiary);
				rows.push([
					date,
					info.beneficiary,
					ens,
					$project.tokenAddress,
					formatWad(info.amount, { precision: 0 }),
					formatWad(info.returnAmount, { precision: 4 }),
					info.txHash
				]);
			}
			downloadCsv(rows, 'redeemed');
		} catch (e) {
			console.error('Error downloading participants', e);
			loading = false;
		}
	}
	async function downloadFunds() {
		try {
			const events = await getEvents('distributePayoutsEvent');

			const rows = [
				[
					'Date',
					`Ethereum address`,
					'Ens',
					'Project Id',
					'Payout currency type',
					'Amount',
					'Called by',
					'Transaction Id'
				] // CSV header row
			];
			for await (const e of events) {
				const info = e.distributePayoutsEvent;
				let date = formatDate((info.timestamp ?? 0) * 1000);
				const ens = await getEns(info.beneficiary);
				rows.push([
					date,
					info.beneficiary,
					ens,
					$project.projectId.toString(),
					'Ethereum',
					formatWad(info.distributedAmount, { precision: 4 }),
					info.caller,
					info.txHash
				]);
			}
			downloadCsv(rows, 'distributed_funds');
		} catch (e) {
			console.error('Error downloading participants', e);
			loading = false;
		}
	}
	async function downloadReservedTokens() {
		try {
			const events = await getEvents('distributeReservedTokensEvent');

			const rows = [
				[
					'Date',
					`Ethereum address`,
					'Ens',
					'Project Id',
					'Token address',
					'Amount',
					'Called by',
					'Transaction Id'
				] // CSV header row
			];
			for await (const e of events) {
				const info = e.distributeReservedTokensEvent;
				let date = formatDate((info.timestamp ?? 0) * 1000);
				const ens = await getEns(info.beneficiary);
				rows.push([
					date,
					info.beneficiary,
					ens,
					$project.projectId.toString(),
					$project.tokenAddress,
					formatWad(info.tokenCount, { precision: 2 }),
					info.caller,
					info.txHash
				]);
			}
			downloadCsv(rows, 'distributed_reserved_tokens');
		} catch (e) {
			console.error('Error downloading participants', e);
			loading = false;
		}
	}
	async function downloadEvents() {
		try {
			const events = await getEvents();
			const rows = [
				['Date', `Event type`, 'Memo', 'Called by'] // CSV header row
			];
			for await (const e of events) {
				if (e.projectCreateEvent) {
					const date = formatDate((e.projectCreateEvent.timestamp ?? 0) * 1000);
					rows.push([date, 'Project creation', '', e.projectCreateEvent.caller]);
				} else if (e.payEvent) {
					const date = formatDate((e.payEvent.timestamp ?? 0) * 1000);
					rows.push([date, 'Pay', e.payEvent.note, e.payEvent.caller]);
				} else if (e.deployedERC20Event) {
					const date = formatDate((e.deployedERC20Event.timestamp ?? 0) * 1000);
					rows.push([date, 'Deployed ERC-20', '', e.deployedERC20Event.caller]);
				} else if (e.distributePayoutsEvent) {
					const date = formatDate((e.distributePayoutsEvent.timestamp ?? 0) * 1000);
					rows.push([
						date,
						'Distribute Payouts',
						e.distributePayoutsEvent.memo,
						e.distributePayoutsEvent.caller
					]);
				} else if (e.distributeReservedTokensEvent) {
					const date = formatDate((e.distributeReservedTokensEvent.timestamp ?? 0) * 1000);
					rows.push([
						date,
						'Distribute reserved tokens',
						e.distributeReservedTokensEvent.memo,
						e.distributeReservedTokensEvent.caller
					]);
				} else if (e.redeemEvent) {
					const date = formatDate((e.redeemEvent.timestamp ?? 0) * 1000);
					rows.push([date, 'Redeem', '', e.redeemEvent.caller]);
				}
			}
			downloadCsv(rows, 'events');
		} catch (e) {
			console.error('Error downloading participants', e);
			loading = false;
		}
	}
</script>

<section>
	<h4>
		<PopInfo message="Tooltip text">Download CSV of project activity</PopInfo>
	</h4>
	<Button size="md" type="tertiary" on:click={downloadPayments} {loading}>Payments</Button>
	<Button size="md" type="tertiary" on:click={downloadRedeemed} {loading}>Redeemed</Button>
	<Button size="md" type="tertiary" on:click={downloadFunds} {loading}>Distributed funds</Button>
	<Button size="md" type="tertiary" on:click={downloadReservedTokens} {loading}>
		Distributed reserved tokens
	</Button>
	<Button size="md" type="tertiary" on:click={downloadEvents} {loading}>Events</Button>
	<div class="close">
		<Button size="md" type="secondary" on:click={close}>Close</Button>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: min(586px, 75vw);
	}
	h4 {
		color: var(--text-header);
		margin: 0;
	}

	.close {
		width: fit-content;
		align-self: flex-end;
	}
</style>
