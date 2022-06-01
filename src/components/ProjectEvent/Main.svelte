<script lang="ts">
	import ProjectCreateEvent from './ProjectCreateEvent.svelte';
	import type { ProjectEvent } from '$models/subgraph-entities/vX/project-event';
	import PayEvent from './PayEvent.svelte';
	import DeployedErc20Event from './DeployedERC20Event.svelte';
	import DistributePayouts from './DistributePayouts.svelte';
	import DistributedReservedTokens from './DistributedReservedTokens.svelte';
	import RedeemEvent from './RedeemEvent.svelte';

	export let event: ProjectEvent;
</script>

{#if event.projectCreateEvent}
	<div class="projectEvent">
		<ProjectCreateEvent event={event.projectCreateEvent} />
	</div>
{:else if event.payEvent}
	<div class="projectEvent"><PayEvent event={event.payEvent} /></div>
{:else if event.deployedERC20Event}
	<div class="projectEvent"><DeployedErc20Event event={event.deployedERC20Event} /></div>
{:else if event.distributePayoutsEvent}
	<div class="projectEvent"><DistributePayouts event={event.distributePayoutsEvent} /></div>
{:else if event.distributeReservedTokensEvent}
	<div class="projectEvent">
		<DistributedReservedTokens event={event.distributeReservedTokensEvent} />
	</div>
{:else if event.redeemEvent}
	<div class="projectEvent"><RedeemEvent event={event.redeemEvent} /></div>
{/if}

<style>
	.projectEvent {
		padding-top: 10px;
		margin-bottom: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid var(--stroke-tertiary);
	}

	:global(.projectEvent p) {
		margin: 0;
	}

	:global(.projectEvent small) {
		color: var(--text-tertiary);
	}

	:global(.timestamp) {
		color: var(--text-tertiary);
		font-size: 0.7rem;
		font-weight: 300;
		text-align: end;
	}

	:global(.address) {
		color: var(--text-tertiary);
		font-weight: 300;
		font-size: 12px;
	}
	:global(.amount) {
		font-size: 1rem;
		line-height: 1.4;
		font-weight: 400;
		color: var(--text-primary);
	}
</style>
