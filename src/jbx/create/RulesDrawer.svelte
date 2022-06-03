<script context="module">
	import { ballotStrategies, DEFAULT_BALLOT_STRATEGY } from '$jbx/constants/v2/ballotStrategies';
	const strategies = ballotStrategies();
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { constants } from 'ethers';
	import { isAddress } from '@ethersproject/address';
	import type { BallotStrategy } from '$jbx/constants/v2/ballotStrategies';
	import AlertText from '$jbx/components/AlertText.svelte';
	import Button from '$jbx/components/Button.svelte';
	import ExternalLink from '$jbx/components/ExternalLink.svelte';
	import HeavyBorderBox from '$jbx/components/HeavyBorderBox.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import Input from '$jbx/components/Input.svelte';
	import Toggle from '$jbx/components/Toggle.svelte';
	import ReconBox from '$jbx/components/ReconBox.svelte';
	import type Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { getBallotStrategyByAddress } from '$jbx/constants/v2/ballotStrategies/getBallotStrategiesByAddress';

	let project = getContext('PROJECT') as Store<V2ProjectContextType>;
	let dirty = getContext('SHOW_DIRTY') as {
		showDirty: Store<boolean>;
		check: (arg1: any, arg2: any) => void;
	};

	export let close: () => void;

	let pausePay = $project.fundingCycleMetadata.pausePay;
	let allowMinting = $project.fundingCycleMetadata.allowMinting;

	let selected = $project.fundingCycle.ballot
		? getBallotStrategyByAddress($project.fundingCycle.ballot)
		: DEFAULT_BALLOT_STRATEGY;
	let customBallotAddress: Address | undefined;
	let disabled = false;

	const initialState = {
		pausePay,
		allowMinting,
		selected
	};

	function selectBallotStrategy(strategy: BallotStrategy) {
		selected = strategy;
		if (strategy.name !== 'custom') {
			disabled = false;
		}
	}

	function validate(address: Address) {
		return isAddress(address) && address !== constants.AddressZero;
	}

	function onSaveRules() {
		project.update((current) => ({
			...current,
			fundingCycle: {
				...current.fundingCycle,
				ballot: selected.address
			},
			fundingCycleMetadata: {
				...current.fundingCycleMetadata,
				pausePay,
				allowMinting
			}
		}));
		close();
	}

	$: {
		if (selected.name === 'custom') {
			selected.address = customBallotAddress;
			disabled = !validate(customBallotAddress);
		}
		dirty?.check(initialState, {
			pausePay,
			allowMinting,
			selected
		});
	}
</script>

<slot name="header" />
<HeavyBorderBox>
	<div class="option">
		<Toggle id="pausePayments" bind:checked={pausePay}>Pause payments</Toggle>
		<p>When enabled, your project cannot receive direct payments.</p>
	</div>
	<div class="option">
		<Toggle id="allowMinting" bind:checked={allowMinting}>Allow token minting</Toggle>
		<p>When enabled, the project owner can manually mint any amount of tokens to any address.</p>
		{#if allowMinting}
			<p class="info">
				<Icon name="exclamationCircle" /> Enabling token minting will appear risky to contributors. Only
				enable this when necessary.
			</p>
		{/if}
	</div>
</HeavyBorderBox>
<HeavyBorderBox>
	<h4>Reconfiguration</h4>
	{#if selected.name === 'No strategy'}
		<AlertText
			>Using a reconfiguration strategy is recommended. Projects with no strategy will appear risky
			to contributors.</AlertText
		>
	{/if}
	{#each strategies as strategy}
		<ReconBox
			selected={strategy.name === selected.name}
			on:click={() => selectBallotStrategy(strategy)}
		>
			<h3 slot="header">{strategy.name}</h3>
			<p slot="body">{strategy.description}</p>
			<small slot="address">Contract address: {strategy.address}</small>
		</ReconBox>
	{/each}
	<ReconBox
		selected={'custom' === selected.name}
		on:click={() => selectBallotStrategy({ name: 'custom', address: '' })}
	>
		<!-- TODO Rinkeby should be from signerNetwork -->
		<h3 slot="header">Custom strategy</h3>
		<div slot="body">
			<div class="input">
				<Input placeholder={constants.AddressZero} bind:value={customBallotAddress} />
			</div>
			<p>
				The address of any smart contract deployed on Rinkeby that implements
				<ExternalLink
					href="https://github.com/jbx-protocol/juice-contracts-v1/blob/main/contracts/FundingCycles.sol"
				>
					this interface.
				</ExternalLink>
			</p>
		</div>
	</ReconBox>
</HeavyBorderBox>
<Button {disabled} on:click={onSaveRules}>Save rules</Button>

<style>
	p {
		font-weight: 300;
		color: var(--text-secondary);
	}

	.info {
		color: var(--text-warn);
	}

	.option {
		margin-bottom: 20px;
	}

	[slot='body'],
	[slot='body'] p {
		color: var(--text-primary);
	}

	[slot='address'] {
		color: var(--text-tertiary);
		font-weight: 300;
	}

	.input {
		width: 400px;
	}
</style>
