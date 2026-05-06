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
          <motion.div
            className="booking-modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="booking-modal-container">
            <motion.div
              className="booking-modal-content-v3"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Dedicated Professional Header Row */}
              <div className="booking-modal-header-v3">
                <button
                  onClick={onClose}
                  className="booking-modal-close-v3"
                  aria-label="Close modal"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {!submitted ? (
                <div className="booking-modal-body-v3">
                  <div className="booking-title-wrap-v3">
                    <h2 className="heading-display" style={{ fontSize: '2.4rem', color: 'var(--color-black)' }}>
                      Book Your Precision Session
                    </h2>
                    <p className="body-text" style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>
                      Complete the details below to coordinate your switch.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="booking-form-v3">
                    <div className="booking-grid-v3">
                      <div className="form-group-v3">
                        <label className="mono-label-v3">Full Name</label>
                        <input type="text" required className="booking-input-v3" placeholder="Full name" />
                      </div>
                      <div className="form-group-v3">
                        <label className="mono-label-v3">Company</label>
                        <input type="text" required className="booking-input-v3" placeholder="Company name" />
                      </div>
                    </div>

                    <div className="booking-grid-v3">
                      <div className="form-group-v3">
                        <label className="mono-label-v3">Staff Count</label>
                        <select className="booking-input-v3 booking-select-v3">
                          <option>1-10 staff</option>
                          <option>11-50 staff</option>
                          <option>51-200 staff</option>
                          <option>200+ staff</option>
                        </select>
                      </div>
                      <div className="form-group-v3">
                        <label className="mono-label-v3">Industry</label>
                        <input type="text" className="booking-input-v3" placeholder="e.g. Retail" />
                      </div>
                    </div>

                    <div className="form-group-v3">
                      <label className="mono-label-v3">Phone Number</label>
                      <input type="tel" required className="booking-input-v3" placeholder="Direct contact number" />
                    </div>

                    <button type="submit" className="btn btn-dark booking-submit-btn-v3">
                      Confirm Booking Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="booking-success-v3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="success-icon-v3"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="heading-display" style={{ fontSize: '2.2rem' }}>Request Received</h3>
                  <p className="body-text" style={{ marginTop: '1rem', fontSize: '1.4rem' }}>
                    We&apos;ll call you shortly to finalize the switch.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
