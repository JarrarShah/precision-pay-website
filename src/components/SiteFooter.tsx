'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

// Removed unused ArrowIcon as it was reported by lint

/* ─── Contact Form Section ─── */
function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="footer-contact-section" ref={ref}>
      {/* Decorative background pattern */}
      <div className="footer-contact-pattern" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="pattern-left">
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.12" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.09" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          {/* Radial lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + 60 * Math.cos(angle);
            const y1 = 200 + 60 * Math.sin(angle);
            const x2 = 200 + 180 * Math.cos(angle);
            const y2 = 200 + 180 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
            );
          })}
        </svg>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="pattern-right">
          <rect x="100" y="100" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" transform="rotate(45 200 200)" />
          <rect x="130" y="130" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" transform="rotate(45 200 200)" />
          <rect x="160" y="160" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.06" transform="rotate(45 200 200)" />
        </svg>
      </div>

      <div className="footer-contact-inner">
        <div className="footer-contact-header">
          <ScrollReveal>
            <span className="section-label">Get In Touch</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-display size-lg" style={{ maxWidth: '50rem', marginTop: '2rem' }}>
              Let&apos;s simplify your payroll.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="body-text" style={{ maxWidth: '45rem', marginTop: '2rem' }}>
              Whether you&apos;re switching providers or starting fresh, we&apos;d love to hear from you. 
              Get a free consultation and see what stress-free payroll looks like.
            </p>
          </ScrollReveal>
        </div>

        {!submitted ? (
          <motion.form
            className="footer-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="footer-form-field">
              <label className="footer-form-label">Name</label>
              <input
                type="text"
                className="footer-form-input"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="footer-form-field">
              <label className="footer-form-label">Number</label>
              <input
                type="tel"
                className="footer-form-input"
                placeholder="Your phone number"
              />
            </div>
            <div className="footer-form-field">
              <label className="footer-form-label">Email</label>
              <input
                type="email"
                className="footer-form-input"
                placeholder="Your email address"
                required
              />
            </div>
            <div className="footer-form-field">
              <label className="footer-form-label">Message</label>
              <input
                type="text"
                className="footer-form-input"
                placeholder="Tell us about your payroll needs"
              />
            </div>
            <div className="footer-form-submit-wrap">
              <motion.button
                type="submit"
                className="footer-form-submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Submit
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            className="footer-form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="footer-form-success-icon">✓</div>
            <h3 className="heading-display size-md">Thank you!</h3>
            <p className="body-text" style={{ marginTop: '1rem' }}>
              We&apos;ll be in touch within 24 hours.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ─── Main Footer ─── */
export default function SiteFooter() {
  return (
    <>
      <ContactFormSection />

      {/* Minimal copyright bar */}
      <div className="site-footer-minimal">
        <div className="site-footer-minimal-inner">
          <span>© 2026 Precision Pay. All rights reserved.</span>
          <div className="site-footer-bottom-links">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            {/* <Link href="/about#privacy">Privacy</Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
