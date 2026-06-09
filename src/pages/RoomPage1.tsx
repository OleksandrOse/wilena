import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { Room } from '../types/Room';
import { DayPicker } from 'react-day-picker';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-day-picker/dist/style.css';

interface RoomPageProps {
  rooms: Room[];
}

export default function RoomPage1({ rooms }: RoomPageProps) {
  // Hooks завжди на верхньому рівні
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const room = rooms.find(r => r.id === roomId);

  if (!roomId || !room) return <div>Room not found</div>;

  // Заброньовані дати
  const disabledDays = room.availability
    .filter(a => a.booked)
    .map(a => new Date(a.date));

  return (
    <div className="room-page">
      <h1>{room.title}</h1>
      <p>{room.subtitle}</p>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={16}
        slidesPerView={1}
      >
        {room.images.map((src, i) => (
          <SwiperSlide key={i}>
            <img src={`${process.env.PUBLIC_URL}/Wilena/piran/${src}`} alt={room.title} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ціна */}
      <div className="price-card">
        <h3>Preis pro Nacht</h3>
        <p>€{room.basePrice}</p>
      </div>

      {/* Календар */}
      <div className="availability">
        <h2>Verfügbarkeit prüfen</h2>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={disabledDays}
        />
        <button onClick={() => setShowModal(true)}>Jetzt buchen</button>
      </div>

      {/* Модалка */}
      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Buchung</h2>
            <form className="booking-form">
              <input placeholder="Name" />
              <input placeholder="Email" />
              <input placeholder="Telefon" />
              <textarea placeholder="Nachricht" />
              <button type="submit">Anfrage senden</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
