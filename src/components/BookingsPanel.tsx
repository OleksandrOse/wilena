import { useEffect, useMemo, useState } from "react";
import {
  Booking,
  getBookings,
  updateBooking,
  deleteBooking
} from "../services/bookingService";
import { fmtDate } from "../utils/pricing";
import { APARTMENTS } from "../data/apartments";

const PET_FEE = 20;

const BookingsPanel: React.FC = () => {
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
    setError(null);
    setSuccess(null);
  };

  const cancelEdit = () => setEditingId(null);

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
            <div className="admin-list__row" key={b.id}>
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
                      {fmtDate(b.dateFrom)} – {fmtDate(b.dateTo)} ({b.nights} Nacht{b.nights !== 1 ? "e" : ""}) ·{" "}
                      {b.adults} Erw.{b.children > 0 ? `, ${b.children} Kind${b.children !== 1 ? "er" : ""}` : ""}
                      {b.hasDog ? ` · 🐕 Hund (+€${PET_FEE})` : ""}
                    </p>
                    <p className="admin-list__review-text">
                      Kurtaxe: €{b.kurtaxTotal}
                      {b.nights > 0 ? ` (€${kurtaxPerNight.toFixed(2)}/Nacht)` : ""}
                    </p>
                    <p className="admin-list__review-text">
                      {b.email} {b.phone ? `· ${b.phone}` : ""}
                    </p>
                  </div>
                  <div className="admin-list__actions">
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
