<main id="split">
	<slot name="left" />
	<slot name="right" />
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(#split [slot='left'], #split [slot='right']) {
		max-width: 540px;
		padding: 20px 20px;
		line-height: 1.3;
		margin-top: 8vh;
		width: 100%;
	}

	@media (max-width: 650px) {
		main {
			flex-direction: column;
		}

		:global(#split [slot='right']) {
			margin-top: 0px;
		}
	}
</style>
