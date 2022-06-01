import { BigNumber } from '@ethersproject/bignumber';

import { parseProjectJson, type Project } from '$models/subgraph-entities/project';

import type { ProjectJson } from './project';

export interface DeployedERC20Event {
	id: string;
	project: Partial<Project>;
	symbol: string;
	deployedAtBlockNum: BigNumber;
}

export type DeployedERC20EventJson = Partial<
	Record<Exclude<keyof DeployedERC20Event, 'project'>, string> & {
		project: ProjectJson;
	}
>;

export const parseDeployedERC20EventJson = (
	json: DeployedERC20EventJson
): Partial<DeployedERC20Event> => ({
	...json,
	project: json.project ? parseProjectJson(json.project) : undefined,
	deployedAtBlockNum:
		json.deployedAtBlockNum !== undefined ? BigNumber.from(json.deployedAtBlockNum) : undefined
});
