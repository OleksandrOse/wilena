import { client } from '../api/fetchClient';
import { Testimonial, NewTestimonial } from '../types/Testimonial';

export const getTestimonials = () => {
  return client.get<Testimonial[]>('/testimonials');
};

export const createTestimonial = (data: NewTestimonial) => {
  return client.post<Testimonial>('/testimonials', data);
};

export const updateTestimonial = (id: string, data: Partial<NewTestimonial>) => {
  return client.patch<Testimonial>(`/testimonials/${id}`, data);
};

export const deleteTestimonial = (id: string) => {
  return client.delete(`/testimonials/${id}`);
};
