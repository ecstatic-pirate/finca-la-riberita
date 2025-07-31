import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  disabled?: boolean;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0,
  disabled = false
}: ScrollRevealOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          // Once visible, stop observing
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, delay, disabled]);

  return { isVisible, elementRef };
}

// Hook for staggered reveal of multiple elements
export function useStaggeredReveal({
  baseDelay = 0,
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = '0px'
}: {
  baseDelay?: number;
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Make all items visible immediately
      const items = containerRef.current?.children.length || 0;
      setVisibleItems(new Set(Array.from({ length: items }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && containerRef.current) {
          const children = Array.from(containerRef.current.children);
          children.forEach((child, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(index));
            }, baseDelay + (index * staggerDelay));
          });
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [baseDelay, staggerDelay, threshold, rootMargin]);

  return { visibleItems, containerRef };
}