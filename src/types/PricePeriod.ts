export interface PricePeriod {
  id: string;
  roomId: string;
  dateFrom: string;
  dateTo: string;
  pricePerNight: number;
  label: string | null;
};
