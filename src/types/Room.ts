export interface Room {
  id: string;
  title: string;
  subtitle: string;
  guests: number;
  beds: string;
  size: string;
  amenities: string[];
  images: string[];
  basePrice: number;
  availability: AvailabilityDay[];
}

export interface AvailabilityDay {
  date: string;
  booked: boolean;
}