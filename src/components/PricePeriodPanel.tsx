import { useEffect, useMemo, useState } from "react";
import { fmtDate } from "../utils/pricing";
import { APARTMENTS } from "../data/apartments";
import {
  PricePeriod,
  getPricePeriods,
  createPricePeriod,
  updatePricePeriod,
  deletePricePeriod,
} from "../services/pricePeriodService";
import { errorMessage } from "../utils/errorMessage";

const PricePeriodsPanel: React.FC = () => {
  const [apartmentId, setApartmentId] = useState("1");
  const [periods, setPeriods] = useState<PricePeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDateFrom, setEditDateFrom] = useState("");
  const [editDateTo, setEditDateTo] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editLabel, setEditLabel] = useState("");

  const loadPeriods = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPricePeriods(apartmentId);
      setPeriods(data);
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Laden."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeriods();
    setEditingId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartmentId]);

  const sortedPeriods = useMemo(
    () => [...periods].sort((a, b) => a.dateFrom.localeCompare(b.dateFrom)),
    [periods]
  );

  const resetForm = () => {
    setDateFrom("");
    setDateTo("");
    setPricePerNight("");
    setLabel("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!dateFrom || !dateTo || !pricePerNight) {
      setError("Bitte Zeitraum und Preis ausfüllen.");
      return;
    }

    setSaving(true);
    try {
      await createPricePeriod({
        roomId: apartmentId,
        dateFrom,
        dateTo,
        pricePerNight: Number(pricePerNight),
        label: label || undefined,
      });
      resetForm();
      setSuccess("Zeitraum wurde gespeichert.");
      await loadPeriods();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Speichern."));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (p: PricePeriod) => {
    setEditingId(p.id);
    setEditDateFrom(p.dateFrom);
    setEditDateTo(p.dateTo);
    setEditPrice(String(p.pricePerNight));
    setEditLabel(p.label ?? "");
    setError(null);
    setSuccess(null);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updatePricePeriod(id, {
        dateFrom: editDateFrom,
        dateTo: editDateTo,
        pricePerNight: Number(editPrice),
        label: editLabel || undefined,
      });
      setEditingId(null);
      setSuccess("Zeitraum wurde aktualisiert.");
      await loadPeriods();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Aktualisieren."));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePricePeriod(id);
      setSuccess("Zeitraum wurde gelöscht.");
      await loadPeriods();
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
          {APARTMENTS.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>

      {/* Форма нового періоду */}
      <form className="admin-form" onSubmit={handleCreate}>
        <h3 className="admin-form__title">Neuen Zeitraum hinzufügen</h3>

        <div className="admin-form__row">
          <div className="admin-panel__field">
            <label className="admin-panel__label">Von</label>
            <input
              className="admin-panel__input"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
            />
          </div>
          <div className="admin-panel__field">
            <label className="admin-panel__label">Bis</label>
            <input
              className="admin-panel__input"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="admin-form__row">
          <div className="admin-panel__field">
            <label className="admin-panel__label">Preis / Nacht (€)</label>
            <input
              className="admin-panel__input"
              type="number"
              min={0}
              step="0.01"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              required
            />
          </div>
          <div className="admin-panel__field">
            <label className="admin-panel__label">Bezeichnung (optional)</label>
            <input
              className="admin-panel__input"
              type="text"
              placeholder="z. B. Sommer 2026"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
        </div>

        <button className="admin-form__submit" type="submit" disabled={saving}>
          {saving ? "Speichert…" : "Zeitraum speichern"}
        </button>
      </form>

      {error && <p className="admin-panel__error">{error}</p>}
      {success && <p className="admin-panel__success">{success}</p>}

      <h3 className="admin-panel__subtitle">Bestehende Zeiträume</h3>

      {loading ? (
        <p className="admin-panel__note">Lädt…</p>
      ) : sortedPeriods.length === 0 ? (
        <p className="admin-panel__note">Für dieses Apartment sind noch keine Zeiträume angelegt.</p>
      ) : (
        <div className="admin-list">
          {sortedPeriods.map((p) => (
            <div className="admin-list__row" key={p.id}>
              {editingId === p.id ? (
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
                      min={0}
                      step="0.01"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="text"
                      placeholder="Bezeichnung"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                    />
                  </div>
                  <div className="admin-list__actions">
                    <button className="admin-list__save" onClick={() => saveEdit(p.id)}>
                      Speichern
                    </button>
                    <button className="admin-list__cancel" onClick={cancelEdit}>
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="admin-list__info">
                    <span className="admin-list__dates">
                      {fmtDate(p.dateFrom)} – {fmtDate(p.dateTo)}
                    </span>
                    <span className="admin-list__price">€{p.pricePerNight} / Nacht</span>
                    {p.label && <span className="admin-list__badge">{p.label}</span>}
                  </div>
                  <div className="admin-list__actions">
                    <button className="admin-list__edit-btn" onClick={() => startEdit(p)}>
                      Bearbeiten
                    </button>
                    <button className="admin-list__delete-btn" onClick={() => handleDelete(p.id)}>
                      Löschen
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PricePeriodsPanel;
