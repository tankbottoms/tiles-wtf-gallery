<script>
	import ETH from '$jbx/components/Ethereum.svelte';
</script>

<div>
	<p>some.eth</p>
	<p><ETH />0.5</p>
</div>

<style>
	div {
		background: var(--background-l2);
		height: 45px;
		padding: 4px 19px 7px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	p {
		margin: 0px;
		font-weight: 100;
		font-size: 14px;
	}

	p:last-of-type {
		color: gray;
		line-height: 1;
	}
</style>
