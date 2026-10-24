import { FC } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { fadeUp, stagger } from '../utils/animations';
import { LegalDoc, LegalBlock } from '../data/legalContent';
import '../styles/ServicePage.scss';
import '../styles/LegalPage.scss';

const renderBlock = (b: LegalBlock, i: number) => {
  if (b.type === 'p') return <p key={i} className="legal__p">{b.text}</p>;
  if (b.type === 'list') {
    return (
      <ul key={i} className="legal__list">
        {b.items.map((it) => <li key={it}>{it}</li>)}
      </ul>
    );
  }
  return (
    <p key={i} className="legal__p legal__p--lines">
      {b.items.map((it) => <span key={it}>{it}</span>)}
    </p>
  );
};

const LegalPage: FC<{ doc: LegalDoc }> = ({ doc }) => (
  <div className="service-page">
    <Header />

    <section className="service-hero service-hero--compact">
      <div className="service-hero__overlay">
        <motion.div className="service-hero__content" initial="hidden" animate="visible" variants={stagger}>
          <motion.p className="service-hero__eyebrow" variants={fadeUp}>WILENA APARTMENTS</motion.p>
          <motion.h1 className="service-hero__title" variants={fadeUp}>{doc.title}</motion.h1>
        </motion.div>
      </div>
    </section>

    <Breadcrumbs />

    <section className="service-body">
      <div className="service-body__container">
        <article className="legal">
          {doc.intro && <p className="legal__intro">{doc.intro}</p>}

          {doc.sections.map((s, i) => (
            <motion.section
              key={`${s.heading}-${i}`}
              className="legal__section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {s.heading && <h2 className="legal__heading">{s.heading}</h2>}
              {s.blocks.map(renderBlock)}
            </motion.section>
          ))}

          {doc.outro && <p className="legal__outro">{doc.outro}</p>}
        </article>
      </div>
    </section>

    <Footer />
  </div>
);

export default LegalPage;
