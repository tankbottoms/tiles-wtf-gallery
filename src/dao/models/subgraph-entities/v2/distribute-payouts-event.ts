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
import {
	type DistributeToPayoutSplitEvent,
	type DistributeToPayoutSplitEventJson,
	parseDistributeToPayoutSplitEventJson
} from './distribute-to-payout-split-event';

export interface DistributePayoutsEvent extends BaseEventEntity, BaseProjectEntity {
	fundingCycleConfiguration: BigNumber;
	fundingCycleNumber: number;
	beneficiary: string;
	amount: BigNumber;
	distributedAmount: BigNumber;
	fee: BigNumber;
	beneficiaryDistributionAmount: BigNumber;
	memo: string;
	splitDistributions: Partial<DistributeToPayoutSplitEvent>[];
}

export type DistributePayoutsEventJson = Partial<
	Record<keyof Omit<DistributePayoutsEvent, 'splitDistributions'>, string> &
		BaseEventEntityJson &
		BaseProjectEntityJson
> & {
	splitDistributions: DistributeToPayoutSplitEventJson[];
};

export const parseDistributePayoutsEventJson = (
	j: DistributePayoutsEventJson
): Partial<DistributePayoutsEvent> => ({
	...parseBaseEventEntityJson(j),
	...parseBaseProjectEntityJson(j),
	fundingCycleConfiguration: j.fundingCycleConfiguration
		? BigNumber.from(j.fundingCycleConfiguration)
		: undefined,
	fundingCycleNumber: j.fundingCycleNumber ? parseInt(j.fundingCycleNumber) : undefined,
	beneficiary: j.beneficiary,
	amount: j.amount ? BigNumber.from(j.amount) : undefined,
	distributedAmount: j.distributedAmount ? BigNumber.from(j.distributedAmount) : undefined,
	beneficiaryDistributionAmount: j.distributedAmount
		? BigNumber.from(j.distributedAmount)
		: undefined,
	fee: j.fee ? BigNumber.from(j.fee) : undefined,
	memo: j.memo,
	splitDistributions: j.splitDistributions
		? j.splitDistributions.map(parseDistributeToPayoutSplitEventJson)
		: undefined
});
