<script lang="ts" context="module">
	export enum Drawers {
		Metadata = 'Metadata',
		Funding = 'Funding',
		Token = 'Token',
		Rules = 'Rules',
		Handle = 'Handle'
	}
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { BigNumber } from 'ethers';
	import { DistributionLimitType } from '$juicebox/constants';
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import Button from '../Button.svelte';
	import Drawer from '../Drawer.svelte';
	import Icon from '../Icon.svelte';
	import Money from '../Money.svelte';
	import Trans from '../Trans.svelte';
	// TODO move these files to common area
	import FundingDrawer from '../FundingDrawer.svelte';
	import TokenDrawer from '../TokenDrawer.svelte';
	import ProjectDetails from '../ProjectDetails.svelte';
	import RulesDrawer from '../RulesDrawer.svelte';
	import { getDistributionLimitType } from '$juicebox/utils/v2/distributions';
	import { getFundingCycleDetails } from '$juicebox/utils/v2/fundingCycle';
	import { formatSplitPercent, MAX_DISTRIBUTION_LIMIT } from '$juicebox/utils/v2/math';

	import Popover from '../Popover.svelte';
	import Modal, { bind } from '../Modal.svelte';
	import { contracts, writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { PROJECT_PAY_CHARACTER_LIMIT } from '$juicebox/constants/numbers';
	import { uploadProjectMetadata } from '$juicebox/utils/ipfs';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$juicebox/constants/v2/metadataDomain';
	import { readNetwork } from '$stores/web3';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import PendingTransaction from '../PendingTransaction.svelte';
	import { ballotStrategies } from '$juicebox/constants/v2/ballotStrategies';
	import HeavyBorderBox from '../HeavyBorderBox.svelte';
	import DrawerTabs from '../DrawerTabs.svelte';
	import SimpleSplits from '../SimpleSplits.svelte';
	import ProjectHandleDrawer from '../ProjectHandleDrawer.svelte';

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	let deployDisabled = false;
	let deployInProgress = false;

	export let current: Drawers = undefined;
	export let drawerOpen = false;
	export let close: () => void;
	let subModal = false;

	const hiddenFCDetails = ['start', 'end', 'issuanceRate', 'redemptionRate', 'reservedRate'];

	const info =
		'Updates you make to this section will only be applied to <b>upcoming</b> funding cycles.';

	function openModal(component) {
		subModal = component;
	}

	let savingProjectDetails = false;

	async function deployDetails() {
		try {
			savingProjectDetails = true;
			const uploadedMetadata = await uploadProjectMetadata({
				name: $project.projectMetadata.name,
				description: $project.projectMetadata.description,
				logoUri: $project.projectMetadata.logoUri,
				infoUri: $project.projectMetadata.infoUri,
				twitter: $project.projectMetadata.twitter,
				discord: $project.projectMetadata.discord,
				payButton: $project.projectMetadata.payButton.substring(0, PROJECT_PAY_CHARACTER_LIMIT), // Enforce limit
				payDisclosure: $project.projectMetadata.payDisclosure
			});
			const cid = uploadedMetadata.IpfsHash;

			console.clear();
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
			}
		} catch (error) {
			console.error(error);
		}
		savingProjectDetails = false;
	}

	const DEFAULT_MUST_START_AT_OR_AFTER = '1';
	const DEFAULT_MEMO = '';

	async function deployProject() {
		const {
			projectId,
			fundingCycle,
			fundingCycleMetadata,
			payoutSplits,
			reservedTokensSplits,
			tokenAddress,
			distributionLimit,
			distributionLimitCurrency
		} = $project;
		const args = [
			projectId,
			fundingCycle,
			fundingCycleMetadata,
			DEFAULT_MUST_START_AT_OR_AFTER,
			[
				{
					group: 1,
					splits: payoutSplits
				},
				{
					group: 2,
					splits: reservedTokensSplits
				}
			],
			[
				{
					terminal: contracts[$readNetwork.alias].JBETHPaymentTerminal.address,
					token: tokenAddress || ETH_TOKEN_ADDRESS,
					distributionLimit: distributionLimit ?? BigNumber.from(MAX_DISTRIBUTION_LIMIT),
					distributionLimitCurrency: distributionLimitCurrency ?? BigNumber.from(V2_CURRENCY_ETH),
					overflowAllowance: '0',
					overflowAllowanceCurrency: '0'
				}
			],
			DEFAULT_MEMO
		];

		console.log('Reconfiguring with args:', args);

		const txnResponse = await writeContract(
			V2ContractName.JBController,
			'reconfigureFundingCyclesOf',
			args
		);

		openModal(
			bind(PendingTransaction, {
				txnResponse
			})
		);

		await txnResponse.wait();
		close();

		window.location.reload();
	}

	let currentTab = 0;

	$: distributionLimitType = getDistributionLimitType($project.distributionLimit);

	$: fundingCycleDetails = getFundingCycleDetails(
		$project.fundingCycle,
		$project.fundingCycleMetadata
	);

	$: rates = ['issuanceRate', 'redemptionRate', 'reservedRate'].map((rate) =>
		fundingCycleDetails.find((item) => item.id === rate)
	);

	$: configuration = fundingCycleDetails.find((item) => item.id === 'configuration');

	$: ballot = ballotStrategies(readNetwork.get().alias).find(
		(ballot) => ballot.name === configuration.value
	);
</script>

<section>
	<h3><Trans>Project configuration</Trans></h3>
	<DrawerTabs tabs={['Reconfiguration']} bind:currentTab />
	{#if currentTab === 0}
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Edit project details</Trans></h4>
				<p><Trans>Changes to project details will take effect immediately.</Trans></p>
				<Button
					type="tertiary"
					size="md"
					on:click={() => {
						drawerOpen = true;
						current = Drawers.Handle;
					}}
				>
					<Trans>Project handle</Trans>
				</Button>
				<Button
					type="tertiary"
					size="md"
					on:click={() => {
						drawerOpen = true;
						current = Drawers.Metadata;
					}}
				>
					<Trans>Project details</Trans>
				</Button>
			</div>
		</HeavyBorderBox>
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Reconfigure upcoming funding cycles</Trans></h4>
				<p>
					<Trans
						>Any changes you make will take effect in funding cycle #2. The current funding cycle
						(#1) won't be altered.</Trans
					>
				</p>
				<Button
					type="tertiary"
					size="md"
					on:click={() => {
						drawerOpen = true;
						current = Drawers.Funding;
					}}
				>
					<Trans>Distribution limit, duration and payouts</Trans>
				</Button>
				<Button
					type="tertiary"
					size="md"
					on:click={() => {
						drawerOpen = true;
						current = Drawers.Token;
					}}
				>
					<Trans>Token</Trans>
				</Button>
				<Button type="tertiary" size="md" on:click={() => {}}>
					<Trans>Extensions</Trans>
				</Button>
				<Button
					type="tertiary"
					size="md"
					on:click={() => {
						drawerOpen = true;
						current = Drawers.Rules;
					}}
				>
					<Trans>Rules</Trans>
				</Button>
			</div>
		</HeavyBorderBox>
		<HeavyBorderBox margin="32px" padding="16px 32px">
			<div class="box">
				<h4><Trans>Review</Trans></h4>
				<p>
					<Trans>Review project reconfiguration</Trans>
				</p>
				<div class="details">
					{#each fundingCycleDetails as detail, index}
						{#if index === 1}
							<div class="distribution-limit">
								<h4>
									<Trans>Distribution Limit</Trans>
									<Popover
										placement="right"
										message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
									>
										<Icon name="questionCircle" />
									</Popover>
								</h4>
								<p>
									<!-- Put Trans back in when figured out how to style the inner div -->
									{#if distributionLimitType === DistributionLimitType.None}
										<!-- <Trans> -->
										Zero
										<!-- </Trans> -->
									{:else if distributionLimitType === DistributionLimitType.Specific}
										<Money
											currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
											amount={$project.distributionLimit}
										/>
									{:else}
										<!-- <Trans> -->
										Infinite (no limit)
										<!-- </Trans> -->
									{/if}
								</p>
							</div>
						{/if}

						<!--  i can see the value in having the mint rate, contributor rate, reserved token allocation at the bottom after reconfiguration rules -->
						<!-- 0: {id: 'duration', label: 'Duration', value: 'Not set', issue: true, issueText: 'The project owner may reconfigure this funding cycle at any time, without notice.'}
		1: {id: 'discountRate', label: 'Discount rate', value: '0%', info: 'The ratio of tokens rewarded per payment amount wi…upporters to pay your project earlier than later.'}
		2: {id: 'redemptionRate', label: 'Redemption rate', value: '100%', info: 'This rate determines the amount of overflow that e…equal value regardless of when they are redeemed.'}
		3: {id: 'reservedRate', label: 'Reserved tokens', value: '0%', info: 'Whenever someone pays your project, this percentag…ich distributes them to their intended receivers.', issue: false, …}
		4: {id: 'issuanceRate', label: 'Issuance rate', value: '1,000,000 tokens/ETH', info: 'Tokens received per ETH paid to the treasury. This… reserved tokens amount of future funding cycles.'}
		5: {id: 'payments', label: 'Payments', value: 'Enabled'}
		6: {id: 'allowMinting', label: 'Token minting', value: 'Disabled', issue: false, issueText: 'The project owner may mint any supply of tokens at…ing the token share of all existing contributors.', …}
		7: {id: 'configuration', label: 'Reconfiguration strategy', value: '3-day delay', info:  -->

						{#if !hiddenFCDetails.includes(detail.id)}
							<div class="info-item" class:full={detail.id === 'configuration'}>
								{#if detail.info}
									<h4>
										<Trans>{detail.label}</Trans>
										<Popover
											placement="right"
											message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
										>
											<Icon name="questionCircle" />
										</Popover>
									</h4>
								{:else}
									<h4><Trans>{detail.label}</Trans></h4>
								{/if}
								<p>{detail.value}</p>
								{#if detail.issue}
									<span>
										<Popover message={detail.issueText} placement="right">
											<Icon name="exclamationCircle" />
										</Popover>
									</span>
								{/if}
								{#if detail.id === 'configuration'}
									<div class="address">
										<p>{ballot.address}</p>
									</div>
								{/if}
							</div>
						{/if}
					{/each}
					<div class="rates full">
						{#each rates as rate}
							<div class="info-item">
								{#if rate.info}
									<h4>
										<Trans>{rate.label}</Trans>
										<Popover
											placement="right"
											message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
										>
											<Icon name="questionCircle" />
										</Popover>
									</h4>
								{:else}
									<h4><Trans>{rate.label}</Trans></h4>
								{/if}
								<p>{rate.value}</p>
								{#if rate.issue}
									<span>
										<Popover message={rate.issueText} placement="right">
											<Icon name="exclamationCircle" />
										</Popover>
									</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<div class="splits">
					{#if $project.payoutSplits.length}
						<div class="split-item">
							<h4>
								<Trans>Distribution splits</Trans>
								<Popover
									placement="right"
									message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
								>
									<Icon name="questionCircle" />
								</Popover>
							</h4>
							{#each $project.payoutSplits as split}
								<SimpleSplits
									crown={$project.projectOwnerAddress?.toLowerCase() ===
										split.beneficiary?.toLowerCase()}
									{split}
									{distributionLimitType}
									distributionLimit={$project.distributionLimit}
									currency={$project.distributionLimitCurrency}
								/>
							{/each}
						</div>
					{/if}
					{#if $project.reservedTokensSplits?.length}
						<div class="split-item">
							<h4>
								<Trans>Reserved token allocation</Trans>
								<Popover
									placement="right"
									message="The maximum amount of funds allowed to be distributed from the project's treasury each funding cycle."
								>
									<Icon name="questionCircle" />
								</Popover>
							</h4>
							{#each $project.reservedTokensSplits as split}
								<SimpleSplits
									crown={$project.projectOwnerAddress?.toLowerCase() ===
										split.beneficiary?.toLowerCase()}
									{split}
									{distributionLimitType}
									distributionLimit={$project.distributionLimit}
									currency={$project.distributionLimitCurrency}
								/>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</HeavyBorderBox>
	{/if}
	<div>
		<Button size="md" fullWidthMobile={true} type="secondary" on:click={close}>Cancel</Button>
		<Button size="md" fullWidthMobile={true} on:click={deployProject}>
			Deploy {currentTab === 0 ? 'funding cycle' : 'tokens'} configuration
			{#if deployInProgress}
				<Icon name="loading" spin />
			{/if}
		</Button>
	</div>
</section>

<Drawer bind:shown={drawerOpen}>
	<div class="content">
		{#if current === Drawers.Metadata}
			<h3>Reconfigure project details</h3>
			<ProjectDetails
				info={'Project details reconfigurations will create a separate transaction.'}
			/>
			<Button size="md" on:click={deployDetails} disabled={savingProjectDetails}>
				{savingProjectDetails ? '...' : 'Save project details'}
			</Button>
		{:else if current === Drawers.Funding}
			<FundingDrawer {close} {openModal}>
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
			<TokenDrawer {close} {openModal}>
				<header slot="header">
					<h3>Reconfigure token</h3>
					<p>
						<Trans>
							{@html info}
						</Trans>
					</p>
				</header>
			</TokenDrawer>
		{:else if current === Drawers.Handle}
			<ProjectHandleDrawer>
				<header slot="header">
					<h3>Change project handle</h3>
				</header>
			</ProjectHandleDrawer>
		{/if}
	</div>
</Drawer>
<Modal show={subModal} />

<style lang="scss">
	section {
		padding: 40px 26px;
		max-width: 650px;
	}

	p {
		font-weight: 400;
		color: var(--text-secondary);
		margin-bottom: 0;
	}

	h3 {
		font-size: 28px;
		color: var(--text-header);
	}

	h4 {
		font-size: 16px;
		font-weight: 400;
		color: var(--text-header);
		margin-bottom: 0;
	}

	span {
		font-size: 18px;
		color: var(--text-warn);
	}

	.address {
		color: var(--text-secondary);
		font-size: 14px;
		word-break: break-all;
	}

	.content {
		padding: 2rem;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-row-gap: 20px;
		grid-column-gap: 40px;
		grid-auto-flow: row;
		font-size: 13px;
		p {
			font-weight: 400;
			margin-bottom: 0;
			display: inline;
		}
		h4 {
			font-weight: 500;
		}
	}

	.full {
		grid-column: 1 / -1;
	}

	.rates {
		/* A sub-grid with three columns and wraps if item smaller than 100px */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		grid-auto-flow: row;
	}

	.box {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	@media (max-width: 350px) {
		h4 {
			font-size: 13px;
		}
	}
</style>
