import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { categories } from "./umgebungCategories";

// Категорії «Umgebung» з текстами обраної мови; німецький оригінал — запасний.
// mapQuery не перекладається (пошук у Google Maps).
export function useUmgebungCategories() {
  const { t, i18n } = useTranslation();

  return useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        title: t(`umgebung.${c.id}.title`, { defaultValue: c.title }),
        services: c.services.map((s) => ({
          ...s,
          name: t(`umgebung.${c.id}.${s.id}.name`, { defaultValue: s.name }),
          desc: t(`umgebung.${c.id}.${s.id}.desc`, { defaultValue: s.desc }),
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language]
  );
}
