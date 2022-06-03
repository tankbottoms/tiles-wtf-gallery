<script context="module">
	export const metadataFields = [
		{
			id: 'name',
			label: 'Project name',
			placeholder: "Peach's Juicebox Stand",
			props: {
				required: true
			}
		},
		{
			id: 'description',
			label: 'Project description',
			placeholder: '1000 characters max',
			type: 'textarea',
			props: {
				maxlength: 10000
			}
		},
		{
			id: 'infoUri',
			label: 'Website',
			placeholder: 'https://your-project.com',
			description: "Your project's website",
			props: {
				type: 'url'
			}
		},
		{
			id: 'twitter',
			label: 'Twitter',
			prefix: '@',
			placeholder: 'your-project',
			description: "Your project's Twitter handle"
		},
		{
			id: 'discord',
			label: 'Discord',
			placeholder: 'https://discord.gg/abcdefgh',
			description: "An invite link to your project's Discord server",
			props: {
				type: 'url'
			}
		},
		{
			id: 'payButton',
			label: 'Pay button text',
			placeholder: 'Pay',
			description:
				'Text displayed on your project\'s "pay" button. Leave this blank to use the default.'
		},
		{
			id: 'payDisclosure',
			label: 'Pay disclosure',
			placeholder: 'Payment disclosure',
			description:
				'This text will be displayed to your supporters before they complete their payment.',
			type: 'textarea'
		}
	];
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import InfoBox from '$jbx/components/InfoBox.svelte';
	import Input from '$jbx/components/FormField.svelte';
	import UploadField from '$jbx/components/UploadField.svelte';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;

	export let info =
		'You can edit your project details after creation at any time, but the transaction will cost gas. All details are optional.';

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

<InfoBox {info} />
{#each metadataFields as field}
	<Input {field} bind:value={$project.projectMetadata[field.id]} />
{/each}
<UploadField onChange={onLogoChange} />
