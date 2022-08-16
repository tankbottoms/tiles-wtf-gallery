<script lang="ts">
	import TokenGated from '$components/TokenGated.svelte';	
	function handleAccessDenied() {
		console.log('token gated handle access denied');
	}
</script>

<section>
	<TokenGated on:denied={handleAccessDenied}>
		<p>this page is supposed to be token gated</p>
		<p slot="denied" let:account>
			{#if account}
				sorry, you do not have access to this page
			{:else}
				please connect to the ethereum wallet with a tile to access this page
			{/if}
		</p>
		<p slot="checking">loading...</p>
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
