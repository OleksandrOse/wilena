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

const stats = [
  { value: "500+", label: "Zufriedene Gäste" },
  // { value: "4.9★", label: "Durchschnittsbewertung" },
  { value: "24/7", label: "Guest Support" },
  // { value: "100%", label: "Self Check-in" },
  { value: "10+", label: "Jahre Erfahrung" },
];

// ─── data ─────────────────────────────────────────────────────────────────────
const lakes = [
  {
    id: 'woerthersee',
    title: 'Wörthersee',
    desc: 'Der bekannteste Kärntner See — ideal zum Baden, Segeln und für einen Ausflug zur Insel Maria Wörth.',
    img: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Wörtersee.jpg`,
  },
  {
    id: 'faakersee',
    title: 'Faaker See',
    desc: 'Kristallklares, türkisfarbenes Wasser vor der Kulisse der Karawanken — nur eine kurze Fahrt entfernt.',
    img: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Faakersee.jpg`,
  },
  {
    id: 'ossiachersee',
    title: 'Ossiacher See',
    desc: 'Ruhiger Familiensee mit Radweg rundherum — perfekt für einen entspannten Tagesausflug.',
    img: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Ossiachersee.jpg`,
  },
];

const apartments = [
  {
    id: '1',
    title: 'Apartment 166',
    tag: 'Villach Warmbad',
    desc: 'Modernes Apartment im Herzen von Villach Warmbad — nur 5 Gehminuten von der Villacher Therme entfernt.',
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00013.jpeg`,
    path: '/apartment1',
    accent: '#6a9b6e',
  },
  {
    id: '2',
    title: 'Apartment 172',
    tag: 'Villach Warmbad',
    desc: 'Familienfreundliches Apartment mit kostenlosem Fahrradverleih direkt im Haus — ideal für einen aktiven Alpenurlaub.',
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment2/21.jpeg`,
    path: '/apartment2',
    accent: '#c9a24d',
  },
];

const features = [
  { icon: '🏔️', title: 'Natur & Berge', desc: 'Umgeben von Kärntner Alpen und kristallklaren Seen.' },
  { icon: '✨', title: 'Komfort & Stil', desc: 'Moderne Ausstattung, Balkon, Vollküche in jedem Apartment.' },
  { icon: "♨️", title: "Therme in der Nähe", desc: "Villacher Warmbad-Therme nur 5 Minuten entfernt." },
  { icon: "🚴", title: "Fahrradverleih", desc: "E-Bikes und Fahrräder direkt vor Ort." },
  { icon: '❄️', title: 'Klimaanlage', desc: 'Angenehme Raumtemperatur zu jeder Jahreszeit in allen Apartments.' },
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
              Ihr gemütliches Zuhause in Kärnten: — Thermen, Seen, Alpen, Dreiländereck (Österreich, Slowenien, Italien).
            </motion.p>
            <motion.div className="home-hero__actions" variants={fadeUp}>
              <button
                className="home-hero__btn home-hero__btn--primary"
                onClick={() => setIsOpen(true)}
              >
                Jetzt buchen
              </button>
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
        {['Warmbader Allee 53, 9504 Villach', 'wilena@speed.at', '+43 664 737 48 88'].map((item, i) => (
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
              Alpine Erholung
              in Villach — wir haben das perfekte Apartment für Sie.
            </motion.p>
            <motion.div className="home-intro__stats" variants={fadeUp}>
              {stats.map((stat) => (
                <div className="home-intro__stat" key={stat.label}>
                  <span>{stat.value}</span>
                  {stat.label}
                </div>
              ))}
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
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/WhatsApp Image 2026-07-04 at 08.59.51 (9).jpeg`}
              alt="Villach"
            />
            <img
              className="home-intro__img home-intro__img--accent"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/WhatsApp Image 2026-07-04 at 08.59.51 (6).jpeg`}
              alt="Piran"
            />
          </motion.div>
        </div>
      </section>

      <section className="home-locations" id="apartments">
        <div className="home-locations__container">
          <motion.div
            className="home-locations__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="home-locations__tag" variants={fadeUp}>Unsere Apartments</motion.span>
            <motion.h2 className="home-locations__title" variants={fadeUp}>
              Zwei einzigartige Apartments
            </motion.h2>
          </motion.div>

          <div className="home-locations__cards">
            {apartments.map((apt, i) => (
              <motion.div
                key={apt.id}
                className="home-location-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover="hover"
                onClick={() => navigate(apt.path)}
              >
                <div className="home-location-card__image-wrap">
                  <motion.img
                    src={apt.img}
                    alt={apt.title}
                    className="home-location-card__image"
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="home-location-card__tag">{apt.tag}</div>
                </div>
                <div className="home-location-card__body">
                  <h3 className="home-location-card__title">{apt.title}</h3>
                  <p className="home-location-card__desc">{apt.desc}</p>
                  <span className="home-location-card__cta">
                    Entdecken →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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


      <section className="home-cycling">
        <div className="home-cycling__container">
          <motion.div
            className="home-cycling__image-wrap"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <img
              className="home-cycling__image"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/WhatsApp Image 2026-07-04 at 09.08.38 (4).jpeg`}
              alt="Fahrradverleih vor Ort"
            />
          </motion.div>

          <motion.div
            className="home-cycling__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="home-cycling__tag" variants={fadeUp}>Aktiv unterwegs</motion.span>
            <motion.h2 className="home-cycling__title" variants={fadeUp}>
              Die Region mit dem Rad entdecken
            </motion.h2>
            <motion.p className="home-cycling__desc" variants={fadeUp}>
              Direkt im Hotel stehen Ihnen Fahrräder und E-Bikes zur Verfügung,
              die Sie gegen eine geringe Gebühr nutzen können.
              Von hier aus starten Radwege rund um Ossiacher See,
              Faaker See und Wörthersee — flach, gut ausgeschildert und für die
              ganze Familie geeignet.
            </motion.p>
            <motion.p className="home-cycling__desc" variants={fadeUp}>
              Wer es sportlicher mag, radelt entlang der Drau bis nach Villach
              oder weiter Richtung Alpe-Adria-Radweg — ein Klassiker für alle,
              die Kärnten aktiv erleben möchten.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── НОВЕ: BURG & THERME (Landskron & Warmbad) ────────────────────── */}
      <section className="home-highlights">
        <div className="home-highlights__container">
          <motion.div
            className="home-highlights__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="home-highlights__tag" variants={fadeUp}>Ausflugsziele</motion.span>
            <motion.h2 className="home-highlights__title" variants={fadeUp}>
              Burg & Therme — beides ganz in der Nähe
            </motion.h2>
          </motion.div>

          <div className="home-highlights__grid">
            <motion.div
              className="home-highlight-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover="hover"
            >
              {/* ПРИМІТКА: фото замку Ландскрон не було серед завантажених — тут тимчасово
                  фото Burg Hochosterwitz. Замініть на реальне фото Landskron, коли буде готове. */}
              <div className="home-highlight-card__image-wrap">
                <motion.img
                  src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/WhatsApp Image 2026-07-04 at 09.07.05 (4).jpeg`}
                  alt="Burg Landskron"
                  className="home-highlight-card__image"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="home-highlight-card__body">
                <h3 className="home-highlight-card__title">Burg Landskron</h3>
                <p className="home-highlight-card__desc">
                  Mittelalterliche Burg über Villach mit Adlerarena und
                  spektakulärem Blick auf den Ossiacher See — ein beliebtes
                  Ausflugsziel für die ganze Familie.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="home-highlight-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover="hover"
            >
              <div className="home-highlight-card__image-wrap home-highlight-card__image-wrap--icon">
                <motion.img
                  src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/WhatsApp Image 2026-07-04 at 09.01.59 (1).jpeg`}
                  alt="Warmbad"
                  className="home-highlight-card__image"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="home-highlight-card__body">
                <h3 className="home-highlight-card__title">Villacher Warmbad-Therme</h3>
                <p className="home-highlight-card__desc">
                  Nur 5 Gehminuten von den Apartments entfernt — Thermalwasser,
                  Saunalandschaft und Entspannung pur, direkt vor der Haustür.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── НОВЕ: DREI-SEEN-LAND ──────────────────────────────────────────── */}
      <section className="home-lakes">
        <div className="home-lakes__container">
          <motion.div
            className="home-lakes__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="home-lakes__tag" variants={fadeUp}>Drei-Seen-Land</motion.span>
            <motion.h2 className="home-lakes__title" variants={fadeUp}>
              Drei Seen in unmittelbarer Nähe
            </motion.h2>
            <motion.p className="home-lakes__intro" variants={fadeUp}>
              Wörthersee, Faaker See und Ossiacher See liegen alle nur eine
              kurze Fahrt von Ihrem Apartment entfernt — perfekt für einen
              erholsamen Tag am Wasser.
            </motion.p>
          </motion.div>

          <motion.div
            className="home-lakes__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            {lakes.map((lake) => (
              <motion.div key={lake.id} className="home-lake-card" variants={fadeUp} whileHover="hover">
                {lake.img ? (
                  <div className="home-lake-card__image-wrap">
                    <motion.img
                      src={lake.img}
                      alt={lake.title}
                      className="home-lake-card__image"
                      variants={{ hover: { scale: 1.06 } }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ) : (
                  // ПРИМІТКА: для Ossiacher See немає завантаженого фото — показуємо картку з іконкою
                  <div className="home-lake-card__image-wrap home-lake-card__image-wrap--icon">
                    <span className="home-lake-card__icon">🌊</span>
                  </div>
                )}
                <div className="home-lake-card__body">
                  <h3 className="home-lake-card__title">{lake.title}</h3>
                  <p className="home-lake-card__desc">{lake.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
