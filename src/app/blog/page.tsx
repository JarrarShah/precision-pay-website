'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const posts = [
  {
    title: 'The Future of Payroll in a Remote-First World',
    slug: 'future-of-payroll',
    date: 'OCT 12, 2026',
    category: 'Industry Insights',
    excerpt: 'As organizations shift permanently to distributed workforces, payroll compliance across borders remains a significant hurdle. We explore emerging frameworks designed to tackle multi-jurisdictional tax law.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
  },
  {
    title: 'Navigating Cross-Border Payroll Compliance',
    slug: 'cross-border-compliance',
    date: 'SEP 28, 2026',
    category: 'Compliance',
    excerpt: 'Managing payroll across multiple regions involves navigating complex labor laws and tax regulations. Learn how integrated software systems simplify international compliance.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Automating Pension Auto-enrolment for Growing SME\'s',
    slug: 'automating-pensions',
    date: 'AUG 15, 2026',
    category: 'Technology',
    excerpt: 'Auto-enrolment is a legal requirement, but it doesn\'t have to be a manual drain on your HR department. Discover how deeply integrated systems can handle staging dates and cyclical re-enrolment automatically.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    title: 'Healthcare Payroll: Navigating Complex Shift Patterns',
    slug: 'healthcare-shift-patterns',
    date: 'JUL 02, 2026',
    category: 'Sector Focus',
    excerpt: 'Hospitals and care homes face the highest complexity of variable pay rates. From sleep-in shifts to emergency call-outs, precision logic is required to ensure 100% accuracy.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop'
  },
  {
    title: 'Understanding the Construction Industry Scheme (CIS)',
    slug: 'understanding-cis',
    date: 'JUN 19, 2026',
    category: 'Compliance',
    excerpt: 'Mixed payroll operations mapping PAYE alongside CIS deductions often lead to reporting chaos. Here is a definitive guide to structuring your financial flow to satisfy HMRC directly.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop'
  },
  {
    title: 'Why White-Label Payroll Is Booming Among Accountants',
    slug: 'white-label-payroll',
    date: 'MAY 05, 2026',
    category: 'Business Strategy',
    excerpt: 'Accountancy firms are increasingly outsourcing their client payroll desks to dedicated bureaus. We look at the margins, the lowered risk, and the client retention benefits driving this trend.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
  }
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function BlogPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = 'Insights, Compliance, and Payroll Strategy.'.split(' ');

  return (
    <>
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            alt="Editorial analytics"
            style={{ y: heroImgY }}
          />
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <motion.span
            className="section-label" style={{ color: 'white' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
          >
            Editorial
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

      <section className="section-blog">
        <ScrollReveal>
          <span className="section-label">Latest Articles</span>
        </ScrollReveal>
        
        <div className="blog-grid">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <a href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', fontStyle: 'italic', fontWeight: 500, borderBottom: '1px solid currentColor', width: 'max-content' }}>
                  Read Article
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
