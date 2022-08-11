import type { BigNumber } from 'ethers';

export enum TokenType {
	ERC20,
	ERC721,
	PROJECT
}

export interface Token {
	type?: TokenType;
	value?: string;
}
export interface Asset extends Token {
	balance?: BigNumber;
	symbol?: string;
}
