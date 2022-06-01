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

export interface PayEvent extends BaseProjectEntity, BaseEventEntity {
	fundingCycleId: BigNumber;
	beneficiary: string;
	amount: BigNumber;
	note: string;
}

export type PayEventJson = Partial<
	Record<keyof PayEvent, string> & BaseProjectEntityJson & BaseEventEntityJson
>;

export const parsePayEventJson = (j: PayEventJson): Partial<PayEvent> => ({
	...parseBaseProjectEntityJson(j),
	...parseBaseEventEntityJson(j),
	fundingCycleId: j.fundingCycleId ? BigNumber.from(j.fundingCycleId) : undefined,
	beneficiary: j.beneficiary,
	amount: j.amount ? BigNumber.from(j.amount) : undefined,
	note: j.note
});
