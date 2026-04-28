"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";

const HeroBackground = dynamic(() => import("@/components/HeroBackground"), {
  ssr: false,
});

/* ─── Reusable Icons ─── */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 14 11" fill="none" className="btn-arrow">
      <path d="M0.6 0V6H13.1" stroke="currentColor" strokeWidth="1.2" />
      <rect
        x="9.19"
        y="2.23"
        width="5.56"
        height="5.56"
        transform="rotate(45 9.19 2.23)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ProjectArrow() {
  return (
    <svg viewBox="0 0 15 11" fill="none" className="project-arrow">
      <path
        d="M1.18 0V5.53H11.98L9.18 2.86L9.12 2.8L9.18 2.74L9.83 2.03L9.89 1.96L9.96 2.02L14.15 6.03L14.22 6.09L14.15 6.16L9.96 10.16L9.89 10.22L9.83 10.15L9.18 9.44L9.12 9.38L9.18 9.32L11.98 6.65H0V0H1.18Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        video.classList.add("loaded");
      } else {
        video.oncanplay = () => video.classList.add("loaded");
      }
    }
  }, []);

  const headingWords =
    "Stress-free payroll and HR, so you can focus on growing your business.".split(
      " ",
    );

  return (
    <section className="hero" ref={heroRef}>
      {/* <HeroBackground /> */}

      <motion.div className="hero-bg relative" style={{ y: bgY }}>
        <video
          ref={videoRef}
          src="/videos/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* ─── THE OVERLAYS (STRONGER) ─── */}
        {/* Base tint bumped to 40% */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        {/* Gradient now dips to 20% black in the middle instead of 0% */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 pointer-events-none" />
      </motion.div>


      <motion.div
        className="hero-main relative z-10 pointer-events-auto flex flex-col items-start gap-8"
        style={{ opacity: heroOpacity, y: contentY }}
      >
        <h1
          className="heading-display size-xl"
          style={{ textShadow: "0 4px 30px rgba(0, 0, 0, 0.5)" }}
        >
          {headingWords.map((word, i) => (
            // ... rest of your map function
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                marginRight: "0.3em",
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%", rotateX: 10 }}
                animate={{ y: "0%", rotateX: 0 }}
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
        
        <motion.a
          href="/contact"
          className="btn btn-light"
          style={{ color: "white", padding: "1.5rem 2rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowIcon />
          BOOK A CALL
        </motion.a>
      </motion.div>

      <motion.div
        className="hero-sub relative z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        <div className="hero-sub-inner">
          <div />
          <span className="section-label" style={{ color: "white" }}>
            Payroll Specialists
          </span>
          <p className="body-text">
            We design and integrate bespoke payroll systems for ambitious
            companies. Every calculation reflects our commitment to clarity,
            quality, and collaboration.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── About Section (Restored to fix TS Error) ─── */
function AboutSection() {
  return (
    <section className="section-about">
      <div className="top-border">
        <ScrollReveal>
          <span className="section-label">About Precision</span>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="about-content">
            <h2 className="heading-display size-lg">
              Engineering trust into every transaction. We build systems that
              let you lead without limits.
            </h2>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Products/Services Section ─── */
function ProductsSection() {
  const services = [
    {
      title: "Outsourced Payroll",
      slug: "processing",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "HR Services",
      slug: "reporting",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    },
    {
      title: "Employee App",
      slug: "tax-and-compliance",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop",
    },
    {
      title: "Specialized Services",
      slug: "compliance",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
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
                Our <strong>payroll and HR services</strong> deliver accurate,
                timely processing backed by dedicated support, advanced
                software, and a zero-error guarantee. Designed for growing
                businesses that need to trust their payroll.
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

function ProductCard({
  service,
  index,
}: {
  service: { title: string; slug: string; img: string };
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <motion.a
      href={`/services/${service.slug}`}
      className="product-card"
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ delay: index * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const maskWidth = useTransform(scrollYProgress, [0, 0.85], ["45%", "100%"]);
  const maskHeight = useTransform(scrollYProgress, [0, 0.85], ["55%", "100%"]);
  const maskRadius = useTransform(scrollYProgress, [0, 0.85], ["8px", "0px"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);

  return (
    <div ref={ref} style={{ height: "250vh", position: "relative" }}>
      <section
        className="section-showroom"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          paddingBottom: 0,
        }}
      >
        <motion.div
          style={{
            y: contentY,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <div className="top-border">
            <span
              className="section-label"
              style={{
                color: "white",
                display: "inline-block",
                marginTop: "1rem",
                opacity: 1,
              }}
            >
              ✦ INFRASTRUCTURE
            </span>
          </div>

          <div className="showroom-content" style={{ pointerEvents: "auto" }}>
            <div className="showroom-left">
              <h2
                className="heading-display size-lg"
                style={{ color: "white", opacity: 1 }}
              >
                Where institutional scale meets frictionless execution.
              </h2>
            </div>
            <div className="showroom-right">
              <div className="address-block">
                <div
                  className="mono-label address-label"
                  style={{ color: "rgba(255,255,255,0.85)", opacity: 1 }}
                >
                  NETWORK TOPOLOGY
                </div>
                <p
                  className="body-text address-text"
                  style={{
                    maxWidth: "300px",
                    marginLeft: "auto",
                    color: "white",
                    opacity: 1,
                  }}
                >
                  Processing distributed endpoints across Tier-1 financial hubs.
                  Built for uncompromising compliance, ledger accuracy, and
                  speed.
                </p>
              </div>
              <a
                href="/contact"
                className="btn btn-glass"
                style={{
                  marginTop: "2rem",
                  display: "inline-flex",
                  opacity: 1,
                  border: "1px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                <ArrowIcon />
                EXPLORE ECOSYSTEM
              </a>
            </div>
          </div>
        </motion.div>

        <div
          className="showroom-bg"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 0,
          }}
        >
          <motion.div
            style={{
              width: maskWidth,
              height: maskHeight,
              borderRadius: maskRadius,
              overflow: "hidden",
              position: "relative",
              background: "#000",
            }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
              alt="Business consultation meeting"
              style={{
                scale: bgScale,
                opacity: imgOpacity,
                x: "-50%",
                y: "-50%",
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                maxWidth: "none",
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ─── Featured Projects Section ─── */
function ProjectsSection() {
  const projects = [
    {
      name: "Health Care",
      slug: "healthcare",
      tags: ["Payroll", "Healthcare"],
    },
    {
      name: "Care Homes Network",
      slug: "care-homes",
      tags: ["Payroll", "Compliance"],
    },
    {
      name: "Hospitality Group",
      slug: "hospitality",
      tags: ["Payroll", "Restaurants"],
    },
    {
      name: "Accounting Partners",
      slug: "accountancy",
      tags: ["Payroll", "Accountants"],
    },
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
                <ArrowIcon /> View projects
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

function ProjectRow({
  project,
  index,
}: {
  project: { name: string; slug: string; tags: string[] };
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

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
          <span key={tag} className="project-tag">
            {tag}
          </span>
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
              <svg viewBox="0 0 14 9" fill="none">
                <path
                  d="M1 4.5h12M9 1l4 3.5L9 8"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </button>
            <button aria-label="Next">
              <svg viewBox="0 0 14 9" fill="none">
                <path
                  d="M1 4.5h12M9 1l4 3.5L9 8"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
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
              &ldquo;Precision Pay transformed our payroll operations. Their
              attention to detail and compliance expertise is unmatched.&rdquo;
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
                <span className="mono-label review-author-role">
                  Director, Precision Pay
                </span>
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
                <ArrowIcon /> Our approach
              </a>
              <a href="/contact" className="btn btn-light">
                <ArrowIcon /> Get in touch
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
  {
    name: "Cima Care",
    url: "https://cimacare.co.uk",
    logo: "/partners/CIMA-care-logo.png",
  },
  {
    name: "Khired",
    url: "https://khired.com",
    logo: "/partners/Khired-white.webp.bv.webp",
  },
  {
    name: "AWR Accountants",
    url: "https://awraccountants.co.uk",
    logo: "/partners/awr-logo.png",
  },
  {
    name: "Live Long Genetics",
    url: "https://livelonggenetics.com",
    logo: "/partners/llg-nad-booster.png",
  },
];

function PartnersMarquee() {
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
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{
                    // If it's a known transparent logo (Khired-white, CIMA), use brightness(0) to turn it pure black
                    // Otherwise, use multiply to strip potential white box backgrounds and darken
                    filter:
                      p.logo.toLowerCase().includes("white") ||
                      p.logo.includes("CIMA")
                        ? "brightness(0)"
                        : "grayscale(100%) contrast(200%)",
                    mixBlendMode:
                      p.logo.toLowerCase().includes("white") ||
                      p.logo.includes("CIMA")
                        ? "normal"
                        : "multiply",
                    // The CIMA logo file has built-in padding making it look small, so we scale it up
                    transform: p.logo.includes("CIMA") ? "scale(2)" : "none",
                  }}
                />
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
