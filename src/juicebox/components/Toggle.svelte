<script lang="ts">
	export let checked: boolean;
	export let disabled: boolean = false;
	// NOTE: if toggle is behaving weird next to other toggles, it's the ID not being unique
	export let id: string = 'switch';

	function toggleChecked(e: Event) {
		checked = !checked;
	}
</script>

<div>
	<input type="checkbox" {id} {checked} {disabled} on:click={toggleChecked} /><label
		{disabled}
		for={id}>Toggle</label
	>
	<slot />
</div>

<style>
	div {
		display: flex;
		align-items: center;
	}

	input[type='checkbox'] {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	label {
		cursor: pointer;
		text-indent: -9999px;
		width: 44px;
		height: 22px;
		background: var(--background-l1);
		display: block;
		border-radius: 100px;
		position: relative;
		transition: all 0.2s;
		margin-right: 10px;
	}

	label:after {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		width: 22px;
		height: 20px;
		background: #fff;
		border-radius: 90px;
		transition: 0.3s;
		box-shadow: 0 2px 4px 0 rgb(0 35 11 / 20%);
	}

	input:checked + label {
		background: var(--background-action-primary);
	}

	input:checked + label:after {
		left: calc(100% - 1px);
		transform: translateX(-100%);
	}

	label:focus {
		outline: 0;
		box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
	}

	input[disabled='true'],
	label[disabled='true'] {
		cursor: not-allowed;
	}

	label[disabled='true']:after {
		box-shadow: none;
	}
</style>
