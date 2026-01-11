import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../styles/RoomSlider.scss";

interface RoomSliderProps {
  images: string[];
}

const RoomSliders: React.FC<RoomSliderProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      spaceBetween={15}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="slider-image-wrapper">
            <img src={img} alt={`Room ${idx + 1}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoomSliders;
