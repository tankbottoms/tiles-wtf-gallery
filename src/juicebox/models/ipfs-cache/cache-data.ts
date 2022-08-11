import type { TrendingProject, TrendingProjectJson } from '$models/subgraph-entities/vX/project';

import { IpfsCacheName } from './cache-name';

export type IpfsCacheJsonData = {
	[IpfsCacheName.trendingV2]: TrendingProjectJson[];
};

export type IpfsCacheData = {
	[IpfsCacheName.trendingV2]: TrendingProject[];
};
