<script lang="ts">
	import Button from './Button.svelte';

	export let click;
	// NOTE: this is here to not show the unknown prop in console
	export let close = () => {};
</script>

<main>
	<h1>Heads up</h1>
	<p>
		<a href="https://github.com/jbx-protocol/juice-contracts">Juicebox contracts</a> are unaudited, and
		may be vulnerable to bugs or hacks. All funds moved through Juicebox could be lost or stolen. JuiceboxDAO
		and Peel are not liable for any losses by projects or their supporters.
	</p>
	<div class="buttons">
		<Button type="primary" on:click|once={click}>I understand</Button>
	</div>
</main>

<style>
	h1 {
		color: var(--text-header);
	}
	main {
		max-width: 350px;
	}
	.buttons {
		float: right;
	}
</style>
