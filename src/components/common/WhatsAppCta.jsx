import { Phone } from 'lucide-react';
import { Button } from './Button';
import { WhatsAppIcon } from './WhatsAppIcon';
import { site } from '../../data/site';

export function WhatsAppCta({ compact = false }) {
  return (
    <section className={`whatsapp-cta ${compact ? 'compact' : ''}`}>
      <div>
        <span className="eyebrow">Let’s find your glow</span>
        <h2>Need help choosing the right Sashwari routine?</h2>
        <p>Tell us what your skin needs and our team can guide you toward the most suitable collection.</p>
      </div>
      <div className="cta-actions">
        <Button href={site.whatsappUrl()}>
          <WhatsAppIcon size={18} /> WhatsApp guidance
        </Button>
        <a className="button button-ghost" href={`tel:+${site.whatsapp}`}>
          <Phone size={17} /> Call us
        </a>
      </div>
    </section>
  );
}
