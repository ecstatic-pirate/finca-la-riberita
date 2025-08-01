'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  
  // Scroll reveal effects
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ threshold: 0.2 });
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollReveal({ threshold: 0.1, delay: 200 });

  const faqItems = [
    {
      question: t('items.pricing.question'),
      answer: t('items.pricing.answer')
    },
    {
      question: t('items.included.question'),
      answer: t('items.included.answer')
    },
    {
      question: t('items.accommodation.question'),
      answer: t('items.accommodation.answer')
    },
    {
      question: t('items.capacity.question'),
      answer: t('items.capacity.answer')
    },
    {
      question: t('items.catering.question'),
      answer: t('items.catering.answer')
    },
    {
      question: t('items.availability.question'),
      answer: t('items.availability.answer')
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 transform ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        <div 
          ref={contentRef}
          className={`space-y-4 transition-all duration-1000 transform ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <span 
                  className={`ml-4 flex-shrink-0 text-2xl text-gray-400 transition-transform duration-300 ${
                    openItems.has(index) ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openItems.has(index) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}