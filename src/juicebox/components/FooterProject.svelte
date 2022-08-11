<script>
	// import EstimateGas from './EstimateGas.svelte';
</script>

<footer>
	<div class="links">
		<a href={null} on:click|preventDefault={() => window.scrollTo(0, 0)}>Back to top</a> |
		<a href="/terms-of-service" target="_blank">Terms of Service</a>
	</div>
	<!-- <EstimateGas /> -->
</footer>

<style>
	footer {
		padding: 30px 20px;
		background: var(--background-l1);
		position: fixed;
		bottom: 0;
		width: 100vw;
	}

	h3 {
		color: whitesmoke;
		text-align: center;
	}

	p {
		text-align: center;
		font-size: 20px;
	}

	.links {
		text-align: center;
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
</style>
