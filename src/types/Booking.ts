export type RateType = "flexible" | "nonrefundable";
export type BookingStatus = "requested" | "awaiting_payment" | "paid" | "declined";
export type Salutation = "frau" | "herr";

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
  rateType: RateType | null;
  rateDiscount: number | string | null; // DECIMAL з Postgres може прийти рядком
  wishes: string | null;
  status: BookingStatus | null;
  paymentDeadline: string | null; // YYYY-MM-DD
  salutation: Salutation | null;
  grandTotal: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export type NewBooking = Omit<
  Booking,
  | "id" | "roomName" | "childrenAges" | "discountTitle" | "discountAmount"
  | "packageTitle" | "phone" | "rateType" | "rateDiscount" | "wishes"
  | "status" | "paymentDeadline" | "salutation"
> & {
  roomName?: string;
  childrenAges?: number[];
  discountTitle?: string;
  discountAmount?: number;
  packageTitle?: string;
  phone?: string;
  rateType?: RateType;
  rateDiscount?: number;
  wishes?: string;
  paymentDeadline?: string;
};

export type DeclineBookingPayload = {
  salutation?: Salutation;
  alternative?: string; 
  note?: string;
};

export type ConfirmBookingPayload = {
  grandTotal: number;
  paymentDeadline: string;
  salutation?: Salutation;
  note?: string;
};
