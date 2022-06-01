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

export interface ProjectCreateEvent extends BaseEventEntity, BaseProjectEntity {}

export type ProjectCreateEventJson = Partial<
	Record<keyof ProjectCreateEvent, string> & BaseProjectEntityJson & BaseEventEntityJson
>;

export const parseProjectCreateEventJson = (
	j: ProjectCreateEventJson
): Partial<ProjectCreateEvent> => ({
	...parseBaseProjectEntityJson(j),
	...parseBaseEventEntityJson(j)
});
