'use client';

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Footer.scss';

const socials = [
  {
    name: 'Telegram',
    href: 'https://t.me/your_username',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21.5 4.5 2.7 11.9c-1.2.5-1.2 1.2-.2 1.5l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.8-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.5c.3-1.2-.4-1.7-1.2-1.4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/your_username',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/436647374888',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 12a8 8 0 1 1-3.7-6.7L20 4l-1 3.6A7.96 7.96 0 0 1 20 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8.5 9c.3 2.5 2 4.2 4.5 4.5l1-1.2 1.7.8-.3 1.4c-2.8.6-6-1.5-6.7-4.3l1.4-.3.8 1.7-1.4-2.6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/your_page',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const navLinks = [
  { to: '/apartment1', label: 'Apartment 166' },
  { to: '/apartment2', label: 'Apartment 172' },
  { to: '/angebote', label: 'Angebote' },
  { to: '/freizeit', label: 'Freizeit' },
  { to: '/umgebung', label: 'Umgebung' },
  { to: '/service', label: 'Service' },
  { to: '/contact', label: 'Kontakt' },
];

const legalLinks = [
  { to: '/stornobedingungen', label: 'Buchungs- & Stornobedingungen' },
  { to: '/hausordnung', label: 'Hausordnung' },
  { to: '/impressum', label: 'Impressum' },
  { to: '/datenschutz', label: 'Datenschutz' },
  { to: '/cookies', label: 'Cookies' },
];

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__col footer__col--brand">
            <h2 className="footer__brand">Wilena Apartments</h2>
            <p className="footer__tagline">
              Ankommen. Durchatmen. Wohlfühlen.
              <br />
              Ihr Zuhause auf Zeit in Warmbad Villach.
            </p>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="footer__social"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="footer__col" aria-label="Navigation">
            <h3 className="footer__heading">Entdecken</h3>
            <ul className="footer__list">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div className="footer__col">
            <h3 className="footer__heading">Kontakt</h3>
            <ul className="footer__list footer__list--icons">
              <li>
                <MapPin size={16} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Warmbader+Allee+53%2C+9504+Villach"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Warmbader Allee 53
                  <br />
                  9504 Villach, Österreich
                </a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+436647374888">+43 664 737 48 88</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:wilena@speed.at">wilena@speed.at</a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <nav className="footer__col" aria-label="Rechtliches">
            <h3 className="footer__heading">Rechtliches &amp; Informationen</h3>
            <ul className="footer__list">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Wilena Apartments · Dr. Elena Schollenberg</span>
          <span>Warmbad Villach · Kärnten · Österreich</span>
        </div>
      </div>
    </footer>
  );
}
