import { useTranslation } from "react-i18next";
import { discounts, packages } from "./discounts";

type AnyDiscount = { id?: string; title: string; desc: string; badge?: string; note?: string };
type AnyPackage = {
  id?: string;
  tag: string;
  title: string;
  desc: string;
  badge?: string;
  includes: string[];
};

// Повертає тексти знижок/пакетів обраною мовою ДЛЯ ВІДОБРАЖЕННЯ.
// Оригінальні об'єкти (і їхній німецький title) не змінюються: за title
// знижка визначається в URL, розрахунках та листах.
export function useOfferText() {
  const { t } = useTranslation();

  const discount = (d: AnyDiscount) => {
    const id = d.id ?? discounts.find((x) => x.title === d.title)?.id;
    if (!id) return { title: d.title, desc: d.desc, badge: d.badge, note: d.note };
    const k = `offers.discounts.${id}`;
    return {
      title: t(`${k}.title`, { defaultValue: d.title }),
      desc: t(`${k}.desc`, { defaultValue: d.desc }),
      badge: d.badge ? t(`${k}.badge`, { defaultValue: d.badge }) : undefined,
      note: d.note ? t(`${k}.note`, { defaultValue: d.note }) : undefined,
    };
  };

  const pkg = (p: AnyPackage) => {
    const id = p.id ?? packages.find((x) => x.title === p.title)?.id;
    if (!id) return { tag: p.tag, title: p.title, desc: p.desc, badge: p.badge, includes: p.includes };
    const k = `offers.packages.${id}`;
    const inc = t(`${k}.includes`, { returnObjects: true, defaultValue: p.includes });
    return {
      tag: t(`${k}.tag`, { defaultValue: p.tag }),
      title: t(`${k}.title`, { defaultValue: p.title }),
      desc: t(`${k}.desc`, { defaultValue: p.desc }),
      badge: p.badge ? t(`${k}.badge`, { defaultValue: p.badge }) : undefined,
      includes: Array.isArray(inc) ? (inc as string[]) : p.includes,
    };
  };

  return { discount, pkg };
}
