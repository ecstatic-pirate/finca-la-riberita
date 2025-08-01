'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const journeySteps = [
  {
    id: 'lafinca',
    title: 'La Finca',
    subtitle: 'Your Dream Venue',
    description: 'Discover the breathtaking beauty of our estate, where nature and elegance blend to create the perfect setting for your special day.',
    image: '/ChatGPT Image Aug 1, 2025, 04_12_21 AM.png',
    icon: '🏛️',
    venueConnection: 'Our historic finca offers stunning panoramic views and timeless charm for your celebration.',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'celebration',
    title: 'The Celebration',
    subtitle: 'Your Perfect Day',
    description: 'Surrounded by loved ones, you celebrate the beginning of your new chapter in absolute elegance.',
    image: '/images/WhatsApp Image 2025-08-01 at 03.14.50 (3).jpeg',
    icon: '✨',
    venueConnection: 'From intimate ceremonies to grand receptions, our versatile spaces adapt to your dream.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'memories',
    title: 'The Memories',
    subtitle: 'Forever After',
    description: 'Years from now, you\'ll return to these moments and remember every detail of your perfect day.',
    image: '/images/WhatsApp Image 2025-08-01 at 03.14.50 (4).jpeg',
    icon: '🥂',
    venueConnection: 'Join our Riberita family - many couples return for anniversaries and celebrations.',
    color: 'from-emerald-400 to-teal-500'
  }
];

export default function LoveStory() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('love-story');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Auto-advance timeline
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="love-story" className="py-20 bg-gradient-to-br from-slate-50 to-rose-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-5xl font-serif text-gray-900 mb-4">Your Love Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every couple has a unique journey. Let us be part of yours, creating memories that will last a lifetime.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-200 via-purple-200 via-amber-200 to-emerald-200 rounded-full"></div>

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Desktop Layout */}
                {step.id === 'lafinca' ? (
                  /* Immersive La Finca Layout */
                  <div className="relative h-[70vh] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white max-w-4xl mx-auto px-8">
                        {/* Floating Icon */}
                        <div className={`inline-flex w-20 h-20 rounded-full bg-gradient-to-r ${step.color} items-center justify-center text-3xl shadow-2xl mb-6`}>
                          {step.icon}
                        </div>
                        
                        <div className={`inline-block px-6 py-3 rounded-full text-sm font-medium text-white mb-6 bg-gradient-to-r ${step.color} shadow-lg`}>
                          Step {index + 1}
                        </div>
                        
                        <h3 className="text-5xl md:text-6xl font-serif text-white mb-4 drop-shadow-lg">{step.title}</h3>
                        <h4 className="text-2xl md:text-3xl text-white/90 mb-8 font-light drop-shadow-md">{step.subtitle}</h4>
                        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-md">{step.description}</p>
                        
                        {/* Venue Connection Card */}
                        <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 max-w-2xl">
                          <p className="text-gray-700 text-base md:text-lg leading-relaxed">{step.venueConnection}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
                    <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
                  </div>
                ) : (
                  /* Standard Layout for Other Steps */
                  <div className={`hidden md:grid grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? '' : 'direction-rtl'
                  }`}>
                    {/* Content Side */}
                    <div className={`${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4 bg-gradient-to-r ${step.color}`}>
                        Step {index + 1}
                      </div>
                      <h3 className="text-3xl font-serif text-gray-900 mb-2">{step.title}</h3>
                      <h4 className="text-xl text-gray-600 mb-4 font-light">{step.subtitle}</h4>
                      <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                      <div className={`p-4 rounded-lg bg-white shadow-sm border-l-4 bg-gradient-to-r ${step.color.replace('from-', 'border-').split(' ')[0]}`}>
                        <p className="text-sm text-gray-600 italic">{step.venueConnection}</p>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                      <div className="relative group">
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        {/* Floating Icon */}
                        <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl shadow-lg`}>
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Layout */}
                <div className="block md:hidden">
                  {step.id === 'lafinca' ? (
                    /* Immersive La Finca Mobile Layout */
                    <div className="relative h-[60vh] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                      {/* Background Image */}
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center text-white w-full">
                          {/* Floating Icon */}
                          <div className={`inline-flex w-16 h-16 rounded-full bg-gradient-to-r ${step.color} items-center justify-center text-2xl shadow-2xl mb-4`}>
                            {step.icon}
                          </div>
                          
                          <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4 bg-gradient-to-r ${step.color} shadow-lg`}>
                            Step {index + 1}
                          </div>
                          
                          <h3 className="text-3xl font-serif text-white mb-2 drop-shadow-lg">{step.title}</h3>
                          <h4 className="text-xl text-white/90 mb-4 font-light drop-shadow-md">{step.subtitle}</h4>
                          <p className="text-white/80 mb-6 leading-relaxed drop-shadow-md text-sm">{step.description}</p>
                          
                          {/* Venue Connection Card */}
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                            <p className="text-gray-700 text-sm leading-relaxed">{step.venueConnection}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Standard Mobile Layout for Other Steps */
                    <div>
                      <div className="text-center mb-6">
                        <div className={`inline-block w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                          {step.icon}
                        </div>
                        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4 bg-gradient-to-r ${step.color}`}>
                          Step {index + 1}
                        </div>
                      </div>
                      
                      <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-6">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-2xl font-serif text-gray-900 mb-2">{step.title}</h3>
                        <h4 className="text-lg text-gray-600 mb-4 font-light">{step.subtitle}</h4>
                        <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                        <div className={`p-4 rounded-lg bg-white shadow-sm border-l-4 bg-gradient-to-r ${step.color.replace('from-', 'border-').split(' ')[0]}`}>
                          <p className="text-sm text-gray-600 italic">{step.venueConnection}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color} shadow-lg border-4 border-white transition-all duration-300 ${
                    activeStep === index ? 'scale-150' : 'scale-100'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="flex justify-center mt-16">
          <div className="flex space-x-4">
            {journeySteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`group flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  activeStep === index 
                    ? `bg-gradient-to-r ${step.color} text-white scale-105 shadow-lg` 
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-sm font-medium">{step.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif text-gray-900 mb-4">Begin Your Forever Story</h3>
            <p className="text-lg text-gray-600 mb-8">
              Let our experienced team help you create the wedding of your dreams. Every detail matters, 
              and every moment deserves to be perfect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Start Planning Today
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                See Real Weddings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}