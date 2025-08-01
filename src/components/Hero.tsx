'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParallax } from '@/hooks/useParallax';

export default function Hero() {
  const [greetingKey, setGreetingKey] = useState('morning');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const t = useTranslations('hero');
  const locale = useLocale();
  
  // Parallax effect for content only
  const { parallaxOffset: contentParallax } = useParallax({ speed: 0.2 });

  useEffect(() => {
    // Set greeting based on time of day - only on client side
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreetingKey('morning');
    else if (hour >= 12 && hour < 18) setGreetingKey('afternoon');
    else setGreetingKey('evening');
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0"
      >
        {/* Fallback image while video loads */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg">Loading...</div>
            </div>
          </div>
        )}
        
        {/* YouTube Video Background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden'
        }}>
          <iframe
            src="https://www.youtube.com/embed/1vmSTddyzvw?autoplay=1&mute=1&loop=1&playlist=1vmSTddyzvw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'calc(100vw + 400px)',
              height: 'calc(100vh + 400px)',
              transform: 'translate(-50%, -50%) scale(1.4)',
              border: 'none',
              pointerEvents: 'none'
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setVideoLoaded(true)}
            title="Hero Background Video"
          />
        </div>
        
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
              {t(`greetings.${greetingKey}`)}
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

          {/* Enhanced CTA with hover animation */}
          <div className="flex justify-center mb-12">
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
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <span className="relative z-10">{t('cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>

        </div>
      </div>


      {/* Floating scroll indicator */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 font-light block">{t('discoverMore')}</span>
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