import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "../utils/animations";
import { contacts, MAP_SEARCH_URL, MAP_EMBED_URL } from "../data/contacts";
import "../styles/ContactPage.scss";

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <Header />

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero__overlay">
          <motion.div
            className="contact-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="contact-hero__eyebrow" variants={fadeUp}>
              WILENA APARTMENTS
            </motion.p>
            <motion.h1 className="contact-hero__title" variants={fadeUp}>
              {t("nav.contact")}
            </motion.h1>
            <motion.p className="contact-hero__subtitle" variants={fadeUp}>
              {t("contactPage.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Breadcrumbs />

      <section className="contact-body">
        <div className="contact-body__container">

          {/* ── INFO CARDS ── */}
          <motion.div
            className="contact-cards"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {contacts.map((c) => (
              <motion.div
                key={c.title}
                className="contact-card"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="contact-card__icon">{c.icon}</div>
                <h3 className="contact-card__title">{c.title}</h3>
                {c.subtitle && <h3 className="contact-card__subtitle">{c.subtitle}</h3>}
                {c.lines.map((line) => (
                  <p key={line} className="contact-card__line">{line}</p>
                ))}
                <a href={c.link} className="contact-card__link" target="_blank" rel="noreferrer">
                  {c.linkLabel} →
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* ── FORM + MAP ── */}
          <div className="contact-main">

            {/* Form */}
            <motion.div
              className="contact-form-wrap"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="contact-form-wrap__title">{t("contactPage.formTitle")}</h2>
              <p className="contact-form-wrap__desc">
                {t("contactPage.formDesc")}
              </p>

              {sent ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="contact-success__icon">✓</div>
                  <h3>{t("contactPage.sentTitle")}</h3>
                  <p>{t("contactPage.sentText")}</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}>
                    {t("contactPage.newMessage")}
                  </button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <label className="contact-form__field">
                      <span>{t("contactPage.name")}</span>
                      <input
                        type="text"
                        placeholder={t("contactPage.namePh")}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </label>
                    <label className="contact-form__field">
                      <span>{t("contactPage.email")}</span>
                      <input
                        type="email"
                        placeholder="max@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </label>
                  </div>
                  <label className="contact-form__field">
                    <span>{t("contactPage.phone")}</span>
                    <input
                      type="tel"
                      placeholder="+43 ..."
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </label>
                  <label className="contact-form__field">
                    <span>{t("contactPage.message")}</span>
                    <textarea
                      placeholder={t("contactPage.messagePh")}
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                    />
                  </label>
                  <motion.button
                    type="submit"
                    className="contact-form__submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t("contactPage.send")}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              className="contact-map"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <h2 className="contact-map__title">{t("contactPage.locations")}</h2>
              <div className="contact-map__tabs">
                <a
                  className="contact-map__tab"
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Villach
                </a>
              </div>
              
              <iframe
                className="contact-map__frame"
                src={MAP_EMBED_URL}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wilena Apartments Villach"
              />
              <div className="contact-map__info">
                <div>
                  <strong>Villach</strong>
                  <span>Warmbader Allee 53, 9504</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
