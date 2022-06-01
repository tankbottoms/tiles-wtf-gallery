<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from 'src/tiles/Store';
	import { formattedNum } from '$utils/formatNumber';
	import type { V2ProjectContextType } from '$models/project-type';
	import ActionModal from '$components/ActionModal.svelte';
	import Button from '$components/Button.svelte';
	import InfoSpaceBetween from '$components/InfoSpaceBetween.svelte';
	import Trans from '$components/Trans.svelte';
	import Money from '$components/Money.svelte';
	import Input from '$components/Input.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let close: () => {};

	let amount: number;
	let title = `Burn ${$project.tokenSymbol || ''} tokens`;
	// TODO contract read for current users project.tokenAddress
	const userBalance = 0;

	function burnTokens() {
		// TODO contract call to burn tokens for user
		console.log('TODO call contract to burn tokens');
	}
	function setMax() {
		// TODO contract read to know what max tokens are of current user
		console.log('TODO set max tokens to burn');
		amount = userBalance;
	}
</script>

<ActionModal {title}>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>Redemption rate</Trans>:
		</p>
		<p slot="right">x%</p>
	</InfoSpaceBetween>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>Bone balance</Trans>:
		</p>
		<p slot="right">
			{formattedNum(userBalance)}
			{$project.tokenSymbol || 'tokens'}
		</p>
	</InfoSpaceBetween>
	<InfoSpaceBetween>
		<p slot="left">
			<Trans>Currently worth</Trans>:
		</p>
		<p slot="right"><Money /></p>
	</InfoSpaceBetween>
	<!-- TODO trans component removes strong -->
	<!-- <p><Trans><strong>This project has no overflow,</strong> so you will not receive any ETH for burning tokens.</Trans></p> -->
	<p>
		<strong>This project has no overflow,</strong> so you will not receive any ETH for burning tokens.
	</p>
	<Input type="number" placeholder="0" bind:value={amount}>
		<div slot="addon" role="button" on:click={setMax}>MAX</div>
	</Input>
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button type="primary" size="md" on:click={burnTokens}>{title}</Button>
	</div>
</ActionModal>

<style>
	p {
		font-weight: 300;
	}
	/* TODO move this to reusable place */
	div[slot='addon'] {
		cursor: pointer;
		color: var(--text-action-primary);
		text-align: center;
		background: var(--background-action-secondary);
		border-radius: var(--radius-sm);
	}
</style>
