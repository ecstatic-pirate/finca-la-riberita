'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Booking() {
  const t = useTranslations('booking');
  
  // Parallax effects for header
  const { parallaxOffset: headerParallax } = useParallax({ speed: 0.3 });
  
  // Scroll reveal effects
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollReveal({ threshold: 0.1, delay: 200 });
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {
        "theme":"light",
        "hideEventTypeDetails":false,
        "layout":"month_view",
        "styles": {
          "branding": {
            "brandColor": "#6b7c42"
          }
        },
        "cssVarsPerTheme": {
          "light": {
            "cal-brand": "#6b7c42", // primary-600
            "cal-brand-emphasis": "#546235", // primary-700
            "cal-brand-text": "#ffffff",
            "cal-brand-subtle": "#f7f8f4", // primary-50
            "cal-bg": "#ffffff",
            "cal-bg-emphasis": "#f9fafb", // gray-50
            "cal-bg-subtle": "#f3f4f6", // gray-100
            "cal-bg-muted": "#e5e7eb", // gray-200
            "cal-border": "#e5e7eb", // gray-200
            "cal-border-emphasis": "#d1d5db", // gray-300
            "cal-border-subtle": "#f3f4f6", // gray-100
            "cal-text": "#111827", // gray-900
            "cal-text-emphasis": "#030712", // gray-950
            "cal-text-subtle": "#6b7280", // gray-500
            "cal-text-muted": "#9ca3af" // gray-400
          },
          "dark": {
            "cal-brand": "#8ca157", // primary-500 (lighter for dark theme)
            "cal-brand-emphasis": "#a6b97a", // primary-400
            "cal-brand-text": "#000000",
            "cal-brand-subtle": "#394327", // primary-900
            "cal-bg": "#111827",
            "cal-bg-emphasis": "#1f2937",
            "cal-bg-subtle": "#374151",
            "cal-bg-muted": "#4b5563",
            "cal-border": "#4b5563",
            "cal-border-emphasis": "#6b7280",
            "cal-border-subtle": "#374151",
            "cal-text": "#f9fafb",
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": "#d1d5db",
            "cal-text-muted": "#9ca3af"
          }
        }
      });
    })();
  }, []);

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`transition-all duration-1000 transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Calendar container with proper spacing and overflow handling */}
          <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
            <div className="cal-booking-wrapper overflow-auto" style={{height: "700px", width: "100%"}}>
              <Cal 
                namespace="30min"
                calLink="la-riberita/30min"
                style={{width:"100%",height:"100%"}}
                config={{
                  "layout":"month_view",
                  "theme":"light"
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}