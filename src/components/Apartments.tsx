import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Apartments.scss";

const apartments = [
  {
    name: "Zimmer1",
    image: `${process.env.PUBLIC_URL}/Wilena/piran/Room1.jpg`,
    path: "/piran/room1",
  },
  {
    name: "Zimmer2",
    image: `${process.env.PUBLIC_URL}/Wilena/piran/Room2.jpg`,
    path: "/piran/room2",
  },
  {
    name: "Zimmer3",
    image: `${process.env.PUBLIC_URL}/Wilena/piran/Room3.jpg`,
    path: "/piran/room3",
  },
  {
    name: "Zimmer4",
    image: `${process.env.PUBLIC_URL}/Wilena/piran/Room4.jpg`,
    path: "/piran/room4",
  },
  {
    name: "Zimmer5",
    image: `${process.env.PUBLIC_URL}/Wilena/piran/Room5.jpg`,
    path: "/piran/room5",
  },
];

export default function Apartments() {
  const navigate = useNavigate();
  return (
    <section id="apartments" className="section">
      <h2>Apartments</h2>

      <Swiper
        className="apartments-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {apartments.map((a) => (
          <SwiperSlide key={a.name}>
            <div className="card">
              <img src={a.image} alt={a.name} className="card__image" />
              <h3>{a.name}</h3>
              <button
               onClick={(e) => {
                  e.stopPropagation();
                  navigate(a.path);
                }}
              >
                Mehr erfahren
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
