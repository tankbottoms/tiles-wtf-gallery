<script lang="ts">
	/**
	 * This is the modal that helps create a ERC-20 token.
	 */

	import ActionModal from '../ActionModal.svelte';
	import Button from '../Button.svelte';
	import Input from '../Input.svelte';
	import type { Project } from '$juicebox/models/subgraph-entities/vX/project';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import type Store from '$utils/Store';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { getContext } from 'svelte';

	export let close: () => void;
	export const onSuccess: () => void = () => null;

	let loading = false;

	const projectContext = getContext('PROJECT') as Store<Project>;

	let name = '';
	let symbol = '';

	async function issueToken() {
		if (!$projectContext) return console.error('project context not set');
		loading = true;
		console.log();
		try {
			const pendingTxn = await writeContract(
				V2ContractName.JBController,
				'issueTokenFor',
				[$projectContext.projectId, name, symbol],
				{
					gasLimit: '10000000'
				}
			);
			const txn = await pendingTxn.wait();
			console.log(txn.transactionHash);
			close?.();
		} catch (error) {
			loading = false;
			console.error(error);
		}
		loading = false;
	}
</script>

<form on:submit|preventDefault={issueToken}>
	<ActionModal title="Issue an ERC-20 token">
		<p>
			Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their
			existing token balance in the new token.
		</p>
		<Input type="text" placeholder="Project token" label="Token name" required bind:value={name} />
		<Input type="text" placeholder="PRJ" label="Token symbol" required bind:value={symbol} />
		<div slot="footer">
			<Button on:click={close} type="secondary" size="md" buttonProps={{ type: 'button' }}
				>Close</Button
			>
			<Button size="md" {loading}>Issue token</Button>
		</div>
	</ActionModal>
</form>

<style>
	p {
		font-weight: 300;
	}
</style>
