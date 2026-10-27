import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { discounts, packages } from "../data/discounts";
import { useOfferText } from "../data/useOfferText";
import { fadeUp, stagger } from "../utils/animations";
import "../styles/AngebotePage.scss";
import Contact from "../components/Contact";
import NonRefundableOffer from "../components/NonRefundableOffer";

const HAS_OFFERS = true;

export const AngebotePage: React.FC = () => {
  const { t } = useTranslation();
  const text = useOfferText();

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
              {t("angebote.eyebrow")}
            </motion.p>

            <motion.h1 className="angebote-hero__title" variants={fadeUp}>
              {t("angebote.title")}
            </motion.h1>

            <motion.p className="angebote-hero__subtitle" variants={fadeUp}>
              {t("angebote.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs />

      <section className="angebote-body">
        <div className="angebote-body__container">
          {/* Non-Refundable-Tarif: immer sichtbar, auch ohne Sonderangebote */}
          <NonRefundableOffer />

          {HAS_OFFERS ? (
            <>
              <motion.div
                className="angebote-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={stagger}
              >
                <motion.h2 className="angebote-section__title" variants={fadeUp}>
                  {t("angebote.discounts")}
                </motion.h2>

                <div className="discount-grid">
                  {discounts.map((d) => {
                    const dt = text.discount(d);
                    return (
                      <motion.div
                        key={d.id}
                        className="discount-card"
                        variants={fadeUp}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      >
                        <div className="discount-card__top">
                          <span className="discount-card__icon">{d.icon}</span>
                          <span className="discount-card__badge">{dt.badge}</span>
                        </div>
                        <h3 className="discount-card__title">{dt.title}</h3>
                        <p className="discount-card__desc">{dt.desc}</p>
                        {dt.note && (
                          <p className="discount-card__note">🗓 {dt.note}</p>
                        )}
                      </motion.div>
                    );
                  })}
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
                  {t("angebote.packages")}
                </motion.h2>

                <div className="angebote-grid">
                  {packages.map((offer) => {
                    const pt = text.pkg(offer);
                    return (
                      <motion.article
                        key={offer.id}
                        className="angebot-card"
                        variants={fadeUp}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      >
                        <div className="angebot-card__top">
                          <span className="angebot-card__tag">{pt.tag}</span>
                          {pt.badge && (
                            <span className="angebot-card__badge">{pt.badge}</span>
                          )}
                        </div>

                        <h3 className="angebot-card__title">{pt.title}</h3>
                        <p className="angebot-card__desc">{pt.desc}</p>

                        <ul className="angebot-card__includes">
                          {pt.includes.map((item) => (
                            <li key={item}>
                              <span className="angebot-card__includes-check">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>

                        <button className="angebot-card__btn">
                          {t("angebote.request")}
                        </button>
                      </motion.article>
                    );
                  })}
                </div>
                <Contact title={t("angebote.contactTitle")} />
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

              <h2 className="angebote-empty__title">{t("angebote.emptyTitle")}</h2>

              <p className="angebote-empty__text">{t("angebote.emptyText")}</p>

              <div className="angebote-empty__tip">
                💌 {t("angebote.emptyTip")}
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
