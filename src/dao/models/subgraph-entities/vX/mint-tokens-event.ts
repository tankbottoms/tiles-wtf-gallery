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

export interface MintTokensEvent extends BaseEventEntity, BaseProjectEntity {
	beneficiary: string;
	amount: BigNumber;
	memo: string;
}

export type MintTokensEventJson = Partial<
	Record<keyof MintTokensEvent, string> & BaseEventEntityJson & BaseProjectEntityJson
>;

export const parseMintTokensEventJson = (j: MintTokensEventJson): Partial<MintTokensEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	beneficiary: j.beneficiary,
	amount: j.amount ? BigNumber.from(j.amount) : undefined,
	memo: j.memo
});
