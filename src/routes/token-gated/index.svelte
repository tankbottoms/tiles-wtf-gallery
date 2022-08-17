<script lang="ts">
	import TokenGated from '$components/TokenGated.svelte';	
	function handleAccessDenied() {
		console.log('token gated handle access denied');
	}
</script>

<section>
	<TokenGated on:denied={handleAccessDenied}>
		<p>This page is supposed to be token gated.</p>
		<p slot="Denied" let:account>
			{#if account}
				Sorry, you do not have access to this page.
			{:else}
				Please connect to your Ethereum wallet with a Tile to access this page.
			{/if}
		</p>
		<p slot="Checking">loading...</p>
	</TokenGated>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>
