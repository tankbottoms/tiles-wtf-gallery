<script lang="ts">
	import { getContext } from 'svelte';
	import type { V2ProjectContextType } from '$models/project-type';
	import type Store from '$utils/Store';
	import Button from '$components/Button.svelte';
	import BurnTokens from './BurnTokens.svelte';
	import ClaimTokens from './ClaimTokens.svelte';
	import Icon from '$components/Icon.svelte';
	import Trans from '$components/Trans.svelte';
	import { openModal } from '$components/Modal.svelte';

	export let close: () => void;

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	// MOCK data for now
	const tokenSymbol = 'BREAD';

	// TODO check when these buttons are disabled, and what disabled text to show
	const buttons = [
		{
			label: `Redeem ${tokenSymbol}`,
			body: "Redeem your BONE for a portion of the project's overflow. Any BONE you redeem will be burned.",
			onClick: () => {
				console.log('TODO redeem modal');
			},
			// TODO this modal isn't built yet, set to disabled to
			// style the disabled state
			disabled: true
		},
		{
			label: `Burn ${tokenSymbol}`,
			body: "Burn your BONE. You won't receive ETH in return because this project has no overflow.",
			onClick: () => openModal(BurnTokens),
			disabled: false
		},
		{
			label: `Claim ${tokenSymbol} as ERC-20`,
			body: 'Move your BONE from the Juicebox contract to your wallet.',
			onClick: () => openModal(ClaimTokens),
			disabled: false
		}
	];
</script>

<main>
	<h3>Manage {$project.tokenSymbol || ''} tokens</h3>
	{#each buttons as button}
		<button on:click={button.onClick} disabled={button.disabled}>
			<div>
				<h4><Trans>{button.label}</Trans></h4>
				<p>{button.body}</p>
			</div>
			<div class="icon">
				<Icon name="caret" />
			</div>
		</button>
	{/each}
</main>
<div class="buttons">
	<Button type="secondary" size="md" on:click={close}>Cancel</Button>
</div>

<style>
	h3 {
		color: var(--text-header);
		margin-bottom: 40px;
	}

	h4,
	.icon {
		color: var(--text-action-primary);
	}

	h4,
	p {
		text-align: left;
	}

	main {
		max-width: 480px;
	}
	/* TODO used in ProjectConfig, needs to be drawer type button */
	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid var(--stroke-action-primary);
		padding: 12px 12px;
		width: 100%;
		background: transparent;
		margin: 16px 0px;
		cursor: pointer;
	}

	button p {
		font-size: 0.75rem;
		font-weight: 300;
		margin: 5px 0px;
	}

	button:disabled,
	button:disabled h4,
	button:disabled .icon {
		color: var(--text-disabled);
	}
	button:disabled {
		border: 1px solid var(--stroke-disabled);
		cursor: not-allowed;
	}

	.buttons {
		float: right;
	}

	.icon {
		margin-left: 10px;
	}
</style>
