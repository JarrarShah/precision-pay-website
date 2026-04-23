'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';

const HeroBackground = dynamic(() => import('@/components/HeroBackground'), {
  ssr: false,
});

/* ─── Reusable Arrow SVG ─── */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.19" y="2.23" width="5.56" height="5.56" transform="rotate(45 9.19 2.23)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function ProjectArrow() {
  return (
    <svg viewBox="0 0 15 11" fill="none" className="project-arrow">
      <path d="M1.18 0V5.53H11.98L9.18 2.86L9.12 2.8L9.18 2.74L9.83 2.03L9.89 1.96L9.96 2.02L14.15 6.03L14.22 6.09L14.15 6.16L9.96 10.16L9.89 10.22L9.83 10.15L9.18 9.44L9.12 9.38L9.18 9.32L11.98 6.65H0V0H1.18Z" fill="currentColor" />
    </svg>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.onload = () => img.classList.add('loaded');
      }
    }
  }, []);

  const headingWords = 'Stress-free payroll and HR, so you can focus on growing your business.'.split(' ');

  return (
    <section className="hero" ref={heroRef}>
      <HeroBackground />

      <motion.div className="hero-bg" style={{ y: bgY }}>
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop"
          alt="Professional payroll team at work"
        />
      </motion.div>

      <motion.div className="hero-topbar" style={{ opacity: heroOpacity }}>
        <motion.span
          className="logo-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Precision Pay
        </motion.span>
        <motion.a
          href="/contact"
          className="btn btn-light"
          style={{ color: 'white', padding: '1.5rem 0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <ArrowIcon />
          GET A QUOTE
        </motion.a>
      </motion.div>

      <motion.div className="hero-main" style={{ opacity: heroOpacity, y: contentY }}>
        <h1 className="heading-display size-xl">
          {headingWords.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%', rotateX: 10 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{
                  delay: 2.0 + i * 0.06,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <motion.div
        className="hero-sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <div className="hero-sub-inner">
          <div />
          <span className="section-label" style={{ color: 'white' }}>Payroll Specialists</span>
          <p className="body-text">
            We design and integrate bespoke payroll systems for ambitious companies.
            Every calculation reflects our commitment to clarity, quality, and collaboration.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const words = 'Award-winning payroll and HR expertise. Trusted by SMBs who demand accuracy, reliability, and genuine support.'.split(' ');

  return (
    <section className="section-about" ref={ref}>
      <ScrollReveal>
        <span className="section-label">About Precision Pay</span>
      </ScrollReveal>
      <h2 className="heading-display size-xl" style={{ maxWidth: '100rem', margin: '4rem 0' }}>
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                delay: i * 0.03,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      <ScrollReveal delay={400}>
        <a href="/about" className="btn btn-dark">
          <ArrowIcon />
          Who we are
        </a>
      </ScrollReveal>
    </section>
  );
}

/* ─── Products/Services Section ─── */
function ProductsSection() {
  const services = [
    {
      title: 'Outsourced Payroll',
      slug: 'processing',
      img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'HR Services',
      slug: 'reporting',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    },
    {
      title: 'Employee App',
      slug: 'tax-and-hmrc',
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop',
    },
    {
      title: 'Specialized Services',
      slug: 'compliance',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <section className="section-products">
      <div className="top-border">
        <div className="products-header">
          <ScrollReveal>
            <span className="section-label">Service Collection</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="products-desc">
              <p className="body-text">
                Our <strong>payroll and HR services</strong> deliver accurate, timely processing backed by dedicated support,
                advanced software, and a zero-error guarantee. Designed for growing businesses that need to trust their payroll.
              </p>
              <a href="/services" className="btn btn-dark">
                <ArrowIcon />
                Discover services
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="products-grid">
        {services.map((service, i) => (
          <ProductCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ service, index }: { service: { title: string; slug: string; img: string }; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <motion.a
      href={`/services/${service.slug}`}
      className="product-card"
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{
        delay: index * 0.12,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="product-title">{service.title}</span>
      <motion.img
        src={service.img}
        alt={service.title}
        style={{ y }}
        loading="lazy"
      />
    </motion.a>
  );
}

/* ─── Showroom/Consultation Section ─── */
function ShowroomSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section className="section-showroom" ref={ref}>
      <div className="top-border">
        <ScrollReveal>
          <span className="section-label" style={{ color: 'white' }}>Consultation</span>
        </ScrollReveal>
      </div>

      <div className="showroom-content">
        <div className="showroom-left">
          <ScrollReveal>
            <h2 className="heading-display size-lg">
              A place where precision and creativity connect.
            </h2>
          </ScrollReveal>
        </div>
        <div className="showroom-right">
          <ScrollReveal delay={200}>
            <div className="address-block">
              <div className="mono-label address-label">Address</div>
              <p className="body-text address-text">
                St Helen&apos;s House, King St<br />
                Derby DE1 3EE, UK
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <a href="/contact" className="btn btn-glass">
              <ArrowIcon />
              Get in touch
            </a>
          </ScrollReveal>
        </div>
      </div>

      <div className="showroom-bg">
        <motion.img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
          alt="Business consultation meeting"
          style={{ y: bgY, scale: bgScale }}
          loading="lazy"
        />
      </div>
    </section>
  );
}

/* ─── Featured Projects Section ─── */
function ProjectsSection() {
  const projects = [
    { name: 'Pharmacy Solutions', slug: 'healthcare', tags: ['Payroll', 'Healthcare'] },
    { name: 'Care Homes Network', slug: 'care-homes', tags: ['Payroll', 'Compliance'] },
    { name: 'Hospitality Group', slug: 'hospitality', tags: ['Payroll', 'Restaurants'] },
    { name: 'Accounting Partners', slug: 'accountancy', tags: ['Payroll', 'Accountants'] },
  ];

  return (
    <section className="section-projects">
      <div className="top-border">
        <div className="projects-header">
          <ScrollReveal>
            <span className="section-label">Featured Works</span>
          </ScrollReveal>
          <div>
            <ScrollReveal>
              <h2 className="heading-display size-xl">
                Each project tells its own story of collaboration and precision.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a href="/industries" className="btn btn-dark">
                <ArrowIcon />
                View projects
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: { name: string; slug: string; tags: string[] }; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.a
      href={`/industries/${project.slug}`}
      className="project-row"
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <h3 className="project-name">{project.name}</h3>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>
      <ProjectArrow />
    </motion.a>
  );
}

/* ─── Reviews / Testimonial Section ─── */
function ReviewsSection() {
  return (
    <section className="section-reviews">
      <div className="top-border">
        <div className="reviews-header">
          <ScrollReveal>
            <span className="section-label">Client Testimonials</span>
          </ScrollReveal>
          <div className="arrow-nav">
            <button aria-label="Previous">
              <svg viewBox="0 0 14 9" fill="none"><path d="M1 4.5h12M9 1l4 3.5L9 8" stroke="currentColor" strokeWidth="1" /></svg>
            </button>
            <button aria-label="Next">
              <svg viewBox="0 0 14 9" fill="none"><path d="M1 4.5h12M9 1l4 3.5L9 8" stroke="currentColor" strokeWidth="1" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="review-block">
        <ScrollReveal className="review-quote-icon">
          <svg viewBox="0 0 27 20" fill="currentColor">
            <path d="M0 20V8.57h5.71V0h8.58v11.43L8.57 20H0zm15.71 0V8.57h5.72V0H30v11.43L24.29 20h-8.58z" />
          </svg>
        </ScrollReveal>
        <div className="review-text">
          <ScrollReveal>
            <blockquote className="heading-display size-xl">
              &ldquo;Precision Pay transformed our payroll operations. Their attention to detail and compliance expertise is unmatched.&rdquo;
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="review-author">
              <img
                className="review-author-image"
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                alt="James Richardson"
                loading="lazy"
              />
              <div className="review-author-info">
                <span className="review-author-name">James Richardson</span>
                <span className="mono-label review-author-role">Director, Pharmacy Solutions</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / Pre-Footer Section ─── */
function CTASection() {
  return (
    <section className="section-cta">
      <div className="top-border">
        <ScrollReveal>
          <span className="section-label">Where Vision Meets Execution</span>
        </ScrollReveal>
      </div>
      <div className="cta-content">
        <div>
          <ScrollReveal>
            <h2 className="heading-display size-xl">
              Every great build begins with understanding
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="cta-buttons">
              <a href="/about" className="btn btn-dark">
                <ArrowIcon />
                Our approach
              </a>
              <a href="/contact" className="btn btn-light">
                <ArrowIcon />
                Get in touch
              </a>
            </div>
          </ScrollReveal>
        </div>
        <div />
      </div>
    </section>
  );
}

/* ─── Partners Marquee ─── */
const partners = [
  { name: 'Cima Care', url: 'https://cimacare.co.uk', logo: '/partners/CIMA-care-logo.png' },
  { name: 'Khired', url: 'https://khired.com', logo: '/partners/Khired-white.webp.bv.webp' },
  { name: 'AWR Accountants', url: 'https://awraccountants.co.uk', logo: '/partners/awr-logo.png' },
  { name: 'Live Long Genetics', url: 'https://livelonggenetics.com', logo: '/partners/llg-nad-booster.png' },
  { name: 'Pharmacy Solutions', url: 'https://pharmacy-solutions.com', logo: '/partners/Pharmacy-Solutions-High-Res-Logo-2.webp' },
];

function PartnersMarquee() {
  // Duplicate array for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <div className="partners-wrapper">
      <div className="partners-marquee-label">
        <ScrollReveal>
          <span className="section-label">Trusted By Industry Leaders</span>
        </ScrollReveal>
      </div>
      <div className="partners-marquee-band">
        <div className="partners-marquee-track">
          {doubled.map((p, i) => (
            <a
              key={`${p.name}-${i}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-marquee-item"
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} />
              ) : (
                <span className="partner-marquee-text">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Footer replaced by SiteFooter component ─── */

/* ─── Main Page Composition ─── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ShowroomSection />
      <ProjectsSection />
      <ReviewsSection />
      <PartnersMarquee />
      <CTASection />
      <SiteFooter />

      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}

