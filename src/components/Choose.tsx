import React from 'react';
import img1 from '../assets/images/choose1.jpg';
import img2 from '../assets/images/choose2.jpg';
import img3 from '../assets/images/choose3.jpg';
import img4 from '../assets/images/choose4.jpg';
import '../styles/Choose.scss';

const Choose = () => {
  return (
    <section className="choose container">
      <div className="choose__grid">
        <div className="choose__images">
          <img src={img1} alt="" className="choose__img" />
          <img src={img2} alt="" className="choose__img" />
          <img src={img3} alt="" className="choose__img" />
          <img src={img4} alt="" className="choose__img" />
        </div>
        <div className="choose__content">
          <h2 className="choose__title">Why choose Wilena Apartments?</h2>
          <p className="choose__text">RELAX WITH FREE WI-FI, PRIVATE PARKING, BBQ FACILITIES, AND A SUNNY TERRACE.</p>
          <p className="choose__text">EACH APARTMENT FEATURES A BALCONY, COZY LIVING AREA, AND A FULLY EQUIPPED KITCHEN WITH MODERN APPLIANCES.</p>
          <p className="choose__text">ALL UNITS INCLUDE A PRIVATE BATHROOM, FLAT-SCREEN TV, AND COMPLIMENTARY TOILETRIES.</p>
          <p className="choose__text">UNWIND IN THE ON-SITE THERMAL POOL OR EXPLORE NEARBY ATTRACTIONS LIKE WALDSEILPARK – TABORHÖHE (14 KM).</p>
          <p className="choose__text">OUTDOOR ENTHUSIASTS CAN ENJOY SKIING, CYCLING, AND A LOCAL WATER PARK.</p>
          <p className="choose__text">JUST 46 KM FROM KLAGENFURT AIRPORT, IDEAL FOR TRAVELERS.</p>
        </div>
      </div>
    </section>
  );
};

export default Choose;
