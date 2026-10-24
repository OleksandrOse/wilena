import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Guests } from "../types/Guests";
import "../styles/ModalBooking.scss";
import { buildNightlyPrices, fetchRoomPricing, fmtDate, groupPriceSegments, PriceSegment } from "../utils/pricing";
import { ServerRoom } from "../services/serverRoomService";
import { createBooking, NewBooking } from "../services/bookingService";

const PET_FEE = 20; // € одноразово за бронювання, якщо є домашня тварина
const NR_DISCOUNT_RATE = 0.1; // Non-Refundable: −10 % від ціни за ночі

const round2 = (n: number) => Math.round(n * 100) / 100;
const eur = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

const RATE_LABELS = {
  flexible: "Flexible Rate",
  nonrefundable: "Non-Refundable Rate",
} as const;

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
  petFee?: number;
  rateType?: "flexible" | "nonrefundable";
  rateDiscount?: number;
  wishes?: string;
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

function errorMessage(e: unknown, fallback: string): string {
  return e instanceof Error ? e.message : fallback;
}

const ModalBooking: React.FC<Props> = ({ isOpen, setIsOpen, summary, onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pricing, setPricing] = useState<ServerRoom | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !summary) {
      setPricing(null);
      return;
    }

    let cancelled = false;
    setPricingLoading(true);

    fetchRoomPricing(summary.roomId).then((data) => {
      if (!cancelled) {
        setPricing(data);
        setPricingLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [isOpen, summary?.roomId, summary?.dateFrom, summary?.dateTo]);

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

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSubmitting(false);
      setAccepted(false);
    }
  }, [isOpen]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAccepted(false);
    setError(null);
  };

  const priceSegments: PriceSegment[] = useMemo(() => {
    if (!summary) return [];

    if (pricing) {
      const nightly = buildNightlyPrices(summary.dateFrom, summary.dateTo, pricing);
      if (nightly.length > 0) return groupPriceSegments(nightly);
    }

    const fallbackPricePerNight =
      summary.nights > 0 ? Math.round((summary.roomTotal / summary.nights) * 100) / 100 : summary.pricePerNight;

    return [
      {
        from: summary.dateFrom,
        to: summary.dateTo,
        nights: summary.nights,
        pricePerNight: fallbackPricePerNight,
        subtotal: summary.roomTotal,
      },
    ];
  }, [summary, pricing]);

  const liveRoomTotal = useMemo(
    () => priceSegments.reduce((sum, seg) => sum + seg.subtotal, 0),
    [priceSegments]
  );

  // −10 % рахуємо від актуальної ціни за ночі (liveRoomTotal), а не від RoomPage
  const liveRateDiscount = useMemo(
    () => (summary?.rateType === "nonrefundable" ? round2(liveRoomTotal * NR_DISCOUNT_RATE) : 0),
    [summary?.rateType, liveRoomTotal]
  );

  const liveGrandTotal = useMemo(() => {
    if (!summary) return 0;
    const discount = summary.discountAmount ?? 0;
    // Доплата за домашню тварину (summary.petFee, якщо прийшла з RoomPage) —
    // а якщо його нема, рахуємо напряму з guests.hasDog, щоб +€20 завжди
    // потрапляло в підсумок, незалежно від того, звідки відкрита модалка.
    const petFee = summary.petFee ?? (summary.guests.hasDog ? PET_FEE : 0);
    return round2(liveRoomTotal + summary.kurtaxTotal + petFee - discount - liveRateDiscount);
  }, [summary, liveRoomTotal, liveRateDiscount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary) return;

    if (!firstName || !lastName || !email || !phone) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    if (!accepted) {
      setError("Bitte akzeptieren Sie die Buchungs- & Stornobedingungen und die Hausordnung.");
      return;
    }

    setSubmitting(true);
    setError(null);
    const effectivePricePerNight =
      summary.nights > 0 ? Math.round((liveRoomTotal / summary.nights) * 100) / 100 : 0;

    const payload: NewBooking = {
      roomId: summary.roomId,
      roomName: summary.roomName,
      firstName,
      lastName,
      email,
      phone,
      adults: summary.guests.adults,
      children: summary.guests.children,
      childrenAges: summary.guests.childrenAges,
      // Booking/NewBooking зберігають це поле як `hasDog`, а не `pets` —
      // раніше тут був невірний ключ `pets`, через що значення губилось і
      // доплата за тварину не долітала до бекенду.
      hasDog: summary.guests.hasDog,
      dateFrom: summary.dateFrom,
      dateTo: summary.dateTo,
      nights: summary.nights,
      pricePerNight: effectivePricePerNight,
      roomTotal: liveRoomTotal,
      kurtaxTotal: summary.kurtaxTotal,
      discountTitle: summary.discountTitle,
      discountAmount: summary.discountAmount,
      rateType: summary.rateType ?? "flexible",
      rateDiscount: liveRateDiscount > 0 ? liveRateDiscount : undefined,
      wishes: summary.wishes,
      grandTotal: liveGrandTotal,
    };

    try {
      await createBooking(payload);
      resetForm();
      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      setError(errorMessage(err, "Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut."));
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

            <h2 className="modal__title">Buchungsanfrage</h2>

            <div className="modal__summary">
              <div className="modal__summary-row">
                <span>{summary.roomName}</span>
              </div>
              <div className="modal__summary-row">
                <span>{fmtDate(summary.dateFrom)} → {fmtDate(summary.dateTo)}</span>
                <span>{summary.nights} Nacht{summary.nights !== 1 ? "e" : ""}</span>
              </div>

              {pricingLoading && !pricing ? (
                <div className="modal__summary-row">
                  <span>Preise werden geladen…</span>
                </div>
              ) : (
                priceSegments.map((seg, i) => (
                  <div className="modal__summary-row modal__summary-row--segment" key={i}>
                    <span>
                      €{seg.pricePerNight} × {seg.nights} Nacht{seg.nights !== 1 ? "e" : ""}
                      {priceSegments.length > 1 && (
                        <span className="modal__summary-dates">
                          {" "}({fmtDate(seg.from)} – {fmtDate(seg.to)})
                        </span>
                      )}
                    </span>
                    <span>€{seg.subtotal}</span>
                  </div>
                ))
              )}

              <div className="modal__summary-row">
                <span>Tarif</span>
                <span>{RATE_LABELS[summary.rateType ?? "flexible"]}</span>
              </div>
              <div className="modal__summary-row">
                <span>Kurtaxe</span>
                <span>€{summary.kurtaxTotal}</span>
              </div>
              {summary.guests.hasDog && (
                <div className="modal__summary-row">
                  <span>🐕 Haustier</span>
                  <span>€{summary.petFee ?? PET_FEE}</span>
                </div>
              )}
              {liveRateDiscount > 0 && (
                <div className="modal__summary-row">
                  <span>Non-Refundable-Tarif · –10 %</span>
                  <span>–€{eur(liveRateDiscount)}</span>
                </div>
              )}
              {summary.discountTitle && (
                <div className="modal__summary-row">
                  <span>
                    Rabatt: {summary.discountTitle}
                    {summary.discountManualReview ? " (wird geprüft)" : ""}
                  </span>
                  <span>{summary.discountAmount ? `–€${summary.discountAmount}` : "–"}</span>
                </div>
              )}
              {summary.wishes && (
                <div className="modal__summary-row modal__summary-row--wishes">
                  <span>Besondere Wünsche</span>
                  <span>{summary.wishes}</span>
                </div>
              )}
              <div className="modal__summary-total">
                <span>Gesamt</span>
                <strong>€{eur(liveGrandTotal)}</strong>
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

              <label className="modal__consent">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  required
                />
                <span>
                  Ich habe die{" "}
                  <Link to="/stornobedingungen" target="_blank" rel="noopener noreferrer">
                    Buchungs- &amp; Stornobedingungen
                  </Link>{" "}
                  sowie die{" "}
                  <Link to="/hausordnung" target="_blank" rel="noopener noreferrer">
                    Hausordnung
                  </Link>{" "}
                  gelesen und akzeptiere diese.
                </span>
              </label>

              <p className="modal__privacy">
                Ihre persönlichen Daten werden vertraulich behandelt und ausschließlich zur
                Bearbeitung Ihrer Anfrage und Buchung verwendet. Weitere Informationen finden
                Sie in unserer{" "}
                <Link to="/datenschutz" target="_blank" rel="noopener noreferrer">
                  Datenschutzerklärung
                </Link>
                .
              </p>

              {error && <p className="modal__error">{error}</p>}

              <button className="modal__submit" type="submit" disabled={submitting}>
                {submitting ? "Wird gesendet…" : "Buchungsanfrage senden"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBooking;
