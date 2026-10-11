import { motion } from "framer-motion";
import "../styles/ServicePage.scss";

type Props = {
  title: string;
}

const Contact: React.FC<Props> = ({ title }) => {
  return (
     <motion.div
            className="service-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="service-cta__title">Noch Fragen zu{title}?</h3>
            <p className="service-cta__text">
            Gerne geben wir Ihnen persönliche Tipps und Empfehlungen für Ihren Aufenthalt. Sprechen Sie uns einfach an - wir helfen Ihnen gerne weiter
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
  );
};

export default Contact;
