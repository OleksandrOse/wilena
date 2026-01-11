import React from "react";
import RoomItem from "./RoomItem";
import "../styles/RoomList.scss";

interface Room {
  title: string;
  description: string;
  price: string;
  images: string[];
}

const roomsData: Room[] = [
  {
    title: "Juniorsuiten",
    description: "36 m² | 1‑4 Pers. | Doppelbett & Schlafcouch",
    price: "ab € 249,-",
    images: [
      "/images/juniorsuite-1.jpg",
      "/images/juniorsuite-2.jpg",
      "/images/juniorsuite-3.jpg",
    ],
  },
  {
    title: "Doppelzimmer Superior",
    description: "22 m² | 1‑2 Pers. | Doppelbett",
    price: "ab € 216,-",
    images: [
      "/images/doppelzimmer-superior-1.jpg",
      "/images/doppelzimmer-superior-2.jpg",
    ],
  },
  {
    title: "Doppelzimmer Comfort",
    description: "22 m² | 1‑2 Pers. | Doppelbett",
    price: "ab € 191,-",
    images: [
      "/images/doppelzimmer-comfort-1.jpg",
      "/images/doppelzimmer-comfort-2.jpg",
    ],
  },
  {
    title: "Doppelzimmer Classic",
    description: "22 m² | 1‑2 Pers. | Doppelbett",
    price: "ab € 168,-",
    images: [
      "/images/doppelzimmer-classic-1.jpg",
      "/images/doppelzimmer-classic-2.jpg",
    ],
  },
];

const RoomsList: React.FC = () => {
  return (
    <div className="rooms-list">
      {roomsData.map((room, idx) => (
        <RoomItem key={idx} {...room} />
      ))}
    </div>
  );
};

export default RoomsList;
