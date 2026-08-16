import { motion, Variants } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/AngebotePage.scss";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS (Framer Motion 12 safe)
───────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const HAS_OFFERS = true;

const offers = [
  {
    tag: "🔥 Sommer-Deal",
    title: "Frühbucherrabatt Villach",
    desc: "10% Rabatt bei Buchung mehr als 30 Tage im Voraus. Nur 5 Gehminuten von der Villacher Therme.",
    price: "ab € 108,–",
    oldPrice: "€ 120,–",
    valid: "bis 31. August 2026",
    location: "Villach",
    badge: "–10%",
  },
  {
    tag: "🏔️ Winter-Special",
    title: "Ski & Relax in Villach",
    desc: "3 Nächte buchen, 1 Nacht kostenlos! Perfekt für Wintersportler nahe Gerlitzen Alpe und Nassfeld.",
    price: "ab € 240,–",
    oldPrice: "€ 360,–",
    valid: "gültig Dez 2026 – Feb 2027",
    location: "Villach",
    badge: "3+1",
  },
  {
    tag: "💑 Romantik-Paket",
    title: "Romantic Weekend Villach",
    desc: "Sekt bei Ankunft, Late Checkout und Frühstück für 2 Personen — mit Therme direkt vor der Tür.",
    price: "ab € 199,–",
    oldPrice: "€ 240,–",
    valid: "ganzjährig buchbar",
    location: "Villach",
    badge: "–17%",
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export const AngebotePage: React.FC = () => {
  return (
    <div className="angebote-page">
      <Header />

      {/* HERO */}
      <section className="angebote-hero">
        <div className="angebote-hero__overlay">
          <motion.div
            className="angebote-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="angebote-hero__eyebrow" variants={fadeUp}>
              SONDERANGEBOTE
            </motion.p>

            <motion.h1 className="angebote-hero__title" variants={fadeUp}>
              Angebote
            </motion.h1>

            <motion.p className="angebote-hero__subtitle" variants={fadeUp}>
              Exklusive Deals für unvergessliche Aufenthalte in Piran und Villach
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs />

      <section className="angebote-body">
        <div className="angebote-body__container">

          {HAS_OFFERS ? (
            /* ─── OFFERS GRID ───────────────────────────── */
            <motion.div
              className="angebote-grid"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {offers.map((offer) => (
                <motion.article
                  key={offer.title}
                  className="angebot-card"
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <div className="angebot-card__top">
                    <span className="angebot-card__tag">{offer.tag}</span>
                    <span className="angebot-card__badge">{offer.badge}</span>
                  </div>

                  <h3 className="angebot-card__title">{offer.title}</h3>
                  <p className="angebot-card__desc">{offer.desc}</p>

                  <div className="angebot-card__location">
                    📍 {offer.location}
                  </div>

                  <div className="angebot-card__pricing">
                    <span className="angebot-card__old-price">
                      {offer.oldPrice}
                    </span>
                    <span className="angebot-card__price">
                      {offer.price}
                    </span>
                  </div>

                  <div className="angebot-card__valid">
                    🗓 {offer.valid}
                  </div>

                  <button className="angebot-card__btn">
                    Jetzt anfragen
                  </button>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            /* ─── EMPTY STATE ───────────────────────────── */
            <motion.div
              className="angebote-empty"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="angebote-empty__icon">🌿</div>

              <h2 className="angebote-empty__title">
                Aktuell keine Sonderangebote
              </h2>

              <p className="angebote-empty__text">
                Im Moment haben wir keine aktiven Angebote. Schauen Sie bald
                wieder vorbei — wir arbeiten an exklusiven Deals für Ihren
                nächsten Urlaub in Villach.
              </p>

              
              <div className="angebote-empty__tip">
                💌 Für exklusive Frühbucher-Deals kontaktieren Sie uns direkt:
                <a href="mailto:wilena@speed.at"> wilena@speed.at</a>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AngebotePage;