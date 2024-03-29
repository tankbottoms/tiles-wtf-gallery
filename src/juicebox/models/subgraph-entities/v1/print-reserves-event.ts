import { BigNumber } from '@ethersproject/bignumber';

import { parseProjectJson, type Project, type ProjectJson } from '../vX/project';
import {
	type BaseEventEntity,
	type BaseEventEntityJson,
	parseBaseEventEntityJson
} from '../base/base-event-entity';

export interface PrintReservesEvent extends BaseEventEntity {
	project: Partial<Project>;
	fundingCycleId: BigNumber;
	beneficiary: string;
	count: BigNumber;
	beneficiaryTicketAmount: BigNumber;
}

export type PrintReservesEventJson = Partial<
	Record<Exclude<keyof PrintReservesEvent, 'project'>, string> & {
		project: ProjectJson;
	} & BaseEventEntityJson
>;

export const parsePrintReservesEventJson = (
	j: PrintReservesEventJson
): Partial<PrintReservesEvent> => ({
	...parseBaseEventEntityJson(j),
	project: j.project ? parseProjectJson(j.project) : undefined,
	fundingCycleId: j.fundingCycleId ? BigNumber.from(j.fundingCycleId) : undefined,
	beneficiary: j.beneficiary,
	beneficiaryTicketAmount: j.beneficiaryTicketAmount
		? BigNumber.from(j.beneficiaryTicketAmount)
		: undefined,
	count: j.count ? BigNumber.from(j.count) : undefined
});
