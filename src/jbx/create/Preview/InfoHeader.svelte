<script lang="ts">
	import { getContext } from 'svelte';
	import type Store from '$jbx/utils/Store';
	import Icon from '$jbx/components/Icon.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
</script>

<!-- The top component showing the logo preview with basic treasury info -->
<div class="info">
	<div class="logo">
		{#if $project.projectMetadata.logoUri}
			<img src={$project.projectMetadata.logoUri} alt="Uploaded logo" />
		{:else}
			<div class="logo-placeholder">🧃</div>
		{/if}
	</div>
	<div class="info-text">
		<h1>{$project.projectMetadata.name || 'Untitled project'}</h1>
		<div class="social-list">
			<p>{$project.projectMetadata?.infoUri || ''}</p>
			{#if $project.projectMetadata.twitter}
				<p>
					<Icon name="twitter" />
					{$project.projectMetadata.twitter}
				</p>
			{/if}
			{#if $project.projectMetadata.discord}
				<p>
					<Icon name="discord" />
					{$project.projectMetadata.discord}
				</p>
			{/if}
		</div>
		<p class="description">{$project.projectMetadata.description || ''}</p>
	</div>
</div>

<style>
	.description {
		color: var(--text-secondary);
		overflow-wrap: break-word;
		padding-right: 0.5rem;
	}

	.info {
		display: flex;
		align-items: center;
		color: var(--text-tertiary);
	}

	.logo {
		height: 150px;
		width: 150px;
	}

	img {
		height: 150px;
		width: 150px;
	}
	.logo-placeholder {
		background-color: var(--background-l1);
		height: 150px;
		width: 150px;
		font-size: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.info-text {
		padding: 0px 20px;
	}
	.info .info-text h1 {
		color: var(--text-tertiary);
		font-size: 36px;
		font-weight: 500;
		margin: 0;
	}

	.social-list {
		display: flex;
	}

	.social-list p {
		margin-right: 20px;
		color: var(--text-over-action-secondary);
	}
</style>
