import { Discount } from "../types/Discount";
import { Package } from "../types/Package";

export type DiscountEligibility = {
  eligible: boolean;
  reason?: string;
  manualReview?: boolean;
};

function isInWinterRange(date: Date): boolean {
  const month = date.getMonth() + 1; // 1–12
  const day = date.getDate();

  const inChristmas = (month === 12 && day >= 24) || (month === 1 && day <= 6);
  const inEaster = month === 3 && day >= 20 && day <= 29;
  const inWinterMonths = month === 11 || month === 12 || month === 1 || month === 2 || month === 3;

  return inWinterMonths && !inChristmas && !inEaster;
}

export function checkDiscountEligibility(
  discount: Discount,
  { from, nights }: { from: string; nights: number }
): DiscountEligibility {
  if (!from || nights <= 0) {
    return { eligible: false, reason: "Bitte zuerst Reisedaten wählen." };
  }

  switch (discount.title) {
    case "Frühbucherrabatt": {
      const daysUntilArrival = Math.floor(
        (new Date(from).getTime() - Date.now()) / 86400000
      );
      return daysUntilArrival >= 30
        ? { eligible: true }
        : { eligible: false, reason: "Nur bei Buchung mindestens 30 Tage vor Anreise." };
    }

    case "Winterurlaub – eine Woche": {
      if (nights < 7) {
        return { eligible: false, reason: "Mindestens 7 Nächte erforderlich." };
      }
      return isInWinterRange(new Date(from))
        ? { eligible: true }
        : {
            eligible: false,
            reason: "Nur im Zeitraum 1. November – 31. März (außer Weihnachts- und Osterferien).",
          };
    }

    case "Langzeitaufenthalt 10–15 Tage":
      return nights >= 10 && nights <= 15
        ? { eligible: true }
        : { eligible: false, reason: "Gültig für einen Aufenthalt von 10–15 Nächten." };

    case "Langzeitaufenthalt 15–30 Tage":
      return nights >= 15 && nights <= 30
        ? { eligible: true }
        : { eligible: false, reason: "Gültig für einen Aufenthalt von 15–30 Nächten." };

    case "Zwei Apartments gleichzeitig":
    case "Zwischenstopp auf der Reise":
      return {
        eligible: true,
        manualReview: true,
        reason: "Wird nach Ihrer Anfrage manuell von uns geprüft und bestätigt.",
      };

    default:
      return { eligible: true };
  }
}

export function computeDiscountAmount(
  discount: Discount,
  totalPrice: number,
  nights: number
): number {
  if (discount.title === "Zwei Apartments gleichzeitig" || discount.title === "Zwischenstopp auf der Reise") {
    return 0;
  }

  const percentMatch = discount.badge.match(/(\d+)\s*%/);
  if (percentMatch) {
    const percent = Number(percentMatch[1]);
    return Math.round(totalPrice * (percent / 100));
  }

  if (discount.title === "Winterurlaub – eine Woche" && nights > 0) {
    return Math.round(totalPrice / nights);
  }

  return 0;
}

// ── Пакети (Packages) ────────────────────────────────────────────────────────
// Пакети не змінюють ціну — це бонуси (Prosecco, термальний вхід тощо),
// які включаються до бронювання за певних умов.
export function checkPackageEligibility(pkg: Package, nights: number): DiscountEligibility {
  if (nights <= 0) {
    return { eligible: false, reason: "Bitte zuerst Reisedaten wählen." };
  }

  switch (pkg.title) {
    case "Romantisches Wochenende zu zweit":
      return nights >= 2
        ? { eligible: true }
        : { eligible: false, reason: "Mindestens 2 Nächte erforderlich." };

    case "Kärntens beste Skigebiete in einem":
      return nights >= 6
        ? { eligible: true }
        : {
            eligible: true,
            reason: "Der Bonus (3 Std. Kärnten Therme + kostenlose Zwischenreinigung) gilt erst ab 6 Nächten.",
          };

    default:
      return { eligible: true };
  }
}
