import { motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from './Breadcrumbs';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { ease } from './motion';

const heroImages = {
  plum: '/carousel/images.jpeg',
  blush: '/carousel/istockphoto-1496614896-612x612.jpg',
  sky: '/carousel/image-7.png',
  champagne: '/carousel/istockphoto-1832208611-612x612.jpg',
  mint: '/carousel/woman-applying-face-cream_1303-14311.avif',
};

export function PageHero({ eyebrow, title, description, current, theme = 'plum' }) {
  const reduced = useReducedMotion();
  const bgImage = heroImages[theme] || heroImages.plum;

  const entrance = (delay = 0, y = 24) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.1 : 0.7, delay: reduced ? 0 : delay, ease },
  });

  return (
    <section className={`page-hero page-hero-${theme}`}>
      {/* ── Softly blurred atmospheric background (like dehadak.lk) ── */}
      <div className="page-hero-backdrop" aria-hidden="true">
        <img src={bgImage} alt="" className="page-hero-blur-img" />
        <div className="page-hero-overlay" />
      </div>

      {/* ── Floating ambient glow orbs & rings ── */}
      <div className="page-hero-glow-decor" aria-hidden="true">
        <div className="hero-glow-orb hero-glow-orb-1" />
        <div className="hero-glow-orb hero-glow-orb-2" />
        <div className="hero-decor-ring hero-decor-ring-1" />
        <div className="hero-decor-ring hero-decor-ring-2" />
      </div>

      <div className="container page-hero-content">
        {/* ── Left Column: Typography & Badges ── */}
        <motion.div className="page-hero-copy-col" {...entrance(0.1)}>
          <Breadcrumbs current={current} />
          
          <div className="page-hero-eyebrow-badge">
            <Sparkles size={15} />
            <span>{eyebrow}</span>
          </div>

          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-desc">{description}</p>

          <div className="page-hero-trust-row">
            <span><CheckCircle2 size={16} /> 100% Botanical Care</span>
            <span><CheckCircle2 size={16} /> Personal Routine Guidance</span>
            <span><CheckCircle2 size={16} /> Islandwide Delivery</span>
          </div>
        </motion.div>

        {/* ── Right Column: Floating Framed Card (like dehadak.lk) ── */}
        <motion.div className="page-hero-card-col" {...entrance(0.25, 30)}>
          <div className="page-hero-floating-card">
            <div className="page-hero-card-img-wrap">
              <img src={bgImage} alt={title} className="page-hero-card-img" />
              <div className="page-hero-card-badge">
                <Sparkles size={14} />
                <span>Signature Ritual</span>
              </div>
            </div>
            <div className="page-hero-card-footer">
              <b>Natural Beauty · Lasting Confidence</b>
              <small>Thoughtfully formulated for radiant, healthy skin</small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
