import { parseProjectJson, type Project, type ProjectJson } from '../vX/project';

export interface BaseProjectEntity {
	id: string;
	project: Partial<Project>;
	projectId: number;
}

export type BaseProjectEntityJson = Partial<
	Record<Exclude<keyof BaseProjectEntity, 'project'>, string> & {
		project: ProjectJson;
	}
>;

export const parseBaseProjectEntityJson = (
	j: BaseProjectEntityJson
): Partial<BaseProjectEntity> => ({
	id: j.id,
	project: j.project ? parseProjectJson(j.project) : undefined,
	projectId: j.projectId ? parseInt(j.projectId) : undefined
});
