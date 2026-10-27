import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/ModalBooking.scss";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalThankYou: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

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
        <button className="modal__close" onClick={() => setIsOpen(false)} aria-label={t("common.close")}>
          ×
        </button>

        <h2 className="modal__title">{t("thankYou.title")}</h2>

        <p className="modal__thanks-text">{t("thankYou.text1")}</p>
        <p className="modal__thanks-text">{t("thankYou.text2")}</p>
        <p className="modal__thanks-sign">Wilena Apartments</p>

        <button className="modal__submit" type="button" onClick={() => setIsOpen(false)}>
          {t("common.close")}
        </button>
      </div>
    </div>
  );
};

export default ModalThankYou;
