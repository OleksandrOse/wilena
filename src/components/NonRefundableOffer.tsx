import React from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import "../styles/NonRefundableOffer.scss";

const APARTMENT_LINKS = [
  { label: "Apartment 166", to: "/apartment-166?rate=nonrefundable" },
  { label: "Apartment 172", to: "/apartment-172?rate=nonrefundable" },
];

const BENEFIT_KEYS = ["nrOffer.benefit1", "nrOffer.benefit2", "nrOffer.benefit3"] as const;

const NonRefundableOffer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="nr-offer" aria-labelledby="nr-offer-title">
      <p className="nr-offer__eyebrow">{t("nrOffer.eyebrow")}</p>
      <h3 className="nr-offer__title" id="nr-offer-title">
        <Trans i18nKey="nrOffer.title" components={{ hl: <span /> }} />
      </h3>
      <p className="nr-offer__text">{t("nrOffer.text")}</p>

      <ul className="nr-offer__list">
        {BENEFIT_KEYS.map((key) => (
          <li key={key}>
            <span aria-hidden="true">✓</span> {t(key)}
          </li>
        ))}
      </ul>

      <div className="nr-offer__actions">
        <span className="nr-offer__cta-label">{t("common.bookNow")}</span>
        <div className="nr-offer__buttons">
          {APARTMENT_LINKS.map((a) => (
            <Link key={a.to} to={a.to} className="nr-offer__btn">
              {a.label} →
            </Link>
          ))}
        </div>
      </div>

      <p className="nr-offer__note">{t("nrOffer.note")}</p>
    </section>
  );
};

export default NonRefundableOffer;
