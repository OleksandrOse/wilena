import React from "react";
import { Link } from "react-router-dom";
import "../styles/NonRefundableOffer.scss";

const APARTMENT_LINKS = [
  { label: "Apartment 166", to: "/apartment1?rate=nonrefundable" },
  { label: "Apartment 172", to: "/apartment2?rate=nonrefundable" },
];

const BENEFITS = [
  "10 % Preisvorteil",
  "Zahlung bei Buchung",
  "Nicht stornierbar und nicht erstattungsfähig",
];

const NonRefundableOffer: React.FC = () => (
  <section className="nr-offer" aria-labelledby="nr-offer-title">
    <p className="nr-offer__eyebrow">FLEXIBEL ODER GÜNSTIGER</p>
    <h3 className="nr-offer__title" id="nr-offer-title">
      Nicht stornierbar – <span>10 % sparen</span>
    </h3>
    <p className="nr-offer__text">
      Sie kennen Ihre Reisedaten bereits? Buchen Sie zum günstigeren
      Non-Refundable-Tarif und sparen Sie 10 % auf den regulären Übernachtungspreis.
    </p>

    <ul className="nr-offer__list">
      {BENEFITS.map((b) => (
        <li key={b}>
          <span aria-hidden="true">✓</span> {b}
        </li>
      ))}
    </ul>

    <div className="nr-offer__actions">
      <span className="nr-offer__cta-label">Jetzt buchen</span>
      <div className="nr-offer__buttons">
        {APARTMENT_LINKS.map((a) => (
          <Link key={a.to} to={a.to} className="nr-offer__btn">
            {a.label} →
          </Link>
        ))}
      </div>
    </div>

    <p className="nr-offer__note">
      Dieses Angebot ist nicht mit anderen Rabatten oder Sonderangeboten kombinierbar.
    </p>
  </section>
);

export default NonRefundableOffer;
