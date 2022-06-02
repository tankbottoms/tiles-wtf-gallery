<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import ETHAmount from '$components/ETHAmount.svelte';
	import { formatHistoricalDate } from '$utils/formatDate';
	import { getTruncatedAddress } from '$components/Address.svelte';
	import EtherscanLink from '$components/EtherscanLink.svelte';
	import type { RedeemEvent } from '$models/subgraph-entities/vX/redeem-event';
	import type { V2ProjectContextType } from '$models/project-type';
	import { formatWad } from '$utils/formatNumber';
	import { tokenSymbolText } from '$utils/tokenSymbolText';

	const project = getContext('project') as Store<V2ProjectContextType>;

	export let event: Partial<RedeemEvent>;
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small>Redeemed</small></p>
		<div class="amount">
			{formatWad(event.amount, { precision: 0 })}
			{tokenSymbolText({
				tokenSymbol: $project?.tokenSymbol,
				capitalize: false,
				plural: true
			})}
			<ETHAmount amount={event.returnAmount} precision={4} />
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
