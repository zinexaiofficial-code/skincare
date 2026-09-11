from pathlib import Path
p=Path('src')
def write(f,s): (p/f).write_text(s)
write('components/common/theme.js', '''export function pageTheme(path) {
  if (path.includes('pimple-care') || path === '/skin-concerns') return 'botanical';
  if (path.includes('brightening') || path === '/our-science') return 'science';
  if (path.includes('sensitive-skin')) return 'sensitive';
  if (path.includes('bridal')) return 'bridal';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  return 'rose';
}
''')
write('components/common/motion.jsx', '''import { useEffect, useRef } from 'react';
import { animate, motion, useReducedMotion } from 'motion/react';
export const ease = [0.22, 1, 0.36, 1];
export const reveal = { hidden: { opacity: 0, y: 40, scale: .94 }, visible: { opacity: 1, y: 0, scale: 1 } };
export const stagger = { hidden: {}, visible: { transition: { staggerChildren: .1 } } };
export function FadeUp({ children, className = '', delay = 0, once = true }) {
 const reduced = useReducedMotion();
 return <motion.div className={className} initial={reduced ? false : 'hidden'} variants={reveal} whileInView="visible" viewport={{ once, amount: .12 }} transition={{ duration: .7, delay, ease }}>{children}</motion.div>;
}
export function Stagger({ children, className = '' }) {
 const reduced = useReducedMotion();
 return <motion.div className={className} variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .1 }}>{children}</motion.div>;
}
// Shared entrances also cover editorial content, forms and footer columns.
export function ContentMotion({ children, className = '' }) {
 const ref = useRef(null); const reduced = useReducedMotion();
 useEffect(() => {
  if (reduced) return;
  const small = matchMedia('(max-width: 768px)').matches;
  const controls = []; const root = ref.current;
  const selector = '.section-heading, .split-layout > *, .editorial-story > *, .testimonial-layout > *, .contact-grid > *, .principle-grid > *, .values-grid > *, .routine-step, .routine-line > *, .product-card, .benefit-list > *, .concern-row, .whatsapp-cta, .catalogue-tools, .detail-content > *, .detail-copy > *, .detail-image, .footer-grid > *, .not-found > *, .hero-reveal';
  const elements = [...root.querySelectorAll(selector)];
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (!entry.isIntersecting) return;
   const el = entry.target; const i = elements.indexOf(el); const slide = el.parentElement.matches('.split-layout, .editorial-story, .contact-grid');
   controls.push(animate(el, { opacity: [0, 1], x: slide ? [(i % 2 ? 1 : -1) * (small ? 24 : 40), 0] : [0, 0], y: slide ? [0, 0] : [small ? 24 : 40, 0], scale: slide ? [1, 1] : [.94, 1] }, { duration: small ? .5 : .75, delay: (i % 4) * .09, ease }));
   observer.unobserve(el);
  }), { threshold: .08 });
  elements.forEach(el => observer.observe(el));
  return () => { observer.disconnect(); controls.forEach(c => c.stop()); };
 }, [reduced]);
 return <div ref={ref} className={className}>{children}</div>;
}
''')
write('components/common/PageHero.jsx', '''import { motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from './Breadcrumbs';
import { ease } from './motion';
const heroImages = { plum: '/carousel/images.jpeg', blush: '/carousel/istockphoto-1496614896-612x612.jpg', sky: '/carousel/image-7.png', champagne: '/carousel/istockphoto-1832208611-612x612.jpg', mint: '/carousel/woman-applying-face-cream_1303-14311.avif' };
export function PageHero({ eyebrow, title, description, current, theme = 'plum' }) {
 const reduced = useReducedMotion();
 const entrance = (delay, x = 0) => ({ initial: reduced ? false : { opacity: 0, y: x ? 0 : 24, x }, animate: { opacity: 1, y: 0, x: 0 }, transition: { duration: reduced ? .1 : .7, delay: reduced ? 0 : delay, ease } });
 const lines = title.match(/[^,.!?]+[, .!?]*/g) || [title];
 return <section className={`page-hero page-hero-${theme}`}><motion.div className="hero-theme-background" initial={reduced ? false : { scaleY: .7 }} animate={{ scaleY: 1 }} transition={{ duration: .65, ease }} /><div className="container page-hero-content"><div className="page-hero-panel"><div className="hero-orbit" /><motion.div {...entrance(.08)}><Breadcrumbs current={current} /></motion.div><div className="page-hero-copy"><motion.span className="eyebrow" {...entrance(.15)}>{eyebrow}</motion.span><h1 aria-label={title}>{lines.map((line, i) => <span className="heading-line" aria-hidden="true" key={i}><motion.span {...entrance(.22 + i * .09)}>{line}</motion.span></span>)}</h1><motion.p {...entrance(.38)}>{description}</motion.p></div></div><motion.div className="page-hero-media" {...entrance(.3, 40)}><motion.img src={heroImages[theme] || heroImages.plum} alt="Sashwari skincare ritual" initial={reduced ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.35, ease }} /></motion.div></div></section>;
}
''')
write('components/common/Button.jsx', '''import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
const MotionLink = motion.create(Link);
export function Button({ children, href, variant = 'primary', className = '', ...props }) {
 const reduced = useReducedMotion(); const x = useMotionValue(0); const y = useMotionValue(0);
 const sx = useSpring(x, { stiffness: 220, damping: 22 }); const sy = useSpring(y, { stiffness: 220, damping: 22 });
 const move = e => { if (reduced || e.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left-r.width/2)*.07); y.set((e.clientY-r.top-r.height/2)*.1-4); };
 const shared = { className: `button button-${variant} ${className}`, style: { x: sx, y: sy }, onPointerMove: move, onPointerLeave: () => { x.set(0); y.set(0); }, ...props };
 const content = <>{children}<ArrowUpRight size={17} /></>;
 if (href?.startsWith('/')) return <MotionLink to={href} {...shared}>{content}</MotionLink>;
 return href ? <motion.a href={href} {...shared}>{content}</motion.a> : <motion.button {...shared}>{content}</motion.button>;
}
''')
f=p/'components/common/CollectionCard.jsx';s=f.read_text().replace("import { motion }", "import { motion, useReducedMotion }").replace('  return <motion.div variants={reveal}', "  const reduced = useReducedMotion();\n  return <motion.div initial={reduced ? false : 'hidden'} whileInView=\"visible\" viewport={{ once: true, amount: .1 }} variants={reveal}").replace(' whileHover={{ y: -7 }}','');f.write_text(s)
f=p/'components/common/SmartImage.jsx';s=f.read_text().replace("import { motion }", "import { motion }");s="import { ease } from './motion';\n"+s;f.write_text(s)
f=p/'components/common/BrandLoader.jsx';s=f.read_text().replace("import { motion }", "import { motion, useReducedMotion }").replace('  useEffect(() =>', '  const reduced = useReducedMotion();\n  useEffect(() =>').replace('1850','reduced ? 0 : 1200').replace('[onComplete]', '[onComplete, reduced]');f.write_text(s)
f=p/'components/layout/Header.jsx';s=f.read_text().replace('<nav className=', '<nav id="main-navigation" className=');f.write_text(s)
f=p/'components/layout/SiteShell.jsx';s=f.read_text();s="import { ContentMotion } from '../common/motion';\n"+s;s=s.replace('<Footer />','<ContentMotion><Footer /></ContentMotion>');s=s.replace("behavior: 'smooth'", "behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'");f.write_text(s)
f=p/'data/site.js';s=f.read_text().replace('/src/assets/', '/assets/');f.write_text(s)
f=p/'App.jsx';s=f.read_text();s=s[:s.index('function ScrollReset')]+'''export default function App() {
 const reduced = useReducedMotion();
 const [loading, setLoading] = useState(() => !sessionStorage.getItem('sashwari-loaded'));
 const finishLoading = useCallback(() => { sessionStorage.setItem('sashwari-loaded', 'true'); setLoading(false); }, []);
 const location = useLocation(); const theme = pageTheme(location.pathname);
 const [firstPath] = useState(location.pathname);
 const small = window.matchMedia('(max-width: 768px)').matches;
 return <MotionConfig reducedMotion="user"><div className={`site-theme theme-page-${theme}`}><AnimatePresence>{loading && <BrandLoader onComplete={finishLoading} />}</AnimatePresence><SiteShell><AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}><motion.div key={location.pathname} initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: small ? 14 : 24 }} animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: reduced ? .1 : small ? .45 : .55, ease } }} exit={{ opacity: reduced ? 0 : .4, scale: reduced ? 1 : .985, transition: { duration: reduced ? .1 : .28 } }}><ContentMotion><Routes location={location}><Route path="/" element={<Home />} /><Route path="/collections" element={<Collections />} /><Route path="/collections/:slug" element={<CollectionDetail />} /><Route path="/skin-concerns" element={<SkinConcerns />} /><Route path="/our-science" element={<OurScience />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></ContentMotion></motion.div></AnimatePresence></SiteShell><AnimatePresence>{!reduced && location.key !== 'default' && <motion.div key={location.key} className="route-sweep" initial={{ x: '-100%' }} animate={{ x: ['-100%', '0%', '100%'] }} transition={{ duration: small ? .55 : .75, times: [0, .45, 1], ease }} aria-hidden="true"><img src="/brand/sashwari-logo.png" alt="" /></motion.div>}</AnimatePresence></div></MotionConfig>;
}
''';s=s.replace("import { AnimatePresence, motion }", "import { AnimatePresence, motion, MotionConfig, useReducedMotion }");s="import { pageTheme } from './components/common/theme';\nimport { ContentMotion, ease } from './components/common/motion';\n"+s; s=s.replace(' const [firstPath] = useState(location.pathname);','');f.write_text(s)
