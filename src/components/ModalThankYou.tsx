import { Dispatch, SetStateAction, useEffect } from "react";
import "../styles/ModalBooking.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalThankYou: React.FC<Props> = ({ isOpen, setIsOpen }) => {
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

            <div className="modal__thankyou">
              <div className="modal__thankyou-icon">✓</div>
              <p>Danke für Ihre Buchung!</p>
              <p>
                Unser Berater wird sich in Kürze mit Ihnen in Verbindung
                setzen, um die Details zu klären.
              </p>
            </div>

            <button
              className="modal__submit"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalThankYou;
