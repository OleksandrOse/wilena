import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Guests } from "../types/Guests";
import "../styles/ModalBooking.scss";

const API_URL = "http://localhost:8080";

export type BookingSummary = {
  roomId: string;
  roomName: string;
  dateFrom: string;
  dateTo: string;
  nights: number;
  guests: Guests;
  pricePerNight: number;
  roomTotal: number;
  kurtaxTotal: number;
  discountTitle?: string;
  discountAmount?: number;
  discountManualReview?: boolean;
  grandTotal: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  summary?: BookingSummary | null;
  onSuccess: () => void;
};

function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

const ModalBooking: React.FC<Props> = ({ isOpen, setIsOpen, summary, onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // при закритті модалки — скидаємо форму й статуси
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSubmitting(false);
    }
  }, [isOpen]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary) return;

    if (!firstName || !lastName || !email || !phone) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      roomId: summary.roomId,
      roomName: summary.roomName,
      firstName,
      lastName,
      email,
      phone,
      guestsCount: summary.guests.adults + summary.guests.children,
      adults: summary.guests.adults,
      children: summary.guests.children,
      childrenAges: summary.guests.childrenAges,
      pets: summary.guests.hasDog,
      dateFrom: summary.dateFrom,
      dateTo: summary.dateTo,
      nights: summary.nights,
      pricePerNight: summary.pricePerNight,
      roomTotal: summary.roomTotal,
      kurtaxTotal: summary.kurtaxTotal,
      discountTitle: summary.discountTitle,
      discountAmount: summary.discountAmount,
      discountManualReview: summary.discountManualReview,
      grandTotal: summary.grandTotal,
    };

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Buchungsanfrage fehlgeschlagen");
      }

      // успіх: закриваємо це вікно, чистимо форму, повідомляємо батьківський компонент
      resetForm();
      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      setError("Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!summary) return null;

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div
            className="modal__overlay"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="modal__content">
            <button
              className="modal__close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <h2 className="modal__title">Zimmerreservierung</h2>

            <div className="modal__summary">
              <div className="modal__summary-row">
                <span>{summary.roomName}</span>
              </div>
              <div className="modal__summary-row">
                <span>{fmtDate(summary.dateFrom)} → {fmtDate(summary.dateTo)}</span>
                <span>{summary.nights} Nacht{summary.nights !== 1 ? "e" : ""}</span>
              </div>
              <div className="modal__summary-row">
                <span>€{summary.pricePerNight} × {summary.nights} Nacht{summary.nights !== 1 ? "e" : ""}</span>
                <span>€{summary.roomTotal}</span>
              </div>
              <div className="modal__summary-row">
                <span>Kurtaxe</span>
                <span>€{summary.kurtaxTotal}</span>
              </div>
              {summary.discountTitle && (
                <div className="modal__summary-row">
                  <span>
                    Rabatt: {summary.discountTitle}
                    {summary.discountManualReview ? " (wird geprüft)" : ""}
                  </span>
                  <span>{summary.discountAmount ? `–€${summary.discountAmount}` : "–"}</span>
                </div>
              )}
              <div className="modal__summary-total">
                <span>Gesamt</span>
                <strong>€{summary.grandTotal}</strong>
              </div>
            </div>

            <form className="modal__form" onSubmit={handleSubmit}>
              <input
                className="modal__input"
                type="text"
                placeholder="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="modal__input"
                type="text"
                placeholder="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="modal__input"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="modal__input"
                type="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {error && <p className="modal__error">{error}</p>}

              <button className="modal__submit" type="submit" disabled={submitting}>
                {submitting ? "Wird gesendet…" : "Bestätigen"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBooking;
