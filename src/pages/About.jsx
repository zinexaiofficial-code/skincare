import { ArrowUpRight, Heart, Sparkles, Users, Award, ShieldCheck } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { WhatsAppCta } from '../components/common/WhatsAppCta';
import { EditorialBackdrop } from '../components/common/EditorialBackdrop';
import { site } from '../data/site';

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="The Sashwari story"
        title="Skincare created to inspire confidence."
        description="A Sri Lankan beauty and skincare brand built around one simple belief: caring for your skin should feel personal, positive and empowering."
        current="About"
        theme="champagne"
      />

      {/* ═══ Founder & Owner Spotlight ═══ */}
      <section className="section founder-section">
        <div className="container founder-grid">
          <div className="founder-image-card">
            <div className="founder-image-wrap">
              <img
                src="/brand/owner.jpeg"
                alt="Founder & Owner of Sashwari"
                className="founder-portrait"
              />
              <div className="founder-badge">
                <Sparkles size={16} />
                <span>Founder & Formulator</span>
              </div>
            </div>
            <div className="founder-decor-ring" aria-hidden="true" />
          </div>
          <div className="founder-copy">
            <span className="eyebrow">Meet the Founder</span>
            <h2>Natural beauty crafted with personal devotion.</h2>
            <p className="lead-text">
              “Sashwari was born from a deep love for genuine skincare that respects each person’s unique beauty. I wanted to create a brand where every ritual feels luxurious, approachable, and truly effective.”
            </p>
            <p>
              As the founder and owner of Sashwari, I work directly with each formulation to ensure that our skincare rituals combine the finest natural ingredients with clear, practical guidance. We believe healthy, glowing skin is not about quick fixes—it is about nurturing your skin with daily care that makes you feel radiant and confident.
            </p>
            <div className="founder-highlights">
              <div className="highlight-pill">
                <Award size={18} />
                <span>Sri Lankan Botanical Care</span>
              </div>
              <div className="highlight-pill">
                <ShieldCheck size={18} />
                <span>Handcrafted with Integrity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Brand Vision & Editorial Carousel ═══ */}
      <section className="section section-soft">
        <div className="container split-layout">
          <EditorialBackdrop />
          <div>
            <span className="eyebrow">Our Vision</span>
            <h2>A more personal kind of skincare.</h2>
            <p>
              From targeted everyday care to special bridal rituals, Sashwari presents collections with the guidance customers need to make confident choices.
            </p>
            <p>
              Our range journey is shaped by a desire to make skincare feel less overwhelming and more like a ritual you look forward to. It is a Sri Lankan brand identity expressed through care, clarity and community.
            </p>
            <div className="about-social">
              <a className="text-link tiktok-pill-link" href={site.tiktok} target="_blank" rel="noreferrer">
                <span>Meet the brand on TikTok</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Core Values ═══ */}
      <section className="section">
        <div className="container values-grid">
          <article>
            <Heart size={24} />
            <h3>Customer-first guidance</h3>
            <p>Friendly support helps each person choose a routine that feels right for them.</p>
          </article>
          <article>
            <Sparkles size={24} />
            <h3>Ritual over overwhelm</h3>
            <p>We make room for simple steps, thoughtful products and consistency.</p>
          </article>
          <article>
            <Users size={24} />
            <h3>A growing community</h3>
            <p>Follow the Sashwari journey and everyday glow on TikTok.</p>
          </article>
        </div>
      </section>

      <div className="container">
        <WhatsAppCta />
      </div>
    </main>
  );
}
