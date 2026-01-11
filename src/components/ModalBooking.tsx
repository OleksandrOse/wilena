import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/ModalBooking.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalBooking: React.FC<Props> = ({ isOpen, setIsOpen }) => {
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

            <h2 className="modal__title">Zimmerreservierung</h2>

            <form className="modal__form">
              <input
                className="modal__input"
                type="text"
                placeholder="Vorname"
              />
              <input
                className="modal__input"
                type="text"
                placeholder="Nachname"
              />
              <input
                className="modal__input"
                type="text"
                placeholder="E-mail"
              />
              <input
                className="modal__input"
                type="text"
                placeholder="Telefonnummer"
              />
              <input
                className="modal__input"
                type="date"
              />
              <input
                className="modal__input"
                type="date"
              />

              <button className="modal__submit" type="submit">
                Bestätigen
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBooking;
