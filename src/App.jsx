import { ContentMotion, ease } from './components/common/motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { SiteShell } from './components/layout/SiteShell';
import { BrandLoader } from './components/common/BrandLoader';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import SkinConcerns from './pages/SkinConcerns';
import OurScience from './pages/OurScience';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
 const reduced = useReducedMotion();
 const [loading, setLoading] = useState(true);
 const finishLoading = useCallback(() => { setLoading(false); }, []);
 const location = useLocation();

 const small = window.matchMedia('(max-width: 768px)').matches;
 return <MotionConfig reducedMotion="user"><div className="site-theme"><AnimatePresence>{loading && <BrandLoader onComplete={finishLoading} />}</AnimatePresence><SiteShell><AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}><motion.div key={location.pathname} initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02, y: small ? 14 : 24 }} animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: reduced ? .1 : small ? .45 : .55, ease } }} exit={{ opacity: reduced ? 0 : .4, scale: reduced ? 1 : .985, transition: { duration: reduced ? .1 : .28 } }}><ContentMotion><Routes location={location}><Route path="/" element={<Home />} /><Route path="/collections" element={<Collections />} /><Route path="/collections/:slug" element={<CollectionDetail />} /><Route path="/skin-concerns" element={<SkinConcerns />} /><Route path="/our-science" element={<OurScience />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></ContentMotion></motion.div></AnimatePresence></SiteShell></div></MotionConfig>;
}
