import { i18n } from 'lingui_core/esm/index.js';
import { detect, fromUrl, fromStorage, fromNavigator } from '@lingui/detect-locale';
import { en, zh, ru, tr, es, pt, fr } from 'make-plural/plurals';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '$constants/locale';
import type { Messages } from '@lingui/core';

// load plural configs
i18n.loadLocaleData({
	en: { plurals: en },
	zh: { plurals: zh },
	ru: { plurals: ru },
	tr: { plurals: tr },
	pt: { plurals: pt },
	es: { plurals: es },
	fr: { plurals: fr }
});

const getLocale = (): string => {
	let locale = detect(fromUrl('lang'), fromStorage('lang'), fromNavigator()) ?? DEFAULT_LOCALE;

	if (!SUPPORTED_LOCALES.includes(locale)) {
		locale = DEFAULT_LOCALE;
	}

	return locale;
};

const activateDefaultLocale = async () => {
	const { messages }: { messages: Messages } = await import(
		`../../locales/${DEFAULT_LOCALE}/messages.ts`
	);
	i18n.load(DEFAULT_LOCALE, messages);
	i18n.activate(DEFAULT_LOCALE);
};

export const dynamicActivateLocale = async (locale: string) => {
	try {
		const { messages }: { messages: Messages } = await import(
			`../../locales/${locale}/messages.ts`
		);
		i18n.load(locale, messages);
		i18n.activate(locale);
	} catch (e) {
		console.error(`Error loading locale "${locale}:"`, e);
		// fall back to default locale
		activateDefaultLocale();
	}
};

export function loadLocale() {
	// Should probably be done onMount in a wrapper component
	const locale = getLocale();
	if (locale === DEFAULT_LOCALE) {
		return activateDefaultLocale();
	}
	dynamicActivateLocale(locale);
}

// export default function LanguageProvider({
//   children,
// }: {
//   children: ReactNode
// }) {
//   useEffect(() => {
//     const locale = getLocale()
//     if (locale === DEFAULT_LOCALE) {
//       return activateDefaultLocale()
//     }

//     dynamicActivateLocale(locale)
//   }, [])

//   return <I18nProvider i18n={i18n}>{children}</I18nProvider>
// }

export function getText([key]: TemplateStringsArray) {
	return i18n.messages[key];
}

export function toLocaleText(text: string, props?: Record<string, string>) {
	return i18n._(text, props || {});
}
