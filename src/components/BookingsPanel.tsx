import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Booking,
  getBookings,
  updateBooking,
  deleteBooking,
  confirmBooking,
  confirmPayment,
  declineBooking,
} from "../services/bookingService";
import { fmtDate } from "../utils/pricing";
import { APARTMENTS } from "../data/apartments";

const PET_FEE = 20;

const RATE_LABELS: Record<string, string> = {
  flexible: "Flexible Rate",
  nonrefundable: "Non-Refundable Rate",
};

const STATUS_LABELS: Record<string, string> = {
  requested: "Anfrage",
  awaiting_payment: "Wartet auf Zahlung",
  paid: "Bezahlt",
  declined: "Abgelehnt",
};

const plusDaysISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const BookingsPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [apartmentId, setApartmentId] = useState<string>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDateFrom, setEditDateFrom] = useState("");
  const [editDateTo, setEditDateTo] = useState("");
  const [editAdults, setEditAdults] = useState("");
  const [editChildren, setEditChildren] = useState("");
  const [editHasDog, setEditHasDog] = useState(false);
  const [editGrandTotal, setEditGrandTotal] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editWishes, setEditWishes] = useState("");

  // підтвердження запиту (Buchung bestätigen)
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [confirmTotal, setConfirmTotal] = useState("");
  const [confirmDeadline, setConfirmDeadline] = useState("");
  const [confirmSalutation, setConfirmSalutation] = useState<"" | "frau" | "herr">("");
  const [confirmNote, setConfirmNote] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  // відмова / альтернативна пропозиція
  const [decliningId, setDecliningId] = useState<string | null>(null);
  const [declineSalutation, setDeclineSalutation] = useState<"" | "frau" | "herr">("");
  const [declineAlternative, setDeclineAlternative] = useState("");
  const [declineNote, setDeclineNote] = useState("");

  function errorMessage(e: unknown, fallback: string): string {
    return e instanceof Error ? e.message : fallback;
  }

  const loadBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookings(apartmentId === "all" ? undefined : apartmentId);
      setBookings(data);
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Laden."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
    setEditingId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartmentId]);

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => a.dateFrom.localeCompare(b.dateFrom)),
    [bookings]
  );

  const startEdit = (b: Booking) => {
    setEditingId(b.id);
    setEditDateFrom(b.dateFrom);
    setEditDateTo(b.dateTo);
    setEditAdults(String(b.adults));
    setEditChildren(String(b.children));
    setEditHasDog(b.hasDog);
    setEditGrandTotal(String(b.grandTotal));
    setEditFirstName(b.firstName);
    setEditLastName(b.lastName);
    setEditEmail(b.email);
    setEditPhone(b.phone ?? "");
    setEditWishes(b.wishes ?? "");
    setError(null);
    setSuccess(null);
  };

  const cancelEdit = () => setEditingId(null);

  const startDecline = (b: Booking) => {
    setDecliningId(b.id);
    setConfirmingId(null);
    setEditingId(null);
    setDeclineSalutation(b.salutation ?? "");
    setDeclineAlternative("");
    setDeclineNote("");
    setError(null);
    setSuccess(null);
  };

  const sendDecline = async (b: Booking) => {
    const text = declineAlternative.trim()
      ? `Absage mit Alternativvorschlag an ${b.email} senden?`
      : `Absage (keine Verfügbarkeit) an ${b.email} senden?`;
    if (!window.confirm(text)) return;
    setBusyId(b.id);
    setError(null);
    setSuccess(null);
    try {
      await declineBooking(b.id, {
        salutation: declineSalutation || undefined,
        alternative: declineAlternative.trim() || undefined,
        note: declineNote.trim() || undefined,
      });
      setDecliningId(null);
      setSuccess(`Absage an ${b.email} gesendet. Die Termine sind wieder frei.`);
      await loadBookings();
    } catch (e) {
      setError(errorMessage(e, "Die Absage konnte nicht gesendet werden."));
    } finally {
      setBusyId(null);
    }
  };

  const startConfirm = (b: Booking) => {
    setConfirmingId(b.id);
    setDecliningId(null);
    setEditingId(null);
    setConfirmTotal(String(b.grandTotal));
    setConfirmDeadline(b.paymentDeadline ?? plusDaysISO(7));
    setConfirmSalutation(b.salutation ?? "");
    setConfirmNote("");
    setError(null);
    setSuccess(null);
  };

  // Посилання з листа: /#/admin?confirm=<id> одразу відкриває панель підтвердження
  useEffect(() => {
    const id = searchParams.get("confirm");
    if (!id || bookings.length === 0) return;
    const target = bookings.find((x) => x.id === id);
    if (target) {
      startConfirm(target);
      setTimeout(() => document.getElementById(`booking-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
    searchParams.delete("confirm");
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const sendConfirmation = async (b: Booking) => {
    if (!confirmDeadline) {
      setError("Bitte eine Zahlungsfrist angeben.");
      return;
    }
    if (!(Number(confirmTotal) > 0)) {
      setError("Bitte einen gültigen Gesamtpreis angeben.");
      return;
    }
    setBusyId(b.id);
    setError(null);
    setSuccess(null);
    try {
      await confirmBooking(b.id, {
        grandTotal: Number(confirmTotal),
        paymentDeadline: confirmDeadline,
        salutation: confirmSalutation || undefined,
        note: confirmNote.trim() || undefined,
      });
      setConfirmingId(null);
      setSuccess(`Buchungsbestätigung an ${b.email} gesendet.`);
      await loadBookings();
    } catch (e) {
      setError(errorMessage(e, "Die Bestätigung konnte nicht gesendet werden."));
    } finally {
      setBusyId(null);
    }
  };

  const handlePaymentConfirmed = async (b: Booking) => {
    if (!window.confirm(`Zahlungseingang von €${b.grandTotal} bestätigen und E-Mail an ${b.email} senden?`)) return;
    setBusyId(b.id);
    setError(null);
    setSuccess(null);
    try {
      await confirmPayment(b.id);
      setSuccess(`Zahlungsbestätigung an ${b.email} gesendet.`);
      await loadBookings();
    } catch (e) {
      setError(errorMessage(e, "Die Zahlungsbestätigung konnte nicht gesendet werden."));
    } finally {
      setBusyId(null);
    }
  };

  const saveEdit = async (id: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updateBooking(id, {
        dateFrom: editDateFrom,
        dateTo: editDateTo,
        adults: Number(editAdults),
        children: Number(editChildren),
        hasDog: editHasDog,
        grandTotal: Number(editGrandTotal),
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        phone: editPhone || undefined,
        // пустий рядок = очистити побажання
        wishes: editWishes,
      });
      setEditingId(null);
      setSuccess("Buchung wurde aktualisiert.");
      await loadBookings();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Aktualisieren."));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      setSuccess("Buchung wurde gelöscht.");
      await loadBookings();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Löschen."));
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__field">
        <label className="admin-panel__label">Apartment</label>
        <select
          className="admin-panel__input"
          value={apartmentId}
          onChange={(e) => setApartmentId(e.target.value)}
        >
          <option value="all">Alle Apartments</option>
          {APARTMENTS.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>

      {error && <p className="admin-panel__error">{error}</p>}
      {success && <p className="admin-panel__success">{success}</p>}

      <h3 className="admin-panel__subtitle">Alle Buchungen</h3>

      {loading ? (
        <p className="admin-panel__note">Lädt…</p>
      ) : sortedBookings.length === 0 ? (
        <p className="admin-panel__note">Es gibt noch keine Buchungen.</p>
      ) : (
        <div className="admin-list">
          {sortedBookings.map((b) => {
            const kurtaxPerNight = b.nights > 0 ? b.kurtaxTotal / b.nights : 0;

            return (
            <div className="admin-list__row" key={b.id} id={`booking-${b.id}`}>
              {editingId === b.id ? (
                <div className="admin-list__edit">
                  <div className="admin-form__row">
                    <input
                      className="admin-panel__input"
                      type="date"
                      value={editDateFrom}
                      onChange={(e) => setEditDateFrom(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="date"
                      value={editDateTo}
                      onChange={(e) => setEditDateTo(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <input
                      className="admin-panel__input"
                      type="number"
                      min={1}
                      placeholder="Erwachsene"
                      value={editAdults}
                      onChange={(e) => setEditAdults(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="number"
                      min={0}
                      placeholder="Kinder"
                      value={editChildren}
                      onChange={(e) => setEditChildren(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <label className="admin-panel__label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={editHasDog}
                        onChange={(e) => setEditHasDog(e.target.checked)}
                      />
                      Mit Haustieren (+€{PET_FEE})
                    </label>
                    <input
                      className="admin-panel__input"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="Gesamtbetrag (€)"
                      value={editGrandTotal}
                      onChange={(e) => setEditGrandTotal(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <input
                      className="admin-panel__input"
                      type="text"
                      placeholder="Vorname"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="text"
                      placeholder="Nachname"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <input
                      className="admin-panel__input"
                      type="email"
                      placeholder="E-Mail"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="tel"
                      placeholder="Telefon"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <textarea
                      className="admin-panel__input"
                      rows={3}
                      maxLength={1000}
                      placeholder="Besondere Wünsche"
                      value={editWishes}
                      onChange={(e) => setEditWishes(e.target.value)}
                    />
                  </div>
                  <div className="admin-list__actions">
                    <button className="admin-list__save" onClick={() => saveEdit(b.id)}>
                      Speichern
                    </button>
                    <button className="admin-list__cancel" onClick={cancelEdit}>
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="admin-list__info admin-list__info--review">
                    <div className="admin-list__review-head">
                      <span className="admin-list__review-name">
                        {b.firstName} {b.lastName} · {b.roomName ?? b.roomId}
                      </span>
                      <span className="admin-list__price">€{b.grandTotal}</span>
                    </div>
                    <p className="admin-list__review-text">
                      <span className={`admin-status admin-status--${b.status ?? "requested"}`}>
                        {STATUS_LABELS[b.status ?? "requested"]}
                      </span>
                      {b.paymentDeadline && b.status !== "paid"
                        ? ` · Zahlungsfrist: ${fmtDate(b.paymentDeadline)}`
                        : ""}
                    </p>
                    <p className="admin-list__review-text">
                      {fmtDate(b.dateFrom)} – {fmtDate(b.dateTo)} ({b.nights} Nacht{b.nights !== 1 ? "e" : ""}) ·{" "}
                      {b.adults} Erw.{b.children > 0 ? `, ${b.children} Kind${b.children !== 1 ? "er" : ""}` : ""}
                      {b.hasDog ? ` · 🐕 Hund (+€${PET_FEE})` : ""}
                    </p>
                    <p className="admin-list__review-text">
                      Kurtaxe: €{b.kurtaxTotal}
                      {b.nights > 0 ? ` (€${kurtaxPerNight.toFixed(2)}/Nacht)` : ""}
                    </p>
                    <p className="admin-list__review-text">
                      Tarif: {RATE_LABELS[b.rateType ?? "flexible"] ?? RATE_LABELS.flexible}
                      {b.rateType === "nonrefundable" && Number(b.rateDiscount) > 0
                        ? ` (–€${Number(b.rateDiscount).toFixed(2)})`
                        : ""}
                    </p>
                    <p className="admin-list__review-text">
                      {b.email} {b.phone ? `· ${b.phone}` : ""}
                    </p>
                    {b.wishes && (
                      <p className="admin-list__wishes">
                        <strong>Besondere Wünsche:</strong> {b.wishes}
                      </p>
                    )}
                  </div>
                  {decliningId === b.id && (
                    <div className="admin-confirm admin-confirm--decline">
                      <p className="admin-confirm__title">
                        Absage an {b.email} senden
                      </p>
                      <label className="admin-confirm__field">
                        Anrede
                        <select
                          className="admin-panel__input"
                          value={declineSalutation}
                          onChange={(e) => setDeclineSalutation(e.target.value as "" | "frau" | "herr")}
                        >
                          <option value="">Guten Tag …</option>
                          <option value="frau">Liebe Frau …</option>
                          <option value="herr">Lieber Herr …</option>
                        </select>
                      </label>
                      <label className="admin-confirm__field">
                        Alternativvorschlag (optional)
                        <textarea
                          className="admin-panel__input"
                          rows={3}
                          maxLength={1000}
                          placeholder="z. B. Apartment 172 ist im selben Zeitraum frei (€ 95 / Nacht) oder wir hätten vom 12.–16.12. noch Platz."
                          value={declineAlternative}
                          onChange={(e) => setDeclineAlternative(e.target.value)}
                        />
                      </label>
                      <textarea
                        className="admin-panel__input"
                        rows={2}
                        maxLength={1000}
                        placeholder="Persönliche Nachricht (optional)"
                        value={declineNote}
                        onChange={(e) => setDeclineNote(e.target.value)}
                      />
                      <p className="admin-confirm__hint">
                        Ohne Alternativvorschlag erhält der Gast eine Absage mit dem Angebot, einen anderen Zeitraum zu finden.
                        Nach dem Senden werden die Termine wieder freigegeben.
                      </p>
                      <div className="admin-list__actions">
                        <button
                          className="admin-list__delete-btn"
                          disabled={busyId === b.id}
                          onClick={() => sendDecline(b)}
                        >
                          {busyId === b.id ? "Wird gesendet…" : "Absage senden"}
                        </button>
                        <button className="admin-list__cancel" onClick={() => setDecliningId(null)}>
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  )}
                  {confirmingId === b.id && (
                    <div className="admin-confirm">
                      <p className="admin-confirm__title">
                        Buchungsbestätigung an {b.email} senden
                      </p>
                      <div className="admin-form__row">
                        <label className="admin-confirm__field">
                          Gesamtpreis (€)
                          <input
                            className="admin-panel__input"
                            type="number"
                            min={0}
                            step="0.01"
                            value={confirmTotal}
                            onChange={(e) => setConfirmTotal(e.target.value)}
                          />
                        </label>
                        <label className="admin-confirm__field">
                          Zahlungsfrist
                          <input
                            className="admin-panel__input"
                            type="date"
                            value={confirmDeadline}
                            onChange={(e) => setConfirmDeadline(e.target.value)}
                          />
                        </label>
                        <label className="admin-confirm__field">
                          Anrede
                          <select
                            className="admin-panel__input"
                            value={confirmSalutation}
                            onChange={(e) => setConfirmSalutation(e.target.value as "" | "frau" | "herr")}
                          >
                            <option value="">Guten Tag …</option>
                            <option value="frau">Liebe Frau …</option>
                            <option value="herr">Lieber Herr …</option>
                          </select>
                        </label>
                      </div>
                      <textarea
                        className="admin-panel__input"
                        rows={2}
                        maxLength={1000}
                        placeholder="Persönliche Nachricht (optional, erscheint im Mailtext)"
                        value={confirmNote}
                        onChange={(e) => setConfirmNote(e.target.value)}
                      />
                      <p className="admin-confirm__hint">
                        Weitere Daten (Termine, Gäste, Kontakt) vorher über „Bearbeiten“ ändern.
                      </p>
                      <div className="admin-list__actions">
                        <button
                          className="admin-list__save"
                          disabled={busyId === b.id}
                          onClick={() => sendConfirmation(b)}
                        >
                          {busyId === b.id ? "Wird gesendet…" : "Bestätigung senden"}
                        </button>
                        <button className="admin-list__cancel" onClick={() => setConfirmingId(null)}>
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="admin-list__actions">
                    {(b.status === "requested" || b.status === "awaiting_payment" || !b.status) && decliningId !== b.id && (
                      <button className="admin-list__edit-btn" onClick={() => startDecline(b)}>
                        Ablehnen / Alternative
                      </button>
                    )}
                    {(b.status ?? "requested") === "requested" && confirmingId !== b.id && (
                      <button className="admin-list__save" onClick={() => startConfirm(b)}>
                        Buchung bestätigen
                      </button>
                    )}
                    {b.status === "awaiting_payment" && (
                      <>
                        <button
                          className="admin-list__save"
                          disabled={busyId === b.id}
                          onClick={() => handlePaymentConfirmed(b)}
                        >
                          Zahlung bestätigen
                        </button>
                        {confirmingId !== b.id && (
                          <button className="admin-list__edit-btn" onClick={() => startConfirm(b)}>
                            Bestätigung erneut senden
                          </button>
                        )}
                      </>
                    )}
                    <button className="admin-list__edit-btn" onClick={() => startEdit(b)}>
                      Bearbeiten
                    </button>
                    <button className="admin-list__delete-btn" onClick={() => handleDelete(b.id)}>
                      Löschen
                    </button>
                  </div>
                </>
              )}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingsPanel;
