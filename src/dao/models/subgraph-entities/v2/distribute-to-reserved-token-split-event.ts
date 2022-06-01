import { BigNumber } from '@ethersproject/bignumber';

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

export interface DistributeToReservedTokenSplitEvent extends BaseEventEntity, BaseProjectEntity {
	tokenCount: BigNumber;
	preferClaimed: boolean;
	percent: number;
	splitProjectId: number;
	beneficiary: string;
	lockedUntil: number;
	allocator: string;
	distributeReservedTokensEvent: string;
}

export type DistributeToReservedTokenSplitEventJson = Partial<
	Record<keyof DistributeToReservedTokenSplitEvent, string> &
		BaseEventEntityJson &
		BaseProjectEntityJson
>;

export const parseDistributeToReservedTokenSplitEventJson = (
	j: DistributeToReservedTokenSplitEventJson
): Partial<DistributeToReservedTokenSplitEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	tokenCount: j.tokenCount ? BigNumber.from(j.tokenCount) : undefined,
	preferClaimed: !!j.preferClaimed,
	percent: j.percent ? parseInt(j.percent) : undefined,
	splitProjectId: j.splitProjectId ? parseInt(j.splitProjectId) : undefined,
	beneficiary: j.beneficiary,
	lockedUntil: j.lockedUntil ? parseInt(j.lockedUntil) : undefined,
	allocator: j.allocator,
	distributeReservedTokensEvent: j.distributeReservedTokensEvent
});
