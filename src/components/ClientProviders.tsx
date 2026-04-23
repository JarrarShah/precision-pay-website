'use client';

import { ReactNode } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <Navigation />
      {children}
    </SmoothScroll>
  );
}
