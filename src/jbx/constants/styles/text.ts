import type { SemanticTheme } from 'models/semantic-theme/theme';
import type * as CSS from 'csstype';

export const textSecondary = (theme: SemanticTheme): CSS.Properties => ({
	textTransform: 'uppercase',
	color: theme.colors.text.tertiary,
	fontSize: '0.8rem',
	fontWeight: 500
});

export const textPrimary: CSS.Properties = {
	fontWeight: 500,
	fontSize: '1.1rem',
	lineHeight: 1
};
