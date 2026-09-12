import { useState, useEffect, useCallback, useRef } from 'react';
import { Droplets, Sun, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { site } from '../../data/site';

import heroSlide1 from '../../assets/hero-slide-1.jpg';
import heroSlide2 from '../../assets/hero-slide-2.jpg';
import heroSlide3 from '../../assets/hero-slide-3.jpg';

const slides = [
  {
    video: '/video/gettyimages-1501085755-640_adpp.mp4',
    poster: heroSlide1,
    eyebrow: 'Made with care for your skin',
    title: <>Natural beauty.<br /><em>Lasting confidence.</em></>,
    description: 'Thoughtfully developed skincare rituals for brighter, calmer and healthier-looking skin, made for everyday confidence.',
    alt: 'Skincare ritual film - Natural beauty',
    accent: 'var(--rose)',
  },
  {
    video: '/video/gettyimages-1501086416-640_adpp.mp4',
    poster: heroSlide2,
    eyebrow: 'Your daily glow ritual',
    title: <>Radiant skin.<br /><em>Every single day.</em></>,
    description: 'Discover our signature routines crafted with botanical care, designed to bring out your skin\'s natural luminosity.',
    alt: 'Skincare ritual film - Radiant skin',
    accent: 'var(--gold)',
  },
  {
    video: '/video/gettyimages-1501086923-640_adpp.mp4',
    poster: heroSlide3,
    eyebrow: 'Confidence in a bottle',
    title: <>Glow with<br /><em>confidence.</em></>,
    description: 'Premium formulations that nourish, protect and reveal your skin\'s inner radiance — naturally.',
    alt: 'Skincare ritual film - Glow with confidence',
    accent: 'var(--plum-2)',
  },
];

const AUTOPLAY_INTERVAL = 6500;
const TRANSITION_DURATION = 1400;

/* Floating particles config for right-side section */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 3 + Math.random() * 6,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 10,
  opacity: 0.15 + Math.random() * 0.35,
}));

/* Right-side feature badges with hover traction */
const featureBadges = [
  { icon: Droplets, label: 'Hydrating', sub: 'Deep moisture' },
  { icon: Sun, label: 'Brightening', sub: 'Radiant glow' },
  { icon: Sparkles, label: 'Rejuvenating', sub: 'Youthful skin' },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timeoutRef = useRef(null);
  const transitionRef = useRef(null);
  const videoRefs = useRef([]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setPrev(current);
    setCurrent(index);
    setAnimKey((k) => k + 1);

    const nextVid = videoRefs.current[index];
    if (nextVid) {
      nextVid.currentTime = 0;
      nextVid.play().catch(() => {});
    }

    transitionRef.current = setTimeout(() => {
      setPrev(null);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [current, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  /* Autoplay — continuous smooth cycling without player controls */
  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, AUTOPLAY_INTERVAL);
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(transitionRef.current);
    };
  }, [current, nextSlide]);

  /* Ensure initial video starts playing */
  useEffect(() => {
    const v = videoRefs.current[0];
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const slide = slides[current];

  return (
    <section className="hero hero-carousel" aria-label="Hero video slideshow">
      {/* ═══ Softly blurred background image layer (like dehadak.lk) ═══ */}
      <div className="hero-blur-backdrop" aria-hidden="true">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.poster}
            alt=""
            className={`hero-blur-img ${i === current ? 'active' : ''}`}
          />
        ))}
        <div className="hero-blur-overlay" />
      </div>

      {/* ═══ Background video slides with cinematic crossfade ═══ */}
      <div className="hero-carousel-videos">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-carousel-slide ${
              i === current ? 'active' : ''
            } ${i === prev ? 'leaving' : ''}`}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={s.video}
              poster={s.poster}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              className="hero-carousel-video"
              aria-label={s.alt}
            />
          </div>
        ))}
      </div>

      {/* ═══ Gradient wash overlay (for pristine typography legibility) ═══ */}
      <div className="hero-wash" />

      {/* ═══ Right-side FIXED animated panel with traction ═══ */}
      <div className="hero-right-panel">
        {/* Floating botanical particles */}
        <div className="hero-particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        {/* Animated decorative rings & glowing orbs */}
        <div className="hero-decor" aria-hidden="true">
          <div className="hero-decor-ring hero-decor-ring-1" />
          <div className="hero-decor-ring hero-decor-ring-2" />
          <div className="hero-decor-ring hero-decor-ring-3" />
          <div className="hero-glow-orb hero-glow-orb-1" />
          <div className="hero-glow-orb hero-glow-orb-2" />
          <div className="hero-glow-orb hero-glow-orb-3" />
        </div>

        {/* Glassmorphism feature badges with hover traction */}
        <div className="hero-badges">
          {featureBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className={`hero-badge hero-badge-${i + 1}`}
                style={{ animationDelay: `${0.8 + i * 0.25}s` }}
              >
                <span className="hero-badge-icon">
                  <Icon size={20} />
                </span>
                <span className="hero-badge-text">
                  <b>{badge.label}</b>
                  <small>{badge.sub}</small>
                </span>
              </div>
            );
          })}
        </div>

        {/* Animated shimmer light streaks */}
        <div className="hero-shimmer hero-shimmer-1" aria-hidden="true" />
        <div className="hero-shimmer hero-shimmer-2" aria-hidden="true" />

        {/* Pulsing center accent */}
        <div className="hero-pulse-center" aria-hidden="true">
          <span className="hero-pulse-ring hero-pulse-ring-1" />
          <span className="hero-pulse-ring hero-pulse-ring-2" />
          <span className="hero-pulse-ring hero-pulse-ring-3" />
          <span className="hero-pulse-dot" />
        </div>
      </div>

      {/* ═══ Animated text content ═══ */}
      <div className="container hero-inner">
        <div className="hero-copy" key={animKey}>
          <span className="eyebrow hero-anim hero-anim-1">{slide.eyebrow}</span>
          <h1 className="hero-anim hero-anim-2">{slide.title}</h1>
          <p className="hero-anim hero-anim-3">{slide.description}</p>
          <div className="button-row hero-anim hero-anim-4">
            <Button href="/collections">Explore collections</Button>
            <Button href={site.whatsappUrl()} variant="light">
              <WhatsAppIcon size={17} /> Find my routine
            </Button>
          </div>
          <div className="community-proof hero-anim hero-anim-5">
            <span className="proof-dot" />
            <span>
              <b>Personal guidance</b>
              <small>Choose with confidence</small>
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Minimalist progress indicators (no player controls) ═══ */}
      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="hero-dot-fill"
              style={
                i === current
                  ? { animationDuration: `${AUTOPLAY_INTERVAL}ms` }
                  : {}
              }
            />
          </button>
        ))}
      </div>

      {/* ═══ Slide counter ═══ */}
      <div className="hero-slide-counter" aria-hidden="true">
        <span className="hero-counter-current">0{current + 1}</span>
        <span className="hero-counter-sep" />
        <span className="hero-counter-total">0{slides.length}</span>
      </div>
    </section>
  );
}
