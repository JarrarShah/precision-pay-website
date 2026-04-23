  // src/components/Navigation.tsx
  'use client';

  import { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';

  export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
      // Show nav after preloader
      const timer = setTimeout(() => setHidden(false), 2200);
      return () => clearTimeout(timer);
    }, []);

    const menuLinks = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/services', label: 'Services' },
      { href: '/industries', label: 'Industries' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
    ];

    return (
      <>
        {/* Bottom pill navigation */}
        <div className="flex mx-auto">
  <motion.nav
    className={`bottom-nav ${hidden ? 'hidden' : ''}`}
    // Add x: '-50%' here so Framer Motion handles the centering
    initial={{ x: '-50%', y: 100, opacity: 0 }}
    animate={hidden ? { x: '-50%', y: 100, opacity: 0 } : { x: '-50%', y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
  >
          <a href="/" className="nav-logo" aria-label="Home">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7 3.5v7l-7 3.5L5 15V8l7-3.5z" fill="currentColor" />
              <path d="M12 9.5L7 12v3l5 2.5 5-2.5v-3L12 9.5z" fill="currentColor" />
            </svg>
          </a>
          <span className="nav-title">Precision Pay</span>
          <button
            className="nav-burger"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.svg
                  key="close"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                >
                  <path d="M0.5 12L12 0.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M0.5 0.5L12 12" stroke="currentColor" strokeWidth="1" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="burger"
                  viewBox="0 0 20 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25 }}
                >
                  <path d="M0 0.5H20" stroke="currentColor" strokeWidth="1" />
                  <path d="M0 5.5H20" stroke="currentColor" strokeWidth="1" />
                  <path d="M0 10.5H20" stroke="currentColor" strokeWidth="1" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
        </div>

        {/* Menu overlay with glassmorphism */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="menu-overlay is-open"
              // Add x: "-50%" to all states to keep it centered!
              initial={{ x: '-50%', opacity: 0, y: 20, scale: 0.97 }}
              animate={{ x: '-50%', opacity: 1, y: 0, scale: 1 }}
              exit={{ x: '-50%', opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="menu-label mono-label">Menu</div>
              <ul className="menu-links">
                {menuLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a href={link.href} onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.ul
                className="menu-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <li><a href="tel:02080168950">0208 016 8950</a></li>
                <li><a href="mailto:info@precisionpay.co.uk">info@precisionpay.co.uk</a></li>
              </motion.ul>
              <motion.a
                href="/contact"
                className="btn btn-dark"
                style={{ width: '100%', justifyContent: 'center' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
                  <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                Get a quote
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
