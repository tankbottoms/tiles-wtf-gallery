<script context="module" lang="ts">
	export function getTruncatedAddress(address: string) {
		return address && address.startsWith('0x')
			? `${address.slice(0, 6)}...${address.slice(-6)}`
			: address;
	}
</script>

<script lang="ts">
	let data: HTMLElement;
	$: if (data) {
		data.innerText = getTruncatedAddress(data?.innerText);
	}
</script>

<div bind:this={data}><slot /></div>
