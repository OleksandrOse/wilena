import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fadeUp, stagger } from '../utils/animations';
import '../styles/NotFoundPage.scss';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { to: '/', label: t('notFound.home') },
    { to: '/apartment-166', label: 'Apartment 166' },
    { to: '/apartment-172', label: 'Apartment 172' },
    { to: '/angebote', label: t('nav.offers') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <div className="not-found-page">
      <Header />

      <main className="not-found">
        <motion.div
          className="not-found__content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className="not-found__eyebrow" variants={fadeUp}>
            WILENA APARTMENTS
          </motion.p>
          <motion.div className="not-found__code" variants={fadeUp} aria-hidden="true">
            404
          </motion.div>
          <motion.h1 className="not-found__title" variants={fadeUp}>
            {t('notFound.title')}
          </motion.h1>
          <motion.p className="not-found__text" variants={fadeUp}>
            {t('notFound.text')}
          </motion.p>

          <motion.div className="not-found__actions" variants={fadeUp}>
            <Link to="/" className="not-found__btn">{t('notFound.toHome')}</Link>
          </motion.div>

          <motion.ul className="not-found__links" variants={fadeUp}>
            {quickLinks.slice(1).map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
