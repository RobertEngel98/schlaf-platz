// Schlaf-Platz — Constants, Nav, City Data
// All typographic quotes replaced with standard ASCII quotes

export const BRAND = {
  name: "Schlaf-Platz",
  legal: "Schlaf-Platz e.G.",
  domain: "schlaf-platz.com",
  appDomain: "monteurzimmerapartments.de",
  phone: "+4916095460613",
  phonePretty: "+49 160 95460613",
  email: "info@schlaf-platz.com",
  logo: "https://schlaf-platz.com/wp-content/uploads/2025/10/logo-schlaf.png",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100064117628319",
    linkedin: "https://www.linkedin.com/company/schlafplatz/",
    instagram: "https://www.instagram.com/schlafplatz_com/",
  },
  stats: { partners: 1500, cities: 50, rating: 5.0, reviews: 266, team: 23, growth: 223, response: 15 },
} as const;

export const NAV = [
  { label: "Startseite", href: "/" },
  { label: "Unterkunft finden", href: "/mieter" },
  { label: "Karriere", href: "/karriere" },
  { label: "Online Shop", href: "/online-shop" },
] as const;

export const FOOTER = {
  mieter: [
    { label: "Unterkunft finden", href: "/mieter" },
    { label: "Alle Staedte", href: "/#staedte" },
    { label: "Kontakt", href: "/mieter" },
  ],
  vermieter: [
    { label: "Kostenlos inserieren", href: "/app" },
    { label: "Schlaf-Platz App", href: "/app" },
    { label: "Karriere", href: "/karriere" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutzerklaerung" },
    { label: "AGB", href: "/agb" },
  ],
} as const;

export interface CityData {
  slug: string; name: string; emoji: string; tagline: string;
  bundesland: string; einwohner: string; flaeche: string; hoehe: string;
  autobahnen: string; bahnhof: string; heroDesc: string;
  branchen: string; unternehmen: string; messen: string[];
  stadtteile: { name: string; desc: string }[];
  industrie: { name: string; desc: string }[];
  sights: string[];
}

export const CITIES: CityData[] = [
  {
    slug: "berlin", name: "Berlin", emoji: "🏗️", tagline: "Hauptstadt & Bau-Hotspot",
    bundesland: "Berlin (Stadtstaat)", einwohner: "ca. 3.700.000", flaeche: "891,7 km2", hoehe: "34 m",
    autobahnen: "A10, A100, A111, A113, A115", bahnhof: "Berlin Hauptbahnhof",
    heroDesc: "Berlin, als wachsende Hauptstadt und einer der groessten Baustellen Europas, zieht stetig Fachkraefte an. Unsere Monteurzimmer bieten eine ideale Loesung fuer einen entspannten Aufenthalt.",
    branchen: "Bau, IT, Verwaltung, Tourismus, Medien", unternehmen: "Siemens, Deutsche Bahn, Zalando, SAP",
    messen: ["ITB Berlin", "IFA", "InnoTrans", "Fruit Logistica"],
    stadtteile: [
      { name: "Mitte", desc: "Das politische und kulturelle Zentrum Berlins mit Regierungsviertel und Museumsinsel." },
      { name: "Kreuzberg", desc: "Multikulturelles Viertel mit lebendiger Gastro- und Kulturszene." },
      { name: "Charlottenburg", desc: "Elegantes Wohngebiet mit dem Kurfuerstendamm." },
      { name: "Prenzlauer Berg", desc: "Beliebtes Wohnviertel mit Altbauten und jungen Familien." },
    ],
    industrie: [
      { name: "Industriepark Berlin-Marzahn", desc: "Groesstes Gewerbegebiet mit Produktion und Logistik." },
      { name: "Technologiepark Adlershof", desc: "Wissenschafts- und Technologiestandort mit ueber 1.000 Unternehmen." },
    ],
    sights: ["Brandenburger Tor", "Reichstag", "East Side Gallery", "Fernsehturm", "Museumsinsel"],
  },
  {
    slug: "muenchen", name: "Muenchen", emoji: "🏔️", tagline: "BMW, Siemens & mehr",
    bundesland: "Bayern (Landeshauptstadt)", einwohner: "ca. 1.500.000", flaeche: "310,7 km2", hoehe: "519 m",
    autobahnen: "A8, A9, A92, A95, A96, A99", bahnhof: "Muenchen Hauptbahnhof",
    heroDesc: "Muenchen, als Wirtschaftsmetropole Bayerns und Sitz von BMW, Siemens und Allianz, zieht zahlreiche Fachkraefte an.",
    branchen: "Automobil, IT, Versicherungen, Maschinenbau", unternehmen: "BMW, Siemens, Allianz, Munich Re, MAN",
    messen: ["bauma", "ISPO", "electronica", "Expo Real"],
    stadtteile: [
      { name: "Schwabing", desc: "Beliebtes Wohnviertel mit Universitaet, Boutiquen und Cafes." },
      { name: "Maxvorstadt", desc: "Kulturelles Herz Muenchens mit Pinakotheken." },
      { name: "Sendling", desc: "Traditionelles Viertel mit dem bekannten Grossmarkt." },
      { name: "Haidhausen", desc: "Charmantes Viertel oestlich der Isar." },
    ],
    industrie: [
      { name: "Gewerbegebiet Muenchen-Nord", desc: "Grosser Industriestandort mit Logistik." },
      { name: "Industriepark Muenchen-Riem", desc: "Moderner Gewerbepark nahe der Messe." },
    ],
    sights: ["Marienplatz", "Frauenkirche", "Englischer Garten", "Schloss Nymphenburg", "BMW Welt"],
  },
  {
    slug: "hamburg", name: "Hamburg", emoji: "⚓", tagline: "Hafen & Industrie",
    bundesland: "Hamburg (Stadtstaat)", einwohner: "ca. 1.900.000", flaeche: "755,2 km2", hoehe: "6 m",
    autobahnen: "A1, A7, A23, A24, A25, A255", bahnhof: "Hamburg Hauptbahnhof",
    heroDesc: "Hamburg, als Tor zur Welt und zweitgroesste Stadt Deutschlands, ist ein wichtiger Wirtschafts- und Logistikstandort.",
    branchen: "Hafen & Logistik, Luftfahrt, Medien, Erneuerbare Energien", unternehmen: "Airbus, Otto Group, Beiersdorf, Hapag-Lloyd",
    messen: ["SMM", "WindEnergy Hamburg", "Aircraft Interiors Expo"],
    stadtteile: [
      { name: "St. Pauli", desc: "Beruehmt fuer die Reeperbahn mit lebendiger Kulturszene." },
      { name: "Altona", desc: "Vielseitig mit Elbstrand und Fischmarkt." },
      { name: "HafenCity", desc: "Groesstes Stadtentwicklungsprojekt Europas." },
      { name: "Eimsbuettel", desc: "Beliebtes Wohnviertel mit Altbauten." },
    ],
    industrie: [
      { name: "Hamburger Hafen", desc: "Drittgroesster Hafen Europas." },
      { name: "Airbus-Werk Finkenwerder", desc: "Wichtigster Airbus-Produktionsstandort." },
    ],
    sights: ["Elbphilharmonie", "Speicherstadt", "Miniatur Wunderland", "Landungsbruecken", "Rathaus"],
  },
  {
    slug: "koeln", name: "Koeln", emoji: "⛪", tagline: "Ford & Chemiepark",
    bundesland: "Nordrhein-Westfalen", einwohner: "ca. 1.080.000", flaeche: "405,2 km2", hoehe: "53 m",
    autobahnen: "A1, A3, A4, A57, A559", bahnhof: "Koeln Hauptbahnhof",
    heroDesc: "Koeln, als Medien-, Industrie- und Messestadt am Rhein, bietet zahlreiche Einsatzmoeglichkeiten fuer Monteure.",
    branchen: "Automobil (Ford), Chemie, Medien, Versicherungen", unternehmen: "Ford, Lanxess, RTL, Zurich Versicherung",
    messen: ["gamescom", "Anuga", "IMM Cologne", "FIBO"],
    stadtteile: [
      { name: "Altstadt", desc: "Historisches Zentrum rund um den Dom." },
      { name: "Ehrenfeld", desc: "Kreatives Szene-Viertel mit Street Art." },
      { name: "Deutz", desc: "Rechtsrheinisch mit Koelnmesse und Lanxess Arena." },
      { name: "Nippes", desc: "Lebhaftes Wohnviertel mit eigenem Charme." },
    ],
    industrie: [
      { name: "Ford-Werke Koeln-Niehl", desc: "Einer der groessten Automobilstandorte Europas." },
      { name: "Chempark Leverkusen/Koeln", desc: "Einer der groessten Chemieparks Europas." },
    ],
    sights: ["Koelner Dom", "Hohenzollernbruecke", "Rheinufer", "Museum Ludwig", "Schokoladenmuseum"],
  },
  {
    slug: "frankfurt", name: "Frankfurt", emoji: "🏦", tagline: "Banken & Infrastruktur",
    bundesland: "Hessen", einwohner: "ca. 760.000", flaeche: "248,3 km2", hoehe: "112 m",
    autobahnen: "A3, A5, A66, A661", bahnhof: "Frankfurt Hauptbahnhof",
    heroDesc: "Frankfurt am Main, das Finanzzentrum Deutschlands und Sitz der EZB, bietet zahlreiche Einsatzmoeglichkeiten.",
    branchen: "Finanzdienstleistungen, Logistik, Pharma, IT", unternehmen: "Deutsche Bank, EZB, Commerzbank, Fraport",
    messen: ["Frankfurter Buchmesse", "Automechanika", "Light + Building", "Ambiente"],
    stadtteile: [
      { name: "Sachsenhausen", desc: "Bekannt fuer Aeppelwoi-Lokale und Museumsufer." },
      { name: "Nordend", desc: "Beliebtes Wohnviertel mit Gruenderzeit-Architektur." },
      { name: "Westend", desc: "Gehobenes Wohngebiet mit Bankentuermen." },
      { name: "Bornheim", desc: "Lebhaftes Viertel mit eigenem Wochenmarkt." },
    ],
    industrie: [
      { name: "Industriepark Hoechst", desc: "Einer der groessten Industrieparks Europas (Pharma/Chemie)." },
      { name: "Flughafen-Gewerbegebiet", desc: "Umfangreiches Logistik-Areal rund um den Flughafen." },
    ],
    sights: ["Roemerberg", "Skyline / Bankenviertel", "Palmengarten", "Museumsufer", "Alte Oper"],
  },
  {
    slug: "duesseldorf", name: "Duesseldorf", emoji: "🎪", tagline: "Messen & Handel",
    bundesland: "NRW (Landeshauptstadt)", einwohner: "ca. 640.000", flaeche: "217,4 km2", hoehe: "38 m",
    autobahnen: "A3, A46, A52, A57", bahnhof: "Duesseldorf Hauptbahnhof",
    heroDesc: "Duesseldorf, als Landeshauptstadt und internationaler Messestandort, zieht Fachkraefte aus ganz Europa an.",
    branchen: "Mode, Werbung, Telekommunikation, IT, Finanzen", unternehmen: "Henkel, E.ON, Vodafone, L'Oreal",
    messen: ["drupa", "boot Duesseldorf", "MEDICA", "interpack"],
    stadtteile: [
      { name: "Altstadt", desc: "Das historische Herz mit dem laengsten Tresen der Welt." },
      { name: "Oberkassel", desc: "Elegantes Wohngebiet westlich des Rheins." },
      { name: "Flingern", desc: "Kreativer Hotspot mit Ateliers und Cafes." },
      { name: "Pempelfort", desc: "Lebendiges Wohngebiet mit Altbauflair." },
    ],
    industrie: [
      { name: "Industriepark Duesseldorf-Nord", desc: "Chemie und Automobil mit Autobahnanbindung." },
      { name: "Duesseldorfer Hafenareal", desc: "Logistik- und Dienstleistungsstandort am Rhein." },
    ],
    sights: ["Rheinturm", "MedienHafen", "Koenigsallee (Koe)", "Altstadt", "Schloss Benrath"],
  },
  {
    slug: "stuttgart", name: "Stuttgart", emoji: "🚗", tagline: "Porsche & Bosch",
    bundesland: "Baden-Wuerttemberg (Landeshauptstadt)", einwohner: "ca. 630.000", flaeche: "207,4 km2", hoehe: "245 m",
    autobahnen: "A8, A81, A831", bahnhof: "Stuttgart Hauptbahnhof",
    heroDesc: "Stuttgart, als Heimat von Porsche, Mercedes-Benz und Bosch, ist ein Premium-Industriestandort.",
    branchen: "Automobil, Maschinenbau, IT, Verlagswesen", unternehmen: "Porsche, Mercedes-Benz, Bosch, Daimler Truck",
    messen: ["CMT", "AMB", "Interbad", "Retro Classics"],
    stadtteile: [
      { name: "Stuttgart-Mitte", desc: "Das Zentrum mit Koenigstrasse und Schlossplatz." },
      { name: "Stuttgart-West", desc: "Beliebtes Wohnviertel mit Halbhoehenlage." },
      { name: "Bad Cannstatt", desc: "Aeltester Stadtteil mit Mineralbaedern und dem Wasen." },
      { name: "Vaihingen", desc: "Universitaetsstandort mit Forschungseinrichtungen." },
    ],
    industrie: [
      { name: "Porsche-Werk Zuffenhausen", desc: "Hauptsitz und Produktion des Sportwagenherstellers." },
      { name: "Bosch-Campus Renningen", desc: "Forschungs- und Entwicklungsstandort." },
    ],
    sights: ["Mercedes-Benz Museum", "Porsche Museum", "Schlossplatz", "Wilhelma", "Fernsehturm"],
  },
  {
    slug: "dortmund", name: "Dortmund", emoji: "⚙️", tagline: "Stahl & Technologie",
    bundesland: "Nordrhein-Westfalen", einwohner: "ca. 590.000", flaeche: "280,7 km2", hoehe: "86 m",
    autobahnen: "A1, A2, A40, A44, A45", bahnhof: "Dortmund Hauptbahnhof",
    heroDesc: "Dortmund, im Herzen des Ruhrgebiets, wandelt sich vom Stahlstandort zum Technologiezentrum.",
    branchen: "Stahl, Technologie, Logistik, Versicherungen", unternehmen: "Signal Iduna, Wilo, ThyssenKrupp, Continental",
    messen: ["GIFA", "METEC", "THERMPROCESS"],
    stadtteile: [
      { name: "Innenstadt", desc: "Belebtes Zentrum mit Westenhellweg." },
      { name: "Hoerde", desc: "Stadtteil am Phoenix-See, Symbol des Strukturwandels." },
      { name: "Hombruch", desc: "Gruener Wohnstadtteil im Sueden." },
    ],
    industrie: [
      { name: "Technologiepark Dortmund", desc: "Einer der groessten Technologieparks Deutschlands." },
      { name: "Westfalenhuette", desc: "Ehemaliges Stahlwerk, heute Gewerbe- und Logistikzentrum." },
    ],
    sights: ["Signal Iduna Park", "Westfalenpark", "Phoenix-See", "Dortmunder U"],
  },
  {
    slug: "essen", name: "Essen", emoji: "🔋", tagline: "Energiewende & Bau",
    bundesland: "Nordrhein-Westfalen", einwohner: "ca. 580.000", flaeche: "210,4 km2", hoehe: "116 m",
    autobahnen: "A40, A42, A52", bahnhof: "Essen Hauptbahnhof",
    heroDesc: "Essen, als Sitz von RWE und thyssenkrupp, ist ein wichtiger Energie- und Industriestandort.",
    branchen: "Energie, Stahl, Bau, Handel", unternehmen: "RWE, thyssenkrupp, Aldi, Hochtief",
    messen: ["E-world", "Security Essen", "IPM Essen"],
    stadtteile: [
      { name: "Ruettenscheid", desc: "Beliebtes Ausgeh- und Wohnviertel." },
      { name: "Werden", desc: "Historischer Stadtteil an der Ruhr." },
      { name: "Kettwig", desc: "Malerischer Stadtteil mit Fachwerkhaeusern." },
    ],
    industrie: [
      { name: "thyssenkrupp Quartier", desc: "Moderner Hauptsitz im Essener Westen." },
      { name: "Gewerbegebiet Essen-Kray", desc: "Industriestandort an A40 und A42." },
    ],
    sights: ["Zeche Zollverein", "Baldeneysee", "Museum Folkwang", "Villa Huegel"],
  },
  {
    slug: "leipzig", name: "Leipzig", emoji: "🌿", tagline: "Wachstumsregion Ost",
    bundesland: "Sachsen", einwohner: "ca. 610.000", flaeche: "297,8 km2", hoehe: "113 m",
    autobahnen: "A9, A14, A38", bahnhof: "Leipzig Hauptbahnhof",
    heroDesc: "Leipzig, als boomende Stadt in Ostdeutschland und Standort von BMW und Porsche, waechst rasant.",
    branchen: "Automobil, Logistik, Medien, Biotechnologie", unternehmen: "BMW, Porsche, DHL, Amazon",
    messen: ["Leipziger Buchmesse", "denkmal", "Cadeaux Leipzig"],
    stadtteile: [
      { name: "Plagwitz", desc: "Kreatives Viertel mit ehemaligen Industriegebaeuden." },
      { name: "Connewitz", desc: "Alternatives Szeneviertel mit Kulturszene." },
      { name: "Gohlis", desc: "Buergerliches Wohnviertel mit Gruenderzeit-Villen." },
    ],
    industrie: [
      { name: "BMW Werk Leipzig", desc: "Modernes Automobilwerk." },
      { name: "DHL Hub Leipzig/Halle", desc: "Groesstes DHL-Drehkreuz der Welt." },
    ],
    sights: ["Voelkerschlachtdenkmal", "Thomaskirche", "Leipziger Zoo", "Spinnerei", "Nikolaikirche"],
  },
];

export function getCityBySlug(slug: string) { return CITIES.find(c => c.slug === slug); }
export function getAllCitySlugs() { return CITIES.map(c => c.slug); }
