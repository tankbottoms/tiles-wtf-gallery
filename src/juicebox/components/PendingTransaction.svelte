<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Trans from './Trans.svelte';
	import type { ContractTransaction } from 'ethers';
	import Icon from './Icon.svelte';
	import { generateRandomAddresses, generateTile } from '$tiles/tilesStandalone';
	import type { UpdateNotification } from 'bnc-notify';
	import { createCustomNotification } from '$utils/notification';
	import Loading from './Loading.svelte';

	export let txnResponse: ContractTransaction;
	export let functionName = '';
	export let close: () => void;

	let errorMessage = '';
	let tile = '';
	let interval: NodeJS.Timeout;

	onMount(async () => {
		await new Promise((r) => setTimeout(r, 50));
		try {
			const addresses = generateRandomAddresses(25);
			let i = 0;
			tile = generateTile(addresses[i++ % addresses.length]);
			setInterval(() => {
				tile = generateTile(addresses[i++ % addresses.length]);
			}, 750);

			let update: UpdateNotification;
			try {
				const { update: _update } = createCustomNotification({
					type: 'pending',
					message: 'Your transaction has been submitted and is awaiting confirmation'
				});
				update = _update;
				await txnResponse?.wait();
				update?.({
					type: 'success',
					message: 'Transaction succesfully completed',
					autoDismiss: 3000
				});
			} catch (error) {
				update?.({
					type: 'error',
					message: 'Transaction aborted',
					autoDismiss: 3000
				});
				errorMessage = error.message;
			}
			close();
		} catch (error) {
			errorMessage = error.message?.match(/^[\w\s]+/)?.[0];
		}
	});

	onDestroy(() => clearInterval(interval));
</script>

<section>
	<div>
		{#if errorMessage}
			<h2>
				<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
			</h2>
			<p class="error">{errorMessage}</p>
		{:else}
			{#if tile}
				<div class="tile">
					<div>
						{@html tile}
					</div>
				</div>
			{/if}
			<br />
			<div class="row">
				<Loading
					size={16}
					width={20}
					style="transform: translateY(-5px);margin-left: calc(-20px - 1rem)"
				/>
				{#if functionName}
					<h2>
						<span style="text-transform: lowercase;">
							function:{functionName}
						</span>
					</h2>
				{/if}
			</div>
			<p><Trans>your transaction has been submitted and is awaiting confirmation.</Trans></p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0rem 0;
	}

	div {
		max-width: 250px;
		text-align: center;
	}
	.tile {
		display: flex;
		justify-content: center;
	}
	.tile :global(svg) {
		max-width: 200px;
		max-height: 200px;
		aspect-ratio: 1 / 1;
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
