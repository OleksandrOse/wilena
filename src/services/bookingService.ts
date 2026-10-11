import { client } from '../api/fetchClient';
import { Booking, NewBooking } from '../types/Booking';

export type { Booking, NewBooking };

export const getBookings = (roomId?: string) => {
  return client.get<Booking[]>(roomId ? `/bookings?roomId=${roomId}` : '/bookings');
};

export const createBooking = (data: NewBooking) => {
  return client.post<Booking>('/bookings', data);
};

export const updateBooking = (id: string, data: Partial<NewBooking>) => {
  return client.patch<Booking>(`/bookings/${id}`, data);
};

export const deleteBooking = (id: string) => {
  return client.delete(`/bookings/${id}`);
};
