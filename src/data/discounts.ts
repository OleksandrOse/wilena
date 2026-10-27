import { Discount } from "../types/Discount";
import { Package } from "../types/Package";

// id потрібен лише для перекладів; title лишається німецьким ідентифікатором
export type DiscountItem = Discount & { id: string };
export type PackageItem = Package & { id: string };

export const discounts: DiscountItem[] = [
  {
    id: "early",
    icon: "⏰",
    title: "Frühbucherrabatt",
    desc: "Bei Buchung mindestens 30 Tage vor Anreise.",
    badge: "–10%",
  },
  {
    id: "winter7",
    icon: "❄️",
    title: "Winterurlaub - 7 Nächte zum Preis von 6",
    desc: "Buchen Sie 7 Nächte und bezahlen Sie nur 6. Gültig vom 1. November bis 31. März, ausgenommen Weihnachts- und Osterferien.",
    badge: "7 Tage zum Preis von 6",
    note: "Ausgenommen: 24. Dezember bis 6. Januar sowie 20. März bis 29. März.",
  },
  {
    id: "twoApartments",
    icon: "🏘️",
    title: "Gemeinsam reisen - zwei Apartments buchen",
    desc: "Bei gleichzeitiger Buchung von zwei Apartments erhalten Sie 15 % Rabatt.",
    badge: "–15%",
  },
  {
    id: "stopover",
    icon: "🛣️",
    title: "Zwischenstopp auf Hin- und Rückreise",
    desc: "Buchen Sie jeweils 2 Nächte auf Ihrer Hin- und Rückreise und erhalten Sie 15 % Rabatt sowie eine Flasche Prosecco als Willkommensgruß.",
    badge: "–15% + 🍾",
  },
  {
    id: "long10",
    icon: "🗓️",
    title: "Langzeitaufenthalt - 10 bis 15 Nächte",
    desc: "Bei einem Aufenthalt von 10 bis 14 Nächten erhalten Sie 20 % Rabatt.",
    badge: "–20%",
  },
  {
    id: "long15",
    icon: "🗓️",
    title: "Langzeitaufenthalt - ab 15 Nächten ",
    desc: "Bei einem Aufenthalt ab 15 Nächten erhalten Sie 30 % Rabatt.",
    badge: "–30%",
  },
];

export const packages: PackageItem[] = [
  {
    id: "romantik",
    tag: "💑 Romantik-Paket",
    title: "Romantik-Paket",
    desc: "Ab 2 Übernachtungen buchbar.",
    includes: [
      "Flasche Prosecco",
      "Obstkorb",
      "zusätzliche Handtücher",
      "Saunapeeling",
    ],
  },
  {
    id: "ski",
    tag: "⛷️ Ski-Paket",
    title: "Skiurlaub im Herzen Kärntens",
    desc: "Gerlitzen Alpe, Nassfeld, Katschberg, Heiligenblut und Mölltaler Gletscher - mehrere der schönsten Skigebiete Kärntens sind von den Wilena Apartments bequem erreichbar. Bei einem Aufenthalt ab 6 Nächten erhalten Sie zusätzlich 3 Stunden freien Eintritt in die KärntenTherme sowie eine kostenlose Zwischenreinigung.",
    includes: [
      "3 Stunden Eintritt in die KärntenTherme inklusive",
      "Kostenlose Zwischenreinigung",
      "Angebot für 2 Erwachsene + max. 3 Kinder oder bis zu 4 Erwachsene",
    ],
    badge: "ab 6 Tagen",
  },
  {
    id: "birthday",
    tag: "🎂 Geburtstags-Paket",
    title: "Geburtstag bei Wilena",
    desc: "Feiern Sie Ihren besonderen Tag bei uns - wir sorgen für kleine Extras, die Ihren Aufenthalt noch schöner machen.",
    includes: [
      "Eine Flasche Prosecco oder alkoholfreier Sekt",
      "Kleine Geburtstagsüberraschung",
      "Süßigkeiten",
      "Late Check-out nach Verfügbarkeit",
    ],
  },
];
