import { FC } from 'react';
import '../styles/RoomCard.scss';

interface RoomCardProps {
  title: string;
  price: string;
  meta: string;
  highlight?: boolean;
}

export const RoomCard: FC<RoomCardProps> = ({
  title,
  price,
  meta,
  highlight = false,
}) => {
  return (
    <article
      className={`room-card ${
        highlight ? 'room-card--highlight' : ''
      }`}
    >
      <p className="room-card__price">{price}</p>
      <h3 className="room-card__title">{title}</h3>
      <p className="room-card__meta">{meta}</p>
    </article>
  );
};
