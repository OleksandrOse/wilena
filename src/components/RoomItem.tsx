import React, { useRef, useState, useEffect } from "react";
import "../styles/RoomItem.scss";
import RoomSliders from "./RoomSliders";

interface RoomCardProps {
  title: string;
  description: string;
  price: string;
  images: string[]
}

const RoomItem: React.FC<RoomCardProps> = ({ title, description, price, images }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`room-card ${isVisible ? "visible" : ""}`}>
      {images && images.length > 0 && <RoomSliders images={images} />}
      <h3 className="room-title">{title}</h3>
      <p className="room-description">{description}</p>
      <div className="room-footer">
        <span className="room-price">{price}</span>
        <button className="room-book">Buchen</button>
      </div>
    </div>
  );
};

export default RoomItem;
