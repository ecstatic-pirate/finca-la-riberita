'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParallax } from '@/hooks/useParallax';

const heroContent = [
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600',
    alt: 'Beautiful wedding venue exterior',
    title: 'Your Forever Begins Here',
    subtitle: 'Where Love Stories Become Legends',
    moment: 'The First Look'
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600',
    alt: 'Elegant wedding reception hall',
    title: 'Celebrate Your Journey',
    subtitle: 'In Elegance Beyond Imagination',
    moment: 'The Celebration'
  },
  {
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600',
    alt: 'Romantic outdoor wedding setup',
    title: 'Dream Without Limits',
    subtitle: 'Create Memories That Last Forever',
    moment: 'The Promise'
  }
];

const storyMoments = [
  { label: 'The Proposal', icon: '💍', description: 'Where it all began' },
  { label: 'The Planning', icon: '💕', description: 'Bringing dreams to life' },
  { label: 'The Day', icon: '✨', description: 'Your perfect moment' },
  { label: 'Forever', icon: '🥂', description: 'The story continues' }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeStoryMoment, setActiveStoryMoment] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('');
  const t = useTranslations('hero');
  
  // Parallax effects for different layers
  const { parallaxOffset: bgParallax, elementRef: bgRef } = useParallax({ speed: 0.5 });
  const { parallaxOffset: contentParallax } = useParallax({ speed: 0.2 });

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good Morning');
    else if (hour < 17) setTimeOfDay('Good Afternoon');
    else setTimeOfDay('Good Evening');

    // Auto-advance slides
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 6000);

    // Auto-advance story moments
    const storyTimer = setInterval(() => {
      setActiveStoryMoment((prev) => (prev + 1) % storyMoments.length);
    }, 3000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(storyTimer);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Cinematic Background with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${bgParallax}px)` }}
      >
        {heroContent.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>
        ))}
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
              {timeOfDay}
            </span>
          </div>

          {/* Dynamic headline with smooth transitions */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-4 leading-tight">
              <span className="block transition-all duration-1000 ease-in-out">
                {t('title')}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light mb-2 transition-all duration-1000 ease-in-out">
              {t('subtitle')}
            </p>
            <div className="text-lg text-white/70 font-medium tracking-wider uppercase">
              {heroContent[currentSlide].moment}
            </div>
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
              Explore Our Venue
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Interactive Story Timeline */}
          <div className="hidden md:flex justify-center space-x-8 mb-8">
            {storyMoments.map((moment, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${
                  index === activeStoryMoment ? 'scale-110' : 'scale-100 opacity-70'
                }`}
                onClick={() => setActiveStoryMoment(index)}
              >
                <div className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                  index === activeStoryMoment 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'hover:bg-white/10'
                }`}>
                  <div className="text-3xl mb-2">{moment.icon}</div>
                  <div className="text-white font-medium text-sm mb-1">{moment.label}</div>
                  <div className="text-white/70 text-xs text-center max-w-20">{moment.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 font-light">Discover More</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Ambient particles effect (CSS-only) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
}