import { motion, Variants } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ServicePage.scss";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  {
    title: "Einkaufsmöglichkeiten",
    icon: "🛒",
    services: [
      { name: "Billa", desc: "Villacher Schächtestraße 33 — Supermarkt in Gehnähe." },
      { name: "Einkaufszentrum ATRIO", desc: "Großes Einkaufszentrum mit zahlreichen Geschäften und Food Courts." },
    ],
  },
  {
    title: "Restaurants",
    icon: "🍽️",
    services: [
      { name: "ATRIO Villach", desc: "Vielfältige Food Courts im Einkaufszentrum." },
      { name: "Gasthof Gasser", desc: "Traditionelle Kärntner Küche." },
      { name: "Villacher Sterierhof", desc: "Gemütliches Gasthaus mit regionaler Küche." },
      { name: "Caldarium", desc: "Restaurant mit italienisch inspirierter Küche." },
      { name: "HAIKKY Asia Cooking Villach", desc: "Asiatische Küche mitten in Villach." },
      { name: "Gasthaus Fruhmann", desc: "Klassisches Kärntner Gasthaus." },
      { name: "Villacher Brauhof", desc: "Regionale Küche und hausgebrautes Bier." },
      { name: "Konditorei & Restaurant Hotel Warmbaderhof", desc: "Feine Konditorei direkt bei der Therme." },
    ],
  },
  {
    title: "Ausflugsziele in der Umgebung",
    icon: "🗺️",
    services: [
      { name: "Villach Stadt", desc: "Historische Altstadt mit Draufuß-Promenade." },
      { name: "Klagenfurt Stadt", desc: "Landeshauptstadt Kärntens am Wörthersee." },
      { name: "Velden am Wörthersee", desc: "Bekannter Seeort mit mondänem Flair." },
      { name: "Pörtschach am Wörthersee", desc: "Elegante Seepromenade und Badestrände." },
      { name: "Großglockner Hochalpenstraße", desc: "Österreichs berühmteste Panoramastraße." },
      { name: "Villacher Alpenstraße", desc: "Aussichtsstraße mit Panoramablick über Villach." },
      { name: "Weissensee", desc: "Kristallklarer Bergsee, idyllisch gelegen." },
      { name: "Maltatal", desc: "Malerisches Tal mit Stauseen und Wasserfällen." },
      { name: "Tarvisio (Italien)", desc: "Grenznaher Ausflug nach Italien." },
      { name: "Kranjska Gora (Slowenien)", desc: "Grenznaher Ausflug nach Slowenien." },
    ],
  },
];

export const UmgebungPage: React.FC = () => {
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
              Umgebung
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Einkaufen, Essen gehen und Ausflüge rund um Warmbad Villach
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
                <div className="service-category__grid">
                  {cat.services.map((s, si) => (
                    <motion.div
                      key={s.name}
                      className="service-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.07, duration: 0.5 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="service-item__check">✓</div>
                      <div>
                        <div className="service-item__name">{s.name}</div>
                        <div className="service-item__desc">{s.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="service-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="service-cta__title">Fragen zur Umgebung?</h3>
            <p className="service-cta__text">
              Wir geben Ihnen gerne persönliche Tipps. Kontaktieren Sie uns jederzeit.
            </p>
            <div className="service-cta__actions">
              <a href="tel:+436647378488" className="service-cta__btn service-cta__btn--primary">
                📞 +43 664 737 48 88
              </a>
              <a href="mailto:wilena@speed.at" className="service-cta__btn service-cta__btn--outline">
                ✉️ wilena@speed.at
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UmgebungPage;
