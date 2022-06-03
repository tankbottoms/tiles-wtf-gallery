<script type="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import Button from '$jbx/components/Button.svelte';
	import HeavyBorderBox from '$jbx/components/HeavyBorderBox.svelte';
	import ReservedRate from './ReservedRate.svelte';
	import DiscountRate from './DiscountRate.svelte';
	import RedemptionRate from './RedemptionRate.svelte';
	import { DistributionLimitType } from '$jbx/constants';
	import {
		discountRateFrom,
		formatDiscountRate,
		formatRedemptionRate,
		formatReservedRate,
		redemptionRateFrom,
		reservedRateFrom
	} from '$jbx/utils/v2/math';
	import { getDistributionLimitType } from '$jbx/utils/v2/distributions';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let dirty = getContext('SHOW_DIRTY') as {
		showDirty: Store<boolean>;
		check: (arg1: any, arg2: any) => void;
	};

	export let close: () => void;

	let discountRate = parseFloat(formatDiscountRate($project.fundingCycle.discountRate));
	let redemptionRate = parseFloat(
		formatRedemptionRate($project.fundingCycleMetadata.redemptionRate)
	);
	let reservedRate = parseFloat(formatReservedRate($project.fundingCycleMetadata.reservedRate));

	let splits = $project.reservedTokensSplits;

	const initialState = {
		discountRate,
		redemptionRate,
		reservedRate,
		splits
	};

	function saveTokenConfiguration() {
		project.update((current) => ({
			...current,
			fundingCycle: {
				...current.fundingCycle,
				discountRate: discountRateFrom(discountRate.toString())
			},
			fundingCycleMetadata: {
				...current.fundingCycleMetadata,
				redemptionRate: redemptionRateFrom(redemptionRate.toString()),
				reservedRate: reservedRateFrom(reservedRate.toString())
			},
			reservedTokensSplits: splits
		}));
		close();
	}

	$: currentDistributionLimitType = getDistributionLimitType($project.distributionLimit);

	$: {
		dirty?.check(initialState, {
			discountRate,
			redemptionRate,
			reservedRate,
			splits
		});
	}
</script>

<slot name="header" />
<section id="tokenDrawer">
	<HeavyBorderBox>
		<ReservedRate bind:reservedRate bind:splits />
	</HeavyBorderBox>
	<HeavyBorderBox>
		<DiscountRate
			bind:discountRate
			{reservedRate}
			disabled={!$project.fundingCycle.duration.gt(0)}
		/>
	</HeavyBorderBox>
	<HeavyBorderBox>
		<RedemptionRate
			bind:redemptionRate
			disabled={currentDistributionLimitType === DistributionLimitType.Infinite}
		/>
	</HeavyBorderBox>
	<Button on:click={saveTokenConfiguration}>Save token configuration</Button>
</section>

<style>
	:global(#tokenDrawer header) {
		margin-bottom: 1rem;
	}
	:global(#tokenDrawer h3) {
		color: var(--text-header);
	}
	:global(#tokenDrawer h3) {
		margin: 0;
	}

	:global(#tokenDrawer h3 span) {
		color: var(--text-tertiary);
	}

	:global(#tokenDrawer p) {
		font-weight: 300;
	}

	:global(#tokenDrawer a) {
		font-weight: 500;
	}
</style>
