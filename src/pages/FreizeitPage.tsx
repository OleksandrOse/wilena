import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useCategories } from "../data/useCategories";
import { fadeUp, stagger } from "../utils/animations";
import Contact from "../components/Contact";
import "../styles/ServicePage.scss";

export const FreizeitPage: React.FC = () => {
  const { t } = useTranslation();
  const categories = useCategories();

  return (
    <div className="service-page">
      <Header />

      <section className="service-hero">
        <div className="service-hero__overlay">
          <motion.div
            className="service-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="service-hero__eyebrow" variants={fadeUp}>
              WILENA APARTMENTS
            </motion.p>
            <motion.h1 className="service-hero__title" variants={fadeUp}>
              {t("freizeitPage.title")}
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              {t("freizeitPage.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs />

      <section className="service-body">
        <div className="service-body__container">
          <motion.div
            className="service-categories"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {categories.map((cat) => (
              <motion.div key={cat.id} className="service-category" variants={fadeUp}>
                <div className="service-category__header">
                  <span className="service-category__icon">{cat.icon}</span>
                  <h2 className="service-category__title">{cat.title}</h2>
                </div>

                {cat.id === "bike" ? (
                  <section className="service-highlight">
                    <div className="service-highlight__media">
                      <img
                        src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/1.jpg`}
                        alt={t("freizeitPage.bikeAlt")}
                        className="service-highlight__img"
                      />
                    </div>
                    <motion.div
                      className="service-highlight__text"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={stagger}
                    >
                      <motion.h2 className="service-highlight__title" variants={fadeUp}>
                        {t("freizeitPage.bikeTitle")}
                      </motion.h2>
                      <motion.p className="service-highlight__desc" variants={fadeUp}>
                        {t("freizeitPage.bikeDesc")}
                      </motion.p>
                      <motion.p className="service-highlight__routes-title" variants={fadeUp}>
                        {t("freizeitPage.routesTitle")}
                      </motion.p>
                      <motion.div className="service-highlight__routes" variants={fadeUp}>
                        <div className="service-highlight__route">
                          <strong>{t("freizeitPage.route1Name")}</strong>
                          <span>{t("freizeitPage.route1Desc")}</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>{t("freizeitPage.route2Name")}</strong>
                          <span>{t("freizeitPage.route2Desc")}</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>{t("freizeitPage.route3Name")}</strong>
                          <span>{t("freizeitPage.route3Desc")}</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>{t("freizeitPage.route4Name")}</strong>
                          <span>{t("freizeitPage.route4Desc")}</span>
                        </div>
                      </motion.div>
                      <motion.p className="service-highlight__desc" variants={fadeUp}>
                        {t("freizeitPage.bikeOutro")}
                      </motion.p>
                    </motion.div>
                  </section>
                ) : (
                  <div className="service-category__grid">
                    {cat.services.map((s, si) => {
                      const CardTag = s.link ? motion.a : motion.div;
                      const cardProps = s.link
                        ? {
                          href: s.link,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                        : {};

                      return (
                        <CardTag
                          key={s.name}
                          className={`service-item${s.link ? " service-item--linked" : ""}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.07, duration: 0.5 }}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          {...cardProps}
                        >
                          <div className="service-item__media">
                            <img
                              src={s.image}
                              alt={s.name}
                              loading="lazy"
                              className="service-item__img"
                            />
                            {s.link && (
                              <span className="service-item__linkbadge" aria-hidden="true">
                                ↗
                              </span>
                            )}
                          </div>
                          <div className="service-item__body">
                            <div className="service-item__name">{s.name}</div>
                            <div className="service-item__desc">{s.desc}</div>
                          </div>
                        </CardTag>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <Contact title={t("freizeitPage.contactTitle")} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreizeitPage;
