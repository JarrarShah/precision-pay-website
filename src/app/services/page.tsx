'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

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
        <motion.a
          href={`/services/${slug}`}
          className="btn btn-dark"
          style={{ marginTop: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          View details
        </motion.a>
      </motion.div>
      <motion.div
        ref={imgRef}
        className="service-block-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img src={image} alt={title} style={{ y: imgY }} loading="lazy" />
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

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = 'Payroll services crafted for every industry.'.split(' ');

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.img
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
            alt="Financial analytics"
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
                End-to-end payroll management, so you can focus on what matters most — your business.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="body-text" style={{ marginTop: '3rem' }}>
                We handle the full payroll lifecycle with meticulous care. From calculating PAYE and National Insurance 
                to pension auto-enrolment, RTI submissions, and year-end reporting — every detail is covered. 
                Our bespoke systems adapt to your business, not the other way around.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Service Blocks ── */}
      <section className="section-services-detail">
        <ServiceBlock
          index="01"
          title="Payroll Processing"
          description="Accurate, timely payroll processing tailored to your pay cycle. We handle weekly, fortnightly, four-weekly, and monthly payrolls with exceptional precision."
          features={[
            'PAYE & National Insurance calculations',
            'Statutory payments (SSP, SMP, SPP)',
            'Pension auto-enrolment management',
            'Real Time Information (RTI) submissions to HMRC',
            'Payslip generation & distribution',
            'BACS payment file preparation',
          ]}
          image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop"
          slug="processing"
        />

        <ServiceBlock
          index="02"
          title="Tax & HMRC Compliance"
          description="Stay ahead of legislation with our proactive approach to tax compliance. We manage all HMRC submissions and keep your business fully compliant."
          features={[
            'P45, P60 & P11D processing',
            'Year-end returns & FPS submissions',
            'Employment Allowance claims',
            'CIS deductions for construction',
            'HMRC correspondence management',
            'Statutory deadline monitoring',
          ]}
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
          slug="tax-and-hmrc"
          reverse
        />

        <ServiceBlock
          index="03"
          title="Reporting & Analytics"
          description="Gain clarity on your workforce costs with detailed, transparent reporting. We deliver insights that empower better business decisions."
          features={[
            'Detailed cost analysis reports',
            'Department & cost centre breakdowns',
            'Holiday & absence tracking',
            'Pension contribution summaries',
            'Custom reports to your specifications',
            'Monthly management information packs',
          ]}
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          slug="reporting"
        />

        <ServiceBlock
          index="04"
          title="Advisory & Support"
          description="More than just processing — we provide ongoing expert advice to help you navigate the complexities of payroll and employment legislation."
          features={[
            'Dedicated payroll manager',
            'Unlimited phone & email support',
            'New starter & leaver processing',
            'Pay structure consultations',
            'Payroll health checks & audits',
            'Seamless onboarding from previous provider',
          ]}
          image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
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
            title="Discovery Call"
            description="We learn about your business, payroll requirements, and current setup. No obligation."
            delay={0}
          />
          <ProcessStep
            number="02"
            title="Tailored Proposal"
            description="Receive a clear, transparent quote with no hidden fees. We outline exactly what's included."
            delay={0.1}
          />
          <ProcessStep
            number="03"
            title="Seamless Onboarding"
            description="We handle the migration from your existing provider. Zero disruption to your employees."
            delay={0.2}
          />
          <ProcessStep
            number="04"
            title="Ongoing Excellence"
            description="Your dedicated payroll manager ensures every run is accurate, compliant, and on time."
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
                <a href="/contact" className="btn btn-dark">
                  <ArrowIcon />
                  Get a quote
                </a>
                <a href="/industries" className="btn btn-light">
                  <ArrowIcon />
                  View industries
                </a>
              </div>
            </ScrollReveal>
          </div>
          <div />
        </div>
      </section>

      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
