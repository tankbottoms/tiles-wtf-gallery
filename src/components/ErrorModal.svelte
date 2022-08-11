<script lang="ts" context="module">
	import Store from '$juicebox/utils/Store';
	export const errorMessage = new Store<string>();
</script>

<script lang="ts">
	import Icon from '$juicebox/components/Icon.svelte';
</script>

{#if $errorMessage}
	<div class="overlay" />
	<div class="pending-txn-modal">
		<section>
			<div class="x-btn" on:click={() => ($errorMessage = '')}>x</div>
			<div>
				<h2>
					<Icon name="exclamationCircle" style="color: red; transform: translateY(3px)" /> Error
				</h2>
				<p class="error">{$errorMessage}</p>
			</div>
		</section>
	</div>
{/if}

<style>
	.pending-txn-modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 10px 10px 20px #e0e0e0;
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		max-width: unset;
		display: block;
		background: #0000000f;
	}
	.x-btn {
		position: fixed;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
	}
	img {
		max-width: 100px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 2rem 0;
	}

	div {
		max-width: 400px;
		text-align: center;
	}
</style>
