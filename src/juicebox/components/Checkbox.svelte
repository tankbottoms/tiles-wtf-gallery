<script lang="ts">
	export let checked: boolean = false;
</script>

<input type="checkbox" {...$$props} bind:checked />

<style>
	input[type='checkbox'] {
		appearance: none;
		margin-right: 20px;
		color: currenColor;
		width: 20px;
		height: 20px;
		border: 1px solid var(--stroke-action-primary);
		border-radius: 3px;
		background-color: var(--background-l0);
		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: 9px;
		height: 9px;
		transform: scale(0);
		transition: 120ms transform ease-in-out;
		box-shadow: inset 20px 20px var(--icon-action-primary);
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	}

	input[type='checkbox']:checked::before {
		transform: scale(1);
		transform: rotate(10deg);
	}
</style>
