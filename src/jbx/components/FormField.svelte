<script lang="ts">
	import Input from './Input.svelte';

	export let field: FormField;
	export let value: any = '';

	interface FormField {
		id: string;
		label: string;
		placeholder?: string;
		description?: string;
		prefix?: string;
		// type?: InputType;
		type?: string;
		props?: {
			required?: boolean;
			maxlength?: number;
		};
	}
</script>

<label for={field.id}>
	{#if field.props?.required}<small>*</small>{/if}
	{field.label}
</label>
{#if field.type === 'input' || !field.type}
	<div class="input">
		{#if field.prefix}
			<Input id={field.id} placeholder={field.placeholder} bind:value {...field.props}>
				<p slot="prefix">{field.prefix}</p>
			</Input>
		{:else}
			<Input id={field.id} placeholder={field.placeholder} bind:value {...field.props} />
		{/if}
	</div>
{:else if field.type === 'textarea'}
	<textarea id={field.id} placeholder={field.placeholder} bind:value {...field.props} />
{/if}
{#if field.description}
	<p class="description">{field.description}</p>
{/if}

<style>
	label {
		display: block;
		margin: 20px 0px 10px;
	}
	small {
		font-size: 8px;
		color: red;
		vertical-align: text-top;
	}
	textarea {
		flex-grow: 1;
		margin: 0;
		font-variant: tabular-nums;
		font-family: inherit;
		font-size: 14px;
		font-weight: 300;
		list-style: none;
		-webkit-font-feature-settings: 'tnum', 'tnum';
		font-feature-settings: 'tnum', 'tnum';
		position: relative;
		display: inline-block;
		min-width: 0;
		padding: 4px 11px;
		color: var(--text-primary);
		line-height: 1.5715;
		background-color: transparent;
		border: 1px solid var(--stroke-primary);
		transition: all 0.3s;
		width: 100%;
	}

	.input {
		width: 100%;
	}

	.input-container {
		/* width: 100%; */
		display: flex;
		flex-direction: row;
		align-items: center;

		box-sizing: border-box;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
	}

	.prefix {
		width: 15px;
		text-align: center;
	}
	.description {
		font-size: 14px;
		font-weight: 300;
		color: #666;
		margin-top: 0;
	}
</style>
