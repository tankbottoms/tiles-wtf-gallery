import * as constants from '@ethersproject/constants';

import { readNetwork } from '$stores/web3';
import { get } from 'svelte/store';

export type BallotStrategy = {
	name: string;
	description?: string;
	address: string;
};

const BALLOT_ADDRESSES = {
	THREE_DAY: {
		rinkeby: '0xC3890c4Dac5D06C4DAA2eE3Fdc95eC1686A4718e',
		mainnet: '0x4b9f876c7Fc5f6DEF8991fDe639b2C812a85Fb12'
	},
	SEVEN_DAY: {
		rinkeby: '0x69f9aAC8e68cBa3685b84A1990a0F29F131Ca791',
		mainnet: '0x642EFF5259624FD09D021AB764a4b47d1DbD5770'
	}
};

export function ballotStrategies(networkAlias: string) {
	return [
		{
			name: `No strategy`,
			description: `Any reconfiguration to an upcoming funding cycle will take effect once the current cycle ends. A project with no strategy may be vulnerable to being rug-pulled by its owner.`,
			address: constants.AddressZero
		},
		{
			name: `3-day delay`,
			description: `A reconfiguration to an upcoming funding cycle must be submitted at least 3 days before it starts.`,
			address: BALLOT_ADDRESSES.THREE_DAY[networkAlias]
		},
		{
			name: `7-day delay`,
			description: `A reconfiguration to an upcoming funding cycle must be submitted at least 7 days before it starts.`,
			address: BALLOT_ADDRESSES.SEVEN_DAY[networkAlias]
		}
	];
}

export const getDefaultBallotStrategy = (): BallotStrategy =>
	ballotStrategies(readNetwork.get().alias)[1];
