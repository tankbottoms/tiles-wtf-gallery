import {
	format,
	addMinutes,
	getUnixTime,
	isAfter,
	isEqual,
	isBefore,
	differenceInSeconds,
	parseISO,
	add
} from 'date-fns';

/**
 * Wholly taken from https://github.com/monosux/ethereum-block-by-date/blob/master/src/ethereum-block-by-date.js
 * and rewritten to use date-fns
 *
 * :WIP: This is a work in progress.
 */

function toUTC(date: Date) {
	console.log(date);
	return format(addMinutes(date, date.getTimezoneOffset()), 'yyyy-MM-dd HH:mm:ss');
}

function isSameOrAfter(date1, date2) {
	return isEqual(date1, date2) || isAfter(date1, date2);
}

function isSameOrBefore(date1, date2) {
	return isEqual(date1, date2) || isBefore(date1, date2);
}

export class EthereumBlockByDate {
	web3: any;
	checkedBlocks: Record<string, unknown>;
	savedBlocks: Record<string, unknown>;
	requests: number;
	latestBlock: any;
	firstBlock: any;
	blockTime: number;

	constructor(web3) {
		this.web3 = typeof web3.eth != 'undefined' ? web3 : { eth: web3 };
		this.checkedBlocks = {};
		this.savedBlocks = {};
		this.requests = 0;
	}

	async getBoundaries() {
		this.latestBlock = await this.getBlockWrapper('latest');
		this.firstBlock = await this.getBlockWrapper(1);
		this.blockTime =
			(parseInt(this.latestBlock.timestamp, 10) - parseInt(this.firstBlock.timestamp, 10)) /
			(parseInt(this.latestBlock.number, 10) - 1);
	}

	async getDate(date, after = true, refresh = false) {
		// date = toUTC(date);
		if (
			typeof this.firstBlock == 'undefined' ||
			typeof this.latestBlock == 'undefined' ||
			typeof this.blockTime == 'undefined' ||
			refresh
		)
			await this.getBoundaries();
		const firstBlockUnix = getUnixTime(this.firstBlock.timestamp);
		const latestBlockUnix = getUnixTime(this.latestBlock.timestamp);
		if (isBefore(date, firstBlockUnix)) return this.returnWrapper(format(date, 'dd-MM-yyyy'), 1);
		if (isEqual(date, latestBlockUnix) || isAfter(date, latestBlockUnix))
			return this.returnWrapper(format(date, 'dd-MM-yyyy'), this.latestBlock.number);
		this.checkedBlocks[getUnixTime(date)] = [];
		const predictedBlock = await this.getBlockWrapper(
			Math.ceil(
				differenceInSeconds(date, getUnixTime(this.firstBlock.timestamp), 'seconds') /
					this.blockTime
			)
		);
        console.log(date)
		return this.returnWrapper(
			// format(date, 'dd-MM-yyyy'),
            date,
			await this.findBetter(date, predictedBlock, after)
		);
	}

	async getEvery(duration, start, end, every = 1, after = true, refresh = false) {
		let current = parseISO(start);
		const dates = [];
		console.log(current);
		console.log(end);
		console.log(current);
		console.log(parseISO(end));
		let maxCount = 0;
		while (isSameOrBefore(current, parseISO(end)) && maxCount < 50) {
			dates.push(format(current, 'dd-MM-yyyy'));
			current = add(current, { [duration]: every });
			console.log(dates);
			maxCount++;
		}
		if (
			typeof this.firstBlock == 'undefined' ||
			typeof this.latestBlock == 'undefined' ||
			typeof this.blockTime == 'undefined' ||
			refresh
		)
			await this.getBoundaries();
		return await Promise.all(dates.map(date => this.getDate(date, after)));
	}

	async findBetter(date, predictedBlock, after, blockTime = this.blockTime) {
		if (await this.isBetterBlock(date, predictedBlock, after)) return predictedBlock.number;
		const difference = differenceInSeconds(date, getUnixTime(predictedBlock.timestamp));
		let skip = Math.ceil(difference / (blockTime == 0 ? 1 : blockTime));
		if (skip == 0) skip = difference < 0 ? -1 : 1;
		const nextPredictedBlock = await this.getBlockWrapper(
			this.getNextBlock(date, predictedBlock.number, skip)
		);
		blockTime = Math.abs(
			(parseInt(predictedBlock.timestamp, 10) - parseInt(nextPredictedBlock.timestamp, 10)) /
				(parseInt(predictedBlock.number, 10) - parseInt(nextPredictedBlock.number, 10))
		);
		return this.findBetter(date, nextPredictedBlock, after, blockTime);
	}

	async isBetterBlock(date, predictedBlock, after) {
		const blockTime = getUnixTime(predictedBlock.timestamp);
		if (after) {
			if (isBefore(blockTime, date)) return false;
			const previousBlock = await this.getBlockWrapper(predictedBlock.number - 1);
			if (isSameOrAfter(blockTime, date) && isBefore(getUnixTime(previousBlock.timestamp), date))
				return true;
		} else {
			if (isSameOrAfter(blockTime, date)) return false;
			let nextBlock = await this.getBlockWrapper(predictedBlock.number + 1);
			if (isBefore(blockTime, date) && isSameOrAfter(getUnixTime(nextBlock.timestamp), date))
				return true;
		}
		return false;
	}

	getNextBlock(date, currentBlock, skip) {
		let nextBlock = currentBlock + skip;
		if (nextBlock > this.latestBlock.number) nextBlock = this.latestBlock.number;
		if (this.checkedBlocks[getUnixTime(date)].includes(nextBlock))
			return this.getNextBlock(date, currentBlock, skip < 0 ? --skip : ++skip);
		this.checkedBlocks[getUnixTime(date)].push(nextBlock);
		return nextBlock < 1 ? 1 : nextBlock;
	}

	returnWrapper(date, block) {
		return { date: date, block: block, timestamp: this.savedBlocks[block].timestamp };
	}

	async getBlockWrapper(block) {
		if (this.savedBlocks[block]) return this.savedBlocks[block];
		const { number, timestamp } = await this.web3.eth.getBlock(block);
		this.savedBlocks[number] = {
			timestamp,
			number
		};
		this.requests++;
		return this.savedBlocks[number];
	}
}
