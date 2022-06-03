<script lang="ts">
	/**
	 * This is the modal that helps create a ERC-20 token.
	 */

	import ActionModal from '$jbx/components/ActionModal.svelte';
	import Button from '$jbx/components/Button.svelte';
	import Input from '$jbx/components/Input.svelte';

	export let close: () => void;
	export let onSuccess: () => void;

	let loading = false;

	function issueToken() {
		loading = true;
		console.log('🛠 TODO implement me issue erc20 token');
		setTimeout(() => {
			loading = false;
			onSuccess();
			close();
		}, 1000);
	}
</script>

<form on:submit|preventDefault={issueToken}>
	<ActionModal title="Issue an ERC-20 token">
		<p>
			Issue an ERC-20 to be used as this project's token. Once issued, anyone can claim their
			existing token balance in the new token.
		</p>
		<Input type="text" placeholder="Project token" label="Token name" required />
		<Input type="text" placeholder="PRJ" label="Token symbol" required />
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
