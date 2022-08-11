<script lang="ts">
	import Button from './Button.svelte';
	import HeavyBorderBox from './HeavyBorderBox.svelte';
	import Input from './Input.svelte';
	import { bind, openModal } from './Modal.svelte';
	import PendingTransaction from './PendingTransaction.svelte';
	import PopInfo from './PopInfo.svelte';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import type Store from '$utils/Store';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { namehash } from 'ethers/lib/utils.js';
	import { getContext, onMount } from 'svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	onMount(async () => {
		// readContractByAddress('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');
	});

	let ensName = $project.handle;
	let pending = false;

	let setEns = '';

	const createENS = async () => {
		if (!ensName) return;

		const ensNameParts = ensName.split('.').reverse();

		pending = true;
		try {
			const txnResponse = await writeContract(
				V2ContractName.JBProjectHandles,
				'setEnsNamePartsFor',
				[$project.projectId, ensNameParts]
			);

			const result = await txnResponse.wait();

			setEns = ensName;
			console.log(result);
		} catch (error) {
			console.error(error?.message);
		}
		pending = false;
	};

	const setTextRecord = async () => {
		const node = namehash(ensName + (ensName.endsWith('.eth') ? '' : '.eth'));
		const projectHandleENSTextRecordKey = 'juicebox_project_id';
		const txnResponse = await writeContract(V2ContractName.PublicResolver, 'setText', [
			node,
			projectHandleENSTextRecordKey,
			$project.projectId.toString()
		]);

		openModal(
			bind(PendingTransaction, {
				txnResponse
			})
		);

		const result = await txnResponse.wait();
		console.log(result);

		$project.handle = ensName;
	};
</script>

<slot name="header" />
<HeavyBorderBox margin="32px" padding="16px 32px">
	<div class="box">
		{#if $project.handle}
			<h4>
				@{$project.handle}
			</h4>
		{/if}
		<span>Projects with a handle:</span>
		<ol>
			<li>Are included in search results on the projects page</li>
			<li>Can be accessed via the URL: juicebox.wtf/@{$project.handle || 'handle'}</li>
		</ol>
		<span>(The original URL juicebox.wtf/projects/{$project.projectId} will continue to work.)</span
		>
		<span>
			Juicebox projects use <a href="TODO">ENS names</a> as handles. Setting a handle involves 2 transactions:
		</span>
	</div>
</HeavyBorderBox>
<HeavyBorderBox margin="32px" padding="16px 32px">
	<div class="box">
		<h4>
			<PopInfo message="ENS tooltip">{$project.handle ? 'Change' : 'Set'} ENS name</PopInfo>
		</h4>
		<span>
			Choose an ENS name to use as the project's handle. Subdomains are allowed and will be included
			in the handle. Handles won't include the ".eth" extension.
		</span>
		<span>juicebox.eth = @juicebox or dao.juicebox.eth = @dao.juicebox</span>
		<Input placeholder="juicebox" bind:value={ensName} style="background: var(--background-l0)">
			<div slot="addon">.eth</div>
		</Input>
		<Button
			size="md"
			type="tertiary"
			on:click={createENS}
			disabled={!ensName || pending || !!setEns}
			>{$project.handle
				? pending
					? 'Editing...'
					: `Edit ENS name ${$project.projectMetadata.name}`
				: setEns
				? 'ENS is set'
				: 'Create ENS name'}</Button
		>
	</div>
</HeavyBorderBox>

<HeavyBorderBox margin="32px" padding="16px 32px">
	<div class="box">
		<h4>
			<PopInfo message="ENS tooltip">Set text record</PopInfo>
		</h4>
		<span>
			Set a text record for that ENS name with the key "juicebox" and the value "{$project.projectId}"
			(this project's ID). You can do this on the
			<a href="https://app.ens.domains/name/{ensName}/details" target="_blank">ENS app</a>, or use
			the button below (as long as your connected wallet owns or controls that ENS name).
		</span>
		{#if !$project.handle}
			<span>Choose an ENS name before setting the text record.</span>
		{/if}
		<Button size="md" type="tertiary" disabled={!setEns} on:click={setTextRecord}>
			Set text record for {setEns ? `${setEns}.eth` : '[project-handle]'}
		</Button>
	</div>
</HeavyBorderBox>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		gap: 16px;
		color: var(--text-secondary);
		font-weight: 300;
	}

	h4 {
		font-size: 16px;
		font-weight: 400;
		color: var(--text-header);
		margin-bottom: 0;
	}

	ol {
		margin-bottom: 0;
		padding-left: 24px;
	}
</style>
