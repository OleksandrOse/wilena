import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { fadeUp, stagger } from "../utils/animations";
import { categories } from "../data/serviceCategories";
import "../styles/ServicePage.scss";
import Contact from "../components/Contact";

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
              Gästeservice nach Anfrage
            </motion.h1>
            <motion.p className="service-hero__subtitle" variants={fadeUp}>
              Zusätzliche Gästeservices sind nur auf Anfrage und gegen Aufpreis erhältlich.
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
                  <div className="service-category__content">
                    <h2 className="service-category__title">{cat.title}</h2>
                    {cat.subtitle && (
                      <p className="service-category__subtitle">{cat.subtitle}</p>
                    )}
                  </div>
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

          <Contact title=" unserem Service" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
