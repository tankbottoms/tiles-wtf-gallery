<script lang="ts">
	import axios from 'axios';

	export let address: string;

	$: address && checkAddressInfo(address);

	interface ApiResponse {
		address: string;
		fallbackHandler: string;
		guard: string;
		masterCopy: string;
		modules: [];
		nonce: number;
		owners: string[];
		length: number;
		threshold: number;
		version: string;
	}

	let isGnosis = false;
	let gnosisAddress: string;
	let owners: string[];
	let threshold: number;
	let mastercopy: string;

	const CACHE_KEY = 'gnosis_check';

	function setGet(data?: any): Record<string, ApiResponse> {
		if (data) {
			localStorage.setItem(CACHE_KEY, JSON.stringify(data));
		}
		return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
	}

	async function checkAddressInfo(address: string) {
		const cachedResult = setGet()[address?.toLowerCase()];
		// const { data, status }: { data: ApiResponse; status: number } =
		// 	typeof cachedResult === 'object'
		// 		? { data: cachedResult, status: 200 }
		// 		: await axios.get(
		// 				`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/app/gnosis/check/${address}`,
		// 				{
		// 					headers: {
		// 						apikey: import.meta.env.VITE_API_KEY
		// 					}
		// 				}
		// 		  );
		// if (status < 400) {
		// isGnosis = true;
		// gnosisAddress = address;
		// mastercopy = data.masterCopy;
		// owners = data.owners;
		// threshold = data.threshold;
		// if (typeof cachedResult !== 'object') {
		// 	setGet({ ...setGet(), [address?.toLowerCase()]: data });
		// }
		// } else {
		setGet({ ...setGet(), [address?.toLowerCase()]: {} });
		// }
	}
</script>

<slot {gnosisAddress} {owners} {threshold} {mastercopy} {isGnosis} />
{#if isGnosis}
	<slot name="gnosis" {gnosisAddress} {owners} {threshold} {mastercopy} />
{:else}
	<slot name="not-gnosis" />
{/if}
