<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { BigNumber, ethers } from 'ethers';
	import type Store from '$utils/Store';
	import { connectedAccount } from '$stores/web3';
	import { tokenSymbolText } from '$juicebox/utils/tokenSymbolText';
	import { decodeV2FundingCycleMetadata, V2FundingCycleRiskCount } from '$juicebox/utils/v2/fundingCycle';
	import HeavyBorderBox from '$juicebox/components/HeavyBorderBox.svelte';
	import FundingCycleDetails from '$juicebox/components/FundingCycleDetails.svelte';
	import type { UserTokenBalanceContext, V2ProjectContextType } from '$juicebox/models/project-type';
	import Button from '$juicebox/components/Button.svelte';
	import Trans from '$juicebox/components/Trans.svelte';
	import PopInfo from '$juicebox/components/PopInfo.svelte';
	import { formatPercent, formatWad } from '$juicebox/utils/formatNumber';
	import Icon from '$juicebox/components/Icon.svelte';
	import PayoutSplits from '../PayoutSplits.svelte';
	import ReservedTokenSplits from '../ReservedTokenSplits.svelte';
	import { serializeV2FundingCycleData } from '$juicebox/utils/v2/serializers';
	import { hasFundingDuration } from '$juicebox/utils/v2/fundingCycle';
	import { openModal } from '../Modal.svelte';
	import UpcomingFundingCycle, {
		getUpcomingFundingCycleRiskCount
	} from './UpcomingFundingCycle.svelte';
	import FundingCycleHistory from './FundingCycleHistory.svelte';
	import ManageToken from './ManageToken.svelte';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import IssueErc20 from './IssueERC20.svelte';
	import TokenHolders from './TokenHolders.svelte';
	import { V2OperatorPermission } from '$juicebox/constants/v2/operatorPermission';
	import EnsOrAddress from '../EnsOrAddress.svelte';
	import Graph from './Graph';
	import Popover from '../Popover.svelte';
	import ProjectConfigurationDrawer from './ProjectConfigurationDrawer.svelte';
	import Drawer from '../Drawer.svelte';

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;
	const tokenSymbol = $projectContext.tokenSymbol;
	const tokenAddress = $projectContext.tokenAddress;
	const currentFC = $projectContext.fundingCycle;
	const payoutSplits = $projectContext.payoutSplits;
	const reservedTokensSplits = $projectContext.reservedTokensSplits;

	let upcomingRiskCount: number;
	let tabs = [];
	let currentTab;

	$: fcMetadata = currentFC ? decodeV2FundingCycleMetadata(currentFC.metadata) : null;

	const tokenText = tokenSymbolText({
		tokenSymbol: tokenSymbol,
		capitalize: false,
		plural: true
	});

	const userTokenBalance = getContext('USER_TOKEN_BALANCE') as Store<UserTokenBalanceContext>;

	$: claimedBalance = $userTokenBalance.claimedBalance;
	$: unclaimedBalance = $userTokenBalance.unclaimedBalance;
	$: totalBalance = $userTokenBalance.totalBalance;
	$: userOwnershipPercentage = formatPercent(totalBalance, $projectContext.totalTokenSupply) || '0';

	$: claimedBalanceFormatted = formatWad(claimedBalance ?? 0, {
		precision: 0
	});

	const fundingCycleData = serializeV2FundingCycleData(currentFC);
	const riskCount = V2FundingCycleRiskCount(currentFC);

	$: {
		// NOTE this looks bad, but it does only run once on the update of upcomingRiskCount - so it's ok
		tabs = $projectContext.fundingCycle?.number?.gt(0)
			? [
					{
						key: 'current',
						label: 'Current',
						...(riskCount > 0 && {
							issue:
								'This funding cycle may pose risks to contributors. Check the funding cycle details before paying this project.'
						})
					},
					hasFundingDuration(fundingCycleData) &&
						$projectContext.queuedFundingCycle?.number?.gt(0) && {
							key: 'upcoming',
							label: 'Upcoming',
							...(upcomingRiskCount > 0 && {
								issue:
									'This funding cycle may pose risks to contributors. Check the funding cycle details before paying this project.'
							})
						},
					{
						key: 'history',
						label: 'History',
						issue: undefined
					}
			  ].filter(Boolean)
			: [];
		currentTab = tabs?.[0]?.key;
	}

	let clientWidth = 500;
	let drawerShown = false;

	$: reservedTokens = $projectContext.reservedTokenBalance;

	onMount(async () => {
		upcomingRiskCount = await getUpcomingFundingCycleRiskCount($projectContext.projectId);
	});
</script>

<section bind:clientWidth>
	<Graph
		width={clientWidth}
		projectId={$projectContext.projectId}
		createdAt={$projectContext.createdAt}
	/>
	<!-- TODO add logic for when to show owner buttons -->
	<div class="rewards">
		{#if !$projectContext.tokenAddress || $projectContext.tokenAddress === ethers.constants.AddressZero}
			<InfoSpaceBetween>
				<h4 slot="left">
					<PopInfo
						message={`${
							tokenSymbol || 'Tokens'
						} are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.`}
					>
						<Trans>{tokenSymbol || 'Tokens'}</Trans>
					</PopInfo>
				</h4>
				<div slot="right">
					{#if $projectContext.hasIssueTicketsPermissions[V2OperatorPermission.ISSUE]}
						<Button type="secondary" size="sm" on:click={() => openModal(IssueErc20)}>
							<div class="settingButton">
								<Icon name="setting" />
								<p>Issue ERC-20</p>
							</div>
						</Button>
					{/if}
				</div>
			</InfoSpaceBetween>
		{:else}
			<!-- NOTE: this is the same as the <h4> above, so make sure to keep them in-synch -->
			<h4>
				<PopInfo
					message={`${tokenSymbol} Tokens are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.`}
					><Trans>{tokenSymbol || 'Tokens'}</Trans></PopInfo
				>
			</h4>
		{/if}

		{#if !BigNumber.from(tokenAddress || 0).eq(0)}
			<div>
				<p class="label"><Trans>Project token</Trans>:</p>
				<span class="project-token">
					{tokenSymbol} (<EnsOrAddress
						address={tokenAddress}
						token={{
							symbol: tokenSymbol,
							decimals: 18,
							image: $projectContext.projectMetadata.logoUri
						}}
					/>)
				</span>
			</div>
		{/if}

		<InfoSpaceBetween>
			<div slot="left">
				<p class="label"><Trans>Total supply</Trans>:</p>
				<span
					>{formatWad($projectContext.totalTokenSupply, {
						precision: $projectContext.totalTokenSupply.gt(1000) ? 0 : 3
					})}
					{tokenText}</span
				>
			</div>
			<div slot="right">
				<Button on:click={() => openModal(TokenHolders)} type="secondary" size="sm">
					<p class="buttonText">Holders</p>
				</Button>
			</div>
		</InfoSpaceBetween>

		{#if $connectedAccount}
			<InfoSpaceBetween>
				<div slot="left">
					<p class="label"><Trans>Your balance</Trans>:</p>
					<div class="address-balance">
						<span>{claimedBalanceFormatted} {tokenText}</span>
						<!-- <span><Trans>{unclaimedBalanceFormatted} {tokenText} claimable</Trans></span> -->
						<small><Trans>{userOwnershipPercentage}% of total supply</Trans></small>
					</div>
				</div>
				<div slot="right">
					<Button on:click={() => openModal(ManageToken)} type="secondary" size="sm">
						<p class="buttonText">Manage {tokenSymbol || 'tokens'}</p>
					</Button>
				</div>
			</InfoSpaceBetween>
		{/if}
	</div>
	<div class="fundingCycle">
		<InfoSpaceBetween>
			<h4 slot="left">
				<PopInfo
					message="A project's lifetime is defined in funding cycles. If a funding target is set, the project can withdraw no more than the target for the duration of the cycle."
					>Funding cycle</PopInfo
				>
			</h4>
			<div slot="right">
				{#if $projectContext.projectOwnerAddress.toLowerCase() === $connectedAccount.toLowerCase()}
					<Button type="secondary" size="sm" on:click={() => (drawerShown = !drawerShown)}>
						<Icon name="setting" style="transform: translateY(2px);" />
						Reconfigure upcoming
					</Button>
				{/if}
			</div>
		</InfoSpaceBetween>
		<nav>
			{#each tabs as tab}
				<div
					role="button"
					class:active={tab.key === currentTab}
					on:click={() => {
						currentTab = tab.key;
					}}
				>
					{tab.label}
					{#if tab.issue}
						<span class="warning">
							<Popover message={tab.issue} placement="top">
								<Icon name="exclamationCircle" />
							</Popover>
						</span>
					{/if}
				</div>
			{:else}
				<HeavyBorderBox>No active funding cycle.</HeavyBorderBox>
			{/each}
		</nav>
		<div>
			{#if currentTab === 'current'}
				<HeavyBorderBox>
					<FundingCycleDetails
						tokenSymbol={$projectContext.tokenSymbol || 'token'}
						fundingCycle={currentFC}
						fundingCycleMetadata={fcMetadata}
						distributionLimit={$projectContext.distributionLimit}
						currentDistributionLimitCurrencyType={$projectContext.distributionLimitCurrency}
					/>
				</HeavyBorderBox>
				<HeavyBorderBox>
					<PayoutSplits
						balanceInDistributionLimitCurrency={$projectContext.balanceInDistributionLimitCurrency}
						currency={$projectContext.distributionLimitCurrency}
						distributionLimit={$projectContext.distributionLimit}
						{payoutSplits}
						projectOwnerAddress={$projectContext.projectOwnerAddress}
						usedDistributionLimit={$projectContext.usedDistributionLimit}
					/>
				</HeavyBorderBox>
				<HeavyBorderBox>
					<ReservedTokenSplits
						{reservedTokens}
						fundingCycleMetadata={fcMetadata}
						{reservedTokensSplits}
						{tokenSymbol}
						{tokenAddress}
						projectOwnerAddress={$projectContext.projectOwnerAddress}
					/>
				</HeavyBorderBox>
			{:else if currentTab === 'upcoming'}
				<UpcomingFundingCycle />
			{:else if currentTab === 'history'}
				<FundingCycleHistory />
			{/if}
		</div>
	</div>
</section>

<Drawer bind:shown={drawerShown}>
	<ProjectConfigurationDrawer close={() => (drawerShown = false)} />
</Drawer>

<style>
	section {
		padding: 40px 20px 0px;
		flex: 0 0 48%;
		/* display: flex;
		flex-direction: column; */
	}

	p.label {
		margin: 5px;
		color: var(--text-secondary);
		display: inline-block;
		width: 120px;
	}

	nav div[role='button'] {
		display: inline;
		text-transform: uppercase;
		color: var(--text-tertiary);
		font-size: 0.8rem;
		margin-right: 8px;
		cursor: pointer;
	}

	nav div[role='button'].active {
		color: var(--text-secondary);
		font-weight: 600;
	}
	h4 {
		margin-right: 10px;
		color: var(--text-header);
		font-weight: 600;
	}

	span {
		font-weight: 300;
	}

	small {
		color: var(--text-tertiary);
	}

	.address-balance {
		display: inline-flex;
		flex-direction: column;
	}

	.fundingCycle {
		flex: 0 0 100%;
	}
	.rewards {
		margin-bottom: 40px;
	}

	.settingButton {
		display: flex;
		align-items: center;
		padding: 0px 8px;
	}

	.settingButton p,
	.buttonText {
		line-height: 1;
		margin: 0;
		padding: 2px 5px;
		font-weight: 500;
	}

	.warning {
		color: var(--text-warn);
	}

	@media (max-width: 750px) {
		section {
			flex: 0 0 100%;
		}
	}

	@media (max-width: 350px) {
		.fundingCycle div[slot='right'] {
			margin-bottom: 10px;
		}
	}

	.project-token {
		display: inline-flex;
	}
</style>
