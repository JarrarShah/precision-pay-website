'use client';

import { ReactNode } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';

import { BookingProvider, useBooking } from '@/context/BookingContext';
import BookingModal from '@/components/BookingModal';

function GlobalBookingModal() {
  const { isBookingOpen, closeBooking } = useBooking();
  return <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        <Navigation />
        {children}
        <GlobalBookingModal />
      </SmoothScroll>
    </BookingProvider>
  );
}
