// src/app/about/page.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import SiteFooter from "@/components/SiteFooter";
import PartnersMarquee from "@/components/PartnersMarquee";

/* ─── Shared Arrow Icon ─── */
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

/* ─── Stats Counter ─── */
function StatItem({
  number,
  label,
  suffix = "",
}: {
  number: string;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat-number">
        {number}
        {suffix}
      </span>
      <span className="stat-label mono-label">{label}</span>
    </motion.div>
  );
}

/* ─── Value Card ─── */
function ValueCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="value-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: parseFloat(index) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="value-index mono-label">{index}</span>
      <h3 className="value-title">{title}</h3>
      <p className="body-text">{description}</p>
    </motion.div>
  );
}

/* ─── Team Member ─── */
function TeamMember({
  name,
  role,
  image,
  delay,
}: {
  name: string;
  role: string;
  image: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="team-member"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="team-member-image">
        <Image src={image} alt={name} width={400} height={400} className="object-cover" />
      </div>
      <h4 className="team-member-name">{name}</h4>
      <span className="mono-label team-member-role">{role}</span>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroTextRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroWords = "Built for SMBs. Powered by expertise.".split(" ");

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-hero" ref={heroRef}>
        <div className="page-hero-bg">
          <motion.div style={{ y: heroImgY, height: "100%", width: "100%", position: "relative" }}>
            <Image
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2070&auto=format&fit=crop"
              alt="Professional team meeting"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
        <motion.div
          className="page-hero-content"
          style={{ opacity: heroOpacity }}
          ref={heroTextRef}
        >
          <motion.span
            className="section-label"
            style={{ color: "white" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            About Us
          </motion.span>
          <h1
            className="heading-display size-xl"
            style={{ color: "white", maxWidth: "80rem", marginTop: "3rem" }}
          >
            {heroWords.map((word, i) => (
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
                  initial={{ y: "110%" }}
                  animate={isHeroInView ? { y: "0%" } : {}}
                  transition={{
                    delay: 0.5 + i * 0.07,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
      </section>

      {/* ── Intro / Mission ── */}
      <section className="section-text-block">
        <div className="text-block-grid">
          <ScrollReveal>
            <span className="section-label">Who We Are</span>
          </ScrollReveal>
          <div className="text-block-right">
            <ScrollReveal>
              <h2 className="heading-display size-lg">
                Precision Pay exists to remove payroll stress from SMBs. Full
                stop.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="body-text" style={{ marginTop: "3rem" }}>
                We&apos;re a dedicated team of payroll and HR experts who believe
                that accurate, compliant payroll shouldn&apos;t require constant
                worry. Using award-winning software like BrightPay, we deliver
                outsourced payroll, specialised HR services, and genuine
                support. From accountants to schools, startups to established
                firms—we partner with businesses that value precision,
                reliability, and peace of mind.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <p className="body-text" style={{ marginTop: "2rem" }}>
                Our team combines deep payroll expertise with genuine care for
                the businesses we serve. We don&apos;t just process numbers — we
                build lasting partnerships founded on trust, clarity, and a
                shared commitment to getting things right.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-stats">
        <div className="stats-grid">
          <StatItem
            number="500"
            suffix="+"
            label="Employees Processed Monthly"
          />
          <StatItem number="99.9" suffix="%" label="Accuracy Rate" />
          <StatItem number="24" suffix="hr" label="Average Turnaround" />
          <StatItem number="5.0" label="Google Review Score" />
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-values">
        <div className="top-border" style={{ margin: "0 var(--section-pad)" }}>
          <ScrollReveal>
            <span className="section-label">Our Core Values</span>
          </ScrollReveal>
        </div>
        <div className="values-grid">
          <ValueCard
            index="01"
            title="Precision First"
            description="Accuracy isn't just a goal — it's our standard. Every payroll run is meticulously checked and validated to ensure zero errors."
          />
          <ValueCard
            index="02"
            title="Transparent Partnership"
            description="We believe in open communication. You'll always know exactly what's happening with your payroll, with clear reporting and direct access to your dedicated team."
          />
          <ValueCard
            index="03"
            title="Compliance Assured"
            description="From PAYE to pension auto-enrolment, we stay ahead of legislation so you don't have to. Your compliance is our responsibility."
          />
          <ValueCard
            index="04"
            title="Industry Expertise"
            description="Healthcare, hospitality, accountancy, care homes — we understand the unique payroll challenges across industries and tailor our approach accordingly."
          />
        </div>
      </section>

      {/* ── Image Band ── */}
      <section className="section-image-band">
        <div className="image-band-grid">
          <div className="image-band-item" style={{ position: "relative", height: "400px" }}>
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              alt="Team strategy meeting"
              fill
              className="object-cover"
            />
          </div>
          <div className="image-band-item" style={{ position: "relative", height: "400px" }}>
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2087&auto=format&fit=crop"
              alt="Professional office collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-team">
        <div className="top-border" style={{ margin: "0 var(--section-pad)" }}>
          <div className="team-header">
            <ScrollReveal>
              <span className="section-label">Our Team</span>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2
                className="heading-display size-lg"
                style={{ maxWidth: "50rem", marginTop: "2rem" }}
              >
                Meet the people behind every accurate payslip.
              </h2>
            </ScrollReveal>
          </div>
        </div>
        <div className="team-grid">
          <TeamMember
            name="Managing Director"
            role="Operations & Strategy"
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
            delay={0}
          />
          <TeamMember
            name="Payroll Manager"
            role="Processing & Compliance"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
            delay={0.1}
          />
          <TeamMember
            name="Client Relations"
            role="Partnerships & Support"
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
            delay={0.2}
          />
        </div>
      </section>

      {/* ── Partners Marquee ── */}
      <PartnersMarquee />

      {/* ── CTA ── */}
      <section className="section-cta">
        <div className="top-border">
          <ScrollReveal>
            <span className="section-label">Ready to Partner?</span>
          </ScrollReveal>
        </div>
        <div className="cta-content">
          <div>
            <ScrollReveal>
              <h2 className="heading-display size-xl">
                Let&apos;s build a payroll partnership that works.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="cta-buttons">
                <Link href="/services" className="btn btn-dark">
                  <ArrowIcon />
                  Our services
                </Link>
                <Link href="/contact" className="btn btn-light">
                  <ArrowIcon />
                  Get in touch
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div />
        </div>
      </section>

      {/* ── Privacy Policy Section ── */}
      {/* <section id="privacy" className="section-text-block" style={{ backgroundColor: '#f0ece7', borderTop: '1px solid var(--color-border)' }}>
        <div className="text-block-grid">
          <ScrollReveal>
            <span className="section-label">Legal & Privacy</span>
          </ScrollReveal>
          <div className="text-block-right">
            <ScrollReveal>
              <h2 className="heading-display size-lg">Privacy Commitment</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="body-text" style={{ marginTop: '2rem', fontSize: '1.6rem', opacity: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <p>
                    At Precision Pay, we take your data security and privacy with absolute seriousness. 
                    As a payroll provider, we handle sensitive information every day, and our systems 
                    are built to maintain the highest standards of confidentiality and compliance.
                  </p>
                  <p>
                    <strong>Data Protection:</strong> We are fully GDPR compliant. All data processed through our 
                    partnership with software providers like BrightPay is encrypted and stored in secure UK-based 
                    data centres. We never sell your data or share it with third parties for marketing purposes.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We collect only the data necessary to provide accurate 
                    payroll and HR services. This includes employee names, contact details, financial information, 
                    and employment records required for statutory compliance.
                  </p>
                  <p>
                    <strong>Your Rights:</strong> You have the right to access, rectify, or request the deletion of your 
                    data at any time. For any privacy-related enquiries, please contact our Data Protection Officer 
                    at <a href="mailto:privacy@precision-pay.co.uk" style={{ textDecoration: 'underline', color: 'inherit' }}>privacy@precision-pay.co.uk</a>.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section> */}

      <SiteFooter />

      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
