export enum V2BallotState {
	'Active' = 0,
	'Approved' = 1,
	'Failed' = 2
}

export type BallotStrategy = {
	address: string;
	name: string;
	description?: string;
	unknown?: boolean;
};
