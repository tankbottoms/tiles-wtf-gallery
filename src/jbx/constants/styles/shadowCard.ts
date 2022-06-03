import type { SemanticTheme } from 'models/semantic-theme/theme';
import type * as CSS from 'csstype';

export const shadowCard = (theme: SemanticTheme): CSS.Properties => ({
	background: theme.colors.background.l2,
	boxShadow: '10px 10px ' + theme.colors.background.l1,
	borderRadius: theme.radii.lg,
	stroke: 'none'
});
