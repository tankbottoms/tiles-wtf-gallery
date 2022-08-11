<script lang="ts">
	import Input from './Input.svelte';
	import Textarea from './Textarea.svelte';

	export let field: FormField;
	export let value: any = '';

	interface FormField {
		id: string;
		label: string;
		placeholder?: string;
		description?: string;
		prefix?: string;
		addon?: string;
		// type?: InputType;
		type?: string;
		props?: {
			required?: boolean;
			maxlength?: number;
		};
	}

	let blured = false;

	function handleBlur(event: Event) {
		blured = true;
	}

	function handleFocus(event: Event) {
		blured = false;
	}
</script>

<label for={field.id}>
	{#if field.props?.required && field.label}<small>*</small>{/if}
	{field.label}
</label>
{#if field.type === 'input' || field.type === 'address' || !field.type}
	<div class="input">
		{#if field.prefix && field.addon}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
			>
				<p slot="prefix">{field.prefix || ''}</p>
				<p slot="addon">{field.addon || ''}</p>
			</Input>
		{:else if field.prefix}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
			>
				<p slot="prefix">{field.prefix || ''}</p>
			</Input>
		{:else if field.addon}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
			>
				<p slot="addon">{field.addon || ''}</p>
			</Input>
		{:else}
			<Input
				id={field.id}
				placeholder={field.placeholder}
				bind:value
				{...field.props}
				type={field.type === 'address' ? 'address' : 'text'}
				style="font-weight: 300"
				description={field.description}
				on:blur={handleBlur}
				on:focus={handleFocus}
				on:click={handleFocus}
			/>
		{/if}

		{#if field.props?.required && blured && !value}
			<span class="is-required-msg">'{field.id}' is required</span>
		{/if}
	</div>
{:else if field.type === 'textarea'}
	<Textarea
		id={field.id}
		placeholder={field.placeholder}
		bind:value
		{...field.props}
		description={field.description}
	/>
{/if}

<style>
	label {
		display: block;
		margin: 20px 0px 10px;
	}

	label:first-of-type {
		margin-top: 0;
	}
	small {
		font-size: 8px;
		color: red;
		vertical-align: text-top;
	}

	.is-required-msg {
		font-size: 0.9rem;
		color: red;
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
</style>
