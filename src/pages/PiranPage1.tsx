import { motion, Variants } from "framer-motion";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import Apartments from "../components/Apartments";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/PiranPage1.scss";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  { icon: "🏖️", title: "Direkt am Strand", desc: "Nur wenige Schritte bis zum kristallklaren Adriatischen Meer." },
  { icon: "🏊", title: "Swimmingpool", desc: "Eigener Pool für unsere Gäste — entspannen Sie in Ruhe." },
  { icon: "📶", title: "Kostenloses WLAN", desc: "Schnelles Internet in allen Apartments inklusive." },
  { icon: "🅿️", title: "Parkplatz", desc: "Kostenloser privater Stellplatz direkt vor dem Haus." },
  { icon: "🍳", title: "Vollküche", desc: "Moderne Küche mit allen Geräten und Utensilien." },
  { icon: "🌅", title: "Meerblick", desc: "Atemberaubender Ausblick auf die Adria von Ihrem Balkon." },
];

const PiranPage1: React.FC = () => {
  const [booking, setBooking] = useState({ from: "", to: "", guests: "2 Erwachsene" });

  return (
    <div className="piran-page">
      <Header />

      {/* ── HERO ── */}
      <section className="piran-hero">
        <div className="piran-hero__overlay">
          <motion.div
            className="piran-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="piran-hero__eyebrow" variants={fadeUp}>
              SLOWENIEN · ADRIA
            </motion.p>
            <motion.h1 className="piran-hero__title" variants={fadeUp}>
              Wilena Piran
            </motion.h1>
            <motion.p className="piran-hero__subtitle" variants={fadeUp}>
              Frische Meeresdelikatessen und unvergessliche Erholung direkt am Meer
            </motion.p>
            <motion.div className="piran-hero__actions" variants={fadeUp}>
              <a href="#booking" className="piran-hero__btn piran-hero__btn--primary">
                Jetzt buchen
              </a>
              <a href="#apartments" className="piran-hero__btn piran-hero__btn--outline">
                Apartments ansehen
              </a>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="piran-hero__scroll"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          ↓
        </motion.div>
      </section>

      <Breadcrumbs />

      {/* ── BOOKING ── */}
      <motion.section
        id="booking"
        className="piran-booking"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="piran-booking__inner">
          <h3 className="piran-booking__title">Verfügbarkeit prüfen</h3>
          <div className="piran-booking__fields">
            <label>
              <span>Anreise</span>
              <input
                type="date"
                value={booking.from}
                onChange={e => setBooking(b => ({ ...b, from: e.target.value }))}
              />
            </label>
            <label>
              <span>Abreise</span>
              <input
                type="date"
                value={booking.to}
                onChange={e => setBooking(b => ({ ...b, to: e.target.value }))}
              />
            </label>
            <label>
              <span>Gäste</span>
              <select
                value={booking.guests}
                onChange={e => setBooking(b => ({ ...b, guests: e.target.value }))}
              >
                <option>2 Erwachsene</option>
                <option>3 Erwachsene</option>
                <option>4 Erwachsene</option>
                <option>2 Erw. + 2 Kinder</option>
              </select>
            </label>
            <button className="piran-booking__btn">Suchen</button>
          </div>
        </div>
      </motion.section>

      {/* ── APARTMENTS ── */}
      <section id="apartments" className="piran-apartments">
        <motion.div
          className="piran-apartments__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.span className="piran-apartments__tag" variants={fadeUp}>Unterkünfte</motion.span>
          <motion.h2 className="piran-apartments__title" variants={fadeUp}>
            Unsere Apartments
          </motion.h2>
          <motion.p className="piran-apartments__desc" variants={fadeUp}>
            Moderne Apartments mit Meerblick — direkt an der Küste von Piran
          </motion.p>
        </motion.div>
        <Apartments />
        <Outlet />
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="piran-services">
        <div className="piran-services__container">
          <motion.div
            className="piran-services__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="piran-services__tag" variants={fadeUp}>Service</motion.span>
            <motion.h2 className="piran-services__title" variants={fadeUp}>
              Was wir bieten
            </motion.h2>
          </motion.div>

          <motion.div
            className="piran-services__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                className="piran-service-card"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="piran-service-card__icon">{s.icon}</div>
                <h3 className="piran-service-card__title">{s.title}</h3>
                <p className="piran-service-card__desc">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OFFERS ── */}
      <motion.section
        id="offers"
        className="piran-offers"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="piran-offers__inner">
          <h2 className="piran-offers__title">Unsere Angebote</h2>
          <p className="piran-offers__text">
            Aktuell haben wir keine Sonderangebote. Schauen Sie bald wieder vorbei
            oder kontaktieren Sie uns direkt für exklusive Frühbucher-Deals.
          </p>
          <div className="piran-offers__actions">
            <a href="mailto:wilena@speed.at" className="piran-offers__btn">
              ✉️ wilena@speed.at
            </a>
            <a href="tel:+436647378488" className="piran-offers__btn piran-offers__btn--outline">
              📞 +43 664 737 48 88
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default PiranPage1;
