import '../styles/Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__block">
          <h3>Wilena Apartments</h3>
          <p>Warmbader Allee 53, 9504 Villach</p>
          <p>Obzidna Ulica 4, 6330 Piran, Slovenia</p>
        </div>

        <div className="footer__block">
          <h3 className="footer__title">Contact</h3>
          <p>Email: wilena@speed.at</p>
          <p>Tel: +43 664 7378 4888</p>
        </div>

        {/* <div className="footer__block">
          <h3 className="footer__title">Business Hours</h3>
          <p>Mon–Fri: 8am – 7pm</p>
        </div> */}

      </div>
    </footer>
  );
}
