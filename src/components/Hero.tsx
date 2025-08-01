'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParallax } from '@/hooks/useParallax';

export default function Hero() {
  const [timeOfDay, setTimeOfDay] = useState('Welcome');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const t = useTranslations('hero');
  const locale = useLocale();
  
  // Parallax effects for different layers
  const { parallaxOffset: bgParallax, elementRef: bgRef } = useParallax({ speed: 0.5 });
  const { parallaxOffset: contentParallax } = useParallax({ speed: 0.2 });

  useEffect(() => {
    // Set greeting based on time of day - only on client side
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good Morning');
    else if (hour < 17) setTimeOfDay('Good Afternoon');
    else setTimeOfDay('Good Evening');
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Video Background with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${bgParallax}px)` }}
      >
        {/* Fallback image while video loads */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg">Loading...</div>
            </div>
          </div>
        )}
        
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source 
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
            type="video/mp4" 
          />
          {/* Add your actual video URL above */}
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Main Hero Content with Parallax */}
      <div 
        className="relative h-screen flex items-center justify-center text-center px-4"
        style={{ transform: `translateY(${contentParallax}px)` }}
      >
        <div className="max-w-6xl">
          {/* Time-based greeting */}
          <div className="mb-4 opacity-80">
            <span className="text-white/80 text-lg font-light tracking-wide">
              {timeOfDay} (Locale: {locale})
            </span>
          </div>

          {/* Dynamic headline with smooth transitions */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-4 leading-tight">
              <span className="block transition-all duration-1000 ease-in-out">
                {t('title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light transition-all duration-1000 ease-in-out">
              {t('subtitle')}
            </p>
          </div>

          {/* Enhanced CTAs with hover animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">{t('cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
            <a
              href="#gallery"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
            >
              {t('explore')}
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>


      {/* Floating scroll indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 font-light">{t('discoverMore')}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Ambient particles effect (CSS-only) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: '10%', top: '20%', delay: '0s', duration: '4s' },
          { left: '80%', top: '10%', delay: '0.5s', duration: '4.5s' },
          { left: '25%', top: '80%', delay: '1s', duration: '3.5s' },
          { left: '70%', top: '60%', delay: '1.5s', duration: '5s' },
          { left: '90%', top: '40%', delay: '2s', duration: '3s' },
          { left: '15%', top: '50%', delay: '2.5s', duration: '4s' }
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </section>
  );
}