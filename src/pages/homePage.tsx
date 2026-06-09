import { FC, useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalBooking from '../components/ModalBooking';
import Testimonials from '../components/Testimonials';
import '../styles/HomePage.scss';

// ─── animation helpers ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

// ─── data ─────────────────────────────────────────────────────────────────────
const locations = [
  {
    id: 'piran',
    title: 'Piran',
    tag: 'Slowenien',
    desc: 'Meeresurlaub in einer malerischen Küstenstadt mit kristallklarem Wasser.',
    img: `${process.env.PUBLIC_URL}/Wilena/piran/12.jpeg`,
    path: '/piran',
    accent: '#4a90b8',
  },
  {
    id: 'villach',
    title: 'Villach',
    tag: 'Österreich',
    desc: 'Natur und Erholung in Kärnten — Berge, Seen und Thermalquellen.',
    img: `${process.env.PUBLIC_URL}/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg`,
    path: '/villach',
    accent: '#6a9b6e',
  },
];

const features = [
  { icon: '🏔️', title: 'Natur & Berge', desc: 'Umgeben von Kärntner Alpen und kristallklaren Seen.' },
  { icon: '🌊', title: 'Meeresurlaub', desc: 'Direkt an der Adria in der charmanten Stadt Piran.' },
  { icon: '✨', title: 'Komfort & Stil', desc: 'Moderne Ausstattung, Balkon, Vollküche in jedem Apartment.' },
  { icon: '🅿️', title: 'Kostenlos parken', desc: 'Privater Stellplatz direkt vor dem Haus inklusive.' },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export const HomePage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="home-hero" ref={heroRef}>
        <motion.div className="home-hero__bg" style={{ y: heroY }} />
        <motion.div className="home-hero__overlay" style={{ opacity: heroOpacity }}>
          <motion.div
            className="home-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="home-hero__eyebrow" variants={fadeUp}>
              WILLKOMMEN BEI
            </motion.p>
            <motion.h1 className="home-hero__title" variants={fadeUp}>
              Wilena<br />
              <span>apartments</span>
            </motion.h1>
            <motion.p className="home-hero__subtitle" variants={fadeUp}>
              Ihr gemütliches Zuhause — in den Alpen und am Meer
            </motion.p>
            <motion.div className="home-hero__actions" variants={fadeUp}>
              <button
                className="home-hero__btn home-hero__btn--primary"
                onClick={() => setIsOpen(true)}
              >
                Jetzt buchen
              </button>
              <a href="#locations" className="home-hero__btn home-hero__btn--outline">
                Locations entdecken
              </a>
            </motion.div>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            className="home-hero__scroll"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <span>↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── INTRO STRIP ──────────────────────────────────────────────────── */}
      <motion.section
        className="home-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        {['Villach, Österreich', 'Piran, Slowenien', 'wilena@speed.at', '+43 664 737 48 88'].map((item, i) => (
          <motion.div key={i} className="home-strip__item" variants={fadeUp}>
            {item}
          </motion.div>
        ))}
      </motion.section>

      {/* ── INTRO / ABOUT ─────────────────────────────────────────────────── */}
      <section className="home-intro">
        <div className="home-intro__container">
          <motion.div
            className="home-intro__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="home-intro__tag" variants={fadeUp}>Über uns</motion.span>
            <motion.h2 className="home-intro__title" variants={fadeUp}>
              Willkommen bei<br />Wilena Apartments
            </motion.h2>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Willkommen in den Wilena Apartments — Ihrem Rückzugsort für Erholung,
              Komfort und unvergessliche Urlaubsmomente. Unsere Apartments vereinen
              moderne Ausstattung mit einer ruhigen Lage inmitten der Natur.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Ob Meeresurlaub an der slowenischen Küste in Piran oder alpine Erholung
              in Villach — wir haben das perfekte Apartment für Sie.
            </motion.p>
            <motion.div className="home-intro__stats" variants={fadeUp}>
              <div className="home-intro__stat"><span>2</span>Locations</div>
              <div className="home-intro__stat"><span>8+</span>Apartments</div>
              <div className="home-intro__stat"><span>10+</span>Jahre Erfahrung</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-intro__images"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <img
              className="home-intro__img home-intro__img--main"
              src={`${process.env.PUBLIC_URL}/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg`}
              alt="Villach"
            />
            <img
              className="home-intro__img home-intro__img--accent"
              src={`${process.env.PUBLIC_URL}/Wilena/piran/12.jpeg`}
              alt="Piran"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="home-features">
        <div className="home-features__container">
          <motion.h2
            className="home-features__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ihr perfekter Urlaub — <em>Ihre Wahl</em>
          </motion.h2>
          <motion.div
            className="home-features__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="home-feature-card"
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                <div className="home-feature-card__icon">{f.icon}</div>
                <h3 className="home-feature-card__title">{f.title}</h3>
                <p className="home-feature-card__desc">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LOCATIONS ─────────────────────────────────────────────────────── */}
      <section className="home-locations" id="locations">
        <div className="home-locations__container">
          <motion.div
            className="home-locations__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="home-locations__tag" variants={fadeUp}>Unsere Locations</motion.span>
            <motion.h2 className="home-locations__title" variants={fadeUp}>
              Zwei einzigartige Destinationen
            </motion.h2>
          </motion.div>

          <div className="home-locations__cards">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.id}
                className="home-location-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover="hover"
                onClick={() => navigate(loc.path)}
              >
                <div className="home-location-card__image-wrap">
                  <motion.img
                    src={loc.img}
                    alt={loc.title}
                    className="home-location-card__image"
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="home-location-card__tag">{loc.tag}</div>
                </div>
                <div className="home-location-card__body">
                  <h3 className="home-location-card__title">{loc.title}</h3>
                  <p className="home-location-card__desc">{loc.desc}</p>
                  <span className="home-location-card__cta">
                    Entdecken →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <div className="home-testimonials-wrap">
        <Testimonials />
      </div>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <motion.section
        className="home-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="home-cta__inner">
          <h2 className="home-cta__title">Bereit für Ihren Traumurlaub?</h2>
          <p className="home-cta__text">Buchen Sie jetzt direkt und sichern Sie sich die besten Preise.</p>
          <button className="home-cta__btn" onClick={() => setIsOpen(true)}>
            Jetzt buchen
          </button>
        </div>
      </motion.section>

      <Footer />
      <ModalBooking isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
