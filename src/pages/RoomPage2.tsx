import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useOfferText } from "../data/useOfferText";
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
import { isoDate, addDays, nightsBetween, rangesOverlap, fmtDate, fetchRoomPricing } from "../utils/pricing";
import { ServerRoom } from "../services/serverRoomService";

const GOOD_TO_KNOW_KEYS = ["know1", "know2", "know3", "know4", "know5"] as const;

type AvailabilityStatus = "idle" | "available" | "unavailable" | "invalid";

const KURTAX_RATE_PER_NIGHT = 3;
const KURTAX_MIN_AGE = 17; 
const PET_FEE = 20;
const NR_DISCOUNT_RATE = 0.1; // Non-Refundable: 10 % auf den Übernachtungspreis

type RateType = "flexible" | "nonrefundable";

const round2 = (n: number) => Math.round(n * 100) / 100;
const eur = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

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
  const { t } = useTranslation();
  const months = t("quickBooking.months", { returnObjects: true }) as unknown as string[];
  const dayNames = t("quickBooking.days", { returnObjects: true }) as unknown as string[];
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
        <span>{selectingFrom ? t("quickBooking.pickArrival") : t("quickBooking.pickDeparture")}</span>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="rp-cal-popup__nav">
        <button onClick={() => setOffset(o => Math.max(0, o - 1))} disabled={offset === 0}>‹</button>
        <span>{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={() => setOffset(o => o + 1)}>›</button>
      </div>
      <div className="rp-cal-popup__grid">
        {dayNames.map(d => <div key={d} className="rp-cal-popup__dayname">{d}</div>)}
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
              {isBooked && <span className="rp-cal-popup__booked">{t("quickBooking.booked")}</span>}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function GuestPicker({ guests, onChange }: { guests: Guests; onChange: (g: Guests) => void }) {
  const { t } = useTranslation();
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
          <div className="rp-guests__trigger-label">{t("roomPage.guests")}</div>
          <div className="rp-guests__trigger-val">
            👥 {t("roomPage.guestCount", { count: total })} · {t("roomPage.adultsShort", { count: guests.adults })}{guests.children > 0 ? `, ${t("roomPage.childCount", { count: guests.children })}` : t("roomPage.abbrevDot")}
            {guests.hasDog ? ` · 🐕 ${t("roomPage.dogShort")}` : ""}
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
            {counter(t("roomPage.adults"), t("roomPage.adultsSub"), guests.adults, 1, v => onChange({ ...guests, adults: v }))}
            {counter(t("roomPage.children"), t("roomPage.childrenSub"), guests.children, 0, setChildrenCount)}

            {guests.children > 0 && (
              <div className="rp-guests__ages">
                {guests.childrenAges.map((age, i) => (
                  <div className="rp-guests__age-row" key={i}>
                    <span className="rp-guests__age-label">{t("quickBooking.childAge", { n: i + 1 })}</span>
                    <select
                      className="rp-guests__age-select"
                      value={age}
                      onChange={(e) => setChildAge(i, Number(e.target.value))}
                    >
                      {Array.from({ length: 18 }).map((_, a) => (
                        <option key={a} value={a}>{t("quickBooking.years", { count: a })}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="rp-guests__row rp-guests__row--dog">
              <div>
                <div className="rp-guests__label">🐕 {t("modalBooking.pet")}</div>
                <div className="rp-guests__sub">{t("quickBooking.dogQuestion")}</div>
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

// ── Rate Picker (Flexible / Non-Refundable) ───────────────────────────────────
function RatePicker({ value, onChange }: { value: RateType; onChange: (r: RateType) => void }) {
  const { t } = useTranslation();
  return (
    <div className="rp-rate">
      <div className="rp-rate__label">{t("roomPage.rate")}</div>

      <div className="rp-rate__options" role="radiogroup" aria-label={t("roomPage.chooseRate")}>
        <button
          type="button"
          role="radio"
          aria-checked={value === "flexible"}
          className={`rp-rate__option ${value === "flexible" ? "is-active" : ""}`}
          onClick={() => onChange("flexible")}
        >
          <span className="rp-rate__radio" />
          <span className="rp-rate__text">
            <span className="rp-rate__title">Flexible Rate</span>
            <span className="rp-rate__sub">{t("roomPage.flexSub")}</span>
          </span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={value === "nonrefundable"}
          className={`rp-rate__option ${value === "nonrefundable" ? "is-active" : ""}`}
          onClick={() => onChange("nonrefundable")}
        >
          <span className="rp-rate__radio" />
          <span className="rp-rate__text">
            <span className="rp-rate__title">
              Non-Refundable Rate
              <span className="rp-rate__badge">–10 %</span>
            </span>
            <span className="rp-rate__sub">{t("roomPage.nrSub")}</span>
          </span>
        </button>
      </div>

      <div className="rp-rate__terms">
        {value === "flexible" ? (
          <>
            <strong>{t("roomPage.flexTermsTitle")}</strong>
            <p>{t("roomPage.flexTermsText")}</p>
            <Link to="/stornobedingungen" target="_blank" rel="noopener noreferrer">
              {t("roomPage.flexTermsLink")}
            </Link>
          </>
        ) : (
          <>
            <strong>{t("roomPage.nrTermsTitle")}</strong>
            <p>{t("roomPage.nrTermsText")}</p>
            <Link to="/stornobedingungen" target="_blank" rel="noopener noreferrer">
              {t("roomPage.nrTermsLink")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

// ── Besondere Wünsche (optional) ──────────────────────────────────────────────
const WISHES_MAX = 1000;

function WishesField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const visible = open || value.length > 0;

  return (
    <div className="rp-wishes">
      {!visible ? (
        <button type="button" className="rp-wishes__toggle" onClick={() => setOpen(true)}>
          <span aria-hidden="true">+</span> <Trans i18nKey="roomPage.wishesAdd" components={{ em: <em /> }} />
        </button>
      ) : (
        <>
          <label className="rp-wishes__label" htmlFor="rp-wishes">
            <Trans i18nKey="roomPage.wishesLabel" components={{ em: <em /> }} />
          </label>
          <textarea
            id="rp-wishes"
            className="rp-wishes__input"
            rows={3}
            maxLength={WISHES_MAX}
            placeholder={t("roomPage.wishesPlaceholder")}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus={open && value.length === 0}
          />
          <div className="rp-wishes__meta">
            <span>{t("roomPage.wishesNote")}</span>
            <span>{value.length} / {WISHES_MAX}</span>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
interface RoomPage2Props { apartmentId?: string; }

const RoomPage2: React.FC<RoomPage2Props> = ({ apartmentId }) => {
  const { t } = useTranslation();
  const offerText = useOfferText();
  const navigate = useNavigate();
  const { aptId, roomId } = useParams();
  const id = apartmentId ?? aptId ?? roomId ?? "1";
  const room = ROOMS[id] ?? ROOMS["1"];
  const [searchParams] = useSearchParams();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [id]);

  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => setActiveImg(0), [id]);

  const [serverRoom, setServerRoom] = useState<ServerRoom | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPriceLoading(true);
    setPriceError(false);

    fetchRoomPricing(id).then((data) => {
      if (cancelled) return;
      if (data) {
        setServerRoom(data);
      } else {
        setServerRoom(null);
        setPriceError(true);
      }
      setPriceLoading(false);
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
  const [rateType, setRateType] = useState<RateType>("flexible");
  const [wishes, setWishes] = useState("");

  const nights = useMemo(() => (!from || !to) ? 0 : nightsBetween(new Date(from), new Date(to)), [from, to]);

  const totalPrice = useMemo(() => {
    if (!from || !to || nights <= 0) return 0;
    const dpMap: Record<string, number> = {};
    (effectiveRoom.dayPrices ?? []).forEach(dp => { dpMap[dp.date] = dp.price; });
    let total = 0; let cur = new Date(from); const end = new Date(to);
    while (cur < end) { total += dpMap[isoDate(cur)] ?? effectiveRoom.pricePerNight; cur = addDays(cur, 1); }
    return total;
  }, [from, to, nights, effectiveRoom]);

  const kurtaxPayers = useMemo(() => {
    const childrenPayers = guests.childrenAges.filter((age) => age >= KURTAX_MIN_AGE).length;
    return guests.adults + childrenPayers;
  }, [guests]);

  const kurtaxTotal = useMemo(() => {
    if (nights <= 0) return 0;
    return kurtaxPayers * nights * KURTAX_RATE_PER_NIGHT;
  }, [kurtaxPayers, nights]);

  const discountEligibility = useMemo(() => {
    if (!selectedDiscount) return null;
    return checkDiscountEligibility(selectedDiscount, { from, nights });
  }, [selectedDiscount, from, nights]);

  const discountAmount = useMemo(() => {
    if (!selectedDiscount || !discountEligibility?.eligible) return 0;
    return computeDiscountAmount(selectedDiscount, totalPrice, nights);
  }, [selectedDiscount, discountEligibility, totalPrice, nights]);

  const packageEligibility = useMemo(() => {
    if (!selectedPackage) return null;
    return checkPackageEligibility(selectedPackage, nights);
  }, [selectedPackage, nights]);

  const petFee = guests.hasDog ? PET_FEE : 0;

  const isNonRefundable = rateType === "nonrefundable";
  // −10 % nur auf den Übernachtungspreis (ohne Kurtaxe und Haustier-Gebühr)
  const rateDiscount = isNonRefundable ? round2(totalPrice * NR_DISCOUNT_RATE) : 0;

  const grandTotal = round2(totalPrice + kurtaxTotal + petFee - discountAmount - rateDiscount);

  // Non-Refundable ist nicht mit anderen Rabatten/Sonderangeboten kombinierbar
  const handleRateChange = (r: RateType) => {
    setRateType(r);
    if (r === "nonrefundable") {
      setSelectedDiscount(null);
      setSelectedPackage(null);
    }
  };

  const handleCalSelect = (iso: string) => {
    if (selectingFrom || (from && to) || !from) {
      setFrom(iso); setTo(""); setSelectingFrom(false); setStatus("idle");
    } else {
      if (iso <= from) { setFrom(iso); setTo(""); return; }
      setTo(iso); setSelectingFrom(true); setCalOpen(false);
    }
  };

  const openCal = (isFrom: boolean) => { setSelectingFrom(isFrom); setCalOpen(true); };

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
      petFee,
      rateType,
      rateDiscount: rateDiscount > 0 ? rateDiscount : undefined,
      discountTitle: selectedDiscount?.title,
      discountAmount: discountAmount > 0 ? discountAmount : undefined,
      discountManualReview: discountEligibility?.manualReview,
      wishes: wishes.trim() || undefined,
      grandTotal,
    };
  }, [status, from, to, nights, id, room.name, guests, effectiveRoom.pricePerNight, totalPrice, kurtaxTotal, petFee, rateType, rateDiscount, wishes, selectedDiscount, discountAmount, discountEligibility, grandTotal]);

  useEffect(() => {
    const qFrom = searchParams.get("from");
    const qTo = searchParams.get("to");
    const qAdults = searchParams.get("adults");
    const qChildren = searchParams.get("children");
    const qDog = searchParams.get("dog");
    const qChildrenAges = searchParams.get("childrenAges");
    const qDiscount = searchParams.get("discount");
    const qPackage = searchParams.get("package");
    const qRate = searchParams.get("rate");
    const nonRefundableFromUrl = qRate === "nonrefundable";
    if (nonRefundableFromUrl) setRateType("nonrefundable");

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

    if (qDiscount && !nonRefundableFromUrl) {
      const d = discounts.find((x) => x.title === qDiscount);
      if (d) setSelectedDiscount(d);
    }
    if (qPackage && !nonRefundableFromUrl) {
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
        <button className="rp-hero__back" onClick={() => navigate(-1)}>← {t("common.back")}</button>

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
              <div className="rp-stat"><span>🏠</span><strong>{room.size} m²</strong><span>{t("roomPage.area")}</span></div>
              <div className="rp-stat"><span>👥</span><strong><strong>{t("roomPage.upTo")}</strong> {room.capacity}</strong><span>{t("roomPage.guestsCot")}</span></div>
              <div className="rp-stat"><span>🛏️</span><strong>{room.bedrooms}</strong><span>{t("roomPage.rooms")}</span></div>
              <div className="rp-stat"><span>🅿️</span><strong>&nbsp;</strong><span>{t("roomPage.parking")}</span></div>
            </motion.div>
            <motion.div className="rp-divider" variants={fadeUp} />
            <motion.h2 className="rp-section-title" variants={fadeUp}>{t("roomPage.about")}</motion.h2>
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
                  {priceLoading ? "…" : t("roomPage.fromPrice", { price: effectiveRoom.pricePerNight })}
                </span>
                <span className="rp-card__price-label">{t("roomPage.perNightSlash")}</span>
              </div>
              {priceError && (
                <p className="rp-card__price-note">
                  {t("roomPage.priceError")}
                </p>
              )}

              <div className="rp-card__dates">
                <div className="rp-card__date-field" onClick={() => openCal(true)}>
                  <span className="rp-card__date-label">{t("quickBooking.arrival")}</span>
                  <span className={`rp-card__date-val ${from ? "" : "rp-card__date-val--placeholder"}`}>
                    {from ? fmtDate(from) : t("quickBooking.pickDate")}
                  </span>
                </div>
                <div className="rp-card__date-sep">→</div>
                <div className="rp-card__date-field" onClick={() => openCal(false)}>
                  <span className="rp-card__date-label">{t("quickBooking.departure")}</span>
                  <span className={`rp-card__date-val ${to ? "" : "rp-card__date-val--placeholder"}`}>
                    {to ? fmtDate(to) : t("quickBooking.pickDate")}
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

              <RatePicker value={rateType} onChange={handleRateChange} />

              {isNonRefundable ? (
                <p className="rp-rate__nodiscount">
                  {t("roomPage.nrNoDiscount")}
                </p>
              ) : (
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
              )}

              <WishesField value={wishes} onChange={setWishes} />

              <AnimatePresence>
                {from && to && nights > 0 && (
                  <motion.div className="rp-card__summary"
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="rp-card__summary-row">
                      <span>€{effectiveRoom.pricePerNight} × {t("modalBooking.nights", { count: nights })}</span>
                      <span>€{totalPrice}</span>
                    </div>
                    <div className="rp-card__summary-row">
                      <span>{t("roomPage.taxRow", { persons: kurtaxPayers, nightsText: t("modalBooking.nights", { count: nights }) })}</span>
                      <span>€{kurtaxTotal}</span>
                    </div>
                    {guests.hasDog && (
                      <div className="rp-card__summary-row">
                        <span>🐕 {t("modalBooking.pet")}</span>
                        <span>€{petFee}</span>
                      </div>
                    )}
                    {isNonRefundable && rateDiscount > 0 && (
                      <div className="rp-card__summary-row">
                        <span>{t("modalBooking.nrDiscount")}</span>
                        <span>–€{eur(rateDiscount)}</span>
                      </div>
                    )}
                    {selectedDiscount && discountEligibility?.eligible && (
                      <div className="rp-card__summary-row">
                        <span>{selectedDiscount.icon} {offerText.discount(selectedDiscount).title}</span>
                        <span>{discountAmount > 0 ? `–€${discountAmount}` : t("roomPage.underReview")}</span>
                      </div>
                    )}
                    {selectedPackage && (
                      <div className="rp-card__summary-row">
                        <span>{offerText.pkg(selectedPackage).tag}</span>
                        <span>{t("roomPage.included")}</span>
                      </div>
                    )}
                    <div className="rp-card__summary-total">
                      <span>{t("modalBooking.total")}</span>
                      <strong>€{eur(grandTotal)}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="rp-card__btn" onClick={handleBookClick}>{t("common.bookNow")}</button>

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
                    {t("roomPage.errInvalid")}
                  </motion.p>
                )}
                {status === "unavailable" && (
                  <motion.p key="unav" className="rp-card__msg rp-card__msg--err"
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {t("roomPage.errUnavailable")}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="rp-card__note">{t("roomPage.directNote")}</p>
            </motion.div>
          </div>

        </div>{/* end rp-middle */}

        <div className="rp-full">
          <motion.h2 className="rp-section-title"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {t("roomPage.amenities")}
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
            {t("roomPage.goodToKnow")}
          </motion.h2>
          <motion.div className="rp-know"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <ul className="rp-know__list">
              {GOOD_TO_KNOW_KEYS.map((k) => (
                <li key={k}>{t(`roomPage.${k}`)}</li>
              ))}
            </ul>
            <div className="rp-know__links">
              <Link to="/hausordnung">{t("roomPage.houseRulesLink")}</Link>
              <Link to="/stornobedingungen">{t("roomPage.flexTermsLink")}</Link>
            </div>
          </motion.div>
        </div>

        <div className="rp-full">
          <motion.h2 className="rp-section-title"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {t("roomPage.floorplan")}
          </motion.h2>
          <motion.div className="rp-floorplan"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            {id === "2" ? <FloorPlan172 /> : <FloorPlan166 />}
          </motion.div>
        </div>
        <Contact title={t("roomPage.contactTitle")} />
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
