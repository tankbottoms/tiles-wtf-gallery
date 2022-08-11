<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import ETHAmount from '../ETHAmount.svelte';
	import { formatHistoricalDate } from '$juicebox/utils/formatDate';
	import EtherscanLink from '../EtherscanLink.svelte';
	import type { RedeemEvent } from '$juicebox/models/subgraph-entities/vX/redeem-event';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import EnsOrAddress from '../EnsOrAddress.svelte';

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
		</div>
		<div style="color: rgba(225, 224, 232, 0.847);">
			<ETHAmount amount={event.returnAmount} precision={4} /> overflow received
		</div>
	</div>
	<div slot="right">
		<p class="timestamp">
			{event.timestamp && formatHistoricalDate(event.timestamp * 1000)}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
		<!-- TODO formatted address with ENS, look at FormattedAddress.tsx -->
		{#if event.beneficiary}
			<p class="address"><EnsOrAddress address={event.beneficiary} /></p>
		{/if}
	</div>
</InfoSpaceBetween>
