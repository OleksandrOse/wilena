export const MAP_QUERY = "Wilena Apartments, Warmbader Allee 53, 9504 Villach, Österreich";
export const MAP_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

export const contacts = [
  {
    icon: "📍",
    title: "Villach",
    lines: ["Warmbader Allee 53", "9504 Villach, Österreich"],
    link: MAP_SEARCH_URL,
    linkLabel: "Auf Karte öffnen",
  },
  {
    icon: "📞",
    title: "Telefon",
    subtitle: "Viber, Whatsapp, Telegram",
    lines: ["+43 664 737 48 88"],
    link: "tel:+436647374888",
    linkLabel: "Anrufen",
  },
  {
    icon: "✉️",
    title: "E-Mail",
    lines: ["wilena@speed.at"],
    link: "mailto:wilena@speed.at",
    linkLabel: "E-Mail senden",
  },
];
