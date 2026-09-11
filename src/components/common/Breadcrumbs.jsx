import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Breadcrumbs({ current }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} /><span>{current}</span></nav>;
}
