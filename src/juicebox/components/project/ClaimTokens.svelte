<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import ActionModal from '../ActionModal.svelte';
	import Button from '../Button.svelte';
	import Input from '../Input.svelte';
	import Trans from '../Trans.svelte';
	import { formattedNum, fromWad, parseWad } from '$juicebox/utils/formatNumber';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import { readContract, writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { BigNumber } from 'ethers';
	import { connectedAccount } from '$stores/web3';
	import { bind, openModal } from '../Modal.svelte';
	import PendingTransaction from '../PendingTransaction.svelte';
	import { startConfetti } from '$utils/confetti';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let close: () => void;

	$: tokenSymbol = tokenSymbolText({
		tokenSymbol: $project.tokenSymbol,
		capitalize: false,
		plural: true
	});
	$: title = `Claim ${tokenSymbol} as ERC-20 tokens`;

	let input = 0;
	let unclaimedTokens: BigNumber = BigNumber.from('10000000000000000000');

	onMount(async () => {		
		unclaimedTokens = await readContract(V2ContractName.JBTokenStore, 'unclaimedBalanceOf', [
			$connectedAccount,
			BigNumber.from($project.projectId).toHexString()
		]);
	});

	async function claimTokens() {		
		console.log('TODO: call contract to claim tokens for logged in user');
		const claimAmount = BigNumber.from(parseWad(input));
		if (claimAmount.lte(unclaimedTokens)) {
			const txnResponse = await writeContract(V2ContractName.JBTokenStore, 'claimFor', [
				$connectedAccount,
				$project.projectId,
				claimAmount.toHexString()
			]);

			openModal(
				bind(PendingTransaction, {
					txnResponse
				})
			);
			const txnResult = await txnResponse.wait();			
			console.log(`claim tokens:${txnResult}`);
			startConfetti();
		}
	}

	function setMax() {
		input = Number(fromWad(unclaimedTokens));
	}
</script>

<!-- NOTE using form for the built in validation -->
<form on:submit|preventDefault={claimTokens}>
	<ActionModal {title}>
		<p>
			<Trans>
				Claiming {tokenSymbol} tokens will convert your {tokenSymbol} balance to ERC-20 tokens and mint
				them to your wallet.
			</Trans>
		</p>
		<h4><Trans>If you're unsure if you need to claim, you probably don't.</Trans></h4>
		<p>
			<Trans
				>You can redeem your {tokenSymbol} tokens for overflow without claiming them. You can transfer
				your unclaimed {tokenSymbol} tokens to another address from the Tools menu, which can be accessed
				from the wrench icon in the upper right hand corner of this project.</Trans
			>
		</p>
		<h4><Trans>Amount of ERC-20 tokens to claim</Trans></h4>

		<aside>
			<p class="secondary">
				<Trans>Your unclaimed {$project.tokenSymbol || ''} tokens</Trans>:
				<span> {formattedNum(fromWad(unclaimedTokens), { precision: 4 })}</span>
			</p>
			<p class="secondary">
				<Trans>{$project.tokenSymbol || ''} ERC-20 address</Trans>:
				<span>
					<EnsOrAddress address={$project.tokenAddress} />
				</span>
			</p>
		</aside>

		<Input type="number" bind:value={input} max={Number(fromWad(unclaimedTokens))} required>
			<div slot="addon" role="button" on:click={setMax}>MAX</div>
		</Input>
		<div slot="footer">
			<!-- Extra type so form understand this isn't a submit -->
			<Button type="secondary" buttonProps={{ type: 'button' }} size="md" on:click={close}>
				Close
			</Button>
			<Button
				type="primary"
				size="md"
				disabled={BigNumber.from(parseWad(input || '0')).gt(unclaimedTokens)}
				>Claim {tokenSymbol}</Button
			>
		</div>
	</ActionModal>
</form>

<style>
	p {
		font-weight: 300;
	}

	/* TODO this is now reused across three components, find abstraction */
	div[slot='addon'] {
		padding: 0px 5px;
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
