import { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import "../styles/TestimonialCard.scss";
import { Testimonial } from "../types/Testimonial";

type Props = {
  item: Testimonial;
  isExpanded: boolean;
  onToggle: () => void;
  setIsPaused: (value: SetStateAction<boolean>) => void;
  maxChars: number;
};

const TestimonialsCard: React.FC<Props> = ({
  item,
  isExpanded,
  onToggle,
  setIsPaused,
  maxChars,
}) => {
  const { t } = useTranslation();
  const isLong = item.description.length > maxChars;

  const displayText = isExpanded
    ? item.description
    : isLong
    ? item.description.slice(0, maxChars) + "..."
    : item.description;

  const handleLeave = () => {
    setIsPaused(false);
    if (isExpanded) onToggle();
  };

  return (
    <div
      className="testimonial-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleLeave}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={handleLeave}
    >
      <div
        className="testimonial-card__rating"
        role="img"
        aria-label={t("testimonials.starsLabel", { count: item.stars })}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            aria-hidden="true"
            className={
              star <= item.stars
                ? "testimonial-card__star testimonial-card__star--active"
                : "testimonial-card__star"
            }
          >
            ★
          </span>
        ))}
      </div>

      <p
        className={
          isExpanded
            ? "testimonial-card__text testimonial-card__text--scroll"
            : "testimonial-card__text"
        }
      >
        {displayText}
      </p>

      <div className="testimonial-card__footer">
        <span className="testimonial-card__author">
          — {item.name} {item.surname}
        </span>

        {isLong ? (
          <button className="testimonial-card__more" onClick={onToggle}>
            {isExpanded ? t("testimonials.less") : t("testimonials.more")}
          </button>
        ) : (
          <span className="testimonial-card__placeholder" />
        )}
      </div>
    </div>
  );
};

export default TestimonialsCard;
