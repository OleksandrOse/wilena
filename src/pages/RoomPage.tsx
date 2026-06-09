import React, { useMemo, useState } from "react";

// Booking-like Room Viewer with availability calendar + mobile layout
// BEM + SCSS ready
import '../styles/RoomPage.scss';



export type AvailabilityDay = {
  date: string; // ISO
  available: boolean;
  price?: number;
};

export type AvailabilityInput = AvailabilityDay[] | string[];

export type Room = {
  id: string;
  title: string;
  subtitle: string;
  guests: number;
  beds: string;
  size: string;
  amenities: string[];
  images: string[];
  basePrice: number;
  availability: AvailabilityInput;
};

interface Props {
  rooms: Room[];
}

function normalizeAvailability(input: AvailabilityInput): AvailabilityDay[] {
if (!input.length) return [];


if (typeof input[0] === "string") {
// convert string[] → AvailabilityDay[]
return (input as string[]).map((d) => ({
date: d,
available: true,
}));
}


return input as AvailabilityDay[];
}

function buildMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  const startDay = (first.getDay() + 6) % 7; // monday first
  const days = last.getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));

  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return rows;
}

export const RoomPage: React.FC<Props> = ({ rooms }) => {
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId)!;

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);

  const matrix = useMemo(
    () => buildMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const normalizedAvailability = useMemo(
  () => normalizeAvailability(activeRoom.availability),
  [activeRoom]
);

  const availabilityMap = useMemo(() => {
const map = new Map<string, AvailabilityDay>();
normalizedAvailability.forEach((d) => map.set(d.date, d));
return map;
}, [normalizedAvailability]);

  const nextImg = () =>
    setImageIndex((i) => (i + 1) % activeRoom.images.length);
  const prevImg = () =>
    setImageIndex((i) =>
      i === 0 ? activeRoom.images.length - 1 : i - 1
    );

  return (
    <div className="booking-room">
      {/* LEFT — gallery */}
      <div className="booking-room__gallery">
        <div className="booking-room__main-image-wrap">
          <img
            src={activeRoom.images[imageIndex]}
            className="booking-room__main-image"
            alt="room"
          />

          <button
            className="booking-room__img-nav booking-room__img-nav--prev"
            onClick={prevImg}
          >
            ‹
          </button>
          <button
            className="booking-room__img-nav booking-room__img-nav--next"
            onClick={nextImg}
          >
            ›
          </button>
        </div>

        <div className="booking-room__thumb-row">
          {activeRoom.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setImageIndex(i)}
              className={`booking-room__thumb ${
                i === imageIndex ? "booking-room__thumb--active" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — info like Booking */}
      <div className="booking-room__panel">
        <div className="booking-room__header">
          <h2 className="booking-room__title">{activeRoom.title}</h2>
          <div className="booking-room__subtitle">
            {activeRoom.subtitle}
          </div>
        </div>

        <div className="booking-room__badges">
          <span className="booking-room__badge">👥 {activeRoom.guests}</span>
          <span className="booking-room__badge">🛏 {activeRoom.beds}</span>
          <span className="booking-room__badge">📐 {activeRoom.size}</span>
        </div>

        <ul className="booking-room__amenities">
          {activeRoom.amenities.map((a) => (
            <li key={a} className="booking-room__amenity">
              ✓ {a}
            </li>
          ))}
        </ul>

        {/* availability calendar */}
        <div className="booking-room__calendar">
          <div className="booking-room__cal-header">
            <button onClick={() => setMonthOffset((m) => m - 1)}>
              ←
            </button>
            <div>
              {viewDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button onClick={() => setMonthOffset((m) => m + 1)}>
              →
            </button>
          </div>

          <div className="booking-room__cal-grid">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d} className="booking-room__cal-dayname">
                {d}
              </div>
            ))}

            {matrix.flat().map((date, i) => {
              if (!date)
                return (
                  <div key={i} className="booking-room__cal-cell booking-room__cal-cell--empty" />
                );

              const iso = date.toISOString().slice(0, 10);
              const day = availabilityMap.get(iso);
              const available = day?.available;

              return (
                <button
                  key={iso}
                  disabled={!available}
                  onClick={() => setSelectedDate(iso)}
                  className={`booking-room__cal-cell ${
                    available
                      ? "booking-room__cal-cell--available"
                      : "booking-room__cal-cell--blocked"
                  } ${
                    selectedDate === iso
                      ? "booking-room__cal-cell--selected"
                      : ""
                  }`}
                >
                  <span>{date.getDate()}</span>
                  {day?.price && (
                    <small>€{day.price}</small>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="booking-room__footer">
          <div className="booking-room__price">
            From €{activeRoom.basePrice}
          </div>
          <button className="booking-room__reserve">
            Reserve
          </button>
        </div>

        {/* room switcher like booking table */}
        <div className="booking-room__room-switch">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setActiveRoomId(r.id);
                setImageIndex(0);
              }}
              className={`booking-room__room-btn ${
                r.id === activeRoomId
                  ? "booking-room__room-btn--active"
                  : ""
              }`}
            >
              {r.title} — €{r.basePrice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
