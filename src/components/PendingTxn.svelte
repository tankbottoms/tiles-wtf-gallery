<script lang="ts" context="module">
	import Store from '$utils/Store';
	import { constants, utils } from 'ethers';
	import { onMount } from 'svelte';
	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	
	export const txnResponse = new Store<ContractTransaction>();
	export const methodName = new Store('');

	txnResponse.subscribe((txn) => {
		if (!txn) {
			methodName.set('');
		}
	});
</script>

<script lang="ts">
	import { createCustomNotification } from '$utils/notification';
	import type { UpdateNotification } from 'bnc-notify';
	import type { ContractTransaction } from 'ethers';
	import Icon from '$juicebox/components/Icon.svelte';
	import Loading from '$juicebox/components/Loading.svelte';

	let errorMessage = '';
	let input: string | undefined;	
	let randomTiles: any[] = [];
	let tile = '';
	let showInvalidAddress = false;

	txnResponse.subscribe(async (_txnResponse) => {
		let update: UpdateNotification;
		try {
			if (!_txnResponse) return;
			const { update: _update } = createCustomNotification({
				type: 'pending',
				message: 'Your transaction has been submitted and is awaiting confirmation'
			});
			update = _update;
			await _txnResponse?.wait();
			update?.({
				type: 'success',
				message: 'Transaction succesfully completed',
				autoDismiss: 3000
			});
			$txnResponse = null;
		} catch (error) {
			update?.({
				type: 'error',
				message: 'Transaction aborted',
				autoDismiss: 3000
			});
			errorMessage = error.message;
		}
	});

	onMount(() => {
		const randomAddresses = generateRandomAddresses(51);
		randomTiles = randomAddresses.map((address) => ({ address, tile: generateTile(address) }));
	});

	$: {
		if (utils.isAddress(input || '')) {
			console.log(input);
			tile = generateTile(input || '');
			showInvalidAddress = false;
		} else if (input !== '' && input !== undefined) {
			tile = '';
			showInvalidAddress = true;
		} else {
			tile = '';
			showInvalidAddress = false;
		}
	}	
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
					{#each randomTiles as item}
						<div class="tileContainer">
							{@html item.tile}
							<span>{item.address}</span>
						</div>
					{/each}			

					{#if $methodName}					
						<h2>method: {$methodName}</h2>
					{/if}
					<h2>transaction pending...</h2>
					<p>your transaction has been submitted and is awaiting confirmation.</p>
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
