import { ease } from './motion';
import { useState } from 'react';
import { motion } from 'motion/react';

export function SmartImage({ src, alt, className = '', eager = false, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return <span className={`smart-image ${loaded ? 'is-loaded' : ''} ${failed ? 'is-failed' : ''} ${className}`}><motion.img src={failed ? '/assets/hero.png' : src} alt={alt} loading={eager ? 'eager' : 'lazy'} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 0.65, ease }} {...props} /></span>;
}
