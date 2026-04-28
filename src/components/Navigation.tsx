// src/components/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const allLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const textColor = scrolled ? 'black' : 'white';
  const textMuted = scrolled ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';

  return (
    <>
      <motion.header
        className="top-nav-header"
        initial={{ y: -100, opacity: 0, x: '-50%' }}
        animate={hidden ? { y: -100, opacity: 0, x: '-50%' } : { y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: '1.6rem',
          left: '50%',
          zIndex: 100,
          width: 'auto',
          maxWidth: 'calc(100% - 3rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '3.5rem',
          padding: '1.2rem 2.5rem',
          borderRadius: '10rem',
          background: scrolled ? 'rgba(255, 255, 255, 0.45)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(1.8)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.8)' : 'none',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease, box-shadow 0.4s ease',
          boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.06)' : 'none',
        }}
      >
        {/* Subtle dark glow behind nav when on hero */}
        <div
          style={{
            position: 'absolute',
            inset: '-4px',
            background: scrolled ? 'transparent' : 'rgba(0,0,0,0.12)',
            borderRadius: '10rem',
            filter: 'blur(16px)',
            zIndex: -1,
            pointerEvents: 'none',
            transition: 'all 0.4s ease',
          }}
        />

        {/* ─── Desktop links (left) ─── */}
        <Link href="/about" className="nav-desktop-link" style={{ color: textMuted, transition: 'color 0.4s ease, opacity 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = textColor}
          onMouseOut={(e) => e.currentTarget.style.color = textMuted}
        >About</Link>

        <Link href="/services" className="nav-desktop-link" style={{ color: textMuted, transition: 'color 0.4s ease, opacity 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = textColor}
          onMouseOut={(e) => e.currentTarget.style.color = textMuted}
        >Services</Link>

        {/* ─── Center logo (always visible in header) ─── */}
        <Link href="/" className="nav-logo-link" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          transition: 'color 0.4s ease',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          <Image 
            src="/logo/Black.png" 
            alt="Precision Pay Logo" 
            width={140} // Default header width
            height={40} 
            style={{
              objectFit: 'contain',
              // Inverts the black logo to white when at the top of the page (hero section) so it remains visible
              filter: scrolled ? 'none' : 'invert(1) brightness(2)',
              transition: 'filter 0.4s ease'
            }}
          />
        </Link>

        {/* ─── Desktop links (right) ─── */}
        <Link href="/industries" className="nav-desktop-link" style={{ color: textMuted, transition: 'color 0.4s ease, opacity 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = textColor}
          onMouseOut={(e) => e.currentTarget.style.color = textMuted}
        >Industries</Link>

        <Link href="/blog" className="nav-desktop-link" style={{ color: textMuted, transition: 'color 0.4s ease, opacity 0.3s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = textColor}
          onMouseOut={(e) => e.currentTarget.style.color = textMuted}
        >Blog</Link>

        {/* ─── Desktop CTA ─── */}
        <Link
          href="/contact"
          className="nav-desktop-link"
          style={{
            padding: '0.8rem 2rem',
            borderRadius: '10rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            backgroundColor: scrolled ? 'black' : 'white',
            color: scrolled ? 'white' : 'black',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          Get a quote
        </Link>

        {/* ─── Mobile hamburger button ─── */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', /* shown via CSS media query */
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
            color: textColor,
            transition: 'color 0.4s ease',
          }}
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.svg
                key="close"
                width="22" height="22"
                viewBox="0 0 22 22"
                fill="none"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M2 2L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 2L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            ) : (
              <motion.svg
                key="burger"
                width="22" height="16"
                viewBox="0 0 22 16"
                fill="none"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M1 1H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </motion.header>

      {/* ─── Mobile fullscreen overlay ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem', 
              padding: '2rem',
            }}
          >
            {/* ─── Big Logo in Mobile Menu ─── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '1rem' }} 
            >
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image 
                  src="/logo/Black.png" 
                  alt="Precision Pay Logo" 
                  width={220} // Make it bigger
                  height={60} 
                  style={{
                    objectFit: 'contain',
                    // The mobile background is white-ish, so the black logo works without filter
                  }}
                />
              </Link>
            </motion.div>

            {/* Links mapping */}
            {allLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 500,
                    color: 'black',
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.5'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Responsive CSS ─── */}
      <style jsx global>{`
        .nav-desktop-link {
          font-size: 1.3rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-hamburger {
          display: none !important;
        }

        /* ─── Tablet: ≤ 1024px ─── */
        @media (max-width: 1024px) {
          .nav-desktop-link {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
          .top-nav-header {
            width: calc(100% - 3rem) !important; /* Stretches the pill across the screen */
            justify-content: space-between !important; /* Pushes logo left, hamburger right */
            gap: 0 !important; /* Clears gap so space-between works perfectly */
            padding: 1.2rem 2rem !important;
          }
          /* Ensure header logo stays sensible when floating */
          .nav-logo-link img {
            width: 120px !important;
            height: auto !important;
          }
        }

        /* ─── Mobile: ≤ 640px ─── */
        @media (max-width: 640px) {
          .top-nav-header {
            top: 1rem !important;
            width: calc(100% - 2rem) !important; /* Slightly wider on phones */
            padding: 1rem 1.6rem !important;
          }
          /* Floating header logo size on mobile */
          .nav-logo-link img {
            width: 100px !important;
            height: auto !important;
          }

          /* Mobile Menu specific tweaks */
          .mobile-menu-overlay a {
            font-size: 2.2rem !important; /* Scale down text slightly on small screens */
          }
          /* Ensure mobile menu logo stays bigger but fits */
          .mobile-menu-overlay img {
            width: 180px !important; 
            height: auto !important;
          }
        }
      `}</style>
    </>
  );
}