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

export interface DeployedERC20Event extends BaseProjectEntity, BaseEventEntity {
	symbol: string;
}

export type DeployedERC20EventJson = Partial<
	Record<keyof DeployedERC20Event, string> & BaseProjectEntityJson & BaseEventEntityJson
>;

export const parseDeployedERC20EventJson = (
	j: DeployedERC20EventJson
): Partial<DeployedERC20Event> => ({
	...parseBaseProjectEntityJson(j),
	...parseBaseEventEntityJson(j),
	symbol: j.symbol
});
