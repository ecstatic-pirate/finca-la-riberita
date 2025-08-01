'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap for mobile menu
      mobileMenuRef.current?.focus();
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const menuItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'gallery', href: '#gallery' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'faq', href: '#faq' },
    { key: 'contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = 120; // Height of the navbar + some padding
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 py-2">
          <div className="flex-shrink-0 -ml-[200px]">
            <Link 
              href="/" 
              className="block relative w-[550px] h-[90px]"
              aria-label="Finca La Riberita - Home"
            >
              <Image
                src={isScrolled ? "/logo-light.png" : "/logo-dark.png"}
                alt="Finca La Riberita Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <div className="flex items-baseline space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-white/80'
                  }`}
                >
                  {t(item.key)}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => handleNavClick(e, '#booking')}
                className={`text-sm font-medium px-4 py-2 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isScrolled 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t('booking')}
              </a>
            </div>
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-white shadow-lg"
          ref={mobileMenuRef}
          tabIndex={-1}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <a
                key={item.key}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium focus:bg-gray-100 focus:outline-none cursor-pointer"
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsMobileMenuOpen(false);
                }}
                role="menuitem"
                tabIndex={0}
              >
                {t(item.key)}
              </a>
            ))}
            <a
              href="#booking"
              className="block mx-3 my-2 px-4 py-2 bg-primary-600 text-white text-center rounded-full hover:bg-primary-700 font-medium cursor-pointer"
              onClick={(e) => {
                handleNavClick(e, '#booking');
                setIsMobileMenuOpen(false);
              }}
              role="menuitem"
              tabIndex={0}
            >
              {t('booking')}
            </a>
            <div className="px-3 py-2" role="none">
              <LanguageSwitcher isScrolled={true} />
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  );
}