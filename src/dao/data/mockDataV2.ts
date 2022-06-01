import type { V2ProjectContextType } from '$models/project-type';
import { BigNumber } from 'ethers';

export const projectEvents = [
	{
		id: '2-17-0xd9e9046f56adbaea501df993577148d2b259fb1f219eb43826a92b848662f931-42',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: {
			id: '2-17-0xd9e9046f56adbaea501df993577148d2b259fb1f219eb43826a92b848662f931',
			timestamp: 1652133874,
			txHash: '0xd9e9046f56adbaea501df993577148d2b259fb1f219eb43826a92b848662f931',
			caller: '0x9ce38c218a2d053b17e791a7ea9fae2eb84e0428',
			beneficiary: '0x9ce38c218a2d053b17e791a7ea9fae2eb84e0428',
			distributedAmount: '210000000000000000',
			memo: ''
		},
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xd9e9046f56adbaea501df993577148d2b259fb1f219eb43826a92b848662f931-37',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xe2875f2cc07bfee2ef54d2b9d84c9a03c0ec4a7f6607f69739ed83474e544d7c-73',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: {
			id: '2-17-0xe2875f2cc07bfee2ef54d2b9d84c9a03c0ec4a7f6607f69739ed83474e544d7c',
			timestamp: 1652133829,
			txHash: '0xe2875f2cc07bfee2ef54d2b9d84c9a03c0ec4a7f6607f69739ed83474e544d7c',
			caller: '0x9ce38c218a2d053b17e791a7ea9fae2eb84e0428',
			beneficiary: '0x9ce38c218a2d053b17e791a7ea9fae2eb84e0428',
			beneficiaryTokenCount: '26250000000000000000000',
			tokenCount: '52500000000000000000000'
		}
	},
	{
		id: '2-17-0xe2875f2cc07bfee2ef54d2b9d84c9a03c0ec4a7f6607f69739ed83474e544d7c-71',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xfe2b38310d580086776a51a056cf3e70852f826f94888ab9c9c1962e21c2e9eb-56',
		payEvent: {
			amount: '110000000000000000',
			timestamp: 1652133694,
			beneficiary: '0x9db3bf90ea8e16a01f7d7c74f5d3b2afc021f037',
			note: '',
			id: '2-17-0xfe2b38310d580086776a51a056cf3e70852f826f94888ab9c9c1962e21c2e9eb-56',
			txHash: '0xfe2b38310d580086776a51a056cf3e70852f826f94888ab9c9c1962e21c2e9eb'
		},
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xfe2b38310d580086776a51a056cf3e70852f826f94888ab9c9c1962e21c2e9eb-55',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0x3059c7b7ad7eef48d6cd238dd963539742b401f806ec50977e6cc27ab8ce7267-49',
		payEvent: {
			amount: '100000000000000000',
			timestamp: 1652133633,
			beneficiary: '0x9db3bf90ea8e16a01f7d7c74f5d3b2afc021f037',
			note: '',
			id: '2-17-0x3059c7b7ad7eef48d6cd238dd963539742b401f806ec50977e6cc27ab8ce7267-49',
			txHash: '0x3059c7b7ad7eef48d6cd238dd963539742b401f806ec50977e6cc27ab8ce7267'
		},
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0x3059c7b7ad7eef48d6cd238dd963539742b401f806ec50977e6cc27ab8ce7267-48',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xdfd89a47c1253f7e19854024fc873712c07f5e2f0d3173b488553b203ea99ac5-27',
		payEvent: null,
		deployedERC20Event: {
			symbol: 'PCT',
			txHash: '0xdfd89a47c1253f7e19854024fc873712c07f5e2f0d3173b488553b203ea99ac5',
			timestamp: 1652133228,
			id: '2-17-0xdfd89a47c1253f7e19854024fc873712c07f5e2f0d3173b488553b203ea99ac5'
		},
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: null,
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	},
	{
		id: '2-17-0xfda7b5cce22b2d98186361c6f77529cb3bac1b4075c5861c8fad503de7387142-35',
		payEvent: null,
		deployedERC20Event: null,
		tapEvent: null,
		redeemEvent: null,
		projectCreateEvent: {
			id: '2-17-0xfda7b5cce22b2d98186361c6f77529cb3bac1b4075c5861c8fad503de7387142',
			txHash: '0xfda7b5cce22b2d98186361c6f77529cb3bac1b4075c5861c8fad503de7387142',
			timestamp: 1652133137,
			caller: '0x9ce38c218a2d053b17e791a7ea9fae2eb84e0428'
		},
		distributePayoutsEvent: null,
		distributeReservedTokensEvent: null
	}
];

export const project = {
	projectId: BigNumber.from('0x55'),
	projectMetadata: {
		version: 4,
		name: 'Baguette',
		infoUri: 'slapbag.xyz',
		logoUri: 'https://gateway.pinata.cloud/ipfs/QmdA1nzv7Mrxs5HeQSzbNsUeZjsTQwY53PWwHHWaeAwaUb',
		description: 'We slap people with baguettes.',
		twitter: 'whoslapbaguette',
		discord: '',
		tokens: [],
		payButton: 'HonHonHon 🥖',
		payDisclosure: 'Bread is nice, give.'
	},
	fundingCycle: {
		ballot: '0xcA65D0348E6d53BD29d52e298140375cbC6d3C0D',
		basedOn: BigNumber.from('0x00'),
		configuration: BigNumber.from('0x6278e703'),
		discountRate: BigNumber.from('0x05f5e100'),
		duration: BigNumber.from('0x1baf80'),
		metadata: BigNumber.from('0x1b5809c401'),
		number: BigNumber.from('0x01'),
		start: BigNumber.from('0x6278e703'),
		weight: BigNumber.from('0xd3c21bcecceda1000000')
	},
	fundingCycleMetadata: {
		version: 1,
		reservedRate: BigNumber.from('0x09c4'),
		redemptionRate: BigNumber.from('0x0bb8'),
		ballotRedemptionRate: BigNumber.from('0x2710'),
		pausePay: false,
		pauseDistributions: false,
		pauseRedeem: false,
		pauseBurn: false,
		allowMinting: false,
		allowChangeToken: false,
		allowTerminalMigration: false,
		allowControllerMigration: false,
		allowSetTerminals: false,
		allowSetController: false,
		holdFees: false,
		useTotalOverflowForRedemptions: false,
		useDataSourceForPay: false,
		useDataSourceForRedeem: false,
		dataSource: '0x0000000000000000000000000000000000000000'
	},
	distributionLimit: BigNumber.from('0x1b1ae4d6e2ef500000'),
	usedDistributionLimit: BigNumber.from('0x00'),
	payoutSplits: [
		{
			percent: 100000000,
			lockedUntil: 1654596092,
			projectId: '0x00',
			beneficiary: '0x78E4A5778c2ea75d1720c80EAC3043d84838718f',
			allocator: '0x0000000000000000000000000000000000000000',
			preferClaimed: false
		}
	],
	reservedTokensSplits: [
		{
			percent: 500000000,
			lockedUntil: 1653991318,
			projectId: '0x00',
			beneficiary: '0x78E4A5778c2ea75d1720c80EAC3043d84838718f',
			allocator: '0x0000000000000000000000000000000000000000',
			preferClaimed: false
		}
	],
	tokenAddress: '0x0A5F79dCa132Ce9dFf0477A67008D02f80Db8b65',
	terminals: ['0x0E5a62BA8f946AB98c1E801Fc0a7264408f6B838'],
	primaryTerminal: '0x0E5a62BA8f946AB98c1E801Fc0a7264408f6B838',
	ETHBalance: BigNumber.from('0xb1a2bc2ec50000'),
	distributionLimitCurrency: 2,
	balanceInDistributionLimitCurrency: BigNumber.from('0x067374ed82cf7c0000'),
	tokenSymbol: 'BREAD',
	projectOwnerAddress: '0x78E4A5778c2ea75d1720c80EAC3043d84838718f',
	primaryTerminalCurrentOverflow: BigNumber.from('0x00'),
	totalTokenSupply: BigNumber.from('0x07f0e10af47c1c700000'),
	ballotState: 1,
	loading: {
		ETHBalanceLoading: false,
		balanceInDistributionLimitCurrencyLoading: false,
		distributionLimitLoading: false,
		fundingCycleLoading: false,
		usedDistributionLimitLoading: false
	}
} as V2ProjectContextType;
