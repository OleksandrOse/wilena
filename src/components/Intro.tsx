import '../styles/Intro.scss';

export default function Intro() {
  return (
    <section className="intro">

      <div className="intro__content">
        <div className="intro__text-conteiner">
          <h2 className="intro__title">
            Willkommen bei Wilena Apartments
          </h2>
          <p className="intro__text">
            Willkommen in den Wilena Apartments – Ihrem Rückzugsort für Erholung, Komfort und unvergessliche Urlaubsmomente.
            Unsere Apartments vereinen moderne Ausstattung, eine ruhige Lage inmitten der Natur und eine hervorragende Anbindung an beliebte Ausflugsziele.
          </p>
        </div>

        <div className="intro__photo-container">
          <img className="intro__photo" src="/Wilena/villach/Sehenswuerdigkeiten-in-Finnland.jpg" alt="1" />
          <img className="intro__photo" src="/Wilena/villach/WhatsApp Image 2025-10-27 at 21.24.17_3aa5e4f1.jpg" alt="2" />
          <img className="intro__photo" src="/Wilena/villach/WhatsApp Image 2025-10-27 at 21.24.17_c2bb1028.jpg" alt="3" />
          <img className="intro__photo" src="/Wilena/piran/WhatsApp Image 2025-12-40 at 22.39.57.jpeg" alt="4" />
        </div>
      </div>

      {/* <ul className="intro__features">
        <li className="intro__feature">Kurort, ruhige Lage</li>
        <li className="intro__feature">Unterkunft für 1 bis 11 Personen</li>
        <li className="intro__feature">Aufenthalt von 1 bis 90 Tagen</li>
        <li className="intro__feature">Tiefgarage</li>
      </ul> */}
    </section>
  );
}
