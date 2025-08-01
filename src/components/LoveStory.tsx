'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const journeySteps = [
  {
    id: 'celebration',
    title: 'The Celebration',
    subtitle: 'Your Perfect Day',
    description: 'Surrounded by loved ones, you celebrate the beginning of your new chapter in absolute elegance.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    icon: '✨',
    venueConnection: 'From intimate ceremonies to grand receptions, our versatile spaces adapt to your dream.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'memories',
    title: 'The Memories',
    subtitle: 'Forever After',
    description: 'Years from now, you\'ll return to these moments and remember every detail of your perfect day.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
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

                {/* Mobile Layout */}
                <div className="block md:hidden">
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