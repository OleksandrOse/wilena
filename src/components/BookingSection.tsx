import React from "react";
import "../styles/BookingSection.scss";

const BookingSection: React.FC = () => {
  return (
    <section className="booking-section">
      <h2>Jetzt Buchen</h2>
      <p>Garantieren Sie sich Ihren Aufenthalt im Freisinger Hof zu den besten Preisen.</p>
      <button className="booking-button">Zur Buchung</button>
    </section>
  );
};

export default BookingSection;
