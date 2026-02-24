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
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const FOOTER = {
  mieter: [
    { label: "Unterkunft finden", href: "/mieter" },
    { label: "Alle Staedte", href: "/#staedte" },
    { label: "Bewertungen", href: "/bewertungen" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
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
  { slug: "mannheim", name: "Mannheim", emoji: "\uD83C\uDFED", tagline: "Quadratestadt & Industrie", bundesland: "BW", einwohner: "ca. 310.000", flaeche: "144,9 km\u00B2", hoehe: "97 m", autobahnen: "A6, A656, A659", bahnhof: "Mannheim Hbf", heroDesc: "Mannheim ist ein bedeutender Industriestandort in der Metropolregion Rhein-Neckar mit starker Chemie- und Maschinenbaubranche.", branchen: "Chemie, Maschinenbau, Pharma, Logistik", unternehmen: "Roche, John Deere, Caterpillar, Pepperl+Fuchs", messen: ["Maimarkt", "Explore Science"], stadtteile: [{ name: "Quadrate", desc: "Einzigartiges Strassensystem im Stadtzentrum." }, { name: "Jungbusch", desc: "Kreatives Hafenviertel." }, { name: "Neckarstadt", desc: "Multikulturelles Wohnviertel." }, { name: "Feudenheim", desc: "Gruener Vorort im Osten." }], industrie: [{ name: "John Deere Werk", desc: "Europaweites Produktionszentrum." }, { name: "Roche Mannheim", desc: "Pharma- und Diagnostikstandort." }], sights: ["Wasserturm", "Barockschloss Mannheim", "Luisenpark", "Technoseum"] },
  { slug: "augsburg", name: "Augsburg", emoji: "\uD83C\uDFDB", tagline: "Fuggerstadt & Maschinenbau", bundesland: "Bayern", einwohner: "ca. 300.000", flaeche: "146,8 km\u00B2", hoehe: "489 m", autobahnen: "A8, A30 (B17)", bahnhof: "Augsburg Hbf", heroDesc: "Eine der aeltesten Staedte Deutschlands mit starker Industrie und der aeltesten Sozialsiedlung der Welt.", branchen: "Maschinenbau, Luft- und Raumfahrt, IT, Textil", unternehmen: "Premium AEROTEC, KUKA, MAN Energy Solutions, Faurecia", messen: ["Intersana", "Jagen und Fischen"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Rathaus." }, { name: "Lechhausen", desc: "Groesster Stadtteil oestlich des Lechs." }, { name: "Goggingen", desc: "Beliebter Wohnstadtteil im Sueden." }, { name: "Oberhausen", desc: "Vielfaeltiges Viertel im Norden." }], industrie: [{ name: "Premium AEROTEC Werk", desc: "Flugzeugstrukturkomponenten." }, { name: "Innovationspark", desc: "Technologie- und Gruenderzentrum." }], sights: ["Fuggerei", "Rathaus mit Goldenem Saal", "Augsburger Puppenkiste", "Dom"] },
  { slug: "karlsruhe", name: "Karlsruhe", emoji: "\u2696", tagline: "Recht & Technologie", bundesland: "BW", einwohner: "ca. 310.000", flaeche: "173,5 km\u00B2", hoehe: "115 m", autobahnen: "A5, A8, A65", bahnhof: "Karlsruhe Hbf", heroDesc: "Sitz des Bundesverfassungsgerichts und bedeutender IT- und Forschungsstandort am Oberrhein.", branchen: "IT, Forschung, Energie, Recht", unternehmen: "1&1, dm-drogerie markt, EnBW, SEW-Eurodrive", messen: ["art KARLSRUHE", "LEARNTEC", "REHAB"], stadtteile: [{ name: "Suedstadt", desc: "Beliebtes Gruenderzeit-Viertel." }, { name: "Durlach", desc: "Historische Altstadt im Osten." }, { name: "Weststadt", desc: "Junges, urbanes Quartier." }, { name: "Muehlburg", desc: "Zentrumsnaher Stadtteil." }], industrie: [{ name: "Technologiepark KIT", desc: "Forschung am KIT Campus." }, { name: "Rheinhafen", desc: "Zweitgroesster Binnenhafen in BW." }], sights: ["Schloss Karlsruhe", "ZKM", "Bundesverfassungsgericht", "Botanischer Garten"] },
  { slug: "mainz", name: "Mainz", emoji: "\uD83C\uDFAD", tagline: "Medien & Pharma", bundesland: "Rheinland-Pfalz (LH)", einwohner: "ca. 220.000", flaeche: "97,7 km\u00B2", hoehe: "89 m", autobahnen: "A60, A63, A643", bahnhof: "Mainz Hbf", heroDesc: "Landeshauptstadt, ZDF-Stadt und Sitz von BioNTech — Medien- und Pharmastandort am Rhein.", branchen: "Pharma, Medien, Chemie, Weinbau", unternehmen: "BioNTech, ZDF, Schott, Werner & Mertz", messen: ["Mainzer Minipressen-Messe"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Neustadt", desc: "Lebendiges Gruenderzeitviertel." }, { name: "Gonsenheim", desc: "Gruener Wohnstadtteil." }, { name: "Bretzenheim", desc: "Familienfreundlich im Westen." }], industrie: [{ name: "BioNTech Campus", desc: "Weltweit bekannter Impfstoffentwickler." }, { name: "Schott AG Werk", desc: "Spezialglas-Produktion." }], sights: ["Mainzer Dom", "Gutenberg-Museum", "Zitadelle", "Rheinufer"] },
  { slug: "kiel", name: "Kiel", emoji: "\u2693", tagline: "Werft & Ostsee", bundesland: "Schleswig-Holstein (LH)", einwohner: "ca. 250.000", flaeche: "118,7 km\u00B2", hoehe: "5 m", autobahnen: "A210, A215", bahnhof: "Kiel Hbf", heroDesc: "Landeshauptstadt an der Ostsee mit Marinebasis, Werften und starker maritimer Wirtschaft.", branchen: "Schiffbau, Marine, Meeresforschung, Medizintechnik", unternehmen: "thyssenkrupp Marine Systems, GEOMAR, Vossloh", messen: ["Kieler Woche"], stadtteile: [{ name: "Altstadt", desc: "Stadtzentrum an der Foerde." }, { name: "Gaarden", desc: "Multikulturelles Ostufer." }, { name: "Schilksee", desc: "Olympiastandort am Meer." }, { name: "Holtenau", desc: "Am Nord-Ostsee-Kanal." }], industrie: [{ name: "thyssenkrupp Werft", desc: "U-Boot- und Marineschiffbau." }, { name: "Ostuferhafen", desc: "Faehrverkehr nach Skandinavien." }], sights: ["Kieler Foerde", "Laboe Marine-Ehrenmal", "Nord-Ostsee-Kanal", "Holstenstrasse"] },
  { slug: "rostock", name: "Rostock", emoji: "\u2693", tagline: "Hafen & Tourismus", bundesland: "Mecklenburg-Vorpommern", einwohner: "ca. 210.000", flaeche: "181,3 km\u00B2", hoehe: "13 m", autobahnen: "A19, A20", bahnhof: "Rostock Hbf", heroDesc: "Groesste Stadt Mecklenburg-Vorpommerns mit bedeutendem Ostseehafen und Kreuzfahrtschiffsterminal.", branchen: "Schiffbau, Tourismus, Logistik, Windenergie", unternehmen: "Aida Cruises, Nordex, Liebherr, Caterpillar", messen: ["Hanse Sail", "Rostocker Jobmesse"], stadtteile: [{ name: "Warnemuende", desc: "Beliebtes Ostseebad an der Warnow-Muendung." }, { name: "KTV", desc: "Studentisches Szeneviertel." }, { name: "Stadtmitte", desc: "Historische Innenstadt." }, { name: "Dierkow", desc: "Wohngebiet im Osten." }], industrie: [{ name: "Rostocker Hafen", desc: "Groesster deutscher Ostseehafen." }, { name: "Neptun Werft", desc: "Traditioneller Schiffbaustandort." }], sights: ["Warnemuende Strand", "Marienkirche", "Stadthafen", "Zoo Rostock"] },
  { slug: "freiburg", name: "Freiburg", emoji: "\u2600", tagline: "Green City & Uni-Stadt", bundesland: "BW", einwohner: "ca. 230.000", flaeche: "153,1 km\u00B2", hoehe: "278 m", autobahnen: "A5", bahnhof: "Freiburg (Breisgau) Hbf", heroDesc: "Sonnenreichste Grossstadt Deutschlands und Vorreiter in Sachen Nachhaltigkeit und Solarenergie.", branchen: "Erneuerbare Energien, Medizintechnik, Tourismus, Forschung", unternehmen: "Testo, Sick AG, Haufe Group, Cerdia", messen: ["GETEC", "Intersolar Kongress"], stadtteile: [{ name: "Altstadt", desc: "Mittelalterliches Zentrum mit Baechle." }, { name: "Vauban", desc: "Oekologisches Modellviertel." }, { name: "Wiehre", desc: "Beliebtes Gruenderzeitviertel." }, { name: "Herdern", desc: "Gehoben am Schlossbergrand." }], industrie: [{ name: "Solar Info Center", desc: "Kompetenzzentrum Solarenergie." }, { name: "Gewerbegebiet Haid", desc: "Groesstes Gewerbegebiet der Stadt." }], sights: ["Freiburger Muenster", "Schlossberg", "Baechle", "Augustinermuseum"] },
  { slug: "kassel", name: "Kassel", emoji: "\uD83C\uDFA8", tagline: "documenta & Verkehr", bundesland: "Hessen", einwohner: "ca. 200.000", flaeche: "106,8 km\u00B2", hoehe: "166 m", autobahnen: "A7, A44, A49", bahnhof: "Kassel-Wilhelmshoehe", heroDesc: "Documenta-Stadt und zentraler Verkehrsknotenpunkt in der Mitte Deutschlands.", branchen: "Fahrzeugbau, Logistik, Erneuerbare Energien, Kultur", unternehmen: "VW Werk Kassel, Bombardier, SMA Solar, Krauss-Maffei Wegmann", messen: ["documenta", "DEKOMETA"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum mit Koenigsplatz." }, { name: "Vorderer Westen", desc: "Beliebtes Wohnviertel." }, { name: "Bad Wilhelmshoehe", desc: "Villen am Bergpark." }, { name: "Unterneustadt", desc: "Saniertes Quartier an der Fulda." }], industrie: [{ name: "VW Werk Kassel", desc: "Getriebe- und Komponentenwerk." }, { name: "SMA Solar Zentrale", desc: "Weltweit fuehrender Wechselrichter-Hersteller." }], sights: ["Bergpark Wilhelmshoehe", "Herkules", "documenta-Halle", "Orangerie"] },
  { slug: "luebeck", name: "Luebeck", emoji: "\uD83C\uDFDB", tagline: "Hanse & Marzipan", bundesland: "Schleswig-Holstein", einwohner: "ca. 220.000", flaeche: "214,2 km\u00B2", hoehe: "13 m", autobahnen: "A1, A20, A226", bahnhof: "Luebeck Hbf", heroDesc: "Ehemaliges Haupt der Hanse und UNESCO-Welterbestadt mit Medizintechnik und Lebensmittelindustrie.", branchen: "Lebensmittel, Medizintechnik, Tourismus, Logistik", unternehmen: "Niederegger, Draeger, Bahlsen, Possehl", messen: ["Nordische Filmtage", "HanseKulturFestival"], stadtteile: [{ name: "Altstadt", desc: "UNESCO-Welterbe auf einer Insel." }, { name: "St. Juergen", desc: "Gruener Stadtteil im Sueden." }, { name: "Travemuende", desc: "Ostseebad an der Trave-Muendung." }, { name: "Moisling", desc: "Wohngebiet im Suedwesten." }], industrie: [{ name: "Draegerwerk", desc: "Medizin- und Sicherheitstechnik." }, { name: "Hafen Luebeck", desc: "Bedeutender Ostsee-Faehrhafen." }], sights: ["Holstentor", "Marienkirche", "Buddenbrookhaus", "Travemuende Strand"] },
  { slug: "erfurt", name: "Erfurt", emoji: "\uD83C\uDF3B", tagline: "Blumenstadt & Logistik", bundesland: "Thueringen (LH)", einwohner: "ca. 215.000", flaeche: "269,9 km\u00B2", hoehe: "195 m", autobahnen: "A4, A71", bahnhof: "Erfurt Hbf", heroDesc: "Landeshauptstadt Thueringens und wichtiger Logistik-Knotenpunkt in der Mitte Deutschlands.", branchen: "Logistik, Gartenbau, Mikroelektronik, Medien", unternehmen: "Zalando (Logistik), Bosch, N3 Engine Overhaul", messen: ["egapark Blumenausstellungen", "Erfurter Herbstlese"], stadtteile: [{ name: "Altstadt", desc: "Besterhaltene mittelalterliche Altstadt." }, { name: "Bruehlervorstadt", desc: "Beliebtes gruenes Wohnviertel." }, { name: "Ilversgehofen", desc: "Aufstrebender Norden." }, { name: "Hochheim", desc: "Ruhiger Vorort." }], industrie: [{ name: "GVZ Erfurt", desc: "Gueterverkehrszentrum an A4 und A71." }, { name: "Erfurter Kreuz", desc: "Groesstes Industriegebiet Thueringens." }], sights: ["Kraemebruecke", "Erfurter Dom", "Zitadelle Petersberg", "egapark"] },
  { slug: "magdeburg", name: "Magdeburg", emoji: "\u2699", tagline: "Otto-Stadt & Maschinenbau", bundesland: "Sachsen-Anhalt (LH)", einwohner: "ca. 240.000", flaeche: "201,0 km\u00B2", hoehe: "56 m", autobahnen: "A2, A14", bahnhof: "Magdeburg Hbf", heroDesc: "Landeshauptstadt Sachsen-Anhalts mit Tradition im Maschinenbau und wachsender Halbleiterindustrie.", branchen: "Maschinenbau, Halbleiter, Logistik, Gesundheit", unternehmen: "FAUN, IFA Group, Regiocom, Intel (geplant)", messen: ["SWM TalentTage", "Magdeburger Kulturnacht"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Buckau", desc: "Kreatives Industrieviertel." }, { name: "Stadtfeld", desc: "Gruenderzeitviertel mit Villen." }, { name: "Cracau", desc: "Gruener Stadtteil an der Elbe." }], industrie: [{ name: "Industriehafen", desc: "Logistikzentrum an der Elbe." }, { name: "Intel-Chipfabrik (geplant)", desc: "Milliarden-Investition im Bau." }], sights: ["Magdeburger Dom", "Gruene Zitadelle", "Elbauenpark", "Jahrtausendturm"] },
  { slug: "braunschweig", name: "Braunschweig", emoji: "\uD83E\uDD81", tagline: "Forschung & Automobil", bundesland: "Niedersachsen", einwohner: "ca. 250.000", flaeche: "192,1 km\u00B2", hoehe: "75 m", autobahnen: "A2, A39, A391", bahnhof: "Braunschweig Hbf", heroDesc: "Forschungsstadt mit hoechster Dichte an Forschungseinrichtungen in Europa und VW-Standort.", branchen: "Automobil, Forschung, Biotechnologie, IT", unternehmen: "VW Financial Services, Siemens Mobility, New Yorker", messen: ["Ueberregionales Forschungsforum"], stadtteile: [{ name: "Innenstadt", desc: "Rund um den Burgplatz." }, { name: "Oestliches Ringgebiet", desc: "Beliebtes Wohnviertel." }, { name: "Riddagshausen", desc: "Naturnah mit Klosterkirche." }, { name: "Lehndorf", desc: "Familienfreundlicher Stadtteil." }], industrie: [{ name: "VW Financial Services", desc: "Europazentrale der Finanzsparte." }, { name: "Forschungsflughafen", desc: "DLR und TU Braunschweig." }], sights: ["Burgplatz mit Loewe", "Dom St. Blasii", "Happy Rizzi House", "Naturhistorisches Museum"] },
  { slug: "chemnitz", name: "Chemnitz", emoji: "\u2699", tagline: "Kulturhauptstadt 2025 & Industrie", bundesland: "Sachsen", einwohner: "ca. 250.000", flaeche: "221,0 km\u00B2", hoehe: "296 m", autobahnen: "A4, A72", bahnhof: "Chemnitz Hbf", heroDesc: "Europaeische Kulturhauptstadt 2025 mit starker Automobil- und Maschinenbautradition.", branchen: "Automobil, Maschinenbau, IT, Textil", unternehmen: "VW Motorenwerk, Niles-Simmons, Starrag", messen: ["Chemnitzer Modellbahn-Ausstellung", "SACHSENarena Events"], stadtteile: [{ name: "Zentrum", desc: "Modernes Stadtzentrum." }, { name: "Kasberg", desc: "Groesstes Gruenderzeitviertel Sachsens." }, { name: "Schlosschemnitz", desc: "Nahe am Schloss." }, { name: "Sonnenberg", desc: "Aufstrebendes Wohnviertel." }], industrie: [{ name: "VW Motorenwerk", desc: "Motorenproduktion fuer den Konzern." }, { name: "Industriemuseum", desc: "Historischer Maschinenpark." }], sights: ["Karl-Marx-Monument", "Schloss Chemnitz", "Kasberg-Viertel", "Industriemuseum"] },
  { slug: "aachen", name: "Aachen", emoji: "\u2696", tagline: "RWTH & Karlspreis", bundesland: "NRW", einwohner: "ca. 250.000", flaeche: "160,8 km\u00B2", hoehe: "173 m", autobahnen: "A4, A44, A544", bahnhof: "Aachen Hbf", heroDesc: "Universitaetsstadt mit der renommierten RWTH Aachen und Sitz des Karlspreises im Dreilaendereck.", branchen: "IT, Maschinenbau, Forschung, Automotive", unternehmen: "e.GO, FEV Group, Aixtron, Gruen Software", messen: ["CHIO Aachen (Reitsport)", "Karlspreisverleihung"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum um den Dom." }, { name: "Burtscheid", desc: "Thermalquellen-Viertel." }, { name: "Frankenberger Viertel", desc: "Beliebtes Studentenviertel." }, { name: "Brand", desc: "Wohngebiet im Suedosten." }], industrie: [{ name: "RWTH Campus Melaten", desc: "Technologie- und Forschungscampus." }, { name: "Gewerbegebiet Avantis", desc: "Grenzueberschreitender Gewerbepark." }], sights: ["Aachener Dom", "Rathaus", "Elisenbrunnen", "Ponttor"] },
  { slug: "halle", name: "Halle", emoji: "\uD83C\uDFB5", tagline: "Haendel-Stadt & Chemie", bundesland: "Sachsen-Anhalt", einwohner: "ca. 240.000", flaeche: "135,0 km\u00B2", hoehe: "87 m", autobahnen: "A9, A14, A143", bahnhof: "Halle (Saale) Hbf", heroDesc: "Geburtsstadt Haendels und bedeutender Chemiestandort im mitteldeutschen Chemiedreieck.", branchen: "Chemie, Pharma, Medien, Forschung", unternehmen: "Total Energies (Raffinerie Leuna), IDT Biologika, Halloren", messen: ["Haendel-Festspiele", "Laternenfest"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Marktkirche." }, { name: "Paulusviertel", desc: "Gruenderzeitviertel mit Villen." }, { name: "Giebichenstein", desc: "Kunsthochschul-Viertel an der Saale." }, { name: "Kroellwitz", desc: "Gruen an der Saale." }], industrie: [{ name: "Chemiepark Leuna", desc: "Einer der groessten Chemieparks Europas." }, { name: "Star Park Halle", desc: "Moderner Gewerbepark." }], sights: ["Marktplatz mit Haendel-Denkmal", "Burg Giebichenstein", "Franckesche Stiftungen", "Landesmuseum fuer Vorgeschichte"] },
  { slug: "krefeld", name: "Krefeld", emoji: "\uD83E\uDDF5", tagline: "Samt- und Seidenstadt", bundesland: "NRW", einwohner: "ca. 230.000", flaeche: "137,8 km\u00B2", hoehe: "39 m", autobahnen: "A44, A57", bahnhof: "Krefeld Hbf", heroDesc: "Traditionsreiche Textilstadt am Niederrhein mit wachsender Chemieindustrie.", branchen: "Chemie, Textil, Maschinenbau, Stahl", unternehmen: "Covestro, Siemens (Schienenfahrzeuge), Fressnapf (HQ)", messen: ["Krefelder Textiltage"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum mit Einkaufsmeile." }, { name: "Uerdingen", desc: "Chemiestandort am Rhein." }, { name: "Bockum", desc: "Beliebtes Wohnviertel." }, { name: "Fischeln", desc: "Gruener Sueden." }], industrie: [{ name: "Chempark Uerdingen", desc: "Grosser Chemiestandort am Rhein." }, { name: "Siemens Werk", desc: "Schienenfahrzeugproduktion." }], sights: ["Kaiser-Wilhelm-Museum", "Burg Linn", "Krefelder Zoo", "Stadtwald"] },
  { slug: "oberhausen", name: "Oberhausen", emoji: "\uD83D\uDED2", tagline: "Centro & Neue Mitte", bundesland: "NRW", einwohner: "ca. 210.000", flaeche: "77,1 km\u00B2", hoehe: "42 m", autobahnen: "A2, A3, A42, A516", bahnhof: "Oberhausen Hbf", heroDesc: "Ehemalige Stahlstadt im Ruhrgebiet, heute bekannt fuer das Centro und den Strukturwandel.", branchen: "Handel, Logistik, Chemie, Dienstleistungen", unternehmen: "Oxea, MAN Turbo, Centro (Westfield)", messen: ["Oberhausener Kurzfilmtage"], stadtteile: [{ name: "Neue Mitte", desc: "Rund um das Centro." }, { name: "Sterkrade", desc: "Eigener Stadtteilcharakter." }, { name: "Osterfeld", desc: "Im Norden der Stadt." }, { name: "Alt-Oberhausen", desc: "Historischer Kern." }], industrie: [{ name: "Oxea Werk", desc: "Chemische Produktion." }, { name: "Gewerbegebiet Centro", desc: "Groesstes Einkaufszentrum Europas." }], sights: ["Gasometer Oberhausen", "Centro", "Sea Life", "LVR-Industriemuseum"] },
  { slug: "gelsenkirchen", name: "Gelsenkirchen", emoji: "\u26BD", tagline: "Schalke & Solarstadt", bundesland: "NRW", einwohner: "ca. 260.000", flaeche: "104,9 km\u00B2", hoehe: "60 m", autobahnen: "A2, A40, A42, A52", bahnhof: "Gelsenkirchen Hbf", heroDesc: "Vom Bergbau zur Solarindustrie — Gelsenkirchen setzt auf Strukturwandel und erneuerbare Energien.", branchen: "Solarenergie, Chemie, Glas, Logistik", unternehmen: "BP (Raffinerie), Vivawest, Gelsenwasser", messen: ["Emscher-Lippe-Wirtschaftskonferenz"], stadtteile: [{ name: "Buer", desc: "Zweites Zentrum im Norden." }, { name: "Altstadt", desc: "Stadtzentrum im Umbau." }, { name: "Horst", desc: "Am Nordsternpark." }, { name: "Erle", desc: "Wohngebiet im Nordosten." }], industrie: [{ name: "BP Raffinerie", desc: "Grosse Erdoelraffinerie." }, { name: "Wissenschaftspark", desc: "Technologie- und Gruenderzentrum." }], sights: ["Veltins-Arena", "Nordsternpark", "Zoom Erlebniswelt", "Wissenschaftspark"] },
  { slug: "moenchengladbach", name: "Moenchengladbach", emoji: "\u26BD", tagline: "Textil & Logistik", bundesland: "NRW", einwohner: "ca. 260.000", flaeche: "170,5 km\u00B2", hoehe: "70 m", autobahnen: "A44, A46, A52, A61", bahnhof: "Moenchengladbach Hbf", heroDesc: "Traditionsreiche Textilstadt am Niederrhein, heute wichtiger Logistik- und Handelsstandort.", branchen: "Textil, Logistik, Maschinenbau, IT", unternehmen: "SMS Group, Scheidt & Bachmann, Santander Consumer Bank", messen: ["Gladbacher Textiltage"], stadtteile: [{ name: "Altstadt", desc: "Rund um den Alten Markt." }, { name: "Eicken", desc: "Kreatives Viertel." }, { name: "Rheydt", desc: "Zweites Stadtzentrum." }, { name: "Wickrath", desc: "Historisch mit Schloss." }], industrie: [{ name: "Nordpark", desc: "Moderner Gewerbe- und Bueropark." }, { name: "Regiopark", desc: "Logistikzentrum an der A61." }], sights: ["Abteiberg Museum", "Schloss Rheydt", "Borussia-Park", "Bunter Garten"] },
  { slug: "wolfsburg", name: "Wolfsburg", emoji: "\uD83D\uDE97", tagline: "VW-Stadt", bundesland: "Niedersachsen", einwohner: "ca. 125.000", flaeche: "204,0 km\u00B2", hoehe: "63 m", autobahnen: "A2, A39", bahnhof: "Wolfsburg Hbf", heroDesc: "Volkswagen-Stadt und eine der wirtschaftsstaerksten Staedte Deutschlands pro Kopf.", branchen: "Automobil, IT, Zulieferer, Logistik", unternehmen: "Volkswagen AG, AutoVision, Wolfsburg AG", messen: ["IdeenExpo (regional)"], stadtteile: [{ name: "Stadtmitte", desc: "Modernes Zentrum rund um die Autostadt." }, { name: "Fallersleben", desc: "Historischer Stadtkern." }, { name: "Vorsfelde", desc: "Eigenstaendiger Charakter." }, { name: "Detmerode", desc: "Grosses Wohngebiet." }], industrie: [{ name: "VW Stammwerk", desc: "Eines der groessten Automobilwerke der Welt." }, { name: "InnovationsCampus", desc: "Zukunftstechnologien rund um Mobilitaet." }], sights: ["Autostadt", "Phaeno", "Allerpark", "Schloss Wolfsburg"] },
  { slug: "heidelberg", name: "Heidelberg", emoji: "\uD83C\uDFDB", tagline: "Uni-Stadt & Forschung", bundesland: "BW", einwohner: "ca. 160.000", flaeche: "108,8 km\u00B2", hoehe: "114 m", autobahnen: "A5, A656", bahnhof: "Heidelberg Hbf", heroDesc: "Aelteste Universitaetsstadt Deutschlands mit Weltruf in Forschung und Romantik am Neckar.", branchen: "Forschung, Pharma, IT, Tourismus", unternehmen: "Heidelberg Materials, SAS Institute, Springer Nature", messen: ["Heidelberger Fruehling", "Heidelberger Literaturtage"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum unter dem Schloss." }, { name: "Neuenheim", desc: "Universitaetsviertel am Neckar." }, { name: "Handschuhsheim", desc: "Aeltester Stadtteil." }, { name: "Bergheim", desc: "Zentral mit Bahnhofsnaehe." }], industrie: [{ name: "Heidelberg Materials HQ", desc: "Weltweit groesster Baustoffkonzern." }, { name: "Technology Park", desc: "Biotech- und IT-Unternehmen." }], sights: ["Heidelberger Schloss", "Alte Bruecke", "Philosophenweg", "Heiliggeistkirche"] },
  { slug: "darmstadt", name: "Darmstadt", emoji: "\uD83D\uDE80", tagline: "Wissenschaftsstadt", bundesland: "Hessen", einwohner: "ca. 160.000", flaeche: "122,2 km\u00B2", hoehe: "144 m", autobahnen: "A5, A67, A672", bahnhof: "Darmstadt Hbf", heroDesc: "Wissenschaftsstadt mit ESA-Kontrollzentrum, GSI und starker IT- und Chemiebranche.", branchen: "Raumfahrt, IT, Chemie, Pharma", unternehmen: "Merck, ESA/ESOC, Software AG, Schenck Process", messen: ["Heinerfest", "Darmstaedter Residenzfestspiele"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum am Luisenplatz." }, { name: "Bessungen", desc: "Beliebtes Altbauviertel." }, { name: "Martinsviertel", desc: "Lebendiges Studentenviertel." }, { name: "Kranichstein", desc: "Oekologische Mustersiedlung." }], industrie: [{ name: "Merck Zentrale", desc: "Aeltestes Pharma- und Chemieunternehmen der Welt." }, { name: "ESA/ESOC", desc: "Europaeisches Satellitenkontrollzentrum." }], sights: ["Mathildenhoehe", "Hessisches Landesmuseum", "Waldspirale", "Schloss Darmstadt"] },
  { slug: "regensburg", name: "Regensburg", emoji: "\uD83C\uDFDB", tagline: "Welterbe & BMW", bundesland: "Bayern", einwohner: "ca. 155.000", flaeche: "80,8 km\u00B2", hoehe: "343 m", autobahnen: "A3, A93", bahnhof: "Regensburg Hbf", heroDesc: "UNESCO-Welterbestadt mit mittelalterlicher Altstadt und modernem BMW-Werk.", branchen: "Automobil, Elektrotechnik, IT, Tourismus", unternehmen: "BMW, Continental, Infineon, Krones", messen: ["Regensburger Dult", "IT-Sicherheitskongress"], stadtteile: [{ name: "Altstadt", desc: "UNESCO-Welterbe am Donaustrand." }, { name: "Stadtamhof", desc: "Historisches Viertel noerdlich der Donau." }, { name: "Kumpfmuehl", desc: "Beliebtes Wohnviertel." }, { name: "Reinhausen", desc: "Am Regen-Fluss." }], industrie: [{ name: "BMW Werk Regensburg", desc: "Ueber 9.000 Mitarbeiter." }, { name: "Conti Standort", desc: "Automotive-Elektronik." }], sights: ["Steinerne Bruecke", "Regensburger Dom", "Walhalla", "Thurn und Taxis Schloss"] },
  { slug: "potsdam", name: "Potsdam", emoji: "\uD83C\uDFF0", tagline: "Schloesser & Film", bundesland: "Brandenburg (LH)", einwohner: "ca. 185.000", flaeche: "188,6 km\u00B2", hoehe: "32 m", autobahnen: "A10, A115", bahnhof: "Potsdam Hbf", heroDesc: "UNESCO-Welterbestadt mit Schloessern und Gaerten, Filmstandort Babelsberg und wachsende Wissenschaftsstadt.", branchen: "Film & Medien, Forschung, IT, Tourismus", unternehmen: "Studio Babelsberg, SAP Innovation Center, Hasso-Plattner-Institut", messen: ["Potsdamer Schloessernacht", "Filmfestival"], stadtteile: [{ name: "Innenstadt", desc: "Barockes Zentrum." }, { name: "Babelsberg", desc: "Filmstadtteil mit Park." }, { name: "Potsdam West", desc: "Villen und Gaerten." }, { name: "Drewitz", desc: "Modernisiertes Wohngebiet." }], industrie: [{ name: "Medienstadt Babelsberg", desc: "Aeltestes Grossfilmstudio der Welt." }, { name: "Wissenschaftspark Golm", desc: "Max-Planck- und Fraunhofer-Institute." }], sights: ["Schloss Sanssouci", "Park Sanssouci", "Hollaendisches Viertel", "Filmpark Babelsberg"] },
  { slug: "ulm", name: "Ulm", emoji: "\u26EA", tagline: "Hoechster Kirchturm der Welt", bundesland: "BW", einwohner: "ca. 130.000", flaeche: "118,7 km\u00B2", hoehe: "478 m", autobahnen: "A7, A8", bahnhof: "Ulm Hbf", heroDesc: "Universitaetsstadt an der Donau mit dem hoechsten Kirchturm der Welt und starker Hightech-Industrie.", branchen: "Pharma, Automobil, IT, Forschung", unternehmen: "Daimler Truck, Wieland-Werke, Uzin Utz, Hensoldt", messen: ["Ulmer Zelt", "Schwoermontag"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Muenster." }, { name: "Weststadt", desc: "Junges Wohnviertel." }, { name: "Boefingen", desc: "Ruhiger Stadtteil im Norden." }, { name: "Wiblingen", desc: "Bekannt fuer das Kloster." }], industrie: [{ name: "Donautal", desc: "Industriegebiet entlang der Donau." }, { name: "Science Park", desc: "Technologie- und Gruenderzentrum." }], sights: ["Ulmer Muenster", "Fischerviertel", "Stadtmauer an der Donau", "Museum der Brotkultur"] },
  { slug: "wuerzburg", name: "Wuerzburg", emoji: "\uD83C\uDF47", tagline: "Wein & Residenz", bundesland: "Bayern", einwohner: "ca. 130.000", flaeche: "87,6 km\u00B2", hoehe: "177 m", autobahnen: "A3, A7, A81", bahnhof: "Wuerzburg Hbf", heroDesc: "Frankens Weinhauptstadt mit UNESCO-Welterbe Residenz und starker Medizintechnikbranche.", branchen: "Medizintechnik, Wein, Tourismus, Druck", unternehmen: "Koenig & Bauer, Flyeralarm, va-Q-tec, Brose", messen: ["Mainfranken Messe", "Wuerzburger Weinfest"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Main." }, { name: "Sanderau", desc: "Beliebtes Wohnviertel." }, { name: "Zellerau", desc: "Im Wandel zum kreativen Viertel." }, { name: "Frauenland", desc: "Universitaetsnahes Wohngebiet." }], industrie: [{ name: "Koenig & Bauer Werk", desc: "Aeltester Druckmaschinenhersteller der Welt." }, { name: "Hubland Campus", desc: "Neues Technologieviertel." }], sights: ["Residenz (UNESCO)", "Festung Marienberg", "Alte Mainbruecke", "Kaeppele"] },
  { slug: "oldenburg", name: "Oldenburg", emoji: "\uD83C\uDF3F", tagline: "Uebermorgenstadt", bundesland: "Niedersachsen", einwohner: "ca. 170.000", flaeche: "103,0 km\u00B2", hoehe: "4 m", autobahnen: "A28, A29, A293", bahnhof: "Oldenburg Hbf", heroDesc: "Universitaets- und Dienstleistungsstadt im Nordwesten mit starker Informatik- und Energiebranche.", branchen: "Energie, IT, Einzelhandel, Forschung", unternehmen: "EWE AG, CEWE, Bito-Lagertechnik, OFFIS", messen: ["Oldenburger Muensterlandschau"], stadtteile: [{ name: "Innenstadt", desc: "Kompaktes Zentrum mit Fussgaengerzone." }, { name: "Dobbenviertel", desc: "Beliebtes Altbauviertel." }, { name: "Eversten", desc: "Gruenes Wohngebiet." }, { name: "Osternburg", desc: "Im Wandel zum modernen Quartier." }], industrie: [{ name: "EWE Zentrale", desc: "Regionaler Energieversorger." }, { name: "Technologie- und Gruenderzentrum", desc: "Startup-Foerderung." }], sights: ["Schloss Oldenburg", "Horst-Janssen-Museum", "Schlossgarten", "Botanischer Garten"] },
  { slug: "osnabrueck", name: "Osnabrueck", emoji: "\u262E", tagline: "Friedensstadt", bundesland: "Niedersachsen", einwohner: "ca. 165.000", flaeche: "119,8 km\u00B2", hoehe: "64 m", autobahnen: "A1, A30, A33", bahnhof: "Osnabrueck Hbf", heroDesc: "Friedensstadt und wichtiger Wirtschaftsstandort zwischen Muenster und dem Teutoburger Wald.", branchen: "Metallverarbeitung, Lebensmittel, Logistik, Automotive", unternehmen: "KME, Homann, Hellmann Logistics, Solarlux", messen: ["Maiwoche", "European Media Art Festival"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Rathaus." }, { name: "Westerberg", desc: "Universitaetsviertel." }, { name: "Schinkel", desc: "Multikultureller Stadtteil." }, { name: "Haste", desc: "Am Piesberg gelegen." }], industrie: [{ name: "Hafen Osnabrueck", desc: "Logistikzentrum am Stichkanal." }, { name: "Gewerbegebiet Fledder", desc: "Groesstes Gewerbegebiet der Stadt." }], sights: ["Rathaus des Westfaelischen Friedens", "Dom St. Peter", "Felix-Nussbaum-Haus", "Botanischer Garten"] },
  { slug: "heilbronn", name: "Heilbronn", emoji: "\uD83C\uDF47", tagline: "Kaethchenstadt & KI-Campus", bundesland: "BW", einwohner: "ca. 130.000", flaeche: "99,9 km\u00B2", hoehe: "157 m", autobahnen: "A6, A81", bahnhof: "Heilbronn Hbf", heroDesc: "Weinstadt am Neckar mit neuem KI-Campus und starker Industrie in der Region.", branchen: "Lebensmittel, IT/KI, Handel, Automobil", unternehmen: "Schwarz-Gruppe (Lidl/Kaufland), Bechtle, Audi (Standort Neckarsulm)", messen: ["Heilbronner Weindorf", "BUGA-Nachnutzung"], stadtteile: [{ name: "Innenstadt", desc: "Rund um die Kilianskirche." }, { name: "Boeckingen", desc: "Groesster Stadtteil." }, { name: "Sontheim", desc: "Suedlich am Neckar." }, { name: "Neckargartach", desc: "Noerdlich der Stadt." }], industrie: [{ name: "Schwarz-Gruppe HQ", desc: "Groesster Einzelhaendler Europas (Lidl, Kaufland)." }, { name: "Bildungscampus", desc: "KI- und Hochschulstandort." }], sights: ["Experimenta", "Kilianskirche", "Trappenseeschloesschen", "Botanischer Obstgarten"] },
  { slug: "ingolstadt", name: "Ingolstadt", emoji: "\uD83D\uDE97", tagline: "Audi-Stadt", bundesland: "Bayern", einwohner: "ca. 140.000", flaeche: "133,4 km\u00B2", hoehe: "374 m", autobahnen: "A9, A9a", bahnhof: "Ingolstadt Hbf", heroDesc: "Audi-Hauptsitz und eine der wirtschaftsstaerksten Staedte Bayerns mit hoher Kaufkraft.", branchen: "Automobil, Zulieferer, Raffinerien, IT", unternehmen: "Audi AG, MediaMarktSaturn, AIRBUS Helicopters, Gunvor Raffinerie", messen: ["Audi Sommerkino", "Ingolstaedter Wissenschaftstage"], stadtteile: [{ name: "Altstadt", desc: "Historischer Kern an der Donau." }, { name: "Nordost", desc: "Wohngebiet mit Audi-Naehe." }, { name: "Friedrichshofen", desc: "Modernes Wohnviertel." }, { name: "Oberhaunstadt", desc: "Familienfreundlicher Stadtteil." }], industrie: [{ name: "Audi Stammwerk", desc: "Hauptsitz und groesstes Werk." }, { name: "Raffinerie Ingolstadt", desc: "Grosse Erdoelraffinerie." }], sights: ["Audi Forum", "Neues Schloss", "Kreuztor", "Liebfrauenmuenster"] },
];

export function getCityBySlug(slug: string) { return CITIES.find(c => c.slug === slug); }
export function getAllCitySlugs() { return CITIES.map(c => c.slug); }

/** Returns nearby cities from the same bundesland (excluding the given slug), limited to `limit` results */
export function getNearbyCities(slug: string, limit = 6): CityData[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  const sameBundesland = CITIES.filter(c => c.slug !== slug && c.bundesland === city.bundesland);
  if (sameBundesland.length >= limit) return sameBundesland.slice(0, limit);
  // If not enough in same bundesland, fill with other cities
  const others = CITIES.filter(c => c.slug !== slug && c.bundesland !== city.bundesland);
  return [...sameBundesland, ...others].slice(0, limit);
}

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
  {
    slug: "monteurzimmer-langzeitmiete-vorteile",
    title: "Monteurzimmer Langzeitmiete — Vorteile gegenueber Hotel",
    excerpt: "Warum eine Langzeitmiete im Monteurzimmer fuer Unternehmen und Monteure guenstiger, flexibler und komfortabler ist als ein Hotelaufenthalt.",
    category: "Ratgeber",
    readTime: "5 Min.",
    date: "2026-01-20",
    content: `<h2>Warum Langzeitmiete statt Hotel?</h2>
<p>Wer Mitarbeiter fuer mehrere Wochen oder Monate auf Montage schickt, steht vor der Frage: Hotel oder Monteurzimmer? Auf den ersten Blick wirkt das Hotel bequem — doch bei laengeren Aufenthalten ueberwiegen die Vorteile einer Langzeitmiete im Monteurzimmer deutlich. Sowohl finanziell als auch in Bezug auf Lebensqualitaet und Produktivitaet.</p>
<h2>Kostenvergleich: Monteurzimmer vs. Hotel</h2>
<ul>
<li><strong>Hotelkosten:</strong> In deutschen Grossstaedten liegen einfache Business-Hotels bei 70-120 EUR pro Nacht. Bei einem 4-Wochen-Aufenthalt summiert sich das auf 2.000-3.400 EUR — ohne Verpflegung.</li>
<li><strong>Monteurzimmer:</strong> Langzeitmieten starten ab 15-30 EUR pro Nacht, bei monatlicher Buchung oft noch guenstiger. Vier Wochen kosten somit nur 420-840 EUR inklusive Kueche und Nebenkosten.</li>
<li><strong>Ersparnis:</strong> Unternehmen sparen bei Langzeitbuchungen im Monteurzimmer bis zu 70% gegenueber vergleichbaren Hotelkosten.</li>
</ul>
<h2>Mehr Komfort und Eigenstaendigkeit</h2>
<p>Ein Monteurzimmer bietet deutlich mehr Platz als ein Hotelzimmer. Die eigene Kueche ermoeglicht es, selbst zu kochen — das spart nicht nur Geld, sondern ist auf Dauer auch gesuender als taegliches Essen im Restaurant. Waschmaschine, separater Wohnbereich und oft ein eigener Parkplatz gehoeren bei guten Monteurzimmern zum Standard.</p>
<h2>Produktivitaet und Mitarbeiterzufriedenheit</h2>
<p>Studien zeigen, dass Mitarbeiter auf laengeren Montage-Einsaetzen in wohnungsaehnlichen Unterkuenften zufriedener und produktiver sind. Ein eigenes Zuhause auf Zeit reduziert Stress und foerdert die Erholung nach anstrengenden Arbeitstagen. Fuer Arbeitgeber bedeutet das: weniger Krankheitstage und hoehere Motivation.</p>
<h2>Vertragliche Flexibilitaet</h2>
<p>Anders als bei Hotels mit starren Stornierungsbedingungen bieten viele Monteurzimmer-Vermieter flexible Vertragslaufzeiten. Bei Schlaf-Platz koennen Langzeitmieten individuell angepasst werden — ob 2 Wochen oder 6 Monate. Aenderungen der Personenzahl oder Verlaengerungen sind unkompliziert moeglich.</p>`,
  },
  {
    slug: "monteurzimmer-fuer-teams",
    title: "Gruppenunterkuenfte fuer grosse Teams — 10 bis 100 Personen",
    excerpt: "So finden Unternehmen die passende Unterkunft fuer grosse Montage-Teams: Planung, Auswahl und Tipps fuer Gruppen ab 10 Personen.",
    category: "Fuer Unternehmen",
    readTime: "6 Min.",
    date: "2026-01-15",
    content: `<h2>Grosse Teams, grosse Herausforderung</h2>
<p>Wenn ein Unternehmen 10, 30 oder sogar 100 Mitarbeiter gleichzeitig an einen Projektstandort entsendet, wird die Unterkunftssuche zur logistischen Herausforderung. Hotels sind in dieser Groessenordnung oft nicht verfuegbar oder unbezahlbar. Monteurzimmer und Gruppenunterkuenfte bieten hier die ideale Loesung.</p>
<h2>Welche Unterkunftstypen eignen sich?</h2>
<ul>
<li><strong>Monteurwohnungen (3-6 Personen):</strong> Ideal fuer kleine Teams. Jede Einheit hat Kueche, Bad und Gemeinschaftsraum. Mehrere Wohnungen im selben Gebaeude ermoeglichen Teamnaehe.</li>
<li><strong>Monteurhaeuser (10-30 Personen):</strong> Ganze Haeuser mit mehreren Schlafzimmern, Gemeinschaftskueche und Aufenthaltsraum. Perfekt fuer mittlere Teams auf laengeren Projekten.</li>
<li><strong>Containerdoerfer und Wohnmodule (30-100+ Personen):</strong> Fuer Grossprojekte wie Kraftwerksbauten oder Infrastrukturprojekte. Professionelle Anbieter liefern komplett ausgestattete Wohnmodule inklusive Versorgung.</li>
<li><strong>Pensionen und Gasthaeuser:</strong> In laendlichen Regionen oft die einzige Option fuer groessere Gruppen. Vorteil: Verpflegung inklusive.</li>
</ul>
<h2>Planung und Organisation</h2>
<p>Bei der Unterbringung grosser Teams kommt es auf fruehzeitige Planung an. Beginnen Sie mindestens 4-6 Wochen vor Projektstart mit der Suche. Klaeren Sie vorab: Wie viele Einzelzimmer werden benoetigt? Gibt es Schichtarbeit, sodass Betten geteilt werden koennen? Welche Infrastruktur (Parkplaetze, OEPNV, Einkaufsmoeglichkeiten) muss in der Naehe sein?</p>
<h2>Kosten im Griff behalten</h2>
<p>Bei grossen Gruppen lohnt es sich, Mengenrabatte zu verhandeln. Viele Vermieter bieten ab 10 Personen Sonderkonditionen. Rechnen Sie mit 12-25 EUR pro Person und Nacht bei Langzeitbuchungen fuer groessere Gruppen. Vergleichen Sie unbedingt die Gesamtkosten inklusive Nebenkosten, Reinigung und Bettwaesche.</p>
<h2>So hilft Schlaf-Platz</h2>
<p>Ueber Schlaf-Platz koennen Unternehmen kostenlos Gruppenanfragen stellen. Unser Team uebernimmt die komplette Recherche und Koordination — von der Bedarfsanalyse ueber die Angebotserstellung bis zur Buchungsbestaetigung. Mit ueber 1.500 Partnern in ganz Deutschland finden wir auch fuer grosse Teams passende Unterkuenfte, oft innerhalb von 15 Minuten.</p>`,
  },
  {
    slug: "monteurzimmer-sicherheit-tipps",
    title: "Sicherheitstipps fuer Monteurzimmer — Fuer Mieter und Vermieter",
    excerpt: "Worauf Mieter und Vermieter bei der Buchung und Vermietung von Monteurzimmern achten sollten, um Betrug und Probleme zu vermeiden.",
    category: "Ratgeber",
    readTime: "5 Min.",
    date: "2026-01-10",
    content: `<h2>Sicherheit bei der Buchung</h2>
<p>Der Markt fuer Monteurzimmer ist gross und leider nicht frei von schwarzen Schafen. Ob Sie ein Zimmer suchen oder eines vermieten — mit den richtigen Vorsichtsmassnahmen schuetzen Sie sich vor Betrug, Schaeden und unangenehmen Ueberraschungen.</p>
<h2>Tipps fuer Mieter</h2>
<ul>
<li><strong>Nur ueber serioeose Plattformen buchen:</strong> Nutzen Sie bekannte Portale mit Bewertungssystem und Verifizierung. Schlaf-Platz bietet als einzige Plattform ein Transparenzregister, das die Identitaet aller Vermieter prueft.</li>
<li><strong>Vorauszahlung begrenzen:</strong> Zahlen Sie maximal eine Monatsmiete im Voraus. Serioeose Vermieter verlangen keine hohen Vorauszahlungen oder Kautionen per Ueberweisung an Privatkonten.</li>
<li><strong>Mietvertrag verlangen:</strong> Bestehen Sie auf einem schriftlichen Mietvertrag, der Mietdauer, Preis, Nebenkosten und Kuendigungsfristen klar regelt.</li>
<li><strong>Besichtigung oder aktuelle Fotos:</strong> Wenn moeglich, besichtigen Sie die Unterkunft vorab. Alternativ fordern Sie aktuelle Fotos oder einen Video-Rundgang an.</li>
<li><strong>Kontaktdaten pruefen:</strong> Der Vermieter sollte telefonisch erreichbar sein und eine vollstaendige Adresse angeben.</li>
</ul>
<h2>Tipps fuer Vermieter</h2>
<ul>
<li><strong>Mieter identifizieren:</strong> Lassen Sie sich einen Personalausweis zeigen und notieren Sie die Daten. Bei Firmenkunden sollte eine offizielle Buchungsbestaetigung des Unternehmens vorliegen.</li>
<li><strong>Kaution vereinbaren:</strong> Eine angemessene Kaution (1-2 Wochenmieten) schuetzt vor Schaeden. Dokumentieren Sie den Zustand der Wohnung bei Uebergabe mit Fotos.</li>
<li><strong>Hausordnung aufstellen:</strong> Klare Regeln zu Ruhezeiten, Rauchen, Gaesten und Muellentsorgung vermeiden Konflikte.</li>
<li><strong>Versicherung pruefen:</strong> Stellen Sie sicher, dass Ihre Haftpflicht- und Gebaeudeversicherung die Vermietung an Monteure abdeckt.</li>
</ul>
<h2>Warnsignale erkennen</h2>
<p>Seien Sie misstrauisch bei unrealistisch niedrigen Preisen, fehlenden Kontaktdaten, Druck zur schnellen Zahlung oder Angeboten, die nur per E-Mail kommuniziert werden. Im Zweifel nutzen Sie eine Plattform wie Schlaf-Platz, die alle Vermieter verifiziert und bei Problemen als Ansprechpartner zur Verfuegung steht.</p>`,
  },
  {
    slug: "monteurzimmer-kuechentipps-fuer-monteure",
    title: "Schnelle Rezepte und Kuechentipps fuer Monteure",
    excerpt: "Gesund und guenstig kochen im Monteurzimmer: Einfache Rezepte und praktische Tipps fuer den Alltag auf Montage.",
    category: "Lifestyle",
    readTime: "4 Min.",
    date: "2026-01-05",
    content: `<h2>Kochen auf Montage — Warum es sich lohnt</h2>
<p>Wer wochen- oder monatelang auf Montage ist, gibt beim taeglichen Essen im Restaurant oder an der Imbissbude schnell 15-25 EUR pro Tag aus. Das sind 300-500 EUR im Monat allein fuer Verpflegung. Selbst kochen im Monteurzimmer spart nicht nur Geld, sondern ist auch deutlich gesuender und steigert das Wohlbefinden auf laengeren Einsaetzen.</p>
<h2>Grundausstattung fuer die Monteurskueche</h2>
<ul>
<li><strong>Basics:</strong> Salz, Pfeffer, Oel, Nudeln, Reis, Kartoffeln, Eier, Brot — damit lassen sich dutzende einfache Gerichte zubereiten.</li>
<li><strong>Frischware:</strong> Kaufen Sie 2-3 Mal pro Woche frisches Gemuese, Obst und Fleisch oder Wurst ein. Ein kleiner Wochenplan hilft gegen Lebensmittelverschwendung.</li>
<li><strong>Konserven:</strong> Kidneybohnen, Mais, passierte Tomaten und Thunfisch sind lange haltbar und vielseitig einsetzbar.</li>
</ul>
<h2>5 schnelle Rezepte unter 20 Minuten</h2>
<ul>
<li><strong>Spaghetti Bolognese Express:</strong> Hackfleisch anbraten, passierte Tomaten dazu, wuerzen, fertig. Waehrend die Nudeln kochen, ist die Sauce bereit.</li>
<li><strong>Bauernfruehstueck:</strong> Kartoffeln (vorgekocht oder Restekartoffeln) in der Pfanne braten, Eier und Speck dazu — satt und zufrieden.</li>
<li><strong>Wrap mit allem:</strong> Tortilla-Wraps mit Salat, Kaese, Schinken und Sauce belegen. Keine Kochzeit, trotzdem satt.</li>
<li><strong>Reispfanne:</strong> Reis kochen, Gemuese und Haehnchenbrust anbraten, Sojasauce dazu — gesund und fuellend.</li>
<li><strong>Ofengemuese:</strong> Paprika, Zucchini, Kartoffeln und Zwiebeln auf ein Blech legen, Oel und Gewuerze drueber, 20 Minuten im Ofen.</li>
</ul>
<h2>Meal Prep: Vorkochen am Wochenende</h2>
<p>Nutzen Sie den Sonntag, um groessere Portionen vorzukochen. Chili con Carne, Gulasch oder Eintopf lassen sich gut portionieren und halten im Kuehlschrank 3-4 Tage. So muessen Sie unter der Woche nach einem langen Arbeitstag nur aufwaermen — und sparen trotzdem Geld und essen gesund.</p>
<h2>Gemeinsam kochen im Team</h2>
<p>Wenn Sie mit Kollegen im selben Monteurzimmer oder Haus wohnen, teilen Sie die Kocharbeit auf. Jeder kocht an einem anderen Abend fuer die Gruppe — das spart Zeit, macht mehr Spass und staerkt den Teamzusammenhalt auf Montage.</p>`,
  },
  {
    slug: "monteurzimmer-recht-mietvertrag",
    title: "Rechtliche Grundlagen — Was gehoert in den Mietvertrag?",
    excerpt: "Mietvertrag fuer Monteurzimmer richtig aufsetzen: Die wichtigsten Klauseln, rechtlichen Grundlagen und Fallstricke fuer Vermieter und Mieter.",
    category: "Steuern & Recht",
    readTime: "7 Min.",
    date: "2025-12-28",
    content: `<h2>Warum ein schriftlicher Mietvertrag wichtig ist</h2>
<p>Auch bei kurzfristiger Vermietung von Monteurzimmern ist ein schriftlicher Mietvertrag dringend empfohlen. Er schuetzt beide Seiten — Vermieter und Mieter — vor Missverstaendnissen und bietet im Streitfall eine klare rechtliche Grundlage. Muendliche Vereinbarungen sind zwar grundsaetzlich gueltig, aber im Ernstfall kaum beweisbar.</p>
<h2>Wesentliche Vertragsbestandteile</h2>
<ul>
<li><strong>Vertragsparteien:</strong> Vollstaendiger Name und Adresse von Vermieter und Mieter. Bei Firmenbuchungen: Firmenname, Ansprechpartner und Handelsregisternummer.</li>
<li><strong>Mietobjekt:</strong> Genaue Bezeichnung des Zimmers oder der Wohnung, inklusive Adresse, Etage, Zimmergroesse und Inventarliste.</li>
<li><strong>Mietdauer:</strong> Beginn und Ende des Mietverhaeltnisses. Bei unbestimmter Dauer: Kuendigungsfristen klar regeln (ueblich sind 1-2 Wochen).</li>
<li><strong>Mietpreis:</strong> Hoehe der Miete pro Nacht, Woche oder Monat. Angabe, ob Nebenkosten (Strom, Wasser, Heizung, WLAN) inklusive sind oder separat abgerechnet werden.</li>
<li><strong>Kaution:</strong> Hoehe der Kaution, Zahlungsart und Bedingungen fuer die Rueckgabe. Ueblich sind 1-2 Wochenmieten.</li>
<li><strong>Hausordnung:</strong> Verweis auf eine beiliegende Hausordnung mit Regeln zu Ruhezeiten, Rauchen, Tierhaltung und Gaesten.</li>
</ul>
<h2>Besonderheiten bei Monteurzimmern</h2>
<p>Die Vermietung von Monteurzimmern unterscheidet sich rechtlich von normaler Wohnraumvermietung. Bei moeblierter Kurzzeitvermietung (unter 6 Monate) gelten gelockerte Kuendigungsschutzregeln. Der Mieterschutz des BGB greift bei voruebergehender Unterbringung von Monteuren nur eingeschraenkt. Dennoch sollten Vermieter die Zweckbindung (gewerbliche Nutzung) im Vertrag klar festhalten.</p>
<h2>Steuerliche Pflichten</h2>
<p>Einnahmen aus der Vermietung von Monteurzimmern sind steuerpflichtig und muessen in der Einkommensteuererklaerung angegeben werden. Bei kurzfristiger Beherbergung (unter 6 Monate) faellt zudem der ermaessigte Umsatzsteuersatz von 7% an, sofern der Vermieter umsatzsteuerpflichtig ist. Zusatzleistungen wie Reinigung oder Bettwaesche werden mit 19% besteuert.</p>
<h2>Haeufige Fehler vermeiden</h2>
<ul>
<li><strong>Fehlende Inventarliste:</strong> Ohne dokumentierten Zustand bei Einzug sind Schaeden schwer nachzuweisen. Erstellen Sie ein Uebergabeprotokoll mit Fotos.</li>
<li><strong>Unklare Nebenkostenregelung:</strong> Pauschale oder nach Verbrauch? Klare Regelung im Vertrag verhindert Streit bei der Abrechnung.</li>
<li><strong>Keine Regelung zur vorzeitigen Kuendigung:</strong> Was passiert, wenn das Projekt frueher endet? Vereinbaren Sie eine faire Stornierungsregelung fuer beide Seiten.</li>
<li><strong>Fehlende Meldepflicht:</strong> In Deutschland muessen Gaeste, die laenger als 3 Tage bleiben, beim Einwohnermeldeamt angemeldet werden. Vermieter sind verpflichtet, eine Wohnungsgeberbescheinigung auszustellen.</li>
</ul>
<h2>Mustervertrag nutzen</h2>
<p>Nutzen Sie einen geprueften Mustervertrag als Basis und passen Sie ihn an Ihre Situation an. Schlaf-Platz stellt seinen Vermietern kostenlos eine Vertragsvorlage zur Verfuegung, die alle relevanten Klauseln enthaelt und regelmaessig von Juristen aktualisiert wird.</p>`,
  },
];

export function getBlogBySlug(slug: string) { return BLOG_ARTICLES.find(a => a.slug === slug); }
export function getAllBlogSlugs() { return BLOG_ARTICLES.map(a => a.slug); }
