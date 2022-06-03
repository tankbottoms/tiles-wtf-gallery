<script lang="ts">
	import { getContext } from 'svelte';
	import { DistributionLimitType } from '$jbx/constants';
	import { BigNumber } from 'ethers';
	import {
		amountFromPercent,
		getDistributionLimitType,
		getTotalSplitsPercentage
	} from '$jbx/utils/v2/distributions';
	import type Store from '$jbx/utils/Store';
	import ActionModal from '$jbx/components/ActionModal.svelte';
	import Button from '$jbx/components/Button.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import InfoSpaceBetween from '$jbx/components/InfoSpaceBetween.svelte';
	import Money from '$jbx/components/Money.svelte';
	import SimpleSplits from '$jbx/components/SimpleSplits.svelte';
	import Trans from '$jbx/components/Trans.svelte';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import Input from '$jbx/components/Input.svelte';
	import OwnerCrown from '$jbx/components/OwnerCrown.svelte';
	import { V2_CURRENCY_USD } from '$jbx/utils/v2/currency';
	import { getCurrencyConverter, getWeiConverter } from '$jbx/data/currency';
	import { formatWad, parseWad } from '$jbx/utils/formatNumber';
	import { writeContract } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import { ETH_TOKEN_ADDRESS } from '$jbx/constants/v2/juiceboxTokens';
	import { bind, openModal } from '$jbx/components/Modal.svelte';
	import PendingTransaction from '$jbx/components/PendingTransaction.svelte';
	import { connectedAccount, web3Connect } from '$stores/web3';
	import { getTruncatedAddress } from '$jbx/components/Address.svelte';

	export let close: () => {};
	let amount: number;

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;

	const totalSplitPercentagePayoutSplits = getTotalSplitsPercentage($project.payoutSplits || []);
	const distributionLimitType = getDistributionLimitType($project.distributionLimit);

	export let totalFunds: BigNumber; // as formatted value
	const fee = amountFromPercent({ percent: 2.5, amount: totalFunds.toString() });
	const totalAfterFee = parseFloat(totalFunds.toString()) - fee;

	function getOwnerAmountPayoutSplits(summedSplitsPercent: number) {
		const remainingPercent = 100 - summedSplitsPercent;
		return $project.distributionLimit.mul(remainingPercent).div(100);
	}

	function setMax() {
		amount = Number(formatWad(totalAfterFee));
	}

	async function distributeFunds() {
		await web3Connect();
		const converter = getCurrencyConverter();

		const unusedFunds = $project.distributionLimit?.sub($project.usedDistributionLimit ?? 0) ?? 0;
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
					currency={$project.distributionLimitCurrency}
					amount={BigNumber.from(totalFunds)}
					formatWad={true}
				/>
			</p>
		</InfoSpaceBetween>
		<InfoSpaceBetween>
			<p slot="left">JBX Fee (2.5%):</p>
			<p slot="right">
				-<Money currency={$project.distributionLimitCurrency} amount={fee} formatWad={true} />
			</p>
		</InfoSpaceBetween>
		<hr />
		<!-- <div class="total"> -->
		<InfoSpaceBetween>
			<p slot="left"><b>Available after fee:</b></p>
			<p slot="right">
				<b>
					<Money
						currency={$project.distributionLimitCurrency}
						amount={totalAfterFee}
						formatWad={true}
					/>
				</b>
			</p>
		</InfoSpaceBetween>
		<!-- </div> -->
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
			{$project.projectOwnerAddress === $connectedAccount
				? '(you)'
				: getTruncatedAddress($project.projectOwnerAddress)}
			<OwnerCrown />:
		</p>
		<p slot="right">
			{100 - totalSplitPercentagePayoutSplits}%
			{#if distributionLimitType === DistributionLimitType.Specific}
				(<Money
					currency={$project.distributionLimitCurrency}
					amount={getOwnerAmountPayoutSplits(totalSplitPercentagePayoutSplits)}
					precision={2}
				/>)
			{/if}
		</p>
	</InfoSpaceBetween>
	<p class="info"><Icon name="infoCircle" /> Recipients will receive payouts in ETH.</p>
	<div slot="footer">
		<Button type="secondary" size="md" on:click={close}>Close</Button>
		<Button type="primary" size="md" on:click={distributeFunds}
			>Distribute {$project.tokenSymbol || 'tokens'}</Button
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

	div[slot='addon'] {
		cursor: pointer;
		color: var(--text-action-primary);
		text-align: center;
		background: var(--background-action-secondary);
		border-radius: var(--radius-sm);
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
