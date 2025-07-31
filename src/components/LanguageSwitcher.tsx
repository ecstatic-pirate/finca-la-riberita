'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    // Get the path without the current locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale segment
    return segments.join('/');
  };

  return (
    <div className="flex gap-2">
      <Link
        href={getLocalizedPath('es')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'es'
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        ES
      </Link>
      <Link
        href={getLocalizedPath('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-primary-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        EN
      </Link>
    </div>
  );
}