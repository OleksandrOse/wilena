import { client } from '../api/fetchClient';
import { Booking, NewBooking, ConfirmBookingPayload, DeclineBookingPayload } from '../types/Booking';

export type { Booking, NewBooking, ConfirmBookingPayload, DeclineBookingPayload };

export const getBookings = (roomId?: string) => {
  return client.get<Booking[]>(roomId ? `/bookings?roomId=${roomId}` : '/bookings');
};

export const createBooking = (data: NewBooking) => {
  return client.post<Booking>('/bookings', data);
};

export const updateBooking = (id: string, data: Partial<NewBooking>) => {
  return client.patch<Booking>(`/bookings/${id}`, data);
};

export const confirmBooking = (id: string, data: ConfirmBookingPayload) => {
  return client.post<Booking>(`/bookings/${id}/confirm`, data);
};

export const declineBooking = (id: string, data: DeclineBookingPayload) => {
  return client.post<Booking>(`/bookings/${id}/decline`, data);
};

export const confirmPayment = (id: string) => {
  return client.post<Booking>(`/bookings/${id}/payment`, {});
};

export const deleteBooking = (id: string) => {
  return client.delete(`/bookings/${id}`);
};
