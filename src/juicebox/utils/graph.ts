import axios from 'axios';
import {
	type DistributeToPayoutModEvent,
	type DistributeToPayoutModEventJson,
	parseDistributeToPayoutModEvent
} from '$juicebox/models/subgraph-entities/v1/distribute-to-payout-mod-event';
import {
	type DistributeToTicketModEvent,
	type DistributeToTicketModEventJson,
	parseDistributeToTicketModEvent
} from '$juicebox/models/subgraph-entities/v1/distribute-to-ticket-mod-event';
import {
	parsePrintReservesEventJson,
	type PrintReservesEvent,
	type PrintReservesEventJson
} from '$juicebox/models/subgraph-entities/v1/print-reserves-event';
import {
	parseTapEventJson,
	type TapEvent,
	type TapEventJson
} from '$juicebox/models/subgraph-entities/v1/tap-event';
import {
	type DistributePayoutsEvent,
	type DistributePayoutsEventJson,
	parseDistributePayoutsEventJson
} from '$juicebox/models/subgraph-entities/v2/distribute-payouts-event';
import {
	type DistributeReservedTokensEvent,
	type DistributeReservedTokensEventJson,
	parseDistributeReservedTokensEventJson
} from '$juicebox/models/subgraph-entities/v2/distribute-reserved-tokens-event';
import {
	type DistributeToPayoutSplitEvent,
	type DistributeToPayoutSplitEventJson,
	parseDistributeToPayoutSplitEventJson
} from '$juicebox/models/subgraph-entities/v2/distribute-to-payout-split-event';
import {
	type DistributeToReservedTokenSplitEvent,
	type DistributeToReservedTokenSplitEventJson,
	parseDistributeToReservedTokenSplitEventJson
} from '$juicebox/models/subgraph-entities/v2/distribute-to-reserved-token-split-event';
import {
	parseUseAllowanceEventJson,
	type UseAllowanceEvent,
	type UseAllowanceEventJson
} from '$juicebox/models/subgraph-entities/v2/use-allowance-event';
import {
	type DeployedERC20Event,
	type DeployedERC20EventJson,
	parseDeployedERC20EventJson
} from '$juicebox/models/subgraph-entities/vX/deployed-erc20-event';
import {
	type MintTokensEvent,
	type MintTokensEventJson,
	parseMintTokensEventJson
} from '$juicebox/models/subgraph-entities/vX/mint-tokens-event';
import {
	parseParticipantJson,
	type Participant,
	type ParticipantJson
} from '$juicebox/models/subgraph-entities/vX/participant';
import {
	parsePayEventJson,
	type PayEvent,
	type PayEventJson
} from '$juicebox/models/subgraph-entities/vX/pay-event';
import {
	parseProjectJson,
	type Project,
	type ProjectJson
} from '$juicebox/models/subgraph-entities/vX/project';
import {
	parseProjectCreateEventJson,
	type ProjectCreateEvent,
	type ProjectCreateEventJson
} from '$juicebox/models/subgraph-entities/vX/project-create-event';
import {
	parseProjectEventJson,
	type ProjectEvent,
	type ProjectEventJson
} from '$juicebox/models/subgraph-entities/vX/project-event';
import {
	parseProtocolLogJson,
	type ProtocolLog,
	type ProtocolLogJson
} from '$juicebox/models/subgraph-entities/vX/protocol-log';
import {
	parseRedeemEventJson,
	type RedeemEvent,
	type RedeemEventJson
} from '$juicebox/models/subgraph-entities/vX/redeem-event';
import { readNetwork } from '$stores/web3';
import { get } from 'svelte/store';
export interface SubgraphEntities {
	protocolLog: ProtocolLog;
	projectEvent: ProjectEvent;
	projectCreateEvent: ProjectCreateEvent;
	deployedERC20Event: DeployedERC20Event;
	project: Project;
	projectSearch: Project;
	payEvent: PayEvent;
	redeemEvent: RedeemEvent;
	participant: Participant;
	tapEvent: TapEvent;
	distributeToPayoutModEvent: DistributeToPayoutModEvent;
	distributeToTicketModEvent: DistributeToTicketModEvent;
	printReservesEvent: PrintReservesEvent;
	mintTokensEvent: MintTokensEvent;
	distributePayoutsEvent: DistributePayoutsEvent;
	distributeReservedTokensEvent: DistributeReservedTokensEvent;
	distributeToReservedTokenSplitEvent: DistributeToReservedTokenSplitEvent;
	distributeToPayoutSplitEvent: DistributeToPayoutSplitEvent;
	useAllowanceEvent: UseAllowanceEvent;
}

export interface SubgraphQueryReturnTypes {
	protocolLog: { protocolLogs: ProtocolLogJson[] };
	projectEvent: { projectEvents: ProjectEventJson[] };
	projectCreateEvent: { projectCreateEvents: ProjectCreateEventJson[] };
	deployedERC20Event: { deployedERC20Events: DeployedERC20EventJson[] };
	project: { projects: ProjectJson[] };
	projectSearch: { projectSearch: ProjectJson[] };
	payEvent: { payEvents: PayEventJson[] };
	redeemEvent: { redeemEvents: RedeemEventJson[] };
	participant: { participants: ParticipantJson[] };
	tapEvent: { tapEvents: TapEventJson[] };
	distributeToTicketModEvent: {
		distributeToTicketModEvents: DistributeToTicketModEventJson[];
	};
	distributeToPayoutModEvent: {
		distributeToPayoutModEvents: DistributeToPayoutModEventJson[];
	};
	printReservesEvent: {
		printReservesEvents: PrintReservesEventJson[];
	};
	distributePayoutsEvent: {
		distributePayoutsEvent: DistributePayoutsEventJson[];
	};
	distributeReservedTokensEvent: {
		distributeReservedTokensEvents: DistributeReservedTokensEventJson[];
	};
	distributeToReservedTokenSplitEvent: {
		distributeToReservedTokenSplitEvents: DistributeToReservedTokenSplitEventJson[];
	};
	distributeToPayoutSplitEvent: {
		distributeToPayoutSplitEvents: DistributeToPayoutSplitEventJson[];
	};
	useAllowanceEvent: { useAllowanceEvents: UseAllowanceEventJson[] };
	mintTokensEvent: { mintTokensEvent: MintTokensEventJson[] };
}

export type EntityKey = keyof SubgraphEntities;

export interface SubgraphError {
	locations: { column: number; line: number }[];
	message: string;
}

export type OrderDirection = 'asc' | 'desc';

export type WhereConfig<E extends EntityKey> = {
	key: EntityKeys<E>;
	value: string | number | boolean | string[] | number[] | null;
	operator?:
	| 'not'
	| 'gt'
	| 'lt'
	| 'gte'
	| 'lte'
	| 'in'
	| 'not_in'
	| 'contains'
	| 'not_contains'
	| 'starts_with'
	| 'ends_with'
	| 'not_starts_with'
	| 'not_ends_with';
};

export type BlockConfig = {
	number?: number;
	hash?: string;
};

export type EntityKeys<E extends EntityKey> = keyof SubgraphEntities[E];

export interface GraphQueryOpts<E extends EntityKey, K extends EntityKeys<E>> {
	entity: E;
	text?: string;
	first?: number;
	skip?: number;
	orderBy?: keyof SubgraphEntities[E];
	block?: BlockConfig;
	url?: string;

	// `keys` can be a mix of the entity's keys or an entity specifier with its own keys
	keys: (
		| K
		| {
			entity: EntityKey;
			keys: string[]; // hard to type accurate nested keys. All bets are off when this is used.
		}
	)[];
	orderDirection?: OrderDirection;
	where?: WhereConfig<E> | WhereConfig<E>[];
}

// Re-type GraphQueryOpts to remove skip and add pageSize.
// This is so we can calculate our own `skip` value based on
// the react-query managed page number multiplied by the provided
// page size.
export type InfiniteGraphQueryOpts<E extends EntityKey, K extends EntityKeys<E>> = Omit<
	GraphQueryOpts<E, K>,
	'skip'
> & {
	pageSize: number;
};

// https://thegraph.com/docs/graphql-api#filtering
export const formatGraphQuery = <E extends EntityKey, K extends EntityKeys<E>>(
	opts: GraphQueryOpts<E, K>
) => {
	if (!opts) return;

	let args = '';

	const addArg = (name: string, value?: string | number | keyof SubgraphEntities[E]) => {
		if (value === undefined) return;
		args += (args.length ? ', ' : '') + `${name}: ` + String(value);
	};
	const formatWhere = (where: WhereConfig<E>) =>
		`${String(where.key)}${where.operator ? '_' + where.operator : ''}:` +
		(Array.isArray(where.value)
			? `[${where.value.map((v) => (typeof v === 'string' ? `"${v}"` : v)).join(',')}]`
			: typeof where.value === 'number'
				? where.value
				: `"${where.value}"`);

	addArg('text', opts.text ? `"${opts.text}"` : undefined);
	addArg('first', opts.first);
	addArg('skip', opts.skip);
	addArg('orderBy', opts.orderBy);
	addArg('orderDirection', opts.orderDirection);
	if (opts.block) {
		if (opts.block.number) {
			addArg('block', `{ number: ${opts.block.number} }`);
		} else if (opts.block.hash) {
			addArg('block', `{ hash: ${opts.block.hash} }`);
		}
	}
	addArg(
		'where',
		opts.where
			? Array.isArray(opts.where)
				? `{${opts.where.map((w) => ` ${formatWhere(w)}`)} }`
				: `{ ${formatWhere(opts.where)} }`
			: undefined
	);

	let overrideEntity: string = opts.entity;

	return `{ ${overrideEntity}${isPluralQuery(opts.entity) ? 's' : ''}${args ? `(${args})` : ''
		} {${opts.keys.reduce(
			(acc, key) =>
				typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol'
					? acc + ' ' + key.toString()
					: acc + ` ${key.entity} { ${key.keys.join(' ')} }`,
			''
		)} } }`;
};

export const trimHexZero = (hexStr: string) => hexStr.replace('0x0', '0x');

export function formatGraphResponse<E extends EntityKey>(
	entity: E,
	response: SubgraphQueryReturnTypes[E]
): SubgraphEntities[E][] {
	if (!response || typeof response !== 'object') {
		return [];
	}

	// This code works perfectly, but there's an unusual TypeScript issue that
	// makes it appear type unsafe...
	//
	// For example, `response.projects` is a ProjectJson[], as dictated by
	// SubgraphQueryReturnTypes['projects']
	// We then map over that array to return a Project[], but for some reason,
	// TypeScript isn't equating `Project` with `SubgraphEntities['project']`,
	// even though they're the same type.
	//
	// If you think you can solve it and remove the @ts-ignore, be my guest.
	// My best guess is a conditional resolver type, ie:
	// type EntityResolver<E extends EntityKey> = E extends 'project' ? Project : ...
	// in favor of the main SubgraphEntities type. I tried it, though, to no avail.

	switch (entity) {
		case 'protocolLog':
			if ('protocolLogs' in response) {
				// @ts-ignore
				return response.protocolLogs.map(parseProtocolLogJson);
			}
			break;
		case 'project':
			if ('projects' in response) {
				// @ts-ignore
				return response.projects.map(parseProjectJson);
			}
			break;
		case 'projectEvent':
			if ('projectEvents' in response) {
				// @ts-ignore
				return response.projectEvents.map(parseProjectEventJson);
			}
			break;
		case 'projectCreateEvent':
			if ('projectCreateEvents' in response) {
				// @ts-ignore
				return response.projectCreateEvents.map(parseProjectCreateEventJson);
			}
			break;
		case 'projectSearch':
			if ('projectSearch' in response) {
				// @ts-ignore
				return response.projectSearch.map(parseProjectJson);
			}
			break;
		case 'payEvent':
			if ('payEvents' in response) {
				// @ts-ignore
				return response.payEvents.map(parsePayEventJson);
			}
			break;
		case 'redeemEvent':
			if ('redeemEvents' in response) {
				// @ts-ignore
				return response.redeemEvents.map(parseRedeemEventJson);
			}
			break;
		case 'participant':
			if ('participants' in response) {
				// @ts-ignore
				return response.participants.map(parseParticipantJson);
			}
			break;
		case 'tapEvent':
			if ('tapEvents' in response) {
				// @ts-ignore
				return response.tapEvents.map(parseTapEventJson);
			}
			break;
		case 'distributeToPayoutModEvent':
			if ('distributeToPayoutModEvents' in response) {
				// @ts-ignore
				return response.distributeToPayoutModEvents.map(parseDistributeToPayoutModEvent);
			}
			break;
		case 'distributeToTicketModEvent':
			if ('distributeToTicketModEvents' in response) {
				// @ts-ignore
				return response.distributeToTicketModEvents.map(parseDistributeToTicketModEvent);
			}
			break;
		case 'printReservesEvent':
			if ('printReservesEvents' in response) {
				// @ts-ignore
				return response.printReservesEvents.map(parsePrintReservesEventJson);
			}
			break;
		case 'mintTokensEvent':
			if ('mintTokensEvents' in response) {
				// @ts-ignore
				return response.mintTokensEvents.map(parseMintTokensEventJson);
			}
			break;
		case 'deployedERC20Event':
			if ('deployedERC20Events' in response) {
				// @ts-ignore
				return response.deployedERC20Events.map(parseDeployedERC20EventJson);
			}
			break;
		case 'distributePayoutsEvent':
			if ('distributePayoutsEvents' in response) {
				// @ts-ignore
				return response.distributePayoutsEvents.map(parseDistributePayoutsEventJson);
			}
			break;
		case 'distributeReservedTokensEvent':
			if ('distributeReservedTokensEvents' in response) {
				// @ts-ignore
				return response.distributeReservedTokensEvents.map(parseDistributeReservedTokensEventJson);
			}
			break;
		case 'distributeToReservedTokenSplitEvent':
			if ('distributeToReservedTokenSplitEvents' in response) {
				// @ts-ignore
				return response.distributeToReservedTokenSplitEvents.map(
					parseDistributeToReservedTokenSplitEventJson
				);
			}
			break;
		case 'distributeToPayoutSplitEvent':
			if ('distributeToPayoutSplitEvents' in response) {
				// @ts-ignore
				return response.distributeToPayoutSplitEvents.map(parseDistributeToPayoutSplitEventJson);
			}
			break;
		case 'useAllowanceEvent':
			if ('useAllowanceEvents' in response) {
				// @ts-ignore
				return response.useAllowanceEvents.map(parseUseAllowanceEventJson);
			}
			break;
	}

	return [];
}

export async function querySubgraph<E extends EntityKey, K extends EntityKeys<E>>(
	opts: GraphQueryOpts<E, K> | null
) {
	const subgraphUrl = get(readNetwork).subgraphUrl;
	if (!subgraphUrl) {
		// This should _only_ happen in development
		throw new Error('env.VITE_SUBGRAPH_URL_{NETWORK_NAME} is missing');
	}

	if (!opts) return [];

	const response = await axios.post<{
		errors?: SubgraphError | SubgraphError[];
		data: SubgraphQueryReturnTypes[E];
	}>(
		opts.url ?? subgraphUrl,
		{
			query: formatGraphQuery(opts)
		},
		{ headers: { 'Content-Type': 'application/json' } }
	);

	if ('errors' in response.data) {
		throw new Error(
			(Array.isArray(response.data.errors)
				? response.data.errors?.[0]?.message
				: response.data.errors?.message) || 'Something is wrong with this Graph request'
		);
	}

	return formatGraphResponse(opts.entity, response.data?.data);
}

/** Repeats a max page size query until all entities have been returned. */
export async function querySubgraphExhaustive<E extends EntityKey, K extends EntityKeys<E>>(
	opts: Omit<GraphQueryOpts<E, K>, 'first' | 'skip'> | null
) {
	const pageSize = 1000;
	const entities: SubgraphEntities[E][] = [];

	const query = async (page: number) => {
		if (!opts) return;

		const data = await querySubgraph({
			...opts,
			first: pageSize,
			...(page > 0
				? {
					skip: pageSize * page
				}
				: {})
		});

		if (!data) return;

		entities.push(...data);

		if (data.length === pageSize) await query(page + 1);
	};

	await query(0);

	return entities;
}

const isPluralQuery = (key: EntityKey): boolean => {
	if (key === 'projectSearch') return false;

	return true;
};
