import { BigNumber, utils } from 'ethers';

const TILE_BASE_PRICE = BigNumber.from(utils.parseEther('0.0001'));
const TILE_MULTIPLIER = 2;
const TILE_TIER_SIZE = 512;

export { TILE_BASE_PRICE, TILE_MULTIPLIER, TILE_TIER_SIZE };
