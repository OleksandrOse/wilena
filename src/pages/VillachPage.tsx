import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/VillachPage.scss";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const villachApartments = [
  {
    name: "Elegant Apartment",
    size: "52 m²",
    guests: "1–4 Pers.",
    desc: "Modernes Apartment mit Balkon, Bergblick und vollausgestatteter Küche.",
    image: `${process.env.PUBLIC_URL}/Wilena/villach/665558891.jpg`,
    price: "ab € 120,–",
  },
  {
    name: "Family Apartment",
    size: "68 m²",
    guests: "2–6 Pers.",
    desc: "Geräumiges Familienapartment mit zwei Schlafzimmern und großer Terrasse.",
    image: `${process.env.PUBLIC_URL}/Wilena/villach/image00052.jpeg`,
    price: "ab € 160,–",
  },
];

const services = [
  { icon: "🅿️", title: "Privater Parkplatz", desc: "Kostenloser Tiefgaragenplatz für alle Gäste." },
  { icon: "📶", title: "Kostenloses WLAN", desc: "Schnelles Internet in allen Apartments." },
  { icon: "🍳", title: "Vollküche", desc: "Moderne Küche mit Kaffeemaschine, Geschirrspüler und Herd." },
  { icon: "🌿", title: "Balkon / Terrasse", desc: "Eigener Außenbereich mit Gartenmöbeln." },
  { icon: "♨️", title: "Therme in der Nähe", desc: "Villacher Warmbad-Therme nur 5 Minuten entfernt." },
  { icon: "🚴", title: "Fahrradverleih", desc: "E-Bikes und Fahrräder direkt vor Ort." },
];

const seasons = [
  {
    name: "Winter",
    icon: "❄️",
    color: "#a8c8e8",
    activities: ["Skifahren in Nassfeld", "Thermalbad Warmbad", "Winterwandern", "Eislaufen"],
    desc: "Kärnten im Winter ist ein Paradies für Skifans und Erholungssuchende.",
  },
  {
    name: "Sommer",
    icon: "☀️",
    color: "#f5c842",
    activities: ["Baden im Wörthersee", "Mountainbiken", "Wildwasser-Rafting", "Klettern"],
    desc: "Im Sommer laden Seen, Berge und Wälder zu unvergesslichen Abenteuern ein.",
  },
];

export const VillachPage: React.FC = () => {
  const [activeApartment, setActiveApartment] = useState(0);
  const [bookingDate, setBookingDate] = useState({ from: "", to: "" });

  return (
    <div className="villach-page">
      <Header />

      {/* HERO */}
      <section
        className="villach-hero"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg)` }}
      >
        <div className="villach-hero__overlay">
          <motion.div
            className="villach-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="villach-hero__eyebrow" variants={fadeUp}>
              ÖSTERREICH · KÄRNTEN
            </motion.p>
            <motion.h1 className="villach-hero__title" variants={fadeUp}>
              Wilena Villach
            </motion.h1>
            <motion.p className="villach-hero__subtitle" variants={fadeUp}>
              Natur, Berge und pure Erholung — Ihr Apartment inmitten Kärntens
            </motion.p>
            <motion.div className="villach-hero__actions" variants={fadeUp}>
              <a href="#apartments" className="villach-hero__btn villach-hero__btn--primary">
                Apartments ansehen
              </a>
              <a href="#booking" className="villach-hero__btn villach-hero__btn--outline">
                Jetzt buchen
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="villach-hero__scroll">
          <motion.div
            className="villach-hero__scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* BREADCRUMBS */}
      <Breadcrumbs />

      {/* ABOUT */}
      <section className="villach-about">
        <div className="villach-about__container">
          <motion.div
            className="villach-about__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="villach-about__tag" variants={fadeUp}>Über uns</motion.span>
            <motion.h2 className="villach-about__title" variants={fadeUp}>
              Ihr Zuhause in den Kärntner Alpen
            </motion.h2>
            <motion.p className="villach-about__desc" variants={fadeUp}>
              Die Wilena Apartments in Villach bieten modernen Komfort inmitten einer
              atemberaubenden Naturkulisse. Nur wenige Minuten vom Warmbad-Villach entfernt,
              verbinden unsere Apartments alpinen Charme mit zeitgemäßem Design.
            </motion.p>
            <motion.p className="villach-about__desc" variants={fadeUp}>
              Jedes Apartment verfügt über einen privaten Balkon, eine vollausgestattete
              Küche und hochwertige Möbel — perfekt für Paare, Familien und Naturliebhaber.
            </motion.p>
            <motion.div className="villach-about__stats" variants={fadeUp}>
              <div className="villach-about__stat">
                <div className="villach-about__stat-num">3</div>
                <div className="villach-about__stat-label">Apartments</div>
              </div>
              <div className="villach-about__stat">
                <div className="villach-about__stat-num">1–6</div>
                <div className="villach-about__stat-label">Personen</div>
              </div>
              <div className="villach-about__stat">
                <div className="villach-about__stat-num">5'</div>
                <div className="villach-about__stat-label">zur Therme</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="villach-about__image-wrap"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg`}
              alt="Villach"
              className="villach-about__image"
            />
            <div className="villach-about__image-badge">
              <span>Warmbader Allee 53</span>
              <span>9504 Villach</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BOOKING */}
      <motion.section
        id="booking"
        className="villach-booking"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="villach-booking__inner">
          <h3 className="villach-booking__title">Verfügbarkeit prüfen</h3>
          <div className="villach-booking__fields">
            <label>
              <span>Anreise</span>
              <input
                type="date"
                value={bookingDate.from}
                onChange={e => setBookingDate(d => ({ ...d, from: e.target.value }))}
              />
            </label>
            <label>
              <span>Abreise</span>
              <input
                type="date"
                value={bookingDate.to}
                onChange={e => setBookingDate(d => ({ ...d, to: e.target.value }))}
              />
            </label>
            <label>
              <span>Gäste</span>
              <select>
                <option>2 Erwachsene</option>
                <option>3 Erwachsene</option>
                <option>4 Erwachsene</option>
                <option>2 Erw. + 2 Kinder</option>
              </select>
            </label>
            <button className="villach-booking__btn">Suchen</button>
          </div>
        </div>
      </motion.section>

      {/* APARTMENTS */}
      <section id="apartments" className="villach-apartments">
        <div className="villach-apartments__container">
          <motion.div
            className="villach-apartments__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="villach-apartments__tag" variants={fadeUp}>Unterkünfte</motion.span>
            <motion.h2 className="villach-apartments__title" variants={fadeUp}>
              Unsere Apartments
            </motion.h2>
          </motion.div>

          <div className="villach-apartments__tabs">
            {villachApartments.map((apt, i) => (
              <motion.button
                key={apt.name}
                className={`villach-apartments__tab ${i === activeApartment ? "is-active" : ""}`}
                onClick={() => setActiveApartment(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {apt.name}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeApartment}
            className="villach-apartments__detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="villach-apartments__detail-image">
              <img
                src={villachApartments[activeApartment].image}
                alt={villachApartments[activeApartment].name}
              />
              <div className="villach-apartments__detail-badge">
                {villachApartments[activeApartment].price}
              </div>
            </div>
            <div className="villach-apartments__detail-info">
              <h3>{villachApartments[activeApartment].name}</h3>
              <div className="villach-apartments__detail-meta">
                <span>📐 {villachApartments[activeApartment].size}</span>
                <span>👥 {villachApartments[activeApartment].guests}</span>
              </div>
              <p>{villachApartments[activeApartment].desc}</p>
              <div className="villach-apartments__detail-features">
                <span>✓ Balkon</span>
                <span>✓ Vollküche</span>
                <span>✓ WLAN</span>
                <span>✓ Parkplatz</span>
              </div>
              <button className="villach-apartments__detail-btn">
                Apartment anfragen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="villach-services">
        <div className="villach-services__container">
          <motion.div
            className="villach-services__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="villach-services__tag" variants={fadeUp}>Service</motion.span>
            <motion.h2 className="villach-services__title" variants={fadeUp}>
              Was wir bieten
            </motion.h2>
          </motion.div>

          <motion.div
            className="villach-services__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                className="villach-service-card"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="villach-service-card__icon">{s.icon}</div>
                <h3 className="villach-service-card__title">{s.title}</h3>
                <p className="villach-service-card__desc">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEASONS */}
      <section className="villach-seasons">
        <div className="villach-seasons__container">
          <motion.h2
            className="villach-seasons__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Jede Jahreszeit hat ihren Zauber
          </motion.h2>
          <div className="villach-seasons__grid">
            {seasons.map((season, i) => (
              <motion.div
                key={season.name}
                className="villach-season-card"
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="villach-season-card__icon" style={{ color: season.color }}>
                  {season.icon}
                </div>
                <h3 className="villach-season-card__name">{season.name}</h3>
                <p className="villach-season-card__desc">{season.desc}</p>
                <ul className="villach-season-card__list">
                  {season.activities.map(a => (
                    <li key={a}>✓ {a}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="villach-contact">
        <motion.div
          className="villach-contact__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="villach-contact__title">Kontakt</h2>
          <div className="villach-contact__grid">
            <div className="villach-contact__block">
              <div className="villach-contact__label">Adresse</div>
              <div className="villach-contact__value">Warmbader Allee 53, 9504 Villach</div>
            </div>
            <div className="villach-contact__block">
              <div className="villach-contact__label">Telefon</div>
              <a href="tel:+436647378488" className="villach-contact__value villach-contact__value--link">
                +43 664 737 48 88
              </a>
            </div>
            <div className="villach-contact__block">
              <div className="villach-contact__label">E-Mail</div>
              <a href="mailto:wilena@speed.at" className="villach-contact__value villach-contact__value--link">
                wilena@speed.at
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default VillachPage;
