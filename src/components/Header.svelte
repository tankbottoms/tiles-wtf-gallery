<script lang="ts">
	import { onMount } from 'svelte';
	import {
		web3Connect,
		web3Disconnect,
		provider,
		connectedAccount,
		readNetwork,
		switchNetwork
	} from '$stores/web3';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';
	import { blocknativeNetworks } from '$jbx/constants/networks';

	let count = 0;
	let price = 0.01;

	onMount(async () => {
		console.log('🛠 TODO read contract, number of minted tiles and current price');
		// Async import module due to window being undefined

		connectedAccount.subscribe(async ($connectedAccount) => {
			if ($connectedAccount) {
				const ens = $provider && (await $provider.lookupAddress($connectedAccount));
				if (ens) {
					$connectedAccount = ens;
				}
			}
		});
	});

	let buttonElement: HTMLElement;
	let dropdownOpened = false;

	function handleWindowClick(event: MouseEvent) {
		if (dropdownOpened) {
			const target = event.target as HTMLElement;
			if (!buttonElement?.contains(target)) {
				dropdownOpened = false;
			}
		}
	}
</script>

<svelte:window on:click={handleWindowClick} />

<header>
	<div class="left">
		<a href="/">
			<img src="/favicon.svg" alt="Logo" />
		</a>
		{count} minted // current price: {price} ETH
	</div>

	<div class="right">
		{#if $connectedAccount}
			<p
				on:click={() => (dropdownOpened = !dropdownOpened)}
				style="user-select: none"
				bind:this={buttonElement}
			>
				{getTruncatedAddress($connectedAccount)}
				{#if dropdownOpened}
					<ul class="dropdown">
						<li>{getTruncatedAddress($connectedAccount)}</li>
						{#each blocknativeNetworks as network}
							<li
								on:click={async () => {
									await switchNetwork(Number(network.id));
									dropdownOpened = false;
								}}
								class:active={$readNetwork.alias === network.alias}
							>
								{network.alias}
							</li>
						{/each}
						<li on:click={web3Disconnect}>disconnect</li>
					</ul>
				{/if}
			</p>
			<button class="disconnect" on:click={web3Disconnect}>X</button>
		{:else}
			<button on:click={web3Connect}>connect</button>
		{/if}
	</div>
</header>

<style>
	.dropdown {
		position: absolute;
		right: 0;
		top: 70%;
		/* background: red; */
		list-style: none;
		padding: 0;
	}

	.dropdown li {
		cursor: pointer;
		padding: 5px 10px;
		border-bottom: 1px solid #eee;
	}
	.dropdown li.active {
		font-weight: bold;
	}
	header,
	.right,
	.left {
		display: flex;
	}

	header {
		justify-content: space-between;
	}

	.right,
	.left {
		align-items: center;
		gap: 10px;
	}

	.right {
		position: relative;
		justify-content: flex-end;
	}

	img {
		width: 25px;
	}

	button,
	p {
		margin-left: auto;
	}

	button {
		border: none;
		background: none;
		cursor: pointer;
		border-bottom: 3px solid gold;
		padding: 0px 0px 8px;
	}

	button:hover {
		border-bottom: 3px solid black;
	}

	.disconnect {
		padding: 0;
	}
</style>
