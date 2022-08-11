import { BigNumber } from '@ethersproject/bignumber';
import type { Split } from '$juicebox/models/v2/splits';
import { DistributionLimitType } from '$juicebox/constants';
import { MAX_DISTRIBUTION_LIMIT, SPLITS_TOTAL_PERCENT } from '$juicebox/utils/v2/math';

import { formatSplitPercent } from './math';

/**
 * Gets distribution amount from percent of the distribution limit and then applies
 * the protocol fee
 * @param percent {float} - value as a percentage.
 * @param distributionLimit string (hexString)
 * @param feePercentage string (hexString)
 * @returns {number} distribution amount
 */
export function getDistributionAmountFromPercentAfterFee({
	percent,
	distributionLimit,
	feePercentage
}: {
	percent: number;
	distributionLimit: string;
	feePercentage: string;
}) {
	const amountBeforeFee = amountFromPercent({
		percent,
		amount: distributionLimit
	});

	if (!amountBeforeFee) return;

	return parseFloat(
		(amountBeforeFee - (amountBeforeFee * parseFloat(feePercentage)) / 100).toFixed(4)
	);
}

/**
 * Gets amount from percent of a bigger amount
 * @param percent {float} - value as a percentage.
 * @param amount string (hexString)
 * @returns {number} distribution amount
 */
export function amountFromPercent({ percent, amount }: { percent: number; amount: string }) {
	return parseFloat(((percent / 100) * parseFloat(amount)).toFixed(8));
}

/**
 * Gets amount from percent of a bigger amount
 * @param percent {float} - value as a percentage.
 * @param amount string (hexString)
 * @returns {BigNumber} distribution amount
 */
export function amountFromPercentBN({ percent, amount }: { percent: number; amount: BigNumber }) {
	return BigNumber.from(amount)
		.mul(Math.floor(percent * 1000))
		.div(100_000);
}

/**
 * Gets split percent from split amount and the distribution limit
 * @param percent {float} - value as a percentage.
 * @param distributionLimit string (hexString)
 * @returns {number} percent as an actual percentage of distribution limit (/100)
 */
export function getDistributionPercentFromAmount({
	amount, // Distribution amount before fee
	distributionLimit
}: {
	amount: number;
	distributionLimit: string;
}) {
	if (+distributionLimit === 0) {
		return 100;
	}
	const percentFromAmount = (amount / parseFloat(distributionLimit)) * 100;
	return isNaN(percentFromAmount) ? 0 : percentFromAmount;
}

/**
 * Calculates sum of all split percentages
 * @param splits {Split[]} - list of splits
 * @returns {number} sum of all split percentanges
 */
export function getTotalSplitsPercentage(splits: Split[]) {
	return Math.min(
		100,
		splits.reduce(
			(acc, curr) =>
				acc +
				BigNumber.from(curr.percent)
					.mul(10 ** 12)
					.div(SPLITS_TOTAL_PERCENT)
					.toNumber() /
				10 ** 10,
			0
		)
	);
}

export function getDistributionLimitType(distributionLimit: BigNumber) {
	distributionLimit = distributionLimit || BigNumber.from(0);
	if (distributionLimit.eq(0)) {
		return DistributionLimitType.None;
	}
	if (distributionLimit.eq(MAX_DISTRIBUTION_LIMIT)) {
		return DistributionLimitType.Infinite;
	}
	return DistributionLimitType.Specific;
}
