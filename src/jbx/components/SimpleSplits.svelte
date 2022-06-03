<script lang="ts">
	import { BigNumber } from 'ethers';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import Money from '$jbx/components/Money.svelte';
	import Popover from '$jbx/components/Popover.svelte';
	import type { Split } from '$jbx/models/v2/splits';
	import { formatDate } from '$jbx/utils/formatDate';
	import { formatSplitPercent } from '$jbx/utils/v2/math';
	import { Currency, DistributionLimitType } from '$jbx/constants';

	/**
	 * This component is used to display the distribution splits for a project
	 * in places like the Preview panel on the create layout, or Detail
	 * panel on the project detail layout.
	 *
	 * For the component to edit/remove split, see Split.svelte.
	 */

	export let split: Split;
	export let distributionLimitType: DistributionLimitType | undefined = undefined;
	export let distributionLimit: BigNumber | undefined = undefined;
	export let currency: Currency | undefined = undefined;
	export let formatWad: boolean = true;
</script>

<InfoSpaceBetween>
	<!-- TODO crown if Project owner (i.e. the logged in user) -->
	<div slot="left">
		{#if split.projectId && split.projectId != '0x00'}
			<p>
				@{split.projectId}:
			</p>
			<span
				>Tokens: <Popover
					placement="right"
					message="This address will receive any tokens minted when the recipient project gets paid."
				>
					<Icon name="questionCircle" />
				</Popover>
				{getTruncatedAddress(split.beneficiary)}</span
			>
		{:else}
			<p>
				{split.beneficiary && getTruncatedAddress(split.beneficiary)}:
			</p>
		{/if}
		{#if split.lockedUntil}
			<small>
				<Icon name="lock" />
				Locked until {formatDate(split.lockedUntil * 1000, 'yyyy-MM-dd')}
			</small>
		{/if}
		<span />
	</div>
	<p slot="right">
		{formatSplitPercent(BigNumber.from(split.percent))}%
		{#if distributionLimitType === DistributionLimitType.Specific}
			(<Money
				{formatWad}
				amount={(parseFloat(formatSplitPercent(BigNumber.from(split.percent))) * 100) / 100}
				{currency}
				precision={2}
			/>)
		{/if}
	</p>
</InfoSpaceBetween>

<style>
	p {
		margin: 0;
	}

	span {
		display: block;
		margin: 0;
		font-size: 12px;
		line-height: 0.9;
		margin-left: 20px;
		font-weight: 300;
		color: var(--text-secondary);
	}
	small {
		color: var(--text-secondary);
	}

	[slot='left'] {
		margin-top: 5px;
	}
</style>
