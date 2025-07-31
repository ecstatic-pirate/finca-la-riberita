'use client';

import { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    alt: 'Outdoor ceremony setup',
    category: 'ceremony'
  },
  {
    src: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?w=800',
    alt: 'Reception hall',
    category: 'reception'
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    alt: 'Wedding details',
    category: 'details'
  },
  {
    src: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800',
    alt: 'Garden ceremony',
    category: 'ceremony'
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    alt: 'Reception dining',
    category: 'reception'
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    alt: 'Floral arrangements',
    category: 'details'
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = ['all', 'ceremony', 'reception', 'details'];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600">
            Glimpses of magical moments at Riberita
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => setLightboxImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
            </div>
          ))}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-5xl max-h-[90vh]">
              <Image
                src={lightboxImage}
                alt="Gallery image"
                width={1200}
                height={800}
                className="object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
                onClick={() => setLightboxImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}