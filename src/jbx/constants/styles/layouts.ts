import type * as CSS from 'csstype';

import { padding } from './padding';

// TODO probably remove this file
export const layouts: Record<string, CSS.Properties> = {
	centered: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	maxWidth: {
		maxWidth: '1080px',
		margin: '0 auto',
		padding: padding.app
	}
};
