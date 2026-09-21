import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DiscountPicker from "./DiscountPicker";
import { discounts, packages } from "../data/discounts";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";
import "../styles/ModalBooking.scss";
import "../styles/RoomPage2.scss"; // для стилів .rp-discount / .rp-cal-popup, які тут теж використовуються

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const APARTMENTS = [
  { id: "1", label: "Apartment 166", path: "/apartment1" },
  { id: "2", label: "Apartment 172", path: "/apartment2" },
];

const API_URL = "http://localhost:8080";

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function fmtDate(iso: string) { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; }

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

function rangesOverlap(aF: Date, aT: Date, bF: Date, bT: Date) {
  return aF <= bT && bF <= aT;
}

const MONTHS_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const DAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function buildMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7;
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const rows: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

type ServerRoom = {
  pricePerNight: number;
  dayPrices?: { date: string; price: number }[];
  bookedRanges?: { from: string; to: string }[];
};

// ── Calendar Popup (той самий патерн, що й на RoomPage2) ──────────────────────
function CalendarPopup({
  room,
  from,
  to,
  onSelect,
  onClose,
  selectingFrom,
}: {
  room: ServerRoom;
  from: string;
  to: string;
  onSelect: (iso: string) => void;
  onClose: () => void;
  selectingFrom: boolean;
}) {
  const today = new Date();
  const [offset, setOffset] = useState(0);
  const viewDate = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const matrix = buildMatrix(viewDate.getFullYear(), viewDate.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const dayPriceMap = useMemo(() => {
    const m: Record<string, number> = {};
    (room.dayPrices ?? []).forEach((dp) => { m[dp.date] = dp.price; });
    return m;
  }, [room]);

  const bookedSet = useMemo(() => {
    const s = new Set<string>();
    (room.bookedRanges ?? []).forEach(({ from: bf, to: bt }) => {
      let cur = new Date(bf); const end = new Date(bt);
      while (cur <= end) { s.add(isoDate(cur)); cur = addDays(cur, 1); }
    });
    return s;
  }, [room]);

  const inRange = (iso: string) => from && to && iso > from && iso < to;

  return (
    <motion.div className="rp-cal-popup" ref={ref}
      // інлайн-стилі навмисно перекривають абсолютне позиціонування
      // .rp-cal-popup з RoomPage2.scss (там воно розраховане під верстку
      // rp-card), щоб календар завжди відкривався одразу під полями дат
      // всередині модалки, а не ховався поза видимою областю.
      style={{ position: "relative", top: "auto", left: "auto", right: "auto", marginTop: 10, zIndex: 20 }}
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      <div className="rp-cal-popup__header">
        <span>{selectingFrom ? "Anreisedatum wählen" : "Abreisedatum wählen"}</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="rp-cal-popup__nav">
        <button onClick={() => setOffset((o) => Math.max(0, o - 1))} disabled={offset === 0}>‹</button>
        <span>{MONTHS_DE[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={() => setOffset((o) => o + 1)}>›</button>
      </div>
      <div className="rp-cal-popup__grid">
        {DAYS_DE.map((d) => <div key={d} className="rp-cal-popup__dayname">{d}</div>)}
        {matrix.flat().map((date, i) => {
          if (!date) return <div key={i} className="rp-cal-popup__cell rp-cal-popup__cell--empty" />;
          const iso = isoDate(date);
          const isPast = date < today;
          const isBooked = bookedSet.has(iso);
          const isFrom = iso === from; const isTo = iso === to;
          const price = dayPriceMap[iso] ?? room.pricePerNight;
          return (
            <button key={iso} disabled={isPast || isBooked} onClick={() => onSelect(iso)}
              className={["rp-cal-popup__cell",
                isPast ? "rp-cal-popup__cell--past" : "",
                isBooked ? "rp-cal-popup__cell--booked" : "",
                (isFrom || isTo) ? "rp-cal-popup__cell--selected" : "",
                inRange(iso) ? "rp-cal-popup__cell--range" : "",
              ].filter(Boolean).join(" ")}
            >
              <span className="rp-cal-popup__day">{date.getDate()}</span>
              {!isPast && !isBooked && <span className="rp-cal-popup__price">€{price}</span>}
              {isBooked && <span className="rp-cal-popup__booked">Belegt</span>}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

const QuickBookingModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [apartmentId, setApartmentId] = useState("1");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [hasDog, setHasDog] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [calOpen, setCalOpen] = useState(false);
  const [selectingFrom, setSelectingFrom] = useState(true);

  // ── Актуальна ціна з сервера, підвантажується по днях (як на RoomPage2) ───
  const [serverRoom, setServerRoom] = useState<ServerRoom | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPriceLoading(true);
    setPriceError(false);

    fetch(`${API_URL}/rooms/${apartmentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Laden der Preise");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setServerRoom(data);
      })
      .catch(() => {
        if (!cancelled) {
          setServerRoom(null);
          setPriceError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setPriceLoading(false);
      });

    return () => { cancelled = true; };
  }, [apartmentId]);

  // при зміні апартаменту скидаємо обрані дати — ціни/зайнятість для них уже не актуальні
  useEffect(() => {
    setFrom("");
    setTo("");
  }, [apartmentId]);

  const effectiveRoom: ServerRoom = useMemo(
    () => serverRoom ?? { pricePerNight: 0, dayPrices: [], bookedRanges: [] },
    [serverRoom]
  );

  const dayPriceMap = useMemo(() => {
    const m: Record<string, number> = {};
    (effectiveRoom.dayPrices ?? []).forEach((dp) => { m[dp.date] = dp.price; });
    return m;
  }, [effectiveRoom]);

  const pricePerNight = serverRoom?.pricePerNight ?? null;

  const nights = nightsBetween(from, to);

  const totalPrice = useMemo(() => {
    if (!from || !to || nights <= 0 || pricePerNight === null) return 0;
    let total = 0;
    let cur = new Date(from);
    const end = new Date(to);
    while (cur < end) {
      total += dayPriceMap[isoDate(cur)] ?? pricePerNight;
      cur = addDays(cur, 1);
    }
    return total;
  }, [from, to, nights, dayPriceMap, pricePerNight]);

  const isBooked = useMemo(() => {
    if (!from || !to || nights <= 0) return false;
    const f = new Date(from), t = new Date(to);
    return (serverRoom?.bookedRanges ?? []).some((r) =>
      rangesOverlap(f, t, new Date(r.from), new Date(r.to))
    );
  }, [from, to, nights, serverRoom]);

  const setChildrenCount = (v: number) => {
    setChildren(v);
    setChildrenAges((prev) => {
      const ages = [...prev];
      if (v > ages.length) {
        while (ages.length < v) ages.push(0);
      } else {
        ages.length = v;
      }
      return ages;
    });
  };

  const setChildAge = (index: number, age: number) => {
    setChildrenAges((prev) => {
      const ages = [...prev];
      ages[index] = age;
      return ages;
    });
  };

  const handleCalSelect = (iso: string) => {
    if (selectingFrom || (from && to) || !from) {
      setFrom(iso); setTo(""); setSelectingFrom(false);
    } else {
      if (iso <= from) { setFrom(iso); setTo(""); return; }
      setTo(iso); setSelectingFrom(true); setCalOpen(false);
    }
  };

  const openCal = (isFrom: boolean) => { setSelectingFrom(isFrom); setCalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      setError("Bitte wählen Sie Anreise- und Abreisedatum.");
      return;
    }
    if (from >= to) {
      setError("Das Abreisedatum muss nach dem Anreisedatum liegen.");
      return;
    }
    if (isBooked) {
      setError("Für diesen Zeitraum ist das Apartment leider bereits belegt.");
      return;
    }

    setError(null);

    const apt = APARTMENTS.find((a) => a.id === apartmentId) ?? APARTMENTS[0];
    const params = new URLSearchParams({
      from,
      to,
      adults: String(adults),
      children: String(children),
      dog: String(hasDog),
    });

    if (childrenAges.length > 0) {
      params.set("childrenAges", childrenAges.join(","));
    }
    if (selectedDiscount) {
      params.set("discount", selectedDiscount.title);
    }
    if (selectedPackage) {
      params.set("package", selectedPackage.title);
    }

    setIsOpen(false);
    navigate(`${apt.path}?${params.toString()}`);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__overlay" onClick={() => setIsOpen(false)}></div>

          <div className="modal__content">
            <button className="modal__close" onClick={() => setIsOpen(false)}>
              ×
            </button>

            <h2 className="modal__title">Ihren Aufenthalt planen</h2>

            <form className="modal__form" onSubmit={handleSubmit}>
              <div className="modal__field">
                <label className="modal__label">Apartment</label>
                <select
                  className="modal__input"
                  value={apartmentId}
                  onChange={(e) => setApartmentId(e.target.value)}
                >
                  {APARTMENTS.map((a) => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>

              <div className="modal__field">
                <label className="modal__label">Zeitraum</label>
                <div className="rp-card__dates">
                  <div className="rp-card__date-field" onClick={() => openCal(true)}>
                    <span className="rp-card__date-label">ANREISE</span>
                    <span className={`rp-card__date-val ${from ? "" : "rp-card__date-val--placeholder"}`}>
                      {from ? fmtDate(from) : "Datum wählen"}
                    </span>
                  </div>
                  <div className="rp-card__date-sep">→</div>
                  <div className="rp-card__date-field" onClick={() => openCal(false)}>
                    <span className="rp-card__date-label">ABREISE</span>
                    <span className={`rp-card__date-val ${to ? "" : "rp-card__date-val--placeholder"}`}>
                      {to ? fmtDate(to) : "Datum wählen"}
                    </span>
                  </div>
                </div>

                {/* Календар рендериться прямо в потоці під полями дат
                    (не абсолютним попапом), щоб точно бути видимим
                    у скролованій модалці незалежно від верстки rp-card */}
                <AnimatePresence>
                  {calOpen && (
                    <CalendarPopup
                      room={effectiveRoom}
                      from={from}
                      to={to}
                      onSelect={handleCalSelect}
                      onClose={() => setCalOpen(false)}
                      selectingFrom={selectingFrom}
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="modal__price">
                {priceLoading ? (
                  <span className="modal__price-note">Preise werden geladen…</span>
                ) : priceError ? (
                  <span className="modal__price-note">
                    Aktueller Preis konnte nicht geladen werden.
                  </span>
                ) : (
                  <>
                    <span className="modal__price-per-night">
                      ab €{pricePerNight} / Nacht
                    </span>
                    {from && to && nights > 0 && (
                      <span className="modal__price-total">
                        {isBooked
                          ? "Für diesen Zeitraum leider belegt"
                          : `€${totalPrice} für ${nights} Nacht${nights !== 1 ? "e" : ""}`}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="modal__counter-row">
                <div className="modal__counter-field">
                  <span className="modal__label">Erwachsene</span>
                  <div className="modal__counter">
                    <button
                      type="button"
                      onClick={() => setAdults((v) => Math.max(1, v - 1))}
                      disabled={adults <= 1}
                    >
                      −
                    </button>
                    <span>{adults}</span>
                    <button type="button" onClick={() => setAdults((v) => v + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="modal__counter-field">
                  <span className="modal__label">Kinder</span>
                  <div className="modal__counter">
                    <button
                      type="button"
                      onClick={() => setChildrenCount(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      −
                    </button>
                    <span>{children}</span>
                    <button type="button" onClick={() => setChildrenCount(children + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              {children > 0 && (
                <div className="modal__ages">
                  {childrenAges.map((age, i) => (
                    <div className="modal__age-row" key={i}>
                      <span className="modal__age-label">Alter – Kind {i + 1}</span>
                      <select
                        className="modal__age-select"
                        value={age}
                        onChange={(e) => setChildAge(i, Number(e.target.value))}
                      >
                        {Array.from({ length: 18 }).map((_, a) => (
                          <option key={a} value={a}>{a} {a === 1 ? "Jahr" : "Jahre"}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              <div className="modal__field modal__field--dog">
                <div>
                  <span className="modal__label">🐕 Haustier</span>
                  <div className="modal__sublabel">Reisen Sie mit einem Hund?</div>
                </div>
                <button
                  type="button"
                  className={`modal__toggle ${hasDog ? "is-on" : ""}`}
                  onClick={() => setHasDog((v) => !v)}
                  aria-pressed={hasDog}
                >
                  <span className="modal__toggle-thumb" />
                </button>
              </div>

              <DiscountPicker
                discounts={discounts}
                selected={selectedDiscount}
                onChange={setSelectedDiscount}
                packages={packages}
                selectedPackage={selectedPackage}
                onPackageChange={setSelectedPackage}
                from={from}
                nights={nights}
              />

              {error && <p className="modal__error">{error}</p>}

              <button className="modal__submit" type="submit" disabled={isBooked}>
                Weiter zur Buchung
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickBookingModal;
