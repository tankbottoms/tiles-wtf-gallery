<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import Button from '../Button.svelte';
	import Dropdown from '../Dropdown.svelte';
	import Icon from '../Icon.svelte';
	import Modal, { bind } from '../Modal.svelte';
	import { querySubgraph, type OrderDirection } from '$juicebox/utils/graph';
	import { constants } from 'ethers';
	import { formatPercent, formatWad } from '$juicebox/utils/formatNumber';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import DownloadHolders from './DownloadHolders.svelte';
	import InfiniteScroll from '../InfiniteScroll.svelte';

	export let close: () => void;

	type OrderBy = 'balance' | 'totalPaid' | 'lastPaidTimestamp';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let pageNumber = 0;
	let pageSize = 6;
	let orderBy = 'balance' as OrderBy;
	let scrollTarget: HTMLElement;
	let sort = 'desc' as OrderDirection;
	let showDownloadModal = false;

	let holders = [];
	let newBatch = [];

	let previousFetch = {
		orderBy,
		sort
	};

	async function loadTokenHolders(pageNumber: number, orderBy: OrderBy, sort: OrderDirection) {
		newBatch = await querySubgraph({
			entity: 'participant',
			keys: ['wallet', 'totalPaid', 'lastPaidTimestamp', 'balance', 'stakedBalance', 'id'],
			first: pageSize,
			skip: pageNumber * pageSize,
			orderBy,
			orderDirection: sort,
			where: [
				{
					key: 'projectId',
					value: $project.projectId.toNumber()
				},
				{
					key: 'cv',
					value: '2'
				},
				{
					key: 'balance',
					value: 0,
					operator: 'gt'
				},
				{
					key: 'wallet',
					value: constants.AddressZero,
					operator: 'not'
				}
			]
		});
	}

	onMount(() => {
		loadTokenHolders(pageNumber, orderBy, sort);
	});

	$: holders = [...holders, ...newBatch];
	$: {
		if (previousFetch.orderBy !== orderBy || previousFetch.sort !== sort) {
			pageNumber = 0;
			holders = [];
			loadTokenHolders(pageNumber, orderBy, sort).then(() => {
				// NOTE: why is this type not agreeing...
				previousFetch.sort = sort;
				previousFetch.orderBy = orderBy;
			});
		}
	}
</script>

<main>
	<h3>Token holders</h3>
	<div class="note">
		This list is using an experimental data index and may be inaccurate for some projects.
	</div>

	<div class="options">
		<Dropdown
			bind:value={orderBy}
			options={[
				{
					value: 'balance',
					label: 'Token balance'
				},
				{
					value: 'totalPaid',
					label: 'Amount paid'
				},
				{
					value: 'lastPaidTimestamp',
					label: 'Last paid'
				}
			]}
		/>
		<span>
			<Icon
				name={sort === 'desc' ? 'sortDescending' : 'sortAscending'}
				on:click={() => {
					sort = sort === 'desc' ? 'asc' : 'desc';
				}}
			/>
		</span>
		<span>
			<Icon
				name="download"
				on:click={() => {
					showDownloadModal = true;
				}}
			/>
		</span>
	</div>
	<br />
	<div class="list" bind:this={scrollTarget}>
		{#each holders as tokenHolder}
			<div class="item-container">
				<div class="item">
					<div>
						<div style="line-height: 1.4rem; margin-right: 10px;">
							<span style="user-select: all; line-height: 22px;">
								<EnsOrAddress address={tokenHolder.wallet} />
							</span>
						</div>
						<div class="subtext">
							<span style="font-family: sans-serif;">Ξ</span>{formatWad(tokenHolder.totalPaid, {
								precision: 6
							})} contributed
						</div>
					</div>
					<div style="text-align: right;">
						<div style="line-height: 1.4rem;">
							{formatWad(tokenHolder.balance, { precision: 0 })}{' '}
							{tokenSymbolText({
								tokenSymbol: $project.tokenSymbol,
								capitalize: false,
								plural: true
							})}
							({formatPercent(tokenHolder.balance, $project.totalTokenSupply)}%)
						</div>
						<div class="subtext">
							{formatWad(tokenHolder.stakedBalance, { precision: 0 })}
							{tokenSymbolText({
								tokenSymbol: $project.tokenSymbol,
								capitalize: false,
								plural: true
							})} unclaimed
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<InfiniteScroll
		elementScroll={scrollTarget}
		hasMore={!!newBatch.length}
		threshold={0}
		on:loadMore={() => {
			pageNumber += 1;
			loadTokenHolders(pageNumber, orderBy, sort);
		}}
	/>
</main>
<div class="buttons">
	<Button size="md" on:click={close}>Done</Button>
</div>
<Modal
	on:close={() => {
		showDownloadModal = false;
	}}
	show={showDownloadModal &&
		bind(DownloadHolders, {
			projectName: $project.projectMetadata.name,
			projectId: $project.projectId.toNumber(),
			tokenSymbol: $project.tokenSymbol
		})}
/>

<style>
	h3 {
		color: var(--text-header);
		margin-bottom: 10px;
	}

	main {
		max-width: 480px;
		position: relative;
	}

	.buttons {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
	}

	.item-container {
		margin-bottom: 20px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--stroke-tertiary);
	}

	.item {
		display: flex;
		place-content: space-between;
	}

	.list {
		max-height: 50vh;
		overflow-y: scroll;
	}

	.note {
		background: var(--background-l2);
		font-weight: 300;
		padding: 10px 10px;
		margin: 10px 0px;
	}

	.options {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.options span {
		cursor: pointer;
		line-height: 0;
		font-size: 16px;
	}

	.options span:last-of-type {
		color: var(--icon-action-primary);
	}

	.subtext {
		font-size: 0.7rem;
		color: var(--text-tertiary);
	}
</style>
