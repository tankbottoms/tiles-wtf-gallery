<script lang="ts">
	import { onMount } from 'svelte';
	import * as constants from '@ethersproject/constants';
	import { formatDate } from '$jbx/utils/formatDate';
	import type { ProjectMetadataV4 } from '$jbx/models/project-metadata';
	import type { Project } from '$jbx/models/subgraph-entities/vX/project';
	import { getProjectMetadata } from '$jbx/data/project';

	import Icon from '$jbx/components/Icon.svelte';
	import EthAmount from './ETHAmount.svelte';
	import Popover from './Popover.svelte';
	import ProjectLogo from './ProjectLogo.svelte';
	import { ipfsCidToFirebaseUrl } from '$jbx/utils/ipfs';

	export let project: Project;
	let loading = true;
	let metadata: ProjectMetadataV4;

	onMount(async () => {
		try {
			metadata = await getProjectMetadata(project.metadataUri);
		} catch (error) {
			console.log(error);
		}
		loading = false;
	});

	// If the total paid is greater than 0, but less than 10 ETH, show two decimal places.
	const precision =
		project && project.totalPaid?.gt(0) && project.totalPaid.lt(constants.WeiPerEther) ? 2 : 0;
	// const terminalVersion = getTerminalVersion(project.terminal);
	const isArchived = false;
</script>

<a href="/projects/{project.id.match(/\w+$/)?.[0] || project.id}">
	<li>
		{#if loading}
			<div class="loading">
				<Icon name="loading" spin />
			</div>
		{:else if metadata}
			<ProjectLogo uri={metadata.logoUri} size={110} />
			<section>
				<h1>{metadata.name}</h1>
				<div>
					<span class="handle">
						Project {project.projectId}
					</span>
				</div>
				<EthAmount amount={project.totalPaid} {precision} />
				<span>since {project.createdAt && formatDate(project.createdAt * 1000, 'yyyy-MM-dd')}</span>
				{#if metadata.description}
					<!-- TODO the popover isn't seen... -->
					<Popover message={metadata.description} placement="right">
						<div class="description">
							{metadata.description}
						</div>
					</Popover>
				{/if}
				{#if isArchived}
					<div class="archived">ARCHIVED</div>
				{/if}
			</section>
		{:else}
			<div>Faild to get project</div>
		{/if}
	</li>
</a>

<style>
	li {
		display: flex;
		align-items: center;
		position: relative;
		height: 150px;
		overflow: hidden;
		padding: 25px 20px;
		border: 1px solid var(--stroke-secondary);
		margin-bottom: 10px;
	}

	li:hover {
		border-color: var(--stroke-primary);
		cursor: pointer;
	}

	a {
		color: unset;
	}

	h1 {
		font-size: 18px;
	}

	section {
		margin-left: 10px;
		/* text-overflow: ellipsis;
		overflow: hidden; */
	}
	span {
		font-weight: 300;
	}
	.archived {
		position: absolute;
		top: 0;
		right: 0;
		padding: 2px 4px;
		background: var(--background-l1);
		font-size: 0.7rem;
		color: var(--text-tertiary);
		font-weight: 500;
	}
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		height: 20px;
		white-space: nowrap;
		width: 200px;
		font-weight: 300;
	}
	.handle {
		font-weight: 500;
	}
	.loading {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		color: var(--text-header);
		transform: scale(2);
	}
	/* .version {
		font-weight: 500;
		margin-left: 10px;
		color: var(--text-tertiary);
		font-size: '0.7rem';
	} */

	@media (max-width: 850px) {
		li {
			flex: 0 0 100%;
			max-width: 95vw;
			margin: 10px;
		}

		.description {
			width: 400px;
		}
	}
</style>
