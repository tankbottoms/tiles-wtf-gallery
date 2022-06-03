<script lang="ts">
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import ETHAmount from '$jbx/components/ETHAmount.svelte';
	import { formatHistoricalDate } from '$jbx/utils/formatDate';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';
	import EtherscanLink from '$jbx/components/EtherscanLink.svelte';
	import type { PayEvent } from '$jbx/models/subgraph-entities/vX/pay-event';

	export let event: Partial<PayEvent>;
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
			{event.timestamp && formatHistoricalDate(event.timestamp * 1000)}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		<!-- TODO formatted address with ENS, look at FormattedAddress.tsx -->
		{#if event.beneficiary}
			<p class="address">{getTruncatedAddress(event.beneficiary)}</p>
		{/if}
	</div>
</InfoSpaceBetween>
