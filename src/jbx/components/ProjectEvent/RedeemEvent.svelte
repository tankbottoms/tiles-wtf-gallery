<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import ETHAmount from '$jbx/components/ETHAmount.svelte';
	import { formatHistoricalDate } from '$jbx/utils/formatDate';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';
	import EtherscanLink from '$jbx/components/EtherscanLink.svelte';
	import type { RedeemEvent } from '$jbx/models/subgraph-entities/vX/redeem-event';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { formatWad } from '$jbx/utils/formatNumber';
	import { tokenSymbolText } from '$jbx/utils/tokenSymbolText';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let event: Partial<RedeemEvent>;
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small>Redeemed</small></p>
		<div class="amount">
			{formatWad(event.amount, { precision: 0 })}
			{tokenSymbolText({
				tokenSymbol: $project.tokenSymbol,
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
