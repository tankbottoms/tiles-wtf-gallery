<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$models/project-type';
	import ActionModal from '$components/ActionModal.svelte';
	import Button from '$components/Button.svelte';
	import Input from '$components/Input.svelte';
	import Trans from '$components/Trans.svelte';
	import { formattedNum } from '$utils/formatNumber';
	import { getTruncatedAddress } from '$components/Address.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let close: () => void;

	let amount: number;
	// TODO # of tokens user has for contract address
	let userTokens: number = 3000;

	onMount(() => {
		// TODO contract read
		// Pre set the amount to the max amount of tokens the user has
		amount = userTokens;
	});

	function claimTokens() {
		// TODO contract call to claim the tokesn of logged in user
		console.log('TODO call contract to claim tokens');
	}

	function setMax() {
		// TODO contract read to know what max tokens are of current user
		console.log('TODO set max tokens to claim');
		amount = 3000;
	}

	const title = `Claim ${$project.tokenSymbol || ''} as ERC-20 tokens`;
</script>

<!-- NOTE using form for the built in validation -->
<form on:submit|preventDefault={claimTokens}>
	<ActionModal {title}>
		<p>
			<Trans
				>Claiming BONE tokens will convert your BONE balance to ERC-20 tokens and mint them to your
				wallet.</Trans
			>
		</p>
		<h4><Trans>If you're unsure if you need to claim, you probably don't.</Trans></h4>
		<p>
			<Trans
				>You can redeem your BONE tokens for overflow without claiming them. You can transfer your
				unclaimed BONE tokens to another address from the Tools menu, which can be accessed from the
				wrench icon in the upper right hand corner of this project.</Trans
			>
		</p>
		<h4><Trans>Amount of ERC-20 tokens to claim</Trans></h4>

		<aside>
			<p class="secondary">
				<Trans>Your unclaimed {$project.tokenSymbol || ''} tokens</Trans>:
				<span> {formattedNum(userTokens)}</span>
			</p>
			<p class="secondary">
				<Trans>{$project.tokenSymbol || ''} ERC-20 address</Trans>:
				<span>
					{getTruncatedAddress($project.tokenAddress)}
				</span>
			</p>
		</aside>

		<Input type="number" bind:value={amount} max={userTokens} required>
			<div slot="addon" role="button" on:click={setMax}>MAX</div>
		</Input>
		<div slot="footer">
			<!-- Extra type so form understand this isn't a submit -->
			<Button type="secondary" buttonProps={{ type: 'button' }} size="md" on:click={close}
				>Close</Button
			>
			<Button type="primary" size="md">{title}</Button>
		</div>
	</ActionModal>
</form>

<style>
	p {
		font-weight: 300;
	}

	/* TODO this is now reused across three components, find abstraction */
	div[slot='addon'] {
		cursor: pointer;
		color: var(--text-action-primary);
		text-align: center;
		background: var(--background-action-secondary);
		border-radius: var(--radius-sm);
	}

	span {
		color: var(--text-primary);
	}
</style>
