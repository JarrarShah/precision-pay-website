'use client';

import { useRef, use } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';

// Reusing same posts array for details lookup
const postsData: Record<string, any> = {
  'future-of-payroll': {
    title: 'The Future of Payroll in a Remote-First World',
    date: 'OCT 12, 2026',
    category: 'Industry Insights',
    excerpt: 'As organizations shift permanently to distributed workforces, payroll compliance across borders remains a significant hurdle.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'The paradigm shift toward remote and hybrid work is no longer an experiment; it is the established foundation of the modern enterprise. However, while employees enjoy the benefits of global mobility, HR and finance departments are wrestling with unprecedently complex payroll structures.' },
      { type: 'h2', text: 'Cross-Border Compliance Challenges' },
      { type: 'p', text: 'When a London-based company hires a developer in Lisbon and a designer in Berlin, local tax laws immediately apply. Employers must navigate differing rules for social security contributions, holiday pay, and mandatory benefits. The traditional single-country payroll software architecture fails to scale under these conditions.' },
      { type: 'blockquote', text: '“By 2028, over 35% of knowledge workers will be employed across borders, yet only 10% of global businesses admit to having a fully compliant framework ready.”' },
      { type: 'p', text: 'At Precision Pay, we are actively implementing multi-jurisdiction logic within our bespoke reporting engines. We believe that technology should enable global talent acquisition, not restrict it through administrative burden.' }
    ]
  },
  'hmrc-rti-pitfalls': {
    title: 'HMRC Real Time Information (RTI): Avoiding Common Pitfalls',
    date: 'SEP 28, 2026',
    category: 'Compliance',
    excerpt: 'RTI changed the payroll landscape significantly. Let\'s break down common FPS and EPS submission errors.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'Since its introduction, Real Time Information (RTI) fundamentally shifted how employers report payroll to HMRC. Instead of an annual event, payroll reporting became intertwined with every single pay cycle, demanding unwavering accuracy.' },
      { type: 'h2', text: 'The Full Payment Submission (FPS) Errors' },
      { type: 'p', text: 'The most frequent penalties we see stem from late or inaccurate FPS submissions. If an employee\'s status changes mid-month, ensuring that data perfectly maps to the payroll software before submission is critical. Even a slightly mismatched National Insurance character can trigger manual flags at HMRC.' },
      { type: 'blockquote', text: 'A proactive approach to RTI rather than a reactive scramble saves an average of £4,500 annually in avoided penalties for mid-sized firms.' },
      { type: 'p', text: 'Our methodology focuses heavily on pre-submission validation. We employ automated checks against HMRC\'s latest schemas to catch anomalies days before the statutory deadline.' }
    ]
  },
  'automating-pensions': {
    title: 'Automating Pension Auto-enrolment for Growing SME\'s',
    date: 'AUG 15, 2026',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'Pension auto-enrolment is a phenomenal initiative for employees, but it continues to be a heavy administrative lift for small to medium enterprises scaling rapidly.' },
      { type: 'h2', text: 'The Re-enrolment Cycle' },
      { type: 'p', text: 'Every three years, employers must re-enrol eligible staff who have opted out. Keeping track of staging dates, employee age brackets, and earnings triggers manually in spreadsheets is a recipe for compliance failure.' },
      { type: 'p', text: 'Next-generation payroll solutions integrate directly with major pension providers. This means that assessment, communication delivery, and contribution uploads happen essentially in the background. It\'s not just about doing payroll faster; it\'s about doing it flawlessly.' }
    ]
  },
  'healthcare-shift-patterns': {
    title: 'Healthcare Payroll: Navigating Complex Shift Patterns',
    date: 'JUL 02, 2026',
    category: 'Sector Focus',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'The healthcare sector operates 24 hours a day, 365 days a year. Consequently, healthcare payroll is arguably the most complex of any industry.' },
      { type: 'h2', text: 'Variable Rates and Unsocial Hours' },
      { type: 'p', text: 'An average nurse might work day shifts, a waking night, and a weekend bank holiday shift—all within a fortnight. Each of these carries a distinct hourly multiplier. Add to this the complexity of the NHS pension scheme bands, and standard payroll software quickly breaks down.' },
      { type: 'blockquote', text: 'Accurate pay in healthcare is not just an administrative duty; it directly impacts staff morale and retention in an already strained sector.' },
      { type: 'p', text: 'Precision Pay has dedicated extensive resources to building logic modules specifically for healthcare variable hours, virtually eliminating the back-and-forth queries that usually follow payday in hospitals and care homes.' }
    ]
  },
  'understanding-cis': {
    title: 'Understanding the Construction Industry Scheme (CIS)',
    date: 'JUN 19, 2026',
    category: 'Compliance',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'Construction firms uniquely deal with a mixed workforce of highly mobile PAYE employees and specialist subcontractors. The Construction Industry Scheme (CIS) forces contractors to deduct money from subcontractors\' payments and pass it to HMRC.' },
      { type: 'h2', text: 'Verification is Key' },
      { type: 'p', text: 'The primary failure point in CIS payroll is subcontractor verification. Applying the wrong deduction rate (20%, 30%, or gross) because a worker wasn\'t properly verified creates an immediate tax liability for the contractor.' },
      { type: 'p', text: 'A robust payroll system must offer seamless HMRC integration for instant verification and automatic generation of professional payment and deduction statements.' }
    ]
  },
  'white-label-payroll': {
    title: 'Why White-Label Payroll Is Booming Among Accountants',
    date: 'MAY 05, 2026',
    category: 'Business Strategy',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    content: [
      { type: 'p', text: 'Accountants excel at financial strategy, tax planning, and business advisory. Yet many find themselves bogged down in the minutiae of processing monthly client payrolls because it is an "expected" service.' },
      { type: 'h2', text: 'The Outsourced Advantage' },
      { type: 'p', text: 'White-label payroll allows accountancy practices to offer top-tier payroll services without the overhead of maintaining specialized payroll staff. The bureau acts invisibly. Payslips bear the accountant’s logo, portals are branded, but the liability, software costs, and processing headaches belong to the bureau.' },
      { type: 'p', text: 'This pivot allows accountants to focus on high-margin advisory work while maintaining full-service client relationships.' }
    ]
  }
};

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const slug = unwrappedParams.slug;
  const post = postsData[slug];

  if (!post) return notFound();

  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <section className="page-hero page-hero--short" ref={heroRef} style={{ minHeight: '60vh' }}>
        <div className="page-hero-bg">
          <motion.img src={post.image} alt={post.title} style={{ y: heroImgY }} />
        </div>
        <motion.div className="page-hero-content" style={{ opacity: heroOpacity }} ref={heroTextRef}>
          <div className="blog-post-header">
            <motion.div 
              className="blog-card-meta" style={{ color: 'rgba(255,255,255,0.7)', justifyContent: 'flex-start', gap: '2rem' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <span>{post.category}</span>
              <span>{post.date}</span>
            </motion.div>
            <motion.h1 
              className="heading-display size-xl" 
              style={{ color: 'white', marginTop: '2rem' }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
            >
              {post.title}
            </motion.h1>
          </div>
        </motion.div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream)', padding: '10rem var(--section-pad)', minHeight: '50vh' }}>
        <div className="blog-post-content body-text">
          {post.content.map((block: any, i: number) => {
            if (block.type === 'p') {
              return <ScrollReveal key={i}><p>{block.text}</p></ScrollReveal>;
            }
            if (block.type === 'h2') {
              return <ScrollReveal key={i}><h2>{block.text}</h2></ScrollReveal>;
            }
            if (block.type === 'blockquote') {
              return <ScrollReveal key={i}><blockquote>{block.text}</blockquote></ScrollReveal>;
            }
            return null;
          })}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta-content" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', margin: '0 auto' }}>
          <div>
            <ScrollReveal><h2 className="heading-display size-lg" style={{ maxWidth: '60rem', margin: '0 auto 4rem' }}>Stay updated with our latest insights.</h2></ScrollReveal>
            <ScrollReveal delay={200}>
              <a href="/blog" className="btn btn-dark" style={{ margin: '0 auto' }}>
                Back to Editorial
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
