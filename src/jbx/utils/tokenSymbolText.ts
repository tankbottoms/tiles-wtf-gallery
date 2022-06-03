// import { t } from '@lingui/macro';

class t {
	static _(arg0: string) {
		console.warn('Not translated utils/tokenSymbolText');
		return arg0;
	}
}

// Function to return {tokenSymbol} and/or 'tokens', translated and (possibly) capitalized
export const tokenSymbolText = ({
	tokenSymbol,
	capitalize,
	plural,
	includeTokenWord
}: {
	tokenSymbol?: string;
	capitalize?: boolean;
	plural?: boolean;
	includeTokenWord?: boolean;
}) => {
	const tokenTextSingular = capitalize ? t._(`Token`) : t._(`token`);
	const tokenTextPlural = capitalize ? t._(`Tokens`) : t._(`tokens`);
	const tokenText = plural ? tokenTextPlural : tokenTextSingular;

	if (includeTokenWord) {
		return tokenSymbol ? `${tokenSymbol} ${tokenText}` : tokenText;
	}

	return tokenSymbol ?? tokenText;
};
