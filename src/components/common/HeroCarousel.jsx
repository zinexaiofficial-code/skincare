import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  Pause,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Heart,
} from 'lucide-react';
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
    eyebrow: "SRI LANKA'S PREMIER BOTANICAL PLATFORM",
    titlePrefix: 'Radiant Skin.',
    titleHighlight: 'Every Single',
    titleSuffix: 'Day.',
    description:
      'Where mindful botanical care meets clinical efficacy, crafted to nourish your skin barrier and bring out your natural, all-day luminosity.',
    storyBadge: 'ANIMATED STORY',
    storyTitle: 'From Daily Ritual to Radiant Glow',
    storySubtitle: 'Where gentle botanicals meet clinical skin vitality',
    stat1: '100% Botanical Care',
    stat2: '5,000+ Glowing Reviews',
  },
  {
    video: '/video/gettyimages-1501086416-640_adpp.mp4',
    poster: heroSlide2,
    eyebrow: 'YOUR DAILY GLOW RITUAL',
    titlePrefix: 'Natural Beauty.',
    titleHighlight: 'Lasting',
    titleSuffix: 'Confidence.',
    description:
      'Discover signature brightening and barrier-defense formulations, carefully crafted to soothe, protect, and unveil your healthiest complexion.',
    storyBadge: 'CLINICAL CARE',
    storyTitle: 'Deep Hydration & Barrier Defense',
    storySubtitle: 'Active nutrients that protect and revitalize every pore',
    stat1: 'Dermatologist Approved',
    stat2: 'Visible Radiance in 14 Days',
  },
  {
    video: '/video/gettyimages-1501086923-640_adpp.mp4',
    poster: heroSlide3,
    eyebrow: 'CONFIDENCE IN EVERY DROP',
    titlePrefix: 'Glow With',
    titleHighlight: 'Pure Herbal',
    titleSuffix: 'Confidence.',
    description:
      'Herbal infusions and vitamin-rich elixirs designed to defend against environmental stressors and restore vibrant, youthful skin elasticity.',
    storyBadge: 'HERBAL HERITAGE',
    storyTitle: 'Youthful Vitality & Glow',
    storySubtitle: 'Time-honored natural care perfected for modern everyday rituals',
    stat1: 'Zero Harsh Actives',
    stat2: '100% Cruelty Free',
  },
];

const AUTOPLAY_INTERVAL = 7000;

/* Floating subtle golden particles in background */
const ambientParticles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 3 + (i % 4) * 2,
  x: 5 + (i * 6.2) % 90,
  y: 10 + (i * 5.7) % 80,
  delay: (i * 0.4) % 6,
  duration: 7 + (i % 5) * 2,
  opacity: 0.15 + (i % 3) * 0.12,
}));

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);
  const timeoutRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
    setAnimKey((k) => k + 1);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  const togglePlayPause = useCallback(() => {
    setIsPaused((p) => {
      const nextState = !p;
      if (nextState) {
        bgVideoRef.current?.pause();
        fgVideoRef.current?.pause();
      } else {
        bgVideoRef.current?.play().catch(() => {});
        fgVideoRef.current?.play().catch(() => {});
      }
      return nextState;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      const nextMuted = !m;
      if (fgVideoRef.current) {
        fgVideoRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  }, []);

  /* Autoplay rotation */
  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current, isPaused, nextSlide]);

  /* Ensure videos play when slide changes */
  useEffect(() => {
    if (bgVideoRef.current && !isPaused) {
      bgVideoRef.current.currentTime = 0;
      bgVideoRef.current.play().catch(() => {});
    }
    if (fgVideoRef.current && !isPaused) {
      fgVideoRef.current.currentTime = 0;
      fgVideoRef.current.play().catch(() => {});
    }
  }, [current, isPaused]);

  const slide = slides[current];

  return (
    <section className="hero hero-carousel hero-dehadak" aria-label="Hero video showcase">
      {/* ═══ 1. FULL BACKGROUND AMBIENT VIDEO (DEHADAK STYLE) ═══ */}
      <div className="hero-full-bg-wrap" aria-hidden="true">
        <video
          ref={bgVideoRef}
          key={`bg-${current}`}
          src={slide.video}
          poster={slide.poster}
          muted
          loop
          playsInline
          autoPlay
          className="hero-full-bg-video"
        />
        <div className="hero-full-bg-wash" />
        <div className="hero-ambient-particles">
          {ambientParticles.map((p) => (
            <span
              key={p.id}
              className="hero-ambient-particle"
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
      </div>

      {/* ═══ 2. MAIN TWO-COLUMN CONTENT GRID ═══ */}
      <div className="container hero-dehadak-inner">
        {/* ── LEFT COLUMN: HEADLINE, DESCRIPTION, CTAS & TRUST ── */}
        <div className="hero-dehadak-copy" key={animKey}>
          {/* Eyebrow badge with sparkle */}
          <div className="hero-dehadak-badge hero-anim hero-anim-1">
            <Sparkles size={14} className="hero-badge-sparkle" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Serif Headline with Glowing Golden Word */}
          <h1 className="hero-dehadak-title hero-anim hero-anim-2">
            {slide.titlePrefix}{' '}
            <span className="hero-gold-highlight">{slide.titleHighlight}</span>{' '}
            {slide.titleSuffix}
          </h1>

          {/* Subtitle Description */}
          <p className="hero-dehadak-desc hero-anim hero-anim-3">
            {slide.description}
          </p>

          {/* Action Buttons: Glowing Gold Pill + Glass WhatsApp Pill */}
          <div className="hero-dehadak-actions hero-anim hero-anim-4">
            <Button href="/collections" className="button-dehadak-primary">
              <Heart size={16} className="btn-heart-icon" />
              <span>Explore Collections</span>
            </Button>
            <Button
              href={site.whatsappUrl()}
              variant="light"
              className="button-dehadak-secondary"
            >
              <WhatsAppIcon size={18} />
              <span>WhatsApp Consultation</span>
            </Button>
          </div>

          {/* Trust Checklist below buttons */}
          <div className="hero-dehadak-trust hero-anim hero-anim-5">
            <div className="hero-trust-item">
              <CheckCircle2 size={16} className="hero-trust-icon" />
              <span>Dermatologist Tested</span>
            </div>
            <div className="hero-trust-item">
              <CheckCircle2 size={16} className="hero-trust-icon" />
              <span>100% Botanical</span>
            </div>
            <div className="hero-trust-item">
              <CheckCircle2 size={16} className="hero-trust-icon" />
              <span>Trusted Islandwide</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: SMALL BOX ORIGINAL VIDEO PLAYER (DEHADAK STYLE) ── */}
        <div className="hero-dehadak-media-col hero-anim hero-anim-3">
          <div className="hero-box-card">
            {/* Top Floating Controls on Video */}
            <div className="hero-box-top-controls">
              <button
                type="button"
                className="hero-box-ctrl-btn hero-box-pause-btn"
                onClick={togglePlayPause}
                aria-label={isPaused ? 'Play video' : 'Pause video'}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                type="button"
                className="hero-box-ctrl-btn hero-box-mute-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Muted Preview' : 'Audio On'}</span>
              </button>
            </div>

            {/* Left / Right Carousel Navigation Chevrons */}
            <button
              type="button"
              className="hero-box-nav hero-box-nav-prev"
              onClick={prevSlide}
              aria-label="Previous video story"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="hero-box-nav hero-box-nav-next"
              onClick={nextSlide}
              aria-label="Next video story"
            >
              <ChevronRight size={20} />
            </button>

            {/* The Sharp Original Video inside the frame */}
            <div className="hero-box-video-viewport">
              <video
                ref={fgVideoRef}
                key={`fg-${current}`}
                src={slide.video}
                poster={slide.poster}
                muted={isMuted}
                loop
                playsInline
                autoPlay
                className="hero-box-fg-video"
              />
            </div>

            {/* Bottom Caption Overlay */}
            <div className="hero-box-caption-overlay">
              <span className="hero-box-story-badge">
                <Sparkles size={12} />
                <span>{slide.storyBadge}</span>
              </span>
              <h3 className="hero-box-story-title">{slide.storyTitle}</h3>
              <p className="hero-box-story-subtitle">{slide.storySubtitle}</p>
            </div>
          </div>

          {/* Video Box Bottom Bar: Progress Indicator & Trust Stats */}
          <div className="hero-box-bottom-bar">
            <div className="hero-box-indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`hero-box-dot ${i === current ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Switch to story ${i + 1}`}
                >
                  {i === current && (
                    <span
                      className="hero-box-dot-fill"
                      style={{
                        animationDuration: `${AUTOPLAY_INTERVAL}ms`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hero-box-stats">
              <span className="hero-box-stat-item">
                <ShieldCheck size={14} className="hero-stat-icon-shield" />
                <span>{slide.stat1}</span>
              </span>
              <span className="hero-box-stat-item">
                <Heart size={14} className="hero-stat-icon-heart" />
                <span>{slide.stat2}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
