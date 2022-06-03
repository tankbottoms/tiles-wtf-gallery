<script lang="ts">
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import ETHAmount from '$jbx/components/ETHAmount.svelte';
	import { formatHistoricalDate } from '$jbx/utils/formatDate';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';
	import EtherscanLink from '$jbx/components/EtherscanLink.svelte';
	import type { PayEvent } from '$jbx/models/subgraph-entities/pay-event';

	export let payment: PayEvent;
</script>

<div class="payment">
	<InfoSpaceBetween>
		<div slot="left">
			<p><small>Paid</small></p>
			<div class="amount">
				<ETHAmount amount={payment.amount} precision={4} />
			</div>
		</div>
		<div slot="right">
			<p class="timestamp">
				{payment.timestamp && formatHistoricalDate(payment.timestamp * 1000)}
				<EtherscanLink value={payment.txHash} type="tx" />
			</p>
			<!-- TODO formatted address with ENS, look at FormattedAddress.tsx -->
			{#if payment.beneficiary}
				<p class="address">{getTruncatedAddress(payment.beneficiary)}</p>
			{/if}
		</div>
	</InfoSpaceBetween>
</div>

<style>
	p {
		margin: 0;
	}

	small {
		color: var(--text-tertiary);
	}

	.address {
		color: var(--text-tertiary);
		font-weight: 300;
		font-size: 12px;
	}
	.amount {
		font-size: 1rem;
		font-weight: 300;
	}
	.timestamp {
		color: var(--text-tertiary);
		font-size: 0.7rem;
		font-weight: 300;
		text-align: end;
	}
	.payment {
		padding-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--stroke-tertiary);
	}
</style>
