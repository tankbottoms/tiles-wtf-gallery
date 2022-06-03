<script lang="ts">
	/**
	 * NOTE: Styling for this component is globally defined by the sibling file
	 * Main.svelte.
	 */
	import EtherscanLink from '$jbx/components/EtherscanLink.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import Trans from '$jbx/components/Trans.svelte';
	import { formatHistoricalDate } from '$jbx/utils/formatDate';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';

	import type { ProjectCreateEvent } from '$jbx/models/subgraph-entities/vX/project-create-event';

	export let event: Partial<ProjectCreateEvent>;
</script>

<InfoSpaceBetween>
	<div slot="left">
		<p><small><Trans>Created</Trans></small></p>
		<!-- TODO formatted address with ENS, look at FormattedAddress.tsx -->
		<p>Project created by {getTruncatedAddress(event.caller)}</p>
	</div>
	<div slot="right">
		<p class="timestamp">
			{event.timestamp && formatHistoricalDate(event.timestamp * 1000)}
			<EtherscanLink value={event.txHash} type="tx" />
		</p>
	</div>
</InfoSpaceBetween>
