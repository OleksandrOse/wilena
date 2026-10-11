export interface Booking {
  id: string;
  roomId: string;
  roomName: string | null;
  dateFrom: string;
  dateTo: string;
  nights: number;
  adults: number;
  children: number;
  childrenAges: number[] | null;
  hasDog: boolean;
  pricePerNight: number;
  roomTotal: number;
  kurtaxTotal: number;
  discountTitle: string | null;
  discountAmount: number | null;
  packageTitle: string | null;
  grandTotal: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export type NewBooking = Omit<
  Booking,
  "id" | "roomName" | "childrenAges" | "discountTitle" | "discountAmount" | "packageTitle" | "phone"
> & {
  roomName?: string;
  childrenAges?: number[];
  discountTitle?: string;
  discountAmount?: number;
  packageTitle?: string;
  phone?: string;
};
