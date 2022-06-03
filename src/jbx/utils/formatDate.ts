import { BigNumber } from '@ethersproject/bignumber';
import type { BigNumberish } from 'ethers';
import { i18n } from 'lingui_core/esm/index.js';
// TODO can't get macro to work outside of svelte components
// import { t } from '@lingui/macro'

import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (dateMillis: BigNumberish, formatStr = 'yyyy-MM-dd h:mma') =>
	format(BigNumber.from(dateMillis).toNumber(), formatStr);

export function formatHistoricalDate(dateMillis: BigNumberish) {
	const props = {
		time: formatDistanceToNow(BigNumber.from(dateMillis).toNumber())
	};
	return props.time;

	// TODO this i18n translation doesn't work on IPFS
	//return (
		// <Tooltip title={`${formatDate(dateMillis)} UTC`}>
		//i18n._(`{time} ago`, props)
		// t`${formatDistanceToNow(BigNumber.from(dateMillis).toNumber())} ago`
		// </Tooltip>
	//);
}

/**
 * Takes a date and converts it to a date in the format 'yyyy-MM-dd'
 * @param date
 * @returns date
 */
export function dateToDateInput(date: Date) {
	return date.toISOString().split('T')[0];
}

/**
 * Convert a date to Epoch time in seconds.
 * @param date
 * @returns Epoch time in seconds
 */
export const toDateSeconds = (date: Date) => {
	return Math.floor(date.valueOf() / 1000);
};
