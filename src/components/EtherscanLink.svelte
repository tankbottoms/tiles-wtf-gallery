<script lang="ts">
	import { NetworkName } from '$models/network-name';
	import { readNetwork } from '$constants/networks';
	import Popover from '$components/Popover.svelte';
	import ExternalLink from './ExternalLink.svelte';
	import Icon from './Icon.svelte';
	import { getTruncatedAddress } from '$components/Address.svelte';

	export let value: string;
	export let type: 'tx' | 'address';
	export let truncated: boolean = false;

	let truncatedValue: string | undefined;

	if (truncated) {
		truncatedValue = getTruncatedAddress(value);
	}

	let subdomain = '';
	if (readNetwork.name !== NetworkName.mainnet) {
		subdomain = readNetwork.name + '.';
	}

	const href = `https://${subdomain}etherscan.io/${type}/${value}`;
</script>

{#if type === 'tx'}
	<Popover message={'See transaction'}>
		<ExternalLink {href}>
			<div class="link">
				<Icon name="link" />
			</div>
		</ExternalLink>
	</Popover>
{:else}
	<Popover message={'Go to Etherscan'}>
		<ExternalLink {href}>{truncatedValue ?? value}</ExternalLink>
	</Popover>
{/if}

<style>
	.link {
		color: var(--text-primary);
	}

	.link:hover {
		color: var(--text-action-primary);
		transition: color 0.2s ease-in-out;
	}
</style>
