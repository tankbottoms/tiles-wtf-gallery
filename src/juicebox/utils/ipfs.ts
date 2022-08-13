import type { PinataMetadata, PinataPinResponse } from 'pinata_ipfs_sdk';
import axios from 'axios';
import pinataClient from 'pinata_ipfs_sdk/src/index.js';
import { IpfsCacheName } from '$juicebox/models/ipfs-cache/cache-name';
import { consolidateMetadata, type ProjectMetadataV4 } from '$juicebox/models/project-metadata';
import { readNetwork } from '$stores/web3';
import { IPFS_GATEWAY_HOSTNAME } from '$juicebox/constants/ipfs';
import { dev } from '$app/env';
import { get } from 'svelte/store';

const pinata_api_key = import.meta.env.VITE_PINATA_PINNER_KEY as string;
const pinata_secret_api_key = import.meta.env.VITE_PINATA_PINNER_SECRET as string;

if (!pinata_api_key || !pinata_secret_api_key) {
	throw new Error(
		'Missing .env vars REACT_APP_PINATA_PINNER_KEY or REACT_APP_PINATA_PINNER_SECRET'
	);
}
const pinata = pinataClient(pinata_api_key, pinata_secret_api_key);

export const IPFS_TAGS = {
	[IpfsCacheName.trendingV2]: `${dev ? 'DEV_trending_projects_v2_' : 'trending_projects_v2_'}${
		get(readNetwork).alias
	}`,

	METADATA: dev ? 'DEV_juicebox_project_metadata' : 'juicebox_project_metadata',

	LOGO: dev ? 'DEV_juicebox_project_logo' : 'juicebox_project_logo'
};

export const logoNameForHandle = (handle: string) => `juicebox-@${handle}-logo`;

export const metadataNameForHandle = (handle: string) => `juicebox-@${handle}-metadata`;

export const ipfsCidUrl = (hash: string) => {
	hash = hash.match(/\/ipfs\/\w+$/) ? hash.match(/\w+$/)?.[0] : hash;
	return `https://${IPFS_GATEWAY_HOSTNAME}/ipfs/${hash}`;
};

export const ipfsUrlToCid = (url: string) => {
	return url.replace(/^https:\/\/[^/]+\/ipfs\//, '');
};

export const ipfsCidToFirebaseUrl = (cid: string) => {
	return `${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/ipfs/${cid}`;
};

export const cidFromUrl = (url: string | undefined) => url?.split('/').pop();

export const pinFileToIpfs = (file: File | Blob | string, metadata?: PinataMetadata) => {
	let data = new FormData();

	data.append('file', file);

	if (metadata) {
		data.append(
			'pinataMetadata',
			JSON.stringify({
				keyvalues: metadata
			})
		);
	}

	// We use axios here because using `pinata.pinFileToIPFS()` leads to this issue: https://github.com/PinataCloud/Pinata-SDK/issues/84
	return axios
		.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
			maxContentLength: Infinity, //this is needed to prevent axios from erroring out with large files
			headers: {
				'Content-Type': `multipart/form-data;`,
				pinata_api_key,
				pinata_secret_api_key
			}
		})
		.then((res) => res.data as PinataPinResponse);
};

export const uploadProjectMetadata = (
	metadata: Omit<ProjectMetadataV4, 'version'>,
	handle?: string
) => {
	const file = new File(
		[JSON.stringify(consolidateMetadata(metadata), null, '  ')],
		handle ? metadataNameForHandle(handle) : 'juicebox-project-metadata.json'
	);
	return pinFileToIpfs(file);
};
