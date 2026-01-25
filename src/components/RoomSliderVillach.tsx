import { useState } from 'react';
import '../styles/RoomSliderVillach.scss';


interface Room {
  id: number;
  title: string;
  img: string;
}


const rooms: Room[] = [
  { id: 1, title: 'Elegant Apartment', img: '/img/room1.jpg' },
  { id: 2, title: 'Family Apartment', img: '/img/room2.jpg' },
  { id: 3, title: 'Premium Apartment', img: '/img/room3.jpg' },
];


const RoomsSliderVillach: React.FC = () => {
  const [index, setIndex] = useState<number>(0);


  return (
    <section className="rooms-slider">
      <h2 className="rooms-slider__title">Our Apartments</h2>


      <div className="rooms-slider__wrapper">
        <button onClick={() => setIndex((index - 1 + rooms.length) % rooms.length)}>‹</button>


        <div className="rooms-slider__slide">
          <img src={rooms[index].img} />
          <h3>{rooms[index].title}</h3>
        </div>


        <button onClick={() => setIndex((index + 1) % rooms.length)}>›</button>
      </div>


      <div className="rooms-slider__pagination">
        {rooms.map((_, i) => (
          <span key={i} className={i === index ? 'is-active' : ''} onClick={() => setIndex(i)} />
        ))}
      </div>
    </section>
  );
};


export default RoomsSliderVillach;
