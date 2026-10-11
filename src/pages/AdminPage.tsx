import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingsPanel from "../components/BookingsPanel";
import PricePeriodsPanel from "../components/PricePeriodPanel";
import "../styles/AdminPage.scss";
import TestimonialsPanel from "../components/TestimonialPanel";


const API_URL = "http://localhost:8080";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("adminAccessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function clearAdminSession() {
  localStorage.removeItem("adminAccessToken");
  localStorage.removeItem("adminUser");
}

async function authFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      ...getAuthHeaders(),
    },
  });

  if (res.status === 401) {
    clearAdminSession();
    window.location.hash = "#/wilena";
  }

  return res;
}


type Tab = "prices" | "reviews" | "bookings";

// ── Helpers ────────────────────────────────────────────────────────────────
function fmtDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

async function parseError(res: Response) {
  try {
    const data = await res.json();
    return data.message || "Unbekannter Fehler.";
  } catch {
    return "Unbekannter Fehler.";
  }
}

// ── Main ───────────────────────────────────────────────────────────────────
const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("prices");

  const handleLogout = () => {
    clearAdminSession();
    navigate("/wilena");
  };

  return (
    <div className="admin-page">
      <Header />

      <div className="admin-content">
        <div className="admin-header-row">
          <h1 className="admin-title">Verwaltung</h1>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Abmelden
          </button>
        </div>

        <div className="admin-tabs">
        <button
            className={`admin-tabs__btn ${tab === "prices" ? "is-active" : ""}`}
            onClick={() => setTab("prices")}
          >
            Preise &amp; Zeiträume
          </button>
          <button
            className={`admin-tabs__btn ${tab === "reviews" ? "is-active" : ""}`}
            onClick={() => setTab("reviews")}
          >
            Bewertungen
          </button>
          <button
            className={`admin-tabs__btn ${tab === "bookings" ? "is-active" : ""}`}
            onClick={() => setTab("bookings")}
          >
            Buchungen
          </button>
        </div>

        {tab === "prices" && <PricePeriodsPanel />}
        {tab === "reviews" && <TestimonialsPanel />}
        {tab === "bookings" && <BookingsPanel />}
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
