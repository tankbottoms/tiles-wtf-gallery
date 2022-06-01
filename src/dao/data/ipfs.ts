import axios from 'axios';
import type { IpfsCacheName } from '$models/ipfs-cache/cache-name';
import type { IpfsCacheData, IpfsCacheJsonData } from '$models/ipfs-cache/cache-data';
import { getPinnedListByTag, ipfsCidUrl, unpinIpfsFileByCid } from '$utils/ipfs';

export type IpfsCacheOpts<T extends IpfsCacheName> = {
	ttl: number;
	deserialize?: (x: IpfsCacheJsonData[T]) => IpfsCacheData[T];
};

function unpinGivenList(list: { rows: any[] }, isExpired: boolean) {
	// Unpin cache files, including latest if expired
	// There should never be more than one cache file to unpin. But during high traffic it may be possible for multiple unique cache files to be uploaded by different users simultaneously
	list.rows.slice(isExpired ? 0 : 1).reduce(
		async (_, row) =>
			// Await sequential requests, as simultaenous requests may be rate limited by Pinata api endpoint
			await unpinIpfsFileByCid(row.ipfs_pin_hash),
		Promise.resolve()
	);
}

export async function getIpfsCache<T extends IpfsCacheName>(
	tag: T,
	opts: IpfsCacheOpts<T> = { ttl: 12 }
) {
	const list = await getPinnedListByTag(tag);
	if (!list.count || !list.rows.length) {
		console.log('No cache exists for tag', tag);
		return;
	}

	const latest = list.rows[0];
	// TODO account for ipfscache options like ttl unit, atm only minutes
	const isExpired = (Date.now() - Date.parse(latest.date_pinned)) / 1000 > opts.ttl * 60;

	if (isExpired) {
		unpinGivenList(list, isExpired);
		return;
	}

	// Get data from latest cache if not expired
	const data: { data: IpfsCacheJsonData[IpfsCacheName] } = await axios.get(
		ipfsCidUrl(latest.ipfs_pin_hash)
	);

	const deserializeData = opts?.deserialize
		? opts.deserialize(data.data)
		: (data.data as unknown as IpfsCacheData[T]);

	unpinGivenList(list, isExpired);

	return deserializeData;
}
