import { Room } from "../types/Room";

export const ROOMS: Record<string, Room> = {
  "1": {
    id: "1", name: "Apartment 166",
    tagline: `Modernes Apartment im Herzen von Villach Warmbad — nur 5 Gehminuten von der Villacher Therme entfernt.`,
    images: [
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00013.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00010.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00011.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00012.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00014.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00015.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00016.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00004.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00005.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00006.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00007.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00008.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00009.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00017.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00018.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00019.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00020.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00021.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00022.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00023.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00024.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00025.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00026.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00027.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00028.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00029.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00030.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00031.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00032.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00033.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00003.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment1/image00002.jpeg`,
    ],
    description: `Dieses gemütliche, moderne Apartment in warmen Farbtönen bietet einen Balkon mit Blick 
           auf den grünen Garten – ideal für entspannte Abende. Es verfügt über Klimaanlage, 
           Zentralheizung, Internet und alles, was Sie für einen komfortablen Aufenthalt oder 
           einen kurzen Zwischenstopp im Süden benötigen. Das Apartment besteht aus einem 
           Wohnzimmer mit Schlafcouch und einem separaten Schlafzimmer mit Doppelbett und 
           Einzelschlafcouch. Die Küche ist klein, aber komplett ausgestattet mit allem, 
           was Sie für einen komfortablen Aufenthalt brauchen. Dazu gehören Kaffeemaschine, 
           Wasserkocher, Mikrowelle, Backofen, Geschirrspüler, Toaster, Geschirr, Kaffee, 
           Tee, Öl, Salz, Zucker, Eis im Gefrierfach und alle notwendigen Reinigungsmittel. 
           Das Badezimmer ist mit Dusche, Waschmaschine und allem Notwendigen ausgestattet, 
           darunter Föhn, Waschmittel, Wäscheklammern, Wäschetrockner, Lufterfrischer, 
           Duschgel, Duschhaube, Toilettenartikel und mehrere Handtücher. Spielzeug und 
           Brettspiele stehen für Kinder bereit, und das Apartment verfügt außerdem über 
           einen Fernseher. Für Ihren Besuch der Thermen in Kärnten stellen wir Ihnen eine 
           Strandtasche und Handtücher zur Verfügung. Ein Safe für Ihre persönlichen Gegenstände 
           ist ebenfalls vorhanden.`,
    size: 59, capacity: 5, bedrooms: 2, pricePerNight:  190,
    dayPrices: [
      { date: "2026-08-01", price: 140 }, { date: "2026-08-02", price: 140 },
      { date: "2026-08-15", price: 150 }, { date: "2026-08-16", price: 150 },
    ],
    amenities: [
  { icon: "🏔️", label: "Gartenblick" },
  { icon: "❄️", label: "Klimaanlage" },
  { icon: "🔒", label: "Safe" },
  { icon: "🔥", label: "Zentralheizung" },
  { icon: "🍳", label: "Voll ausgestattete Küche" },
  { icon: "📶", label: "Gratis WLAN" },
  { icon: "🅿️", label: "kostenlose Tiefgarage" },
  { icon: "🏗️", label: "Balkon" },
  { icon: "🛏️", label: "Gitterbett" },
  { icon: "👕", label: "Bügeleisen" },
  { icon: "💨", label: "Föhn" },
  { icon: "♨️", label: "Therme 5 min" },
  // { icon: "🚴", label: "Fahrradverleih" },
  // { icon: "🌿", label: "Terrasse" },
],
    bookedRanges: [{ from: "2026-07-20", to: "2026-07-27" }, { from: "2026-08-10", to: "2026-08-18" }],
  },
  "2": {
    id: "2", name: "Apartment 172",
    tagline: `Modernes Apartment im Herzen von Villach Warmbad — nur 5 Gehminuten von der Villacher Therme entfernt.`,
    images: [
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/12.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/1.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/2.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/3.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/4.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/5.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/6.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/7.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/8.jpeg`,
       `${process.env.PUBLIC_URL}/Wilena/Apartment2/9.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/10.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/11.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/12.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/13.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/14.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/15.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/16.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/17.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/18.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/19.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/20.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/21.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/22.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/23.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/24.jpeg`,
       `${process.env.PUBLIC_URL}/Wilena/Apartment2/25.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/26.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/27.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/28.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/29.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/30.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/31.jpeg`,
      `${process.env.PUBLIC_URL}/Wilena/Apartment2/32.jpeg`,
    ],
    description: `Geräumiges Apartment mit Naturholzboden und Deko mit stilvollen Bergmotiven, 
          Balkon und Klimaanlage. Das Apartment verfügt über Zentralheizung, 
          Internet und alles, was Sie für einen komfortablen Aufenthalt oder einen kurzen 
          Zwischenstopp auf dem Weg in den Süden benötigen. Es besteht aus einem Wohnzimmer 
          mit einem Schlafsofa für 2 Personen und eine zusätzliche Einzelschlafsofa, 
          sowie einen separaten Schlafzimmer mit einem Doppelbett und einer Einzelschlafsofa. 
          Bei Bedarf kann noch ein Zustellbett bereitgestellt werden. Die Küche ist komplett 
          ausgestattet mit Kaffeemaschine, Wasserkocher, Mikrowelle, Backofen, Geschirrspüler, 
          Toaster, Geschirr sowie Kaffee, Tee, Öl , Salz, Zucker, Eis im Gefrierschrank und den 
          notwendigen Reinigungsmitteln. Das Badezimmer ist mit Dusche, Waschmaschine und allen 
          notwendigen Badartikeln ausgestattet, darunter Föhn, Waschmittel, Wäscheklammern, 
          Lufterfrischer, Duschgel, Duschhaube, Toilettenartikel und mehrere Handtuchsets. 
          Für längere Aufenthalte stellen wir einen Staubsauger und Reinigungsmittel zur Verfügung. 
          Spielzeug und Brettspiele für Kinder sind vorhanden, und das Apartment verfügt über einen 
          Fernseher und einen DVD-Player. Wir stellen Ihnen außerdem eine Strandtasche und Handtücher 
          für Ihren Besuch der Kärntner Thermen zur Verfügung. Die Wohnung verfügt zudem über einen 
          Safe zur Aufbewahrung Ihrer persönlichen Gegenstände.`,
    size: 59, capacity: 5, bedrooms: 2, pricePerNight: 160,
    dayPrices: [
      { date: "2026-08-01", price: 180 }, { date: "2026-08-02", price: 180 },
      { date: "2026-08-15", price: 195 }, { date: "2026-08-16", price: 195 },
    ],
     amenities: [
  { icon: "❄️", label: "Klimaanlage" },
  { icon: "🔒", label: "Safe" },
  { icon: "🔥", label: "Zentralheizung" },
  { icon: "🍳", label: "Voll ausgestattete Küche" },
  { icon: "📶", label: "Gratis WLAN" },
  { icon: "🅿️", label: "kostenlose Tiefgarage" },
  { icon: "🏗️", label: "Balkon" },
  { icon: "🛏️", label: "Gitterbett" },
  { icon: "👕", label: "Bügeleisen" },
  { icon: "💨", label: "Föhn" },
  { icon: "♨️", label: "Therme 5 min" },
  // { icon: "🚴", label: "Fahrradverleih" },
  // { icon: "🌿", label: "Terrasse" },
],
    bookedRanges: [{ from: "2026-07-15", to: "2026-07-22" }, { from: "2026-08-05", to: "2026-08-12" }],
  },
};
