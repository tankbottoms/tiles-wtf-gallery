<script>
	export let stack = false;
</script>

<!-- Provided two elements, place them with as much space inbetween as the parent allows
Seen in the preview of jb for "In Juicebox..."
-->
<section on:click class:stack>
	<slot name="left" />
	<slot name="right" />
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
	}

	.stack {
		flex-direction: column;
	}

	@media (max-width: 350px) {
		section {
			flex-direction: column;
		}
	}
</style>
