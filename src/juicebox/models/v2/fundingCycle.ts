import type { BigNumber } from '@ethersproject/bignumber';

export type V2FundingCycleData = {
	duration: BigNumber;
	weight: BigNumber;
	discountRate: BigNumber;
	ballot: string; // hex, contract address
};

export type V2FundingCycleMetadataGlobal = {};

export type V2FundingCycleMetadata = {
	global: {
		allowSetController: boolean;
		allowSetTerminals: boolean;
	};
	version?: number;
	reservedRate: BigNumber;
	redemptionRate: BigNumber;
	ballotRedemptionRate: BigNumber;
	pausePay: boolean;
	pauseDistributions: boolean;
	pauseRedeem: boolean;
	pauseBurn: boolean;
	allowMinting: boolean;
	allowChangeToken: boolean;
	allowTerminalMigration: boolean;
	allowControllerMigration: boolean;
	holdFees: boolean;
	useTotalOverflowForRedemptions: boolean;
	useDataSourceForPay: boolean;
	useDataSourceForRedeem: boolean;
	dataSource: string; // hex, contract address
};

export type V2FundAccessConstraint = {
	terminal: string; // address probably
	token: string; // address
	distributionLimit: BigNumber;
	distributionLimitCurrency: BigNumber;
	overflowAllowance: BigNumber;
	overflowAllowanceCurrency: BigNumber;
};

export type V2FundingCycle = V2FundingCycleData & {
	number: BigNumber;
	configuration: BigNumber;
	basedOn: BigNumber;
	start: BigNumber;
	metadata: BigNumber; // encoded FundingCycleMetadata
};
