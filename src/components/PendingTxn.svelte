<script lang="ts" context="module">
	import Store from '$jbx/utils/Store';
	import type { ContractTransaction } from 'ethers';

	export const txnResponse = new Store<ContractTransaction>();
</script>

<script lang="ts">
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';

	let errorMessage = '';

	txnResponse.subscribe(async (_txnResponse) => {
		try {
			if (!_txnResponse) return;
			await _txnResponse?.wait();
			$txnResponse = null;
		} catch (error) {
			errorMessage = error.message;
		}
	});
</script>

{#if $txnResponse}
	<div class="overlay" />
	<div class="pending-txn-modal">
		<section>
			<div class="x-btn" on:click={() => ($txnResponse = null)}>x</div>
			<div>
				{#if errorMessage}
					<h2>
						<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
					</h2>
					<p class="error">{errorMessage}</p>
				{:else}
					<h2>Transaction pending...</h2>
					<p>Your transaction has been submitted and is awaiting confirmation.</p>
					<div>
						<Loading />
					</div>
				{/if}
			</div>
		</section>
	</div>
{/if}

<style>
	.pending-txn-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 10px 10px 20px #e0e0e0;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		max-width: unset;
		display: block;
		background: #0000000f;
	}
	.x-btn {
		position: fixed;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
	}
	img {
		max-width: 100px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2rem 0;
	}

	div {
		max-width: 400px;
		text-align: center;
	}
</style>
