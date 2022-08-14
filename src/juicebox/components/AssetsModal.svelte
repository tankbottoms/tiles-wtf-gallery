<script lang="ts">
	import ERC20ContractAbi from '$juicebox/constants/ERC20ContractAbi';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { V2ContractName } from '$juicebox/models/v2/contracts';

	import { getProvider, readNetwork } from '$stores/web3';
	import { copyToClipboard } from '$juicebox/utils/clipboard';
	import { formatWad } from '$juicebox/utils/formatNumber';
	import type Store from '$utils/Store';
	import { readContract, readContractByAddress } from '$juicebox/utils/web3/contractReader';
	import { BigNumber } from 'ethers';

	import { getContext, onMount } from 'svelte';
	import EnsOrAddress from './EnsOrAddress.svelte';
	import Icon from './Icon.svelte';
	import Loading from './Loading.svelte';
	import { closeModal } from './Modal.svelte';
	import Popover from './Popover.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let assets = [
		{ type: 'native', balance: BigNumber.from(0), symbol: $readNetwork.token, alwaysShow: true },
		{
			// DAI
			type: 'erc20',
			contract: {
				rinkeby: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
				mainnet: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
			},
			balance: BigNumber.from(0),
			alwaysShow: false
		},
		{
			// JBX
			type: 'project',
			id: BigNumber.from(1),
			balance: BigNumber.from(0),
			alwaysShow: false
		},
		...($project.projectId
			? [
					{
						type: 'project',
						id: $project.projectId,
						balance: BigNumber.from(0)
					},
					...($project.projectMetadata.tokens || [])?.map((t) => ({
						type: t.type,
						[t.type === 'erc20' ? 'contract' : 'id']:
							t.type === 'erc20'
								? {
										rinkeby: t.value,
										mainnet: t.value
								  }
								: t.value,
						balance: BigNumber.from(0),
						alwaysShow: true
					}))
			  ]
			: [])
	].filter(Boolean);

	let loading = false;

	onMount(async () => {
		loading = true;
		for (let i = 0; i < assets.length; i++) {
			try {
				await readAsset(i);
			} catch (error) {}
		}
		loading = false;
	});

	$: projectOwner = $project.projectOwnerAddress;

	let filteredAssets: typeof assets = [];

	function getAssetKey(asset: typeof assets[0]) {
		return `${asset.type}${
			asset.type === 'erc20'
				? asset.contract[$readNetwork.alias]
				: asset.type === 'project'
				? asset.id
				: ''
		}`;
	}

	$: {
		filteredAssets = [];
		for (const asset of assets) {
			const key = getAssetKey(asset);
			if (!filteredAssets.find((a) => getAssetKey(a) === key)) {
				filteredAssets.push(asset);
			}
		}
		filteredAssets = filteredAssets;
	}

	async function readAsset(assetIndex: number) {
		const provider = getProvider();
		const asset = assets[assetIndex];
		if (asset.type === 'native') {
			asset.balance = await provider.getBalance(projectOwner);
		} else if (asset.type === 'erc20') {
			asset.balance = await readContractByAddress(
				asset.contract[$readNetwork.alias],
				ERC20ContractAbi,
				'balanceOf',
				[projectOwner]
			);
			asset.symbol = await readContractByAddress(
				asset.contract[$readNetwork.alias],
				ERC20ContractAbi,
				'symbol'
			);
		} else if (asset.type === 'project') {
			const contractAddress = await readContract(V2ContractName.JBTokenStore, 'tokenOf', [
				asset.id
			]);

			asset.symbol = await readContractByAddress(contractAddress, ERC20ContractAbi, 'symbol');

			asset.balance = await readContract(V2ContractName.JBTokenStore, 'balanceOf', [
				projectOwner,
				asset.id
			]);
		}

		assets[assetIndex] = asset;
	}
</script>

<main>
	<div>
		<div>
			<h1>Assets</h1>
			<p>Other assets in this project's owner's wallet.</p>
			<div>
				{#each filteredAssets as asset}
					{#if asset.balance.gt(0) || asset.alwaysShow}
						<div class="ant-space-item">
							<div style="display: flex; justify-content: space-between;">
								{#if asset.balance.eq(0)}
									<span>--</span>
								{:else}
									<span
										>{formatWad(asset.balance, {
											precision: 4
										})}</span
									>
								{/if}
								<Popover placement="left">
									<svelte:fragment slot="content">
										<div>
											{#if asset.type === 'erc20'}
												<a
													href="https://{$readNetwork.alias === 'mainnet'
														? ''
														: `${$readNetwork.alias}.`}etherscan.io/token/{asset.contract[
														$readNetwork.alias
													]}?a={projectOwner}"
													target="_blank"
												>
													<EnsOrAddress
														address={asset.contract[$readNetwork.alias]}
														showTooltip={false}
													/>
												</a>
												<span
													style="cursor: pointer"
													on:click={() => copyToClipboard(asset.contract[$readNetwork.alias])}
												>
													<Icon name="copy" style="transform: translateY(3px)" />
												</span>
											{:else if asset.type === 'project'}
												<a href={null}>
													Project ID: {asset.id}
												</a>
											{/if}
										</div>
									</svelte:fragment>
									<div style="display: flex; align-items: center;">
										{#if asset.type === 'native'}
											<a
												style="color: var(--text-primary);"
												href="https://{$readNetwork.alias === 'mainnet'
													? ''
													: `${$readNetwork.alias}.`}etherscan.io/address/{projectOwner}"
												target="_blank"
											>
												<span>{asset.symbol ?? 'TOKENs'}</span>
											</a>
										{:else if asset.type === 'erc20' && asset.contract}
											<a
												style="color: var(--text-primary);"
												href="https://{$readNetwork.alias === 'mainnet'
													? ''
													: `${$readNetwork.alias}.`}etherscan.io/token/{asset.contract[
													$readNetwork.alias
												]}?a={projectOwner}"
												target="_blank"
											>
												<span>{asset.symbol ?? 'TOKENs'}</span>
											</a>
										{:else if asset.type === 'project'}
											<a
												style="color: var(--text-primary);"
												href="/projects/{asset.id}?{$readNetwork
													? `network=${$readNetwork?.alias}`
													: ''}"
											>
												{#if asset.symbol}
													<span>{asset.symbol}</span>
												{:else}
													<span>Project {asset.id}</span>
												{/if}
											</a>
										{/if}
									</div>
								</Popover>
							</div>
						</div>
					{/if}
				{/each}
			</div>
			{#if loading}
				<Loading />
			{/if}
		</div>
	</div>
	<div>
		<div style="display: flex; justify-content: space-between; margin-top: 20px;">
			<div>&nbsp;</div>
			<button type="button" class="ant-btn ant-btn-default" on:click={() => closeModal()}
				>Done</button
			>
		</div>
	</div>
</main>

<style>
	h1 {
		color: var(--text-header);
	}
	main {
		max-width: 350px;
	}
</style>
