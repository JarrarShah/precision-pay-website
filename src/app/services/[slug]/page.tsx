'use client';

import { useRef, use } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';

const servicesData: Record<string, any> = {
  'processing': {
    title: 'Payroll Processing',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Precision driven, cycle after cycle.',
    description: 'Accurate, timely payroll processing tailored to your unique pay cycle. Whether you run weekly, fortnightly, four-weekly, or monthly payrolls, we handle the intricacies with exceptional precision.',
    features: [
      'PAYE & National Insurance',
      'Statutory payments (SSP, SMP)',
      'Pension auto-enrolment',
      'RTI submissions to HMRC',
      'Payslip distribution',
      'BACS payment file prep'
    ],
    benefits: [
      { title: 'Zero Errors', text: 'We eliminate miscalculations completely, ensuring employees trust their paychecks.' },
      { title: 'Time Saved', text: 'Free up hundreds of hours previously spent on manual data entry.' },
      { title: 'Full Transparency', text: 'Clear reporting for management and transparent payslips for staff.' }
    ]
  },
  'reporting': {
    title: 'Reporting & Analytics',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tagline: 'Visibility into every penny.',
    description: 'Gain absolute clarity on your workforce costs with detailed, transparent reporting. We deliver insights that empower better business decisions, from departmental breakdowns to custom data packets.',
    features: [
      'Detailed cost analysis',
      'Departmental breakdowns',
      'Absence tracking',
      'Pension summaries',
      'Custom bespoke reports',
      'Monthly MI packs'
    ],
    benefits: [
      { title: 'Strategic Insights', text: 'Understand where your largest expenditures go and why.' },
      { title: 'Custom Metrics', text: 'Get reporting tailored specifically to your KPIs.' },
      { title: 'Board Ready', text: 'Beautiful, exported reports ready for the boardroom.' }
    ]
  },
  'tax-and-hmrc': {
    title: 'Tax & HMRC Compliance',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop',
    tagline: 'Always compliant. Always ahead.',
    description: 'Navigating HMRC regulations can be a minefield. We take over the compliance burden, from P11D forms and year-end submissions to ensuring you claim every relevant allowance.',
    features: [
      'P45, P60 & P11D',
      'Year-end & FPS submissions',
      'Employment Allowance',
      'CIS deductions',
      'HMRC correspondence',
      'Deadline monitoring'
    ],
    benefits: [
      { title: 'Risk Mitigation', text: 'Avoid hefty fines and penalties from late or incorrect submissions.' },
      { title: 'Peace of Mind', text: 'Never worry about sudden legislation changes again.' },
      { title: 'Direct Liaison', text: 'We speak to HMRC so you never have to.' }
    ]
  },
  'compliance': {
    title: 'Advisory & Support',
    heroImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Expert guidance when it matters.',
    description: 'Beyond processing, we are your strategic payroll partners. Whether you are restructuring pay grades, managing complex benefits, or need a compliance audit, our experts are on hand.',
    features: [
      'Dedicated payroll manager',
      'Unlimited phone & email support',
      'Restructuring consultations',
      'Payroll health checks',
      'Seamless onboarding',
      'Policy advisory'
    ],
    benefits: [
      { title: 'Dedicated Expert', text: 'A single point of contact who knows your business inside out.' },
      { title: 'Proactive Advice', text: 'We advise on best practices before issues even arise.' },
      { title: 'Seamless Growth', text: 'Easily scale your payroll solutions as your headcount explodes.' }
    ]
  }
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Fix for Next 15+ promise params while remaining backwards compatible
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const slug = unwrappedParams.slug;
  const data = servicesData[slug];

  if (!data) return notFound();

  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <section className="page-hero page-hero--short" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.img src={data.heroImage} alt={data.title} style={{ y: heroImgY }} />
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <motion.span
            className="section-label" style={{ color: 'white' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            Service Detail
          </motion.span>
          <motion.h1 
            className="heading-display size-xl" 
            style={{ color: 'white', maxWidth: '80rem', marginTop: '3rem' }}
            initial={{ opacity: 0, y: 30 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            {data.title}
          </motion.h1>
        </motion.div>
      </section>

      <section className="section-text-block">
        <div className="text-block-grid">
          <ScrollReveal>
            <span className="section-label">Overview</span>
          </ScrollReveal>
          <div className="text-block-right">
            <ScrollReveal>
              <h2 className="heading-display size-lg">{data.tagline}</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="body-text" style={{ marginTop: '3rem' }}>{data.description}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-duo" style={{ background: 'var(--color-bg)' }}>
        <div className="duo-grid" style={{ padding: '4rem var(--section-pad)' }}>
          <ScrollReveal>
            <h3 className="heading-display size-md" style={{ marginBottom: '3rem' }}>Key Features</h3>
            <ul className="service-features" style={{ maxWidth: '40rem' }}>
              {data.features.map((f: string, i: number) => (
                <li key={i} className="service-feature" style={{ marginBottom: '1.5rem', fontSize: '1.6rem' }}>
                  <span className="feature-dot">◆</span>{f}
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div style={{ background: 'var(--color-cream)', padding: '5rem', border: '1px solid var(--color-border)' }}>
              <h3 className="heading-display size-md" style={{ marginBottom: '4rem' }}>The Advantage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {data.benefits.map((b: any, i: number) => (
                  <div key={i}>
                    <span className="mono-label" style={{ marginBottom: '1rem', display: 'block', color: 'var(--color-text)' }}>{b.title}</span>
                    <p className="body-text">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-cta">
        <div className="top-border"><ScrollReveal><span className="section-label">Next Steps</span></ScrollReveal></div>
        <div className="cta-content">
          <div>
            <ScrollReveal><h2 className="heading-display size-xl">Ready to refine your operations?</h2></ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-dark"><ArrowIcon />Get a quote</a>
                <a href="/services" className="btn btn-light"><ArrowIcon />All services</a>
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
