<script lang="ts">
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import ETHAmount from '../ETHAmount.svelte';
	import { formatHistoricalDate, timestampToUTC } from '$juicebox/utils/formatDate';
	import EtherscanLink from '../EtherscanLink.svelte';
	import type { PayEvent } from '$juicebox/models/subgraph-entities/vX/pay-event';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import RichNote from '../RichNote.svelte';
	import Popover from '../Popover.svelte';

	export let event: Partial<PayEvent>;

	function split(note: string) {
		return note.replace(/https?/g, (match) => `########${match}`).split('########');
	}
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small>Paid</small></p>
		<div class="amount">
			<ETHAmount amount={event.amount} precision={4} />
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
		{#if event.beneficiary}
			<p class="address"><EnsOrAddress address={event.beneficiary} /></p>
		{/if}
	</div>
</InfoSpaceBetween>

<div style="margin-top: 10px;">
	<!-- TODO: -->
	<RichNote note={event.note} style={{ marginTop: '10px' }} />
</div>

<style>
	.amount {
		font-weight: 350;
	}
</style>
