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
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER = {
  mieter: [
    { label: "Unterkunft finden", href: "/mieter" },
    { label: "Alle Staedte", href: "/#staedte" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/mieter" },
  ],
  vermieter: [
    { label: "Kostenlos inserieren", href: "/app" },
    { label: "Schlaf-Platz App", href: "/app" },
    { label: "Online Shop", href: "/online-shop" },
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
  { slug: "hannover", name: "Hannover", emoji: "\uD83C\uDFED", tagline: "Messe & Industrie", bundesland: "Niedersachsen (LH)", einwohner: "ca. 535.000", flaeche: "204,0 km\u00B2", hoehe: "55 m", autobahnen: "A2, A7, A37, A352", bahnhof: "Hannover Hbf", heroDesc: "Messestadt Nr. 1 und wichtiger Industriestandort in Norddeutschland.", branchen: "Messe, Automobil, Versicherungen, IT", unternehmen: "Continental, VW Nutzfahrzeuge, Hannover Rueck, TUI", messen: ["HANNOVER MESSE", "CeBIT", "IAA Transportation", "LIGNA"], stadtteile: [{ name: "Linden", desc: "Alternatives Kulturviertel." }, { name: "List", desc: "Beliebtes Wohnviertel." }, { name: "Herrenhausen", desc: "Beruehmt fuer die Gaerten." }], industrie: [{ name: "VW Nutzfahrzeuge Werk", desc: "Transporter-Produktion." }, { name: "Continental Zentrale", desc: "Reifenhersteller-Hauptsitz." }], sights: ["Herrenhaeuser Gaerten", "Neues Rathaus", "Maschsee", "Altstadt"] },
  { slug: "nuernberg", name: "Nuernberg", emoji: "\uD83C\uDFF0", tagline: "Technik & Tradition", bundesland: "Bayern", einwohner: "ca. 520.000", flaeche: "186,4 km\u00B2", hoehe: "309 m", autobahnen: "A3, A6, A9, A73", bahnhof: "Nuernberg Hbf", heroDesc: "Zweitgroesste Stadt Bayerns mit starker Industrie und Messetradition.", branchen: "Elektrotechnik, Maschinenbau, Spielzeug, IT", unternehmen: "Siemens, Datev, GfK, Schwan-Stabilo", messen: ["Spielwarenmesse", "SPS", "BrauBeviale", "BIOFACH"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Burg." }, { name: "St. Johannis", desc: "Gehoben mit Gruenflaechen." }, { name: "Goestenhof", desc: "Aufstrebendes Kreativviertel." }], industrie: [{ name: "Siemens Campus", desc: "Moderner Technologiecampus." }, { name: "Hafen Nuernberg", desc: "Wichtiger Binnenhafen." }], sights: ["Kaiserburg", "Altstadt", "DB Museum", "Tiergarten"] },
  { slug: "dresden", name: "Dresden", emoji: "\uD83C\uDFDB", tagline: "Silicon Saxony", bundesland: "Sachsen (LH)", einwohner: "ca. 560.000", flaeche: "328,5 km\u00B2", hoehe: "113 m", autobahnen: "A4, A13, A17", bahnhof: "Dresden Hbf", heroDesc: "Hightech-Standort und Kulturmetropole an der Elbe — Europas groesstes Halbleiter-Cluster.", branchen: "Halbleiter, Maschinenbau, Pharma, Tourismus", unternehmen: "Infineon, Globalfoundries, Bosch, SAP", messen: ["SemperOpernball", "SEMICON Europa"], stadtteile: [{ name: "Neustadt", desc: "Alternatives Szeneviertel." }, { name: "Blasewitz", desc: "Gruene Villengegend." }, { name: "Striesen", desc: "Beliebtes Familienviertel." }], industrie: [{ name: "Silicon Saxony", desc: "Groesstes Halbleiter-Cluster Europas." }, { name: "Bosch Halbleiterwerk", desc: "Milliarden-Investition." }], sights: ["Frauenkirche", "Zwinger", "Semperoper", "Bruehls Terrasse"] },
  { slug: "bremen", name: "Bremen", emoji: "\u2693", tagline: "Hafen & Luft-/Raumfahrt", bundesland: "Bremen (Stadtstaat)", einwohner: "ca. 570.000", flaeche: "326,7 km\u00B2", hoehe: "11 m", autobahnen: "A1, A27, A28, A281", bahnhof: "Bremen Hbf", heroDesc: "Hafenstadt mit Schwerpunkt auf Luft- und Raumfahrt, Logistik und Lebensmittelindustrie.", branchen: "Luft-/Raumfahrt, Logistik, Lebensmittel, Automobil", unternehmen: "Airbus Defence, OHB, Mercedes-Benz, Beck's", messen: ["Hanselife", "Fish International"], stadtteile: [{ name: "Viertel", desc: "Studentisches Szeneviertel." }, { name: "Schwachhausen", desc: "Gehoben mit Villen." }, { name: "Ueberseestadt", desc: "Modernes Hafenquartier." }], industrie: [{ name: "Airbus-Werk Bremen", desc: "Tragflaechenproduktion." }, { name: "Mercedes-Benz Werk", desc: "Autoherstellung." }], sights: ["Bremer Stadtmusikanten", "Rathaus", "Schnoor", "Ueberseestadt"] },
  { slug: "duisburg", name: "Duisburg", emoji: "\uD83D\uDEA2", tagline: "Europas groesster Binnenhafen", bundesland: "NRW", einwohner: "ca. 500.000", flaeche: "232,8 km\u00B2", hoehe: "33 m", autobahnen: "A2, A3, A40, A42, A59", bahnhof: "Duisburg Hbf", heroDesc: "Standort des groessten Binnenhafens Europas und im Wandel vom Stahl zur Logistik.", branchen: "Stahl, Logistik, Hafen, Chemie", unternehmen: "thyssenkrupp Steel, Klöckner, duisport", messen: ["Logistik-Konferenzen am Hafen"], stadtteile: [{ name: "Innenhafen", desc: "Revitalisiertes Hafenviertel." }, { name: "Rheinhausen", desc: "Ehemaliges Krupp-Viertel." }, { name: "Meiderich", desc: "Nahe am Landschaftspark." }], industrie: [{ name: "duisport", desc: "Groesster Binnenhafen Europas." }, { name: "thyssenkrupp Steel", desc: "Stahlproduktion." }], sights: ["Landschaftspark Nord", "Innenhafen", "Tiger & Turtle", "Lehmbruck Museum"] },
  { slug: "bochum", name: "Bochum", emoji: "\u2699", tagline: "Uni & Innovation", bundesland: "NRW", einwohner: "ca. 365.000", flaeche: "145,7 km\u00B2", hoehe: "100 m", autobahnen: "A40, A43, A44, A448", bahnhof: "Bochum Hbf", heroDesc: "Universitaetsstadt im Ruhrgebiet mit wachsendem IT- und Gesundheitssektor.", branchen: "IT-Sicherheit, Gesundheit, Automobil, Bildung", unternehmen: "Vonovia, GEA, Knappschaft", messen: ["it-sa Community (IT-Security)"], stadtteile: [{ name: "Ehrenfeld", desc: "Studentisches Viertel." }, { name: "Stiepel", desc: "Gruen am Kemnader See." }, { name: "Langendreer", desc: "Kulturell vielfaeltig." }], industrie: [{ name: "MARK 51 7", desc: "Innovationscampus auf ex-Opel-Gelaende." }, { name: "Gesundheitscampus", desc: "Medizinforschung NRW." }], sights: ["Deutsches Bergbau-Museum", "Starlight Express Theater", "Bermuda3eck", "Kemnader See"] },
  { slug: "wuppertal", name: "Wuppertal", emoji: "\uD83D\uDE9F", tagline: "Schwebebahn & Handwerk", bundesland: "NRW", einwohner: "ca. 355.000", flaeche: "168,4 km\u00B2", hoehe: "160 m", autobahnen: "A1, A46, A535", bahnhof: "Wuppertal Hbf", heroDesc: "Industriestadt im Bergischen Land, bekannt fuer die Schwebebahn und starke Handwerkstradition.", branchen: "Chemie, Textil, Maschinenbau, Handwerk", unternehmen: "Bayer (Standort), Vorwerk, Knipex", messen: [], stadtteile: [{ name: "Elberfeld", desc: "Stadtzentrum mit Einkaufsmeile." }, { name: "Barmen", desc: "Historisches Zentrum." }, { name: "Cronenberg", desc: "Handwerker-Stadtteil." }], industrie: [{ name: "Industriegebiet Nuetzenberg", desc: "Vielfaeltiger Gewerbestandort." }, { name: "Technologiezentrum W-tec", desc: "Gruenderfoerderung." }], sights: ["Schwebebahn", "Von der Heydt-Museum", "Botanischer Garten", "Skulpturenpark"] },
  { slug: "bielefeld", name: "Bielefeld", emoji: "\uD83C\uDFED", tagline: "Maschinenbau & IT", bundesland: "NRW", einwohner: "ca. 335.000", flaeche: "258,8 km\u00B2", hoehe: "118 m", autobahnen: "A2, A33", bahnhof: "Bielefeld Hbf", heroDesc: "Ostwestfaelische Wirtschaftsmetropole mit starkem Mittelstand und IT-Branche.", branchen: "Maschinenbau, Lebensmittel, IT, Textil", unternehmen: "Dr. Oetker, Schueco, DMG Mori, Goldbeck", messen: ["Bethel-Lauf", "Weinbrunnenfest"], stadtteile: [{ name: "Mitte", desc: "Kompaktes Stadtzentrum." }, { name: "Schildesche", desc: "Nah am Obersee." }, { name: "Brackwede", desc: "Nahe Teutoburger Wald." }], industrie: [{ name: "Schueco Zentrale", desc: "Fenster- und Fassadensysteme." }, { name: "Dr. Oetker Werk", desc: "Lebensmittelproduktion." }], sights: ["Sparrenburg", "Teutoburger Wald", "Kunsthalle", "Botanischer Garten"] },
  { slug: "bonn", name: "Bonn", emoji: "\uD83C\uDFDB", tagline: "UN-Stadt & Telekom", bundesland: "NRW", einwohner: "ca. 330.000", flaeche: "141,1 km\u00B2", hoehe: "60 m", autobahnen: "A555, A559, A565", bahnhof: "Bonn Hbf", heroDesc: "Ehemalige Bundeshauptstadt und UN-Standort mit starkem oeffentlichen Sektor und Telekommunikation.", branchen: "Telekommunikation, UN/NGOs, Oeffentlicher Dienst, Logistik", unternehmen: "Deutsche Telekom, Deutsche Post, United Nations", messen: ["Bonner Matheturnier"], stadtteile: [{ name: "Bad Godesberg", desc: "Diplomatenviertel am Rhein." }, { name: "Beuel", desc: "Rechtsrheinisch, lebendig." }, { name: "Zentrum", desc: "Kompakt mit Uni-Flair." }], industrie: [{ name: "Telekom Campus", desc: "Europas groesstes Telekommunikationszentrum." }, { name: "UN Campus", desc: "23 UN-Organisationen." }], sights: ["Beethoven-Haus", "Bundeskunsthalle", "Alter Zoll", "Drachenfels"] },
];

export function getCityBySlug(slug: string) { return CITIES.find(c => c.slug === slug); }
export function getAllCitySlugs() { return CITIES.map(c => c.slug); }

// ═══ BLOG ═══

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "monteurzimmer-steuer-absetzen",
    title: "Monteurzimmer von der Steuer absetzen — So geht's",
    excerpt: "Erfahren Sie, welche Kosten fuer Monteurzimmer steuerlich absetzbar sind und worauf Unternehmen und Arbeitnehmer achten muessen.",
    category: "Steuern & Recht",
    readTime: "5 Min.",
    date: "2026-02-20",
    content: `<h2>Monteurzimmer als Betriebsausgabe</h2>
<p>Unternehmen, die ihre Mitarbeiter auf Montage oder zu Projekten in andere Staedte entsenden, koennen die Kosten fuer Monteurzimmer in der Regel als Betriebsausgaben steuerlich geltend machen. Dies gilt sowohl fuer die reine Unterkunft als auch fuer damit verbundene Nebenkosten.</p>
<h2>Welche Kosten sind absetzbar?</h2>
<ul>
<li><strong>Uebernachtungskosten:</strong> Die tatsaechlichen Kosten fuer das Monteurzimmer sind vollstaendig als Betriebsausgabe absetzbar.</li>
<li><strong>Verpflegungsmehraufwand:</strong> Fuer die ersten drei Monate einer Auswaeertstaetigkeit gelten Pauschalen — 14 Euro bei mehr als 8 Stunden, 28 Euro bei 24 Stunden Abwesenheit.</li>
<li><strong>Fahrtkosten:</strong> An- und Abreise zum Montageort sowie Fahrten zwischen Unterkunft und Einsatzort sind absetzbar.</li>
<li><strong>Nebenkosten:</strong> WLAN, Parkplatzgebuehren und Reinigungskosten koennen ebenfalls geltend gemacht werden.</li>
</ul>
<h2>Doppelte Haushaltsfuehrung</h2>
<p>Bei laengeren Einsaetzen kann eine doppelte Haushaltsfuehrung vorliegen. In diesem Fall sind die Unterkunftskosten bis zu 1.000 Euro monatlich absetzbar. Voraussetzung ist, dass der Arbeitnehmer am Heimatort einen eigenen Haushalt unterhaeelt.</p>
<h2>Tipps fuer die Praxis</h2>
<p>Bewahren Sie alle Belege sorgfaeltig auf. Bei Monteurzimmern ueber Schlaf-Platz erhalten Sie automatisch eine ordnungsgemaesse Rechnung, die alle steuerlich relevanten Angaben enthaelt. Fragen Sie im Zweifel Ihren Steuerberater — die Investition in professionelle Beratung lohnt sich bei regelmaessigen Montage-Einsaetzen.</p>`,
  },
  {
    slug: "monteurzimmer-preise-2026",
    title: "Monteurzimmer Preise 2026 — Was kostet ein Monteurzimmer?",
    excerpt: "Aktuelle Preise fuer Monteurzimmer in Deutschland: Von guenstigen Angeboten ab 15€/Nacht bis zu Premium-Apartments in Grossstaedten.",
    category: "Preise & Markt",
    readTime: "4 Min.",
    date: "2026-02-15",
    content: `<h2>Aktuelle Preisspanne 2026</h2>
<p>Die Preise fuer Monteurzimmer in Deutschland variieren je nach Stadt, Lage, Ausstattung und Buchungsdauer erheblich. Im Durchschnitt liegen die Kosten zwischen 15 und 45 Euro pro Nacht und Person.</p>
<h2>Preise nach Staedten</h2>
<ul>
<li><strong>Berlin:</strong> 18-35 EUR/Nacht — Grosse Auswahl, besonders guenstig in Randlagen wie Marzahn oder Spandau.</li>
<li><strong>Muenchen:</strong> 25-50 EUR/Nacht — Hoechstes Preisniveau, hohe Nachfrage durch BMW, Siemens und Messe-Events.</li>
<li><strong>Hamburg:</strong> 20-40 EUR/Nacht — Gute Verfuegbarkeit, besonders im Hafenumfeld.</li>
<li><strong>Koeln/Duesseldorf:</strong> 18-35 EUR/Nacht — Waehrend grosser Messen (gamescom, MEDICA) deutlich teurer.</li>
<li><strong>Stuttgart:</strong> 22-42 EUR/Nacht — Automobilindustrie treibt die Nachfrage.</li>
<li><strong>Leipzig/Dortmund/Essen:</strong> 15-28 EUR/Nacht — Guenstigstes Preisniveau unter den Grossstaedten.</li>
</ul>
<h2>Was beeinflusst den Preis?</h2>
<p>Die wichtigsten Preisfaktoren sind die Buchungsdauer (laengere Aufenthalte sind pro Nacht guenstiger), die Apartment-Groesse, die Naehe zu Industriegebieten und die Jahreszeit. Waehrend grosser Messen und Events koennen Preise um 30-50% steigen.</p>
<h2>Spartipps</h2>
<p>Buchen Sie fruehzeitig, waehlen Sie Randlagen mit guter OEPNV-Anbindung, und fragen Sie nach Langzeit-Rabatten. Bei Schlaf-Platz ist die Vermittlung komplett kostenlos — Sie zahlen nur die reine Miete, ohne versteckte Gebuehren oder Provisionen.</p>`,
  },
  {
    slug: "monteurzimmer-vermieten-leitfaden",
    title: "Monteurzimmer vermieten — Der komplette Leitfaden",
    excerpt: "Von der Einrichtung bis zur ersten Buchung: Alles, was Vermieter ueber die Vermietung von Monteurzimmern wissen muessen.",
    category: "Fuer Vermieter",
    readTime: "7 Min.",
    date: "2026-02-10",
    content: `<h2>Warum Monteurzimmer vermieten?</h2>
<p>Die Vermietung von moeblierten Apartments an Monteure und Handwerker ist ein lukratives Geschaeftsmodell. Die Nachfrage ist hoch, die Mieten liegen deutlich ueber dem regulaeren Wohnungsmarkt, und die Auslastung ist bei professioneller Vermarktung nahezu ganzjaehrig gewaehrleistet.</p>
<h2>Voraussetzungen fuer Ihr Apartment</h2>
<ul>
<li><strong>Voll moebliert:</strong> Bett, Schrank, Tisch, Stuehle — alles, was man zum Wohnen braucht.</li>
<li><strong>Kueche:</strong> Mindestens eine Kochgelegenheit mit Herd, Kuehlschrank und Grundausstattung (Toepfe, Geschirr, Besteck).</li>
<li><strong>Bad:</strong> Eigenes Bad mit Dusche oder Badewanne, Handtuecher und Grundhygieneartikel.</li>
<li><strong>WLAN:</strong> Stabiles Internet ist heute Pflicht — Monteure muessen Berichte schreiben und mit der Familie kommunizieren.</li>
<li><strong>Waschmoeglichkeit:</strong> Waschmaschine im Apartment oder Zugang zu einer Gemeinschaftswaschmaschine.</li>
</ul>
<h2>Rechtliche Rahmenbedingungen</h2>
<p>Informieren Sie sich ueber lokale Vorschriften zur Kurzzeitvermietung. In manchen Staedten ist eine Genehmigung oder Registrierung erforderlich. Steuerlich gelten Einnahmen aus Monteurzimmer-Vermietung als Einnahmen aus Vermietung und Verpachtung.</p>
<h2>Vermarktung ueber Schlaf-Platz</h2>
<p>Bei Schlaf-Platz ist das Inserieren Ihres Monteurzimmers dauerhaft und zu 100% kostenlos. Sie profitieren von unserer Reichweite mit ueber 1.500 verifizierten Partnern, dem einzigartigen Transparenzregister und persoenlicher Betreuung durch unser Team.</p>`,
  },
  {
    slug: "monteurzimmer-ausstattung-checkliste",
    title: "Monteurzimmer Ausstattung — Die komplette Checkliste",
    excerpt: "Was gehoert in ein gutes Monteurzimmer? Die ultimative Checkliste fuer Vermieter, die ihre Gaeste begeistern wollen.",
    category: "Fuer Vermieter",
    readTime: "5 Min.",
    date: "2026-02-05",
    content: `<h2>Grundausstattung (Pflicht)</h2>
<ul>
<li><strong>Schlafzimmer:</strong> Bett (mind. 90x200), Matratze, Bettzeug, Kissen, Bettwaesche, Nachttisch, Kleiderschrank</li>
<li><strong>Kueche:</strong> Kuehlschrank, Herd/Kochplatte, Toepfe, Pfanne, Geschirr, Besteck, Wasserkocher, Grundgewaerze</li>
<li><strong>Bad:</strong> Dusche/Badewanne, Toilette, Waschbecken, Spiegel, Handtuecher, Toilettenpapier, Seife</li>
<li><strong>Wohnbereich:</strong> Tisch, Stuehle, Beleuchtung, Muellbeutel, Staubsauger/Besen</li>
<li><strong>Technik:</strong> WLAN (mind. 16 Mbit/s), Steckdosen, Rauchmelder</li>
</ul>
<h2>Komfort-Extras (empfohlen)</h2>
<ul>
<li><strong>Unterhaltung:</strong> TV, Streaming-Zugang</li>
<li><strong>Komfort:</strong> Waschmaschine, Trockner, Buegeleisen, Foehen</li>
<li><strong>Kueche Plus:</strong> Mikrowelle, Geschirrspueler, Kaffeemaschine, Toaster</li>
<li><strong>Outdoor:</strong> Parkplatz, Fahrradstellplatz, Balkon/Terrasse</li>
<li><strong>Service:</strong> Regelmaessige Reinigung, Bettwaesche-Wechsel, Willkommenspaket</li>
</ul>
<h2>Tipps fuer 5-Sterne-Bewertungen</h2>
<p>Kleine Aufmerksamkeiten machen den Unterschied: Ein Willkommenspaket mit Kaffee, Tee und Snacks, eine Mappe mit lokalen Informationen (Supermaerkte, Restaurants, OEPNV), und schnelle Reaktionszeit bei Problemen. Monteure schaetzen Zuverlaessigkeit und Sauberkeit ueber luxurioese Ausstattung.</p>`,
  },
  {
    slug: "monteurzimmer-portale-vergleich-2026",
    title: "Monteurzimmer-Portale im Vergleich 2026",
    excerpt: "DMZ, Monteurzimmer.de oder Schlaf-Platz? Wir vergleichen die groessten Plattformen fuer Monteurzimmer in Deutschland.",
    category: "Ratgeber",
    readTime: "6 Min.",
    date: "2026-01-28",
    content: `<h2>Die drei groessten Portale</h2>
<p>Der deutsche Markt fuer Monteurzimmer wird von drei Plattformen dominiert: Deutschland-Monteurzimmer.de (DMZ), Monteurzimmer.de und Schlaf-Platz (monteurzimmerapartments.de). Jede Plattform hat ihre Staerken und Schwaechen.</p>
<h2>Deutschland-Monteurzimmer.de (DMZ)</h2>
<ul>
<li><strong>Reichweite:</strong> Marktfuehrer mit ueber 825.000 Besuchern/Monat</li>
<li><strong>Listings:</strong> 14.000+ Unterkuenfte</li>
<li><strong>Kosten fuer Vermieter:</strong> Kostenpflichtig (bis zu 300 EUR/Jahr)</li>
<li><strong>Schwaechen:</strong> Veraltetes Design, kein echtes Buchungssystem, keine App</li>
</ul>
<h2>Monteurzimmer.de</h2>
<ul>
<li><strong>Traeger:</strong> FUNKE Mediengruppe (starkes SEO-Backing)</li>
<li><strong>Kosten fuer Vermieter:</strong> Kostenpflichtig</li>
<li><strong>Schwaechen:</strong> Hohe Gebuehren, keine native App, reines Listing-Portal</li>
</ul>
<h2>Schlaf-Platz (monteurzimmerapartments.de)</h2>
<ul>
<li><strong>Alleinstellungsmerkmale:</strong> Einziges Transparenzregister, 100% kostenlos fuer Vermieter, eigene App (iOS & Android), Full-Service statt reines Listing</li>
<li><strong>Bewertungen:</strong> 5.0 Sterne bei 266 Google-Bewertungen</li>
<li><strong>Kosten fuer Vermieter:</strong> Dauerhaft kostenlos</li>
<li><strong>Schwaeche:</strong> Noch geringere Markenbekanntheit als DMZ</li>
</ul>
<h2>Fazit</h2>
<p>Fuer Vermieter bietet Schlaf-Platz das beste Gesamtpaket: kostenlos, mit persoenlicher Betreuung und dem einzigartigen Transparenzregister. Fuer Mieter bedeutet die Full-Service-Vermittlung weniger Aufwand und mehr Sicherheit als bei reinen Listing-Portalen.</p>`,
  },
];

export function getBlogBySlug(slug: string) { return BLOG_ARTICLES.find(a => a.slug === slug); }
export function getAllBlogSlugs() { return BLOG_ARTICLES.map(a => a.slug); }
