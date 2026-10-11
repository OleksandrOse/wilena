import { client } from '../api/fetchClient';

export type PricePeriod = {
  id: string;
  roomId: string;
  dateFrom: string;
  dateTo: string;
  pricePerNight: number;
  label: string | null;
};

export type NewPricePeriod = {
  roomId: string;
  dateFrom: string;
  dateTo: string;
  pricePerNight: number;
  label?: string;
};

export const getPricePeriods = (roomId: string) => {
  return client.get<PricePeriod[]>(`/admin/price-periods/${roomId}`);
};

export const createPricePeriod = (data: NewPricePeriod) => {
  return client.post<PricePeriod>('/admin/price-periods', data);
};

export const updatePricePeriod = (id: string, data: Partial<NewPricePeriod>) => {
  return client.put<PricePeriod>(`/admin/price-periods/${id}`, data);
};

export const deletePricePeriod = (id: string) => {
  return client.delete(`/admin/price-periods/${id}`);
};
