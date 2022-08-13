import type { BigNumber } from '@ethersproject/bignumber';
import type { V2BallotState } from './ballot';
import type { V2FundingCycle, V2FundingCycleMetadata } from './v2/fundingCycle';
import type { ProjectMetadataV4 } from './project-metadata';
import type { Split } from './v2/splits';
import type { Token } from './v2/tokens';
import type { Vest } from './v2/vests';
import type { ProjectEvent } from './subgraph-entities/vX/project-event';

export type UserTokenBalanceContext = {
	claimedBalance: BigNumber;
	unclaimedBalance: BigNumber;
	totalBalance: BigNumber;
};

type V2ProjectLoadingStates = {
	ETHBalanceLoading: boolean;
	balanceInDistributionLimitCurrencyLoading: boolean;
	distributionLimitLoading: boolean;
	fundingCycleLoading: boolean;
	usedDistributionLimitLoading: boolean;
};

export type V2ProjectContextType = {
	isPreviewMode?: boolean;

	handle: string;

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

	createdAt: number | undefined;
	totalVolume: BigNumber | undefined;

	fundingCycleMetadata: V2FundingCycleMetadata | undefined;
	fundingCycle: V2FundingCycle | undefined;

	queuedFundingCycleMetadata: V2FundingCycleMetadata | undefined;
	queuedFundingCycle: V2FundingCycle | undefined;

	ballotState: V2BallotState | undefined;

	distributionLimit: BigNumber | undefined;
	distributionLimitCurrency: BigNumber | undefined;

	payoutSplits: Split[] | undefined;
	reservedTokensSplits: Split[] | undefined;

	primaryTerminalCurrentOverflow: BigNumber | undefined;
	totalTokenSupply: BigNumber | undefined;

	loading: V2ProjectLoadingStates;

	reservedTokenBalance?: BigNumber;

	hasIssueTicketsPermissions?: Record<string, boolean>;

	tokenWhitelist: Token[];
	vests: Vest[];

	events: ProjectEvent[] | undefined;
};

export type ProjectType = 'standard' | 'bidpool';
