export interface Testimonial {
  id?: string;
  name: string;
  surname: string;
  stars: number;
  description: string;
}

export type NewTestimonial = Omit<Testimonial, "id">;
