'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface MediaItem {
  src: string;
  alt: string;
  category: string;
  type: 'image' | 'video';
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('gallery');

  // Load gallery images dynamically
  useEffect(() => {
    fetch('/api/gallery')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Gallery data loaded:', data.length, 'items');
        setGalleryImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load gallery:', err);
        setLoading(false);
      });
  }, []);

  // Limit to 9 images initially
  const displayedImages = galleryImages.slice(0, 9);
  const hasMoreImages = galleryImages.length > 9;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    
    if (e.key === 'ArrowRight') {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    } else if (e.key === 'Escape') {
      setLightboxIndex(null);
    }
  };

  useEffect(() => {
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxIndex, galleryImages.length]);

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading gallery...</div>
        </div>
      </section>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">No images found.</div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedImages.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => {
                const actualIndex = galleryImages.findIndex(img => img.src === item.src);
                setLightboxIndex(actualIndex);
              }}
            >
              <div className="relative h-80">
                {item.type === 'video' ? (
                  <div className="relative h-full">
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/80 rounded-full p-4">
                        <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    quality={90}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {hasMoreImages && (
          <div className="text-center mt-12">
            <button
              onClick={() => setLightboxIndex(9)}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors"
            >
              View All Photos
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
            }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="max-w-7xl max-h-[90vh] mx-auto" onClick={(e) => e.stopPropagation()}>
            {galleryImages[lightboxIndex].type === 'video' ? (
              <video
                src={galleryImages[lightboxIndex].src}
                className="max-w-full max-h-[90vh] mx-auto"
                controls
                autoPlay
              />
            ) : (
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain"
                quality={95}
                priority
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}