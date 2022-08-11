<script lang="ts">
	import { getContext } from 'svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { getTotalSplitsPercentage } from '$juicebox/utils/v2/distributions';
	import type Store from '$juicebox/utils/Store';
	import ActionModal from '../ActionModal.svelte';
	import Button from '../Button.svelte';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import SimpleSplits from '../SimpleSplits.svelte';
	import { formattedNum, fromWad } from '$juicebox/utils/formatNumber';
	import OwnerCrown from '../OwnerCrown.svelte';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { openModal, bind } from '../Modal.svelte';
	import PendingTransaction from '../PendingTransaction.svelte';
	import { connectedAccount } from '$stores/web3';
	import EnsOrAddress from '../EnsOrAddress.svelte';

	export let close: () => {};
	export const isPreview = !!getContext('IS_PREVIEW') as boolean;
	// TODO show the reserved amounts... could probably send
	// in the reserved amount to SimpleSplit as the distribution limit
	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	const totalSplitPercentageTokenSplits = getTotalSplitsPercentage(
		$project.reservedTokensSplits || []
	);

	const title = `Distribute reserved ${$project.tokenSymbol || ''}`;

	async function distributeTokens() {
		const txnResponse = await writeContract(
			V2ContractName.JBController,
			'distributeReservedTokensOf',
			[$project.projectId, 'distribute tokens']
		);

		openModal(
			bind(PendingTransaction, {
				txnResponse
			})
		);
	}
</script>

<ActionModal {title}>
	<InfoSpaceBetween>
		<p slot="left">Reserved {$project.tokenSymbol || ''}:</p>
		<p slot="right">
			{formattedNum(fromWad($project.reservedTokenBalance), { precision: 0 })}
			{$project.tokenSymbol || 'tokens'}
		</p>
	</InfoSpaceBetween>

	<h4>{$project.tokenSymbol || ''} recipients</h4>
	{#if $project.reservedTokensSplits}
		{#each $project.reservedTokensSplits as split}
			<SimpleSplits {split} crown={split.beneficiary === $project.projectOwnerAddress} />
		{/each}
	{/if}
	{#if $project.reservedTokensSplits.length && 100 - totalSplitPercentageTokenSplits > 0}
		<InfoSpaceBetween>
			<p slot="left">
				{#if $project.projectOwnerAddress === $connectedAccount}
					Project Owner (you)
				{:else}
					<EnsOrAddress address={$project.projectOwnerAddress} />
				{/if}
				<OwnerCrown />:
			</p>
			<p slot="right">{formattedNum(100 - totalSplitPercentageTokenSplits, { precision: 2 })}%</p>
		</InfoSpaceBetween>
	{/if}
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button type="primary" size="md" on:click={distributeTokens}
			>Distribute {$project.tokenSymbol?.toUpperCase() || 'tokens'}</Button
		>
	</div>
</ActionModal>

<style>
	h4 {
		color: var(--text-header);
	}
</style>
