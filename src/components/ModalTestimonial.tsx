import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/ModalBooking.scss";

type Testimonial = {
  text: string;
  author: string;
  rating: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  testimonials: Testimonial[];
  setTestimonials: Dispatch<SetStateAction<Testimonial[]>>
}

const ModalTestimonial: React.FC<Props> = ({ isOpen, setIsOpen, testimonials, setTestimonials }) => {
  const [newText, setNewText] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);

  const addTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newText || !newAuthor) return;

    setTestimonials([
      ...testimonials,
      { text: newText, author: newAuthor, rating: newRating },
    ]);

    setNewText("");
    setNewAuthor("");
    setNewRating(5);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  return (
    <>
     {isOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setIsOpen(false)} />
          <div className="modal__content">
            <button className="modal__close" onClick={() => setIsOpen(false)}>×</button>
            <h3 className="modal__title">Bewertung hinzufügen</h3>
            <form className="modal__form" onSubmit={addTestimonial}>
              <textarea className="modal__textarea" placeholder="Ihre Bewertung" value={newText} onChange={(e)=>setNewText(e.target.value)}/>
              <input className="modal__input" type="text" placeholder="Ihre Name" value={newAuthor} onChange={(e)=>setNewAuthor(e.target.value)}/>
              <select className="modal__input" value={newRating} onChange={e=>setNewRating(Number(e.target.value))}>
                <option value={5}>★★★★★ (5)</option>
                <option value={4}>★★★★☆ (4)</option>
                <option value={3}>★★★☆☆ (3)</option>
                <option value={2}>★★☆☆☆ (2)</option>
                <option value={1}>★☆☆☆☆ (1)</option>
              </select>
              <button className="modal__submit" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTestimonial;
