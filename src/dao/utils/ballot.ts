// import { t } from '@lingui/macro';
import type { BallotStrategy } from '$models/ballot';

export const createCustomStrategy = (address: string): BallotStrategy => ({
	address,
	name: `Custom strategy`,
	description: `This address is an unrecognized strategy contract. Make sure it is correct!`,
	unknown: true
});

// export const createCustomStrategy = (address: string): BallotStrategy => ({
// 	address,
// 	name: t`Custom strategy`,
// 	description: t`This address is an unrecognized strategy contract. Make sure it is correct!`,
// 	unknown: true
// });
