'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = "Let's talk payroll.".split(' ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In production, this would send to an API endpoint
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero page-hero--short" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.img
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Precision Pay"
            style={{ y: heroImgY }}
          />
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <motion.span
            className="section-label"
            style={{ color: 'white' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Contact Us
          </motion.span>
          <h1 className="heading-display size-xl" style={{ color: 'white', maxWidth: '70rem', marginTop: '3rem' }}>
            {heroWords.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={isHeroInView ? { y: '0%' } : {}}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="section-contact">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <ScrollReveal>
              <span className="section-label">Get In Touch</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="heading-display size-lg" style={{ margin: '3rem 0' }}>
                Ready for stress-free payroll?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="body-text">
                Whether you're switching providers, exploring options, or ready to simplify your payroll—let's talk. 
                Our team responds to all enquiries within 24 hours, and there's no obligation.

              </p>
            </ScrollReveal>

            <div className="contact-details">
              <ScrollReveal delay={300}>
                <div className="contact-detail-item">
                  <span className="mono-label contact-detail-label">Address</span>
                  <p className="contact-detail-text">
                    St Helen&apos;s House, King St<br />
                    Derby DE1 3EE, UK
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <div className="contact-detail-item">
                  <span className="mono-label contact-detail-label">Phone</span>
                  <a href="tel:02080168950" className="contact-detail-text contact-link">
                    0208 016 8950
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="contact-detail-item">
                  <span className="mono-label contact-detail-label">Email</span>
                  <a href="mailto:info@precisionpay.co.uk" className="contact-detail-text contact-link">
                    info@precisionpay.co.uk
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={450}>
                <div className="contact-detail-item">
                  <span className="mono-label contact-detail-label">Hours</span>
                  <p className="contact-detail-text">
                    Monday — Friday<br />
                    9:00 AM — 5:30 PM
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrap">
            <ScrollReveal>
              {submitted ? (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="form-success-icon">✓</div>
                  <h3 className="heading-display size-md">Thanks for reaching out.</h3>
                  <p className="body-text" style={{ marginTop: '1.5rem' }}>
                    We've received your message and will get back to you within 24 hours. Looking forward to chatting!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="mono-label form-label">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="mono-label form-label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="john@company.co.uk"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company" className="mono-label form-label">Company Name</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formState.company}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your Business Ltd"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="mono-label form-label">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="07700 000 000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="employees" className="mono-label form-label">Number of Employees</label>
                    <select
                      id="employees"
                      name="employees"
                      value={formState.employees}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Select range</option>
                      <option value="1-10">1 — 10</option>
                      <option value="11-50">11 — 50</option>
                      <option value="51-100">51 — 100</option>
                      <option value="101-250">101 — 250</option>
                      <option value="250+">250+</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="mono-label form-label">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      placeholder="Tell us about your payroll requirements..."
                    />
                  </div>

                  <button type="submit" className="btn btn-dark form-submit">
                    <ArrowIcon />
                    Send Enquiry
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="section-map">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2404.7045152893!2d-1.4784!3d52.923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879f13a8e4b3e6d%3A0x6b0e9b2e3e7b6e5a!2sSt%20Helen&#39;s%20House%2C%20King%20St%2C%20Derby%20DE1%203EE!5e0!3m2!1sen!2suk!4v1699000000000!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Precision Pay Office Location"
          />
        </div>
      </section>

      <SiteFooter />

      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
