import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Discount } from "../types/Discount";
import { Package } from "../types/Package";
import { useOfferText } from "../data/useOfferText";
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
  const { t } = useTranslation();
  const text = useOfferText();
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

  const triggerLabel = [
    selected ? text.discount(selected).title : undefined,
    selectedPackage ? text.pkg(selectedPackage).title : undefined,
  ].filter(Boolean).join(" + ");

  return (
    <div className="rp-discount" ref={ref}>
      <button className="rp-discount__trigger" type="button" onClick={() => setOpen(o => !o)}>
        <div>
          <div className="rp-discount__trigger-label">{t("discountPicker.label")}</div>
          <div className="rp-discount__trigger-val">
            {triggerLabel || t("discountPicker.none")}
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
            <div className="rp-discount__group-label">{t("discountPicker.discounts")}</div>
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
                  <span className="rp-discount__option-title">{text.discount(d).title}</span>
                </label>
              );
            })}

            <div className="rp-discount__group-label">{t("discountPicker.packages")}</div>
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
                  <span className="rp-discount__option-title">{text.pkg(p).title}</span>
                </label>
              );
            })}

            <Link to="/angebote" className="rp-discount__link" onClick={() => setOpen(false)}>
              {t("discountPicker.allOffers")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscountPicker;
