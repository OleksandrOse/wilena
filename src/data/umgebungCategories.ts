// Дані «Umgebung». Німецькі тексти — оригінал без змін; id — ключі для перекладу.
export const categories = [
  {
    id: "shopping",
    title: "Einkaufsmöglichkeiten",
    icon: "🛒",
    services: [
      { id: "billa", name: "Billa", desc: "Villacher Schächtestraße 33 — Supermarkt in Gehnähe.", mapQuery: "Billa Villacher Schächtestraße 33, Villach" },
      { id: "atrio", name: "Einkaufszentrum ATRIO", desc: "Großes Einkaufszentrum mit zahlreichen Geschäften und Food Courts.", mapQuery: "Einkaufszentrum ATRIO, Villach" },
    ],
  },
  {
    id: "food",
    title: "Essen",
    icon: "🍽️",
    services: [
      { id: "atrioFood", name: "ATRIO Villach", desc: "Vielfältige Food Courts im Einkaufszentrum.", mapQuery: "ATRIO Villach" },
      { id: "gasser", name: "Gasthof Gasser", desc: "Traditionelle Kärntner Küche.", mapQuery: "Gasthof Gasser, Villach" },
      { id: "sterierhof", name: "Villacher Sterierhof", desc: "Gemütliches Gasthaus mit regionaler Küche.", mapQuery: "Villacher Sterierhof, Villach" },
      { id: "caldarium", name: "Caldarium", desc: "Restaurant mit italienisch inspirierter Küche.", mapQuery: "Caldarium Restaurant, Villach" },
      { id: "haikky", name: "HAIKKY Asia Cooking Villach", desc: "Asiatische Küche mitten in Villach.", mapQuery: "HAIKKY Asia Cooking, Villach" },
      { id: "fruhmann", name: "Gasthaus Fruhmann", desc: "Klassisches Kärntner Gasthaus.", mapQuery: "Gasthaus Fruhmann, Villach" },
      { id: "brauhof", name: "Villacher Brauhof", desc: "Regionale Küche und hausgebrautes Bier.", mapQuery: "Villacher Brauhof, Villach" },
      { id: "warmbaderhof", name: "Konditorei & Restaurant Hotel Warmbaderhof", desc: "Feine Konditorei direkt bei der Therme.", mapQuery: "Hotel Warmbaderhof, Villach" },
    ],
  },
  {
    id: "trips",
    title: "Ausflugsziele",
    icon: "🗺️",
    services: [
      { id: "villach", name: "Villach Stadt", desc: "Historische Altstadt mit Draufuß-Promenade.", mapQuery: "Villach Altstadt" },
      { id: "klagenfurt", name: "Klagenfurt Stadt", desc: "Landeshauptstadt Kärntens am Wörthersee.", mapQuery: "Klagenfurt" },
      { id: "velden", name: "Velden am Wörthersee", desc: "Bekannter Seeort mit mondänem Flair.", mapQuery: "Velden am Wörthersee" },
      { id: "poertschach", name: "Pörtschach am Wörthersee", desc: "Elegante Seepromenade und Badestrände.", mapQuery: "Pörtschach am Wörthersee" },
      { id: "grossglockner", name: "Großglockner Hochalpenstraße", desc: "Österreichs berühmteste Panoramastraße.", mapQuery: "Großglockner Hochalpenstraße" },
      { id: "alpenstrasse", name: "Villacher Alpenstraße", desc: "Aussichtsstraße mit Panoramablick über Villach.", mapQuery: "Villacher Alpenstraße" },
      { id: "weissensee", name: "Weissensee", desc: "Kristallklarer Bergsee, idyllisch gelegen.", mapQuery: "Weissensee, Kärnten" },
      { id: "maltatal", name: "Maltatal", desc: "Malerisches Tal mit Stauseen und Wasserfällen.", mapQuery: "Maltatal, Kärnten" },
      { id: "tarvisio", name: "Tarvisio (Italien)", desc: "Grenznaher Ausflug nach Italien.", mapQuery: "Tarvisio, Italien" },
      { id: "kranjska", name: "Kranjska Gora (Slowenien)", desc: "Grenznaher Ausflug nach Slowenien.", mapQuery: "Kranjska Gora, Slowenien" },
    ],
  },
  {
    id: "transport",
    title: "Transportmittel",
    icon: "🚆",
    services: [
      { id: "klu", name: "Flughafen Klagenfurt", desc: "Nächstgelegener Flughafen, ca. 30 Autominuten entfernt.", mapQuery: "Flughafen Klagenfurt" },
      { id: "lju", name: "Internationaler Flughafen Ljubljana", desc: "Alternative Anreise aus Slowenien, 85 km , ca 1 Stunde entfernt.", mapQuery: "Flughafen Ljubljana" },
      { id: "hbf", name: "Hauptbahnhof Villach", desc: "Zentraler Bahnhof mit nationalen und internationalen Verbindungen.", mapQuery: "Hauptbahnhof Villach" },
      { id: "warmbad", name: "Bahnhof Villach Warmbad", desc: "Lokaler Bahnhof in unmittelbarer Nähe der Apartments.", mapQuery: "Bahnhof Villach Warmbad" },
      { id: "bus", name: "Bushaltestelle Villach Jesenfeldrein", desc: "Nächstgelegene Bushaltestelle für den lokalen Nahverkehr.", mapQuery: "Bushaltestelle Villach Jesenfeldrein" },
    ],
  },
];
