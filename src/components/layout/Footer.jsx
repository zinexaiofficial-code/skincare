import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Logo } from '../common/Logo';
import { site } from '../../data/site';

export function Footer() {
  return <footer><div className="container footer-grid"><div className="footer-brand"><Logo dark /><p>Thoughtful skincare rituals for natural beauty and lasting confidence.</p><a className="social-link" href={site.tiktok} target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={15} /></a></div><div><h4>Explore</h4><Link to="/collections">Collections</Link><Link to="/skin-concerns">Skin concerns</Link><Link to="/our-science">Our science</Link></div><div><h4>About Sashwari</h4><Link to="/about">Our story</Link><Link to="/contact">Contact</Link><a href={site.whatsappUrl()}>WhatsApp <MessageCircle size={15} /></a></div><div className="footer-note"><span className="eyebrow">A softer ritual</span><p>Made for everyday care, personal guidance and confident choices.</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Sashwari. All rights reserved.</span><span>Natural Beauty… Lasting Confidence.</span></div></footer>;
}
