'use client';

import { useTranslations } from 'next-intl';
import GoogleMap from './GoogleMap';
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Contact() {
  const t = useTranslations('contact');
  
  // Parallax effects for header and subtext
  const { parallaxOffset: headerParallax } = useParallax({ speed: 0.3 });
  const { parallaxOffset: subtextParallax } = useParallax({ speed: 0.4 });
  
  // Scroll reveal effects
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { isVisible: subtextVisible, elementRef: subtextRef } = useScrollReveal({ threshold: 0.2, delay: 200 });
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollReveal({ threshold: 0.1, delay: 400 });

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            ref={headerRef}
            className={`text-4xl font-serif text-gray-900 mb-4 transition-all duration-700 transform ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{ transform: `translateY(${headerVisible ? headerParallax : -32}px)` }}
          >
            {t('title')}
          </h2>
          <p 
            ref={subtextRef}
            className={`text-lg text-gray-600 transition-all duration-700 transform ${
              subtextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
            style={{ transform: `translateY(${subtextVisible ? subtextParallax : -32}px)` }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`max-w-6xl mx-auto transition-all duration-1000 transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 md:col-span-1">
              <h3 className="text-2xl font-serif text-gray-900 mb-6">{t('info.getInTouch')}</h3>
              
              <div className="space-y-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('info.address')}</h4>
                  <p className="text-gray-600">
                    {t('info.addressValue')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('info.phone')}</h4>
                  <p className="text-gray-600">{t('info.phoneValue')}</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('info.email')}</h4>
                  <p className="text-gray-600">{t('info.emailValue')}</p>
                </div>
              </div>

              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 md:col-span-2">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('location-title')}</h4>
              <GoogleMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}