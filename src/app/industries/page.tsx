'use client';

import { useRef } from 'react';
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

/* ─── Industry Card ─── */
function IndustryCard({
  title,
  description,
  image,
  features,
  index,
  slug,
}: {
  title: string;
  description: string;
  image: string;
  features: string[];
  index: number;
  slug: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const imgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1]);

  return (
    <motion.div
      ref={ref}
      className="industry-card"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div ref={imgRef} className="industry-card-image">
        <motion.img src={image} alt={title} style={{ scale: imgScale }} loading="lazy" />
        <div className="industry-card-overlay">
          <h3 className="industry-card-title">{title}</h3>
        </div>
      </div>
      <div className="industry-card-body">
        <p className="body-text">{description}</p>
        <ul className="industry-features">
          {features.map((f) => (
            <li key={f} className="industry-feature">
              <span className="feature-dot">◆</span>
              {f}
            </li>
          ))}
        </ul>
        <a href={`/industries/${slug}`} className="btn btn-dark" style={{ marginTop: '2rem' }}>
          View industry
        </a>
      </div>
    </motion.div>
  );
}

export default function IndustriesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = 'Trusted across industries. Tailored to yours.'.split(' ');

  const industries = [
    {
      title: 'Healthcare',
      description: 'Precision payroll for healthcare providers and medical practices. We understand the complexities of unsocial hours and multi-site operations.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=2070&auto=format&fit=crop',
      features: [
        'Unsocial hours & overtime calculations',
        'Multi-site payroll consolidation',
        'Staff rostering integration',
        'Statutory sick pay management',
      ],
      slug: 'healthcare',
    },
    {
      title: 'Care Homes & Social Care',
      description: 'Dedicated payroll support for the care sector. We manage complex shift patterns, sleep-in payments, and CQC-compliant payroll practices with ease.',
      image: 'https://images.unsplash.com/photo-1574068560867-27b9c6a1e948?q=80&w=2070&auto=format&fit=crop',
      features: [
        'Shift pattern & rota-based pay',
        'Sleep-in & waking night payments',
        'Holiday accrual for variable hours',
        'Pension auto-enrolment compliance',
      ],
      slug: 'care-homes',
    },
    {
      title: 'Hospitality & Restaurants',
      description: 'From pubs and restaurants to hotel chains, we handle tronc schemes, tip allocation, split shifts, and seasonal workforce fluctuations.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
      features: [
        'Tronc scheme management',
        'Split shift & variable hour calculations',
        'Seasonal staff onboarding/offboarding',
        'Tip allocation & reporting',
      ],
      slug: 'hospitality',
    },
    {
      title: 'Accountancy Practices',
      description: 'White-label payroll bureau services for accountancy firms. Let us be the payroll arm of your practice while you maintain the client relationship.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
      features: [
        'White-label bureau services',
        'Client portfolio management',
        'Bulk employer processing',
        'Dedicated account manager',
      ],
      slug: 'accountancy',
    },
    {
      title: 'Construction & Trades',
      description: 'CIS-compliant payroll for the construction industry. We manage subcontractor verification, CIS deductions, and monthly returns to HMRC.',
      image: 'https://images.unsplash.com/photo-1541888087-bce4c6cebbd2?q=80&w=2070&auto=format&fit=crop',
      features: [
        'CIS verification & deductions',
        'Monthly CIS300 returns',
        'Mixed employment/CIS payroll',
        'Automated statement generation',
      ],
      slug: 'construction',
    },
    {
      title: 'Retail & E-Commerce',
      description: 'Scalable payroll solutions for retail businesses of all sizes. We manage seasonal surges, commission structures, and multi-location operations.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
      features: [
        'Commission & bonus calculations',
        'Multi-location payroll',
        'Seasonal staff management',
        'Real-time reporting & analytics',
      ],
      slug: 'retail',
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.img
            src="https://images.unsplash.com/photo-1580983559367-0dc2f8934365?q=80&w=2070&auto=format&fit=crop"
            alt="Diverse industries we serve"
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
            Industries
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
            <span className="section-label">Sector Expertise</span>
          </ScrollReveal>
          <div className="text-block-right">
            <ScrollReveal>
              <h2 className="heading-display size-lg">
                Every industry has its own payroll challenges. We&apos;ve mastered them all.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="body-text" style={{ marginTop: '3rem' }}>
                From the intricacies of NHS pension contributions to the complexities of tronc schemes 
                in hospitality — our deep sector knowledge ensures your payroll is handled with the expertise 
                your industry demands. We don&apos;t offer generic solutions; we provide tailored services 
                that reflect the unique requirements of your business.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Industry Cards Grid ── */}
      <section className="section-industries-grid">
        <div className="industries-grid">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.title} {...industry} index={i} />
          ))}
        </div>
      </section>

      {/* ── Testimonial Band ── */}
      <section className="section-testimonial-band">
        <div className="testimonial-band-inner">
          <ScrollReveal>
            <blockquote className="heading-display size-lg" style={{ fontStyle: 'italic', maxWidth: '70rem' }}>
              &ldquo;Precision Pay understood our pharmacy payroll from day one. Their knowledge of healthcare-specific 
              requirements saved us time and eliminated errors we didn&apos;t even know we had.&rdquo;
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="testimonial-author" style={{ marginTop: '4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 300 }}>James Richardson</span>
              <span className="mono-label" style={{ color: 'var(--color-muted)', marginTop: '0.5rem', display: 'block' }}>
                Director, Pharmacy Solutions
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-cta">
        <div className="top-border">
          <ScrollReveal>
            <span className="section-label">Your Industry, Our Expertise</span>
          </ScrollReveal>
        </div>
        <div className="cta-content">
          <div>
            <ScrollReveal>
              <h2 className="heading-display size-xl">
                No matter your sector, we deliver precision.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-dark">
                  <ArrowIcon />
                  Get a quote
                </a>
                <a href="/services" className="btn btn-light">
                  <ArrowIcon />
                  View services
                </a>
              </div>
            </ScrollReveal>
          </div>
          <div />
        </div>
      </section>

      <SiteFooter />

      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
