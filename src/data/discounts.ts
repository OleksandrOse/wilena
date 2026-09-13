import { Discount } from "../types/Discount";
import { Package } from "../types/Package";

export const discounts: Discount[] = [
  {
    icon: "⏰",
    title: "Frühbucherrabatt",
    desc: "Bei Buchung mindestens 30 Tage vor Anreise.",
    badge: "–10%",
  },
  {
    icon: "❄️",
    title: "Winterurlaub – eine Woche",
    desc: "Sechs Tage Aufenthalt buchen, der siebte Tag ist gratis. Gültig nur im angegebenen Zeitraum.",
    badge: "7 Tage zum Preis von 6",
    note: "Zeitraum: 1. November bis 31. März, außer Weihnachtsferien(24.December bis 6.Januar) und Osterferien(20.März bis 29.März)",
  },
  {
    icon: "🏘️",
    title: "Zwei Apartments gleichzeitig",
    desc: "Bei gleichzeitiger Buchung von zwei Apartments.",
    badge: "–15%",
  },
  {
    icon: "🛣️",
    title: "Zwischenstopp auf der Reise",
    desc: "Bei Buchung von zwei Übernachtungen auf dem Hin- und Rückweg erhalten Sie zusätzlichen Rabatt und eine Flasche Prosecco als Willkommensgeschenk.",
    badge: "–15% + 🍾",
  },
  {
    icon: "🗓️",
    title: "Langzeitaufenthalt 10–15 Tage",
    desc: "Bei einer Aufenthaltsdauer von 10 bis 15 Tagen.",
    badge: "–20%",
  },
  {
    icon: "🗓️",
    title: "Langzeitaufenthalt 15–30 Tage",
    desc: "Bei einer Aufenthaltsdauer von 15 bis 30 Tagen.",
    badge: "–30%",
  },
];

export const packages: Package[] = [
  {
    tag: "💑 Romantik-Paket",
    title: "Romantisches Wochenende zu zweit",
    desc: "Ab mindestens 2 Nächten Aufenthalt.",
    includes: [
      "Flasche Prosecco",
      "Obstkorb",
      "Doppeltes Therme- und Saunahandtuch",
      "Saunapeeling",
    ],
  },
  {
    tag: "⛷️ Ski-Paket",
    title: "Kärntens beste Skigebiete in einem",
    desc: "Gerlitzen Alpe, Nassfeld, Katschberg, Heiligenblut und Mölltaler Gletscher — alle bequem erreichbar. Bei einer Buchung von mindestens 6 Tagen erhalten Sie freien Eintritt für 3 Stunden in die Kärnten Therme sowie eine kostenlose Zwischenreinigung. Das Angebot gilt für 2 Erwachsene und max. 3 Kinder oder 4 Erwachsene.",
    includes: [
      "3 Std. freier Eintritt Kärnten Therme",
      "Kostenlose Zwischenreinigung",
      "Für 2 Erw. + max. 3 Kinder oder 4 Erw.",
    ],
    badge: "ab 6 Tagen",
  },
  {
    tag: "🎂 Geburtstags-Paket",
    title: "Geburtstag in den Wilena Apartments",
    desc: "Feiern Sie Ihren besonderen Tag bei uns.",
    includes: [
      "Flasche Prosecco",
      "Kindersekt",
      "Süßigkeiten",
      "Späte Abreise",
    ],
  },
];