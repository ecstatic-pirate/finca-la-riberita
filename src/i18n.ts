import {getRequestConfig} from 'next-intl/server';

const locales = ['es', 'en'] as const;

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    return {
      locale: 'es',
      messages: (await import(`./messages/es.json`)).default
    };
  }

  try {
    return {
      locale: locale as string,
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {
      locale: 'es',
      messages: (await import(`./messages/es.json`)).default
    };
  }
});