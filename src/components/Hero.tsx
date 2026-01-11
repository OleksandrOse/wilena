import { Dispatch, SetStateAction } from 'react';
import { Button } from './Button';
import '../styles/Hero.scss';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Hero: React.FC<Props> = ({ setIsOpen }) => {
  
  return (
    <header className="hero">
      <div className="hero__top">
        <a href="#" className="hero__logo">
          <div className="hero__logo-title">Wilena</div>
          <div className="hero__logo-subtitle">apartments</div>
        </a>

        <a href="tel:+12345555555" className="icon icon--phone">
          <div className="icon__tooltip">+43 664 73784888</div>
        </a>

        <a href="#menu" className="icon icon--menu"></a>
      </div>
      <div className="hero__content">
        <div className="hero__eyebrow-container">
          <p className="hero__eyebrow">APARTMENTS</p>
          <h2 className="hero__slogan">
            Ihr gemütliches Zuhause
          </h2>
        </div>

        <div className="hero__title-container">
          <h1 className="hero__title">Wilena</h1>
          <h1 className="hero__subtitle">apartments</h1>
        </div>

        <div className="hero__container-address">
          <p className="hero__address">
            Warmbader Allee 53, 9504 Villach
          </p>


          <p className="hero__address">
            Obzidna Ulica 4, 6330 Piran, Slovenia
          </p>
           <div className="hero__container-button">
          <Button onClick={() => setIsOpen(true)}>Jetzt buchen</Button>
        </div>

        </div>

       
      </div>
    </header>
  );
}

export default Hero;
