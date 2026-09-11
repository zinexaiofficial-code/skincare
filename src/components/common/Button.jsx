import { ArrowUpRight } from 'lucide-react';
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
