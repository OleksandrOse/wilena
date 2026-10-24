import { Dispatch, SetStateAction, useEffect } from "react";
import "../styles/ModalBooking.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalThankYou: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={() => setIsOpen(false)}></div>

      <div className="modal__content modal__content--thanks" role="dialog" aria-modal="true">
        <button className="modal__close" onClick={() => setIsOpen(false)} aria-label="Schließen">
          ×
        </button>

        <h2 className="modal__title">Vielen Dank für Ihre Buchungsanfrage!</h2>

        <p className="modal__thanks-text">
          Wir haben Ihre Anfrage erhalten und prüfen die Verfügbarkeit des gewünschten Apartments.
        </p>
        <p className="modal__thanks-text">
          Ihre Buchung ist zu diesem Zeitpunkt noch nicht verbindlich bestätigt. Sie erhalten von
          uns nach Prüfung der Verfügbarkeit eine Buchungsbestätigung mit allen weiteren
          Informationen zur Zahlung.
        </p>
        <p className="modal__thanks-sign">Wilena Apartments</p>

        <button className="modal__submit" type="button" onClick={() => setIsOpen(false)}>
          Schließen
        </button>
      </div>
    </div>
  );
};

export default ModalThankYou;
