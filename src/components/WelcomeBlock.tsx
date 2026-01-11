import { FaMountain, FaUmbrellaBeach, FaStar } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import "../styles/WelcomeBlock.scss";

export default function WelcomeBlock() {
  const MountainIcon = FaMountain as unknown as React.FC<IconBaseProps>;
  const BeachIcon = FaUmbrellaBeach as unknown as React.FC<IconBaseProps>;
  const StarIcon = FaStar as unknown as React.FC<IconBaseProps>;

  return (
    <section className="welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">
          Ihr perfekter Urlaub – <span>Ihre Wahl</span>
        </h1>

        <div className="welcome-features">
          <div className="feature">
            <MountainIcon className="icon" />
            <p>Natur & Erholung in Kärnten</p>
          </div>

          <div className="feature">
            <BeachIcon className="icon" />
            <p>Meeresurlaub in Piran</p>
          </div>

          <div className="feature">
            <StarIcon className="icon" />
            <p>Qualität, Komfort & unvergessliche Aufenthalte</p>
          </div>
        </div>

        <p className="welcome-footer">
          Wir freuen uns darauf, Sie bei uns begrüßen zu dürfen.
        </p>
      </div>

    </section>
  );
}
