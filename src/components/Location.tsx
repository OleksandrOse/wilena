import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Locations.scss";

type Location = {
  id: "piran" | "villach";
  title: string;
  description: string;
  img: string;
  path: string;
};

const locations: Location[] = [
  {
    id: "piran",
    title: "Piran",
    description: "Meeresurlaub in einer gemütlichen Küstenstadt mit malerischen Straßen und Stränden.",
    img: `${process.env.PUBLIC_URL}/Wilena/piran/WhatsApp Image 2025-12-26 at 12.47.08.jpeg`,
    path: "/piran",
  },
  {
    id: "villach",
    title: "Villach",
    description: "Natur und Erholung in Kärnten: Seen, Berge und endlose Waldflächen zum Entspannen.",
    img: `${process.env.PUBLIC_URL}/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg`,
    path: "/villach",
  },
];

export default function Locations() {
  const navigate = useNavigate();

  return (
    <section className="locations">
      <h2 className="locations__title">Unsere Locations</h2>

      <div className="locations__cards">
        {locations.map(loc => (
          <div
            key={loc.id}
            className="locations__card"
            onClick={() => navigate(loc.path)}
          >
            <img src={loc.img} alt={loc.title} className="locations__image" />
            <h3 className="locations__card-title">{loc.title}</h3>
            <p className="locations__card-description">{loc.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
