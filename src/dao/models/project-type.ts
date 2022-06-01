import type { BigNumber } from '@ethersproject/bignumber';
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

	projectId: BigNumber | undefined;
	projectMetadata: ProjectMetadataV4 | undefined;
	tokenAddress: string | undefined;
	tokenSymbol: string | undefined;
	terminals: string[] | undefined; // array of terminal addresses, 0xABC...
	primaryTerminal: string | undefined;
	ETHBalance: BigNumber | undefined;
	projectOwnerAddress: string | undefined;
	balanceInDistributionLimitCurrency: BigNumber | undefined;
	usedDistributionLimit: BigNumber | undefined; // how much has been distributed

	fundingCycleMetadata: V2FundingCycleMetadata | undefined;
	fundingCycle: V2FundingCycle | undefined;
	ballotState: V2BallotState | undefined;

	distributionLimit: BigNumber | undefined;
	distributionLimitCurrency: Currency | undefined;

	payoutSplits: Split[] | undefined;
	reservedTokensSplits: Split[] | undefined;

	primaryTerminalCurrentOverflow: BigNumber | undefined;
	totalTokenSupply: BigNumber | undefined;

	loading: V2ProjectLoadingStates;

	reservedTokenBalance?: BigNumber;
};

export type ProjectType = 'standard' | 'bidpool';
