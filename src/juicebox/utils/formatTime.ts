import { BigNumber } from '@ethersproject/bignumber';
import type { BigNumberish } from 'ethers';

import { SECONDS_IN_DAY, SECONDS_IN_HOUR } from '$juicebox/constants/numbers';
import type { DurationUnitsOption } from '$juicebox/constants/time';

export function detailedTimeString({
	timeSeconds,
	roundToMinutes
}: {
	timeSeconds?: BigNumberish;
	roundToMinutes?: boolean;
}) {
	const timeSecondsNumber = BigNumber.from(timeSeconds).toNumber();

	const days = Math.floor(timeSecondsNumber / 60 / 60 / 24);
	const hours = (timeSecondsNumber / 60 / 60) % 24;
	const minutes = (timeSecondsNumber / 60) % 60;
	const seconds = timeSecondsNumber % 60;

	const daysText = `${days && days > 0 ? days.toString() + 'd ' : ''}`;
	const hoursText = `${hours && hours >= 1 ? Math.floor(hours) + 'h ' : ''}`;
	const minutesText = `${minutes && minutes >= 1 ? Math.floor(minutes) + 'm ' : ''}`;
	const secondsText = `${seconds && seconds > 0 && !roundToMinutes ? Math.floor(seconds) + 's' : ''
		}`;

	return `${daysText}${hoursText}${minutesText}${secondsText}`.trimEnd() || '--';
}

export function detailedTimeUntil(endTimeSeconds?: BigNumberish) {
	const nowSeconds = Math.floor(Date.now().valueOf() / 1000);
	const secondsLeft = BigNumber.from(endTimeSeconds).sub(Math.floor(nowSeconds)).toNumber();

	return detailedTimeString({
		timeSeconds: secondsLeft,
		roundToMinutes: secondsLeft > 120
	});
}

export const secondsToDays = (seconds: number) => seconds / SECONDS_IN_DAY;

export const otherUnitToSeconds = ({
	duration,
	unit
}: {
	duration: number;
	unit: DurationUnitsOption;
}) => {
	switch (unit) {
		case 'days':
			return duration * SECONDS_IN_DAY;
		case 'hours':
			return duration * SECONDS_IN_HOUR;
		case 'minutes':
			return duration * 60;
		default:
			return duration;
	}
};

export const secondsToOtherUnit = ({
	duration,
	unit
}: {
	duration: number;
	unit: DurationUnitsOption;
}) => {
	switch (unit) {
		case 'days':
			return duration / SECONDS_IN_DAY;
		case 'hours':
			return duration / SECONDS_IN_HOUR;
		case 'minutes':
			return duration / 60;
		default:
			return duration;
	}
};

export const convertTime = ({
	duration,
	fromUnit,
	toUnit
}: {
	duration: number;
	fromUnit: DurationUnitsOption;
	toUnit: DurationUnitsOption;
}) => {
	const durationInSeconds = otherUnitToSeconds({ duration, unit: fromUnit });

	return secondsToOtherUnit({ duration: durationInSeconds, unit: toUnit });
};

export const deriveDurationUnit = (durationSeconds: number | undefined): DurationUnitsOption => {
	// Default to days
	if (!durationSeconds || durationSeconds === 0) return 'days';

	// Less that 1 min
	if (durationSeconds < 60) {
		return 'seconds';
	} else if (durationSeconds < SECONDS_IN_HOUR) {
		return 'minutes';
	} else if (durationSeconds < SECONDS_IN_DAY * 3) {
		return 'hours';
	}
	return 'days';
};
