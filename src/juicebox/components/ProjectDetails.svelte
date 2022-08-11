<script context="module">
	export const metadataFields = [
		{
			id: 'name',
			category: 'details',
			label: 'Project name',
			placeholder: "Peach's Juicebox Stand",
			props: {
				required: true
			}
		},
		{
			id: 'description',
			category: 'details',
			label: 'Project description',
			type: 'textarea',
			props: {
				maxlength: 5000
			}
		},
		{
			id: 'infoUri',
			category: 'links',
			label: 'Website',
			placeholder: 'https://your-project.com',
			props: {
				type: 'url'
			}
		},
		{
			id: 'twitter',
			category: 'links',
			label: 'Twitter handle',
			prefix: '@',
			placeholder: 'your-project'
		},
		{
			id: 'discord',
			category: 'links',
			label: 'Discord',
			placeholder: 'https://discord.gg/abcdefgh',
			props: {
				type: 'url'
			}
		},
		{
			id: 'payButton',
			category: 'project_page_customization',
			label: 'Pay button text',
			placeholder: 'Pay',
			description: 'Customize your project\'s "pay" button. Leave blank to use the default.',
			props: {
				maxlength: 16
			}
		},
		{
			id: 'payDisclosure',
			category: 'project_page_customization',
			label: 'Pay disclosure',
			description: 'Disclose any details to your contributors before they pay your project.',
			type: 'textarea',
			props: {
				maxlength: 256
			}
		}
	];
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import InfoBox from './InfoBox.svelte';
	import Input from './FormField.svelte';
	import UploadField from './UploadField.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let info =
		'You can edit your project details after creation at any time, but the transaction will cost gas.';

	const details = metadataFields.filter((field) => field.category === 'details');
	const links = metadataFields.filter((field) => field.category === 'links');
	const projectPageCustomization = metadataFields.filter(
		(field) => field.category === 'project_page_customization'
	);

	function onLogoChange(src: string) {
		project.update((state: any) => ({
			...state,
			projectMetadata: {
				...state.projectMetadata,
				logoUri: src
			}
		}));
	}
</script>

{#each details as field}
	<Input {field} bind:value={$project.projectMetadata[field.id]} />
{/each}
<UploadField onChange={onLogoChange} url={$project.projectMetadata?.logoUri || ''} />

<h3>Links</h3>
{#each links as field}
	<Input {field} bind:value={$project.projectMetadata[field.id]} />
{/each}

<h3>Project page customization</h3>
{#each projectPageCustomization as field}
	<Input {field} bind:value={$project.projectMetadata[field.id]} />
{/each}
<InfoBox {info} />
<br />

<style>
	h3 {
		color: var(--text-header);
	}

	h3:not(:first-of-type) {
		color: var(--text-header);
		margin-top: 40px;
	}
</style>
