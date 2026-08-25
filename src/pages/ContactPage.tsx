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

// назва + адреса разом — так Google Maps шукає саме заклад "Wilena Apartments"
// і показує позначку (пін) із цією назвою, а не просто голу точку на адресі
const MAP_QUERY = "Wilena Apartments, Warmbader Allee 53, 9504 Villach, Österreich";
const MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

const contacts = [
  {
    icon: "📍",
    title: "Villach",
    lines: ["Warmbader Allee 53", "9504 Villach, Österreich"],
    link: MAP_SEARCH_URL,
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
              Wir freuen uns auf Ihre Nachricht — in Villach
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
                  href={MAP_SEARCH_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  📍 Villach
                </a>
              </div>
              {/* q=Wilena+Apartments,... шукає саме заклад за назвою — Google Maps
                  показує позначку (пін) із написом "Wilena Apartments", а не просто адресу */}
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
