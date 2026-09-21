export interface DayPrice { 
  date: string; 
  price: number; 
};

export interface Room {
  id: string;
  name: string;
  tagline: string; 
  images: string[];
  description: string; 
  size: number; 
  capacity: number; 
  bedrooms: number;
  pricePerNight: number; 
  dayPrices?: DayPrice[];
  amenities: { 
    icon: string; 
    label: string 
  }[];
  bookedRanges: { 
    from: string; 
    to: string 
  }[];
}

export interface AvailabilityDay {
  date: string;
  booked: boolean;
}