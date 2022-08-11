<script lang="ts">
	import { getContext } from 'svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import Button from '../Button.svelte';
	import RedeemTokens from './RedeemTokens.svelte';
	import BurnTokens from './BurnTokens.svelte';
	import ClaimTokens from './ClaimTokens.svelte';
	import Icon from '../Icon.svelte';
	import Trans from '../Trans.svelte';
	import { openModal } from '../Modal.svelte';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import { readNetwork } from '$stores/web3';
	import { constants } from 'ethers';

	export let close: () => void;

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: hasOverflow = Boolean($project.primaryTerminalCurrentOverflow?.gt(0));

	$: redeemDisabled = !hasOverflow;

	$: tokensLabel = tokenSymbolText({
		tokenSymbol: $project.tokenSymbol,
		capitalize: false,
		plural: true
	});

	$: hasIssuedTokens = $project.tokenAddress && $project.tokenAddress !== constants.AddressZero;

	// TODO check when these buttons are disabled, and what disabled text to show
	$: buttons = [
		{
			label: `Redeem ${tokensLabel} for ${$readNetwork.token}`,
			body: `Redeem your ${tokensLabel} for a portion of the project's overflow. Any ${tokensLabel} you redeem will be burned.`,
			onClick: () => openModal(RedeemTokens),
			// TODO this modal isn't built yet, set to disabled to
			// style the disabled state
			disabled: redeemDisabled
		},
		redeemDisabled
			? {
					label: `Burn ${tokensLabel}`,
					body: `Burn your ${tokensLabel}. You won't receive ${$readNetwork.token} in return because this project has no overflow.`,
					onClick: () => openModal(BurnTokens),
					disabled: false
			  }
			: null,
		hasIssuedTokens
			? {
					label: `Claim ${tokensLabel} as ERC-20`,
					body: `Move your ${tokensLabel} from the Juicebox contract to your wallet.`,
					onClick: () => openModal(ClaimTokens),
					disabled: false
			  }
			: null
	].filter(Boolean);
</script>

<main>
	<h3>Manage {$project.tokenSymbol || 'tokens'}</h3>
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
		display: flex;
		justify-content: flex-end;
	}

	.icon {
		margin-left: 10px;
	}
</style>
