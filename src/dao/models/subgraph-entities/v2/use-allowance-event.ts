import { BigNumber } from '@ethersproject/bignumber';

import {
	type BaseProjectEntityJson,
	parseBaseProjectEntityJson
} from '$models/subgraph-entities/base/base-project-entity';

import type { BaseProjectEntity } from '$models/subgraph-entities/base/base-project-entity';
import {
	type BaseEventEntity,
	type BaseEventEntityJson,
	parseBaseEventEntityJson
} from '$models/subgraph-entities/base/base-event-entity';

export interface UseAllowanceEvent extends BaseEventEntity, BaseProjectEntity {
	fundingCycleConfiguration: BigNumber;
	fundingCycleNumber: number;
	beneficiary: string;
	amount: BigNumber;
	distributedAmount: BigNumber;
	netDistributedamount: BigNumber;
	memo: string;
}

export type UseAllowanceEventJson = Partial<
	Record<keyof UseAllowanceEvent, string> & BaseEventEntityJson & BaseProjectEntityJson
>;

export const parseUseAllowanceEventJson = (
	j: UseAllowanceEventJson
): Partial<UseAllowanceEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	fundingCycleConfiguration: j.fundingCycleConfiguration
		? BigNumber.from(j.fundingCycleConfiguration)
		: undefined,
	fundingCycleNumber: j.fundingCycleNumber ? parseInt(j.fundingCycleNumber) : undefined,
	beneficiary: j.beneficiary,
	amount: j.amount ? BigNumber.from(j.amount) : undefined,
	distributedAmount: j.distributedAmount ? BigNumber.from(j.distributedAmount) : undefined,
	netDistributedamount: j.netDistributedamount ? BigNumber.from(j.netDistributedamount) : undefined,
	memo: j.memo
});
