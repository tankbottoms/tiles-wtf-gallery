import type { API, CustomNotificationObject } from 'bnc-notify';
import Store from './Store';

export const notify = new Store<API>();

export const createCustomNotification = (object: CustomNotificationObject) => {
	return notify.get().notification(object);
};
