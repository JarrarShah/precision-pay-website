'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="booking-modal-overlay">
          {/* Overlay background */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="booking-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="booking-modal-inner">
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  color: 'rgba(0,0,0,0.4)',
                  padding: '1rem',
                  zIndex: 10,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {!submitted ? (
                <>
                  <div style={{ marginBottom: '3rem' }}>
                    <span className="section-label" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                      Onboarding Enrollment
                    </span>
                    <h2 className="heading-display size-md" style={{ color: 'var(--color-black)' }}>
                      Book Your Precision Session
                    </h2>
                    <p className="body-text" style={{ marginTop: '1.5rem', fontSize: '1.6rem' }}>
                      Provide your enrollment data below and our specialist will coordinate your switch to frictionless payroll.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label className="mono-label" style={{ fontSize: '1rem', opacity: 0.5 }}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--color-border)',
                            padding: '1rem 0',
                            outline: 'none',
                            fontSize: '1.6rem',
                            color: 'var(--color-black)',
                          }}
                          placeholder="Your name"
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label className="mono-label" style={{ fontSize: '1rem', opacity: 0.5 }}>
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--color-border)',
                            padding: '1rem 0',
                            outline: 'none',
                            fontSize: '1.6rem',
                            color: 'var(--color-black)',
                          }}
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label className="mono-label" style={{ fontSize: '1rem', opacity: 0.5 }}>
                          Employees Count
                        </label>
                        <select 
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--color-border)',
                            padding: '1rem 0',
                            outline: 'none',
                            fontSize: '1.6rem',
                            cursor: 'pointer',
                            color: 'var(--color-black)',
                          }}
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>200+</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <label className="mono-label" style={{ fontSize: '1rem', opacity: 0.5 }}>
                          Industry
                        </label>
                        <input
                          type="text"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--color-border)',
                            padding: '1rem 0',
                            outline: 'none',
                            fontSize: '1.6rem',
                            color: 'var(--color-black)',
                          }}
                          placeholder="e.g. E-commerce"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label className="mono-label" style={{ fontSize: '1rem', opacity: 0.5 }}>
                        Direct Phone
                      </label>
                      <input
                        type="tel"
                        required
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid var(--color-border)',
                          padding: '1rem 0',
                          outline: 'none',
                          fontSize: '1.6rem',
                          color: 'var(--color-black)',
                        }}
                        placeholder="Your contact number"
                      />
                    </div>

                    <div style={{ paddingTop: '2rem' }}>
                      <button
                        type="submit"
                        className="btn btn-dark"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          padding: '2rem',
                          borderRadius: '10rem',
                        }}
                      >
                        Confirm Booking Request
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      width: '8rem',
                      height: '8rem',
                      backgroundColor: 'var(--color-black)',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 3rem auto',
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="heading-display size-md">Session Requested</h3>
                  <p className="body-text" style={{ marginTop: '2rem' }}>
                    Our onboarding team has received your enrollment data. We&apos;ll call you shortly to finalize the switch.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
