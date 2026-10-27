import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/ServicePage.scss";

type Props = {
  title: string;
};

const ContactService: React.FC<Props> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="service-cta"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h3 className="service-cta__title">{t("contactService.title", { title })}</h3>
      <p className="service-cta__text">{t("contactService.text")}</p>
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

export default ContactService;
