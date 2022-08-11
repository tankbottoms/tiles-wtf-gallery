<script lang="ts">
	import { getContext } from 'svelte';
	import Drawer from '../Drawer.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import Icon from '../Icon.svelte';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import Paragraph from '../Paragraph.svelte';
	import Popover from '../Popover.svelte';
	import ToolsDrawer from './ToolsDrawer.svelte';
	import ProjectConfigurationDrawer from './ProjectConfigurationDrawer.svelte';
	import ProjectLogo from '../ProjectLogo.svelte';
	import { connectedAccount } from '$stores/web3';

	let drawerShown = false;
	let current;

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;
	$: metadata = $projectContext.projectMetadata;

	// TODO: contract reader (useHasPermission)
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

	const closeDrawer = () => {
		drawerShown = false;
	};
</script>

<section>
	<div class="logo-wrapper">
		<!-- <img src={metadata.logoUri} alt="JuiceboxDAO logo" /> -->
		<ProjectLogo uri={metadata.logoUri} size={170} />
	</div>

	<div class="info-wrapper">
		<InfoSpaceBetween stack={window?.innerWidth < 500}>
			<h1 slot="left">
				{metadata?.name || 'Untitled project'}
			</h1>
			<div slot="right" style="display: flex; align-items: center;">
				<span style="color: var(--text-tertiary); padding-right: 10px;"
					>ID:{$projectContext.projectId.toString()}
					<Popover message="This project uses the V2 version of the Juicebox contracts.">
						<span class="terminal-version">V2</span>
					</Popover>
				</span>
				<div class="clickable-icon">
					<Icon
						on:click={() => {
							drawerShown = !drawerShown;
							current = ToolsDrawer;
						}}
						name="tool"
					/>
				</div>
				<!-- TODO: projectOwnerAddress doesn't seem to be set -->
				{#if showReconfigure && $projectContext.projectOwnerAddress.toLowerCase() === $connectedAccount.toLowerCase()}
					<div class="clickable-icon">
						<Icon
							name="setting"
							on:click={() => {
								drawerShown = !drawerShown;
								current = ProjectConfigurationDrawer;
							}}
						/>
					</div>
				{/if}
			</div>
		</InfoSpaceBetween>
		<div
			style="display: flex; flex-wrap: wrap; padding-top: 8px; padding-bottom: 4px; font-weight: 500;"
		>
			{#if metadata.archived}
				<span class="archived">(ARCHIVED)</span>&nbsp;
			{/if}
			{#if $projectContext.handle}
				<span class="project-handle">
					@{$projectContext.handle}
				</span>
				&nbsp;
			{:else if $connectedAccount && $projectContext.projectOwnerAddress?.toLocaleLowerCase() === $connectedAccount?.toLowerCase()}
				<span
					class="add-handle-btn"
					on:click={() => {
						drawerShown = !drawerShown;
						current = ProjectConfigurationDrawer;
					}}><Icon name="pen" /> Add handle</span
				>&nbsp;
			{/if}
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
			<!-- TODO: Projects which are from Juicebox's Directory should have the Juicebox logo, popup to have the JB directory -->
		</div>

		<Paragraph description={metadata?.description || ''} characterLimit={250} markdown />
	</div>
</section>

<Drawer bind:shown={drawerShown}>
	<svelte:component this={current} close={closeDrawer} />
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

	h1[slot='left'] {
		font-size: 2.4rem;
		line-height: 2.8rem;
		margin: 0px;
		color: var(--text-primary);
	}

	.clickable-icon {
		cursor: pointer;
		color: var(--icon-action-primary);
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
	.info-wrapper :global(section) {
		align-items: flex-start;
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

	.archived {
		color: var(--text-secondary);
		opacity: 0.8;
	}

	.add-handle-btn:hover {
		color: var(--icon-action-primary);
		cursor: pointer;
	}

	/* Small screen */
	@media (max-width: 750px) {
		section {
			margin-top: 60px;
		}
	}

	.project-handle {
		font-weight: bold;
	}
</style>
