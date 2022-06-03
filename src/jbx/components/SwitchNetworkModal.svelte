<script lang="ts">
	import { readNetwork } from '$stores/web3';
	import { NetworkName } from '$jbx/models/network-name';
	import { provider } from '$stores/web3';
	import Modal, { bind } from '$jbx/components/Modal.svelte';
	import SwitchNetworkContent from './SwitchNetworkContent.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let showModal = false;

	const networkName = get(readNetwork).alias;
	const supportedNetworks: NetworkName[] = [NetworkName.mainnet, NetworkName.rinkeby];

	const supportedNetworkOptions = supportedNetworks
		.filter((n) => import.meta.env.VITE_INFURA_NETWORK !== n)
		.map((_n) => {
			const subDomain = _n === NetworkName.mainnet ? '' : _n + '.';
			return {
				label: `${subDomain}juicebox.wtf`,
				href: `https://${subDomain}juicebox.wtf`
			};
		});

	function checkNetwork() {
		showModal = $provider?.network?.name !== networkName;
	}

	onMount(() => {
		if (!$provider?.network) {
			// TODO this is fishy as fuck, "but it works".
			// waits momentarily for the provider to be set
			// by the web3 init... do this properly when time allows
			setTimeout(() => {
				checkNetwork();
			}, 300);
		}
	});

	provider.subscribe((current) => {
		if (current?.network) {
			checkNetwork();
		}
	});
</script>

<Modal
	closeButton={false}
	show={showModal &&
		bind(SwitchNetworkContent, { networkName, networkOptions: supportedNetworkOptions })}
/>
