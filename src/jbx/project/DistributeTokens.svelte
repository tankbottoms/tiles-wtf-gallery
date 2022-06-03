<script lang="ts">
	import { getContext } from 'svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { getTotalSplitsPercentage } from '$jbx/utils/v2/distributions';
	import type Store from '$jbx/utils/store';
	import ActionModal from '$jbx/components/ActionModal.svelte';
	import Button from '$jbx/components/Button.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import SimpleSplits from '$jbx/components/SimpleSplits.svelte';
	import { formattedNum } from '$jbx/utils/formatNumber';
	import OwnerCrown from '$jbx/components/OwnerCrown.svelte';
	import { writeContract } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import { openModal, bind } from '$jbx/components/Modal.svelte';
	import PendingTransaction from '$jbx/components/PendingTransaction.svelte';
	import { connectedAccount, web3Connect } from '$stores/web3';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';

	export let close: () => {};
	// TODO show the reserved amounts... could probably send
	// in the reserved amount to SimpleSplit as the distribution limit
	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	const reservedRate = $project.fundingCycleMetadata.reservedRate;
	const totalSplitPercentageTokenSplits = getTotalSplitsPercentage(
		$project.reservedTokensSplits || []
	);

	const title = `Distribute reserved ${$project.tokenSymbol || ''}`;

	const reservedAmount = 5500;

	async function distributeTokens() {
		await web3Connect();
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
			{formattedNum($project.reservedTokenBalance)}
			{$project.tokenSymbol || 'tokens'}
		</p>
	</InfoSpaceBetween>

	<h4>{$project.tokenSymbol || ''} recipients</h4>
	{#if $project.reservedTokensSplits}
		{#each $project.reservedTokensSplits as split}
			<SimpleSplits {split} />
		{/each}
	{/if}
	<InfoSpaceBetween>
		<p slot="left">
			{$project.projectOwnerAddress === $connectedAccount
				? '(you)'
				: getTruncatedAddress($project.projectOwnerAddress)}
			<OwnerCrown />:
		</p>
		<p slot="right">{100 - totalSplitPercentageTokenSplits}%</p>
	</InfoSpaceBetween>
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button type="primary" size="md" on:click={distributeTokens}>Distribute funds</Button>
	</div>
</ActionModal>

<style>
	h4 {
		color: var(--text-header);
	}
</style>
