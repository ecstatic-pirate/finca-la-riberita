'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

            <div>
              <div className="relative w-32 h-20 mb-4">
                <Image
                  src="/logo-footer.png"
                  alt="Finca La Riberita Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('navigation.home')}
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('navigation.about')}
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('navigation.gallery')}
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('navigation.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>{t('footer.servicesItems.weddings')}</li>
                <li>{t('footer.servicesItems.corporate')}</li>
                <li>{t('footer.servicesItems.events')}</li>
                <li>{t('footer.servicesItems.catering')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>{t('contact.info.phoneValue')}</p>
                <p>{t('contact.info.emailValue')}</p>
                <p className="break-words">{t('contact.info.addressValue')}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.followUs')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
              </div>
            </div>

        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Finca La Riberita. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}