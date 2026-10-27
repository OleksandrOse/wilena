import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import DiscountPicker from "./DiscountPicker";
import { discounts, packages } from "../data/discounts";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";
import "../styles/ModalBooking.scss";
import "../styles/RoomPage2.scss";
import { APARTMENTS } from "../data/apartments";
import { ServerRoom } from "../services/serverRoomService";
import { addDays, buildNightlyPrices, fetchRoomPricing, fmtDate, isoDate, rangesOverlap } from "../utils/pricing";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

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
      style={{ position: "relative", top: "auto", left: "auto", right: "auto", marginTop: 10, zIndex: 20 }}
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
        <button onClick={() => setOffset((o) => Math.max(0, o - 1))} disabled={offset === 0}>‹</button>
        <span>{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={() => setOffset((o) => o + 1)}>›</button>
      </div>
      <div className="rp-cal-popup__grid">
        {dayNames.map((d) => <div key={d} className="rp-cal-popup__dayname">{d}</div>)}
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

const QuickBookingModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
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

  const [serverRoom, setServerRoom] = useState<ServerRoom | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setPriceLoading(true);
    setPriceError(false);

    fetchRoomPricing(apartmentId).then((data) => {
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
  }, [apartmentId, isOpen]);

  useEffect(() => {
    setFrom("");
    setTo("");
  }, [apartmentId]);

  const effectiveRoom: ServerRoom = useMemo(
    () => serverRoom ?? { pricePerNight: 0, dayPrices: [], bookedRanges: [] },
    [serverRoom]
  );

  const pricePerNight = serverRoom?.pricePerNight ?? null;

  const nights = nightsBetween(from, to);

  const totalPrice = useMemo(() => {
    if (!from || !to || nights <= 0) return 0;
    const nightly = buildNightlyPrices(from, to, effectiveRoom);
    return nightly.reduce((sum, n) => sum + n.price, 0);
  }, [from, to, nights, effectiveRoom]);

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
      setError(t("quickBooking.errDates"));
      return;
    }
    if (from >= to) {
      setError(t("quickBooking.errOrder"));
      return;
    }
    if (isBooked) {
      setError(t("quickBooking.errBooked"));
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
            <button className="modal__close" aria-label={t("common.close")} onClick={() => setIsOpen(false)}>
              ×
            </button>

            <h2 className="modal__title">{t("quickBooking.title")}</h2>

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
                <label className="modal__label">{t("quickBooking.period")}</label>
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
                  <span className="modal__price-note">{t("modalBooking.loadingPrices")}</span>
                ) : priceError ? (
                  <span className="modal__price-note">
                    {t("quickBooking.priceError")}
                  </span>
                ) : (
                  <>
                    <span className="modal__price-per-night">
                      {t("quickBooking.from", { price: pricePerNight })}
                    </span>
                    {from && to && nights > 0 && (
                      <span className="modal__price-total">
                        {isBooked
                          ? t("quickBooking.unavailable")
                          : t("quickBooking.totalFor", { total: totalPrice, count: nights })}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div className="modal__counter-row">
                <div className="modal__counter-field">
                  <span className="modal__label">{t("quickBooking.adults")}</span>
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
                  <span className="modal__label">{t("quickBooking.children")}</span>
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
                      <span className="modal__age-label">{t("quickBooking.childAge", { n: i + 1 })}</span>
                      <select
                        className="modal__age-select"
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

              <div className="modal__field modal__field--dog">
                <div>
                  <span className="modal__label">🐕 {t("modalBooking.pet")}</span>
                  <div className="modal__sublabel">{t("quickBooking.dogQuestion")}</div>
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
                {t("quickBooking.next")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickBookingModal;
