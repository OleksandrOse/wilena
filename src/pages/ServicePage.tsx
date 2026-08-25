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
    title: "Sommer Season, ab May bis ende September",
    icon: "☀️",
    services: [
      { name: "Check-in ab 16:00 Uhr", desc: " " },
      { name: "Check-out bis 10:00 Uhr", desc: " " },
    ],
  },
  {
    title: "Winter Season, ab Oktober bis ende April",
    icon: "❄️",
    services: [
      { name: "Check-in ab 15:00 Uhr", desc: "Flexibler Early oder Late Check-in auf Anfrage möglich." },
      { name: "Check-out bis 11:00 Uhr", desc: "Late Check-out bei Verfügbarkeit kostenlos." },
    ],
  },
  {
    title: "Transfer",
    icon: "🚐",
    services: [
      { name: "Flughafentransfers", desc: "Klagenfurt oder Ljubljana — auf Anfrage organisiert." },
      { name: "Bahnhoftransfers", desc: "Hauptbahnhof Villach oder Bahnhof Villach Warmbad — auf Anfrage." },
      { name: "Individuelle Abholung", desc: "Persönliche Abholung zu Ihrer gewünschten Uhrzeit auf Anfrage." },
    ],
  },
  {
    title: "Geführte Ausflüge",
    icon: "🧭",
    services: [
      { name: "Begleitete Touren", desc: "Begleitete Touren zu den schönsten Ausflugszielen der Umgebung." },
      { name: "Wanderungen", desc: "Geführte Wanderungen in den umliegenden Bergen auf Anfrage." },
      { name: "Städtetouren", desc: "Persönliche Touren durch Villach und Klagenfurt." },
    ],
  },
  {
    title: "Waschen und Bügeln",
    icon: "🧺",
    services: [
      { name: "Wäscheservice", desc: "Wäscheservice inklusive Bügeln auf Wunsch." },
    
    ],
  },
  {
    title: "Reinigung",
    icon: "🧺",
    services: [
      { name: "Express-Reinigung", desc: "Zusätzliche Reinigung für Bedarf auf Anfrage." },
    ],
  },
  {
    title: "Hundespaziergang",
    icon: "🐕",
    services: [
      { name: "Gassi-Service", desc: "Gassi-Service für Ihren vierbeinigen Begleiter." },
      { name: "Hundebetreuung", desc: "Stundenweise Betreuung während Ihrer Ausflüge auf Anfrage." },
    ],
  },
  {
    title: "Einkaufen",
    icon: "🛒",
    services: [
      { name: "Ihre Einkäufe", desc: "Wir übernehmen gerne Ihre Einkäufe vor der Anreise oder während des Aufenthalts." },
      { name: "Lebensmittel-Vorbereitung", desc: "Kühlschrank mit Grundausstattung auf Wunsch vor Ihrer Ankunft." },
      { name: "Getränke-Service", desc: "Auf Wunsch füllen wir den Kühlschrank vorab mit Prosecco, Bier oder Softdrinks Ihrer Wahl." },
    ],
  },
  {
    title: "Automieten",
    icon: "🚗",
    services: [
      { name: "Mietwagen", desc: "Unterstützung bei der Organisation eines Mietwagens." },
      { name: "Lieferung vor Ort", desc: "Abholung und Rückgabe des Mietwagens direkt bei den Apartments auf Anfrage." },
    ],
  },
  {
    title: "Fahrradverleih",
    icon: "🚲",
    services: [
      { name: "Fahrräder und E-Bikes", desc: "Fahrräder und E-Bikes direkt vor Ort." },
      { name: "Zubehör", desc: "Schlösser auf Anfrage inklusive." },
    ],
  },
  {
    title: "Verschiedene Termine",
    icon: "📅",
    services: [
      { name: "Arzt & Reha", desc: "Unterstützung bei der Terminvereinbarung für Arzt- und Reha-Besuche." },
      { name: "Schönheit & Wellness", desc: "Empfehlungen und Terminorganisation für Beauty- und Wellness-Anwendungen." },
      { name: "Autoreparatur", desc: "Vermittlung von Kontakten zu Werkstätten in der Umgebung." },
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
              Gästeservice
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Alles was Sie zusätzlich für Ihre angenehme Aufenhalt in Wilena Apartments brauchen können.
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
              Wir helfen Ihnen gerne weiter. Kontaktieren Sie uns.
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
