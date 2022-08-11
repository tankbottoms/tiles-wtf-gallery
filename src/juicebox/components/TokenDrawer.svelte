<script type="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import Button from './Button.svelte';
	import HeavyBorderBox from './HeavyBorderBox.svelte';
	import ReservedRate from './ReservedRate.svelte';
	import DiscountRate from './DiscountRate.svelte';
	import RedemptionRate from './RedemptionRate.svelte';
	import { DistributionLimitType } from '$juicebox/constants';
	import {
		discountRateFrom,
		formatDiscountRate,
		formatIssuanceRate,
		formatRedemptionRate,
		formatReservedRate,
		issuanceRateFrom,
		redemptionRateFrom,
		reservedRateFrom
	} from '$juicebox/utils/v2/math';
	import { getDistributionLimitType } from '$juicebox/utils/v2/distributions';
	import { openModal as open } from './Modal.svelte';
	import InitialMintRate from './InitialMintRate.svelte';
	import { BigNumber } from 'ethers';
	import InfoBox from './InfoBox.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let dirty = getContext('SHOW_DIRTY') as {
		showDirty: Store<boolean>;
		check: (arg1: any, arg2: any) => void;
	};

	export let close: () => void;
	export let openModal: (arg1: any) => void = open;

	let discountRate = parseFloat(formatDiscountRate($project.fundingCycle.discountRate));
	let redemptionRate = parseFloat(
		formatRedemptionRate($project.fundingCycleMetadata.redemptionRate)
	);
	let reservedRate = parseFloat(formatReservedRate($project.fundingCycleMetadata.reservedRate));
	let issuanceRate = parseFloat(formatIssuanceRate($project.fundingCycle.weight.toString()));

	let splits = $project.reservedTokensSplits;

	const initialState = {
		discountRate,
		issuanceRate,
		redemptionRate,
		reservedRate,
		splits
	};

	function saveTokenConfiguration() {
		project.update((current) => ({
			...current,
			fundingCycle: {
				...current.fundingCycle,
				discountRate: discountRateFrom(discountRate.toString()),
				weight: BigNumber.from(issuanceRateFrom(`${issuanceRate}`))
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
			issuanceRate,
			redemptionRate,
			reservedRate,
			splits
		});
	}
</script>

<slot name="header" />
<InfoBox>
	Project tokens <b>aren't ERC-20 tokens</b> by default. Once you deploy your project, you can issue
	an ERC-20 for your holders to claim. This is <b>optional</b>.
</InfoBox>

<section id="tokenDrawer" style="margin-top:20px;">
	<InitialMintRate bind:issuanceRate />
	<HeavyBorderBox>
		<ReservedRate bind:reservedRate bind:splits {issuanceRate} {openModal} />
	</HeavyBorderBox>
	<HeavyBorderBox>
		<DiscountRate
			bind:discountRate
			{issuanceRate}
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
	<br />
	<Button on:click={saveTokenConfiguration}>Save token configuration</Button>
</section>

<style>
	:global(#tokenDrawer header) {
		margin-bottom: 1rem;
	}
	/* :global(#tokenDrawer h3) {
		color: var(--text-header);
	} */
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
