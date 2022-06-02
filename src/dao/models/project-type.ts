import type { BigNumber } from 'ethers';
import type { V2BallotState } from '$models/ballot';
import type { V2FundingCycle, V2FundingCycleMetadata } from '$models/v2/fundingCycle';
import type { ProjectMetadataV4 } from '$models/project-metadata';
import type { Split } from '$models/v2/splits';
import type { Currency } from '$constants';

type V2ProjectLoadingStates = {
	ETHBalanceLoading: boolean;
	balanceInDistributionLimitCurrencyLoading: boolean;
	distributionLimitLoading: boolean;
	fundingCycleLoading: boolean;
	usedDistributionLimitLoading: boolean;
};

export type V2ProjectContextType = {
	isPreviewMode?: boolean;

	projectId: BigNumber;
	projectMetadata: ProjectMetadataV4;
	tokenAddress: string;
	tokenSymbol: string;
	terminals: string[]; // array of terminal addresses, 0xABC...
	primaryTerminal: string;
	ETHBalance: BigNumber;
	projectOwnerAddress: string;
	balanceInDistributionLimitCurrency: BigNumber;
	usedDistributionLimit: BigNumber; // how much has been distributed

	fundingCycleMetadata: V2FundingCycleMetadata;
	fundingCycle: V2FundingCycle;
	ballotState: V2BallotState;

	distributionLimit: BigNumber;
	distributionLimitCurrency: Currency;

	payoutSplits: Split[];
	reservedTokensSplits: Split[];

	primaryTerminalCurrentOverflow: BigNumber;
	totalTokenSupply: BigNumber;

	loading: V2ProjectLoadingStates;

	reservedTokenBalance?: BigNumber;
};

export type ProjectType = 'standard' | 'bidpool';
