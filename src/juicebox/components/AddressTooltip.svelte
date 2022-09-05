<script lang="ts">
	import { browser } from '$app/environment';
	import { copyToClipboard } from '$juicebox/utils/clipboard';
	import Icon from './Icon.svelte';
	import Popover from './Popover.svelte';

	export let address: string;
	export let token: { symbol: string; decimals: number; image: string } = undefined;

	const hasMetamask = browser ? window.ethereum : false;

	const addToMetamask = async () => {
		const provider = window.ethereum as any;
		if (provider) {
			try {
				const wasAdded = await provider.request({
					method: 'wallet_watchAsset',
					params: {
						type: 'ERC20',
						options: {
							address,
							symbol: token.symbol,
							decimals: token.decimals,
							image: token.image
						}
					}
				});

				if (wasAdded) {
					console.info('Added to MetaMask');
				} else {
					console.warn('Not added to MetaMask');
				}
			} catch (error) {
				console.error(error);
			}
		}
	};
</script>

<Popover maxWidth="250px" placement="top">
	<div slot="content" class="tooltip">
		<span>
			<Popover placement="top">
				<div slot="content" class="tooltip">Go to Etherscan</div>
				<a class="link" href={`https://etherscan.io/address/${address}`}>
					{address}
					<Icon name="etherscan" />
				</a>
			</Popover>
			<Popover placement="top">
				<div slot="content" class="tooltip">Copy to clipboard</div>
				<span class="copy" on:click={() => copyToClipboard(address)}>
					<Icon name="copy" />
				</span>
			</Popover>
			{#if token && hasMetamask}
				<Popover placement="top">
					<div slot="content" class="tooltip">Add to MetaMask</div>
					<span class="copy" on:click={addToMetamask}>
						<Icon name="metamask" />
					</span>
				</Popover>
			{/if}
		</span>
	</div>
	<slot />
</Popover>

<style lang="scss">
	.tooltip {
		font-weight: 300;
		font-size: 14px;
		word-wrap: break-word;
		color: var(--text-primary);
		text-align: start;
		span {
			.tooltip {
				white-space: nowrap;
			}
		}
	}
	.link {
		font-weight: 300;
		font-size: 14px;
		&:hover {
			color: var(--text-action-primary);
		}
	}
	.copy {
		cursor: pointer;
		font-size: 14px;
	}
</style>
