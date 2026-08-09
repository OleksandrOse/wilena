'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Landmark, Copy, Check } from 'lucide-react';
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
    href: 'https://wa.me/436647378488',
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

const bankDetails = [
  { label: 'Empfänger', value: 'Wilena Apartment' },
  { label: 'Inhaber', value: 'Dr. Elena Schollenberg' },
  { label: 'Bank', value: 'Hypo Salzburg' },
  { label: 'IBAN', value: 'AT57 3400 0647 0449 3128' },
  { label: 'BIC', value: 'RZOOAT2L' },
];

export default function Footer() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''));
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer__content">

        <div className="footer__block footer__block--center">
          <h3 className="footer__title footer__title--center">Wilena Apartments</h3>
          <p>
            <MapPin size={16} />
            <a
              href="https://www.google.com/maps/search/?api=1&query=Warmbader+Allee+53%2C+9504+Villach"
              target="_blank"
              rel="noopener noreferrer"
            >
              Warmbader Allee 53, 9504 Villach
            </a>
          </p>

          <h3 className="footer__title footer__title--center">Contact</h3>
          <p>
            <Mail size={16} />
            <a href="mailto:wilena@speed.at">wilena@speed.at</a>
          </p>
          <p>
            <Phone size={16} />
            <a href="tel:+436647378488">+43 664 7378 4888</a>
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


        <div className="footer__block footer__block--center footer__block--bank">
          <h3 className="footer__title footer__title--center">
            <Landmark size={16} />
            <span>Bankverbindung</span>
          </h3>
          <div className="footer__bank">
            {bankDetails.map((item) => (
              <div className="footer__bank-row" key={item.label}>
                <span className="footer__bank-label">{item.label}</span>
                <span className="footer__bank-value">
                  {item.value}
                  <button
                    type="button"
                    className="footer__copy-btn"
                    onClick={() => handleCopy(item.label, item.value)}
                    aria-label={`${item.label} kopieren`}
                  >
                    {copiedField === item.label ? (
                      <Check size={13} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
