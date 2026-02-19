// ═══════════════════════════════════════════════════════════════
// SCHLAF-PLATZ — Shared Constants & City Data
// Fix: replaced typographic quotes „" with standard quotes
// ═══════════════════════════════════════════════════════════════

export const BRAND = {
  name: "Schlaf-Platz",
  legalName: "Schlaf-Platz e.G.",
  domain: "schlaf-platz.com",
  appDomain: "monteurzimmerapartments.de",
  phone: "+49 160 95460613",
  phonePretty: "+49 160 95460613",
  email: "info@schlaf-platz.com",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100064117628319",
    linkedin: "https://www.linkedin.com/company/schlafplatz/",
    instagram: "https://www.instagram.com/schlafplatz_com/",
  },
  stats: {
    partners: 1500,
    cities: 50,
    googleRating: 5.0,
    googleReviews: 266,
    teamSize: 23,
    growthPercent: 223,
    responseMinutes: 15,
  },
} as const;

export const NAV_LINKS = [
  { label: "Startseite", href: "/" },
  { label: "Unterkunft finden", href: "/mieter" },
  { label: "Städte", href: "/#staedte" },
  { label: "Karriere", href: "/karriere" },
] as const;

export const FOOTER_LINKS = {
  mieter: [
    { label: "Unterkunft finden", href: "/mieter" },
    { label: "Städte-Übersicht", href: "/#staedte" },
    { label: "So funktioniert's", href: "/mieter#prozess" },
    { label: "Kontakt", href: "/mieter" },
  ],
  vermieter: [
    { label: "Kostenlos inserieren", href: "/app" },
    { label: "App herunterladen", href: "/app" },
    { label: "Transparenzregister", href: "/app" },
    { label: "Karriere", href: "/karriere" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutzerklaerung" },
    { label: "AGB", href: "/agb" },
    { label: "Satzung", href: "#" },
  ],
} as const;

// ─── City Data for Landing Pages ──────────────────────────────────────
export interface CityData {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  bundesland: string;
  einwohner: string;
  flaeche: string;
  hoehe: string;
  autobahnen: string;
  bahnhof: string;
  heroDescription: string;
  branchen: string;
  unternehmen: string;
  messen: string[];
  stadtteile: { name: string; description: string }[];
  industriegebiete: { name: string; description: string }[];
  sehenswuerdigkeiten: string[];
  baumaerkte: { stadtteil: string; name: string; adresse: string }[];
  restaurants: { stadtteil: string; items: { name: string; beschreibung: string }[] }[];
  supermaerkte: { stadtteil: string; items: { name: string; adresse: string }[] }[];
}

export const CITIES: CityData[] = [
  {
    slug: "berlin",
    name: "Berlin",
    emoji: "🏗️",
    tagline: "Hauptstadt & Bau-Hotspot",
    bundesland: "Berlin (Stadtstaat)",
    einwohner: "ca. 3.700.000",
    flaeche: "891,7 km²",
    hoehe: "34 Meter",
    autobahnen: "A10, A100, A111, A113, A115",
    bahnhof: "Berlin Hauptbahnhof",
    heroDescription: "Berlin, als wachsende Hauptstadt und einer der größten Baustellen Europas, zieht stetig Fachkräfte an. Unsere Monteurzimmer bieten eine ideale Lösung für einen entspannten Aufenthalt.",
    branchen: "Bau, IT, Verwaltung, Tourismus, Medien",
    unternehmen: "Siemens, Deutsche Bahn, Zalando, SAP",
    messen: ["ITB Berlin", "IFA", "InnoTrans", "Fruit Logistica"],
    stadtteile: [
      { name: "Mitte", description: "Das politische und kulturelle Zentrum Berlins mit Regierungsviertel und Museumsinsel." },
      { name: "Kreuzberg", description: "Multikulturelles Viertel mit lebendiger Gastro- und Kulturszene." },
      { name: "Charlottenburg", description: "Elegantes Wohngebiet mit dem berühmten Kurfürstendamm." },
      { name: "Prenzlauer Berg", description: "Beliebtes Wohnviertel mit Altbauten und jungen Familien." },
    ],
    industriegebiete: [
      { name: "Industriepark Berlin-Marzahn", description: "Eines der größten Gewerbegebiete mit Unternehmen aus Produktion und Logistik." },
      { name: "Technologiepark Adlershof", description: "Wissenschafts- und Technologiestandort mit über 1.000 Unternehmen." },
    ],
    sehenswuerdigkeiten: ["Brandenburger Tor", "Reichstagsgebäude", "East Side Gallery", "Fernsehturm", "Museumsinsel"],
    baumaerkte: [
      { stadtteil: "Mitte", name: "Bauhaus Berlin-Mitte", adresse: "Alexanderstraße 1, 10178 Berlin" },
      { stadtteil: "Kreuzberg", name: "OBI Kreuzberg", adresse: "Kottbusser Damm 1, 10967 Berlin" },
      { stadtteil: "Charlottenburg", name: "Hornbach Charlottenburg", adresse: "Kantstraße 10, 10623 Berlin" },
    ],
    restaurants: [
      {
        stadtteil: "Mitte",
        items: [
          { name: "Zur letzten Instanz", beschreibung: "Eines der ältesten Restaurants Berlins mit traditioneller deutscher Küche." },
          { name: "Borchardt", beschreibung: "Gehobene französisch-deutsche Küche im eleganten Ambiente." },
        ],
      },
    ],
    supermaerkte: [
      {
        stadtteil: "Mitte",
        items: [
          { name: "Edeka", adresse: "Friedrichstraße 50, 10117 Berlin" },
          { name: "Rewe City", adresse: "Alexanderplatz 3, 10178 Berlin" },
        ],
      },
    ],
  },
  {
    slug: "muenchen",
    name: "München",
    emoji: "🏔️",
    tagline: "BMW, Siemens & mehr",
    bundesland: "Bayern (Landeshauptstadt)",
    einwohner: "ca. 1.500.000",
    flaeche: "310,7 km²",
    hoehe: "519 Meter",
    autobahnen: "A8, A9, A92, A95, A96, A99",
    bahnhof: "München Hauptbahnhof",
    heroDescription: "München, als Wirtschaftsmetropole Bayerns und Sitz von BMW, Siemens und Allianz, zieht zahlreiche Fachkräfte an. Finden Sie komfortable Monteurzimmer in der Region.",
    branchen: "Automobil, IT, Versicherungen, Maschinenbau, Medien",
    unternehmen: "BMW, Siemens, Allianz, Munich Re, MAN",
    messen: ["bauma", "ISPO", "electronica", "Expo Real"],
    stadtteile: [
      { name: "Schwabing", description: "Beliebtes Wohnviertel mit Universität, Boutiquen und Cafés." },
      { name: "Maxvorstadt", description: "Kulturelles Herz Münchens mit Pinakotheken und Universität." },
      { name: "Sendling", description: "Traditionelles Viertel mit dem bekannten Großmarkt." },
      { name: "Haidhausen", description: "Charmantes Viertel östlich der Isar mit Gründerzeit-Architektur." },
    ],
    industriegebiete: [
      { name: "Gewerbegebiet München-Nord", description: "Großer Industriestandort mit Logistik und produzierendem Gewerbe." },
      { name: "Industriepark München-Riem", description: "Moderner Gewerbepark nahe der Messe München." },
    ],
    sehenswuerdigkeiten: ["Marienplatz", "Frauenkirche", "Englischer Garten", "Schloss Nymphenburg", "BMW Welt"],
    baumaerkte: [
      { stadtteil: "Schwabing", name: "OBI München-Schwabing", adresse: "Leopoldstraße 200, 80804 München" },
      { stadtteil: "Sendling", name: "Hornbach München-Sendling", adresse: "Thalkirchner Str. 60, 81371 München" },
    ],
    restaurants: [
      {
        stadtteil: "Altstadt",
        items: [
          { name: "Hofbräuhaus", beschreibung: "Weltberühmtes Wirtshaus mit bayerischer Küche und Blasmusik." },
          { name: "Augustiner am Dom", beschreibung: "Traditionelle Wirtschaft direkt am Dom mit Augustiner Bier." },
        ],
      },
    ],
    supermaerkte: [
      {
        stadtteil: "Schwabing",
        items: [
          { name: "Edeka", adresse: "Hohenzollernstraße 12, 80801 München" },
          { name: "Rewe", adresse: "Leopoldstraße 80, 80802 München" },
        ],
      },
    ],
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    emoji: "⚓",
    tagline: "Hafen & Industrie",
    bundesland: "Hamburg (Stadtstaat)",
    einwohner: "ca. 1.900.000",
    flaeche: "755,2 km²",
    hoehe: "6 Meter",
    autobahnen: "A1, A7, A23, A24, A25, A255",
    bahnhof: "Hamburg Hauptbahnhof",
    heroDescription: "Hamburg, als Tor zur Welt und zweitgrößte Stadt Deutschlands, ist ein wichtiger Wirtschafts- und Logistikstandort. Finden Sie passende Monteurzimmer im Norden.",
    branchen: "Hafen & Logistik, Luftfahrt, Medien, Erneuerbare Energien",
    unternehmen: "Airbus, Otto Group, Beiersdorf, Hapag-Lloyd",
    messen: ["SMM", "WindEnergy Hamburg", "Aircraft Interiors Expo"],
    stadtteile: [
      { name: "St. Pauli", description: "Berühmtes Viertel an der Reeperbahn mit lebendiger Kultur- und Nachtszene." },
      { name: "Altona", description: "Vielseitiges Viertel mit Elbstrand, Fischmarkt und multikulturelles Flair." },
      { name: "HafenCity", description: "Eines der größten Stadtentwicklungsprojekte Europas mit moderner Architektur." },
      { name: "Eimsbüttel", description: "Beliebtes Wohnviertel mit vielen Altbauten und Grünflächen." },
    ],
    industriegebiete: [
      { name: "Hamburger Hafen", description: "Drittgrößter Hafen Europas mit umfangreicher Logistikinfrastruktur." },
      { name: "Airbus-Werk Finkenwerder", description: "Einer der wichtigsten Airbus-Produktionsstandorte weltweit." },
    ],
    sehenswuerdigkeiten: ["Elbphilharmonie", "Speicherstadt", "Miniatur Wunderland", "Landungsbrücken", "Rathaus"],
    baumaerkte: [
      { stadtteil: "Altona", name: "Bauhaus Hamburg-Altona", adresse: "Große Elbstraße 10, 22767 Hamburg" },
      { stadtteil: "Wandsbek", name: "OBI Hamburg-Wandsbek", adresse: "Wandsbeker Markt 1, 22041 Hamburg" },
    ],
    restaurants: [
      {
        stadtteil: "HafenCity",
        items: [
          { name: "Hobenköök", beschreibung: "Regionale norddeutsche Küche mit eigenem Markthalle-Konzept." },
          { name: "Vlet in der Speicherstadt", beschreibung: "Gehobene norddeutsche Küche in historischem Ambiente." },
        ],
      },
    ],
    supermaerkte: [
      {
        stadtteil: "Eimsbüttel",
        items: [
          { name: "Edeka", adresse: "Osterstraße 50, 20259 Hamburg" },
          { name: "Rewe", adresse: "Hoheluftchaussee 2, 20253 Hamburg" },
        ],
      },
    ],
  },
  {
    slug: "koeln",
    name: "Köln",
    emoji: "⛪",
    tagline: "Ford & Chemiepark",
    bundesland: "Nordrhein-Westfalen",
    einwohner: "ca. 1.080.000",
    flaeche: "405,2 km²",
    hoehe: "53 Meter",
    autobahnen: "A1, A3, A4, A57, A559",
    bahnhof: "Köln Hauptbahnhof",
    heroDescription: "Köln, als Medien-, Industrie- und Messestadt am Rhein, bietet zahlreiche Einsatzmöglichkeiten für Monteure und Handwerker. Finden Sie hier die passende Unterkunft.",
    branchen: "Automobil (Ford), Chemie, Medien, Versicherungen",
    unternehmen: "Ford, Lanxess, RTL, Zurich Versicherung",
    messen: ["gamescom", "Anuga", "IMM Cologne", "FIBO"],
    stadtteile: [
      { name: "Altstadt", description: "Historisches Zentrum rund um den Dom mit Brauhäusern und Geschichte." },
      { name: "Ehrenfeld", description: "Kreatives Szene-Viertel mit Street Art, Clubs und multikulturellen Restaurants." },
      { name: "Deutz", description: "Rechtsrheinischer Stadtteil mit der Koelnmesse und dem Lanxess Arena." },
      { name: "Nippes", description: "Lebhaftes Wohnviertel mit eigenem Charme und vielen kleinen Geschäften." },
    ],
    industriegebiete: [
      { name: "Ford-Werke Köln-Niehl", description: "Einer der größten Automobilstandorte Europas mit Ford-Produktion." },
      { name: "Chempark Leverkusen/Köln", description: "Einer der größten Chemieparks Europas direkt vor den Toren Kölns." },
    ],
    sehenswuerdigkeiten: ["Kölner Dom", "Hohenzollernbrücke", "Rheinufer", "Museum Ludwig", "Schokoladenmuseum"],
    baumaerkte: [
      { stadtteil: "Ehrenfeld", name: "Bauhaus Köln-Ehrenfeld", adresse: "Venloer Str. 400, 50825 Köln" },
      { stadtteil: "Deutz", name: "OBI Köln-Deutz", adresse: "Deutz-Mülheimer Str. 100, 51063 Köln" },
    ],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "frankfurt",
    name: "Frankfurt",
    emoji: "🏦",
    tagline: "Banken & Infrastruktur",
    bundesland: "Hessen",
    einwohner: "ca. 760.000",
    flaeche: "248,3 km²",
    hoehe: "112 Meter",
    autobahnen: "A3, A5, A66, A661",
    bahnhof: "Frankfurt Hauptbahnhof",
    heroDescription: "Frankfurt am Main, das Finanzzentrum Deutschlands und Sitz der EZB, bietet zahlreiche Einsatzmöglichkeiten. Finden Sie komfortable Monteurzimmer in Mainhattan.",
    branchen: "Finanzdienstleistungen, Logistik, Pharma, IT",
    unternehmen: "Deutsche Bank, EZB, Commerzbank, Fraport",
    messen: ["Frankfurter Buchmesse", "Automechanika", "Light + Building", "Ambiente"],
    stadtteile: [
      { name: "Sachsenhausen", description: "Bekannt für Äppelwoi-Lokale und die Museumsufer am Main." },
      { name: "Nordend", description: "Beliebtes Wohnviertel mit Gründerzeit-Architektur und Berger Straße." },
      { name: "Westend", description: "Gehobenes Wohngebiet mit Bankentürmen und dem Palmengarten." },
      { name: "Bornheim", description: "Lebhaftes Viertel mit eigenem Wochenmarkt und vielen Lokalen." },
    ],
    industriegebiete: [
      { name: "Industriepark Höchst", description: "Einer der größten Industrieparks Europas mit Pharma und Chemie." },
      { name: "Flughafen-Gewerbegebiet", description: "Umfangreiches Logistik- und Gewerbeareal rund um den Flughafen." },
    ],
    sehenswuerdigkeiten: ["Römerberg", "Skyline / Bankenviertel", "Palmengarten", "Museumsufer", "Alte Oper"],
    baumaerkte: [],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "duesseldorf",
    name: "Düsseldorf",
    emoji: "🎪",
    tagline: "Messen & Handel",
    bundesland: "Nordrhein-Westfalen (Landeshauptstadt)",
    einwohner: "ca. 640.000",
    flaeche: "217,4 km²",
    hoehe: "38 Meter",
    autobahnen: "A3, A46, A52, A57",
    bahnhof: "Düsseldorf Hauptbahnhof",
    heroDescription: "Düsseldorf, als Landeshauptstadt und internationaler Messestandort, zieht Fachkräfte aus ganz Europa an. Finden Sie die passende Monteurwohnung am Rhein.",
    branchen: "Mode, Werbung, Telekommunikation, IT, Finanzdienstleistungen",
    unternehmen: "Henkel, E.ON, Vodafone, L'Oréal",
    messen: ["drupa", "boot Düsseldorf", "MEDICA", "interpack"],
    stadtteile: [
      { name: "Altstadt", description: "Das historische Herz mit dem 'längsten Tresen der Welt' und traditionellen Brauereien." },
      { name: "Oberkassel", description: "Elegantes Wohngebiet westlich des Rheins mit Villen und Altbauten." },
      { name: "Flingern", description: "Kreativer Hotspot mit Ateliers, Cafés und jungem Lebensstil." },
      { name: "Pempelfort", description: "Lebendiges Wohngebiet mit Altbauflair und guter Anbindung." },
    ],
    industriegebiete: [
      { name: "Industriepark Düsseldorf-Nord", description: "Unternehmen aus Chemie und Automobil mit optimaler Autobahnanbindung." },
      { name: "Düsseldorfer Hafenareal", description: "Logistik- und Dienstleistungsstandort am Rhein." },
    ],
    sehenswuerdigkeiten: ["Rheinturm", "MedienHafen", "Königsallee (Kö)", "Altstadt", "Schloss Benrath"],
    baumaerkte: [
      { stadtteil: "Stadtmitte", name: "Bauhaus Düsseldorf", adresse: "Grafenberger Str. 409, 40237 Düsseldorf" },
      { stadtteil: "Derendorf", name: "Hornbach Düsseldorf-Derendorf", adresse: "Am Damm 13, 40468 Düsseldorf" },
    ],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "stuttgart",
    name: "Stuttgart",
    emoji: "🚗",
    tagline: "Porsche & Bosch",
    bundesland: "Baden-Württemberg (Landeshauptstadt)",
    einwohner: "ca. 630.000",
    flaeche: "207,4 km²",
    hoehe: "245 Meter",
    autobahnen: "A8, A81, A831",
    bahnhof: "Stuttgart Hauptbahnhof",
    heroDescription: "Stuttgart, als Heimat von Porsche, Mercedes-Benz und Bosch, ist ein Premium-Industriestandort. Finden Sie komfortable Monteurzimmer im Kessel.",
    branchen: "Automobil, Maschinenbau, IT, Verlagswesen",
    unternehmen: "Porsche, Mercedes-Benz, Bosch, Daimler Truck",
    messen: ["CMT", "AMB", "Interbad", "Retro Classics"],
    stadtteile: [
      { name: "Stuttgart-Mitte", description: "Das Zentrum mit Königstraße, Schlossplatz und Kulturmeile." },
      { name: "Stuttgart-West", description: "Beliebtes Wohnviertel mit Halbhöhenlage und vielen Cafés." },
      { name: "Bad Cannstatt", description: "Ältester Stadtteil mit Mineralbädern und dem Wasen." },
      { name: "Vaihingen", description: "Universitätsstandort mit Forschungseinrichtungen und Industrie." },
    ],
    industriegebiete: [
      { name: "Porsche-Werk Zuffenhausen", description: "Hauptsitz und Produktionsstandort des Sportwagenherstellers." },
      { name: "Bosch-Campus Renningen", description: "Forschungs- und Entwicklungsstandort des Technologiekonzerns." },
    ],
    sehenswuerdigkeiten: ["Mercedes-Benz Museum", "Porsche Museum", "Schlossplatz", "Wilhelma", "Fernsehturm"],
    baumaerkte: [],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "dortmund",
    name: "Dortmund",
    emoji: "⚙️",
    tagline: "Stahl & Technologie",
    bundesland: "Nordrhein-Westfalen",
    einwohner: "ca. 590.000",
    flaeche: "280,7 km²",
    hoehe: "86 Meter",
    autobahnen: "A1, A2, A40, A44, A45",
    bahnhof: "Dortmund Hauptbahnhof",
    heroDescription: "Dortmund, im Herzen des Ruhrgebiets, wandelt sich vom Stahlstandort zum Technologiezentrum. Finden Sie passende Monteurzimmer in der Westfalenmetropole.",
    branchen: "Stahl, Technologie, Logistik, Versicherungen",
    unternehmen: "Signal Iduna, Wilo, ThyssenKrupp, Continental",
    messen: ["GIFA", "METEC", "THERMPROCESS"],
    stadtteile: [
      { name: "Innenstadt", description: "Belebtes Zentrum mit Westenhellweg als Einkaufsmeile." },
      { name: "Hörde", description: "Stadtteil am Phoenix-See, Symbol des Strukturwandels." },
      { name: "Hombruch", description: "Grüner Wohnstadtteil im Süden mit guter Infrastruktur." },
    ],
    industriegebiete: [
      { name: "Technologiepark Dortmund", description: "Einer der größten Technologieparks Deutschlands mit über 300 Unternehmen." },
      { name: "Westfalenhütte", description: "Ehemaliges Stahlwerk, heute modernes Gewerbe- und Logistikzentrum." },
    ],
    sehenswuerdigkeiten: ["Signal Iduna Park", "Westfalenpark", "Phoenix-See", "Dortmunder U"],
    baumaerkte: [],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "essen",
    name: "Essen",
    emoji: "🔋",
    tagline: "Energiewende & Bau",
    bundesland: "Nordrhein-Westfalen",
    einwohner: "ca. 580.000",
    flaeche: "210,4 km²",
    hoehe: "116 Meter",
    autobahnen: "A40, A42, A52",
    bahnhof: "Essen Hauptbahnhof",
    heroDescription: "Essen, als Sitz von RWE und thyssenkrupp, ist ein wichtiger Energie- und Industriestandort. Finden Sie hier die passende Unterkunft für Ihre Monteure.",
    branchen: "Energie, Stahl, Bau, Handel",
    unternehmen: "RWE, thyssenkrupp, Aldi, Hochtief",
    messen: ["E-world", "Security Essen", "IPM Essen"],
    stadtteile: [
      { name: "Rüttenscheid", description: "Beliebtes Ausgeh- und Wohnviertel mit der Rü als Flaniermeile." },
      { name: "Werden", description: "Historischer Stadtteil an der Ruhr mit Abtei und Altstadt-Charme." },
      { name: "Kettwig", description: "Malerischer Stadtteil mit Fachwerkhäusern und Ruhrufer." },
    ],
    industriegebiete: [
      { name: "thyssenkrupp Quartier", description: "Moderner Hauptsitz des Stahlkonzerns im Essener Westen." },
      { name: "Gewerbegebiet Essen-Kray", description: "Industriestandort mit guter Anbindung an A40 und A42." },
    ],
    sehenswuerdigkeiten: ["Zeche Zollverein", "Baldeneysee", "Museum Folkwang", "Villa Hügel"],
    baumaerkte: [],
    restaurants: [],
    supermaerkte: [],
  },
  {
    slug: "leipzig",
    name: "Leipzig",
    emoji: "🌿",
    tagline: "Wachstumsregion Ost",
    bundesland: "Sachsen",
    einwohner: "ca. 610.000",
    flaeche: "297,8 km²",
    hoehe: "113 Meter",
    autobahnen: "A9, A14, A38",
    bahnhof: "Leipzig Hauptbahnhof",
    heroDescription: "Leipzig, als boomende Stadt in Ostdeutschland und Standort von BMW und Porsche, wächst rasant. Finden Sie komfortable Monteurzimmer in der Messestadt.",
    branchen: "Automobil, Logistik, Medien, Biotechnologie",
    unternehmen: "BMW, Porsche, DHL, Amazon",
    messen: ["Leipziger Buchmesse", "denkmal", "Cadeaux Leipzig"],
    stadtteile: [
      { name: "Plagwitz", description: "Kreatives Viertel mit ehemaligen Industriegebäuden und Spinnerei-Kulturzentrum." },
      { name: "Connewitz", description: "Alternatives Szeneviertel mit Kulturszene und individuellen Geschäften." },
      { name: "Gohlis", description: "Bürgerliches Wohnviertel mit Gründerzeit-Villen und dem Schiller-Haus." },
    ],
    industriegebiete: [
      { name: "BMW Werk Leipzig", description: "Modernes Automobilwerk mit innovativer Produktion des i3 und i8." },
      { name: "DHL Hub Leipzig/Halle", description: "Größtes DHL-Drehkreuz der Welt am Flughafen Leipzig/Halle." },
    ],
    sehenswuerdigkeiten: ["Völkerschlachtdenkmal", "Thomaskirche", "Leipziger Zoo", "Spinnerei", "Nikolaikirche"],
    baumaerkte: [],
    restaurants: [],
    supermaerkte: [],
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}