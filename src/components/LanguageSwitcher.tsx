'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    // Get the path without the current locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale segment
    return segments.join('/');
  };

  return (
    <div className="flex items-center gap-1 text-xs">
      <Link
        href={getLocalizedPath('es')}
        className={`px-2 py-1 transition-all duration-200 ${
          locale === 'es'
            ? isScrolled
              ? 'text-primary-600 border-b border-primary-600'
              : 'text-white border-b border-white'
            : isScrolled
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to Spanish"
      >
        ES
      </Link>
      <span 
        className={`text-xs ${
          isScrolled ? 'text-gray-300' : 'text-white/50'
        }`}
        aria-hidden="true"
      >
        /
      </span>
      <Link
        href={getLocalizedPath('en')}
        className={`px-2 py-1 transition-all duration-200 ${
          locale === 'en'
            ? isScrolled
              ? 'text-primary-600 border-b border-primary-600'
              : 'text-white border-b border-white'
            : isScrolled
              ? 'text-gray-500 hover:text-gray-700'
              : 'text-white/70 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </Link>
    </div>
  );
}