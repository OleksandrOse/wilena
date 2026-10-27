import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { categories } from "./categories";

// Повертає ті ж категорії, але з текстами обраної мови.
// Німецький текст у serviceCategories.ts залишається запасним.
export function useCategories() {
  const { t, i18n } = useTranslation();

  return useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        title: t(`freizeit.${c.id}.title`, { defaultValue: c.title }),
        services: c.services.map((s) => ({
          ...s,
          name: t(`freizeit.${c.id}.${s.id}.name`, { defaultValue: s.name }),
          desc: t(`freizeit.${c.id}.${s.id}.desc`, { defaultValue: s.desc }),
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language]
  );
}
