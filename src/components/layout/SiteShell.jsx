import { ContentMotion } from '../common/motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { site } from '../../data/site';

export function SiteShell({ children }) { const [top, setTop] = useState(false); useEffect(() => { const fn = () => setTop(window.scrollY > 500); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []); return <><Header />{children}<a className="floating-whatsapp" href={site.whatsappUrl()} aria-label="Chat with Sashwari on WhatsApp">✦</a>{top && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} aria-label="Back to top"><ArrowUp size={17} /></button>}<ContentMotion><Footer /></ContentMotion></>; }
