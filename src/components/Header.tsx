import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import '../styles/Header.scss';

type Lang = "de" | "en";

const LANG_LABEL: Record<Lang, string> = { de: "DE", en: "EN" };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [apartmentsOpen, setApartmentsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "de"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setApartmentsOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
    setLangOpen(false);
    // тут згодом можна викликати i18n.changeLanguage(l)
  };

  return (
    <header className="header-place">
      <div className="header-place__container">

        {/* Logo */}
        <Link to="/" className="header-place__logo">
          <div className="header-place__logo-title">Wilena</div>
          <div className="header-place__logo-subtitle">apartments</div>
        </Link>

        {/* Desktop nav */}
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
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
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
                    to="/apartment1"
                    className="header-place__dropdown-item"
                    onClick={() => setApartmentsOpen(false)}
                  >
                    <div>
                      <div className="header-place__dropdown-title">Apartment 166</div>
                    </div>
                  </Link>
                  <Link
                    to="/apartment2"
                    className="header-place__dropdown-item"
                    onClick={() => setApartmentsOpen(false)}
                  >
                    <div>
                      <div className="header-place__dropdown-title">Apartment 172</div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/freizeit" className="header-place__nav-item">Freizeit</Link>
          <Link to="/umgebung" className="header-place__nav-item">Umgebung</Link>
          <Link to="/service" className="header-place__nav-item">Service</Link>
          <Link to="/angebote" className="header-place__nav-item">Angebote</Link>
          <Link to="/contact" className="header-place__nav-item">Kontakt</Link>

          {/* Language popup — тепер частина основного nav */}
          <div className="header-place__lang" ref={langRef}>
            <button
              className="header-place__lang-toggle"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Sprache wählen"
            >
              {LANG_LABEL[lang]}
              <svg
                className={`header-place__chevron ${langOpen ? 'is-open' : ''}`}
                width="10" height="6" viewBox="0 0 12 7"
              >
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="header-place__lang-popup"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    className={`header-place__lang-option ${lang === "de" ? "is-active" : ""}`}
                    onClick={() => changeLang("de")}
                  >
                    Deutsch
                  </button>
                  <button
                    className={`header-place__lang-option ${lang === "en" ? "is-active" : ""}`}
                    onClick={() => changeLang("en")}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Burger (тепер сам по собі, без обгортки __right) */}
        <button
          className={`header-place__burger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span /><span /><span />
        </button>

        {/* Right-side controls: language popup (desktop only) + burger */}
       
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
                to="/apartment1"
                onClick={() => setMenuOpen(false)}
                className="header-place__mobile-sub header-place__mobile-sub--villach"
              >
                Apartment 166
              </Link>
              <Link
                to="/apartment2"
                onClick={() => setMenuOpen(false)}
                className="header-place__mobile-sub header-place__mobile-sub--villach"
              >
                Apartment 172
              </Link>
            </div>

            <Link to="/freizeit" onClick={() => setMenuOpen(false)}>Freizeit</Link>
            <Link to="/umgebung" onClick={() => setMenuOpen(false)}>Umgebung</Link>
            <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>
            <Link to="/angebote" onClick={() => setMenuOpen(false)}>Angebote</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>

            {/* Language switcher inside burger menu */}
            <div className="header-place__mobile-group header-place__mobile-group--lang">
              <div className="header-place__mobile-label">Sprache</div>
              <button
                className={`header-place__mobile-sub ${lang === "de" ? "is-active" : ""}`}
                onClick={() => changeLang("de")}
              >
                Deutsch
              </button>
              <button
                className={`header-place__mobile-sub ${lang === "en" ? "is-active" : ""}`}
                onClick={() => changeLang("en")}
              >
                English
              </button>
            </div>

            <a href="#booking" className="header-place__cta" onClick={() => setMenuOpen(false)}>
              Jetzt buchen
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
