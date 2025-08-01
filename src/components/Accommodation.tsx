'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect, useRef, useState } from 'react';

export default function Accommodation() {
  const t = useTranslations('accommodation');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects
  const { parallaxOffset: textParallax } = useParallax({ speed: 0.3 });
  const { parallaxOffset: imageParallax } = useParallax({ speed: 0.5 });
  
  // Scroll reveal effects for header and subtext
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { isVisible: subtextVisible, elementRef: subtextRef } = useScrollReveal({ threshold: 0.2, delay: 200 });
  
  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="accommodation" className="py-20 bg-gray-50 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headerRef}
            className={`text-4xl font-serif text-gray-900 mb-4 transition-all duration-700 transform ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            {t('title')}
          </h2>
          <p 
            ref={subtextRef}
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 transform ${
              subtextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Immersive Full-Width Section */}
        <div className="relative mb-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div 
            className={`relative h-[70vh] min-h-[500px] md:h-[80vh] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-1000 shadow-2xl ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0" style={{ transform: `translateY(${imageParallax * 0.5}px)` }}>
              <Image
                src="/images/7.jpg"
                alt={t('imageAlt')}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
                <div 
                  className={`max-w-2xl transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transform: `translateY(${textParallax}px)` }}
                >
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">
                    {t('description')}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
                    {t('details')}
                  </p>
                  <a 
                    href="#booking" 
                    onClick={(e) => {
                      e.preventDefault();
                      const targetElement = document.getElementById('booking');
                      if (targetElement) {
                        const navHeight = 120;
                        const targetPosition = targetElement.offsetTop - navHeight;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-sm text-primary-600 font-semibold rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {t('scheduleTour')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}