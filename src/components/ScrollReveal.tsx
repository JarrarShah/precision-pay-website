'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  threshold?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  stagger = false,
  threshold = 0.15,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                entry.target.classList.add('is-visible');
              }, delay);
            } else {
              entry.target.classList.add('is-visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, delay]);

  const baseClass = stagger ? 'scroll-reveal-stagger' : 'scroll-reveal';

  return (
    <div ref={ref} className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
}
