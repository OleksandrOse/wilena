import { FC, useEffect, useState } from 'react';
import '../styles/RoomSlider.scss';

interface Room {
  title: string;
  description: string;
  image?: string;
}

const rooms: Room[] = [
  {
    title: 'Luxury Room',
    description: 'Elegant comfort for business travelers.',
  },
  {
    title: 'Deluxe Room',
    description: 'More space with stunning city views.',
  },
  {
    title: 'Penthouse Suite',
    description: 'Ultimate luxury with panoramic skyline.',
  },
];

const RoomSlider: FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [activeBanner, setActiveBanner] = useState(0);
  const imagesForBanner = [
    'new/img/banner-phones.png',
    'new/img/banner-tablets.png',
    'new/img/banner-accessories.png',
  ];

  const startBanner = () => {
    if (activeBanner === 2) {
      setActiveBanner(0);
    } else {
      setActiveBanner(activeBanner + 1);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      startBanner();
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [activeBanner]);

  const prevSlide = (): void => {
    setIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const nextSlide = (): void => {
    setIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="room-slider">
      <h2 className="room-slider__title">Explore Our Rooms</h2>

      <div className="room-slider__wrapper">
        {rooms.map((room, i) => (
          <article
            key={room.title}
            className={`room-slider__slide ${
              i === index ? 'room-slider__slide--active' : ''
            }`}
          >
            <div className="room-slider__image">
              <img src={room.image} alt={room.title} />
            </div>

            <h3 className="room-slider__room-title">{room.title}</h3>
            <p className="room-slider__text">{room.description}</p>
          </article>
        ))}
      </div>

      <div className="room-slider__controls">
        <button
          type="button"
          className="room-slider__button"
          onClick={prevSlide}
        >
          ← Prev
        </button>

        <button
          type="button"
          className="room-slider__button"
          onClick={nextSlide}
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default RoomSlider;
