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
      { name: "Billa", desc: "Villacher Schächtestraße 33 — Supermarkt in Gehnähe.", mapQuery: "Billa Villacher Schächtestraße 33, Villach" },
      { name: "Einkaufszentrum ATRIO", desc: "Großes Einkaufszentrum mit zahlreichen Geschäften und Food Courts.", mapQuery: "Einkaufszentrum ATRIO, Villach" },
    ],
  },
  {
    title: "Essen",
    icon: "🍽️",
    services: [
      { name: "ATRIO Villach", desc: "Vielfältige Food Courts im Einkaufszentrum.", mapQuery: "ATRIO Villach" },
      { name: "Gasthof Gasser", desc: "Traditionelle Kärntner Küche.", mapQuery: "Gasthof Gasser, Villach" },
      { name: "Villacher Sterierhof", desc: "Gemütliches Gasthaus mit regionaler Küche.", mapQuery: "Villacher Sterierhof, Villach" },
      { name: "Caldarium", desc: "Restaurant mit italienisch inspirierter Küche.", mapQuery: "Caldarium Restaurant, Villach" },
      { name: "HAIKKY Asia Cooking Villach", desc: "Asiatische Küche mitten in Villach.", mapQuery: "HAIKKY Asia Cooking, Villach" },
      { name: "Gasthaus Fruhmann", desc: "Klassisches Kärntner Gasthaus.", mapQuery: "Gasthaus Fruhmann, Villach" },
      { name: "Villacher Brauhof", desc: "Regionale Küche und hausgebrautes Bier.", mapQuery: "Villacher Brauhof, Villach" },
      { name: "Konditorei & Restaurant Hotel Warmbaderhof", desc: "Feine Konditorei direkt bei der Therme.", mapQuery: "Hotel Warmbaderhof, Villach" },
    ],
  },
  {
    title: "Ausflugsziele",
    icon: "🗺️",
    services: [
      { name: "Villach Stadt", desc: "Historische Altstadt mit Draufuß-Promenade.", mapQuery: "Villach Altstadt" },
      { name: "Klagenfurt Stadt", desc: "Landeshauptstadt Kärntens am Wörthersee.", mapQuery: "Klagenfurt" },
      { name: "Velden am Wörthersee", desc: "Bekannter Seeort mit mondänem Flair.", mapQuery: "Velden am Wörthersee" },
      { name: "Pörtschach am Wörthersee", desc: "Elegante Seepromenade und Badestrände.", mapQuery: "Pörtschach am Wörthersee" },
      { name: "Großglockner Hochalpenstraße", desc: "Österreichs berühmteste Panoramastraße.", mapQuery: "Großglockner Hochalpenstraße" },
      { name: "Villacher Alpenstraße", desc: "Aussichtsstraße mit Panoramablick über Villach.", mapQuery: "Villacher Alpenstraße" },
      { name: "Weissensee", desc: "Kristallklarer Bergsee, idyllisch gelegen.", mapQuery: "Weissensee, Kärnten" },
      { name: "Maltatal", desc: "Malerisches Tal mit Stauseen und Wasserfällen.", mapQuery: "Maltatal, Kärnten" },
      { name: "Tarvisio (Italien)", desc: "Grenznaher Ausflug nach Italien.", mapQuery: "Tarvisio, Italien" },
      { name: "Kranjska Gora (Slowenien)", desc: "Grenznaher Ausflug nach Slowenien.", mapQuery: "Kranjska Gora, Slowenien" },
    ],
  },
  {
    title: "Transportmittel",
    icon: "🚆",
    services: [
      { name: "Flughafen Klagenfurt", desc: "Nächstgelegener Flughafen, ca. 30 Autominuten entfernt.", mapQuery: "Flughafen Klagenfurt" },
      { name: "Internationaler Flughafen Ljubljana", desc: "Alternative Anreise aus Slowenien, ca. 1,5 Stunden entfernt.", mapQuery: "Flughafen Ljubljana" },
      { name: "Hauptbahnhof Villach", desc: "Zentraler Bahnhof mit nationalen und internationalen Verbindungen.", mapQuery: "Hauptbahnhof Villach" },
      { name: "Bahnhof Villach Warmbad", desc: "Lokaler Bahnhof in unmittelbarer Nähe der Apartments.", mapQuery: "Bahnhof Villach Warmbad" },
      { name: "Bushaltestelle Villach Jesenfeldrein", desc: "Nächstgelegene Bushaltestelle für den lokalen Nahverkehr.", mapQuery: "Bushaltestelle Villach Jesenfeldrein" },
    ],
  },
];

const mapUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

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
                    <motion.a
                      key={s.name}
                      href={mapUrl(s.mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </motion.a>
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
