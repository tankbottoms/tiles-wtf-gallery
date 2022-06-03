import { NetworkName } from '$jbx/models/network-name';

import { readNetwork } from '$stores/web3';
import { get } from 'svelte/store';

export const FEATURE_FLAGS = {
	ENABLE_V2: 'ENABLE_V2'
};

const DEFAULTS: { [k: string]: { [j: string]: boolean } } = {
	[FEATURE_FLAGS.ENABLE_V2]: {
		[NetworkName.rinkeby]: true,
		[NetworkName.mainnet]: false
	}
};

const featureFlagKey = (baseKey: string) => {
	return `${baseKey}_${get(readNetwork).alias}`;
};

export const setFeatureFlag = (featureFlag: string, enabled: boolean) => {
	localStorage.setItem(featureFlagKey(featureFlag), JSON.stringify(enabled));
};

export const enableFeatureFlag = (featureFlag: string) => {
	setFeatureFlag(featureFlag, true);
};

export const disableFeatureFlag = (featureFlag: string) => {
	setFeatureFlag(featureFlag, false);
};

export const featureFlagEnabled = (featureFlag: string) => {
	// if default-enabled for this environment, return trues
	const defaultEnabled = DEFAULTS[featureFlag][get(readNetwork).alias as string];

	try {
		return JSON.parse(localStorage.getItem(featureFlagKey(featureFlag)) || `${defaultEnabled}`);
	} catch (e) {
		return defaultEnabled;
	}
};
