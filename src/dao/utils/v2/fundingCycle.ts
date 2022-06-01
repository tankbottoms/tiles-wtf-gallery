import { BigNumber, utils, constants } from 'ethers';

import {
	FUNDING_CYCLE_WARNING_TEXT,
	RESERVED_RATE_WARNING_THRESHOLD_PERCENT
} from '$constants/fundingWarningText';
import type {
	V2FundingCycle,
	V2FundingCycleMetadata,
	V2FundingCycleMetadataGlobal
} from '$models/v2/fundingCycle';
import { formatDate } from '$utils/formatDate';
import { formattedNum, formatWad } from '$utils/formatNumber';
import { detailedTimeString } from '$utils/formatTime';
import {
	formatDiscountRate,
	formatRedemptionRate,
	formatReservedRate,
	MAX_DISTRIBUTION_LIMIT,
	weightedAmount
} from '$utils/v2/math';

import { invertPermyriad } from '$utils/bigNumbers';
import unsafeFundingCycleProperties from '$utils/unsafeFundingCycleProperties';

import { fromWad, parseWad } from '../formatNumber';

import type { SerializedV2FundAccessConstraint, SerializedV2FundingCycleData } from './serializers';
import type { FundingCycleRiskFlags } from '$constants/fundingWarningText';
import { getBallotStrategyByAddress } from '$constants/v2/ballotStrategies/getBallotStrategiesByAddress';

export const hasDistributionLimit = (
	fundAccessConstraint: SerializedV2FundAccessConstraint | undefined
): boolean => {
	return Boolean(
		fundAccessConstraint?.distributionLimit &&
			!parseWad(fundAccessConstraint.distributionLimit).eq(MAX_DISTRIBUTION_LIMIT)
	);
};

export const hasFundingDuration = (fundingCycle: Pick<SerializedV2FundingCycleData, 'duration'>) =>
	Boolean(fundingCycle?.duration && fundingCycle?.duration !== '0');

/**
 * Return the default fund access constraint for a project.
 *
 * Projects can have multiple access constraints. This frontend creates one for them,
 * using the default ETH payment terminal.
 */
export function getDefaultFundAccessConstraint<T>(fundAccessConstraints: T[]): T | undefined {
	return fundAccessConstraints[0];
}

/**
 * | flags (1 bit each) | ballot redemption rate (16 bits) | redemption rate (16 bits) | reserved rate (16 bits) |     global (16 bits)    | version (8 bits)  |
 * |         p          |        bbbbbbbbbbbbbbbb          |    RRRRRRRRRRRRRRRR       |     rrrrrrrrrrrrrrrr    |     00000000000000tt    |     VVVVVVVV      |
 */

const bits16 = 0b1111111111111111;
const bits8 = 0b11111111;
const bits1 = 0b1;

const bigNumberToBoolean = (val: BigNumber) => Boolean(val.toNumber());

const parameters: {
	name: keyof V2FundingCycleMetadata;
	bits: 0 | 1 | 8 | 16;
	parser?: (
		val: BigNumber
	) => string | boolean | BigNumber | number | undefined | V2FundingCycleMetadataGlobal;
}[] = [
	{
		name: 'version',
		bits: 8,
		parser: (val: BigNumber) => val.toNumber() as V2FundingCycleMetadata['version']
	},
	{
		name: 'global',
		bits: 16,
		parser: (val) => {
			return {
				allowSetTerminals: bigNumberToBoolean(BigNumber.from(val).shr(1)),
				allowSetController: bigNumberToBoolean(BigNumber.from(val).shr(2))
			};
		}
	},
	{ name: 'reservedRate', bits: 16 },
	{ name: 'redemptionRate', bits: 16, parser: invertPermyriad },
	{ name: 'ballotRedemptionRate', bits: 16, parser: invertPermyriad },
	{ name: 'pausePay', bits: 1, parser: bigNumberToBoolean },
	{
		name: 'pauseDistributions',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{ name: 'pauseRedeem', bits: 1, parser: bigNumberToBoolean },
	{ name: 'pauseBurn', bits: 1, parser: bigNumberToBoolean },
	{ name: 'allowMinting', bits: 1, parser: bigNumberToBoolean },
	{ name: 'allowChangeToken', bits: 1, parser: bigNumberToBoolean },
	{
		name: 'allowTerminalMigration',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{
		name: 'allowControllerMigration',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{ name: 'holdFees', bits: 1, parser: bigNumberToBoolean },
	{
		name: 'useTotalOverflowForRedemptions',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{
		name: 'useDataSourceForPay',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{
		name: 'useDataSourceForRedeem',
		bits: 1,
		parser: bigNumberToBoolean
	},
	{
		name: 'dataSource',
		bits: 0,
		parser: (val) => {
			const dataSource = val.toHexString();
			return dataSource === BigNumber.from('0').toHexString()
				? constants.AddressZero
				: utils.getAddress(dataSource);
		}
	}
];

export const decodeV2FundingCycleMetadata = (packedMetadata: BigNumber): V2FundingCycleMetadata => {
	const metadata = parameters.reduce((metadata, parameter, i) => {
		// 1. Get the bits used by the parameter.
		const bits =
			parameter.bits === 16
				? bits16
				: parameter.bits === 8
				? bits8
				: parameter.bits === 1
				? bits1
				: 0;

		// 2. Get the amount of bits to shift right by.
		const shiftRightBits =
			i === 0 ? 0 : parameters.slice(0, i).reduce((acc, p) => (acc += p.bits), 0);

		// 3. Get the value of the parameter from the bits
		let value;
		if (bits === 0) {
			value = packedMetadata.shr(shiftRightBits);
		} else {
			value = packedMetadata.shr(shiftRightBits).and(bits);
		}

		return {
			...metadata,
			...{
				[parameter.name]: parameter.parser?.(value) ?? value
			}
		};
	}, {}) as V2FundingCycleMetadata;

	return metadata;
};

/**
 * Mark various funding cycle properties as "unsafe",
 * based on a subjective interpretation.
 *
 * If a value in the returned object is true, it is potentially unsafe.
 */
export const getUnsafeV2FundingCycleProperties = (
	fundingCycle: V2FundingCycle,
	fundingCycleMetadata: V2FundingCycleMetadata = undefined
): FundingCycleRiskFlags => {
	const metadata = fundingCycleMetadata
		? fundingCycleMetadata
		: decodeV2FundingCycleMetadata(fundingCycle.metadata);
	const ballotAddress = getBallotStrategyByAddress(fundingCycle.ballot).address;
	const reservedRatePercentage = fundingCycleMetadata
		? parseFloat(formatReservedRate(metadata?.reservedRate))
		: parseFloat(fromWad(metadata?.reservedRate));
	const allowMinting = Boolean(metadata?.allowMinting);

	return unsafeFundingCycleProperties({
		ballotAddress,
		reservedRatePercentage,
		hasFundingDuration: fundingCycle.duration?.gt(0),
		allowMinting
	});
};

/**
 * Return number of risk indicators for a funding cycle.
 * 0 if we deem a project "safe" to contribute to.
 */
export const V2FundingCycleRiskCount = (
	fundingCycle: V2FundingCycle,
	fundingCycleMetadata: V2FundingCycleMetadata = undefined
): number => {
	const unsafeProperties = getUnsafeV2FundingCycleProperties(fundingCycle, fundingCycleMetadata);
	return Object.values(unsafeProperties).filter((v) => v === true).length;
};

const reservedRateText = (fundingCycle, fundingCycleMetadata, symbol: string = 'tokens') => {
	const payerRate = formatWad(
		weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata?.reservedRate.toNumber(),
			utils.parseEther('1'),
			'payer'
		),
		{
			precision: 0
		}
	);
	const reservedRate = formatWad(
		weightedAmount(
			fundingCycle?.weight,
			fundingCycleMetadata?.reservedRate.toNumber(),
			utils.parseEther('1'),
			'reserved'
		),
		{
			precision: 0
		}
	);
	const withReservedRate = `${formattedNum(payerRate)} (+ ${formattedNum(
		reservedRate
	)} reserved) ${symbol}/ETH`;
	const withoutReservedRate = `${formattedNum(payerRate)} ${symbol}/ETH`;
	return BigNumber.from(fundingCycleMetadata?.reservedRate).gt(0)
		? withReservedRate
		: withoutReservedRate;
};

function getDurationText(seconds: BigNumber) {
	if (!seconds.gt(0)) {
		return 'Not set';
	}
	return detailedTimeString({
		timeSeconds: seconds.toNumber()
	});
}

/**
 * Get funding cycle details list provided a funding cycle
 * NOTE that the Distribution Limit is not returned by this function
 */
export function getFundingCycleDetails(
	fundingCycle: V2FundingCycle,
	fundingCycleMetadata: V2FundingCycleMetadata,
	symbol: string
) {
	const fundingCycleRiskProperties = getUnsafeV2FundingCycleProperties(
		fundingCycle,
		fundingCycleMetadata
	);
	const durationSet = fundingCycle.duration.gt(0);
	const riskWarningText = FUNDING_CYCLE_WARNING_TEXT();
	const formattedReservedRate = formatReservedRate(fundingCycleMetadata.reservedRate);

	return [
		{
			id: 'duration',
			label: 'Duration',
			value: getDurationText(fundingCycle.duration),
			issue: fundingCycleRiskProperties.duration,
			issueText: riskWarningText.duration
		},
		durationSet && {
			id: 'start',
			label: 'Start',
			value: formatDate(fundingCycle.start.mul(1000))
		},
		durationSet && {
			id: 'end',
			label: 'End',
			value: formatDate(fundingCycle.start.add(fundingCycle.duration).mul(1000))
		},
		fundingCycle.discountRate && {
			id: 'discountRate',
			label: 'Discount rate',
			value: `${formatDiscountRate(fundingCycle.discountRate)}%`,
			info: 'The ratio of tokens rewarded per payment amount will decrease by this percentage with each new funding cycle. A higher discount rate will incentivize supporters to pay your project earlier than later.'
		},
		fundingCycleMetadata.redemptionRate && {
			id: 'redemptionRate',
			label: 'Redemption rate',
			value: `${formatRedemptionRate(fundingCycleMetadata.redemptionRate)}%`,
			info: 'This rate determines the amount of overflow that each token can be redeemed for at any given time. On a lower bonding curve, redeeming a token increases the value of each remaining token, creating an incentive to hold tokens longer than others. A redemption rate of 100% means all tokens will have equal value regardless of when they are redeemed.'
		},
		fundingCycleMetadata.reservedRate && {
			id: 'reservedRate',
			label: 'Reserved tokens',
			value: `${formattedReservedRate}%`,
			info: 'Whenever someone pays your project, this percentage of tokens will be reserved and the rest will go to the payer. Reserve tokens are reserved for the project owner by default, but can also be allocated to other wallet addresses by the owner. Once tokens are reserved, anyone can "mint" them, which distributes them to their intended receivers.',
			issue:
				fundingCycleRiskProperties.metadataReservedRate ||
				fundingCycleRiskProperties.metadataMaxReservedRate,
			issueText:
				(fundingCycleRiskProperties.metadataReservedRate && riskWarningText.metadataReservedRate) ||
				riskWarningText.metadataMaxReservedRate
		},
		{
			id: 'issuanceRate',
			label: 'Issuance rate',
			value: reservedRateText(fundingCycle, fundingCycleMetadata, symbol),
			info: 'Tokens received per ETH paid to the treasury. This can change over time according to the discount rate and reserved tokens amount of future funding cycles.'
		},
		{
			id: 'payments',
			label: 'Payments',
			value: fundingCycleMetadata.pausePay ? 'Paused' : 'Enabled'
		},
		{
			id: 'allowMinting',
			label: 'Token minting',
			value: fundingCycleMetadata.allowMinting ? 'Enabled' : 'Disabled',
			issue: fundingCycleRiskProperties.allowMinting,
			issueText: riskWarningText.allowMinting,
			info: 'Token minting allows the project owner to mint project tokens at any time.'
		},
		{
			id: 'configuration',
			label: 'Reconfiguration strategy',
			value: getBallotStrategyByAddress(fundingCycle.ballot).name,
			info: 'Rules for determining how funding cycles can be reconfigured.',
			issue: fundingCycleRiskProperties.ballot,
			issueText: riskWarningText.ballot
		}
	].filter((item) => Boolean(item));
}
