import { SemanticColors } from '$jbx/models/semantic-theme/colors';

import { ThemeOption } from '$jbx/constants/theme/theme-option';

export const boxShadow: Record<ThemeOption, SemanticColors['boxShadow']> = {
	[ThemeOption.light]: { primary: 'rgba(0, 0, 0, 0.1)' },
	[ThemeOption.dark]: { primary: '#000000' }
};
