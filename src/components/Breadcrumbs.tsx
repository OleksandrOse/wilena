import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Breadcrumbs.scss";

const labels: Record<string, string> = {
  "": "Home",
  piran: "Piran",
  villach: "Villach",
  angebote: "Angebote",
  service: "Service",
  room1: "Zimmer 1",
  room2: "Zimmer 2",
  room3: "Zimmer 3",
  room4: "Zimmer 4",
  room5: "Zimmer 5",
};

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  // Don't show on homepage
  if (parts.length === 0) return null;

  const crumbs = [
    { label: "Home", path: "/" },
    ...parts.map((part, i) => ({
      label: labels[part] ?? decodeURIComponent(part),
      path: "/" + parts.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <motion.nav
      className="breadcrumbs"
      aria-label="Breadcrumb"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <ol className="breadcrumbs__list">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="breadcrumbs__item">
              {isLast ? (
                <span className="breadcrumbs__current">{crumb.label}</span>
              ) : (
                <>
                  <Link to={crumb.path} className="breadcrumbs__link">
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
