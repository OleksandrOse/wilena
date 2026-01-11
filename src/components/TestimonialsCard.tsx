import { Dispatch, SetStateAction } from "react";
import "../styles/TestimonialCard.scss";

type Testimonial = {
  text: string;
  author: string;
  rating: number;
  
};

type Props = {
  key: number;
  item: Testimonial;
  isExpanded: boolean;
  onToggle: () => void;
  setIsPaused: (value: SetStateAction<boolean>) => void;
  maxChars: number;
}

const TestimonialsCard: React.FC<Props> = ({
  item,
  isExpanded,
  onToggle,
  setIsPaused,
  maxChars,
}) => {
  const isLong = item.text.length > maxChars;

  const displayText = isExpanded
    ? item.text
    : isLong
    ? item.text.slice(0, maxChars) + "..."
    : item.text;

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
      <div className="testimonial-card__rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= item.rating
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
          — {item.author}
        </span>

        {isLong ? (
          <button className="testimonial-card__more" onClick={onToggle}>
            {isExpanded ? "Verstecken" : "Mehr lesen"}
          </button>
        ) : (
          <span className="testimonial-card__placeholder" />
        )}
      </div>
    </div>
  );
};


// const TestimonialsCard: React.FC<Props> = ({
//   item,
//   isExpanded,
//   onToggle,
//   setIsPaused,
//   maxChars,
//  }) => {
//   const isLong = item.text.length > maxChars;

//   const displayText = isExpanded
//     ? item.text
//     : isLong
//     ? item.text.slice(0, maxChars) + "..."
//     : item.text;

//   return (
//     <div
//       className="testimonial-card"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={() => setIsPaused(true)}
//     >
//       <div className="testimonial-card__rating">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             className={
//               star <= item.rating
//                 ? "testimonial-card__star testimonial-card__star--active"
//                 : "testimonial-card__star"
//             }
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       <p
//         className={
//           isExpanded
//             ? "testimonial-card__text testimonial-card__text--scroll"
//             : "testimonial-card__text"
//         }
//       >
//         {displayText}
//       </p>

//       <div className="testimonial-card__footer">
//         <span className="testimonial-card__author">
//           — {item.author}
//         </span>

//         {isLong ? (
//           <button className="testimonial-card__more" onClick={onToggle}>
//             {isExpanded ? "Hide" : "Read more"}
//           </button>
//         ) : (
//           <span className="testimonial-card__placeholder" />
//         )}
//       </div>
//     </div>
//   );
// };

export default TestimonialsCard;
