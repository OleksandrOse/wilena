import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/ModalBooking.scss";
import { NewTestimonial } from "../types/Testimonial";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (newTestimonial: NewTestimonial) => Promise<void>;
};

const ModalTestimonial: React.FC<Props> = ({ isOpen, setIsOpen, onSubmit }) => {
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newStars, setNewStars] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newDescription || !newName || !newSurname) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        name: newName,
        surname: newSurname,
        stars: newStars,
        description: newDescription,
      });

      setNewDescription("");
      setNewName("");
      setNewSurname("");
      setNewStars(5);
      setIsOpen(false);
    } catch {
      setError("Не вдалося зберегти відгук. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setIsOpen(false)} />
          <div className="modal__content">
            <button className="modal__close" onClick={() => setIsOpen(false)}>×</button>
            <h3 className="modal__title">Bewertung hinzufügen</h3>
            <form className="modal__form" onSubmit={addTestimonial}>
              <textarea
                className="modal__textarea"
                placeholder="Ihre Bewertung"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <input
                className="modal__input"
                type="text"
                placeholder="Ihr Vorname"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="modal__input"
                type="text"
                placeholder="Ihr Nachname"
                value={newSurname}
                onChange={(e) => setNewSurname(e.target.value)}
              />
              <select
                className="modal__input"
                value={newStars}
                onChange={(e) => setNewStars(Number(e.target.value))}
              >
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </select>
              {error && <p className="modal__error">{error}</p>}
              <button className="modal__submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet…" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTestimonial;
