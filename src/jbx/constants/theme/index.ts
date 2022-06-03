import { SemanticTheme } from '$jbx/models/semantic-theme/theme';

import { ThemeOption } from '$jbx/constants/theme/theme-option';

import { juiceThemeColors } from './colors';
import { juiceRadii } from './radius';

export const juiceTheme = (themeOption: ThemeOption): SemanticTheme => ({
	colors: juiceThemeColors(themeOption),
	radii: juiceRadii
});
