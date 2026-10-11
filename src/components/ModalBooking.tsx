import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Guests } from "../types/Guests";
import "../styles/ModalBooking.scss";
import { buildNightlyPrices, fetchRoomPricing, fmtDate, groupPriceSegments, PriceSegment } from "../utils/pricing";
import { ServerRoom } from "../services/serverRoomService";
import { createBooking, NewBooking } from "../services/bookingService";

const PET_FEE = 20;

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
    }
  }, [isOpen]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
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

  const liveGrandTotal = useMemo(() => {
    if (!summary) return 0;
    const discount = summary.discountAmount ?? 0;
    const petFee = summary.petFee ?? (summary.guests.hasDog ? PET_FEE : 0);
    return liveRoomTotal + summary.kurtaxTotal + petFee - discount;
  }, [summary, liveRoomTotal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary) return;

    if (!firstName || !lastName || !email || !phone) {
      setError("Bitte füllen Sie alle Felder aus.");
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
      hasDog: summary.guests.hasDog,
      dateFrom: summary.dateFrom,
      dateTo: summary.dateTo,
      nights: summary.nights,
      pricePerNight: effectivePricePerNight,
      roomTotal: liveRoomTotal,
      kurtaxTotal: summary.kurtaxTotal,
      discountTitle: summary.discountTitle,
      discountAmount: summary.discountAmount,
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

            <h2 className="modal__title">Zimmerreservierung</h2>

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
                <span>Kurtaxe</span>
                <span>€{summary.kurtaxTotal}</span>
              </div>
              {summary.guests.hasDog && (
                <div className="modal__summary-row">
                  <span>🐕 Haustier</span>
                  <span>€{summary.petFee ?? PET_FEE}</span>
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
              <div className="modal__summary-total">
                <span>Gesamt</span>
                <strong>€{liveGrandTotal}</strong>
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
