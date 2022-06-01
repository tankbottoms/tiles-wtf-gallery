<script lang="ts">
	import { formatHistoricalDate } from '$utils/formatDate';
	import type { DeployedERC20Event } from '$models/subgraph-entities/vX/deployed-erc20-event';
	import EtherscanLink from '$components/EtherscanLink.svelte';
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import Trans from '$components/Trans.svelte';

	export let event: Partial<DeployedERC20Event>;
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small><Trans>Deployed ERC20 token</Trans></small></p>
		<div class="amount">
			{event.symbol}
		</div>
	</div>
	<div slot="right">
		<p class="timestamp">
			{event.timestamp && formatHistoricalDate(event.timestamp * 1000)}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
	</div>
</InfoSpaceBetween>
