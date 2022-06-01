import { BigNumber } from '@ethersproject/bignumber';
import {
	parseProjectJson,
	type Project,
	type ProjectJson
} from '$models/subgraph-entities/vX/project';

import {
	type BaseEventEntity,
	type BaseEventEntityJson,
	parseBaseEventEntityJson
} from '$models/subgraph-entities/base/base-event-entity';
import {
	parsePrintReservesEventJson,
	type PrintReservesEvent,
	type PrintReservesEventJson
} from './print-reserves-event';

export interface DistributeToTicketModEvent extends BaseEventEntity {
	project: Partial<Project>;
	fundingCycleId: BigNumber;
	projectId: BigNumber;
	modBeneficiary: string;
	modPreferUnstaked: boolean;
	modCut: BigNumber;
	printReservesEvent: Partial<PrintReservesEvent>;
}

export type DistributeToTicketModEventJson = Partial<
	Record<Exclude<keyof DistributeToTicketModEvent, 'project' | 'printReservesEvent'>, string> & {
		project: ProjectJson;
		printReservesEvent: PrintReservesEventJson;
	} & BaseEventEntityJson
>;

export const parseDistributeToTicketModEvent = (
	j: DistributeToTicketModEventJson
): Partial<DistributeToTicketModEvent> => ({
	...parseBaseEventEntityJson(j),
	fundingCycleId: j.fundingCycleId ? BigNumber.from(j.fundingCycleId) : undefined,
	project: j.project ? parseProjectJson(j.project) : undefined,
	projectId: j.projectId ? BigNumber.from(j.projectId) : undefined,
	modBeneficiary: j.modBeneficiary,
	modPreferUnstaked: !!j.modPreferUnstaked,
	modCut: j.modCut ? BigNumber.from(j.modCut) : undefined,
	printReservesEvent: j.printReservesEvent
		? parsePrintReservesEventJson(j.printReservesEvent)
		: undefined
});
