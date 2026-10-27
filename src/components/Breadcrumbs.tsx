import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../styles/Breadcrumbs.scss";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function Breadcrumbs() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const parts = location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) return null;

  const labelFor = (part: string) => {
    const key = `crumbs.${part}`;
    return i18n.exists(key) ? t(key) : capitalize(decodeURIComponent(part));
  };

  const crumbs = [
    { label: t("nav.home"), path: "/" },
    ...parts.map((part, i) => ({
      label: labelFor(part),
      path: "/" + parts.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <motion.nav
      className="breadcrumbs"
      aria-label={t("crumbs.aria")}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <ol className="breadcrumbs__list">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          const isFirst = i === 0;
          return (
            <li key={crumb.path} className="breadcrumbs__item">
              {isLast ? (
                <span className="breadcrumbs__current">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path} className="breadcrumbs__link">
                    {isFirst && <span className="breadcrumbs__home-icon">⌂</span>}
                    {crumb.label}
                  </Link>
                  <span className="breadcrumbs__sep" aria-hidden>›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
}
