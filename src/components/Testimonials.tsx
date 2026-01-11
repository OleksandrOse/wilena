import { useEffect, useState } from "react";
import "../styles/Testimonials.scss";
import ModalTestimonial from "./ModalTestimonial";
import TestimonialsCard from "./TestimonialsCard";
import { Button } from "./Button";

type Testimonial = {
  text: string;
  author: string;
  rating: number;
};

const MAX_CHARS = 120;
const AUTOPLAY_DELAY = 5000;

const getVisibleCount = () => (window.innerWidth >= 1024 ? 3 : 1);

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      text: "Boost your product and service's credibility by adding testimonials.",
      author: "Carly Ferris",
      rating: 5,
    },
    {
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. A aspernatur laudantium esse accusamus iste repudiandae velit, molestiae tempora explicabo quas, iusto libero perferendis officia similique quibusdam, et quam excepturi in ut! Omnis tempora ut cumque ducimus mollitia earum eum? Architecto numquam voluptas hic harum rem quo voluptatem, obcaecati minus delectus officia ea adipisci non illo cupiditate distinctio iure eaque eius, magnam quidem quaerat! Iure earum quod deleniti reprehenderit modi veritatis, ea iusto ad ex, recusandae nemo? Beatae aut ab consectetur dolores nihil ipsa repellendus dolorem quibusdam eligendi totam nemo id esse asperiores debitis ipsam, ex magni officia natus commodi excepturi? Fugiat commodi impedit mollitia doloribus amet iure incidunt, magnam ipsum totam recusandae saepe corporis corrupti ullam cupiditate dolores, sequi libero eum blanditiis maiores! Provident at, facere iusto nostrum, distinctio labore odio ducimus officiis nobis laudantium atque ea sint. Dicta quaerat, provident impedit, deserunt in beatae tenetur sequi dignissimos eaque totam, porro iusto asperiores tempore. Laudantium, rerum commodi! Provident facilis nemo vel rerum neque officia sequi repellat, doloremque sint corporis, praesentium consequatur quae exercitationem. Tempora sapiente doloribus iusto, magni voluptatum modi esse, error quidem culpa nihil eius nisi velit, odit assumenda ut! Magnam architecto dicta quod, voluptas totam inventore exercitationem sint quo minus. Fugiat dolor obcaecati minus qui iusto excepturi optio earum ipsum. Quam facere, animi repellat pariatur quisquam earum laudantium, facilis tenetur ipsam dolores asperiores reprehenderit debitis optio incidunt in numquam reiciendis, modi architecto consequuntur blanditiis veritatis quae aliquid repudiandae! Vel aliquam amet pariatur ad, quis maxime id sunt quidem esse quaerat fuga cupiditate aperiam ut placeat optio sit? Assumenda tempore obcaecati architecto dignissimos recusandae ea totam doloribus quod officia, modi fugit veniam temporibus corporis quisquam cum quas at voluptatum minima! Beatae quisquam dolore illo ullam cupiditate earum cum ipsum sed repudiandae minus atque, praesentium aut consequatur, pariatur quas iste culpa officiis possimus! Fugit maiores vero culpa impedit perferendis praesentium ab sint voluptatem rem mollitia et animi iure dolorum similique expedita, adipisci assumenda soluta qui dolore voluptatum optio perspiciatis officia nulla. A rem ratione facilis ea soluta voluptates. Pariatur corporis magni, corrupti nulla aliquid omnis repellendus totam blanditiis nihil placeat alias exercitationem optio! Maiores cupiditate error, ipsa quia nemo possimus sint rerum natus iure distinctio nisi corporis eius adipisci temporibus.",
      author: "Carlos Teren",
      rating: 3,
    },
    {
      text:
        "Amazing service and very comfortable rooms. The staff was friendly and helpful. We really enjoyed our stay and will come back again!",
      author: "John Smith",
      rating: 4,
    },
    {
      text:
        "Perfect location, clean rooms, great atmosphere and excellent breakfast.",
      author: "Anna Brown",
      rating: 5,
    },
    {
      text:
        "Superb experience, very clean and cozy. Staff was very polite and helpful.",
      author: "Mike Johnson",
      rating: 4,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = testimonials.length - visibleCount;

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [isPaused, expandedIndex, visibleCount, maxIndex]);

   const visibleTestimonials = Array.from({ length: visibleCount }).map(
    (_, i) => ({
      item: testimonials[(currentIndex + i) % testimonials.length],
      realIndex: (currentIndex + i) % testimonials.length,
    })
  );

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">Was unsere Gäste sagen</h2>

      <div className="testimonials__carousel">
        <button
          className="testimonials__arrow"
          onClick={() =>
            setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
          }
        >
          ‹
        </button>

        <div className="testimonials__track">
           {visibleTestimonials.map(({ item, realIndex }) => (
            <TestimonialsCard
              key={realIndex}
              item={item}
              isExpanded={expandedIndex === realIndex}
              onToggle={() =>
                setExpandedIndex(
                  expandedIndex === realIndex ? null : realIndex
                )
              }
              setIsPaused={setIsPaused}
              maxChars={MAX_CHARS}
            />
          ))}
        </div>

        <button
          className="testimonials__arrow"
          onClick={() =>
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
          }
        >
          ›
        </button>
      </div>

      <Button onClick={() => setIsModalOpen(true)}>Bewertung hinzufügen</Button>   
    
      <ModalTestimonial
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
      />
    </section>
  );
}
