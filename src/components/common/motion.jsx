import { useEffect, useRef } from 'react';
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
