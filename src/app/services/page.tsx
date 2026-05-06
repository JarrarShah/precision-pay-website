'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';
import PartnersMarquee from '@/components/PartnersMarquee';
import { useBooking } from '@/context/BookingContext';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ─── Service Block ─── */
function ServiceBlock({
  index,
  title,
  description,
  features,
  image,
  slug,
  reverse = false,
}: {
  index: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  slug: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div ref={ref} className={`service-block ${reverse ? 'service-block--reverse' : ''}`}>
      <motion.div
        className="service-block-text"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="service-index mono-label">{index}</span>
        <h3 className="heading-display size-lg service-block-title">{title}</h3>
        <p className="body-text" style={{ margin: '2.5rem 0' }}>{description}</p>
        <ul className="service-features">
          {features.map((f, i) => (
            <motion.li
              key={f}
              className="service-feature"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="feature-dot">◆</span>
              {f}
            </motion.li>
          ))}
        </ul>
        <Link
          href={`/services/${slug}`}
          className="btn btn-dark"
          style={{ marginTop: '3rem' }}
        >
          View details
        </Link>
      </motion.div>
      <motion.div
        ref={imgRef}
        className="service-block-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <motion.div style={{ y: imgY, height: '120%', width: '100%', position: 'absolute', top: '-10%' }}>
          <Image src={image} alt={title} fill className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Process Step ─── */
function ProcessStep({ number, title, description, delay }: { number: string; title: string; description: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="process-step"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="process-number">{number}</span>
      <div>
        <h4 className="process-title">{title}</h4>
        <p className="body-text">{description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });
  const { openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = 'Payroll and HR solutions built for businesses that demand reliability.'.split(' ');

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.div style={{ y: heroImgY, height: '100%', width: '100%', position: 'relative' }}>
            <Image
              src="https://images.unsplash.com/photo-1664575599736-c5197c684128?q=80&w=2070&auto=format&fit=crop"
              alt="Financial data and analytics"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <motion.span
            className="section-label"
            style={{ color: 'white' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Our Services
          </motion.span>
          <h1 className="heading-display size-xl" style={{ color: 'white', maxWidth: '80rem', marginTop: '3rem' }}>
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

      {/* ── Intro ── */}
      <section className="section-text-block">
        <div className="text-block-grid">
          <ScrollReveal>
            <span className="section-label">What We Do</span>
          </ScrollReveal>
          <div className="text-block-right">
            <ScrollReveal>
              <h2 className="heading-display size-lg">
                Complete payroll and HR outsourcing, so you can focus on what matters most—your business.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="body-text" style={{ marginTop: '3rem' }}>
                We handle the full payroll and HR lifecycle with precision and care. From PAYE and National Insurance 
                to pension auto-enrolment, leave management, RTI submissions, and employee documentation—we manage it all. 
                With dedicated support, a zero-error guarantee, and crystal-clear reporting, payroll becomes simple.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Service Blocks ── */}
      <section className="section-services-detail">
        <ServiceBlock
          index="01"
          title="Outsourced Payroll"
          description="Accurate, on-time payroll processing every single cycle. We handle weekly, fortnightly, four-weekly, and monthly payrolls with zero tolerance for error."
          features={[
            'PAYE & National Insurance calculations',
            'Statutory payments (SSP, SMP, SPP)',
            'Workplace pension auto-enrolment',
            'Real Time Information (RTI) submissions',
            'Payslip generation and digital distribution',
            'BACS & payment file preparation',
          ]}
          image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
          slug="processing"
        />

        <ServiceBlock
          index="02"
          title="HR & Leave Management"
          description="Real-time holiday, sick leave, and parental leave management. Keep your team organized and ensure compliance with working time regulations."
          features={[
            'Annual leave management and tracking',
            'Sick leave and statutory absence recording',
            'Parental and compassionate leave',
            'Holiday accrual calculations',
            'Employee self-service portal',
            'GDPR-compliant record-keeping',
          ]}
          image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop"
          slug="tax-and-compliance"
          reverse
        />

        <ServiceBlock
          index="03"
          title="Employee Documentation & App"
          description="Secure storage and easy distribution of employment contracts, handbooks, and policies. Plus a free iOS/Android app for employees."
          features={[
            'Employment contract management',
            'Employee handbook distribution',
            'Digital document signing',
            'Free employee mobile app access',
            'Digital payslip library for staff',
            'Secure document viewing portal',
          ]}
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          slug="reporting"
        />

        <ServiceBlock
          index="04"
          title="Specialized Payroll Services"
          description="Tailored payroll solutions for accountants, educational institutions, international operations, and Irish payroll requirements."
          features={[
            'Accountant-specific payroll packages',
            'Education sector expertise (schools/colleges)',
            'International payroll services',
            'Irish payroll and compliance',
            'Bespoke configuration to your needs',
            'Industry-specific support and guidance',
          ]}
          image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          slug="compliance"
          reverse
        />
      </section>

      {/* ── How It Works ── */}
      <section className="section-process">
        <div className="top-border" style={{ margin: '0 var(--section-pad)' }}>
          <ScrollReveal>
            <span className="section-label">How It Works</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="heading-display size-xl" style={{ maxWidth: '70rem', margin: '3rem 0 8rem' }}>
              Getting started is simple.
            </h2>
          </ScrollReveal>
        </div>
        <div className="process-grid">
          <ProcessStep
            number="01"
            title="Discovery & Assessment"
            description="We discuss your business, current payroll setup, and pain points. We'll explain our service, pricing, and guarantees."
            delay={0}
          />
          <ProcessStep
            number="02"
            title="Simple Onboarding"
            description="Choose Crystal Cloud secure portal or simple spreadsheet uploads. We handle the data migration from your previous provider."
            delay={0.1}
          />
          <ProcessStep
            number="03"
            title="Dedicated Support"
            description="You'll get a named Payroll Technician who knows your business. Not a call center—real expertise."
            delay={0.2}
          />
          <ProcessStep
            number="04"
            title="Zero-Error Processing"
            description="Award-winning software powers accurate, on-time payroll. If we make a mistake, that run is free. That's our guarantee."
            delay={0.3}
          />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-cta">
        <div className="top-border">
          <ScrollReveal>
            <span className="section-label">Start Today</span>
          </ScrollReveal>
        </div>
        <div className="cta-content">
          <div>
            <ScrollReveal>
              <h2 className="heading-display size-xl">
                Ready to experience payroll done properly?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-dark">
                  <ArrowIcon />
                  Get a quote
                </Link>
                <button onClick={openBooking} className="btn btn-light">
                  <ArrowIcon />
                  Book a call
                </button>
              </div>
            </ScrollReveal>
          </div>
          <div />
        </div>
      </section>

      <PartnersMarquee />
      <SiteFooter />

      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
