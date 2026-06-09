import React, { useState } from "react";
import "./BookingForm.scss";

type GuestCounts = {
  adults: number;
  children: number;
};

export const BookingForm: React.FC = () => {
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [guests, setGuests] = useState<GuestCounts>({ adults: 1, children: 0 });
  const [rooms, setRooms] = useState<number>(1);

  const handleGuestChange = (field: keyof GuestCounts, delta: number) => {
    setGuests((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: логіка відправки/перевірки доступності
    console.log({ arrivalDate, departureDate, guests, rooms });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2 className="booking-form__title">Онлайн-бронювання</h2>

      <label className="booking-form__label">
        Прибуття
        <input
          type="date"
          className="booking-form__input"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          required
        />
      </label>

      <label className="booking-form__label">
        Відбуття
        <input
          type="date"
          className="booking-form__input"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
      </label>

      <div className="booking-form__group">
        <span className="booking-form__group-title">Гості</span>
        <div className="booking-form__guests">
          <div className="booking-form__guest-counter">
            <span>Дорослі</span>
            <button
              type="button"
              className="booking-form__btn"
              onClick={() => handleGuestChange("adults", -1)}
            >
              –
            </button>
            <span>{guests.adults}</span>
            <button
              type="button"
              className="booking-form__btn"
              onClick={() => handleGuestChange("adults", 1)}
            >
              +
            </button>
          </div>

          <div className="booking-form__guest-counter">
            <span>Діти</span>
            <button
              type="button"
              className="booking-form__btn"
              onClick={() => handleGuestChange("children", -1)}
            >
              –
            </button>
            <span>{guests.children}</span>
            <button
              type="button"
              className="booking-form__btn"
              onClick={() => handleGuestChange("children", 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <label className="booking-form__label">
        Кількість кімнат
        <input
          type="number"
          className="booking-form__input"
          value={rooms}
          min={1}
          onChange={(e) => setRooms(Number(e.target.value))}
          required
        />
      </label>

      <button type="submit" className="booking-form__submit">
        Перевірити доступність
      </button>
    </form>
  );
};