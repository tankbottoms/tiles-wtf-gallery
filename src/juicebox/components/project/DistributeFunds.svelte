<script lang="ts">
	import type Store from '$utils/Store';
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import { getContext } from 'svelte';
	import { DistributionLimitType } from '$juicebox/constants';
	import { BigNumber } from 'ethers';
	import {
		amountFromPercentBN,
		getDistributionLimitType,
		getTotalSplitsPercentage
	} from '$juicebox/utils/v2/distributions';
	import ActionModal from '../ActionModal.svelte';
	import Button from '../Button.svelte';
	import Icon from '../Icon.svelte';
	import InfoSpaceBetween from '../InfoSpaceBetween.svelte';
	import Money from '../Money.svelte';
	import SimpleSplits from '../SimpleSplits.svelte';
	import Trans from '../Trans.svelte';
	import Input from '../Input.svelte';
	import OwnerCrown from '../OwnerCrown.svelte';
	import { V2_CURRENCY_USD } from '$juicebox/utils/v2/currency';
	import { getCurrencyConverter } from '$juicebox/data/currency';
	import { formatWad, parseWad } from '$juicebox/utils/formatNumber';
	import { writeContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { bind, openModal } from '../Modal.svelte';
	import PendingTransaction from '../PendingTransaction.svelte';
	import { connectedAccount } from '$stores/web3';
	import EnsOrAddress from '../EnsOrAddress.svelte';

	export let close: () => {};
	let amount: number = 0;

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	const totalSplitPercentagePayoutSplits = getTotalSplitsPercentage($project.payoutSplits || []);
	const distributionLimitType = getDistributionLimitType($project.distributionLimit);

	export let totalFunds: BigNumber; // as formatted value
	$: console.log({ totalFunds, fee: fee });
	$: fee = amountFromPercentBN({ percent: 2.5, amount: totalFunds });
	$: totalAfterFee = totalFunds.sub(fee);

	function getOwnerAmountPayoutSplits(summedSplitsPercent: number) {
		const remainingPercent = 100 - summedSplitsPercent;
		return $project.distributionLimit
			.mul(+remainingPercent.toFixed(2) > 0 ? 1 : +remainingPercent.toFixed(2))
			.div(100);
	}

	function setMax() {
		amount = Number(formatWad(totalAfterFee));
	}

	async function distributeFunds() {
		if (!$project.distributionLimitCurrency?.toNumber() || !amount) return;
		const converter = await getCurrencyConverter();

		const unusedFunds =
			$project.distributionLimit?.sub($project.usedDistributionLimit ?? 0) ?? BigNumber.from(0);
		const distributable = $project.balanceInDistributionLimitCurrency?.gt(unusedFunds)
			? unusedFunds
			: $project.balanceInDistributionLimitCurrency;

		if (!$project.distributionLimitCurrency || !distributable) return;

		const minAmount = (
			BigNumber.from($project.distributionLimitCurrency).eq(V2_CURRENCY_USD)
				? converter.usdToWei(distributable.toString())
				: parseWad(distributable)
		)?.sub(1e12); // Arbitrary value subtracted
		if (!minAmount) return;

		const minReturnedTokens = 0; // TODO will need a field for this in WithdrawModal for v2

		const txnResponse = await writeContract(
			V2ContractName.JBETHPaymentTerminal,
			'distributePayoutsOf',
			[
				$project.projectId,
				parseWad(amount),
				BigNumber.from($project.distributionLimitCurrency).toNumber(),
				ETH_TOKEN_ADDRESS,
				minReturnedTokens,
				'distribute payout'
			]
		);

		openModal(
			bind(PendingTransaction, {
				txnResponse
			})
		);
	}
</script>

<ActionModal title="Distribute funds">
	<div class="breakdown">
		<InfoSpaceBetween>
			<p slot="left">Total funds:</p>
			<p slot="right">
				<Money
					currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
					amount={totalFunds}
					formatWad={true}
				/>
			</p>
		</InfoSpaceBetween>
		<InfoSpaceBetween>
			<p slot="left">JBX Fee (2.5%):</p>
			<p slot="right">
				-<Money
					currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
					amount={fee}
					formatWad={true}
				/>
			</p>
		</InfoSpaceBetween>
		<hr />
		<InfoSpaceBetween>
			<p slot="left"><b>Available after fee:</b></p>
			<p slot="right">
				<b>
					<Money
						currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
						amount={totalAfterFee}
						formatWad={true}
					/>
				</b>
			</p>
		</InfoSpaceBetween>
	</div>

	<Input type="number" bind:value={amount}>
		<div slot="addon" role="button" on:click={setMax}>MAX</div>
	</Input>

	<h4><Trans>Payout recipients</Trans></h4>
	{#each $project.payoutSplits as split}
		<SimpleSplits {split} />
	{/each}
	<InfoSpaceBetween>
		<p slot="left">
			{#if $project.projectOwnerAddress === $connectedAccount}
				(you)
			{:else}
				<EnsOrAddress address={$project.projectOwnerAddress} />
			{/if}
			<span><OwnerCrown translateX={8} translateY={2} />:</span>
		</p>
		<p slot="right">
			{100 - totalSplitPercentagePayoutSplits}%
			{#if distributionLimitType === DistributionLimitType.Specific}
				(<Money
					currency={$project.distributionLimitCurrency ?? BigNumber.from(0)}
					amount={getOwnerAmountPayoutSplits(totalSplitPercentagePayoutSplits)}
					precision={2}
				/>)
			{/if}
		</p>
	</InfoSpaceBetween>
	<p class="info"><Icon name="infoCircle" /> Recipients will receive payouts in ETH.</p>
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button
			type="primary"
			size="md"
			on:click={distributeFunds}
			disabled={!$project.distributionLimitCurrency?.toNumber() || !amount}>Distribute funds</Button
		>
	</div>
</ActionModal>

<style>
	h4 {
		margin-top: 40px;
		color: var(--text-header);
	}

	p.info {
		color: var(--text-secondary);
		font-size: 0.8rem;
	}

	p[slot='left'] {
		display: inline-flex;
		gap: 0;
	}

	div[slot='addon'] {
		cursor: pointer;
		color: var(--text-action-primary);
		text-align: center;
		background: var(--background-action-secondary);
		border-radius: var(--radius-sm);
		padding: 0px 6px;
	}

	.breakdown {
		margin-bottom: 2rem;
	}
	.breakdown p {
		margin: 0;
		font-weight: 300;
	}

	.breakdown hr {
		border-top: 1px solid var(--stroke-secondary);
	}
</style>
