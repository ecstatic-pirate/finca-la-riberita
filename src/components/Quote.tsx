'use client';

import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTranslations } from 'next-intl';

export default function Quote() {
  const t = useTranslations('quote');
  
  // Parallax effect for the entire section
  const { parallaxOffset } = useParallax({ speed: 0.3 });
  
  // Scroll reveal effects
  const { isVisible: quoteVisible, elementRef: quoteRef } = useScrollReveal({ threshold: 0.3 });
  const { isVisible: authorVisible, elementRef: authorRef } = useScrollReveal({ threshold: 0.3, delay: 400 });

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Subtle background texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-primary-50" />
      </div>
      
      {/* Main content */}
      <div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote text */}
          <div 
            ref={quoteRef}
            className={`transition-all duration-1000 transform ${
              quoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <blockquote>
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif leading-relaxed text-gray-900 mb-12">
              <span className="text-primary-500">"</span>
              {t('text')}
              <span className="text-primary-500">"</span>
            </p>
            </blockquote>
          </div>
          
          {/* Author */}
          <cite 
            ref={authorRef}
            className={`block transition-all duration-1000 transform ${
              authorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-xl md:text-2xl font-light text-primary-600 tracking-wider">
              — {t('author')}
            </span>
          </cite>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary-200">
          <path
            d="M10,50 Q30,10 50,50 T90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary-200">
          <path
            d="M10,50 Q30,10 50,50 T90,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </section>
  );
}