import { querySubgraph, querySubgraphExhaustive, type WhereConfig } from '$utils/graph';

export function getProjectEvents(where: WhereConfig<'projectEvent'>[], skip = 0, first = 50) {
	return querySubgraph({
		first,
		skip,
		entity: 'projectEvent',
		keys: [
			'id',
			{
				entity: 'payEvent',
				keys: ['amount', 'timestamp', 'beneficiary', 'note', 'id', 'txHash']
			},
			{
				entity: 'deployedERC20Event',
				keys: ['symbol', 'txHash', 'timestamp', 'id']
			},
			{
				entity: 'tapEvent',
				keys: [
					'id',
					'timestamp',
					'txHash',
					'caller',
					'beneficiary',
					'beneficiaryTransferAmount',
					'netTransferAmount'
				]
			},
			{
				entity: 'redeemEvent',
				keys: ['id', 'amount', 'beneficiary', 'txHash', 'timestamp', 'returnAmount']
			},
			{
				entity: 'projectCreateEvent',
				keys: ['id', 'txHash', 'timestamp', 'caller']
			},
			{
				entity: 'distributePayoutsEvent',
				keys: ['id', 'timestamp', 'txHash', 'caller', 'beneficiary', 'distributedAmount', 'memo']
			},
			{
				entity: 'distributeReservedTokensEvent',
				keys: [
					'id',
					'timestamp',
					'txHash',
					'caller',
					'beneficiary',
					'beneficiaryTokenCount',
					'tokenCount'
				]
			}
		],
		orderDirection: 'desc',
		orderBy: 'timestamp',
		where
	});
}
