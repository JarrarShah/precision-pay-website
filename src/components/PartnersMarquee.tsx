// src/components/PartnersMarquee.tsx
'use client';

import ScrollReveal from '@/components/ScrollReveal';

const partners = [
  {
    name: 'Cima Care',
    url: 'https://cimacare.co.uk',
    logo: '/partners/CIMA-care-logo.png',
  },
  {
    name: 'Khired',
    url: 'https://khired.com',
    logo: '/partners/Khired-white.webp.bv.webp',
  },
  {
    name: 'AWR Accountants',
    url: 'https://awraccountants.co.uk',
    logo: '/partners/awr-logo.png',
  },
  {
    name: 'Live Long Genetics',
    url: 'https://livelonggenetics.com',
    logo: '/partners/llg-nad-booster.png',
  },
];

export default function PartnersMarquee() {
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
                    filter:
                      p.logo.toLowerCase().includes('white') ||
                      p.logo.includes('CIMA')
                        ? 'brightness(0)'
                        : 'grayscale(100%) contrast(200%)',
                    mixBlendMode:
                      p.logo.toLowerCase().includes('white') ||
                      p.logo.includes('CIMA')
                        ? 'normal'
                        : 'multiply',
                    transform: p.logo.includes('CIMA') ? 'scale(2)' : 'none',
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
