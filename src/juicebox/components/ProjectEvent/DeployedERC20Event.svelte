<script lang="ts">
	import { formatHistoricalDate, timestampToUTC } from '$juicebox/utils/formatDate';
	import type { DeployedERC20Event } from '$juicebox/models/subgraph-entities/vX/deployed-erc20-event';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import Trans from '../Trans.svelte';
	import Popover from '../Popover.svelte';

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
		{#if event.timestamp}
			<Popover>
				<span slot="content" class="utc">{timestampToUTC(event.timestamp * 1000)}</span>
				{formatHistoricalDate(event.timestamp * 1000)}
			</Popover>
		{/if}
	</div>
</InfoSpaceBetween>
