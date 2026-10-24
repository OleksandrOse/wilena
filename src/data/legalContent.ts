export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'lines'; items: string[] };

export interface LegalSection {
  heading?: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  subtitle?: string;
  intro?: string;
  sections: LegalSection[];
  outro?: string;
}

const CHECK_TIMES: LegalSection = {
  heading: 'Check-in & Check-out',
  blocks: [
    { type: 'p', text: 'Sommersaison – Mai bis Ende September' },
    { type: 'lines', items: ['Check-in ab 16:00 Uhr', 'Check-out bis 10:00 Uhr'] },
    { type: 'p', text: 'Wintersaison – Oktober bis Ende April' },
    { type: 'lines', items: ['Check-in ab 15:00 Uhr', 'Check-out bis 11:00 Uhr'] },
    { type: 'p', text: 'Early Check-in und Late Check-out sind nach Verfügbarkeit und vorheriger Absprache möglich.' },
  ],
};

const GUEST_COUNT: LegalSection = {
  heading: 'Gästezahl',
  blocks: [
    { type: 'p', text: 'Das Apartment darf nur von der bei der Buchung angegebenen Anzahl an Personen genutzt werden. Zusätzliche Übernachtungsgäste sind nur nach vorheriger Absprache gestattet.' },
  ],
};

export const stornoDoc: LegalDoc = {
  slug: 'stornobedingungen',
  title: 'Buchungs- & Stornobedingungen',
  sections: [
    {
      heading: 'Flexible Rate',
      blocks: [{ type: 'p', text: 'Für Gäste, die flexibel bleiben möchten.' }],
    },
    {
      heading: 'Stornobedingungen',
      blocks: [
        { type: 'list', items: [
          'Eine kostenfreie Stornierung ist bis 30 Tage vor Anreise möglich.',
          'Bei einer Stornierung 29 bis 14 Tage vor Anreise werden 50 % des Gesamtpreises berechnet.',
          'Bei einer Stornierung 13 bis 7 Tage vor Anreise werden 70 % des Gesamtpreises berechnet.',
          'Bei einer Stornierung innerhalb von 6 Tagen vor Anreise sowie bei Nichtanreise (No-Show) werden 100 % des Gesamtpreises berechnet.',
          'Bei vorzeitiger Abreise erfolgt keine Rückerstattung für nicht in Anspruch genommene Übernachtungen.',
        ] },
      ],
    },
    {
      heading: 'Änderungen der Buchung',
      blocks: [{ type: 'p', text: 'Änderungen des Reisezeitraums oder der Aufenthaltsdauer sind nach Verfügbarkeit und vorheriger Absprache möglich. Eventuelle Preisänderungen werden entsprechend berücksichtigt.' }],
    },
    CHECK_TIMES,
    GUEST_COUNT,
    {
      heading: 'Preise & Zusatzleistungen',
      blocks: [{ type: 'p', text: 'Es gelten die zum Zeitpunkt der Buchung angegebenen Preise. Zusätzliche Leistungen und Services können je nach Verfügbarkeit und gegebenenfalls gegen Aufpreis angeboten werden.' }],
    },
    {
      heading: 'Rabatte & Sonderangebote',
      blocks: [{ type: 'p', text: 'Rabatte und Sonderangebote sind nicht miteinander kombinierbar. Es gilt jeweils der für den Gast günstigste anwendbare Tarif, sofern beim jeweiligen Angebot nichts anderes angegeben ist.' }],
    },
    {
      heading: 'Non-Refundable Rate – 10 % günstiger',
      blocks: [
        { type: 'p', text: 'Sicher planen & sparen. Buchen Sie zum günstigeren Non-Refundable-Tarif und sparen Sie 10 % auf den regulären Übernachtungspreis.' },
        { type: 'list', items: [
          '10 % Preisvorteil',
          'Zahlung bei Buchung',
          'Nicht stornierbar und nicht erstattungsfähig',
        ] },
        { type: 'p', text: 'Der Gesamtbetrag ist bei Buchung fällig. Bei Stornierung, Änderung oder Nichtanreise erfolgt keine Rückerstattung. Der Non-Refundable-Tarif ist nicht mit anderen Rabatten oder Sonderangeboten kombinierbar.' },
      ],
    },
  ],
};

export const hausordnungDoc: LegalDoc = {
  slug: 'hausordnung',
  title: 'Hausordnung',
  intro: 'Herzlich willkommen in den Wilena Apartments. Damit sich unsere Gäste und Bewohner wohlfühlen und einen angenehmen Aufenthalt genießen können, bitten wir um die Beachtung unserer Hausordnung.',
  sections: [
    CHECK_TIMES,
    { heading: 'Ruhezeiten', blocks: [{ type: 'p', text: 'Bitte nehmen Sie Rücksicht auf andere Gäste und Bewohner. Die Nachtruhe gilt von 22:00 bis 07:00 Uhr. Während dieser Zeit bitten wir darum, Lärm in den Apartments sowie in den Gemeinschaftsbereichen zu vermeiden.' }] },
    { heading: 'Rauchen', blocks: [{ type: 'p', text: 'Das Rauchen ist in den Apartments nicht gestattet. Bitte nutzen Sie hierfür ausschließlich geeignete Außenbereiche.' }] },
    { heading: 'Partys & Veranstaltungen', blocks: [{ type: 'p', text: 'Partys, Veranstaltungen und größere Zusammenkünfte sind in den Apartments nicht gestattet.' }] },
    GUEST_COUNT,
    { heading: 'Haustiere', blocks: [{ type: 'p', text: 'Haustiere sind ausschließlich nach vorheriger Anfrage und Bestätigung gestattet. Eventuelle Zusatzkosten werden vor der Anreise vereinbart.' }] },
    { heading: 'Sauberkeit & Müll', blocks: [{ type: 'p', text: 'Bitte hinterlassen Sie das Apartment in einem angemessenen und ordentlichen Zustand. Bitte trennen Sie den Müll entsprechend den vorgesehenen Müllbehältern. Die Abfälle sind in den dafür vorgesehenen Behältern zu entsorgen.' }] },
    { heading: 'Inventar & Schäden', blocks: [{ type: 'p', text: 'Bitte behandeln Sie das Apartment, die Einrichtung und die Ausstattung sorgfältig. Sollte während Ihres Aufenthalts etwas beschädigt werden oder ein Defekt auftreten, bitten wir Sie, uns möglichst umgehend zu informieren.' }] },
    { heading: 'Schlüssel', blocks: [{ type: 'p', text: 'Bitte gehen Sie sorgfältig mit den übergebenen Schlüsseln um. Bei der Abreise ist der Schlüssel wieder in die dafür vorgesehene Schlüsselbox zurückzulegen. Bitte verwenden Sie hierfür die Ihnen mitgeteilte Schlüsselbox. Bei Verlust eines Schlüssels können die tatsächlich entstehenden Kosten für Ersatz bzw. erforderliche Sicherheitsmaßnahmen berechnet werden.' }] },
    { heading: 'Sicherheit', blocks: [{ type: 'p', text: 'Beim Verlassen des Apartments bitten wir Sie, Fenster und Türen zu schließen sowie Herd, Klimaanlagen und nicht benötigte elektrische Geräte auszuschalten. Bitte achten Sie besonders darauf, dass Kochfelder und Klimaanlagen beim Verlassen des Apartments ausgeschaltet sind.' }] },
  ],
  outro: 'Vielen Dank für Ihre Rücksichtnahme und Ihr Verständnis. Wir wünschen Ihnen einen angenehmen Aufenthalt in den Wilena Apartments.',
};


export const impressumDoc: LegalDoc = {
  slug: 'impressum',
  title: 'Impressum',
  sections: [
    {
      heading: 'Wilena Apartments',
      blocks: [
        { type: 'lines', items: [
          'Gewerbeinhaberin: Dr. Elena Schollenberg',
          'Warmbader Allee 53',
          '9504 Villach',
          'Österreich',
        ] },
        { type: 'lines', items: ['Telefon: +43 664 737 48 88', 'E-Mail: wilena@speed.at'] },
      ],
    },
  ],
};

export const datenschutzDoc: LegalDoc = {
  slug: 'datenschutz',
  title: 'Datenschutzerklärung',
  sections: [
    {
      heading: 'Verantwortlicher',
      blocks: [
        { type: 'lines', items: [
          'Wilena Apartments',
          'Dr. Elena Schollenberg',
          'Warmbader Allee 53',
          '9504 Villach',
          'Österreich',
        ] },
        { type: 'lines', items: ['E-Mail: wilena@speed.at', 'Telefon: +43 664 737 48 88'] },
      ],
    },
    { heading: 'Schutz Ihrer persönlichen Daten', blocks: [{ type: 'p', text: 'Der Schutz Ihrer persönlichen Daten ist uns wichtig. Personenbezogene Daten, die Sie uns im Rahmen einer Anfrage, Kontaktaufnahme oder Buchung übermitteln, werden vertraulich und entsprechend den geltenden datenschutzrechtlichen Bestimmungen behandelt.' }] },
    { heading: 'Kontaktaufnahme', blocks: [{ type: 'p', text: 'Wenn Sie uns per Kontaktformular, E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage und zur weiteren Kommunikation mit Ihnen.' }] },
    { heading: 'Buchungsdaten', blocks: [
      { type: 'p', text: 'Im Rahmen einer Buchungsanfrage oder Buchung verarbeiten wir die hierfür erforderlichen personenbezogenen Daten, insbesondere Name, Kontaktdaten sowie die für die Durchführung des Aufenthalts erforderlichen Buchungsinformationen.' },
      { type: 'p', text: 'Ihre personenbezogenen Daten werden ausschließlich für die Bearbeitung Ihrer Anfrage, die Abwicklung Ihrer Buchung und die Durchführung Ihres Aufenthalts sowie zur Erfüllung gesetzlicher Verpflichtungen verwendet.' },
    ] },
    { heading: 'Weitergabe von Daten', blocks: [{ type: 'p', text: 'Eine Weitergabe personenbezogener Daten an Dritte erfolgt nur, soweit dies zur Abwicklung der Buchung oder zur Erfüllung gesetzlicher Verpflichtungen erforderlich ist oder eine entsprechende Einwilligung vorliegt.' }] },
    { heading: 'Speicherdauer', blocks: [{ type: 'p', text: 'Personenbezogene Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.' }] },
    { heading: 'Ihre Rechte', blocks: [
      { type: 'p', text: 'Sie haben im Rahmen der gesetzlichen Bestimmungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit sowie gegebenenfalls ein Widerspruchsrecht.' },
      { type: 'p', text: 'Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden: wilena@speed.at' },
    ] },
    {
      heading: 'Cookies & lokale Speicherung',
      blocks: [
        { type: 'p', text: 'Diese Website verwendet ausschließlich technisch notwendige Speichermechanismen (z. B. Cookies oder die lokale Speicherung im Browser), die für den Betrieb der Website erforderlich sind. Dazu zählt insbesondere die Anmeldung im internen Verwaltungsbereich.' },
        { type: 'p', text: 'Diese Daten werden nicht für Tracking-, Analyse- oder Werbezwecke verwendet. Es werden keine Analyse- oder Marketing-Cookies eingesetzt. Für technisch notwendige Speicherungen ist keine Einwilligung erforderlich.' },
        { type: 'p', text: 'Sie können Cookies und lokal gespeicherte Daten jederzeit in den Einstellungen Ihres Browsers löschen oder blockieren. Dadurch können einzelne Funktionen der Website eingeschränkt sein.' },
      ],
    },
    {
      heading: 'Externe Links',
      blocks: [
        { type: 'p', text: 'Unsere Website enthält Links zu externen Diensten (z. B. Google Maps, Instagram, Facebook, WhatsApp, Telegram). Beim Anklicken verlassen Sie unsere Website. Für die Datenverarbeitung auf diesen Seiten gelten die Datenschutzbestimmungen des jeweiligen Anbieters.' },
      ],
    },
  ],
};

export const cookiesDoc: LegalDoc = {
  slug: 'cookies',
  title: 'Cookies',
  intro: 'Hier informieren wir Sie darüber, wie diese Website Cookies und vergleichbare Technologien verwendet.',
  sections: [
    {
      heading: 'Was sind Cookies?',
      blocks: [{ type: 'p', text: 'Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Ähnliche Funktionen erfüllt die lokale Speicherung im Browser (Local Storage).' }],
    },
    {
      heading: 'Technisch notwendige Speicherung',
      blocks: [
        { type: 'p', text: 'Wir verwenden ausschließlich technisch notwendige Speichermechanismen, die für den Betrieb der Website erforderlich sind, insbesondere für die Anmeldung im internen Verwaltungsbereich. Hierfür ist keine Einwilligung erforderlich.' },
      ],
    },
    {
      heading: 'Keine Analyse- und Marketing-Cookies',
      blocks: [
        { type: 'list', items: [
          'Keine Analyse- oder Tracking-Dienste',
          'Keine Marketing- oder Werbe-Cookies',
          'Keine eingebetteten Karten oder Inhalte von Drittanbietern',
          'Schriften werden lokal bereitgestellt',
        ] },
      ],
    },
    {
      heading: 'Verwaltung von Cookies',
      blocks: [{ type: 'p', text: 'Sie können Cookies und lokal gespeicherte Daten jederzeit in den Einstellungen Ihres Browsers löschen oder blockieren. Dadurch können einzelne Funktionen der Website eingeschränkt sein.' }],
    },
    {
      heading: 'Weitere Informationen',
      blocks: [{ type: 'p', text: 'Weitere Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung. Bei Fragen erreichen Sie uns unter wilena@speed.at.' }],
    },
  ],
};

export const legalDocs: Record<string, LegalDoc> = {
  stornobedingungen: stornoDoc,
  hausordnung: hausordnungDoc,
  impressum: impressumDoc,
  datenschutz: datenschutzDoc,
  cookies: cookiesDoc,
};
