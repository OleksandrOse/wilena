import { client } from '../api/fetchClient';

export type ServerRoom = {
  pricePerNight: number;
  dayPrices?: { date: string; price: number }[];
  bookedRanges?: { from: string; to: string }[];
};

// export const getRoom = (roomId: string) => {
//   return client.get<ServerRoom>(`/rooms/${roomId}`);
// };
