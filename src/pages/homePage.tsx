import { FC, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuickBookingModal from '../components/QuickBookingModal';
import Testimonials from '../components/Testimonials';
import { Stat } from '../types/Stat';
import {
  ComfortIcon, LakesMountainsIcon, ThermalIcon, CyclingIcon,
  WinterIcon, WellnessIcon, ShoppingIcon,
} from '../components/FeatureIcons';
import { fadeUp, stagger } from "../utils/animations";
import '../styles/HomePage.scss';

const stats: Stat[] = [
  { value: "24/7", label: "Gästeunterstützung" },
  { value: "9,2/10", label: "Booking.com" },
  { value: "5,0/5", label: "Airbnb", icon: `${process.env.PUBLIC_URL}/superhost-badge.png` },
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
    path: '/apartment-166',
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
    path: '/apartment-172',
    accent: '#c9a24d',
  },
];

const features = [
  { icon: <ComfortIcon />, title: 'Komfort & Wohlfühlen', desc: 'Moderne Ausstattung, Balkon, voll ausgestattete Küche und Klimaanlage - für einen entspannten Aufenthalt zu jeder Jahreszeit.' },
  { icon: <LakesMountainsIcon />, title: 'Seen & Berge', desc: 'Kärntner Seen und beeindruckende Berglandschaften liegen ganz in der Nähe - ideal für Natur, Ausflüge und aktive Urlaubstage.' },
  { icon: <ThermalIcon />, title: "Thermalbad & Entspannung", desc: "Die KärntenTherme mit Thermalbad, Saunawelt und Erlebnisbereich ist nur etwa 5 Gehminuten entfernt." },
  { icon: <CyclingIcon />, title: "Radfahren & Wandern", desc: "Zahlreiche Rad- und Wanderwege laden dazu ein, die Natur rund um Warmbad Villach aktiv zu entdecken. Ein Fahrradabstellplatz ist vorhanden." },
  { icon: <WinterIcon />, title: 'Winter & Berge', desc: 'Skigebiete und Langlaufmöglichkeiten sind schnell erreichbar - perfekt für aktive Wintertage in Kärnten.' },
  { icon: <WellnessIcon />, title: 'Wellness & Gesundheit', desc: 'Kurzentrum, Reha-Angebote und medizinische Einrichtungen befinden sich in unmittelbarer Umgebung - ideal, um Erholung und Gesundheit miteinander zu verbinden.' },
  { icon: <ShoppingIcon />, title: 'Genuss & Shopping', desc: 'Das ATRIO Einkaufszentrum sowie Restaurants mit regionaler und internationaler Küche sind schnell erreichbar.' },
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
            <motion.p className="home-hero__sub-title" variants={fadeUp}>
              Ankommen. Durchatmen. Wohlfühlen.
            </motion.p>
            <motion.p className="home-hero__subtitle" variants={fadeUp}>
              Ihr Zuhause auf Zeit - zwischen Thermen, Seen und Bergen,
              im Herzen des Dreiländerecks Österreich - Italien - Slowenien.
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
              Willkommen in den Wilena Apartments Ihr Rückzugsort für Erholung, Komfort und besondere Urlaubsmomente.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Die Wilena Apartments verbinden modernen Komfort mit einer ruhigen Lage mitten in der Natur - ein Ort zum Ankommen, Abschalten und Genießen.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Unsere Apartments befinden sich im Kurort Warmbad Villach, eingebettet in die wunderschöne Berg- und Seenlandschaft Kärntens. Die besondere Lage nahe dem Dreiländereck Österreich, Italien und Slowenien macht Warmbad Villach zu einem idealen Ausgangspunkt für einen abwechslungsreichen Urlaub zu jeder Jahreszeit.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Die KärntenTherme mit Thermalbad, Aquapark und großzügiger Saunalandschaft ist bequem zu Fuß erreichbar.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Ein ganz besonderes Naturerlebnis beginnt direkt vor der Haustür: Im angrenzenden Wald befinden sich natürliche Thermalquellen, die bereits seit der Römerzeit bekannt sind. Hier kann man mitten in der Natur im warmen Thermalwasser baden - ein außergewöhnliches Erlebnis, das Warmbad Villach so besonders macht.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Auch die bekannten Kärntner Seen sowie die Villacher Alpe und die Gerlitzen sind schnell erreichbar. Im Sommer erwarten Sie Schwimmen, Wandern, Radfahren und zahlreiche Ausflugsmöglichkeiten. Im Winter locken Skigebiete, verschneite Berglandschaften und entspannte Stunden in der Therme.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Die Wilena Apartments sind ideal für Familien mit Kindern, Paare, Aktivurlauber und Wellness-Liebhaber. Und wer einfach Ruhe sucht, findet hier ebenso den richtigen Ort.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Dank der guten Autobahnanbindung sind unsere Apartments außerdem eine komfortable Wahl für Gäste auf dem Weg nach Italien, Slowenien, Kroatien oder weiter Richtung Süden - vielleicht für eine Nacht, vielleicht aber auch für ein paar Tage mehr.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Und natürlich gehört zu Kärnten auch der Genuss. Die regionale Küche verbindet österreichische Tradition mit mediterranen Einflüssen aus Italien und Slowenien - abwechslungsreich, authentisch und überraschend vielfältig.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Natur, Berge, Seen und Thermalwasser. Drei Länder zum Greifen nah. Und mittendrin ein Ort, an dem man sich einfach wohlfühlt.
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              Wir freuen uns darauf, Sie in den Wilena Apartments willkommen zu heißen.
            </motion.p>
            <motion.div className="home-intro__stats" variants={fadeUp}>
              {stats.map((stat) => (
                <div className="home-intro__stat" key={stat.label}>
                  <span className="home-intro__stat-value">
                    {stat.icon && (
                      <img src={stat.icon} alt="" className="home-intro__stat-icon" />
                    )}
                    {stat.value}
                  </span>
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
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/2.jpg`}
              alt="Piran"
            />
            <img
              className="home-intro__img home-intro__img--third"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/3.jpg`}
              alt="Villach"
            />
            <img
              className="home-intro__img home-intro__img--fourth"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/5.jpg`}
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
            Alles für eine schöne Auszeit:
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
            Ihre Zuhause in Kärnten wartet auf Sie!
          </h2>
          <p className="home-cta__text">Buchen Sie direkt und genießen Sie Ihren Aufenthalt in den Wilena Apartments zum besten Preis.</p>
          <button className="home-cta__btn" onClick={() => setIsOpen(true)}>
            Jetzt buchen
          </button>
        </div>
      </motion.section>

      <Footer />
      <QuickBookingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
