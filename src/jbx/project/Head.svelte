<script lang="ts">
	import { getContext } from 'svelte';
	import Drawer from '$jbx/components/Drawer.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import type Store from '$jbx/utils/Store';
	import Icon from '$jbx/components/Icon.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import Paragraph from '$jbx/components/Paragraph.svelte';
	import Popover from '$jbx/components/Popover.svelte';
	import ToolsDrawer from './ToolsDrawer.svelte';
	import { openModal } from '$jbx/components/Modal.svelte';
	import ProjectConfiguration from './ProjectConfiguration.svelte';
	import ProjectLogo from '$jbx/components/ProjectLogo.svelte';
	import { connectedAccount } from '$stores/web3';

	let drawerShown = false;

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;
	const metadata = $projectContext.projectMetadata;

	// TODO contract reader (useHasPermission)
	const showReconfigure = true;

	const prettyUrl = (url: string) => {
		if (url.startsWith('https://')) {
			return url.split('https://')[1];
		} else if (url.startsWith('http://')) {
			return url.split('http://')[1];
		} else return url;
	};

	const linkUrl = (url: string) => {
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url;
		}
		return 'http://' + url;
	};
</script>

<section>
	<div class="logo-wrapper">
		<!-- <img src={metadata.logoUri} alt="JuiceboxDAO logo" /> -->
		<ProjectLogo uri={metadata.logoUri} size={130} />
	</div>

	<div class="info-wrapper">
		<InfoSpaceBetween>
			<h1 slot="left">
				{metadata?.name || 'Untitled project'}
			</h1>
			<div slot="right" style="display: flex; align-items: center;">
				<span style="color: var(--text-tertiary); padding-right: 10px;"
					>ID: {$projectContext.projectId.toString()}
					<Popover message="This project uses the V2 version of the Juicebox contracts.">
						<span class="terminal-version">V2</span>
					</Popover>
				</span>
				<div class="clickable-icon">
					<Icon on:click={() => (drawerShown = !drawerShown)} name="tool" />
				</div>
				{#if showReconfigure && $projectContext.projectOwnerAddress === $connectedAccount}
					<div class="clickable-icon">
						<Icon name="setting" on:click={() => openModal(ProjectConfiguration)} />
					</div>
				{/if}
			</div>
		</InfoSpaceBetween>
		<div
			style="display: flex; flex-wrap: wrap; padding-top: 8px; padding-bottom: 4px; font-weight: 500;"
		>
			<!-- <span class="project-handle">@{$project.handle}</span> -->
			{#if metadata?.infoUri}
				<a href={metadata.infoUri} target="_blank" rel="noopener noreferrer"
					>{prettyUrl(metadata.infoUri)}</a
				>
			{/if}
			{#if metadata?.twitter}
				<a
					href={'https://twitter.com/' + metadata.twitter}
					target="_blank"
					rel="noopener noreferrer"
					><span style="social-icon"><Icon name="twitter" /></span>@{metadata.twitter}</a
				>
			{/if}
			{#if metadata?.discord}
				<a href={linkUrl(metadata.discord)} target="_blank" rel="noopener noreferrer"
					><span class="social-icon"><Icon name="discord" /></span>Discord</a
				>
			{/if}
		</div>

		<Paragraph description={metadata?.description || ''} characterLimit={250} />
	</div>
</section>

<Drawer bind:shown={drawerShown}>
	<ToolsDrawer />
</Drawer>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
	}

	a {
		display: flex;
		align-items: center;
		margin-right: 20px;
		font-weight: 500;
	}

	img {
		max-height: 100%;
		min-width: 100%;
		object-fit: cover;
		object-position: center center;
	}

	h1[slot='left'] {
		font-size: 2.4rem;
		line-height: 2.8rem;
		margin: 0px;
		color: var(--text-primary);
	}

	.clickable-icon {
		cursor: pointer;
		color: var(--icon-primary);
		margin: 0px 5px;
		font-size: 1rem;
	}
	.clickable-icon:hover {
		color: var(--icon-over-action-highlight);
	}
	.info-wrapper {
		flex: 1 1 0%;
		min-width: 70%;
	}

	.social-icon {
		margin-right: 4px;
		display: flex;
	}

	.terminal-version {
		padding: 2px 4px;
		background: var(--background-l1);
		cursor: default;
	}

	.logo-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 120px;
		width: 120px;
		border-radius: 1px;
		margin-right: 1.25rem;
		margin-bottom: 1.25rem;
		/* height: 100%; */
	}

	/* Small screen */
	@media (max-width: 750px) {
		section {
			margin-top: 60px;
		}
	}
</style>
