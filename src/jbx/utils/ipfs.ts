import type { PinataMetadata, PinataPinResponse } from 'pinata_ipfs_sdk';
import pinataClient from 'pinata_ipfs_sdk/src/index.js';
import axios from 'axios';
import type { IpfsCacheJsonData } from '$jbx/models/ipfs-cache/cache-data';
import { IpfsCacheName } from '$jbx/models/ipfs-cache/cache-name';
import { consolidateMetadata, type ProjectMetadataV4 } from '$jbx/models/project-metadata';
import { readNetwork } from '$stores/web3';
import { IPFS_GATEWAY_HOSTNAME } from '$jbx/constants/ipfs';
import { dev } from '$app/env';
import { IPFS_FIREBASE_CLOUD_FUNCTION } from '$jbx/constants/firebase';
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

// keyvalues will be upserted to existing metadata. A null value will remove an existing keyvalue
export const editMetadataForCid = (cid: string | undefined, options?: PinataMetadata) =>
	cid ? pinata.hashMetadata(cid, { ...options }) : undefined;

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
	return `${IPFS_FIREBASE_CLOUD_FUNCTION}?cid=${cid}`;
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

export const unpinIpfsFileByCid = (cid: string | undefined) =>
	cid
		? pinata.unpin(cid).catch((err) => {
				console.error('Failed to unpin file ', cid, err);
		  })
		: Promise.reject();

export const uploadProjectMetadata = (
	metadata: Omit<ProjectMetadataV4, 'version'>,
	handle?: string
) =>
	pinata.pinJSONToIPFS(consolidateMetadata(metadata), {
		pinataMetadata: {
			keyvalues: {
				tag: IPFS_TAGS.METADATA
			} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
			name: handle ? metadataNameForHandle(handle) : 'juicebox-project-metadata.json'
		}
	});

export const uploadIpfsJsonCache = <T extends IpfsCacheName>(tag: T, data: IpfsCacheJsonData[T]) =>
	pinata.pinJSONToIPFS(data, {
		pinataMetadata: {
			keyvalues: {
				tag: IPFS_TAGS[tag]
			} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
			name: IPFS_TAGS[tag] + '.json'
		}
	});

export const getPinnedListByTag = (tag: keyof typeof IPFS_TAGS) =>
	pinata.pinList({
		pageLimit: 1000,
		status: 'pinned',
		metadata: {
			keyvalues: {
				tag: {
					value: IPFS_TAGS[tag],
					op: 'eq'
				}
			}
		}
	});
