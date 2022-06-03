<script lang="ts">
	import { ethers, type ContractTransaction } from 'ethers';
	import { setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { modal } from '$stores';
	import { BigNumber } from '@ethersproject/bignumber';
	import * as constants from '@ethersproject/constants';
	import { MAX_DISTRIBUTION_LIMIT, redemptionRateFrom } from '$jbx/utils/v2/math';
	import Store from '$jbx/utils/Store';
	import type { V2ProjectContextType } from '$jbx/models/project-type';
	import { Tab, Tabs, TabList, TabPanel } from './Tabs';
	import Button from '$jbx/components/Button.svelte';
	import Icon from '$jbx/components/Icon.svelte';
	import FundingCycle from './FundingCycle';
	import Preview from './Preview';
	import ProjectDetails from './ProjectDetails.svelte';
	import Modal from '$jbx/components/Modal.svelte';
	import { connectedAccount, provider, web3Connect } from '$stores/web3';
	import { readNetwork } from '$stores/web3';
	import { uploadProjectMetadata } from '$jbx/utils/ipfs';
	import { DEFAULT_BALLOT_STRATEGY } from '$jbx/constants/v2/ballotStrategies';
	import { Currency, CurrencyValue } from '$jbx/constants';
	import { contracts, writeContract } from '$jbx/utils/web3/contractReader';
	import { V2ContractName } from '$jbx/models/v2/contracts';
	import { JUICEBOX_MONEY_METADATA_DOMAIN } from '$jbx/constants/v2/metadataDomain';
	import { fromWad } from '$jbx/utils/formatNumber';
	import { V2_CURRENCY_ETH } from '$jbx/utils/v2/currency';
	import FinalPreview from './FinalPreview.svelte';
	import BannerNotice from '$jbx/components/BannerNotice.svelte';
	import ExternalLink from '$jbx/components/ExternalLink.svelte';
	import { get } from 'svelte/store';

	let project = new Store<V2ProjectContextType>();
	// Populate project with default data
	// TODO fix the type...
	project.set({
		projectId: undefined,
		isPreviewMode: false,
		projectMetadata: {
			version: 4,
			name: '',
			description: '',
			infoUri: '',
			logoUri: '',
			twitter: '',
			discord: '',
			tokens: [],
			payButton: 'Pay',
			payDisclosure: ''
		},
		fundingCycleMetadata: {
			global: {
				allowSetTerminals: false,
				allowSetController: false
			},
			reservedRate: BigNumber.from(0), // A number from 0-10,000
			redemptionRate: redemptionRateFrom('100'), // A number from 0-10,000
			ballotRedemptionRate: redemptionRateFrom('100'), // A number from 0-10,000
			pausePay: false,
			pauseDistributions: false,
			pauseRedeem: false,
			allowMinting: false,
			pauseBurn: false,
			allowChangeToken: false,
			allowTerminalMigration: false,
			allowControllerMigration: false,
			holdFees: false,
			useTotalOverflowForRedemptions: false,
			useDataSourceForPay: false,
			useDataSourceForRedeem: false,
			dataSource: constants.AddressZero
		},

		fundingCycle: {
			duration: BigNumber.from(0),
			weight: BigNumber.from('0xd3c21bcecceda1000000'),
			discountRate: BigNumber.from(0),
			// TODO ballot, look at hooks/v2/V2ContractLoader.ts for more info
			// ballot: contracts?.JBETHPaymentTerminal.address ?? '', // hex, contract address
			ballot: DEFAULT_BALLOT_STRATEGY.address,

			number: BigNumber.from(1),
			configuration: BigNumber.from(0),
			basedOn: BigNumber.from(0),
			start: BigNumber.from(Date.now()).div(1000),
			metadata: BigNumber.from(0)
		},
		payoutSplits: [],
		reservedTokensSplits: [],
		distributionLimit: BigNumber.from(0),
		distributionLimitCurrency: CurrencyValue[Currency.ETH]?.toNumber(),

		tokenAddress: undefined,
		tokenSymbol: undefined,
		primaryTerminal: undefined,
		ETHBalance: undefined,
		projectOwnerAddress: undefined,
		balanceInDistributionLimitCurrency: undefined,
		usedDistributionLimit: undefined,
		ballotState: undefined,
		primaryTerminalCurrentOverflow: undefined,
		totalTokenSupply: undefined,
		loading: undefined,
		terminals: []
	});

	let deploying = false;

	setContext('PROJECT', project);

	let isReviewPanel = false;
	function checkReview(tabId: string) {
		isReviewPanel = tabId === 'review';
	}

	function onClick(tabId: string) {
		document.getElementById(tabId).click();
		window.scrollTo(0, 0);
	}

	async function deployProject() {
		console.log('Start serializing');
		console.log('fundingCycle', $project.fundingCycle);
		console.log('projectMetadata', $project.projectMetadata);
		console.log('fundingCycleMetadata', $project.fundingCycleMetadata);
		console.log('payoutSplits', $project.payoutSplits);
		console.log('reservedTokensSplits', $project.reservedTokensSplits);
		deploying = true;
		console.log('LOGO:', $project.projectMetadata.logoUri);
		const uploadedMetadata = await uploadProjectMetadata(
			$project.projectMetadata,
			$project.projectMetadata.name.toLowerCase().replace(/[^\w]+/g, '_')
		);
		console.log('uploadedMetadata', uploadedMetadata);
		if (!uploadedMetadata.IpfsHash) {
			deploying = false;
			return;
		}

		const fundAccessConstraints = [
			{
				terminal: contracts[$readNetwork.alias].JBETHPaymentTerminal.address, // address probably
				token: '0x000000000000000000000000000000000000eeee', // address
				distributionLimit: $project.distributionLimit ?? '0' ?? fromWad(MAX_DISTRIBUTION_LIMIT),
				distributionLimitCurrency: (1).toString() ?? V2_CURRENCY_ETH,
				overflowAllowance: '0',
				overflowAllowanceCurrency: '0'
			}
		];

		const args = [
			$connectedAccount,
			[uploadedMetadata.IpfsHash, JUICEBOX_MONEY_METADATA_DOMAIN],
			{
				duration: $project.fundingCycle.duration,
				weight: $project.fundingCycle.weight,
				discountRate: $project.fundingCycle.discountRate,
				ballot: $project.fundingCycle.ballot
			},
			$project.fundingCycleMetadata,
			'0x01',
			[
				{
					group: 1,
					splits: $project.payoutSplits
				},
				{
					group: 2,
					splits: $project.reservedTokensSplits
				}
			],
			fundAccessConstraints,
			[contracts[$readNetwork.alias].JBETHPaymentTerminal.address],
			``
		];

		console.log('Deploying with arguments', args);

		const txnResponse: ContractTransaction = await writeContract(
			V2ContractName.JBController,
			'launchProjectFor',
			args
		);
		console.log('Pending txn:', txnResponse.hash);
		const txn = await txnResponse.wait();

		const eventAbi = [
			'event LaunchProject (uint256 configuration, uint256 projectId, string memo, address caller)'
		];
		let iface = new ethers.utils.Interface(eventAbi);

		const event = iface.parseLog(txn.logs[txn.logs.length - 1]);
		const projectId = event.args[1] as BigNumber;

		console.log('Created project [ID]:', projectId.toNumber());

		// Go to projects page
		goto(`/projects/${projectId}?newDeploy=true`);

		deploying = false;
	}

	let disabled = true;

	$: disabled = !$project.projectMetadata.name || deploying;
</script>

<BannerNotice>
	<span>
		<Icon name="exclamationCircle" /> Your project will be created on the Juicebox V2 contracts.
		<br />
		This is a prototyping interface for experimental features, for production deployments please visit
		<ExternalLink href="https://juicebox.money">juicebox.money</ExternalLink>
	</span>
</BannerNotice>
<div id="create">
	<h1>Design your project 🎨</h1>
	<Tabs>
		<TabList>
			<Tab id="details" onClick={checkReview}>1. Project details</Tab>
			<Tab id="funding" onClick={checkReview}>2. Funding cycle</Tab>
			<Tab id="review" onClick={checkReview}>3. Review and deploy</Tab>
		</TabList>
		<div class="row">
			{#if isReviewPanel}
				<main>
					<FinalPreview />
					<Button
						{disabled}
						loading={deploying}
						on:click={$connectedAccount ? deployProject : () => web3Connect()}
					>
						{#if $connectedAccount}
							{#if deploying}
								...
							{:else}
								Deploy project to {$readNetwork.alias}
							{/if}
						{:else}
							Connect wallet to deploy
						{/if}
					</Button>
				</main>
			{:else}
				<section>
					<TabPanel>
						<ProjectDetails />
						<Button on:click={() => onClick('funding')}>Next: Funding cycle</Button>
					</TabPanel>
					<TabPanel>
						<FundingCycle />
						<Button on:click={() => onClick('review')}>Next: Review and deploy</Button>
					</TabPanel>
				</section>
				<section>
					<Preview />
				</section>
			{/if}
		</div>
	</Tabs>
</div>
<Modal show={$modal} />

<style>
	#create {
		box-sizing: content-box;
		padding: 20px 80px 80px;
		margin: 0 auto;
		margin-bottom: 40px;
		background: var(--background-l0);
		max-width: 1200px;
	}

	.row {
		display: flex;
		max-width: 1120px;
		margin-top: 40px;
		gap: 40px;
	}

	h1 {
		color: var(--primary-text);
		font-size: 28px;
		font-weight: 400;
		margin-bottom: 40px;
		margin-block-start: 0.67em;
	}

	section:first-of-type {
		flex: 0 0 42%;
		max-width: 42%;
	}

	section:last-of-type {
		flex: 0 0 56%;
		max-width: 56%;
		padding-left: 40px;
		border-left: 1px solid rgba(0, 0, 0, 0.094);
	}

	@media (max-width: 850px) {
		#create {
			padding: 40px 20px 80px;
		}
		.row {
			flex-flow: row wrap;
		}
		section:first-of-type,
		section:last-of-type {
			flex: 0 0 100%;
			max-width: 100%;
			margin-right: 0;
		}

		section:last-of-type {
			border-left: none;
			padding-left: 0;
		}
	}
</style>
