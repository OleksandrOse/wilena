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
    title: "Kärntner Therme",
    icon: "♨️",
    services: [
      {
        name: "Aktivurlaub & Wellness",
        desc: "Wasserrutschen und Attraktionen sowie Wellness und medizinische Anwendungen im Kurzentrum mit Thermalquellen und Rehabilitation Thermenhof.",
      },
      {
        name: "Bequem zu Fuß erreichbar",
        desc: "Der Thermenpark und das Kurzentrum liegen fußläufig von den Wilena Apartments entfernt.",
      },
      {
        name: "Handtücher inklusive",
        desc: "Für Ihren Besuch in der Therme stellen wir Ihnen gerne kostenfrei Handtücher zur Verfügung.",
      },
    ],
  },
  {
    title: "Seen & Baden",
    icon: "🏞️",
    services: [
      { name: "Faakersee", desc: "Beliebter Badesee mit klarem, warmem Wasser." },
      { name: "Ossiacher See", desc: "Großer Kärntner See mit vielen Freizeitmöglichkeiten." },
      { name: "Wörthersee", desc: "Strandbäder und Schifffahrten auf Kärntens bekanntestem See." },
    ],
  },
  {
    title: "Skifahren",
    icon: "⛷️",
    services: [
      { name: "Gerlitzen Alpe", desc: "Familienfreundliches Skigebiet mit Panoramablick." },
      { name: "Nassfeld", desc: "Eines der schneesichersten Skigebiete Kärntens." },
    ],
  },
  {
    title: "Freizeitparks für die ganze Familie",
    icon: "🎢",
    services: [
      { name: "Familypark Ossiacher See", desc: "Abwechslungsreicher Freizeitpark für Kinder und Familien." },
      { name: "Abenteuer Affenberg", desc: "Freilebende Affen hautnah erleben." },
      { name: "Kletterwald Ossiacher See", desc: "Hochseilgarten mit Parcours für Groß und Klein." },
      { name: "Adlerarena Burg Landskron", desc: "Greifvogel-Flugschau auf historischer Burg." },
      { name: "Tierpark Rosegg", desc: "Naturnaher Wildpark mit heimischen Tierarten." },
      { name: "Minimundus Klagenfurt", desc: "Die Welt im Miniaturformat." },
      { name: "Pyramidenkogel", desc: "Höchster Holzaussichtsturm der Welt mit Rutsche." },
    ],
  },
  {
    title: "Bei Schlechtwetter",
    icon: "☔",
    services: [
      { name: "Kärnten Therme", desc: "Indoor-Wellness und Wasserspaß bei jedem Wetter." },
      { name: "Reptilienzoo Klagenfurt", desc: "Über 200 Reptilien und Amphibien hautnah." },
      { name: "Planetarium Klagenfurt", desc: "Sternenhimmel und Weltraum-Shows." },
      { name: "Jump Dome Klagenfurt", desc: "Trampolinpark für Action und Spaß." },
      { name: "Schaubergwerk Terra Mystica", desc: "Untertägige Erlebniswelt in Bad Bleiberg." },
      { name: "Granatium Radenthein", desc: "Erlebniswelt rund um den Kärntner Granat." },
      { name: "Tropfsteinhöhlen Oberdrautal", desc: "Beeindruckende unterirdische Höhlenwelt." },
      { name: "Indoor Kartbahn Rosental", desc: "Kartfahren unabhängig vom Wetter." },
    ],
  },
];

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
              Freizeit
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Therme, Seen, Skigebiete und Freizeitparks rund um Warmbad Villach
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
            <h3 className="service-cta__title">Fragen zu Ausflügen & Aktivitäten?</h3>
            <p className="service-cta__text">
              Wir geben Ihnen gerne persönliche Empfehlungen. Kontaktieren Sie uns jederzeit.
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

export default FreizeitPage;