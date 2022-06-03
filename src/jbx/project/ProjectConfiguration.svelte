<script lang="ts">
	import Button from '$jbx/components/Button.svelte';
	import Drawer from '$jbx/components/Drawer.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import Trans from '$jbx/components/Trans.svelte';
	// TODO move these files to common area
	import FundingDrawer from '$jbx/create/FundingCycle/FundingDrawer.svelte';
	import TokenDrawer from '$jbx/create/FundingCycle/TokenDrawer';
	import ProjectDetails from '$jbx/create/ProjectDetails.svelte';
	import RulesDrawer from '$jbx/create/RulesDrawer.svelte';

	export let close: () => void;

	let deployDisabled = true;
	let deployInProgress = false;

	let drawerOpen = false;
	let current: Drawers;

	enum Drawers {
		Metadata = 'Metadata',
		Funding = 'Funding',
		Token = 'Token',
		Rules = 'Rules'
	}

	const info =
		'Updates you make to this section will only be applied to <b>upcoming</b> funding cycles.';
</script>

<h3>Project configuration</h3>

<section>
	<h4><Trans>Edit project details</Trans></h4>
	<p><Trans>Changes to project details will take effect immediately.</Trans></p>
	<button
		on:click={() => {
			drawerOpen = true;
			current = Drawers.Metadata;
		}}>Project details <Icon name="caret" /></button
	>
	<br />
	<h4><Trans>Reconfigure upcoming funding cycles</Trans></h4>
	<p>
		<Trans
			>Any changes you make will take effect in funding cycle #2. The current funding cycle (#1)
			won't be altered.</Trans
		>
	</p>
	<button
		on:click={() => {
			drawerOpen = true;
			current = Drawers.Funding;
		}}><Trans>Distribution limit, duration and payouts</Trans> <Icon name="caret" /></button
	>
	<button
		on:click={() => {
			drawerOpen = true;
			current = Drawers.Token;
		}}><Trans>Token</Trans> <Icon name="caret" /></button
	>
	<button
		on:click={() => {
			drawerOpen = true;
			current = Drawers.Rules;
		}}><Trans>Rules</Trans> <Icon name="caret" /></button
	>

	<div class="buttons">
		<Button size="md" type="secondary" on:click={close}>Cancel</Button>
		<Button size="md" disabled={deployDisabled}>
			Deploy new project configuration
			{#if deployInProgress}
				<Icon name="loading" spin />
			{/if}
		</Button>
	</div>
</section>

<Drawer bind:shown={drawerOpen} let:close>
	<div class="content">
		{#if current === Drawers.Metadata}
			<h3>Reconfigure project details</h3>
			<ProjectDetails
				info={'Project details reconfigurations will create a separate transaction.'}
			/>
			<Button size="md">Save project details</Button>
		{:else if current === Drawers.Funding}
			<FundingDrawer {close}>
				<header slot="header">
					<h3>Reconfigure funding</h3>
					<p>
						<Trans>
							{@html info}
						</Trans>
					</p>
				</header>
			</FundingDrawer>
		{:else if current === Drawers.Rules}
			<RulesDrawer {close}>
				<header slot="header">
					<h3>Reconfigure rules</h3>
					<p>
						<Trans>
							{@html info}
						</Trans>
					</p>
				</header>
			</RulesDrawer>
		{:else if current === Drawers.Token}
			<TokenDrawer {close}>
				<header slot="header">
					<h3>Reconfigure token</h3>
					<p>
						<Trans>
							{@html info}
						</Trans>
					</p>
				</header>
			</TokenDrawer>
		{/if}
	</div>
</Drawer>

<style>
	section {
		padding: 20px 0px;
		max-width: 650px;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid var(--stroke-action-secondary);
		padding: 12px 6px;
		width: 100%;
		background: transparent;
		margin: 16px 0px;
		cursor: pointer;
		color: var(--stroke-action-primary);
	}

	p {
		font-weight: 300;
	}

	h3,
	h4 {
		color: var(--text-header);
	}

	.buttons {
		float: right;
	}

	.content {
		padding: 2rem;
	}
</style>
