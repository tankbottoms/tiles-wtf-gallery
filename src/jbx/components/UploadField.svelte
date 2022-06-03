<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import { ipfsCidUrl, pinFileToIpfs } from '$jbx/utils/ipfs';

	export let onChange: (src: string) => void;

	let problem: string | undefined;
	let loading = false;

	let file: HTMLInputElement;
	let isFileSet = false;
	onMount(() => {
		file.addEventListener('change', async (e) => {
			loading = true;
			const inputElement = e.target as HTMLInputElement;
			// Return in the case of cancelling
			// this looks awful, because it is
			if (!inputElement) {
				loading = false;
				return;
			}
			// Get the selected file
			const [file] = inputElement.files;
			if (!file) {
				loading = false;
				return;
			}
			// Get the file name and size
			const { size } = file;
			// Convert size in bytes to kilo bytes
			const fileSize = size / 1000;
			if (fileSize > 500) {
				problem = 'File size must be less than 500 KB';
				isFileSet = false;
				loading = false;
				return;
			} else {
				problem = undefined;
			}
			// Set the text content
			const res = await pinFileToIpfs(file);
			const ipfsUrl = ipfsCidUrl(res?.IpfsHash);
			loading = false;
			loadFile(ipfsUrl);
			document.querySelector('.file-name').textContent = ipfsUrl;
			(document.querySelector('.file-name') as HTMLAnchorElement).href = ipfsUrl;
		});
	});

	function loadFile(url: string) {
		if (onChange) {
			onChange(url);
		}
		// Set preview image
		let image = document.getElementById('output') as HTMLImageElement;
		image.src = url;
		isFileSet = true;
	}
</script>

{#if loading}
	<Icon name="loading" spin />
{/if}
<label for="icon"
	>Logo
	<input bind:this={file} id="icon" type="file" />
	<div>
		{#if isFileSet}
			<Icon
				name="closeCircle"
				on:click={() => {
					isFileSet = false;
				}}
			/>
		{:else}
			<Icon name="fileImage" />
			<span>Upload</span>
		{/if}
	</div>
</label>
<div class="preview-wrapper">
	<img id="output" class={isFileSet && 'file-preview'} src="" alt="Uploaded logo" />
	<!-- NOTE: {" "} to suppress linter warning of empty a -->
	<a class="file-name" class:hide={!isFileSet} href="/">{' '}</a>
</div>
{#if problem}
	<Icon name="exclamationCircle" />
	{problem}
{/if}

<style>
	input[type='file'] {
		display: none;
	}

	div {
		color: var(--text-over-action-secondary);
		margin: 20px;
		cursor: pointer;
	}

	img {
		display: none;
	}

	.hide {
		display: none;
	}
	.preview-wrapper {
		display: flex;
		gap: 20px;
		align-items: center;
		width: 350px;
		word-wrap: break-word;
	}
	.file-name {
		max-width: 100%;
	}
	.file-preview {
		display: inline-block;
		max-height: 100px;
	}
</style>
