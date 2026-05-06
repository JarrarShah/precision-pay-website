'use client';

import { useRef, use } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';
import PartnersMarquee from '@/components/PartnersMarquee';

const industriesData: Record<string, any> = {
  'healthcare': {
    title: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Precision payroll for vital services.',
    description: 'We understand the unique complexities of healthcare payroll, from calculating unsocial hours to managing multi-site staff consolidation.',
    points: [
      'Unsocial hours & overtime calculations',
      'Multi-site payroll consolidation',
      'Staff rostering integration',
      'Statutory sick pay management'
    ]
  },
  'care-homes': {
    title: 'Care Homes & Social Care',
    heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Compassionate care requires precise payroll.',
    description: 'Dedicated payroll support for the care sector. We manage complex shift patterns, sleep-in payments, and ensure your payroll practices remain fully compliant with CQC standards.',
    points: [
      'Shift pattern variations',
      'Sleep-in & waking night pay',
      'Holiday accrual for variable hours',
      'Strict CQC compliance tracking'
    ]
  },
  'hospitality': {
    title: 'Hospitality & Restaurants',
    heroImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Agile payroll for a fast-paced sector.',
    description: 'From local pubs to national hotel chains, we expert handle tronc schemes, tip allocations, split shifts, and the rapid onboarding needed for seasonal workforce fluctuations.',
    points: [
      'Tronc scheme rules & management',
      'Split shift processing',
      'Seasonal staff flux handling',
      'Tip allocation & transparent reporting'
    ]
  },
  'accountancy': {
    title: 'Accountancy Practices',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    tagline: 'The invisible engine for your firm.',
    description: 'We offer white-label payroll bureau services specifically designed for accountancy firms. Let us be the dedicated payroll arm of your practice while you maintain the client relationship.',
    points: [
      'Complete white-label service',
      'Client portfolio management',
      'Dedicated account manager',
      'Bulk ongoing processing'
    ]
  },
  'construction': {
    title: 'Construction & Trades',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
    tagline: 'CIS compliance built on solid foundations.',
    description: 'Bespoke CIS-compliant payroll designed explicitly for the construction industry. We manage subcontractor verification, complex CIS deductions, and seamless monthly returns to HMRC.',
    points: [
      'CIS verification systems',
      'Monthly CIS300 submissions',
      'Mixed employment models (PAYE/CIS)',
      'Automated statement generation'
    ]
  },
  'retail': {
    title: 'Retail & E-Commerce',
    heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    tagline: 'Scalable payroll for peak seasons.',
    description: 'High-volume, scalable payroll solutions designed for modern retail. From managing seasonal surges to complex commission structures across multiple brick-and-mortar locations.',
    points: [
      'Commission & bonus calculations',
      'Multi-location consolidation',
      'Peak season scalability',
      'Real-time reporting & analytics'
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

export default function IndustryDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const slug = unwrappedParams.slug;
  const data = industriesData[slug];

  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  if (!data) return notFound();

  return (
    <>
      <section className="page-hero page-hero--short" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.div style={{ y: heroImgY, height: '100%', width: '100%', position: 'relative' }}>
            <Image src={data.heroImage} alt={data.title} fill className="object-cover" priority />
          </motion.div>
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <motion.span
            className="section-label" style={{ color: 'white' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            Industry Focus
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
            <span className="section-label">Sector Context</span>
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
        <div className="duo-grid" style={{ padding: '0 var(--section-pad) 8rem' }}>
          <div className="parallax-img" style={{ height: '100%', minHeight: '40rem', position: 'relative' }}>
            <Image src={data.heroImage} alt="" fill className="object-cover" />
          </div>
          <div style={{ background: 'var(--color-cream)', padding: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ScrollReveal>
              <h3 className="heading-display size-md" style={{ marginBottom: '3rem' }}>Industry Solutions</h3>
              <ul className="service-features">
                {data.points.map((f: string, i: number) => (
                  <li key={i} className="service-feature" style={{ marginBottom: '1.5rem', fontSize: '1.6rem' }}>
                    <span className="feature-dot">◆</span>{f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-cta">
        <div className="top-border"><ScrollReveal><span className="section-label">Next Steps</span></ScrollReveal></div>
        <div className="cta-content">
          <div>
            <ScrollReveal><h2 className="heading-display size-xl">Tailored for your sector.</h2></ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="cta-buttons">
                <Link href="/contact" className="btn btn-dark"><ArrowIcon />Get a quote</Link>
                <Link href="/industries" className="btn btn-light"><ArrowIcon />All Industries</Link>
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
