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
  { slug: "berlin", name: "Berlin", emoji: "\uD83C\uDFD7", tagline: "Hauptstadt & Bau-Hotspot", bundesland: "Berlin (Stadtstaat)", einwohner: "ca. 3.700.000", flaeche: "891,7 km\u00B2", hoehe: "34 m", autobahnen: "A10, A100, A111, A113, A115", bahnhof: "Berlin Hauptbahnhof", heroDesc: "Berlin, als wachsende Hauptstadt und einer der groessten Baustellen Europas, zieht stetig Fachkraefte an.", branchen: "Bau, IT, Verwaltung, Tourismus, Medien", unternehmen: "Siemens, Deutsche Bahn, Zalando, SAP", messen: ["ITB Berlin", "IFA", "InnoTrans", "Fruit Logistica"], stadtteile: [{ name: "Mitte", desc: "Politisches und kulturelles Zentrum." }, { name: "Kreuzberg", desc: "Multikulturelles Viertel." }, { name: "Charlottenburg", desc: "Elegant am Kurfuerstendamm." }, { name: "Prenzlauer Berg", desc: "Beliebtes Wohnviertel." }], industrie: [{ name: "Industriepark Marzahn", desc: "Groesstes Gewerbegebiet." }, { name: "Technologiepark Adlershof", desc: "Ueber 1.000 Unternehmen." }], sights: ["Brandenburger Tor", "Reichstag", "East Side Gallery", "Fernsehturm", "Museumsinsel"] },
  { slug: "muenchen", name: "Muenchen", emoji: "\uD83C\uDFD4", tagline: "BMW, Siemens & mehr", bundesland: "Bayern (LH)", einwohner: "ca. 1.500.000", flaeche: "310,7 km\u00B2", hoehe: "519 m", autobahnen: "A8, A9, A92, A95, A96, A99", bahnhof: "Muenchen Hbf", heroDesc: "Wirtschaftsmetropole Bayerns und Sitz von BMW, Siemens und Allianz.", branchen: "Automobil, IT, Versicherungen, Maschinenbau", unternehmen: "BMW, Siemens, Allianz, Munich Re", messen: ["bauma", "ISPO", "electronica", "Expo Real"], stadtteile: [{ name: "Schwabing", desc: "Beliebtes Uni-Viertel." }, { name: "Maxvorstadt", desc: "Kulturelles Herz." }, { name: "Sendling", desc: "Traditionell mit Grossmarkt." }, { name: "Haidhausen", desc: "Charmant oestlich der Isar." }], industrie: [{ name: "Gewerbegebiet Nord", desc: "Grosser Industriestandort." }, { name: "Industriepark Riem", desc: "Moderner Gewerbepark." }], sights: ["Marienplatz", "Frauenkirche", "Englischer Garten", "Schloss Nymphenburg", "BMW Welt"] },
  { slug: "hamburg", name: "Hamburg", emoji: "\u2693", tagline: "Hafen & Industrie", bundesland: "Hamburg (Stadtstaat)", einwohner: "ca. 1.900.000", flaeche: "755,2 km\u00B2", hoehe: "6 m", autobahnen: "A1, A7, A23, A24, A25", bahnhof: "Hamburg Hbf", heroDesc: "Tor zur Welt und wichtiger Wirtschafts- und Logistikstandort.", branchen: "Hafen & Logistik, Luftfahrt, Medien, Erneuerbare Energien", unternehmen: "Airbus, Otto Group, Beiersdorf, Hapag-Lloyd", messen: ["SMM", "WindEnergy Hamburg", "Aircraft Interiors Expo"], stadtteile: [{ name: "St. Pauli", desc: "Beruehmt fuer die Reeperbahn." }, { name: "Altona", desc: "Vielseitig mit Elbstrand." }, { name: "HafenCity", desc: "Groesstes Stadtentwicklungsprojekt." }, { name: "Eimsbuettel", desc: "Beliebtes Wohnviertel." }], industrie: [{ name: "Hamburger Hafen", desc: "Drittgroesster Hafen Europas." }, { name: "Airbus Finkenwerder", desc: "Wichtigster Produktionsstandort." }], sights: ["Elbphilharmonie", "Speicherstadt", "Miniatur Wunderland", "Landungsbruecken", "Rathaus"] },
  { slug: "koeln", name: "Koeln", emoji: "\u26EA", tagline: "Ford & Chemiepark", bundesland: "NRW", einwohner: "ca. 1.080.000", flaeche: "405,2 km\u00B2", hoehe: "53 m", autobahnen: "A1, A3, A4, A57", bahnhof: "Koeln Hbf", heroDesc: "Medien-, Industrie- und Messestadt am Rhein.", branchen: "Automobil (Ford), Chemie, Medien, Versicherungen", unternehmen: "Ford, Lanxess, RTL, Zurich", messen: ["gamescom", "Anuga", "IMM Cologne", "FIBO"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Ehrenfeld", desc: "Kreatives Szene-Viertel." }, { name: "Deutz", desc: "Rechtsrheinisch mit Messe." }, { name: "Nippes", desc: "Lebhaftes Wohnviertel." }], industrie: [{ name: "Ford-Werke Niehl", desc: "Groesster Automobilstandort." }, { name: "Chempark Leverkusen", desc: "Einer der groessten Chemieparks." }], sights: ["Koelner Dom", "Hohenzollernbruecke", "Rheinufer", "Museum Ludwig", "Schokoladenmuseum"] },
  { slug: "frankfurt", name: "Frankfurt", emoji: "\uD83C\uDFE6", tagline: "Banken & Infrastruktur", bundesland: "Hessen", einwohner: "ca. 760.000", flaeche: "248,3 km\u00B2", hoehe: "112 m", autobahnen: "A3, A5, A66, A661", bahnhof: "Frankfurt Hbf", heroDesc: "Finanzzentrum und Sitz der EZB.", branchen: "Finanz, Logistik, Pharma, IT", unternehmen: "Deutsche Bank, EZB, Commerzbank, Fraport", messen: ["Buchmesse", "Automechanika", "Light + Building", "Ambiente"], stadtteile: [{ name: "Sachsenhausen", desc: "Bekannt fuer Aeppelwoi." }, { name: "Nordend", desc: "Beliebtes Gruenderzeit-Viertel." }, { name: "Westend", desc: "Gehobenes Bankenviertel." }, { name: "Bornheim", desc: "Lebhaft mit Wochenmarkt." }], industrie: [{ name: "Industriepark Hoechst", desc: "Einer der groessten in Europa." }, { name: "Flughafen-Gewerbegebiet", desc: "Logistik-Areal." }], sights: ["Roemerberg", "Skyline", "Palmengarten", "Museumsufer", "Alte Oper"] },
  { slug: "duesseldorf", name: "Duesseldorf", emoji: "\uD83C\uDFAA", tagline: "Messen & Handel", bundesland: "NRW (LH)", einwohner: "ca. 640.000", flaeche: "217,4 km\u00B2", hoehe: "38 m", autobahnen: "A3, A46, A52, A57", bahnhof: "Duesseldorf Hbf", heroDesc: "Landeshauptstadt und internationaler Messestandort.", branchen: "Mode, Werbung, Telekommunikation, IT", unternehmen: "Henkel, E.ON, Vodafone, L'Oreal", messen: ["drupa", "boot", "MEDICA", "interpack"], stadtteile: [{ name: "Altstadt", desc: "Laengster Tresen der Welt." }, { name: "Oberkassel", desc: "Elegant am Rhein." }, { name: "Flingern", desc: "Kreativer Hotspot." }, { name: "Pempelfort", desc: "Lebendiges Wohngebiet." }], industrie: [{ name: "Industriepark Nord", desc: "Chemie und Automobil." }, { name: "Hafenareal", desc: "Logistik am Rhein." }], sights: ["Rheinturm", "MedienHafen", "Koenigsallee", "Altstadt", "Schloss Benrath"] },
  { slug: "stuttgart", name: "Stuttgart", emoji: "\uD83D\uDE97", tagline: "Porsche & Bosch", bundesland: "BW (LH)", einwohner: "ca. 630.000", flaeche: "207,4 km\u00B2", hoehe: "245 m", autobahnen: "A8, A81, A831", bahnhof: "Stuttgart Hbf", heroDesc: "Heimat von Porsche, Mercedes-Benz und Bosch.", branchen: "Automobil, Maschinenbau, IT", unternehmen: "Porsche, Mercedes-Benz, Bosch, Daimler Truck", messen: ["CMT", "AMB", "Interbad", "Retro Classics"], stadtteile: [{ name: "Mitte", desc: "Zentrum mit Koenigstrasse." }, { name: "Stuttgart-West", desc: "Beliebtes Wohnviertel." }, { name: "Bad Cannstatt", desc: "Aeltester Stadtteil." }, { name: "Vaihingen", desc: "Uni- und Forschungsstandort." }], industrie: [{ name: "Porsche Zuffenhausen", desc: "Hauptsitz des Sportwagenherstellers." }, { name: "Bosch Renningen", desc: "F&E-Campus." }], sights: ["Mercedes-Benz Museum", "Porsche Museum", "Schlossplatz", "Wilhelma", "Fernsehturm"] },
  { slug: "dortmund", name: "Dortmund", emoji: "\u2699", tagline: "Stahl & Technologie", bundesland: "NRW", einwohner: "ca. 590.000", flaeche: "280,7 km\u00B2", hoehe: "86 m", autobahnen: "A1, A2, A40, A44, A45", bahnhof: "Dortmund Hbf", heroDesc: "Im Herzen des Ruhrgebiets, vom Stahl zum Technologiezentrum.", branchen: "Stahl, Technologie, Logistik, Versicherungen", unternehmen: "Signal Iduna, Wilo, ThyssenKrupp", messen: ["GIFA", "METEC", "THERMPROCESS"], stadtteile: [{ name: "Innenstadt", desc: "Belebtes Zentrum." }, { name: "Hoerde", desc: "Am Phoenix-See." }, { name: "Hombruch", desc: "Gruener Sueden." }], industrie: [{ name: "Technologiepark", desc: "300+ Unternehmen." }, { name: "Westfalenhuette", desc: "Ehem. Stahlwerk, heute Gewerbe." }], sights: ["Signal Iduna Park", "Westfalenpark", "Phoenix-See", "Dortmunder U"] },
  { slug: "essen", name: "Essen", emoji: "\uD83D\uDD0B", tagline: "Energiewende & Bau", bundesland: "NRW", einwohner: "ca. 580.000", flaeche: "210,4 km\u00B2", hoehe: "116 m", autobahnen: "A40, A42, A52", bahnhof: "Essen Hbf", heroDesc: "Sitz von RWE und thyssenkrupp, wichtiger Energie- und Industriestandort.", branchen: "Energie, Stahl, Bau, Handel", unternehmen: "RWE, thyssenkrupp, Aldi, Hochtief", messen: ["E-world", "Security Essen", "IPM Essen"], stadtteile: [{ name: "Ruettenscheid", desc: "Beliebtes Ausgeh-Viertel." }, { name: "Werden", desc: "Historisch an der Ruhr." }, { name: "Kettwig", desc: "Malerisch mit Fachwerk." }], industrie: [{ name: "thyssenkrupp Quartier", desc: "Moderner Hauptsitz." }, { name: "Gewerbegebiet Kray", desc: "An A40 und A42." }], sights: ["Zeche Zollverein", "Baldeneysee", "Museum Folkwang", "Villa Huegel"] },
  { slug: "leipzig", name: "Leipzig", emoji: "\uD83C\uDF3F", tagline: "Wachstumsregion Ost", bundesland: "Sachsen", einwohner: "ca. 610.000", flaeche: "297,8 km\u00B2", hoehe: "113 m", autobahnen: "A9, A14, A38", bahnhof: "Leipzig Hbf", heroDesc: "Boomende Stadt und Standort von BMW und Porsche.", branchen: "Automobil, Logistik, Medien, Biotech", unternehmen: "BMW, Porsche, DHL, Amazon", messen: ["Buchmesse", "denkmal", "Cadeaux Leipzig"], stadtteile: [{ name: "Plagwitz", desc: "Kreatives Industrieviertel." }, { name: "Connewitz", desc: "Alternatives Szeneviertel." }, { name: "Gohlis", desc: "Gruenderzeit-Villen." }], industrie: [{ name: "BMW Werk", desc: "Modernes Automobilwerk." }, { name: "DHL Hub", desc: "Groesstes DHL-Drehkreuz der Welt." }], sights: ["Voelkerschlachtdenkmal", "Thomaskirche", "Zoo", "Spinnerei", "Nikolaikirche"] },
];

export function getCityBySlug(slug: string) { return CITIES.find(c => c.slug === slug); }
export function getAllCitySlugs() { return CITIES.map(c => c.slug); }
