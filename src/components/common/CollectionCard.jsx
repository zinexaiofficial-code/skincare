import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { reveal, ease } from './motion';

export function CollectionCard({ collection, featured = false }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .1 }} variants={reveal} transition={{ duration: .65, ease }}><Link className={`collection-card theme-${collection.theme} ${featured ? 'featured' : ''}`} to={`/collections/${collection.slug}`}><div className="collection-image"><img src={collection.image} alt={`${collection.name} skincare range`} loading={featured ? 'eager' : 'lazy'} /></div><div className="collection-card-copy"><span className="eyebrow">{collection.eyebrow}</span><h3>{collection.name}</h3><p>{collection.description}</p><span className="text-link">Explore range <ArrowUpRight size={16} /></span></div></Link></motion.div>;
}
