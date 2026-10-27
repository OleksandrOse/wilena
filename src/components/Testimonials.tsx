import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Testimonials.scss";
import ModalTestimonial from "./ModalTestimonial";
import TestimonialsCard from "./TestimonialsCard";
import { Button } from "./Button";
import { Testimonial, NewTestimonial } from "../types/Testimonial";
import { getTestimonials, createTestimonial } from "../services/testimonialService";

const MAX_CHARS = 120;
const AUTOPLAY_DELAY = 5000;

const getVisibleCount = () => (window.innerWidth >= 1024 ? 3 : 1);

export default function Testimonials() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = Math.max(testimonials.length - visibleCount, 0);

  useEffect(() => {
    let cancelled = false;

    getTestimonials()
      .then((data) => {
        if (!cancelled) setTestimonials(data);
      })
      .catch(() => {
        if (!cancelled) setTestimonials([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [isPaused, expandedIndex, visibleCount, maxIndex, testimonials.length]);

  const visibleTestimonials =
    testimonials.length === 0
      ? []
      : Array.from({ length: Math.min(visibleCount, testimonials.length) }).map(
          (_, i) => ({
            item: testimonials[(currentIndex + i) % testimonials.length],
            realIndex: (currentIndex + i) % testimonials.length,
          })
        );

  async function addTestimonial(newTestimonial: NewTestimonial) {
    const created = await createTestimonial(newTestimonial);
    setTestimonials((prev) => [...prev, created]);
  }

  return (
    <section className="testimonials">
      <h2 className="testimonials__title">{t("testimonials.title")}</h2>

      {!isLoading && testimonials.length > 0 && (
        <div className="testimonials__carousel">
          <button
            className="testimonials__arrow"
            aria-label={t("testimonials.prev")}
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
            aria-label={t("testimonials.next")}
            onClick={() =>
              setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
            }
          >
            ›
          </button>
        </div>
      )}

      <Button onClick={() => setIsModalOpen(true)}>{t("testimonials.add")}</Button>

      <ModalTestimonial
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={addTestimonial}
      />
    </section>
  );
}
