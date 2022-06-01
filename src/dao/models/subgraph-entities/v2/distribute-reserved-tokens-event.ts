import { BigNumber } from '@ethersproject/bignumber';
import { parseDistributeToReservedTokenSplitEventJson } from '$models/subgraph-entities/v2/distribute-to-reserved-token-split-event';

import {
	type BaseEventEntity,
	type BaseEventEntityJson,
	parseBaseEventEntityJson
} from '$models/subgraph-entities/base/base-event-entity';
import {
	type BaseProjectEntity,
	type BaseProjectEntityJson,
	parseBaseProjectEntityJson
} from '$models/subgraph-entities/base/base-project-entity';
import type {
	DistributeToReservedTokenSplitEvent,
	DistributeToReservedTokenSplitEventJson
} from './distribute-to-reserved-token-split-event';

export interface DistributeReservedTokensEvent extends BaseEventEntity, BaseProjectEntity {
	fundingCycleNumber: number;
	beneficiary: string;
	tokenCount: BigNumber;
	beneficiaryTokenCount: BigNumber;
	memo: string;
	splitDistributions: Partial<DistributeToReservedTokenSplitEvent>[];
}

export type DistributeReservedTokensEventJson = Partial<
	Record<keyof Omit<DistributeReservedTokensEvent, 'splitDistributions'>, string> &
		BaseEventEntityJson &
		BaseProjectEntityJson
> & {
	splitDistributions: DistributeToReservedTokenSplitEventJson[];
};

export const parseDistributeReservedTokensEventJson = (
	j: DistributeReservedTokensEventJson
): Partial<DistributeReservedTokensEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	fundingCycleNumber: j.fundingCycleNumber ? parseInt(j.fundingCycleNumber) : undefined,
	beneficiary: j.beneficiary,
	tokenCount: j.tokenCount ? BigNumber.from(j.tokenCount) : undefined,
	beneficiaryTokenCount: j.beneficiaryTokenCount
		? BigNumber.from(j.beneficiaryTokenCount)
		: undefined,
	memo: j.memo,
	splitDistributions: j.splitDistributions
		? j.splitDistributions.map(parseDistributeToReservedTokenSplitEventJson)
		: undefined
});
