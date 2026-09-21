import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";
import { checkDiscountEligibility, checkPackageEligibility } from "../utils/discountUtils";

type Props = {
  discounts: Discount[];
  selected: Discount | null;
  onChange: (d: Discount | null) => void;
  packages: Package[];
  selectedPackage: Package | null;
  onPackageChange: (p: Package | null) => void;
  from: string;
  nights: number;
};

const DiscountPicker: React.FC<Props> = ({
  discounts, selected, onChange,
  packages, selectedPackage, onPackageChange,
  from, nights,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggleDiscount = (d: Discount) => {
    onChange(selected?.title === d.title ? null : d);
  };

  const togglePackage = (p: Package) => {
    onPackageChange(selectedPackage?.title === p.title ? null : p);
  };

  const triggerLabel = [selected?.title, selectedPackage?.title].filter(Boolean).join(" + ");

  return (
    <div className="rp-discount" ref={ref}>
      <button className="rp-discount__trigger" type="button" onClick={() => setOpen(o => !o)}>
        <div>
          <div className="rp-discount__trigger-label">Rabatte &amp; Pakete</div>
          <div className="rp-discount__trigger-val">
            {triggerLabel || "Nichts ausgewählt"}
          </div>
        </div>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="rp-discount__dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <div className="rp-discount__group-label">Rabatte</div>
            {discounts.map((d) => {
              const eligibility = checkDiscountEligibility(d, { from, nights });
              const isChecked = selected?.title === d.title;
              return (
                <label
                  key={d.title}
                  className={[
                    "rp-discount__option",
                    isChecked ? "is-active" : "",
                    !eligibility.eligible ? "is-disabled" : "",
                  ].filter(Boolean).join(" ")}
                >
                  <input
                    type="checkbox"
                    className="rp-discount__checkbox"
                    checked={isChecked}
                    onChange={() => toggleDiscount(d)}
                  />
                  <span className="rp-discount__option-title">{d.title}</span>
                </label>
              );
            })}

            <div className="rp-discount__group-label">Pakete</div>
            {packages.map((p) => {
              const eligibility = checkPackageEligibility(p, nights);
              const isChecked = selectedPackage?.title === p.title;
              return (
                <label
                  key={p.title}
                  className={[
                    "rp-discount__option",
                    isChecked ? "is-active" : "",
                    !eligibility.eligible ? "is-disabled" : "",
                  ].filter(Boolean).join(" ")}
                >
                  <input
                    type="checkbox"
                    className="rp-discount__checkbox"
                    checked={isChecked}
                    onChange={() => togglePackage(p)}
                  />
                  <span className="rp-discount__option-title">{p.title}</span>
                </label>
              );
            })}

            <Link to="/angebote" className="rp-discount__link" onClick={() => setOpen(false)}>
              Alle Angebote ansehen →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscountPicker;
