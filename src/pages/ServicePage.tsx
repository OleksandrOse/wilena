import { motion, Variants } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/ServicePage.scss";

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
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  {
    title: "Unterkunft & Komfort",
    icon: "🏠",
    services: [
      { name: "Vollausgestattete Küche", desc: "Herd, Backofen, Kaffeemaschine, Geschirrspüler und alle Utensilien." },
      { name: "Privater Balkon / Terrasse", desc: "Eigener Außenbereich mit Gartenmöbeln und Meerblick (Piran) oder Bergblick (Villach)." },
      { name: "Hochwertige Bettwäsche", desc: "Frische Bettwäsche und Handtücher bei jeder Buchung inklusive." },
      { name: "Klimaanlage / Heizung", desc: "Ganzzeitliche Temperaturregelung für höchsten Komfort." },
    ],
  },
  {
    title: "Technologie & Konnektivität",
    icon: "📡",
    services: [
      { name: "Kostenloses WLAN", desc: "Schnelles Hochgeschwindigkeits-Internet in allen Apartments und Bereichen." },
      { name: "Smart-TV", desc: "Großer Flachbildschirm mit Streamingdiensten in jedem Apartment." },
      { name: "Elektrische Schließanlage", desc: "Sicherer Zugang mit digitalem Code — kein Schlüssel nötig." },
    ],
  },
  {
    title: "Parken & Mobilität",
    icon: "🚗",
    services: [
      { name: "Kostenloser Parkplatz", desc: "Privater Stellplatz direkt vor dem Haus — kostenlos für alle Gäste." },
      { name: "Fahrradverleih (Villach)", desc: "E-Bikes und Fahrräder direkt vor Ort verfügbar." },
      { name: "Transferberatung", desc: "Wir helfen bei der Organisation von Flughafen-Transfers auf Anfrage." },
    ],
  },
  {
    title: "Freizeit & Umgebung",
    icon: "🌿",
    services: [
      { name: "Strand in der Nähe (Piran)", desc: "Nur wenige Schritte bis zum klaren Adriatischen Meer." },
      { name: "Therme Warmbad (Villach)", desc: "Die berühmte Warmbad-Therme ist nur 5 Minuten entfernt." },
      { name: "Skigebiete (Villach)", desc: "Nassfeld und weitere Skigebiete bequem erreichbar." },
      { name: "Ausflugstipps", desc: "Persönliche Empfehlungen für Restaurants, Sehenswürdigkeiten und Aktivitäten." },
    ],
  },
  {
    title: "Gästeservice",
    icon: "🤝",
    services: [
      { name: "Check-in ab 15:00 Uhr", desc: "Flexibler Early oder Late Check-in auf Anfrage möglich." },
      { name: "Check-out bis 11:00 Uhr", desc: "Late Check-out bei Verfügbarkeit kostenlos." },
      { name: "Reinigungsservice", desc: "Wöchentliche Reinigung bei Langzeitaufenthalten inklusive." },
      { name: "24/7 Kontakt", desc: "Wir sind jederzeit per Telefon oder WhatsApp für Sie da." },
    ],
  },
];

export const ServicePage: React.FC = () => {
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
              Unser Service
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Alles was Sie für einen perfekten Urlaub brauchen — in Piran und Villach
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
            {categories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                className="service-category"
                variants={fadeUp}
              >
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
            <h3 className="service-cta__title">Fragen zu unserem Service?</h3>
            <p className="service-cta__text">
              Wir helfen Ihnen gerne weiter. Kontaktieren Sie uns jederzeit.
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

export default ServicePage;
