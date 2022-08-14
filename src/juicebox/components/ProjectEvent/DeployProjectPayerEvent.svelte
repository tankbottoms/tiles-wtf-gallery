<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import InfoSpaceBetween from '$juicebox/components/InfoSpaceBetween.svelte';
	import { formatHistoricalDate, timestampToUTC } from '$juicebox/utils/formatDate';
	import EtherscanLink from '$juicebox/components/EtherscanLink.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import Popover from '../Popover.svelte';
	import type { DeployETHERC20ProjectPayerEvent } from '$juicebox/models/subgraph-entities/v2/deploy-eth-erc20-project-payer-event';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let event: Partial<DeployETHERC20ProjectPayerEvent>;
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small>Created ETH-ERC20 payment address</small></p>
		<div class="contract">
			Address: <EnsOrAddress address={event.address} />
		</div>
	</div>
	<div slot="right">
		<p class="timestamp">
			{#if event.timestamp}
				<Popover>
					<span slot="content" class="utc">{timestampToUTC(event.timestamp * 1000)}</span>
					{formatHistoricalDate(event.timestamp * 1000)}
				</Popover>
			{/if}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		{#if event.caller}
			<p class="caller address">called by <EnsOrAddress address={event.caller} /></p>
		{/if}
	</div>
</InfoSpaceBetween>

<style>
	.contract {
		color: var(--text-secondary);
	}
	.caller {
		margin-top: 0.4rem;
	}
</style>
