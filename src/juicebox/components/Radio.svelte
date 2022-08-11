<script lang="ts">
	export let group: string | number;
	export let name: string;
	export let value: string | number;
	export let size = '1.15em';

	$: style = `--size: ${size}`;
</script>

<input type="radio" {name} {value} bind:group {style} />

<style>
	input[type='radio'] {
		/* Add if not using autoprefixer */
		-webkit-appearance: none;
		/* Remove most all native input styles */
		appearance: none;
		margin: 0;

		font: inherit;
		color: var(--icon-action-primary);
		width: var(--size);
		height: var(--size);
		border: 0.15em solid currentColor;
		border-radius: 50%;
		transform: translateY(-0.075em);

		display: grid;
		place-content: center;
	}

	input[type='radio']::before {
		content: '';
		width: calc(var(--size) / 2);
		height: calc(var(--size) / 2);
		border-radius: 50%;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 1em 1em var(--form-control-color);
		/* Windows High Contrast Mode */
		background-color: var(--icon-action-primary);
	}

	input[type='radio']:checked::before {
		transform: scale(1);
	}
</style>
