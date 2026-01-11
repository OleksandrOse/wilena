import React from 'react';
import welcomeImg from '../assets/images/welcome.jpg';
import '../styles/Welcome.scss';

const Welcome = () => {
  return (
    <section className="welcome">
      <div className="welcome__content container">
        <h2 className="welcome__title">Willkommen in unserem Apartment</h2>
        <p className="welcome__text">
          LOCATED JUST 9.1 KM FROM THE HISTORIC LANDSKRON CASTLE, WILENA APARTMENTS OFFERS A PERFECT BLEND OF COMFORT, CONVENIENCE, AND RELAXATION. GUESTS ENJOY FREE WI-FI, PRIVATE PARKING, BBQ FACILITIES, AND A BEAUTIFUL TERRACE SURROUNDED BY NATURE.
        </p>
        <p className="welcome__text">
          Relax in our thermal pool, or explore the scenic surroundings with activities such as skiing and cycling. Families will love the nearby water park, and couples especially appreciate our peaceful location.
        </p>
      </div>
      <img src={welcomeImg} alt="Balcony view" className="welcome__image" />
    </section>
  );
};

export default Welcome;
