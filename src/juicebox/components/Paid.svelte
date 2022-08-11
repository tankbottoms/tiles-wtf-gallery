<script lang="ts">
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import type Store from '$utils/Store';
	import { getContext } from 'svelte';
	import { DistributionLimitType } from '$juicebox/constants';
	import { getEthBalance } from '$juicebox/data/eth';
	import Icon from './Icon.svelte';
	import InfoSpaceBetween from './InfoSpaceBetween.svelte';
	import Popover from './Popover.svelte';
	import ETHAmount from './ETHAmount.svelte';
	import USDAmount from './USDAmount.svelte';
	import Trans from './Trans.svelte';
	import EtherscanLink from './EtherscanLink.svelte';
	import { bind, openModal } from './Modal.svelte';
	import Pay from './Pay.svelte';
	import PayHeadsUp from './PayHeadsUp.svelte';
	import PayCheckout from './PayCheckout.svelte';
	import { weightedAmount } from '$juicebox/utils/v2/math';
	import { BigNumber } from 'ethers';
	import { getDistributionLimitType } from '$juicebox/utils/v2/distributions';
	import { NO_CURRENCY, V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import FundingProgressBar from './FundingProgressBar.svelte';
	import AssetsModal from './AssetsModal.svelte';
	import { copyToClipboard } from '$juicebox/utils/clipboard';
	import { ethPrice } from '$stores/web3';
	import { parseWad } from '$juicebox/utils/formatNumber';

	const projectsContext = getContext('PROJECT') as Store<V2ProjectContextType>;

	$: currentFC = $projectsContext.fundingCycle;
	$: fcMetadata = $projectsContext.fundingCycleMetadata;
	$: balanceInCurrency = $projectsContext.balanceInDistributionLimitCurrency || BigNumber.from(0);
	$: balance = $projectsContext.ETHBalance || BigNumber.from(0);
	$: owner = $projectsContext.projectOwnerAddress;
	$: metadata = $projectsContext.projectMetadata;
	$: tokenSymbol = $projectsContext.tokenSymbol;
	$: totalVolume = $projectsContext.totalVolume;

	$: ownerBalance = owner ? getEthBalance(owner) : BigNumber.from(0);

	const distributionLimitType = getDistributionLimitType($projectsContext.distributionLimit);

	async function payTreasury(weiAmount: BigNumber) {
		// TODO contract
		openModal(
			bind(PayCheckout, {
				weiAmount
			})
		);
		// setTimeout(() => {
		// 	console.warn('🛠 TODO payTreasury');
		// }, 300);
	}

	// TODO: mocked, consolidate all mocks in data/mocks, get gnosis info
	const gnosisInfo = null;

	/*
	const gnosisInfo = {
		required: 2,
		owners: [
			'0x48E1Fd1a907943daF94e324eDA70CA1920B6bb49',
			'0x1DD2091f250876Ba87B6fE17e6ca925e1B1c0CF0',
			'DA70CA1920B6bb490x48E1Fd1a907943daF94e324e',
			'907943daF940x48E1Fd1ae324eDA70CA1920B6bb49'
		]
	};
	*/
</script>

{#if !currentFC}
	<div />
{/if}

<section>
	<div class="stats">
		<InfoSpaceBetween>
			<div slot="left">
				<h4>Volume</h4>
				<Popover placement="right" message="The balance of this project in the Juicebox contract.">
					<Icon name="questionCircle" />
				</Popover>
			</div>
			<div slot="right">
				<!-- {#if [V2_CURRENCY_ETH, NO_CURRENCY].includes(BigNumber.from($projectsContext?.distributionLimitCurrency).toNumber())} -->
				<span class="amount">
					<ETHAmount
						amount={totalVolume || BigNumber.from(0)}
						precision={(totalVolume || BigNumber.from(0)).lt(parseWad(10)) ? 4 : 2}
					/>
				</span>
				<!-- {:else}
					<span class="amount-sub">
						<ETHAmount amount={balance || BigNumber.from(0)} precision={2} padEnd />
					</span>
					<h4 class="amount">
						<USDAmount amount={totalVolume || BigNumber.from(0)} precision={2} padEnd />
					</h4>
				{/if} -->
			</div>
		</InfoSpaceBetween>
		<div class="treasury-wrapper">
			<InfoSpaceBetween>
				<div slot="left">
					<h4>In Treasury</h4>
					<Popover
						placement="right"
						message="The balance of this project in the Juicebox contract."
					>
						<Icon name="questionCircle" />
					</Popover>
				</div>
				<div slot="right">
					<div class="amount">
						<h4 class="amount-main" style="display: flex; gap: 0.5rem;">
							{#if [V2_CURRENCY_ETH, NO_CURRENCY].includes(BigNumber.from($projectsContext?.distributionLimitCurrency || V2_CURRENCY_ETH).toNumber())}
								<p>
									<ETHAmount amount={balanceInCurrency.div($ethPrice)} precision={2} padEnd />
								</p>
							{:else}
								<!-- <p>
									{$ethPrice}
									<ETHAmount amount={balanceInCurrency} precision={2} padEnd />
								</p> -->
								<p>
									<USDAmount amount={balanceInCurrency} precision={2} padEnd />
								</p>
							{/if}
						</h4>
					</div>
				</div>
			</InfoSpaceBetween>
			<InfoSpaceBetween>
				<div slot="left">
					<h4><Trans>Distributed</Trans></h4>
					<Popover
						placement="right"
						message="The amount that has been distributed from the Juicebox balance
            in this funding cycle, out of the current funding target. No
            more than the funding target can be distributed in a single
            funding cycle—any remaining ETH in Juicebox is overflow, until
            the next cycle begins."
					>
						<Icon name="questionCircle" />
					</Popover>
				</div>

				<div slot="right">
					<Popover
						slot="right"
						message="The target for this funding cycle is 0, meaning all funds in Juicebox are currently
	considered overflow. Overflow can be redeemed by token holders, but not distributed."
					>
						{#if distributionLimitType === DistributionLimitType.Specific}
							{#if [V2_CURRENCY_ETH, NO_CURRENCY].includes(BigNumber.from($projectsContext?.distributionLimitCurrency).toNumber())}
								<ETHAmount amount={$projectsContext.usedDistributionLimit} precision={2} padEnd /> /
								<ETHAmount amount={$projectsContext.distributionLimit} precision={2} padEnd />
							{:else}
								<USDAmount amount={$projectsContext.usedDistributionLimit} precision={2} padEnd /> /
								<USDAmount amount={$projectsContext.distributionLimit} precision={2} padEnd />
							{/if}
						{:else if distributionLimitType === DistributionLimitType.None}
							<Trans>100% overflow</Trans>
						{:else if [V2_CURRENCY_ETH, NO_CURRENCY].includes(BigNumber.from($projectsContext?.distributionLimitCurrency).toNumber())}
							<ETHAmount amount={$projectsContext.usedDistributionLimit} />/ NO LIMIT
						{:else}
							<USDAmount amount={$projectsContext.usedDistributionLimit} />/ NO LIMIT
						{/if}
					</Popover>
				</div>
			</InfoSpaceBetween>
			<!-- TODO: check when the progress bar should be shown. jb.money seems to check if distributionLimit, but looking at ui seems like no progress bar on infinite -->
			{#if $projectsContext.distributionLimit}
				<FundingProgressBar
					targetAmount={$projectsContext.distributionLimit}
					balanceInTargetCurrency={balanceInCurrency}
					overflowAmountInTargetCurrency={$projectsContext.primaryTerminalCurrentOverflow}
				/>
			{/if}
		</div>
		<InfoSpaceBetween>
			<div slot="left" />
			<div slot="right" />
		</InfoSpaceBetween>

		<InfoSpaceBetween>
			<div slot="left">
				<h4><Trans>In wallet</Trans></h4>
				<Popover placement="right">
					<div slot="content">
						<p>The balance of the project owner's wallet.</p>
						<p>
							<EtherscanLink value={owner} type="address" truncated showTooltip={false} />
						</p>
						{#if gnosisInfo}
							<Popover placement="bottom" maxWidth="332px">
								<div slot="content">
									<p>The following addresses are signers for this Gnosis safe:</p>
									{#each gnosisInfo.owners as address}
										<p class="gnosis-address">
											{address}
											<span class="icon" on:click={() => copyToClipboard(address)}>
												<Icon name="copy" />
											</span>
										</p>
									{/each}
									<span
										>This Gnosis requires {gnosisInfo.required} out of {gnosisInfo.owners.length} owners
										for confirmation.</span
									>
								</div>
								<Icon name="gnosis" />
							</Popover>
						{/if}
					</div>
					<Icon name="questionCircle" />
				</Popover>
			</div>
			<div slot="right">
				{#await ownerBalance}
					<p>...loading</p>
				{:then amount}
					<div class="amount-owner">
						<ETHAmount {amount} precision={2} padEnd={true} />
					</div>
				{/await}
			</div>
		</InfoSpaceBetween>

		<div style="text-align: right;" on:click={() => openModal(bind(AssetsModal, {}))}>
			<span
				style="text-transform: uppercase; color: var(--text-secondary); font-size: 0.8rem; font-weight: 500; cursor: pointer;"
			>
				All assets
				<span role="img" aria-label="right-circle" class="anticon anticon-right-circle">
					<svg
						viewBox="64 64 896 896"
						focusable="false"
						data-icon="right-circle"
						width="1em"
						height="1em"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M666.7 505.5l-246-178A8 8 0 00408 334v46.9c0 10.2 4.9 19.9 13.2 25.9L566.6 512 421.2 617.2c-8.3 6-13.2 15.6-13.2 25.9V690c0 6.5 7.4 10.3 12.7 6.5l246-178c4.4-3.2 4.4-9.8 0-13z"
						/><path
							d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
						/></svg
					>
				</span>
			</span>
		</div>
	</div>
	<div class="payment">
		<Pay
			onClick={(weiAmount) => openModal(bind(PayHeadsUp, { click: () => payTreasury(weiAmount) }))}
			payButton={metadata.payButton}
			reservedRate={fcMetadata.reservedRate.toNumber()}
			token={tokenSymbol}
			weight={currentFC?.weight}
			weightingFn={weightedAmount}
			disabled={!$projectsContext.fundingCycle?.number?.gt(0)}
		/>
	</div>
</section>

<style>
	section {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: 10px;
	}

	.stats,
	.payment {
		flex: 0 0 48%;
	}
	.stats {
		margin-top: 40px;
	}
	div[slot='left'],
	div[slot='right'] {
		display: flex;
		align-items: baseline;
		gap: 5px;
		text-transform: uppercase;
	}

	div[slot='left'] h4 {
		color: var(--text-tertiary);
		margin-bottom: 0px;
		font-size: 0.8rem;
	}

	div[slot='left'] :global(.antd) {
		padding-top: 2px;
		width: 0.8rem;
		height: 0.8rem;
	}

	div[slot='content'] p {
		font-size: 11px;
		font-weight: 300;
		text-transform: none;
		margin-bottom: 8px;
	}
	div[slot='content'] span {
		font-size: 11px;
		font-weight: 300;
		text-transform: none;
	}

	:global(div[slot='content'] a) {
		font-weight: 300;
		color: var(--text-primary);
	}

	:global(div[slot='content'] a:hover) {
		font-weight: 300;
		color: var(--text-action-primary);
		text-decoration: underline;
	}

	.treasury-wrapper {
		margin-top: 15px;
	}
	.amount {
		color: var(--text-secodary);
		font-size: 1.1rem;
		font-weight: 500;
		line-height: 1;
	}

	.amount-main {
		color: var(--text-header);
		font-size: 1rem;
		display: inline;
	}

	.amount-owner {
		font-size: 1rem;
	}

	.gnosis-address {
		display: flex;
		gap: 8px;
		margin-bottom: 4px !important;
	}
	.icon {
		cursor: pointer;
	}

	@media (max-width: 850px) {
		.stats,
		.payment {
			flex: 0 0 100%;
		}
	}
</style>
