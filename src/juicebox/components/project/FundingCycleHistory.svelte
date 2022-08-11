<script lang="ts">
	import type Store from '$utils/Store';
	import { BigNumber } from '@ethersproject/bignumber';
	import FundingCycleDetails from '../FundingCycleDetails.svelte';
	import type { V2FundingCycle } from '$juicebox/models/v2/fundingCycle';
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import { formatDiscountRate } from '$juicebox/utils/v2/math';
	import Modal, { bind, openModal } from '../Modal.svelte';
	import { getContext, onMount } from 'svelte';
	// TODO move the type to somewhere else
	import type { V2ProjectContextType } from '$juicebox/models/project-type';
	import HistoricalFundingCycle from './HistoricalFundingCycle.svelte';
	import HeavyBorderBox from '../HeavyBorderBox.svelte';

	import { readContract } from '$juicebox/utils/web3/contractReader';
	import { V2ContractName } from '$juicebox/models/v2/contracts';
	import { ETH_TOKEN_ADDRESS } from '$juicebox/constants/v2/juiceboxTokens';
	import { decodeV2FundingCycleMetadata } from '$juicebox/utils/v2/fundingCycle';

	// TODO move project context from create
	// import { V2ProjectContext } from 'contexts/v2/projectContext'

	// TODO contract reader
	// import useProjectDistributionLimit from 'hooks/v2/contractReader/ProjectDistributionLimit'
	// import useUsedDistributionLimit from 'hooks/v2/contractReader/UsedDistributionLimit'
	// import { V2UserContext } from 'contexts/v2/userContext'
	// const { contracts } = useContext(V2UserContext)

	const project = getContext('PROJECT') as Store<V2ProjectContextType>;
	const { projectId, fundingCycle: currentFundingCycle } = $project;
	// const projectId = undefined;
	// const currentFundingCycle = undefined;
	const contracts = {} as Record<'string', Store>;
	let pastFundingCycles: V2FundingCycle[] = [];

	// Fill in gaps between first funding cycle of each configuration:
	//     - derives starts from duration and start time of the first FC of that configuration
	//     - derives weights from discount rate and weight of the first FC of the configuration
	//     - derives number by incrementing
	//     - everything else the same as the first FC of the configuration
	const deriveFundingCyclesBetweenEachConfiguration = ({
		firstFCOfEachConfiguration,
		currentFundingCycle
	}: {
		firstFCOfEachConfiguration: V2FundingCycle[];
		currentFundingCycle: V2FundingCycle;
	}) => {
		const allFundingCycles: V2FundingCycle[] = [];

		firstFCOfEachConfiguration.forEach((firstFundingCycleOfConfiguration, configurationIndex) => {
			allFundingCycles.push(firstFundingCycleOfConfiguration);

			const currentReconfigurationStart = firstFundingCycleOfConfiguration.start;
			const nextConfigurationStart =
				configurationIndex < firstFCOfEachConfiguration.length - 1
					? firstFCOfEachConfiguration[configurationIndex + 1].start
					: currentFundingCycle.start;
			const currentDuration = firstFundingCycleOfConfiguration.duration;
			const currentDiscountRate = firstFundingCycleOfConfiguration.discountRate;

			let numInterimFundingCycles: number;

			if (currentDuration && !currentDuration.eq(0)) {
				numInterimFundingCycles = nextConfigurationStart
					.sub(currentReconfigurationStart)
					.div(currentDuration)
					.toNumber();
			} else {
				numInterimFundingCycles = 0;
			}

			const isLastConfiguration = configurationIndex === firstFCOfEachConfiguration.length - 1;

			let interimIndex = 0;

			// Initially set to first of the reconfiguration
			let interimWeight: BigNumber = firstFundingCycleOfConfiguration.weight;
			let interimStart: BigNumber = firstFundingCycleOfConfiguration.start;
			let interimNumber: BigNumber = firstFundingCycleOfConfiguration.number;

			let interimFundingCycle: V2FundingCycle = firstFundingCycleOfConfiguration;

			while (interimIndex < numInterimFundingCycles) {
				// This is to prevent doubling up of an extrapolated FC and the first FC
				// of the next configuration.
				if (!isLastConfiguration && interimIndex === numInterimFundingCycles - 1) {
					break;
				}
				const nextInterimWeight = interimWeight.sub(
					interimWeight.mul(formatDiscountRate(currentDiscountRate)).div(100)
				);
				const nextInterimStart = interimStart.add(currentDuration);
				const nextInterimNumber = interimNumber.add(1);

				let nextFundingCycle = {
					duration: interimFundingCycle.duration,
					weight: nextInterimWeight,
					discountRate: interimFundingCycle.discountRate,
					ballot: interimFundingCycle.ballot,
					number: nextInterimNumber,
					configuration: interimFundingCycle.configuration,
					start: nextInterimStart,
					metadata: interimFundingCycle.metadata
				} as V2FundingCycle;

				interimWeight = nextInterimWeight;
				interimStart = nextInterimStart;
				interimNumber = nextInterimNumber;
				interimIndex++;

				allFundingCycles.push(nextFundingCycle);
			}
		});
		return allFundingCycles;
	};

	const loadPastFundingCycles = async () => {
		if (!(projectId && currentFundingCycle)) return [];

		const firstFCOfCurrentConfiguration = await readContract(
			V2ContractName.JBFundingCycleStore,
			'get',
			[projectId, currentFundingCycle.configuration]
		);
		let firstFCOfEachConfiguration: V2FundingCycle[] = [firstFCOfCurrentConfiguration];

		let previousReconfiguration = currentFundingCycle.basedOn;

		// Get first funding cycle of each configuration using basedOn
		while (!previousReconfiguration.eq(BigNumber.from(0))) {
			const previousReconfigurationFirstFundingCycle: V2FundingCycle = (await readContract(
				V2ContractName.JBFundingCycleStore,
				'get',
				[projectId, previousReconfiguration]
			)) as V2FundingCycle;

			if (previousReconfigurationFirstFundingCycle) {
				// Add it to the start of list
				firstFCOfEachConfiguration = [previousReconfigurationFirstFundingCycle].concat(
					firstFCOfEachConfiguration
				);
				previousReconfiguration = previousReconfigurationFirstFundingCycle.basedOn;
			}
		}

		const allFundingCycles = deriveFundingCyclesBetweenEachConfiguration({
			firstFCOfEachConfiguration,
			currentFundingCycle
		});

		// Cut off the current funding cycle
		const allPastFundingCycles = allFundingCycles.slice(0, -1);

		return allPastFundingCycles.reverse();
	};

	onMount(async () => {
		pastFundingCycles = await loadPastFundingCycles();
		// pastFundingCycles = [currentFundingCycle, currentFundingCycle, currentFundingCycle];
	});
</script>

<HeavyBorderBox>
	{#if !pastFundingCycles.length}
		<p>No past funding cycles</p>
	{/if}

	{#each pastFundingCycles as fundingCycle, index}
		<HistoricalFundingCycle
			{fundingCycle}
			numFundingCycles={pastFundingCycles.length}
			{index}
			on:click={async () => {
				const [distributionLimit, distributionLimitCurrency] = await readContract(
					V2ContractName.JBController,
					'distributionLimitOf',
					[projectId, fundingCycle.configuration, $project.primaryTerminal, ETH_TOKEN_ADDRESS]
				);

				const fundingCycleMetadata = decodeV2FundingCycleMetadata(fundingCycle.metadata);

				// TODO needs this data! //
				openModal(
					bind(FundingCycleDetails, {
						expanded: true,
						isPopup: true,
						fundingCycle,
						fundingCycleMetadata: fundingCycleMetadata,
						distributionLimit: distributionLimit || BigNumber.from(0),
						currentDistributionLimitCurrencyType:
							distributionLimitCurrency || BigNumber.from(V2_CURRENCY_ETH)
					})
				);
			}}
		/>
	{/each}
</HeavyBorderBox>
