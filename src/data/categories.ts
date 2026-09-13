import { Service } from "../types/Service";

export const categories: { title: string; icon: string; services: Service[] }[] = [
  {
    title: "Kärntner Therme",
    icon: "♨️",
    services: [
      {
        name: "Aktivurlaub & Wellness",
        desc: "Wasserrutschen und Attraktionen sowie Wellness und medizinische Anwendungen im Kurzentrum mit Thermalquellen und Rehabilitation Thermenhof.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Bequem zu Fuß erreichbar",
        desc: "Der Thermenpark und das Kurzentrum liegen fußläufig von den Wilena Apartments entfernt.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/3.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Handtücher inklusive",
        desc: "Für Ihren Besuch in der Therme stellen wir Ihnen gerne kostenfrei Handtücher zur Verfügung.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/2.jpg`,
        link: "https://www.kaerntentherme.com",
      },
    ],
  },
   {
    title: "Fahrrad",
    icon: "🚴",
    services: [
      {
        name: "Die Region mit dem Rad entdecken",
        desc: `Kärnten ist ein tolles Ziel zum Radfahren. Es gibt viele flache Wege an Seen und Flüssen.
                Auch schöne Berge für E-Bikes sind da. Die Kärnten Seen-Schleife zeigt Ihnen viele
                Gewässer auf einmal. In Kärnten beginnt die Radsaison ein bisschen früher.
                Schon ab Ende März sieht man Mountainbiker, Rennradfahrer,
                E-Biker und Genussradfahrer auf zahlreichen Trails,
                Radwegen und Routen ihre Runden drehen. Denn drei Dinge sind beim Radfahren
                in Kärnten immer mit dabei: das herrliche Berg-Seepanorama,
                die Alpen-Adria-Küche und die Möglichkeit, sich in einem der zahlreichen Kärntner
                Seen zu erfrischen. Kärnten – ein Land für Radbegeisterte, die das Radangebot,
                die Natur, das Essen und das Wetter zu schätzen wissen.
                Bekannte Radwege:`,
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/1.jpg`,
        link: "https://www.kaerntentherme.com",
      },
    ],
  },
  {
    title: "Seen & Baden",
    icon: "🏞️",
    services: [
      {
        name: "Faakersee",
        desc: "Beliebter Badesee mit klarem, warmem Wasser.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Faakersee.jpg`,
        link: "https://www.visitvillach.at/de/faaker-see.html",
      },
      {
        name: "Ossiacher See",
        desc: "Großer Kärntner See mit vielen Freizeitmöglichkeiten.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Ossiachersee.jpg`,
        link: "https://www.kaernten.at/seen/ossiacher-see/",
      },
      {
        name: "Wörthersee",
        desc: "Strandbäder und Schifffahrten auf Kärntens bekanntestem See.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Wörtersee.jpg`,
        link: "https://www.woerthersee.com",
      },
    ],
  },
  {
    title: "Skifahren",
    icon: "⛷️",
    services: [
      {
        name: "Gerlitzen Alpe",
        desc: "Familienfreundliches Skigebiet mit Panoramablick.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/7.jpg`,
        link: "https://www.gerlitzen.com",
      },
      {
        name: "Nassfeld",
        desc: "Eines der schneesichersten Skigebiete Kärntens.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/8.jpg`,
        link: "https://www.nassfeld.at",
      },
      {
        name: "Alpenarena Villach",
        desc: "Langlaufloipe, Skisprunganlage und Rodelhügel direkt in Villach — ideal für nordischen Wintersport und einen Familienausflug.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/28.jpg`,
        link: "https://villacheralpenarena.at",
      },
    ],
  },
  {
    title: "Freizeitparks für die ganze Familie",
    icon: "🎢",
    services: [
      {
        name: "Familypark Ossiacher See",
        desc: "Abwechslungsreicher Freizeitpark für Kinder und Familien.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/9.jpg`,
        link: "https://www.familypark.at",
      },
      {
        name: "Abenteuer Affenberg",
        desc: "Freilebende Affen hautnah erleben.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/10.jpg`,
        link: "https://www.affenberg.com",
      },
      {
        name: "Kletterwald Ossiacher See",
        desc: "Hochseilgarten mit Parcours für Groß und Klein.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/11.jpg`,
        link: "https://www.kletterwald.at",
      },
      {
        name: "Adlerarena Burg Landskron",
        desc: "Greifvogel-Flugschau auf historischer Burg.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/12.jpg`,
        link: "https://www.adlerarena.com",
      },
      {
        name: "Tierpark Rosegg",
        desc: "Naturnaher Wildpark mit heimischen Tierarten.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/14.jpg`,
        link: "https://www.tierpark-rosegg.at",
      },
      {
        name: "Minimundus Klagenfurt",
        desc: "Die Welt im Miniaturformat.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/15.jpg`,
        link: "https://www.minimundus.at",
      },
      {
        name: "Pyramidenkogel",
        desc: "Höchster Holzaussichtsturm der Welt mit Rutsche.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/16.jpg`,
        link: "https://www.pyramidenkogel.info",
      },
    ],
  },
  {
    title: "Bei Schlechtwetter",
    icon: "☔",
    services: [
      {
        name: "Kärnten Therme",
        desc: "Indoor-Wellness und Wasserspaß bei jedem Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Reptilienzoo Klagenfurt",
        desc: "Über 200 Reptilien und Amphibien hautnah.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/17.jpg`,
        link: "https://www.reptilienzoo.at",
      },
      {
        name: "Planetarium Klagenfurt",
        desc: "Sternenhimmel und Weltraum-Shows.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/18.jpg`,
        link: "https://www.miniversum-planetarium.at/",
      },
      {
        name: "Jump Dome Klagenfurt",
        desc: "Trampolinpark für Action und Spaß.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/19.jpg`,
        link: "https://jumpdome.at/klagenfurt",
      },
      {
        name: "Schaubergwerk Terra Mystica",
        desc: "Untertägige Erlebniswelt in Bad Bleiberg.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/20.jpg`,
        link: "https://www.terra-mystica.at",
      },
      {
        name: "Granatium Radenthein",
        desc: "Erlebniswelt rund um den Kärntner Granat.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/21.jpg`,
        link: "https://www.granatium.at",
      },
      {
        name: "Tropfsteinhöhlen Oberdrautal",
        desc: "Beeindruckende unterirdische Höhlenwelt.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/22.jpg`,
        link: "https://www.hoehlen.at",
      },
      {
        name: "Indoor Kartbahn Rosental",
        desc: "Kartfahren unabhängig vom Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/23.jpg`,
        link: "https://www.kartbahn-rosental.at",
      },
      {
        name: "Kletterhalle Villach",
        desc: "Bouldern und Klettern für Anfänger und Fortgeschrittene, drinnen bei jedem Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/24.jpg`,
        link: "https://kletterhallevillach.at/",
      },
    ],
  },
];