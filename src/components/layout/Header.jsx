import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
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
    document.documentElement.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : 'site-header-hero'}`}>
        <div className="container nav-wrap">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="nav-links desktop-nav" aria-label="Main navigation">
            {links.map(([path, label]) => (
              <NavLink key={path} to={path} end={path === '/'}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Navigation Actions */}
          <div className="nav-actions">
            <button className="icon-button search-button" aria-label="Search coming soon">
              <Search size={19} />
            </button>
            <a
              className="icon-button whatsapp-icon"
              href={site.whatsappUrl()}
              aria-label="Contact Sashwari on WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={19} />
            </a>
            <button
              className="icon-button menu-button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Full-Screen Mobile Drawer */}
      <div
        id="mobile-navigation"
        className={`mobile-nav-drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
      >
        <div className="mobile-drawer-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-top">
            <Logo />
            <button
              className="mobile-drawer-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <nav className="nav-links mobile-links" aria-label="Mobile navigation">
              {links.map(([path, label], idx) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `mobile-link-item ${isActive ? 'active' : ''}`}
                >
                  <span className="mobile-link-num">0{idx + 1}</span>
                  <span className="mobile-link-text">{label}</span>
                  <ArrowUpRight size={18} className="mobile-link-arrow" />
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mobile-drawer-bottom">
            <a
              className="mobile-drawer-whatsapp-btn"
              href={site.whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon size={20} />
              <span>WhatsApp Consultation</span>
            </a>
            <p className="mobile-drawer-slogan">Natural Beauty · Lasting Confidence</p>
          </div>
        </div>
      </div>
    </>
  );
}

