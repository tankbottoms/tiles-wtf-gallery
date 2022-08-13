import { SHA256, PBKDF2, algo, enc, lib } from 'crypto-js';
import { Buffer } from 'buffer';

import WORD_LIST from '../constants/word-list.json';

function bytesToBinary(bytes: number[]): string {
	return bytes
		.map((x: number) => {
			return x.toString(2).padStart(8, '0');
		})
		.join('');
}

function binaryToByte(bin: string): number {
	return parseInt(bin, 2);
}

function deriveChecksumBits(entropyBuffer: any): string {
	const CS: number = (entropyBuffer.length * 8) / 32;
	const hash = SHA256(lib.WordArray.create(entropyBuffer));
	const buffer: Buffer = Buffer.from(hash.toString(enc.Hex), 'hex');
	return bytesToBinary(Array.from(buffer)).slice(0, CS);
}

export function generateMnemonic(entropy: any): string {
	const entropyBits = bytesToBinary(Array.from(entropy));
	const checksumBits = deriveChecksumBits(entropy);

	const bits: string = entropyBits + checksumBits;

	const chunks: string[] = bits.match(/(.{1,11})/g)!;
	return chunks!
		.map((binary: any) => {
			return WORD_LIST[binaryToByte(binary)];
		})
		.join(' ');
}

export function mnemonicToSeed(mnemonic: string, password: string = ''): Buffer {
	return Buffer.from(
		PBKDF2(mnemonic, 'mnemonic' + password, {
			keySize: 16,
			hasher: algo.SHA512,
			iterations: 2048
		}).toString(enc.Hex),
		'hex'
	);
}

export function mnemonicToEntropy(mnemonic: string): string | null {
	const words: string[] = mnemonic.split(' ');
	const bits = words
		.map((word: string) => {
			const index: number = WORD_LIST.indexOf(word);
			return index.toString(2).padStart(11, '0');
		})
		.join('');

	const dividerIndex: number = Math.floor(bits.length / 33) * 32;
	const entropyBits: string = bits.slice(0, dividerIndex);
	const checksumBits: string = bits.slice(dividerIndex);

	const entropyBytes: number[] = entropyBits.match(/(.{1,8})/g)!.map(binaryToByte);

	// Mnemonic length must be divisible by 4.
	if (entropyBytes.length % 4 !== 0) return null;

	const entropy: Buffer = Buffer.from(entropyBytes);
	const newChecksum: string = deriveChecksumBits(entropy);

	// Mnemonic must have a valid checksum.
	if (newChecksum !== checksumBits) return null;
	return entropy.toString('hex');
}
