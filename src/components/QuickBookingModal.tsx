import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscountPicker from "./DiscountPicker";
import { discounts, packages } from "../data/discounts";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";
import "../styles/ModalBooking.scss";
import "../styles/RoomPage2.scss"; // для стилів .rp-discount, які використовує DiscountPicker

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const APARTMENTS = [
  { id: "1", label: "Apartment 166", path: "/apartment1" },
  { id: "2", label: "Apartment 172", path: "/apartment2" },
];

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
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

  const nights = nightsBetween(from, to);

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

              <div className="modal__field-row">
                <div className="modal__field">
                  <label className="modal__label">Anreise</label>
                  <input
                    className="modal__input"
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  />
                </div>
                <div className="modal__field">
                  <label className="modal__label">Abreise</label>
                  <input
                    className="modal__input"
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  />
                </div>
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

              <button className="modal__submit" type="submit">
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
