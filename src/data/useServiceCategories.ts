import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { categories } from "./serviceCategories";

// Категорії сервісів з текстами обраної мови; німецький оригінал — запасний.
export function useServiceCategories() {
  const { t, i18n } = useTranslation();

  return useMemo(
    () =>
      categories.map((c) => ({
        ...c,
        title: t(`service.${c.id}.title`, { defaultValue: c.title }),
        subtitle: c.subtitle
          ? t(`service.${c.id}.subtitle`, { defaultValue: c.subtitle })
          : undefined,
        services: c.services.map((s) => ({
          ...s,
          name: t(`service.${c.id}.${s.id}.name`, { defaultValue: s.name }),
          desc: t(`service.${c.id}.${s.id}.desc`, { defaultValue: s.desc }),
        })),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language]
  );
}
