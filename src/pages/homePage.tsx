import { FC, useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalBooking from '../components/ModalBooking';
import Testimonials from '../components/Testimonials';
import { Star } from "lucide-react";
import '../styles/HomePage.scss';

function SuperhostBadge() {
  return (
    <Star
      className="stat-superhost-icon"
      size={14}
      fill="#FF385C"
      stroke="#FF385C"
      aria-label="Superhost"
    />
  );
}

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
  { value: "24/7", label: "Guest unterstützung" },
  // { value: "100%", label: "Self Check-in" },
  { value: "9,2/10", label: "Booking.com" },
  { value: "5,0/5", label: "Airbnb" },
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
    desc: `Dieses gemütliche, moderne Apartment in warmen Farbtönen bietet einen Balkon mit Blick 
           auf den grünen Garten – ideal für entspannte Abende. Es verfügt über Klimaanlage, 
           Zentralheizung, Internet und alles, was Sie für einen komfortablen Aufenthalt oder 
           einen kurzen Zwischenstopp im Süden benötigen. Das Apartment besteht aus einem 
           Wohnzimmer mit Schlafcouch und einem separaten Schlafzimmer mit Doppelbett und 
           Einzelschlafcouch. Die Küche ist klein, aber komplett ausgestattet mit allem, 
           was Sie für einen komfortablen Aufenthalt brauchen. Dazu gehören Kaffeemaschine, 
           Wasserkocher, Mikrowelle, Backofen, Geschirrspüler, Toaster, Geschirr, Kaffee, 
           Tee, Öl, Salz, Zucker, Eis im Gefrierfach und alle notwendigen Reinigungsmittel. 
           Das Badezimmer ist mit Dusche, Waschmaschine und allem Notwendigen ausgestattet, 
           darunter Föhn, Waschmittel, Wäscheklammern, Wäschetrockner, Lufterfrischer, 
           Duschgel, Duschhaube, Toilettenartikel und mehrere Handtücher. Spielzeug und 
           Brettspiele stehen für Kinder bereit, und das Apartment verfügt außerdem über 
           einen Fernseher. Für Ihren Besuch der Thermen in Kärnten stellen wir Ihnen eine 
           Strandtasche und Handtücher zur Verfügung. Ein Safe für Ihre persönlichen Gegenstände 
           ist ebenfalls vorhanden.`,
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00013.jpeg`,
    path: '/apartment1',
    accent: '#6a9b6e',
  },
  {
    id: '2',
    title: 'Apartment 172',
    tag: 'Villach Warmbad',
    desc: `Geräumiges Apartment mit Naturholzboden und Deko mit stilvollen Bergmotiven, 
          Balkon und Klimaanlage. Das Apartment verfügt über Zentralheizung, 
          Internet und alles, was Sie für einen komfortablen Aufenthalt oder einen kurzen 
          Zwischenstopp auf dem Weg in den Süden benötigen. Es besteht aus einem Wohnzimmer 
          mit einem Schlafsofa für 2 Personen und eine zusätzliche Einzelschlafsofa, 
          sowie einen separaten Schlafzimmer mit einem Doppelbett und einer Einzelschlafsofa. 
          Bei Bedarf kann noch ein Zustellbett bereitgestellt werden. Die Küche ist komplett 
          ausgestattet mit Kaffeemaschine, Wasserkocher, Mikrowelle, Backofen, Geschirrspüler, 
          Toaster, Geschirr sowie Kaffee, Tee, Öl , Salz, Zucker, Eis im Gefrierschrank und den 
          notwendigen Reinigungsmitteln. Das Badezimmer ist mit Dusche, Waschmaschine und allen 
          notwendigen Badartikeln ausgestattet, darunter Föhn, Waschmittel, Wäscheklammern, 
          Lufterfrischer, Duschgel, Duschhaube, Toilettenartikel und mehrere Handtuchsets. 
          Für längere Aufenthalte stellen wir einen Staubsauger und Reinigungsmittel zur Verfügung. 
          Spielzeug und Brettspiele für Kinder sind vorhanden, und das Apartment verfügt über einen 
          Fernseher und einen DVD-Player. Wir stellen Ihnen außerdem eine Strandtasche und Handtücher 
          für Ihren Besuch der Kärntner Thermen zur Verfügung. Die Wohnung verfügt zudem über einen 
          Safe zur Aufbewahrung Ihrer persönlichen Gegenstände.`,
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment2/21.jpeg`,
    path: '/apartment2',
    accent: '#c9a24d',
  },
];

const features = [
  
  { icon: '✨', title: 'Komfort & Stil', desc: 'Moderne Ausstattung, Balkon, Vollküche und Klimanlage in jedem Apartment.' },
  { icon: '🏔️', title: 'Seen & Berge', desc: 'Umgebend von Kärntner Alpen und kristallklaren Seen.' },
  { icon: "♨️", title: "Therme in der Nähe", desc: "Villacher Warmbad-Therme nur 5 Minuten entfernt." },
  { icon: "🚴", title: "Fahrradwege und Wanderwege", desc: "Fahrradstellplatz ist vorhanden." },
   { icon: '⛷️', title: 'Wintersport', desc: 'Langlaufloipe und Ski Lift in der Nähe.' },
  { icon: '💆', title: 'Wellness und Reha', desc: 'Kurzentrum, Rehazentrum und Privatklinik für Gesundheit sind in der Nähe.' },
  { icon: '🛍️', title: 'Shopping und Essen', desc: 'Atrio Einkaufszentrum und kärntnerische Küche für jeden Geschmack.' },
  // { icon: '❄️', title: 'Klimaanlage', desc: 'Angenehme Raumtemperatur zu jeder Jahreszeit in allen Apartments.' },
  // { icon: '🅿️', title: 'Kostenlos parken', desc: 'Privater Stellplatz direkt vor dem Haus inklusive.' },
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
              HERZLICH WILLKOMMEN!
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
              Herzlich willkommen<br />zu Hause!
            </motion.h2>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Willkommen in die  Wilena Apartments — Ihrem Rückzugsort für Erholung,
              Komfort und unvergessliche Urlaubsmomente.
               Unsere Apartments vereinen moderne Ausstattung mit einer ruhigen Lage inmitten der Natur.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Die Wilena Apartments befinden sich im Kurort Warmbad Villach,
              in dem Familienresidenz. Warmbad liegt in einem einzigartigen Bergtal am Dreiländereck Österreich,
              Slowenien und Italien, unweit der Kärntner Seen und Gerlitzen Alpen.
              Die Kärntner Therme mit Aquapark und Saunen ist fußläufig erreichbar. 
              Ein Wald mit antiken römischen Thermalquellen, in dem man inmitten der Natur baden kann, 
              beginnt direkt vor der Tür. Die Umgebung bietet zahlreiche Möglichkeiten für einen aktiven, 
              erholsamen oder Wellness Urlaub – ob für Familien mit Kindern oder für eine romantische Reise 
              für zwei . Dank unserer Autobahnanbindung sind wir besonders praktisch für Gäste, 
              die auf der Durchreise in den Süden sind. Die kärntnerische  Küche ist wertvoll und vereint die 
              besten Traditionen der österreichischen Küche mit Einflüssen aus der slowenischen und italienischen 
              Küche. Hier findet jeder Gast etwas nach seinem Geschmack in jeder Jahreszeit. Wir freuen uns, 
              Sie bei uns in Wilena Apartments begrüßen zu dürfen.
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
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/image.avif`}
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
            {/* Ihr perfekter Urlaub — <em>Ihre Wahl</em> */}
            Für die gute Laune sorgen:
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
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/1.jpg`}
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
              Kärnten ist ein tolles Ziel zum Radfahren. Es gibt viele flache Wege an Seen und Flüssen. 
              Auch schöne Berge für E-Bikes sind da. Die Kärnten Seen-Schleife zeigt Ihnen viele 
              Gewässer auf einmal. In Kärnten beginnt die Radsaison ein bisschen früher. 
              Schon ab Ende März sieht man Mountainbiker, Rennradfahrer, 
              E-Biker und Genussradfahrer auf zahlreichen Trails, 
              Radwegen und Routen ihre Runden drehen. Denn drei Dinge sind beim Radfahren 
              in Kärnten immer mit dabei: das herrliche Berg-Seepanorama, 
              die Alpen-Adria-Küche und die Möglichkeit, sich in einem der zahlreichen Kärntner 
              Seen zu erfrischen. Kärnten – ein Land für Radbegeisterte, die das Radangebot, 
              die Natur, das Essen und das Wetter zu schätzen wissen.  Bekannte Radwege: 
              Drauradweg: Führt am Fluss entlang durch das ganze Land. Alpe-Adria-Radweg: 
              Geht durch die Berge bis nach Italien. Kärnten Seen-Schleife: Eine große 
              Tour von etwa 420 km an 20 Seen. Millstätter See Radweg: Etwa 30 km rund um den See.
            </motion.p>
            {/* <motion.p className="home-cycling__desc" variants={fadeUp}>
              Wer es sportlicher mag, radelt entlang der Drau bis nach Villach
              oder weiter Richtung Alpe-Adria-Radweg — ein Klassiker für alle,
              die Kärnten aktiv erleben möchten.
            </motion.p> */}
          </motion.div>
        </div>
      </section>

      {/* ── НОВЕ: BURG & THERME (Landskron & Warmbad) ────────────────────── */}
      

      {/* ── НОВЕ: DREI-SEEN-LAND ──────────────────────────────────────────── */}
      {/* <section className="home-lakes">
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
      </section> */}

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
          <h2 className="home-cta__title">
            {/* Bereit für Ihren Traumurlaub? */}
            Ihre Zuhause wartet auf Sie!
          </h2>
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
