import '../styles/Offers.scss';

export default function Offers() {
  return (
    <section className="offers">
      <h2 className="offers__title">Special Offers</h2>

      <div className="offers__list">
        <article className="offer-card">
          <h3 className="offer-card__title">Dine & Stay Package</h3>
          <p className="offer-card__text">
            Enjoy gourmet dining and luxury accommodation.
          </p>
        </article>

        <article className="offer-card">
          <h3 className="offer-card__title">City Tour Package</h3>
          <p className="offer-card__text">
            Explore the city with curated experiences.
          </p>
        </article>

        <article className="offer-card">
          <h3 className="offer-card__title">Wellness Weekend</h3>
          <p className="offer-card__text">
            Relax, recharge, and rejuvenate.
          </p>
        </article>
      </div>
    </section>
  );
}
