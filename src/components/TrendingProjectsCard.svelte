<script lang="ts">
	import type { TrendingProject } from '$models/subgraph-entities/vX/project';
	import { getProjectMetadata } from '$data/project';
	import { SECONDS_IN_DAY } from '$constants/numbers';
	import Icon from '$components/Icon.svelte';
	import EthAmount from './ETHAmount.svelte';
	import ProjectLogo from './ProjectLogo.svelte';

	export let days: number;
	export let rank: number;
	export let project: TrendingProject;

	function getPercentGainText() {
		if (
			project.createdAt &&
			project.createdAt > new Date().valueOf() / 1000 - days * SECONDS_IN_DAY
		) {
			return 'New';
		}
		const preTrendingVolume = project.totalPaid?.sub(project.trendingVolume);
		if (!preTrendingVolume?.gt(0)) return '+∞';
		const percentGain = project.trendingVolume.mul(10000).div(preTrendingVolume).toNumber();
		let percentRounded: number;
		// If percentGain > 1, round to int
		if (percentGain >= 100) {
			percentRounded = Math.round(percentGain / 100);
			// If 0.1 <= percentGain < 1, round to 1dp
		} else if (percentGain >= 10) {
			percentRounded = Math.round(percentGain / 10) / 10;
			// If percentGain < 0.1, round to 2dp
		} else {
			percentRounded = percentGain / 100;
		}
		return `+${percentRounded}%`;
	}
</script>

<a href="/projects/{project.projectId}">
	<li>
		<div class="rank">{rank + 1}</div>
		{#await getProjectMetadata(project.metadataUri)}
			<p><Icon name="loading" spin /></p>
		{:then result}
			<div class="logo">
				<ProjectLogo uri={result.logoUri} size={70} />
			</div>
			<section>
				<h1>{result.name}</h1>
				<EthAmount amount={project.trendingVolume} /> <span>last {days} days</span>
				<b>{getPercentGainText()}</b>
				<p>{project.trendingPaymentsCount} payment(s)</p>
			</section>
		{:catch error}
			<p style="color: var(--text-failure)">{error}</p>
		{/await}
	</li>
</a>

<style>
	a {
		color: inherit;
	}
	li {
		display: flex;
		align-items: center;
		padding: 25px 20px;
		border: 1px solid var(--stroke-secondary);
	}

	li:hover {
		border-color: var(--stroke-primary);
		cursor: pointer;
	}

	h1 {
		font-size: 18px;
	}

	b {
		color: var(--text-header);
	}

	section {
		margin-left: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	p {
		margin: 0;
	}

	p,
	span {
		font-weight: 300;
	}

	.logo {
		width: 70px;
		height: 70px;
		margin-right: 1rem;
	}

	.rank {
		font-size: 20px;
		margin-right: 20px;
	}

	@media (max-width: 768px) {
		li {
			flex: 0 0 100%;
			max-width: 100%;
		}
	}
</style>
