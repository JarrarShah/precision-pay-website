'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  children?: ReactNode;
  className?: string;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  children,
  className = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1]);

  return (
    <div ref={ref} className={`parallax-img ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        loading="lazy"
      />
      {children}
    </div>
  );
}
