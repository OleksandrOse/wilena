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

type Service = {
  name: string;
  desc: string;
  image: string;
  link?: string;
};

const categories: { title: string; icon: string; services: Service[] }[] = [
  {
    title: "Kärntner Therme",
    icon: "♨️",
    services: [
      {
        name: "Aktivurlaub & Wellness",
        desc: "Wasserrutschen und Attraktionen sowie Wellness und medizinische Anwendungen im Kurzentrum mit Thermalquellen und Rehabilitation Thermenhof.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Bequem zu Fuß erreichbar",
        desc: "Der Thermenpark und das Kurzentrum liegen fußläufig von den Wilena Apartments entfernt.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/3.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Handtücher inklusive",
        desc: "Für Ihren Besuch in der Therme stellen wir Ihnen gerne kostenfrei Handtücher zur Verfügung.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/2.jpg`,
        link: "https://www.kaerntentherme.com",
      },
    ],
  },
  {
    title: "Seen & Baden",
    icon: "🏞️",
    services: [
      {
        name: "Faakersee",
        desc: "Beliebter Badesee mit klarem, warmem Wasser.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Faakersee.jpg`,
        link: "https://www.visitvillach.at/de/faaker-see.html",
      },
      {
        name: "Ossiacher See",
        desc: "Großer Kärntner See mit vielen Freizeitmöglichkeiten.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Ossiachersee.jpg`,
        link: "https://www.kaernten.at/seen/ossiacher-see/",
      },
      {
        name: "Wörthersee",
        desc: "Strandbäder und Schifffahrten auf Kärntens bekanntestem See.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Wörtersee.jpg`,
        link: "https://www.woerthersee.com",
      },
    ],
  },
  {
    title: "Skifahren",
    icon: "⛷️",
    services: [
      {
        name: "Gerlitzen Alpe",
        desc: "Familienfreundliches Skigebiet mit Panoramablick.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/7.jpg`,
        link: "https://www.gerlitzen.com",
      },
      {
        name: "Nassfeld",
        desc: "Eines der schneesichersten Skigebiete Kärntens.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/8.jpg`,
        link: "https://www.nassfeld.at",
      },
    ],
  },
  {
    title: "Freizeitparks für die ganze Familie",
    icon: "🎢",
    services: [
      {
        name: "Familypark Ossiacher See",
        desc: "Abwechslungsreicher Freizeitpark für Kinder und Familien.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/9.jpg`,
        link: "https://www.familypark.at",
      },
      {
        name: "Abenteuer Affenberg",
        desc: "Freilebende Affen hautnah erleben.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/10.jpg`,
        link: "https://www.affenberg.com",
      },
      {
        name: "Kletterwald Ossiacher See",
        desc: "Hochseilgarten mit Parcours für Groß und Klein.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/11.jpg`,
        link: "https://www.kletterwald.at",
      },
      {
        name: "Adlerarena Burg Landskron",
        desc: "Greifvogel-Flugschau auf historischer Burg.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/12.jpg`,
        link: "https://www.adlerarena.com",
      },
      {
        name: "Tierpark Rosegg",
        desc: "Naturnaher Wildpark mit heimischen Tierarten.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/14.jpg`,
        link: "https://www.tierpark-rosegg.at",
      },
      {
        name: "Minimundus Klagenfurt",
        desc: "Die Welt im Miniaturformat.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/15.jpg`,
        link: "https://www.minimundus.at",
      },
      {
        name: "Pyramidenkogel",
        desc: "Höchster Holzaussichtsturm der Welt mit Rutsche.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/16.jpg`,
        link: "https://www.pyramidenkogel.info",
      },
    ],
  },
  {
    title: "Bei Schlechtwetter",
    icon: "☔",
    services: [
      {
        name: "Kärnten Therme",
        desc: "Indoor-Wellness und Wasserspaß bei jedem Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Reptilienzoo Klagenfurt",
        desc: "Über 200 Reptilien und Amphibien hautnah.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/17.jpg`,
        link: "https://www.reptilienzoo.at",
      },
      {
        name: "Planetarium Klagenfurt",
        desc: "Sternenhimmel und Weltraum-Shows.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/18.jpg`,
        link: "https://www.miniversum-planetarium.at/",
      },
      {
        name: "Jump Dome Klagenfurt",
        desc: "Trampolinpark für Action und Spaß.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/19.jpg`,
        link: "https://jumpdome.at/klagenfurt",
      },
      {
        name: "Schaubergwerk Terra Mystica",
        desc: "Untertägige Erlebniswelt in Bad Bleiberg.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/20.jpg`,
        link: "https://www.terra-mystica.at",
      },
      {
        name: "Granatium Radenthein",
        desc: "Erlebniswelt rund um den Kärntner Granat.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/21.jpg`,
        link: "https://www.granatium.at",
      },
      {
        name: "Tropfsteinhöhlen Oberdrautal",
        desc: "Beeindruckende unterirdische Höhlenwelt.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/22.jpg`,
        link: "https://www.hoehlen.at",
      },
      {
        name: "Indoor Kartbahn Rosental",
        desc: "Kartfahren unabhängig vom Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/23.jpg`,
        link: "https://www.kartbahn-rosental.at",
      },
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
