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

export interface RedeemEvent extends BaseProjectEntity, BaseEventEntity {
	id: string;
	holder: string;
	beneficiary: string;
	amount: BigNumber;
	returnAmount: BigNumber;
	caller: string;
}

export type RedeemEventJson = Partial<
	Record<keyof RedeemEvent, string> & BaseProjectEntityJson & BaseEventEntityJson
>;

export const parseRedeemEventJson = (j: RedeemEventJson): Partial<RedeemEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	id: j.id,
	holder: j.holder,
	beneficiary: j.beneficiary,
	amount: j.amount ? BigNumber.from(j.amount) : undefined,
	returnAmount: j.returnAmount ? BigNumber.from(j.returnAmount) : undefined,
	caller: j.caller
});
