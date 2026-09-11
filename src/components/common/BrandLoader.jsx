import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ease } from './motion';

export function BrandLoader({ onComplete }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduced ? 0 : 1800);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduced]);

  return (
    <motion.div
      className="brand-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease }}
      aria-label="Loading Sashwari Skincare"
      role="status"
    >
      {/* Ambient background glows */}
      <div className="loader-ambient-glow" aria-hidden="true" />
      <div className="loader-radial-core" aria-hidden="true" />

      <div className="loader-container">
        {/* Orbital decorative rings */}
        <motion.div
          className="loader-orbital-ring ring-outer"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.div
          className="loader-orbital-ring ring-inner"
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />

        {/* Central Luxury Medallion with Original Logo */}
        <motion.div
          className="loader-medallion-wrap"
          initial={{ scale: 0.72, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.1 }}
        >
          <div className="loader-medallion-halo" />
          <div className="loader-medallion-card">
            <img
              src="/brand/origin-logo.png"
              alt="Sashwari Original Logo"
              className="loader-medallion-img"
            />
            <div className="loader-shimmer-sweep" />
          </div>
        </motion.div>

        {/* Brand Typography & Tagline */}
        <div className="loader-text-group">
          <motion.div
            className="loader-sparkle-badge"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
          >
            <Sparkles size={13} />
            <span>Ayurvedic Botanical Luxury</span>
            <Sparkles size={13} />
          </motion.div>

          <motion.h1
            className="loader-brand-title"
            initial={{ opacity: 0, y: 14, letterSpacing: '0.18em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            SASHWARI
          </motion.h1>

          <motion.p
            className="loader-brand-tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.75, ease }}
          >
            Natural Beauty · Lasting Confidence
          </motion.p>
        </div>

        {/* Golden Progress Bar */}
        <div className="loader-progress-wrap">
          <motion.div
            className="loader-progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.45, delay: 0.2, ease: 'easeInOut' }}
          />
        </div>

        <motion.span
          className="loader-footer-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.5, delay: 0.95 }}
        >
          Sri Lanka · Pure Botanical Formulations
        </motion.span>
      </div>
    </motion.div>
  );
}

