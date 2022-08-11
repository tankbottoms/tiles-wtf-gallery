import { BigNumber } from 'ethers';
import { SECONDS_IN_DAY } from '$juicebox/constants/numbers';
import axios from 'axios';
import { consolidateMetadata } from '$juicebox/models/project-metadata';
import {
	querySubgraph,
	querySubgraphExhaustive,
	type EntityKeys,
	type GraphQueryOpts,
	type InfiniteGraphQueryOpts,
	type WhereConfig
} from '$juicebox/utils/graph';
import type { ProjectState } from '$juicebox/models/project-visibility';
import type { Project, TrendingProject } from '$juicebox/models/subgraph-entities/vX/project';

// TODO don't hardcode this here, use the utils/ipfs after issue with @pinata/sdk has been solved
import { ipfsCidToFirebaseUrl } from '$juicebox/utils/ipfs';

type ProjectStat = Record<
	string,
	{
		trendingVolume: BigNumber;
		paymentsCount: number;
	}
>;

interface ProjectsOptions {
	pageNumber?: number;
	projectId?: BigNumber;
	projectIds?: number[];
	metadataUri?: string;
	orderBy?: 'createdAt' | 'currentBalance' | 'totalPaid';
	orderDirection?: 'asc' | 'desc';
	pageSize?: number;
	state?: ProjectState;
	keys?: (keyof Project)[];
}

const keys: (keyof Project)[] = [
	'id',
	'projectId',
	'handle',
	'owner',
	'createdAt',
	'metadataUri',
	'currentBalance',
	'totalPaid',
	'totalRedeemed',
	'cv'
];

const queryOpts = (
	opts: ProjectsOptions
): Partial<
	| GraphQueryOpts<'project', EntityKeys<'project'>>
	| InfiniteGraphQueryOpts<'project', EntityKeys<'project'>>
> => {
	const where: WhereConfig<'project'>[] = [
		{
			key: 'cv',
			value: '2'
		}
	];

	if (opts.projectIds) {
		where.push({
			key: 'projectId',
			operator: 'in',
			value: opts.projectIds || []
		});
	}

	if (opts.projectId) {
		where.push({
			key: 'id' as const,
			value: `2-${opts.projectId}`
		});
	}

	return {
		entity: 'project',
		keys: opts.keys ?? keys,
		orderDirection: opts.orderDirection ?? 'desc',
		orderBy: opts.orderBy ?? 'totalPaid',
		pageSize: opts.pageSize,
		where
	};
};

export async function getProjects(opts: ProjectsOptions) {
	return querySubgraph({
		...(queryOpts(opts) as GraphQueryOpts<'project', EntityKeys<'project'>>),
		first: opts.pageSize,
		skip: opts.pageNumber && opts.pageSize ? opts.pageNumber * opts.pageSize : undefined
	});
}

// NOTE: V2 Contracts do not have handle
// export function getProjectsByHandle(handle: string | undefined) {
// 	return querySubgraph(
// 		handle
// 			? {
// 					text: `${handle}:*`,
// 					entity: 'projectSearch',
// 					keys
// 			  }
// 			: null
// 	);
// }

export async function getProjectMetadata(metadataUri: string | undefined) {
	if (!metadataUri) {
		console.error('No metadataUri provided');
		return;
	}
	const url = ipfsCidToFirebaseUrl(metadataUri);
	const response = await axios.get(url, {
		headers: {
			apikey: import.meta.env.VITE_API_KEY
		}
	});
	return consolidateMetadata(response.data);
}

export function getProjectStatsFromPayments(payments = []) {
	return payments.reduce((acc, curr) => {
		const projectId = curr.project.id?.toString();
		return projectId
			? {
				...acc,
				[projectId]: {
					trendingVolume: BigNumber.from(acc[projectId]?.trendingVolume ?? 0).add(curr.amount),
					paymentsCount: (acc[projectId]?.paymentsCount ?? 0) + 1
				}
			}
			: acc;
	}, {} as ProjectStat);
}

export function getTrendingProjectsFromProjectsAndStats(projects = [], projectStats = {}) {
	return projects
		?.map((p) => {
			const stats = p.id && projectStats ? projectStats[p.id.toString()] : undefined;

			// Algorithm to rank trending projects:
			// trendingScore = volume * (number of payments)^2
			const trendingScore = stats?.trendingVolume.mul(BigNumber.from(stats.paymentsCount).pow(2));

			return {
				...p,
				trendingScore,
				trendingVolume: stats?.trendingVolume,
				trendingPaymentsCount: stats?.paymentsCount
			} as TrendingProject;
		})
		.sort((a: TrendingProject, b: TrendingProject) =>
			a.trendingScore?.gt(b.trendingScore ?? 0) ? -1 : 1
		);
}

export async function getLatestPayments(days = 7) {
	const daySeconds = days * SECONDS_IN_DAY;
	const now = new Date().setUTCHours(0, 0, 0, 0); // get start of day, for determinism
	const nowSeconds = now.valueOf() / 1000;

	return await querySubgraphExhaustive({
		entity: 'payEvent',
		keys: [
			'amount',
			{
				entity: 'project',
				keys: ['id']
			}
		],
		where: [
			{
				key: 'timestamp',
				value: nowSeconds - daySeconds,
				operator: 'gte'
			}
		]
	});
}

export async function getProjectsFromIds(ids: string[]) {
	return await querySubgraph({
		entity: 'project',
		keys,
		where: [
			{
				key: 'id',
				value: ids,
				operator: 'in'
			},
			{
				key: 'cv',
				value: '2',
				operator: 'contains'
			}
		]
	});
}

const defaultKeys = keys;
export async function useProjectsSearch<K extends EntityKeys<'projectSearch'>>({
	handle = undefined,
	keys = defaultKeys as any
}: {
	handle: string | undefined;
	keys: K[];
}) {
	return (
		await querySubgraph({
			text: `${handle}:*`,
			entity: 'projectSearch',
			keys: keys,
			where: [
				{
					key: 'cv',
					value: '2'
				}
			]
		})
	).filter((project) => project.cv === '2');
}

export async function trendingProjectsQuery(count: number, trendingWindowDays: number) {
	const payments = await getLatestPayments(trendingWindowDays);
	const projectStats = await getProjectStatsFromPayments(payments);
	const ids = Object.keys(projectStats);
	const projectsQuery = await getProjectsFromIds(ids);
	const trendingProjects = getTrendingProjectsFromProjectsAndStats(
		projectsQuery,
		projectStats
	).slice(0, count);
	return trendingProjects;
}

export async function myProjectsQuery(wallet: string | undefined) {
	const projectsQuery = await querySubgraph(
		wallet
			? {
				entity: 'project',
				keys,
				where: [
					{
						key: 'owner',
						operator: 'in',
						value: [wallet]
					},
					{
						key: 'cv',
						value: '2'
					}
				]
			}
			: null
	);

	return projectsQuery;
}

export async function holdingsProjectsQuery(wallet: string | undefined) {
	const loadParticipants = async () => {
		const participants = await querySubgraphExhaustive(
			wallet
				? {
					entity: 'participant',
					orderBy: 'balance',
					orderDirection: 'desc',
					keys: [
						{
							entity: 'project',
							keys: ['id']
						}
					],
					where: [
						{
							key: 'cv',
							value: '2'
						},
						{
							key: 'wallet',
							value: wallet
						}
					]
				}
				: null
		);

		if (!participants) {
			return;
		}

		const projectIds = participants?.reduce((acc, curr) => {
			const projectId = curr?.project?.id?.toString();

			return [...acc, ...(projectId ? (acc.includes(projectId) ? [] : [projectId]) : [])];
		}, [] as string[]);

		return projectIds;
	};

	const projectIds = await loadParticipants();

	const projectsQuery = await querySubgraph(
		projectIds
			? {
				entity: 'project',
				keys,
				where: {
					key: 'id',
					operator: 'in',
					value: projectIds
				}
			}
			: null
	);

	return projectsQuery;
}

export function infiniteProjectsQuery(opts: ProjectsOptions) {
	return querySubgraphExhaustive(
		queryOpts(opts) as InfiniteGraphQueryOpts<'project', EntityKeys<'project'>>
	);
}

export async function getTrendingProjects(days: number, count: number) {
	return trendingProjectsQuery(count, days);
}
