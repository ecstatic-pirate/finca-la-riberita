'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    name: 'Sarah & Michael',
    date: 'June 2023',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200',
    text: 'Riberita exceeded all our expectations! The venue was absolutely stunning, and the staff went above and beyond to make our day perfect. We couldn\'t have asked for a better wedding venue.'
  },
  {
    name: 'Emily & David',
    date: 'September 2023',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200',
    text: 'From the moment we toured Riberita, we knew it was the one. The gardens provided the most romantic backdrop, and the ballroom was elegant beyond words. Our guests are still talking about it!'
  },
  {
    name: 'Jessica & Ryan',
    date: 'December 2023',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=200',
    text: 'The team at Riberita made planning our wedding a breeze. They were professional, attentive, and truly cared about making our vision come to life. It was the fairy tale wedding we always dreamed of.'
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const t = useTranslations('testimonials');
  
  // Parallax effects for header and subtext
  const { parallaxOffset: headerParallax } = useParallax({ speed: 0.3 });
  const { parallaxOffset: subtextParallax } = useParallax({ speed: 0.4 });
  
  // Scroll reveal effects
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { isVisible: subtextVisible, elementRef: subtextRef } = useScrollReveal({ threshold: 0.2, delay: 200 });
  const { isVisible: cardVisible, elementRef: cardRef } = useScrollReveal({ threshold: 0.1, delay: 400 });

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="max-w-4xl mx-auto">
          <div 
            ref={cardRef}
            className={`bg-gray-50 rounded-lg p-8 md:p-12 shadow-lg transition-all duration-1000 transform ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </div>

            <blockquote className="text-center">
              <p className="text-xl text-gray-700 italic mb-6">
                "{testimonials[currentTestimonial].text}"
              </p>
              <footer>
                <p className="text-lg font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].date}
                </p>
              </footer>
            </blockquote>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}