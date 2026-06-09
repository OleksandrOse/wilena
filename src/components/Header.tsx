import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import '../styles/Header.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [apartmentsOpen, setApartmentsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setApartmentsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="header-place">
      <div className="header-place__container">

        {/* Logo */}
        <Link to="/" className="header-place__logo">
          <div className="header-place__logo-title">Wilena</div>
          <div className="header-place__logo-subtitle">apartments</div>
        </Link>

        {/* Desktop nav */}
        <nav className="header-place__nav">
          <a href="tel:+436647378488" className="icon icon--phone">
            <div className="icon__tooltip">+43 664 737 48 88</div>
          </a>

          {/* Apartments dropdown */}
          <div
            className="header-place__dropdown-wrap"
            ref={dropdownRef}
            onMouseEnter={() => setApartmentsOpen(true)}
            onMouseLeave={() => setApartmentsOpen(false)}
          >
            <span className="header-place__nav-item header-place__nav-item--dropdown">
              Apartments
              <svg
                className={`header-place__chevron ${apartmentsOpen ? 'is-open' : ''}`}
                width="12" height="7" viewBox="0 0 12 7"
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </span>

            <AnimatePresence>
              {apartmentsOpen && (
                <motion.div
                  className="header-place__dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    to="/piran"
                    className="header-place__dropdown-item"
                    onClick={() => setApartmentsOpen(false)}
                  >
                    <div>
                      <div className="header-place__dropdown-title">Piran</div>
                      <div className="header-place__dropdown-desc">Slowenien · Meeresurlaub</div>
                    </div>
                  </Link>
                  <Link
                    to="/villach"
                    className="header-place__dropdown-item"
                    onClick={() => setApartmentsOpen(false)}
                  >
                    <div>
                      <div className="header-place__dropdown-title">Villach</div>
                      <div className="header-place__dropdown-desc">Österreich · Natur & Erholung</div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/service" className="header-place__nav-item">Service</Link>
          <Link to="/angebote" className="header-place__nav-item">Angebote</Link>
          <Link to="/contact" className="header-place__nav-item">Kontakt</Link>
        </nav>

        {/* Burger */}
        <button
          className={`header-place__burger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="header-place__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Apartments group */}
            <div className="header-place__mobile-group">
              <div className="header-place__mobile-label">Apartments</div>
              <Link
                to="/piran"
                onClick={() => setMenuOpen(false)}
                className="header-place__mobile-sub header-place__mobile-sub--piran"
              >
                Piran
              </Link>
              <Link
                to="/villach"
                onClick={() => setMenuOpen(false)}
                className="header-place__mobile-sub header-place__mobile-sub--villach"
              >
                Villach
              </Link>
            </div>

            <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>
            <Link to="/angebote" onClick={() => setMenuOpen(false)}>Angebote</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
            <a href="#booking" className="header-place__cta" onClick={() => setMenuOpen(false)}>
              Jetzt buchen
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
