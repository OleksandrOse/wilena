import '../styles/RoomsVillach.scss';

const Rooms: React.FC = () => (
  <section className="rooms">
    <h2 className="rooms__title">Our rooms</h2>

    <div className="rooms__grid">
      <article className="rooms__card">Elegant Apartment</article>
      <article className="rooms__card">Family Apartment</article>
    </div>
  </section>
);

export default Rooms;
