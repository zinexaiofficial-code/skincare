import { Beaker, BookOpen, Leaf, MessageCircle, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/common/PageHero';
import { WhatsAppCta } from '../components/common/WhatsAppCta';

const principles = [
  ['01', Beaker, 'Thoughtful formulation', 'Products are developed with purposeful everyday rituals and gentle, skin-loving botanicals.'],
  ['02', Leaf, 'Nature-inspired care', 'We look to the relationship between skin, routine and nature for a harmonious, nourishing approach.'],
  ['03', ShieldCheck, 'Quality-focused development', 'Clear communication and personalized routine guidance are central to the Sashwari experience.'],
  ['04', BookOpen, 'Routine education', 'Understanding how to apply each step consistently matters just as much as choosing the right formula.']
];

export default function OurScience() {
  return (
    <main>
      <PageHero
        eyebrow="Beauty meets research"
        title="Thoughtful care, clearly communicated."
        description="Sashwari’s approach brings formulation thinking, nature-inspired care and personal guidance into one simple skincare experience."
        current="Our science"
        theme="sky"
      />

      <section className="section science-intro">
        <div className="container split-layout">
          <div className="science-media-card">
            <div className="science-image-wrap">
              <img
                src="/carousel/Skincare_Routine_Decades.webp"
                alt="Sashwari Skincare Ritual Science"
                className="science-feature-img"
              />
              <div className="science-badge">
                <Sparkles size={16} />
                <span>R&D Botanical Formulations</span>
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Sashwari R&D</span>
            <h2>Good skincare should feel understandable.</h2>
            <p>
              Our philosophy starts with listening to what your skin needs: purposeful products, clear steps and transparent communication that respects what is known and what still needs confirmation.
            </p>
            <p>
              Each formulation balances natural herbal wisdom with modern dermatological care—crafted to restore your natural barrier, promote healthy hydration, and bring out your natural glow.
            </p>
            <div className="mini-benefits">
              <span><CheckCircle2 size={18} /> Barrier-loving formulas</span>
              <span><CheckCircle2 size={18} /> Mindful natural extracts</span>
              <span><CheckCircle2 size={18} /> Transparent guidance</span>
              <span><CheckCircle2 size={18} /> Everyday consistency</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Our principles</span>
              <h2>Beauty with responsibility.</h2>
            </div>
          </div>
          <div className="principle-grid">
            {principles.map(([n, Icon, title, copy]) => (
              <article key={n}>
                <span>{n}</span>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <WhatsAppCta />
      </div>
    </main>
  );
}
