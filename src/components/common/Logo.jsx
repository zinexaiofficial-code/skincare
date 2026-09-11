import { Link } from 'react-router-dom';

export function Logo({ dark = false }) {
  return (
    <Link className={`logo official-logo ${dark ? 'logo-dark' : 'logo-light'}`} to="/" aria-label="Sashwari home">
      <div className="logo-emblem-wrap">
        <img
          src="/brand/origin-logo.png"
          alt="Sashwari Official Emblem"
          className="logo-emblem-img"
        />
      </div>
      <div className="logo-text-wrap">
        <span className="logo-brand-name">SASHWARI</span>
        <span className="logo-brand-tagline">Natural Beauty · Lasting Confidence</span>
      </div>
    </Link>
  );
}

