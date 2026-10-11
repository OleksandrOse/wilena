import { useEffect, useState } from "react";
import { Testimonial } from "../types/Testimonial";
import { getTestimonials, updateTestimonial, deleteTestimonial } from "../services/testimonialService";
import { errorMessage } from "../utils/errorMessage";

const TestimonialsPanel: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSurname, setEditSurname] = useState("");
  const [editStars, setEditStars] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const loadTestimonials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Laden."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id ?? null);
    setEditName(t.name);
    setEditSurname(t.surname);
    setEditStars(String(t.stars));
    setEditDescription(t.description);
    setError(null);
    setSuccess(null);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updateTestimonial(id, {
        name: editName,
        surname: editSurname,
        stars: Number(editStars),
        description: editDescription,
      });
      setEditingId(null);
      setSuccess("Bewertung wurde aktualisiert.");
      await loadTestimonials();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Aktualisieren."));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      setSuccess("Bewertung wurde gelöscht.");
      await loadTestimonials();
    } catch (e) {
      setError(errorMessage(e, "Fehler beim Löschen."));
    }
  };

  return (
    <div className="admin-panel">
      {error && <p className="admin-panel__error">{error}</p>}
      {success && <p className="admin-panel__success">{success}</p>}

      <h3 className="admin-panel__subtitle">Alle Bewertungen</h3>

      {loading ? (
        <p className="admin-panel__note">Lädt…</p>
      ) : testimonials.length === 0 ? (
        <p className="admin-panel__note">Es gibt noch keine Bewertungen.</p>
      ) : (
        <div className="admin-list">
          {testimonials.map((t, i) => (
            <div className="admin-list__row" key={t.id ?? i}>
              {editingId === t.id ? (
                <div className="admin-list__edit">
                  <div className="admin-form__row">
                    <input
                      className="admin-panel__input"
                      type="text"
                      placeholder="Vorname"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                      className="admin-panel__input"
                      type="text"
                      placeholder="Nachname"
                      value={editSurname}
                      onChange={(e) => setEditSurname(e.target.value)}
                    />
                  </div>
                  <div className="admin-form__row">
                    <select
                      className="admin-panel__input"
                      value={editStars}
                      onChange={(e) => setEditStars(e.target.value)}
                    >
                      {["1", "2", "3", "4", "5"].map((s) => (
                        <option key={s} value={s}>{s} ★</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    className="admin-panel__textarea"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                  />
                  <div className="admin-list__actions">
                    <button className="admin-list__save" onClick={() => t.id && saveEdit(t.id)}>
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
                        {t.name} {t.surname}
                      </span>
                      <span className="admin-list__review-stars">
                        {"★".repeat(Number(t.stars) || 0)}
                        {"☆".repeat(5 - (Number(t.stars) || 0))}
                      </span>
                    </div>
                    <p className="admin-list__review-text">{t.description}</p>
                  </div>
                  <div className="admin-list__actions">
                    <button className="admin-list__edit-btn" onClick={() => startEdit(t)}>
                      Bearbeiten
                    </button>
                    <button className="admin-list__delete-btn" onClick={() => t.id && handleDelete(t.id)}>
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

export default TestimonialsPanel;
