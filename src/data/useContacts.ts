import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { contacts } from "./contacts";

// Контакти з текстами обраної мови. Німецькі значення з contacts.ts — запасні.
export function useContacts() {
  const { t, i18n } = useTranslation();

  return useMemo(
    () =>
      contacts.map((c) => ({
        ...c,
        title: t(`contacts.${c.id}.title`, { defaultValue: c.title }),
        subtitle: c.subtitle
          ? t(`contacts.${c.id}.subtitle`, { defaultValue: c.subtitle })
          : undefined,
        lines: c.lines.map((line, i) =>
          t(`contacts.${c.id}.line${i}`, { defaultValue: line })
        ),
        linkLabel: t(`contacts.${c.id}.linkLabel`, { defaultValue: c.linkLabel }),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n.language]
  );
}
