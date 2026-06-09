import { motion, Variants } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import "../styles/ContactPage.scss";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const contacts = [
  {
    icon: "📍",
    title: "Villach",
    lines: ["Warmbader Allee 53", "9504 Villach, Österreich"],
    link: "https://maps.google.com/?q=Warmbader+Allee+53+Villach",
    linkLabel: "Auf Karte öffnen",
  },
  {
    icon: "📍",
    title: "Piran",
    lines: ["Obzidna Ulica 4", "6330 Piran, Slowenien"],
    link: "https://maps.google.com/?q=Obzidna+Ulica+4+Piran",
    linkLabel: "Auf Karte öffnen",
  },
  {
    icon: "📞",
    title: "Telefon",
    lines: ["+43 664 737 48 88"],
    link: "tel:+436647374888",
    linkLabel: "Anrufen",
  },
  {
    icon: "✉️",
    title: "E-Mail",
    lines: ["wilena@speed.at"],
    link: "mailto:wilena@speed.at",
    linkLabel: "E-Mail senden",
  },
];

export const ContactPage: React.FC = () => {
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
              Kontakt
            </motion.h1>
            <motion.p className="contact-hero__subtitle" variants={fadeUp}>
              Wir freuen uns auf Ihre Nachricht — in Villach und Piran
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
              <h2 className="contact-form-wrap__title">Nachricht senden</h2>
              <p className="contact-form-wrap__desc">
                Füllen Sie das Formular aus — wir antworten innerhalb von 24 Stunden.
              </p>

              {sent ? (
                <motion.div
                  className="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="contact-success__icon">✓</div>
                  <h3>Nachricht gesendet!</h3>
                  <p>Wir melden uns so schnell wie möglich bei Ihnen.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}>
                    Neue Nachricht
                  </button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <label className="contact-form__field">
                      <span>Vorname & Nachname *</span>
                      <input
                        type="text"
                        placeholder="Max Mustermann"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </label>
                    <label className="contact-form__field">
                      <span>E-Mail *</span>
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
                    <span>Telefon</span>
                    <input
                      type="tel"
                      placeholder="+43 ..."
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </label>
                  <label className="contact-form__field">
                    <span>Nachricht *</span>
                    <textarea
                      placeholder="Ihre Nachricht..."
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
                    Nachricht senden
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
              <h2 className="contact-map__title">Unsere Standorte</h2>
              <div className="contact-map__tabs">
                <a
                  className="contact-map__tab"
                  href="https://maps.google.com/?q=Warmbader+Allee+53+Villach"
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Villach
                </a>
                <a
                  className="contact-map__tab"
                  href="https://maps.google.com/?q=Obzidna+Ulica+4+Piran"
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Piran
                </a>
              </div>
              <iframe
                className="contact-map__frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.1!2d13.856!3d46.604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477588!2sWarmbader+Allee+53%2C+Villach!5e0!3m2!1sde!2sat!4v1"
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
                <div>
                  <strong>Piran</strong>
                  <span>Obzidna Ulica 4, 6330</span>
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
