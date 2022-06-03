<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import Pay from '$jbx/components/Pay.svelte';
	import { weightedAmount } from '$jbx/utils/v2/math';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: payButton = $project?.projectMetadata?.payButton || 'Pay';
	$: currency = $project.distributionLimitCurrency;
</script>

<Pay
	{payButton}
	disabled
	onClick={() => console.info('🛠 TODO pay in create preview')}
	payInCurrency={currency}
	reservedRate={$project.fundingCycleMetadata.reservedRate.toNumber()}
	weight={$project.fundingCycle.weight}
	weightingFn={weightedAmount}
/>
