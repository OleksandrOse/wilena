import { FC, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QuickBookingModal from '../components/QuickBookingModal';
import Testimonials from '../components/Testimonials';
import { Stat } from '../types/Stat';
import {
  ComfortIcon, LakesMountainsIcon, ThermalIcon, CyclingIcon,
  WinterIcon, WellnessIcon, ShoppingIcon,
} from '../components/FeatureIcons';
import { fadeUp, stagger } from "../utils/animations";
import '../styles/HomePage.scss';

const apartments = [
  {
    id: '1',
    title: 'Apartment 166',
    tag: 'Villach Warmbad',
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00013.jpeg`,
    path: '/apartment-166',
    accent: '#6a9b6e',
  },
  {
    id: '2',
    title: 'Apartment 172',
    tag: 'Villach Warmbad',
    img: `${process.env.PUBLIC_URL}/Wilena/Apartment2/21.jpeg`,
    path: '/apartment-172',
    accent: '#c9a24d',
  },
];

const features = [
  { icon: <ComfortIcon />, key: 'comfort' },
  { icon: <LakesMountainsIcon />, key: 'lakes' },
  { icon: <ThermalIcon />, key: 'thermal' },
  { icon: <CyclingIcon />, key: 'cycling' },
  { icon: <WinterIcon />, key: 'winter' },
  { icon: <WellnessIcon />, key: 'wellness' },
  { icon: <ShoppingIcon />, key: 'shopping' },
];

// ─── page ─────────────────────────────────────────────────────────────────────
export const HomePage: FC = () => {
  const { t } = useTranslation();
  const stats: Stat[] = [
    { value: "24/7", label: t('home.stats.support') },
    { value: "9,2/10", label: "Booking.com" },
    { value: "5,0/5", label: "Airbnb", icon: `${process.env.PUBLIC_URL}/superhost-badge.png` },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="home-hero" ref={heroRef}>
        <motion.div className="home-hero__bg" style={{ y: heroY }} />
        <motion.div className="home-hero__overlay" style={{ opacity: heroOpacity }}>
          <motion.div
            className="home-hero__content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p className="home-hero__eyebrow" variants={fadeUp}>
              {t('home.eyebrow')}
            </motion.p>
            <motion.h1 className="home-hero__title" variants={fadeUp}>
              Wilena<br />
              <span>apartments</span>
            </motion.h1>
            <motion.p className="home-hero__sub-title" variants={fadeUp}>
              {t('home.tagline')}
            </motion.p>
            <motion.p className="home-hero__subtitle" variants={fadeUp}>
              {t('home.heroSub')}
            </motion.p>
            <motion.div className="home-hero__actions" variants={fadeUp}>
              <button
                className="home-hero__btn home-hero__btn--primary"
                onClick={() => setIsOpen(true)}
              >
                {t('common.bookNow')}
              </button>
            </motion.div>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            className="home-hero__scroll"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <span>↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── INTRO STRIP ──────────────────────────────────────────────────── */}
      <motion.section
        className="home-strip"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        {['Warmbader Allee 53, 9504 Villach', 'wilena@speed.at', '+43 664 737 48 88'].map((item, i) => (
          <motion.div key={i} className="home-strip__item" variants={fadeUp}>
            {item}
          </motion.div>
        ))}
      </motion.section>

      {/* ── INTRO / ABOUT ─────────────────────────────────────────────────── */}
      <section className="home-intro">
        <div className="home-intro__container">
          <motion.div
            className="home-intro__text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="home-intro__tag" variants={fadeUp}>{t('home.aboutTag')}</motion.span>
            <motion.h2 className="home-intro__title" variants={fadeUp}>
              <Trans i18nKey="home.introTitle" components={{ br: <br /> }} />
            </motion.h2>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p1')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p2')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p3')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p4')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p5')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p6')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p7')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p8')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p9')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p10')}
            </motion.p>
            <motion.p className="home-intro__desc" variants={fadeUp}>
              {t('home.intro.p11')}
            </motion.p>
            <motion.div className="home-intro__stats" variants={fadeUp}>
              {stats.map((stat) => (
                <div className="home-intro__stat" key={stat.label}>
                  <span className="home-intro__stat-value">
                    {stat.icon && (
                      <img src={stat.icon} alt="" className="home-intro__stat-icon" />
                    )}
                    {stat.value}
                  </span>
                  {stat.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="home-intro__images"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <img
              className="home-intro__img home-intro__img--main"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/image.avif`}
              alt="Villach"
            />
            <img
              className="home-intro__img home-intro__img--accent"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/2.jpg`}
              alt="Piran"
            />
            <img
              className="home-intro__img home-intro__img--third"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/3.jpg`}
              alt="Villach"
            />
            <img
              className="home-intro__img home-intro__img--fourth"
              src={`${process.env.PUBLIC_URL}/Wilena/Rezidenz/5.jpg`}
              alt="Piran"
            />
          </motion.div>
        </div>
      </section>

      <section className="home-locations" id="apartments">
        <div className="home-locations__container">
          <motion.div
            className="home-locations__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="home-locations__tag" variants={fadeUp}>{t('home.apartmentsTag')}</motion.span>
            <motion.h2 className="home-locations__title" variants={fadeUp}>
              {t('home.apartmentsTitle')}
            </motion.h2>
          </motion.div>

          <div className="home-locations__cards">
            {apartments.map((apt, i) => (
              <motion.div
                key={apt.id}
                className="home-location-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover="hover"
                onClick={() => navigate(apt.path)}
              >
                <div className="home-location-card__image-wrap">
                  <motion.img
                    src={apt.img}
                    alt={apt.title}
                    className="home-location-card__image"
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="home-location-card__body">
                  <h3 className="home-location-card__title">{apt.title}</h3>
                  <p className="home-location-card__desc">{t(`home.apartments.${apt.id}.desc`)}</p>
                  <span className="home-location-card__cta">
                    {t('home.discover')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="home-features">
        <div className="home-features__container">
          <motion.h2
            className="home-features__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Ihr perfekter Urlaub — <em>Ihre Wahl</em> */}
            {t('home.featuresTitle')}
          </motion.h2>
          <motion.div
            className="home-features__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {features.map((f) => (
              <motion.div
                key={f.key}
                className="home-feature-card"
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
              >
                <div className="home-feature-card__icon">{f.icon}</div>
                <h3 className="home-feature-card__title">{t(`home.features.${f.key}.title`)}</h3>
                <p className="home-feature-card__desc">{t(`home.features.${f.key}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <div className="home-testimonials-wrap">
        <Testimonials />
      </div>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <motion.section
        className="home-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="home-cta__inner">
          <h2 className="home-cta__title">
            {/* Bereit für Ihren Traumurlaub? */}
            {t('home.ctaTitle')}
          </h2>
          <p className="home-cta__text">{t('home.ctaText')}</p>
          <button className="home-cta__btn" onClick={() => setIsOpen(true)}>
            {t('common.bookNow')}
          </button>
        </div>
      </motion.section>

      <Footer />
      <QuickBookingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
