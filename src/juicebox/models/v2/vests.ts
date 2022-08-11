export enum PeriodType {
	MONTHS = 'months',
	YEARS = 'years'
}

export type Period = {
	value: string;
	type: PeriodType;
};

export type Vest = {
	recipient: string;
	token: string;
	tokenAmount: string;
	vestingPeriod: Period;
	cliff: Period;
	description: string;
};
