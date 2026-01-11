import '../styles/Menu.scss';

export default function Menu() {
  return (
   <nav className="page__menu menu" id="menu">
      <div className="menu__container">
        <div className="menu__content">
          <div className="menu__top">
            <a href="#" className="logo">
              {/* <img
                className="logo__image"
                src="images/MyBiKE__menu.png" 
                alt="MyBike"
              > */}
            </a>

            <a className="icon"></a>
              
            <a href="#" className="icon icon--vector"></a>
          </div>

          <ul className="menu__list">
            <li className="menu__item">
              <a href="#" className="menu__link">Home</a>
            </li>
            <li className="menu__item">
              <a href="#about-us" className="menu__link">About us</a>
            </li>
            <li className="menu__item">
              <a href="#compare-bike" className="menu__link">Compare Bikes</a>
            </li>
            <li className="menu__item">
              <a href="#details" className="menu__link">Details</a>
            </li>
            <li className="menu__item">
              <a href="#contact-us" className="menu__link">Contacts</a>
            </li>
          </ul>

          <a 
            href="tel: +1 234 555-55-55" className="menu__call menu__call--phone"
          >
            +1 234 555-55-55
          </a>

          <a 
            href="tel: +1 234 555-55-55" className="menu__call menu__call--action"
          >
            book a test ride
          </a>
        </div>
      </div>
    </nav>
  );
}
