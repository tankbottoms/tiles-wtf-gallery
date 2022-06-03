<!-- <script lang="ts">

</script> -->

<aside>
	<slot />
</aside>

<style>
	aside {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--background-brand-primary);
		padding: 10px;
		width: 100vw;
		color: black;
		font-weight: 300;
		text-align: center;
	}

	@media (max-width: 768px) {
		aside {
			margin-top: 68px;
		}
	}
</style>
