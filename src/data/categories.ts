import { Service } from "../types/Service";

export const categories: { title: string; icon: string; services: Service[] }[] = [
  {
    title: "Kärntner Therme",
    icon: "♨️",
    services: [
      {
        name: "Bequem zu Fuß erreichbar",
        desc: "Nur wenige Gehminuten entfernt. Die KärntenTherme ist von den Wilena Apartments bequem zu Fuß erreichbar - in nur etwa 5 Minuten sind Sie dort.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Badespaß & Wellness",
        desc: "Wasserrutschen und Erlebnisbereiche für die ganze Familie, wohltuendes Thermalwasser und eine großzügige Saunalandschaft - hier verbinden sich Aktivurlaub und Entspannung.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/3.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Handtücher inklusive",
        desc: "Badetasche & Handtücher inklusive für Ihren Besuch in der KärntenTherme stellen wir Ihnen eine Badetasche und zusätzliche Handtücher kostenfrei zur Verfügung.",
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
        desc: "Türkisblaues Wasser und beeindruckende Bergkulisse - ideal zum Baden und Entspannen.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Faakersee.jpg`,
        link: "https://www.visitvillach.at/de/faaker-see.html",
      },
      {
        name: "Ossiacher See",
        desc: "Baden, Wassersport, Schifffahrt und zahlreiche Freizeitmöglichkeiten rund um den See.",
        image: `${process.env.PUBLIC_URL}/Wilena/Rezidenz/Ossiachersee.jpg`,
        link: "https://www.kaernten.at/seen/ossiacher-see/",
      },
      {
        name: "Wörthersee",
        desc: "Einer der bekanntesten Seen Kärntens - mit Strandbädern, Schifffahrt und mediterranem Urlaubsgefühl.",
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
        desc: "Familienfreundliches Skigebiet mit abwechslungsreichen Pisten und herrlichem Panoramablick.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/7.jpg`,
        link: "https://www.gerlitzen.com",
      },
      {
        name: "Nassfeld",
        desc: "Großes Skigebiet mit vielfältigen Pisten und zahlreichen Möglichkeiten für einen aktiven Wintertag.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/8.jpg`,
        link: "https://www.nassfeld.at",
      },
      {
        name: "Alpenarena Villach",
        desc: "Langlauf, Skispringen und Winteraktivitäten direkt in Villach - ideal für alle, die nordischen Wintersport erleben möchten.",
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
        desc: "Familywald Ossiacher See Abenteuer, Bewegung und Spaß in der Natur für die ganze Familie.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/9.jpg`,
        link: "https://www.familypark.at",
      },
      {
        name: "Abenteuer Affenberg",
        desc: "Freilebende Japanmakaken aus nächster Nähe erleben - ein besonderes Erlebnis für Groß und Klein.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/10.jpg`,
        link: "https://www.affenberg.com",
      },
      {
        name: "Kletterwald Ossiacher See",
        desc: "Abwechslungsreiche Kletterparcours für Kinder und Erwachsene - mit herrlichem Blick auf den Ossiacher See.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/11.jpg`,
        link: "https://www.kletterwald.at",
      },
      {
        name: "Adlerarena Burg Landskron",
        desc: "Beeindruckende Greifvögel hautnah erleben - vor der historischen Kulisse der Burg Landskron.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/12.jpg`,
        link: "https://www.adlerarena.com",
      },
      {
        name: "Tierpark Rosegg",
        desc: "Ein naturnaher Tierpark mit heimischen und exotischen Tieren - ein schönes Ausflugsziel für die ganze Familie.",
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
    title: "Schlechtwetter? Kein Problem!",
    icon: "☔",
    services: [
      {
        name: "Kärnten Therme",
        desc: "Thermalwasser, Wellness und Badespaß - perfekt für entspannte Stunden bei jedem Wetter.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/5.jpg`,
        link: "https://www.kaerntentherme.com",
      },
      {
        name: "Reptilienzoo Happ Klagenfurt",
        desc: "Faszinierende Reptilien und Amphibien aus nächster Nähe entdecken.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/17.jpg`,
        link: "https://www.reptilienzoo.at",
      },
      {
        name: "Planetarium Klagenfurt",
        desc: "Eine spannende Reise durch Sterne, Planeten und das Universum.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/18.jpg`,
        link: "https://www.miniversum-planetarium.at/",
      },
      {
        name: "Jump Dome Klagenfurt",
        desc: "Trampolinspaß, Bewegung und Action für Kinder und Erwachsene.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/19.jpg`,
        link: "https://jumpdome.at/klagenfurt",
      },
      {
        name: "Schaubergwerk Terra Mystica",
        desc: "Eine faszinierende Reise in die Bergbaugeschichte von Bad Bleiberg.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/20.jpg`,
        link: "https://www.terra-mystica.at",
      },
      {
        name: "Granatium Radenthein",
        desc: "Die faszinierende Welt des Kärntner Granats entdecken - inklusive Erlebnisbereich rund um den Edelstein.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/21.jpg`,
        link: "https://www.granatium.at",
      },
      {
        name: "Tropfsteinhöhlen Obir",
        desc: "Eine beeindruckende unterirdische Welt aus Fels, Wasser und Tropfsteinen.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/22.jpg`,
        link: "https://www.hoehlen.at",
      },
      {
        name: "Indoor Kartbahn Rosental",
        desc: "Kartspaß und Action - unabhängig von Wetter und Jahreszeit.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/23.jpg`,
        link: "https://www.kartbahn-rosental.at",
      },
      {
        name: "Kletterhalle Villach",
        desc: "Klettern und Bouldern für Anfänger und Fortgeschrittene - wetterunabhängig und für die ganze Familie.",
        image: `${process.env.PUBLIC_URL}/Wilena/Freizeit/Kärnten/24.jpg`,
        link: "https://kletterhallevillach.at/",
      },
    ],
  },
];