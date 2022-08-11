<script lang="ts">
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { constants } from 'ethers';
	import { getContext } from 'svelte';
	import Input from './Input.svelte';
	import Dropdown from './Dropdown.svelte';
	import { bind, openModal } from './Modal.svelte';
	import AssetsModal from './AssetsModal.svelte';
	import { uploadProjectMetadata } from '$juicebox/utils/ipfs';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$juicebox/constants/v2/metadataDomain';
	import PendingTransaction from './PendingTransaction.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let tokens = [...($project.projectMetadata.tokens || [])];

	let saving = false;

	async function saveAssets() {
		saving = true;
		try {
			const _tokens = tokens.filter((t) => t.value);
			const projectMetadata = { ...$project.projectMetadata, tokens: _tokens };
			const uploadedMetadata = await uploadProjectMetadata(
				projectMetadata,
				$project.projectMetadata.name.toLowerCase().replace(/[^\w]+/g, '_')
			);

			console.log('uploadedMetadata', uploadedMetadata);

			const cid = uploadedMetadata.IpfsHash;
			console.log({ cid });

			if (cid) {
				const txnResponse = await writeContract(V2ContractName.JBProjects, 'setMetadataOf', [
					$project.projectId,
					[cid, JUICEBOX_MONEY_METADATA_DOMAIN]
				]);
				openModal(
					bind(PendingTransaction, {
						txnResponse
					})
				);
				const txnResult = await txnResponse.wait();
				console.log(txnResult);
				window.location.reload();
			}
		} catch (error) {
			console.error(error?.message);
		}
		saving = false;
	}
</script>

<div class="ant-modal-body">
	<p style="margin-bottom: 40px;">
		Display ERC-20 and other Juicebox project tokens that this project owner holds.
	</p>
	<form class="ant-form ant-form-horizontal">
		{#each tokens as token}
			<div class="ant-row">
				<div class="ant-col" style="flex: 1 1 auto;">
					<div class="ant-row ant-form-item">
						<div class="" style="display: flex;width: 100%">
							<div style="width: 130px;">
								<Dropdown
									options={[
										{ label: 'ERC20', value: 'erc20' },
										{ label: 'Project', value: 'project' }
									]}
									bind:value={token.type}
								/>
							</div>
							<div style="width: 100%;">
								{#if token.type === 'erc20'}
									<Input
										type="address"
										placeholder={constants.AddressZero}
										bind:value={token.value}
									/>
								{:else}
									<Input type="string" placeholder="Project ID" bind:value={token.value} />
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="ant-col" style="flex: 0 0 auto;">
					<button
						type="button"
						class="ant-btn ant-btn-text ant-btn-icon-only ant-btn-block"
						style="margin-left: 10px;"
						on:click={() => (tokens = tokens.filter((t) => token !== t))}
					>
						<span role="img" aria-label="delete" class="anticon anticon-delete"
							><svg
								viewBox="64 64 896 896"
								focusable="false"
								data-icon="delete"
								width="1em"
								height="1em"
								fill="currentColor"
								aria-hidden="true"
								><path
									d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
								/></svg
							></span
						>
					</button>
				</div>
			</div>
		{/each}
		<div class="ant-row ant-form-item">
			<div class="ant-col ant-form-item-control">
				<div class="ant-form-item-control-input">
					<div class="ant-form-item-control-input-content">
						<button
							type="button"
							class="ant-btn ant-btn-dashed ant-btn-block"
							ant-click-animating-without-extra-node="false"
							on:click={() => (tokens = [...tokens, { type: 'erc20', value: '' }])}
						>
							<span role="img" aria-label="plus" class="anticon anticon-plus"
								><svg
									viewBox="64 64 896 896"
									focusable="false"
									data-icon="plus"
									width="1em"
									height="1em"
									fill="currentColor"
									aria-hidden="true"
									><defs><style></style></defs><path
										d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
									/><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" /></svg
								></span
							>
							<span>Add token</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>
<div class="ant-modal-footer">
	<button
		type="button"
		class="ant-btn ant-btn-default"
		on:click={() => openModal(bind(AssetsModal, {}))}
	>
		<span>Cancel</span>
	</button>
	<button type="button" class="ant-btn ant-btn-primary" on:click={saveAssets}>
		<span>Save tracked assets</span>
	</button>
</div>
