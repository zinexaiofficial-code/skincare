import { useEffect, useState } from 'react';
import { Menu, MessageCircle, Search, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { site } from '../../data/site';

const links = [
  ['/', 'Home'],
  ['/collections', 'Collections'],
  ['/skin-concerns', 'Skin concerns'],
  ['/our-science', 'Our science'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : 'site-header-hero'}`}>
      <div className="container nav-wrap">
        <Logo />
        <nav id="main-navigation" className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
          {links.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button search-button" aria-label="Search coming soon">
            <Search size={19} />
          </button>
          <a className="icon-button whatsapp-icon" href={site.whatsappUrl()} aria-label="Contact Sashwari on WhatsApp">
            <MessageCircle size={19} />
          </a>
          <button
            className="icon-button menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
