import '../styles/Awards.scss';

export default function Awards() {
  return (
    <section className="awards">
      <h2 className="awards__title">Awards</h2>

      <ul className="awards__list">
        <li className="award">
          <h3 className="award__name">Excellence in Guest Service</h3>
          <p className="award__source">Hospitality Awards 2030</p>
        </li>

        <li className="award">
          <h3 className="award__name">Best Urban Retreat</h3>
          <p className="award__source">City Travel Awards</p>
        </li>

        <li className="award">
          <h3 className="award__name">Traveler’s Choice</h3>
          <p className="award__source">Global Getaway Awards 2030</p>
        </li>
      </ul>
    </section>
  );
}
