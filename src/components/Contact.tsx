'use client';

import { useState } from 'react';
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
  const { isVisible: leftColumnVisible, elementRef: leftColumnRef } = useScrollReveal({ threshold: 0.1, delay: 400 });
  const { isVisible: rightColumnVisible, elementRef: rightColumnRef } = useScrollReveal({ threshold: 0.1, delay: 600 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = `Consulta de ${formData.name} - ${formData.eventType}`;
    const body = `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Tipo de Evento: ${formData.eventType}

Mensaje:
${formData.message}
    `.trim();
    
    const mailtoLink = `mailto:info@fincalariberita.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
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

        <div className="grid md:grid-cols-2 gap-12">
          <div 
            ref={leftColumnRef}
            className={`transition-all duration-1000 transform ${
              leftColumnVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-2xl font-serif text-gray-900 mb-6">{t('title')}</h3>
            
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
            
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">{t('location-title')}</h4>
              <GoogleMap />
            </div>
          </div>

          <div 
            ref={rightColumnRef}
            className={`transition-all duration-1000 transform ${
              rightColumnVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-sm text-gray-500 mb-4 text-center italic">
                {t('form.disclaimer')}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.eventType')}
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">{t('form.eventTypes.select')}</option>
                    <option value="wedding">{t('form.eventTypes.wedding')}</option>
                    <option value="corporate">{t('form.eventTypes.corporate')}</option>
                    <option value="private">{t('form.eventTypes.private')}</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('form.message')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-md hover:bg-primary-600 transition-colors"
              >
                {t('form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}