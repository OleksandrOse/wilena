import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { categories } from "../data/categories";
import { fadeUp, stagger } from "../utils/animations";
import Contact from "../components/Contact";
import "../styles/ServicePage.scss";

export const FreizeitPage: React.FC = () => {
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
              Freizeit & Erholung
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Therme, Seen, Berge und vielfältige Freizeitmöglichkeiten rund um Warmbad Villach
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
              <motion.div key={cat.title} className="service-category" variants={fadeUp}>
                <div className="service-category__header">
                  <span className="service-category__icon">{cat.icon}</span>
                  <h2 className="service-category__title">{cat.title}</h2>
                </div>

                {cat.title === "Fahrrad" ? (
                  <section className="service-highlight">
                    <div className="service-highlight__media">
                      <img
                        src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/1.jpg`}
                        alt="Fahrradverleih vor Ort"
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
                        Die Region mit dem Rad entdecken
                      </motion.h2>
                      <motion.p className="service-highlight__desc" variants={fadeUp}>
                        Kärnten ist wie geschaffen für Urlaub auf zwei Rädern. Gemütliche Radwege entlang von Seen und Flüssen, sportliche Mountainbike-Strecken und abwechslungsreiche Touren für E-Bikes bieten für jeden das Richtige.
                        Besonders schön: Unterwegs begleiten Sie immer wieder beeindruckende Berg- und Seepanoramen - und an warmen Tagen lädt einer der zahlreichen Kärntner Seen zu einer erfrischenden Pause ein.
                      </motion.p>
                      <motion.p className="service-highlight__routes-title" variants={fadeUp}>
                        Beliebte Radwege:
                      </motion.p>
                      <motion.div className="service-highlight__routes" variants={fadeUp}>
                        <div className="service-highlight__route">
                          <strong>Drauradweg</strong>
                          <span>Entspannt entlang der Drau - ideal für Genussradler und Familien.</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>Alpe-Adria-Radweg</strong>
                          <span>Eine der schönsten Radrouten der Region - von den Alpen Richtung Italien.</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>Kärnten Seen-Schleife</strong>
                          <span>Eine abwechslungsreiche Rundtour, die zahlreiche Kärntner Seen miteinander verbindet.</span>
                        </div>
                        <div className="service-highlight__route">
                          <strong>Millstätter See Radweg</strong>
                          <span>Eine landschaftlich besonders schöne Runde rund um den Millstätter See.</span>
                        </div>
                      </motion.div>
                      <motion.p className="service-highlight__desc" variants={fadeUp}>
                        Wer es sportlicher mag, radelt entlang der Drau bis nach Villach
                        oder weiter Richtung Alpe-Adria-Radweg — ein Klassiker für alle,
                        die Kärnten aktiv erleben möchten.
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

          <Contact title=" Ausflügen & Aktivitäten" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreizeitPage;
