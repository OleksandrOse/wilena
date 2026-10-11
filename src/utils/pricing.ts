import { ServerRoom } from '../services/serverRoomService';
import { getPricePeriods, PricePeriod } from '../services/pricePeriodService';
import { getBookings } from '../services/bookingService';

export type NightPrice = { date: string; price: number };

// "YYYY-MM-DD" з ЛОКАЛЬНИХ компонентів дати (не toISOString() — той переводить
// в UTC і для Europe/Berlin, UTC+2, зсуває дату на день назад біля півночі).
export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function addDaysIso(iso: string, n: number): string {
  return isoDate(addDays(new Date(iso), n));
}

export function nightsBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export function rangesOverlap(aFrom: Date, aTo: Date, bFrom: Date, bTo: Date): boolean {
  return aFrom <= bTo && bFrom <= aTo;
}

// "YYYY-MM-DD" → "DD.MM.YYYY" для відображення в UI
export function fmtDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

// Розгортає "сирі" періоди (dateFrom/dateTo/pricePerNight) у список
// { date, price } по кожному дню — те, що реально споживає календар.
// Якщо періоди перетинаються, пізніший у масиві переважає для спільних дат.
export function buildDayPricesFromPeriods(periods: PricePeriod[]): NightPrice[] {
  const result: NightPrice[] = [];

  periods.forEach(p => {
    let cur = new Date(p.dateFrom);
    const end = new Date(p.dateTo);
    const price = Number(p.pricePerNight);

    while (cur <= end) {
      result.push({ date: isoDate(cur), price });
      cur = addDays(cur, 1);
    }
  });

  return result;
}

// Комбінований запит ціни апартаменту: немає окремого /rooms/:id ресурсу на
// сервері (apartments не зберігаються як окремі записи), тому ціна береться
// повністю з "сирих" price-periods, а зайняті дати (bookedRanges) — з уже
// існуючих бронювань цього roomId. Використовується і на RoomPage2, і в
// ModalBooking/QuickBookingModal — щоб не дублювати цю логіку по кожному
// компоненту окремо.
export async function fetchRoomPricing(roomId: string): Promise<ServerRoom | null> {
  try {
    const [periods, bookings] = await Promise.all([
      getPricePeriods(roomId).catch(() => []),
      getBookings(roomId).catch(() => []),
    ]);

    const dayPrices = buildDayPricesFromPeriods(periods ?? []);

    // "Базова" ціна за ніч для відображення "ab €X / Nacht" до вибору дат —
    // беремо найнижчу ціну серед усіх заданих періодів (якщо періодів
    // немає взагалі, показуємо 0).
    const pricePerNight = dayPrices.length > 0
      ? Math.min(...dayPrices.map(dp => dp.price))
      : 0;

    return {
      pricePerNight,
      dayPrices,
      bookedRanges: (bookings ?? []).map(b => ({ from: b.dateFrom, to: b.dateTo })),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("fetchRoomPricing error:", err);
    return null;
  }
}

// Будує ціну кожної ночі в діапазоні [dateFrom, dateTo) з уже завантаженого
// ServerRoom (dayPrices/pricePerNight як fallback).
export function buildNightlyPrices(
  dateFrom: string,
  dateTo: string,
  pricing: ServerRoom,
): NightPrice[] {
  const dpMap: Record<string, number> = {};

  (pricing.dayPrices ?? []).forEach(dp => {
    dpMap[dp.date] = dp.price;
  });

  const nights: NightPrice[] = [];
  let cur = new Date(dateFrom);
  const end = new Date(dateTo);

  while (cur < end) {
    const iso = isoDate(cur);

    nights.push({ date: iso, price: dpMap[iso] ?? pricing.pricePerNight });
    cur = addDays(cur, 1);
  }

  return nights;
}

export type PriceSegment = {
  from: string;
  to: string; // дата виїзду цього сегмента (наступний день після останньої ночі)
  nights: number;
  pricePerNight: number;
  subtotal: number;
};

// Групує послідовні ночі з однаковою ціною в один сегмент ("період"), щоб
// показати "€120 × 3 ночі (01.07–04.07)" + "€150 × 2 ночі (04.07–06.07)".
export function groupPriceSegments(nightlyPrices: NightPrice[]): PriceSegment[] {
  const segments: PriceSegment[] = [];

  nightlyPrices.forEach(np => {
    const last = segments[segments.length - 1];

    if (last && last.pricePerNight === np.price) {
      last.nights += 1;
      last.subtotal += np.price;
      last.to = addDaysIso(np.date, 1);
    } else {
      segments.push({
        from: np.date,
        to: addDaysIso(np.date, 1),
        nights: 1,
        pricePerNight: np.price,
        subtotal: np.price,
      });
    }
  });

  return segments;
}
