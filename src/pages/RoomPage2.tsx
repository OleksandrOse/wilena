import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { FloorPlan166 } from "../components/FloorPlan166";
import { FloorPlan172 } from "../components/FloorPlan172";
import { ROOMS } from "../data/rooms";
import { Guests } from "../types/Guests";
import { CalProps } from "../types/Calprops";
import { fadeUp, stagger } from "../utils/animations";
import "../styles/RoomPage2.scss";
import Contact from "../components/Contact";
import ModalBooking, { BookingSummary } from "../components/ModalBooking";
import ModalThankYou from "../components/ModalThankYou";
import DiscountPicker from "../components/DiscountPicker";
import { discounts, packages } from "../data/discounts";
import { checkDiscountEligibility, checkPackageEligibility, computeDiscountAmount } from "../utils/discountUtils";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";

type AvailabilityStatus = "idle" | "available" | "unavailable" | "invalid";

const API_URL = "http://localhost:8080";

// Курортний збір (Kurtaxe) — підправте ставку та вік під ваші реальні умови
const KURTAX_RATE_PER_NIGHT = 3; // € за особу за ніч
const KURTAX_MIN_AGE = 15; // діти молодше цього віку не платять

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function nightsBetween(a: Date, b: Date) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
function rangesOverlap(aF: Date, aT: Date, bF: Date, bT: Date) { return aF <= bT && bF <= aT; }
function fmtDate(iso: string) { const [y, m, d] = iso.split("-"); return `${d}.${m}.${y}`; }

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

// ── Calendar Popup ────────────────────────────────────────────────────────────
function CalendarPopup({ room, from, to, onSelect, onClose, selectingFrom }: CalProps) {
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
    (room.dayPrices ?? []).forEach(dp => { m[dp.date] = dp.price; });
    return m;
  }, [room]);

  const bookedSet = useMemo(() => {
    const s = new Set<string>();
    room.bookedRanges.forEach(({ from: bf, to: bt }) => {
      let cur = new Date(bf); const end = new Date(bt);
      while (cur <= end) { s.add(isoDate(cur)); cur = addDays(cur, 1); }
    });
    return s;
  }, [room]);

  const inRange = (iso: string) => from && to && iso > from && iso < to;

  return (
    <motion.div className="rp-cal-popup" ref={ref}
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
        <button onClick={() => setOffset(o => Math.max(0, o - 1))} disabled={offset === 0}>‹</button>
        <span>{MONTHS_DE[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={() => setOffset(o => o + 1)}>›</button>
      </div>
      <div className="rp-cal-popup__grid">
        {DAYS_DE.map(d => <div key={d} className="rp-cal-popup__dayname">{d}</div>)}
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

function GuestPicker({ guests, onChange }: { guests: Guests; onChange: (g: Guests) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const total = guests.adults + guests.children;

  const setChildrenCount = (v: number) => {
    const ages = [...guests.childrenAges];
    if (v > ages.length) {
      while (ages.length < v) ages.push(0);
    } else {
      ages.length = v;
    }
    onChange({ ...guests, children: v, childrenAges: ages });
  };

  const setChildAge = (index: number, age: number) => {
    const ages = [...guests.childrenAges];
    ages[index] = age;
    onChange({ ...guests, childrenAges: ages });
  };

  const counter = (label: string, sub: string, val: number, min: number, fn: (v: number) => void) => (
    <div className="rp-guests__row">
      <div><div className="rp-guests__label">{label}</div><div className="rp-guests__sub">{sub}</div></div>
      <div className="rp-guests__counter">
        <button onClick={() => fn(Math.max(min, val - 1))} disabled={val <= min}>−</button>
        <span>{val}</span>
        <button onClick={() => fn(val + 1)}>+</button>
      </div>
    </div>
  );

  return (
    <div className="rp-guests" ref={ref}>
      <button className="rp-guests__trigger" onClick={() => setOpen(o => !o)}>
        <div>
          <div className="rp-guests__trigger-label">Gäste</div>
          <div className="rp-guests__trigger-val">
            👥 {total} Gast{total !== 1 ? "e" : ""} · {guests.adults} Erw{guests.children > 0 ? `, ${guests.children} Kind${guests.children !== 1 ? "er" : ""}` : "."}
            {guests.hasDog ? " · 🐕 Hund" : ""}
          </div>
        </div>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="rp-guests__dropdown"
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
          >
            {counter("Erwachsene", "Ab 18 Jahren", guests.adults, 1, v => onChange({ ...guests, adults: v }))}
            {counter("Kinder", "0–17 Jahre", guests.children, 0, setChildrenCount)}

            {guests.children > 0 && (
              <div className="rp-guests__ages">
                {guests.childrenAges.map((age, i) => (
                  <div className="rp-guests__age-row" key={i}>
                    <span className="rp-guests__age-label">Alter – Kind {i + 1}</span>
                    <select
                      className="rp-guests__age-select"
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

            <div className="rp-guests__row rp-guests__row--dog">
              <div>
                <div className="rp-guests__label">🐕 Haustier</div>
                <div className="rp-guests__sub">Reisen Sie mit einem Hund?</div>
              </div>
              <button
                type="button"
                className={`rp-guests__toggle ${guests.hasDog ? "is-on" : ""}`}
                onClick={() => onChange({ ...guests, hasDog: !guests.hasDog })}
                aria-pressed={guests.hasDog}
              >
                <span className="rp-guests__toggle-thumb" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface RoomPage2Props { apartmentId?: string; }

const RoomPage2: React.FC<RoomPage2Props> = ({ apartmentId }) => {
  const navigate = useNavigate();
  const { aptId, roomId } = useParams();
  const id = apartmentId ?? aptId ?? roomId ?? "1";
  const room = ROOMS[id] ?? ROOMS["1"];
  const [searchParams] = useSearchParams();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [id]);

  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => setActiveImg(0), [id]);

  // ── Актуальна ціна з сервера ──────────────────────────────────────────────
  const [serverRoom, setServerRoom] = useState<{
    pricePerNight: number;
    dayPrices?: { date: string; price: number }[];
    bookedRanges?: { from: string; to: string }[];
  } | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPriceLoading(true);
    setPriceError(false);

    fetch(`${API_URL}/rooms/${id}`)
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
  }, [id]);

  const effectiveRoom = useMemo(() => ({
    ...room,
    pricePerNight: serverRoom?.pricePerNight ?? room.pricePerNight,
    dayPrices: serverRoom?.dayPrices ?? room.dayPrices,
    bookedRanges: serverRoom?.bookedRanges ?? room.bookedRanges,
  }), [room, serverRoom]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0, childrenAges: [], hasDog: false });
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [calOpen, setCalOpen] = useState(false);
  const [selectingFrom, setSelectingFrom] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const nights = useMemo(() => (!from || !to) ? 0 : nightsBetween(new Date(from), new Date(to)), [from, to]);

  const totalPrice = useMemo(() => {
    if (!from || !to || nights <= 0) return 0;
    const dpMap: Record<string, number> = {};
    (effectiveRoom.dayPrices ?? []).forEach(dp => { dpMap[dp.date] = dp.price; });
    let total = 0; let cur = new Date(from); const end = new Date(to);
    while (cur < end) { total += dpMap[isoDate(cur)] ?? effectiveRoom.pricePerNight; cur = addDays(cur, 1); }
    return total;
  }, [from, to, nights, effectiveRoom]);

  // ── Курортний збір (Kurtaxe) ──────────────────────────────────────────────
  const kurtaxPayers = useMemo(() => {
    const childrenPayers = guests.childrenAges.filter((age) => age >= KURTAX_MIN_AGE).length;
    return guests.adults + childrenPayers;
  }, [guests]);

  const kurtaxTotal = useMemo(() => {
    if (nights <= 0) return 0;
    return kurtaxPayers * nights * KURTAX_RATE_PER_NIGHT;
  }, [kurtaxPayers, nights]);

  // ── Знижка ─────────────────────────────────────────────────────────────────
  const discountEligibility = useMemo(() => {
    if (!selectedDiscount) return null;
    return checkDiscountEligibility(selectedDiscount, { from, nights });
  }, [selectedDiscount, from, nights]);

  const discountAmount = useMemo(() => {
    if (!selectedDiscount || !discountEligibility?.eligible) return 0;
    return computeDiscountAmount(selectedDiscount, totalPrice, nights);
  }, [selectedDiscount, discountEligibility, totalPrice, nights]);

  // ── Пакет (бонус, не впливає на ціну) ────────────────────────────────────
  const packageEligibility = useMemo(() => {
    if (!selectedPackage) return null;
    return checkPackageEligibility(selectedPackage, nights);
  }, [selectedPackage, nights]);

  const grandTotal = totalPrice + kurtaxTotal - discountAmount;

  const handleCalSelect = (iso: string) => {
    if (selectingFrom || (from && to) || !from) {
      setFrom(iso); setTo(""); setSelectingFrom(false); setStatus("idle");
    } else {
      if (iso <= from) { setFrom(iso); setTo(""); return; }
      setTo(iso); setSelectingFrom(true); setCalOpen(false);
    }
  };

  const openCal = (isFrom: boolean) => { setSelectingFrom(isFrom); setCalOpen(true); };

  // ── Перевірка доступності + одразу відкриття модалки бронювання ──────────
  const handleBookClick = () => {
    if (!from || !to || nights <= 0) {
      setStatus("invalid");
      return;
    }
    const f = new Date(from), t = new Date(to);
    const booked = effectiveRoom.bookedRanges.some(r =>
      rangesOverlap(f, t, new Date(r.from), new Date(r.to))
    );
    if (booked) {
      setStatus("unavailable");
      return;
    }
    setStatus("available");
    setBookingOpen(true);
  };

  const bookingSummary: BookingSummary | null = useMemo(() => {
    if (status !== "available" || !from || !to || nights <= 0) return null;
    return {
      roomId: id,
      roomName: room.name,
      dateFrom: from,
      dateTo: to,
      nights,
      guests,
      pricePerNight: effectiveRoom.pricePerNight,
      roomTotal: totalPrice,
      kurtaxTotal,
      discountTitle: selectedDiscount?.title,
      discountAmount: discountAmount > 0 ? discountAmount : undefined,
      discountManualReview: discountEligibility?.manualReview,
      packageTitle: selectedPackage?.title,
      packageIncludes: selectedPackage?.includes,
      grandTotal,
    };
  }, [status, from, to, nights, id, room.name, guests, effectiveRoom.pricePerNight, totalPrice, kurtaxTotal, selectedDiscount, discountAmount, discountEligibility, selectedPackage, grandTotal]);

  useEffect(() => {
    const qFrom = searchParams.get("from");
    const qTo = searchParams.get("to");
    const qAdults = searchParams.get("adults");
    const qChildren = searchParams.get("children");
    const qDog = searchParams.get("dog");
    const qChildrenAges = searchParams.get("childrenAges");
    const qDiscount = searchParams.get("discount");
    const qPackage = searchParams.get("package");

    if (qFrom) setFrom(qFrom);
    if (qTo) setTo(qTo);

    if (qAdults || qChildren || qDog || qChildrenAges) {
      setGuests((g) => {
        const ages = qChildrenAges
          ? qChildrenAges.split(",").map((n) => Number(n) || 0)
          : g.childrenAges;
        return {
          ...g,
          adults: qAdults ? Number(qAdults) : g.adults,
          children: qChildren ? Number(qChildren) : (qChildrenAges ? ages.length : g.children),
          childrenAges: ages,
          hasDog: qDog ? qDog === "true" : g.hasDog,
        };
      });
    }

    if (qDiscount) {
      const d = discounts.find((x) => x.title === qDiscount);
      if (d) setSelectedDiscount(d);
    }
    if (qPackage) {
      const p = packages.find((x) => x.title === qPackage);
      if (p) setSelectedPackage(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="room-page">
      <Header />

      <div className="rp-hero">
        <img src={room.images[0]} alt={room.name} className="rp-hero__img" />
        <div className="rp-hero__gradient" />
        <button className="rp-hero__back" onClick={() => navigate(-1)}>← Zurück</button>

        <div className="rp-hero__breadcrumbs">
          <Breadcrumbs />
        </div>

        <div className="rp-hero__title-bar">
          <div>{/* ... */}</div>
        </div>
      </div>

      <div className="rp-content">

        <div className="rp-top">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.span className="rp-tag" variants={fadeUp}>Wilena Apartments · Villach Warmbad</motion.span>
            <motion.h1 className="rp-title" variants={fadeUp}>{room.name}</motion.h1>
            <motion.p className="rp-tagline" variants={fadeUp}>{room.tagline}</motion.p>
            <motion.div className="rp-stats" variants={fadeUp}>
              <div className="rp-stat"><span>🏠</span><strong>{room.size} m²</strong><span>Fläche</span></div>
              <div className="rp-stat"><span>👥</span><strong><strong>bis</strong> {room.capacity}</strong><span>Gäste + Gitterbett</span></div>
              <div className="rp-stat"><span>🛏️</span><strong>{room.bedrooms}</strong><span>Zimmer</span></div>
              <div className="rp-stat"><span>🅿️</span><strong>&nbsp;</strong><span>Parkplatz inklusive</span></div>
            </motion.div>
            <motion.div className="rp-divider" variants={fadeUp} />
            <motion.h2 className="rp-section-title" variants={fadeUp}>Über dieses Apartment</motion.h2>
            <motion.p className="rp-desc" variants={fadeUp}>{room.description}</motion.p>
          </motion.div>
        </div>

        <div className="rp-middle">

          <div className="rp-carousel">
            <div className="rp-carousel__main">
              <div
                key={`bg-${activeImg}`}
                className="rp-carousel__bg"
                style={{ backgroundImage: `url(${room.images[activeImg]})` }}
              />
              <div className="rp-carousel__scrim" />
              <img
                key={activeImg}
                src={room.images[activeImg]}
                alt={`${room.name} ${activeImg + 1}`}
                className="rp-carousel__img"
              />
              {activeImg > 0 && (
                <button className="rp-carousel__arr rp-carousel__arr--l" onClick={() => setActiveImg(i => i - 1)}>‹</button>
              )}
              {activeImg < room.images.length - 1 && (
                <button className="rp-carousel__arr rp-carousel__arr--r" onClick={() => setActiveImg(i => i + 1)}>›</button>
              )}
              <div className="rp-carousel__counter">{activeImg + 1} / {room.images.length}</div>
            </div>
            <div className="rp-carousel__thumbs-wrap">
              <div className="rp-carousel__thumbs">
                {room.images.map((src, i) => (
                  <div key={i}
                    className={`rp-carousel__thumb ${i === activeImg ? "is-active" : ""}`}
                    style={{ backgroundImage: `url(${src})` }}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BOOKING CARD справа */}
          <div className="rp-right">
            <motion.div className="rp-card"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rp-card__price">
                <span className="rp-card__price-num">
                  {priceLoading ? "…" : `ab €${effectiveRoom.pricePerNight}`}
                </span>
                <span className="rp-card__price-label">/ Nacht</span>
              </div>
              {priceError && (
                <p className="rp-card__price-note">
                  Aktueller Preis konnte nicht geladen werden — es wird ein Richtpreis angezeigt.
                </p>
              )}

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

              <div className="rp-card__cal-wrap">
                <AnimatePresence>
                  {calOpen && (
                    <CalendarPopup room={effectiveRoom} from={from} to={to}
                      onSelect={handleCalSelect} onClose={() => setCalOpen(false)}
                      selectingFrom={selectingFrom} />
                  )}
                </AnimatePresence>
              </div>

              <GuestPicker guests={guests} onChange={setGuests} />

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

              <AnimatePresence>
                {from && to && nights > 0 && (
                  <motion.div className="rp-card__summary"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="rp-card__summary-row">
                      <span>€{effectiveRoom.pricePerNight} × {nights} Nacht{nights !== 1 ? "e" : ""}</span>
                      <span>€{totalPrice}</span>
                    </div>
                    <div className="rp-card__summary-row">
                      <span>Kurtaxe · {kurtaxPayers} Pers. × {nights} Nacht{nights !== 1 ? "e" : ""}</span>
                      <span>€{kurtaxTotal}</span>
                    </div>
                    {selectedDiscount && discountEligibility?.eligible && (
                      <div className="rp-card__summary-row">
                        <span>{selectedDiscount.icon} {selectedDiscount.title}</span>
                        <span>{discountAmount > 0 ? `–€${discountAmount}` : "wird geprüft"}</span>
                      </div>
                    )}
                    {selectedPackage && (
                      <div className="rp-card__summary-row">
                        <span>{selectedPackage.tag}</span>
                        <span>inklusive</span>
                      </div>
                    )}
                    <div className="rp-card__summary-total">
                      <span>Gesamt</span>
                      <strong>€{grandTotal}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="rp-card__btn" onClick={handleBookClick}>Jetzt buchen</button>

              {selectedDiscount && discountEligibility && !discountEligibility.eligible && (
                <p className="rp-card__discount-warn">{discountEligibility.reason}</p>
              )}
              {selectedPackage && packageEligibility?.reason && (
                <p className="rp-card__discount-warn">{packageEligibility.reason}</p>
              )}

              <AnimatePresence mode="wait">
                {status === "invalid" && (
                  <motion.p key="inv" className="rp-card__msg rp-card__msg--err"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Bitte wählen Sie gültige Daten aus.
                  </motion.p>
                )}
                {status === "unavailable" && (
                  <motion.p key="unav" className="rp-card__msg rp-card__msg--err"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Leider für diese Daten bereits belegt.
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="rp-card__note">Direktbuchung, keine zusätzlichen Gebühren</p>
            </motion.div>
          </div>

        </div>{/* end rp-middle */}

        <div className="rp-full">
          <motion.h2 className="rp-section-title"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            Ausstattung
          </motion.h2>
          <motion.div className="rp-amenities"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          >
            {room.amenities.map(a => (
              <motion.div key={a.label} className="rp-amenity" variants={fadeUp}>
                <span className="rp-amenity__icon">{a.icon}</span>
                <span className="rp-amenity__label">{a.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="rp-full">
          <motion.h2 className="rp-section-title"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            Grundriss
          </motion.h2>
          <motion.div className="rp-floorplan"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {id === "2" ? <FloorPlan172 /> : <FloorPlan166 />}
          </motion.div>
        </div>
        <Contact title=" diesem Apartment" />
      </div>

      <Footer />

      <ModalBooking
        isOpen={bookingOpen}
        setIsOpen={setBookingOpen}
        summary={bookingSummary}
        onSuccess={() => setThankYouOpen(true)}
      />

      <ModalThankYou
        isOpen={thankYouOpen}
        setIsOpen={setThankYouOpen}
      />
    </div>
  );
};

export default RoomPage2;
