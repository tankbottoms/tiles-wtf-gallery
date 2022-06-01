<script lang="ts">
	/**
	 * Creates a modal with a primary colour header and a
	 * footer with items floated right.
	 */
	export let title: string;
</script>

<main>
	<h3>
		{title}
	</h3>
	<slot />
	<footer>
		<slot name="footer" />
	</footer>
</main>

<style>
	h3 {
		color: var(--text-header);
		margin-bottom: 40px;
	}
	main {
		max-width: 450px;
	}
	footer {
		margin-top: 40px;
		float: right;
	}
</style>
