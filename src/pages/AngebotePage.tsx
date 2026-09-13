import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { discounts, packages } from "../data/discounts";
import { fadeUp, stagger } from "../utils/animations";
import "../styles/AngebotePage.scss";
import Contact from "../components/Contact";

const HAS_OFFERS = true;

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
              Exklusive Deals für unvergessliche Aufenthalte in Warmbad Villach
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs />

      <section className="angebote-body">
        <div className="angebote-body__container">
          {HAS_OFFERS ? (
            <>
              {/* ─── RABATTE ───────────────────────────── */}
              <motion.div
                className="angebote-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                <motion.h2 className="angebote-section__title" variants={fadeUp}>
                  Rabatte
                </motion.h2>

                <div className="discount-grid">
                  {discounts.map((d) => (
                    <motion.div
                      key={d.title}
                      className="discount-card"
                      variants={fadeUp}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="discount-card__top">
                        <span className="discount-card__icon">{d.icon}</span>
                        <span className="discount-card__badge">{d.badge}</span>
                      </div>
                      <h3 className="discount-card__title">{d.title}</h3>
                      <p className="discount-card__desc">{d.desc}</p>
                      {d.note && (
                        <p className="discount-card__note">🗓 {d.note}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* ─── PAUSCHALANGEBOTE ───────────────────── */}
              <motion.div
                className="angebote-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                <motion.h2 className="angebote-section__title" variants={fadeUp}>
                  Pauschalangebote
                </motion.h2>

                <div className="angebote-grid">
                  {packages.map((offer) => (
                    <motion.article
                      key={offer.title}
                      className="angebot-card"
                      variants={fadeUp}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    >
                      <div className="angebot-card__top">
                        <span className="angebot-card__tag">{offer.tag}</span>
                        {offer.badge && (
                          <span className="angebot-card__badge">{offer.badge}</span>
                        )}
                      </div>

                      <h3 className="angebot-card__title">{offer.title}</h3>
                      <p className="angebot-card__desc">{offer.desc}</p>

                      <ul className="angebot-card__includes">
                        {offer.includes.map((item) => (
                          <li key={item}>
                            <span className="angebot-card__includes-check">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <button className="angebot-card__btn">
                        Jetzt anfragen
                      </button>
                    </motion.article>
                  ))}
                  
                </div>
                <Contact title=" unseren Angeboten" />
              </motion.div>
            </>
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
