import { motion, Variants, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/RoomPage2.scss";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

type DayPrice = { date: string; price: number };
interface Room {
  id: string; name: string; tagline: string; images: string[];
  description: string; size: number; capacity: number; bedrooms: number;
  pricePerNight: number; dayPrices?: DayPrice[];
  amenities: { icon: string; label: string }[];
  bookedRanges: { from: string; to: string }[];
}

const ROOMS: Record<string, Room> = {
  "1": {
    id: "1", name: "2 Zimmer Apartment",
    tagline: "Modernes Apartment im Herzen von Villach Warmbad — nur 5 Gehminuten von der Villacher Therme entfernt.",
    images: [
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00013.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00010.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00011.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00012.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00014.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00015.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00016.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00004.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00005.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00006.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00007.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00008.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00009.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00017.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00018.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00019.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00020.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00021.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00022.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00023.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00024.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00025.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00026.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00027.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00028.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00029.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00030.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00031.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00032.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00033.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00003.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00002.jpeg`,
    ],
    description: "Geräumiges und modern eingerichtetes Apartment mit privatem Balkon und herrlichem Blick auf die Kärntner Bergwelt. Warme Holzböden, eine vollausgestattete Küche und ein gemütlicher Wohnbereich schaffen die Atmosphäre eines echten Zuhauses inmitten der Alpen.",
    size: 52, capacity: 4, bedrooms: 2, pricePerNight: 120,
    dayPrices: [
      { date: "2026-08-01", price: 140 }, { date: "2026-08-02", price: 140 },
      { date: "2026-08-15", price: 150 }, { date: "2026-08-16", price: 150 },
    ],
    amenities: [
      { icon: "🏔️", label: "Bergblick" }, { icon: "🛏️", label: "2 Schlafzimmer" },
      { icon: "🍳", label: "Vollküche" }, { icon: "📶", label: "Gratis WLAN" },
      { icon: "🅿️", label: "Parkplatz" }, { icon: "❄️", label: "Klimaanlage" },
      { icon: "🌿", label: "Balkon" }, { icon: "♨️", label: "Therme 5 min" },
    ],
    bookedRanges: [{ from: "2026-07-20", to: "2026-07-27" }, { from: "2026-08-10", to: "2026-08-18" }],
  },
  "2": {
    id: "2", name: "2 Zimmer Apartment",
    tagline: "Familienfreundliches Apartment mit kostenlosem Fahrradverleih — ideal für einen aktiven Alpenurlaub.",
    images: [
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/1.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/2.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/3.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/4.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/5.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/6.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/7.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/8.jpeg`,
       `${process.env.PUBLIC_URL}/Wilena/Apartment2/9.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/10.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/11.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/12.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/13.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/14.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/15.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/16.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/17.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/18.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/19.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/20.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/21.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/22.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/23.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/24.jpeg`,
       `${process.env.PUBLIC_URL}/Wilena/Apartment2/25.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/26.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/27.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/28.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/29.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/30.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/31.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/32.jpeg`,
    ],
    description: "Großzügiges Familienappartement mit zwei Schlafzimmern, einem hellen Wohnbereich und einer großen Terrasse. Fahrräder und E-Bikes stehen direkt im Haus zur Verfügung — perfekt, um die Seen und Radwege Kärntens zu erkunden. Die Villacher Warmbad-Therme ist zu Fuß erreichbar.",
    size: 68, capacity: 6, bedrooms: 2, pricePerNight: 160,
    dayPrices: [
      { date: "2026-08-01", price: 180 }, { date: "2026-08-02", price: 180 },
      { date: "2026-08-15", price: 195 }, { date: "2026-08-16", price: 195 },
    ],
    amenities: [
      { icon: "🏔️", label: "Bergblick" }, { icon: "🛏️", label: "2 Schlafzimmer" },
      { icon: "🍳", label: "Vollküche" }, { icon: "📶", label: "Gratis WLAN" },
      { icon: "🅿️", label: "Parkplatz" }, { icon: "🚴", label: "Fahrradverleih" },
      { icon: "🌿", label: "Terrasse" }, { icon: "♨️", label: "Therme 5 min" },
    ],
    bookedRanges: [{ from: "2026-07-15", to: "2026-07-22" }, { from: "2026-08-05", to: "2026-08-12" }],
  },
};

type AvailabilityStatus = "idle" | "available" | "unavailable" | "invalid";

function isoDate(d: Date) { return d.toISOString().slice(0, 10); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function nightsBetween(a: Date, b: Date) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
function rangesOverlap(aF: Date, aT: Date, bF: Date, bT: Date) { return aF <= bT && bF <= aT; }
function fmtDate(iso: string) { const [y,m,d]=iso.split("-"); return `${d}.${m}.${y}`; }

const MONTHS_DE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const DAYS_DE = ["Mo","Di","Mi","Do","Fr","Sa","So"];

function buildMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7;
  const cells: (Date|null)[] = [];
  for (let i=0;i<startDay;i++) cells.push(null);
  for (let d=1;d<=last.getDate();d++) cells.push(new Date(year,month,d));
  while (cells.length%7!==0) cells.push(null);
  const rows:(Date|null)[][]=[];
  for (let i=0;i<cells.length;i+=7) rows.push(cells.slice(i,i+7));
  return rows;
}

// ── Calendar Popup ────────────────────────────────────────────────────────────
interface CalProps { room: Room; from: string; to: string; onSelect:(iso:string)=>void; onClose:()=>void; selectingFrom: boolean; }
function CalendarPopup({ room, from, to, onSelect, onClose, selectingFrom }: CalProps) {
  const today = new Date();
  const [offset, setOffset] = useState(0);
  const viewDate = new Date(today.getFullYear(), today.getMonth()+offset, 1);
  const matrix = buildMatrix(viewDate.getFullYear(), viewDate.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  const dayPriceMap = useMemo(() => {
    const m: Record<string,number> = {};
    (room.dayPrices??[]).forEach(dp => { m[dp.date]=dp.price; });
    return m;
  }, [room]);

  const bookedSet = useMemo(() => {
    const s = new Set<string>();
    room.bookedRanges.forEach(({from:bf,to:bt}) => {
      let cur = new Date(bf); const end = new Date(bt);
      while(cur<=end){s.add(isoDate(cur));cur=addDays(cur,1);}
    });
    return s;
  }, [room]);

  const inRange = (iso: string) => from && to && iso>from && iso<to;

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
        <button onClick={()=>setOffset(o=>Math.max(0,o-1))} disabled={offset===0}>‹</button>
        <span>{MONTHS_DE[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button onClick={()=>setOffset(o=>o+1)}>›</button>
      </div>
      <div className="rp-cal-popup__grid">
        {DAYS_DE.map(d=><div key={d} className="rp-cal-popup__dayname">{d}</div>)}
        {matrix.flat().map((date,i) => {
          if(!date) return <div key={i} className="rp-cal-popup__cell rp-cal-popup__cell--empty"/>;
          const iso = isoDate(date);
          const isPast = date < today;
          const isBooked = bookedSet.has(iso);
          const isFrom = iso===from; const isTo = iso===to;
          const price = dayPriceMap[iso]??room.pricePerNight;
          return (
            <button key={iso} disabled={isPast||isBooked} onClick={()=>onSelect(iso)}
              className={["rp-cal-popup__cell",
                isPast?"rp-cal-popup__cell--past":"",
                isBooked?"rp-cal-popup__cell--booked":"",
                (isFrom||isTo)?"rp-cal-popup__cell--selected":"",
                inRange(iso)?"rp-cal-popup__cell--range":"",
              ].filter(Boolean).join(" ")}
            >
              <span className="rp-cal-popup__day">{date.getDate()}</span>
              {!isPast&&!isBooked&&<span className="rp-cal-popup__price">€{price}</span>}
              {isBooked&&<span className="rp-cal-popup__booked">Belegt</span>}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Guest Picker ──────────────────────────────────────────────────────────────
interface Guests { adults: number; children: number; }
function GuestPicker({guests,onChange}:{guests:Guests;onChange:(g:Guests)=>void}) {
  const [open,setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);
  const total = guests.adults+guests.children;
  const counter=(label:string,sub:string,val:number,min:number,fn:(v:number)=>void)=>(
    <div className="rp-guests__row">
      <div><div className="rp-guests__label">{label}</div><div className="rp-guests__sub">{sub}</div></div>
      <div className="rp-guests__counter">
        <button onClick={()=>fn(Math.max(min,val-1))} disabled={val<=min}>−</button>
        <span>{val}</span>
        <button onClick={()=>fn(val+1)}>+</button>
      </div>
    </div>
  );
  return (
    <div className="rp-guests" ref={ref}>
      <button className="rp-guests__trigger" onClick={()=>setOpen(o=>!o)}>
        <div>
          <div className="rp-guests__trigger-label">Gäste</div>
          <div className="rp-guests__trigger-val">
            👥 {total} Gast{total!==1?"¨e":""} · {guests.adults} Erw{guests.children>0?`, ${guests.children} Kind${guests.children!==1?"er":""}`:"."}
          </div>
        </div>
        <span>{open?"▲":"▼"}</span>
      </button>
      <AnimatePresence>
        {open&&(
          <motion.div className="rp-guests__dropdown"
            initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-6}} transition={{duration:0.15}}
          >
            {counter("Erwachsene","Ab 18 Jahren",guests.adults,1,v=>onChange({...guests,adults:v}))}
            {counter("Kinder","0–17 Jahre",guests.children,0,v=>onChange({...guests,children:v}))}
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

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [id]);

  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => setActiveImg(0), [id]);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [calOpen, setCalOpen] = useState(false);
  const [selectingFrom, setSelectingFrom] = useState(true);

  const nights = useMemo(() => (!from||!to)?0:nightsBetween(new Date(from),new Date(to)), [from,to]);

  const totalPrice = useMemo(() => {
    if(!from||!to||nights<=0) return 0;
    const dpMap: Record<string,number> = {};
    (room.dayPrices??[]).forEach(dp=>{dpMap[dp.date]=dp.price;});
    let total=0; let cur=new Date(from); const end=new Date(to);
    while(cur<end){total+=dpMap[isoDate(cur)]??room.pricePerNight;cur=addDays(cur,1);}
    return total;
  }, [from,to,nights,room]);

  const handleCalSelect = (iso: string) => {
    if(selectingFrom||(from&&to)||!from) {
      setFrom(iso); setTo(""); setSelectingFrom(false); setStatus("idle");
    } else {
      if(iso<=from){setFrom(iso);setTo("");return;}
      setTo(iso); setSelectingFrom(true); setCalOpen(false);
    }
  };

  const openCal = (isFrom: boolean) => { setSelectingFrom(isFrom); setCalOpen(true); };

  const check = () => {
    if(!from||!to||nights<=0){setStatus("invalid");return;}
    const f=new Date(from),t=new Date(to);
    const booked=room.bookedRanges.some(r=>rangesOverlap(f,t,new Date(r.from),new Date(r.to)));
    setStatus(booked?"unavailable":"available");
  };

  return (
    <div className="room-page">
      <Header />

      {/* ── HERO (перше фото, cover) ── */}
      <div className="rp-hero">
        <img src={room.images[0]} alt={room.name} className="rp-hero__img" />
        <div className="rp-hero__gradient" />
        <button className="rp-hero__back" onClick={() => navigate(-1)}>← Zurück</button>
        <div className="rp-hero__title-bar">
          <div>
            <div className="rp-hero__apt-name">{room.name}</div>
            {/* <div className="rp-hero__apt-sub">Villach Warmbad · Österreich</div> */}
          </div>
          {/* <div className="rp-hero__apt-price">
            <span>ab €{room.pricePerNight}</span>
            <span>pro Nacht</span>
          </div> */}
        </div>
      </div>

      <div className="rp-content">

        {/* ── ВЕРХ: назва + опис ── */}
        <div className="rp-top">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}>
            <motion.span className="rp-tag" variants={fadeUp}>Apartment · Villach Warmbad</motion.span>
            <motion.h1 className="rp-title" variants={fadeUp}>{room.name}</motion.h1>
            <motion.p className="rp-tagline" variants={fadeUp}>{room.tagline}</motion.p>
            <motion.div className="rp-stats" variants={fadeUp}>
              <div className="rp-stat"><span>🏠</span><strong>{room.size} m²</strong><span>Fläche</span></div>
              <div className="rp-stat"><span>👥</span><strong>{room.capacity}</strong><span>Gäste</span></div>
              <div className="rp-stat"><span>🛏️</span><strong>{room.bedrooms}</strong><span>Schlafzimmer</span></div>
              <div className="rp-stat"><span>🌙</span><strong>ab €{room.pricePerNight}</strong><span>pro Nacht</span></div>
            </motion.div>
            <motion.div className="rp-divider" variants={fadeUp} />
            <motion.h2 className="rp-section-title" variants={fadeUp}>Über dieses Apartment</motion.h2>
            <motion.p className="rp-desc" variants={fadeUp}>{room.description}</motion.p>
          </motion.div>
        </div>

        {/* ── СЕРЕДИНА: карусель (тепер full-bleed) + картка справа ── */}
        <div className="rp-middle">

          {/* КАРУСЕЛЬ — full-bleed на всю ширину екрана, замість чорних полів — розмитий фон */}
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
          {/* <div className="rp-right">
            <motion.div className="rp-card"
              initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
              transition={{duration:0.6,delay:0.2}}
            >
              <div className="rp-card__price">
                <span className="rp-card__price-num">ab €{room.pricePerNight}</span>
                <span className="rp-card__price-label">/ Nacht</span>
              </div>

              <div className="rp-card__dates">
                <div className="rp-card__date-field" onClick={()=>openCal(true)}>
                  <span className="rp-card__date-label">ANREISE</span>
                  <span className={`rp-card__date-val ${from?"":"rp-card__date-val--placeholder"}`}>
                    {from ? fmtDate(from) : "Datum wählen"}
                  </span>
                </div>
                <div className="rp-card__date-sep">→</div>
                <div className="rp-card__date-field" onClick={()=>openCal(false)}>
                  <span className="rp-card__date-label">ABREISE</span>
                  <span className={`rp-card__date-val ${to?"":"rp-card__date-val--placeholder"}`}>
                    {to ? fmtDate(to) : "Datum wählen"}
                  </span>
                </div>
              </div>

              <div className="rp-card__cal-wrap">
                <AnimatePresence>
                  {calOpen && (
                    <CalendarPopup room={room} from={from} to={to}
                      onSelect={handleCalSelect} onClose={()=>setCalOpen(false)}
                      selectingFrom={selectingFrom} />
                  )}
                </AnimatePresence>
              </div>

              <GuestPicker guests={guests} onChange={setGuests} />

              <AnimatePresence>
                {from && to && nights > 0 && (
                  <motion.div className="rp-card__summary"
                    initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
                  >
                    <div className="rp-card__summary-row">
                      <span>ab €{room.pricePerNight} × {nights} Nacht{nights!==1?"¨e":""}</span>
                      <span>€{totalPrice}</span>
                    </div>
                    <div className="rp-card__summary-total">
                      <span>Gesamt vor Steuern</span>
                      <strong>€{totalPrice}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="rp-card__btn" onClick={check}>Verfügbarkeit prüfen</button>

              <AnimatePresence mode="wait">
                {status==="invalid" && (
                  <motion.p key="inv" className="rp-card__msg rp-card__msg--err"
                    initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                    Bitte wählen Sie gültige Daten aus.
                  </motion.p>
                )}
                {status==="unavailable" && (
                  <motion.p key="unav" className="rp-card__msg rp-card__msg--err"
                    initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                    Leider für diese Daten bereits belegt.
                  </motion.p>
                )}
                {status==="available" && (
                  <motion.div key="av" className="rp-card__msg rp-card__msg--ok"
                    initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                    <span>✓</span>
                    <div>
                      <p>Verfügbar für {nights} Nacht{nights!==1?"¨e":""}!</p>
                      <p>Gesamtpreis: €{totalPrice}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="rp-card__note">Keine Buchungsgebühr · Kostenlose Stornierung</p>
            </motion.div>
          </div> */}

        </div>{/* end rp-middle */}

        {/* ── AUSSTATTUNG ── */}
        <div className="rp-full">
          <motion.h2 className="rp-section-title"
            initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}
          >
            Ausstattung
          </motion.h2>
          <motion.div className="rp-amenities"
            initial="hidden" whileInView="visible" viewport={{once:true}} variants={stagger}
          >
            {room.amenities.map(a=>(
              <motion.div key={a.label} className="rp-amenity" variants={fadeUp}>
                <span className="rp-amenity__icon">{a.icon}</span>
                <span className="rp-amenity__label">{a.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>{/* end rp-content */}

      <Footer />
    </div>
  );
};

export default RoomPage2;
