import { RoomCard } from './RoomCard';
import '../styles/Rooms.scss';

export default function Rooms() {
  return (
    <section className="rooms">
      <h2 className="rooms__title">Rooms & Suites</h2>

      <div className="rooms__list">
        <RoomCard
          title="Luxury Room"
          price="From $200 / Night"
          meta="Max 2 Guests · Queen or 2 Single Beds"
        />

        <RoomCard
          title="Penthouse Suite"
          price="From $500 / Night"
          meta="Max 4 Guests · 2 King Beds"
          highlight
        />
      </div>
    </section>
  );
}
