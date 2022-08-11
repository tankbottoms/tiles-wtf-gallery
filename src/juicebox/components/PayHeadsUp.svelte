<script lang="ts">
	import Button from './Button.svelte';

	export let click;
	// NOTE: this is here to not show the unknown prop in console
	export const close = () => {};
</script>

<main>
	<h1>Heads up</h1>
	<p>
		<a href="https://github.com/jbx-protocol/juice-contracts" target="_blank">Juicebox contracts</a>
		are unaudited, and may be vulnerable to bugs or hacks. All funds moved through Juicebox could be
		lost or stolen. JuiceboxDAO and Peel are not liable for any losses by projects or their supporters.
	</p>
	<p>
		By clicking the "I understand" button, you acknowledge and agree that you have read and
		understood the terms of <a href="https://info.juicebox.money/tos" target="_blank"
			>Juicebox's Terms of Service.</a
		>
	</p>
	<br />
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
		display: flex;
		justify-content: flex-end;
	}
</style>
