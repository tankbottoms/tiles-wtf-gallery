<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { constants } from 'ethers';
	import type Store from 'src/tiles/Store';
	import { connectedAccount } from '$stores/web3';
	import { tokenSymbolText } from '$utils/tokenSymbolText';
	import { decodeV2FundingCycleMetadata } from '$utils/v2/fundingCycle';
	import { getTruncatedAddress } from '$components/Address.svelte';
	import HeavyBorderBox from '$components/HeavyBorderBox.svelte';
	import FundingCycleDetails from '$components/FundingCycleDetails.svelte';
	import type { V2ProjectContextType } from '$models/project-type';
	import Button from '$components/Button.svelte';
	import Trans from '$components/Trans.svelte';
	import PopInfo from '$components/PopInfo.svelte';
	import { formatPercent, formatWad } from '$utils/formatNumber';
	import { formatReservedRate } from '$utils/v2/math';
	import { BigNumber } from 'ethers';
	import PayoutSplits from '$components/PayoutSplits.svelte';
	import ReservedTokenSplits from '$components/ReservedTokenSplits.svelte';
	import { serializeV2FundingCycleData } from '$utils/v2/serializers';
	import { hasFundingDuration } from '$utils/v2/fundingCycle';
	import { openModal } from '$components/Modal.svelte';
	import UpcomingFundingCycle from './UpcomingFundingCycle.svelte';
	import FundingCycleHistory from './FundingCycleHistory.svelte';
	import ManageToken from './ManageToken.svelte';

	let clientWidth = 500;
	let tab = 0;

	const projectContext = getContext('PROJECT') as Store<V2ProjectContextType>;
	const tokenSymbol = $projectContext.tokenSymbol;
	const tokenAddress = $projectContext.tokenAddress;
	const currentFC = $projectContext.fundingCycle;
	const payoutSplits = $projectContext.payoutSplits;
	const reservedTokensSplits = $projectContext.reservedTokensSplits;

	$: fcMetadata = currentFC ? decodeV2FundingCycleMetadata(currentFC.metadata) : null;

	const hasIssuedERC20 = tokenAddress !== constants.AddressZero;

	const tokenText = tokenSymbolText({
		tokenSymbol: tokenSymbol,
		capitalize: false,
		plural: true
	});

	// TODO contract reader
	// const claimedBalance = getERC20BalanceOf(tokenAddress, connectedAccount)
	// const unclaimedBalance = getUserUnclaimedTokenBalance(connectedAccount, projectId)
	// const totalBalance = useTotalBalance(connectedAccount, projectId)
	// const userOwnershipPercentage =
	// 	formatPercent(totalBalance, totalTokenSupply) || '0'
	const claimedBalance = BigNumber.from(0);
	const unclaimedBalance = BigNumber.from('0x07f0e10af47c1c700000');
	// this is arbitrary as mock data
	const totalBalance = unclaimedBalance;
	const userOwnershipPercentage =
		formatPercent(totalBalance, $projectContext.totalTokenSupply) || '0';

	const claimedBalanceFormatted = formatWad(claimedBalance ?? 0, {
		precision: 0
	});
	const unclaimedBalanceFormatted = formatWad(unclaimedBalance ?? 0, {
		precision: 0
	});

	const fundingCycleData = serializeV2FundingCycleData(currentFC);
	const tabs = [
		{
			key: 'current',
			label: 'Current'
		},
		hasFundingDuration(fundingCycleData) && {
			key: 'upcoming',
			label: 'Upcoming'
		},
		{
			key: 'history',
			label: 'History'
		}
	].filter(Boolean);

	let currentTab = tabs[0].key;

	const untapped = ($projectContext.distributionLimit ?? BigNumber.from(0)).sub(
		$projectContext.usedDistributionLimit
	);

	const reservedTokens = $projectContext.balanceInDistributionLimitCurrency?.gt(untapped)
		? untapped
		: $projectContext.balanceInDistributionLimitCurrency;
</script>

<section bind:clientWidth>
	{#if hasIssuedERC20}
		<div class="rewards">
			<h4>
				<PopInfo
					message={`${tokenSymbol} Tokens are distributed to anyone who pays this project. If the project has set a funding target, tokens can be redeemed for a portion of the project's overflow whether or not they have been claimed yet.`}
					><Trans>Tokens</Trans></PopInfo
				>
			</h4>
			<div>
				<p class="label"><Trans>Project token</Trans>:</p>
				<span>{tokenSymbol} ({getTruncatedAddress(tokenAddress)})</span>
			</div>
			<div>
				<p class="label"><Trans>Total supply</Trans>:</p>
				<span>{formatWad($projectContext.totalTokenSupply)} {tokenText}</span>
			</div>
			{#if $connectedAccount}
				<div>
					<p class="label"><Trans>Your balance</Trans>:</p>
					<div class="address-balance">
						<span>{claimedBalanceFormatted} {tokenText}</span>
						<span><Trans>{unclaimedBalanceFormatted} {tokenText} claimable</Trans></span>
						<small><Trans>{userOwnershipPercentage}% of total supply</Trans></small>
					</div>
					<Button on:click={() => openModal(ManageToken)} type="secondary" size="sm">
						Manage {tokenText}
					</Button>
				</div>
			{/if}
		</div>
	{/if}
	<div class="fundingCycle">
		<h4>
			<PopInfo message="">Funding cycle</PopInfo>
		</h4>
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
				</div>
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
				<UpcomingFundingCycle tokenSymbol={$projectContext.tokenSymbol} />
			{:else if currentTab === 'history'}
				<FundingCycleHistory />
			{/if}
		</div>
	</div>
</section>

<!-- NOTE: keeping this to add back the Chart at later date -->

<!-- <div style="margin-bottom: 40px;">
		<div>
			<div style="display: flex; justify-content: space-between; align-items: baseline;">
				<div>
					<div class="ant-space ant-space-horizontal ant-space-align-center" style="gap: 24px;">
						<div class="ant-space-item" on:click={() => (tab = 0)}>
							<div
								style="text-transform: uppercase; font-size: 0.8rem; font-weight: {tab === 0
									? 600
									: 400}; color: rgba(0, 0, 0, {tab === 0 ? 0.6 : 0.333}); cursor: pointer;"
							>
								Volume
							</div>
						</div>
						<div class="ant-space-item" on:click={() => (tab = 1)}>
							<div
								style="text-transform: uppercase; font-size: 0.8rem; font-weight: {tab === 1
									? 600
									: 400}; color: rgba(0, 0, 0, {tab === 1 ? 0.6 : 0.333}); cursor: pointer;"
							>
								In Juicebox
							</div>
						</div>
					</div>
				</div>
				<DropDown
					options={['24 HOURS', '7 DAYS', '30 DAYS', '90 DAYS', '1 YEAR']}
					selected="30 DAYS"
				/>
			</div>
			<div style="position: relative;">
				{#if tab === 0}
					<Chart
						width={clientWidth}
						data={Array(100)
							.fill(0)
							.map((_, i) => {
								const date = new Date(i * 86400000);
								return [
									`${date.getMonth() + 1}/${date.getDate()}`,
									Math.random() * i * 0.2 + i * 0.8
								];
							})}
					/>
				{:else if tab === 1}
					<Chart
						width={clientWidth}
						data={Array(100)
							.fill(0)
							.map((_, i) => {
								const date = new Date(i * 86400000);
								return [
									`${date.getMonth() + 1}/${date.getDate()}`,
									Math.random() * i * 0.2 + i * 0.8
								];
							})}
					/>
				{/if}
			</div>
		</div>
	</div> -->
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
	@media (max-width: 750px) {
		section {
			flex: 0 0 100%;
		}
	}
</style>
