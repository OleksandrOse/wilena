export type ServiceEntry = { id: string; name: string; desc: string };
export type ServiceCategory = { id: string; title: string; subtitle?: string; icon: string; services: ServiceEntry[] };

export const categories: ServiceCategory[] = [
  {
    id: "flex",
    title: "Flexible An- und Abreise",
    icon: "🕓",
    services: [
      { id: "early", name: "Early Check-in", desc: "Nach Verfügbarkeit und vorheriger Absprache möglich." },
      { id: "late", name: "Late Check-out", desc: "Nach Verfügbarkeit und vorheriger Absprache möglich." },
    ],
  },
  {
    id: "transfer",
    title: "Transfer",
    icon: "🚐",
    services: [
      { id: "airport", name: "Flughafentransfers", desc: "Transfer vom und zum Flughafen Klagenfurt oder Ljubljana auf Anfrage." },
      { id: "station", name: "Bahnhoftransfers", desc: "Abholung vom Villach Hauptbahnhof oder Bahnhof Villach Warmbad auf Anfrage." },
      { id: "pickup", name: "Individuelle Abholung", desc: "Persönliche Abholung nach Vereinbarung und zu Ihrer gewünschten Uhrzeit." },
    ],
  },
  {
    id: "tours",
    title: "Geführte Ausflüge",
    icon: "🧭",
    services: [
      { id: "custom", name: "Individuelle Ausflüge", desc: "Auf Wunsch organisieren wir individuelle Ausflüge zu ausgewählten Zielen in Kärnten, Italien und Slowenien." },
      { id: "hiking", name: "Geführte Wanderungen", desc: "Geführte Wanderungen in den Kärntner Bergen auf Anfrage." },
      { id: "city", name: "Städtetouren", desc: "Individuelle Touren durch Villach, Klagenfurt und weitere ausgewählte Orte." },
    ],
  },
  {
    id: "laundry",
    title: "Wäsche & Bügelservice",
    icon: "🧺",
    services: [
      { id: "laundry", name: "Wäscheservice", desc: "Waschen und Bügeln Ihrer Wäsche auf Wunsch und gegen Aufpreis." },
    ],
  },
  {
    id: "cleaning",
    title: "Reinigung",
    icon: "🧹",
    services: [
      { id: "extra", name: "Zusätzliche Reinigung", desc: "Zusätzliche Reinigung des Apartments während Ihres Aufenthalts auf Anfrage." },
    ],
  },
  {
    id: "pets",
    title: "Haustiere",
    icon: "🐕",
    services: [
      { id: "stay", name: "Aufenthalt mit Haustier", desc: "Haustiere sind nach vorheriger Absprache und gegen Aufpreis willkommen." },
      { id: "care", name: "Haustierbetreuung", desc: "Stundenweise Betreuung Ihres Haustieres während Ihrer Ausflüge auf Anfrage." },
    ],
  },
  {
    id: "shopping",
    title: "Einkaufen",
    icon: "🛒",
    services: [
      { id: "shop", name: "Einkaufsservice", desc: "Gerne erledigen wir Ihre Einkäufe vor Ihrer Anreise oder während Ihres Aufenthalts." },
      { id: "fridge", name: "Gefüllter Kühlschrank bei Anreise", desc: "Auf Wunsch stellen wir vor Ihrer Ankunft eine Grundausstattung an Lebensmitteln bereit." },
      { id: "drinks", name: "Getränkeservice", desc: "Auf Wunsch stellen wir vor Ihrer Anreise Getränke nach Wahl im Apartment bereit." },
    ],
  },
  {
    id: "car",
    title: "Automieten",
    icon: "🚗",
    services: [
      { id: "rental", name: "Mietwagenservice", desc: "Gerne unterstützen wir Sie bei der Suche und Reservierung eines passenden Mietwagens." },
    ],
  },
  {
    id: "bike",
    title: "Fahrradverleih",
    icon: "🚲",
    services: [
      { id: "rental", name: "Fahrrad- & E-Bike-Verleih", desc: "Gerne unterstützen wir Sie bei der Suche und Reservierung von Fahrrädern und E-Bikes in der Umgebung." },
    ],
  },
  {
    id: "organisation",
    title: "Termine & persönliche Organisation",
    icon: "📅",
    services: [
      { id: "doctor", name: "Arzt & Rehabilitation", desc: "Auf Wunsch unterstützen wir Sie bei der Organisation von Arztterminen sowie medizinischen und rehabilitativen Anwendungen in der Umgebung." },
      { id: "beauty", name: "Beauty & Wellness", desc: "Gerne unterstützen wir Sie bei der Auswahl und Terminvereinbarung für Beauty-, Wellness- und Kosmetikanwendungen." },
      { id: "garage", name: "Autowerkstatt", desc: "Bei Bedarf helfen wir Ihnen bei der Suche nach einer geeigneten Werkstatt in der Umgebung." },
    ],
  },
];
