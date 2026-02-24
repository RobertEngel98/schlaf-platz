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
    { label: "Alle Städte", href: "/#staedte" },
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
  { slug: "berlin", name: "Berlin", emoji: "\uD83C\uDFD7", tagline: "Hauptstadt & Bau-Hotspot", bundesland: "Berlin (Stadtstaat)", einwohner: "ca. 3.700.000", flaeche: "891,7 km\u00B2", hoehe: "34 m", autobahnen: "A10, A100, A111, A113, A115", bahnhof: "Berlin Hauptbahnhof", heroDesc: "Berlin, als wachsende Hauptstadt und einer der größten Baustellen Europas, zieht stetig Fachkräfte an.", branchen: "Bau, IT, Verwaltung, Tourismus, Medien", unternehmen: "Siemens, Deutsche Bahn, Zalando, SAP", messen: ["ITB Berlin", "IFA", "InnoTrans", "Fruit Logistica"], stadtteile: [{ name: "Mitte", desc: "Politisches und kulturelles Zentrum." }, { name: "Kreuzberg", desc: "Multikulturelles Viertel." }, { name: "Charlottenburg", desc: "Elegant am Kurfürstendamm." }, { name: "Prenzlauer Berg", desc: "Beliebtes Wohnviertel." }], industrie: [{ name: "Industriepark Marzahn", desc: "Größtes Gewerbegebiet." }, { name: "Technologiepark Adlershof", desc: "Über 1.000 Unternehmen." }], sights: ["Brandenburger Tor", "Reichstag", "East Side Gallery", "Fernsehturm", "Museumsinsel"] },
  { slug: "muenchen", name: "München", emoji: "\uD83C\uDFD4", tagline: "BMW, Siemens & mehr", bundesland: "Bayern (LH)", einwohner: "ca. 1.500.000", flaeche: "310,7 km\u00B2", hoehe: "519 m", autobahnen: "A8, A9, A92, A95, A96, A99", bahnhof: "München Hbf", heroDesc: "Wirtschaftsmetropole Bayerns und Sitz von BMW, Siemens und Allianz.", branchen: "Automobil, IT, Versicherungen, Maschinenbau", unternehmen: "BMW, Siemens, Allianz, Munich Re", messen: ["bauma", "ISPO", "electronica", "Expo Real"], stadtteile: [{ name: "Schwabing", desc: "Beliebtes Uni-Viertel." }, { name: "Maxvorstadt", desc: "Kulturelles Herz." }, { name: "Sendling", desc: "Traditionell mit Großmarkt." }, { name: "Haidhausen", desc: "Charmant östlich der Isar." }], industrie: [{ name: "Gewerbegebiet Nord", desc: "Großer Industriestandort." }, { name: "Industriepark Riem", desc: "Moderner Gewerbepark." }], sights: ["Marienplatz", "Frauenkirche", "Englischer Garten", "Schloss Nymphenburg", "BMW Welt"] },
  { slug: "hamburg", name: "Hamburg", emoji: "\u2693", tagline: "Hafen & Industrie", bundesland: "Hamburg (Stadtstaat)", einwohner: "ca. 1.900.000", flaeche: "755,2 km\u00B2", hoehe: "6 m", autobahnen: "A1, A7, A23, A24, A25", bahnhof: "Hamburg Hbf", heroDesc: "Tor zur Welt und wichtiger Wirtschafts- und Logistikstandort.", branchen: "Hafen & Logistik, Luftfahrt, Medien, Erneuerbare Energien", unternehmen: "Airbus, Otto Group, Beiersdorf, Hapag-Lloyd", messen: ["SMM", "WindEnergy Hamburg", "Aircraft Interiors Expo"], stadtteile: [{ name: "St. Pauli", desc: "Berühmt für die Reeperbahn." }, { name: "Altona", desc: "Vielseitig mit Elbstrand." }, { name: "HafenCity", desc: "Größtes Stadtentwicklungsprojekt." }, { name: "Eimsbüttel", desc: "Beliebtes Wohnviertel." }], industrie: [{ name: "Hamburger Hafen", desc: "Drittgrößter Hafen Europas." }, { name: "Airbus Finkenwerder", desc: "Wichtigster Produktionsstandort." }], sights: ["Elbphilharmonie", "Speicherstadt", "Miniatur Wunderland", "Landungsbrücken", "Rathaus"] },
  { slug: "koeln", name: "Köln", emoji: "\u26EA", tagline: "Ford & Chemiepark", bundesland: "NRW", einwohner: "ca. 1.080.000", flaeche: "405,2 km\u00B2", hoehe: "53 m", autobahnen: "A1, A3, A4, A57", bahnhof: "Köln Hbf", heroDesc: "Medien-, Industrie- und Messestadt am Rhein.", branchen: "Automobil (Ford), Chemie, Medien, Versicherungen", unternehmen: "Ford, Lanxess, RTL, Zurich", messen: ["gamescom", "Anuga", "IMM Cologne", "FIBO"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Ehrenfeld", desc: "Kreatives Szene-Viertel." }, { name: "Deutz", desc: "Rechtsrheinisch mit Messe." }, { name: "Nippes", desc: "Lebhaftes Wohnviertel." }], industrie: [{ name: "Ford-Werke Niehl", desc: "Größter Automobilstandort." }, { name: "Chempark Leverkusen", desc: "Einer der größten Chemieparks." }], sights: ["Kölner Dom", "Hohenzollernbrücke", "Rheinufer", "Museum Ludwig", "Schokoladenmuseum"] },
  { slug: "frankfurt", name: "Frankfurt", emoji: "\uD83C\uDFE6", tagline: "Banken & Infrastruktur", bundesland: "Hessen", einwohner: "ca. 760.000", flaeche: "248,3 km\u00B2", hoehe: "112 m", autobahnen: "A3, A5, A66, A661", bahnhof: "Frankfurt Hbf", heroDesc: "Finanzzentrum und Sitz der EZB.", branchen: "Finanz, Logistik, Pharma, IT", unternehmen: "Deutsche Bank, EZB, Commerzbank, Fraport", messen: ["Buchmesse", "Automechanika", "Light + Building", "Ambiente"], stadtteile: [{ name: "Sachsenhausen", desc: "Bekannt für Äppelwoi." }, { name: "Nordend", desc: "Beliebtes Gründerzeit-Viertel." }, { name: "Westend", desc: "Gehobenes Bankenviertel." }, { name: "Bornheim", desc: "Lebhaft mit Wochenmarkt." }], industrie: [{ name: "Industriepark Höchst", desc: "Einer der größten in Europa." }, { name: "Flughafen-Gewerbegebiet", desc: "Logistik-Areal." }], sights: ["Römerberg", "Skyline", "Palmengarten", "Museumsufer", "Alte Oper"] },
  { slug: "duesseldorf", name: "Düsseldorf", emoji: "\uD83C\uDFAA", tagline: "Messen & Handel", bundesland: "NRW (LH)", einwohner: "ca. 640.000", flaeche: "217,4 km\u00B2", hoehe: "38 m", autobahnen: "A3, A46, A52, A57", bahnhof: "Düsseldorf Hbf", heroDesc: "Landeshauptstadt und internationaler Messestandort.", branchen: "Mode, Werbung, Telekommunikation, IT", unternehmen: "Henkel, E.ON, Vodafone, L'Oreal", messen: ["drupa", "boot", "MEDICA", "interpack"], stadtteile: [{ name: "Altstadt", desc: "Längster Tresen der Welt." }, { name: "Oberkassel", desc: "Elegant am Rhein." }, { name: "Flingern", desc: "Kreativer Hotspot." }, { name: "Pempelfort", desc: "Lebendiges Wohngebiet." }], industrie: [{ name: "Industriepark Nord", desc: "Chemie und Automobil." }, { name: "Hafenareal", desc: "Logistik am Rhein." }], sights: ["Rheinturm", "MedienHafen", "Königsallee", "Altstadt", "Schloss Benrath"] },
  { slug: "stuttgart", name: "Stuttgart", emoji: "\uD83D\uDE97", tagline: "Porsche & Bosch", bundesland: "BW (LH)", einwohner: "ca. 630.000", flaeche: "207,4 km\u00B2", hoehe: "245 m", autobahnen: "A8, A81, A831", bahnhof: "Stuttgart Hbf", heroDesc: "Heimat von Porsche, Mercedes-Benz und Bosch.", branchen: "Automobil, Maschinenbau, IT", unternehmen: "Porsche, Mercedes-Benz, Bosch, Daimler Truck", messen: ["CMT", "AMB", "Interbad", "Retro Classics"], stadtteile: [{ name: "Mitte", desc: "Zentrum mit Königstraße." }, { name: "Stuttgart-West", desc: "Beliebtes Wohnviertel." }, { name: "Bad Cannstatt", desc: "Ältester Stadtteil." }, { name: "Vaihingen", desc: "Uni- und Forschungsstandort." }], industrie: [{ name: "Porsche Zuffenhausen", desc: "Hauptsitz des Sportwagenherstellers." }, { name: "Bosch Renningen", desc: "F&E-Campus." }], sights: ["Mercedes-Benz Museum", "Porsche Museum", "Schlossplatz", "Wilhelma", "Fernsehturm"] },
  { slug: "dortmund", name: "Dortmund", emoji: "\u2699", tagline: "Stahl & Technologie", bundesland: "NRW", einwohner: "ca. 590.000", flaeche: "280,7 km\u00B2", hoehe: "86 m", autobahnen: "A1, A2, A40, A44, A45", bahnhof: "Dortmund Hbf", heroDesc: "Im Herzen des Ruhrgebiets, vom Stahl zum Technologiezentrum.", branchen: "Stahl, Technologie, Logistik, Versicherungen", unternehmen: "Signal Iduna, Wilo, ThyssenKrupp", messen: ["GIFA", "METEC", "THERMPROCESS"], stadtteile: [{ name: "Innenstadt", desc: "Belebtes Zentrum." }, { name: "Hörde", desc: "Am Phoenix-See." }, { name: "Hombruch", desc: "Grüner Süden." }], industrie: [{ name: "Technologiepark", desc: "300+ Unternehmen." }, { name: "Westfalenhütte", desc: "Ehem. Stahlwerk, heute Gewerbe." }], sights: ["Signal Iduna Park", "Westfalenpark", "Phoenix-See", "Dortmunder U"] },
  { slug: "essen", name: "Essen", emoji: "\uD83D\uDD0B", tagline: "Energiewende & Bau", bundesland: "NRW", einwohner: "ca. 580.000", flaeche: "210,4 km\u00B2", hoehe: "116 m", autobahnen: "A40, A42, A52", bahnhof: "Essen Hbf", heroDesc: "Sitz von RWE und thyssenkrupp, wichtiger Energie- und Industriestandort.", branchen: "Energie, Stahl, Bau, Handel", unternehmen: "RWE, thyssenkrupp, Aldi, Hochtief", messen: ["E-world", "Security Essen", "IPM Essen"], stadtteile: [{ name: "Rüttenscheid", desc: "Beliebtes Ausgeh-Viertel." }, { name: "Werden", desc: "Historisch an der Ruhr." }, { name: "Kettwig", desc: "Malerisch mit Fachwerk." }], industrie: [{ name: "thyssenkrupp Quartier", desc: "Moderner Hauptsitz." }, { name: "Gewerbegebiet Kray", desc: "An A40 und A42." }], sights: ["Zeche Zollverein", "Baldeneysee", "Museum Folkwang", "Villa Hügel"] },
  { slug: "leipzig", name: "Leipzig", emoji: "\uD83C\uDF3F", tagline: "Wachstumsregion Ost", bundesland: "Sachsen", einwohner: "ca. 610.000", flaeche: "297,8 km\u00B2", hoehe: "113 m", autobahnen: "A9, A14, A38", bahnhof: "Leipzig Hbf", heroDesc: "Boomende Stadt und Standort von BMW und Porsche.", branchen: "Automobil, Logistik, Medien, Biotech", unternehmen: "BMW, Porsche, DHL, Amazon", messen: ["Buchmesse", "denkmal", "Cadeaux Leipzig"], stadtteile: [{ name: "Plagwitz", desc: "Kreatives Industrieviertel." }, { name: "Connewitz", desc: "Alternatives Szeneviertel." }, { name: "Gohlis", desc: "Gründerzeit-Villen." }], industrie: [{ name: "BMW Werk", desc: "Modernes Automobilwerk." }, { name: "DHL Hub", desc: "Größtes DHL-Drehkreuz der Welt." }], sights: ["Völkerschlachtdenkmal", "Thomaskirche", "Zoo", "Spinnerei", "Nikolaikirche"] },
  { slug: "hannover", name: "Hannover", emoji: "\uD83C\uDFED", tagline: "Messe & Industrie", bundesland: "Niedersachsen (LH)", einwohner: "ca. 535.000", flaeche: "204,0 km\u00B2", hoehe: "55 m", autobahnen: "A2, A7, A37, A352", bahnhof: "Hannover Hbf", heroDesc: "Messestadt Nr. 1 und wichtiger Industriestandort in Norddeutschland.", branchen: "Messe, Automobil, Versicherungen, IT", unternehmen: "Continental, VW Nutzfahrzeuge, Hannover Rück, TUI", messen: ["HANNOVER MESSE", "CeBIT", "IAA Transportation", "LIGNA"], stadtteile: [{ name: "Linden", desc: "Alternatives Kulturviertel." }, { name: "List", desc: "Beliebtes Wohnviertel." }, { name: "Herrenhausen", desc: "Berühmt für die Gärten." }], industrie: [{ name: "VW Nutzfahrzeuge Werk", desc: "Transporter-Produktion." }, { name: "Continental Zentrale", desc: "Reifenhersteller-Hauptsitz." }], sights: ["Herrenhäuser Gärten", "Neues Rathaus", "Maschsee", "Altstadt"] },
  { slug: "nuernberg", name: "Nürnberg", emoji: "\uD83C\uDFF0", tagline: "Technik & Tradition", bundesland: "Bayern", einwohner: "ca. 520.000", flaeche: "186,4 km\u00B2", hoehe: "309 m", autobahnen: "A3, A6, A9, A73", bahnhof: "Nürnberg Hbf", heroDesc: "Zweitgrößte Stadt Bayerns mit starker Industrie und Messetradition.", branchen: "Elektrotechnik, Maschinenbau, Spielzeug, IT", unternehmen: "Siemens, Datev, GfK, Schwan-Stabilo", messen: ["Spielwarenmesse", "SPS", "BrauBeviale", "BIOFACH"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Burg." }, { name: "St. Johannis", desc: "Gehoben mit Grünflächen." }, { name: "Göstenhof", desc: "Aufstrebendes Kreativviertel." }], industrie: [{ name: "Siemens Campus", desc: "Moderner Technologiecampus." }, { name: "Hafen Nürnberg", desc: "Wichtiger Binnenhafen." }], sights: ["Kaiserburg", "Altstadt", "DB Museum", "Tiergarten"] },
  { slug: "dresden", name: "Dresden", emoji: "\uD83C\uDFDB", tagline: "Silicon Saxony", bundesland: "Sachsen (LH)", einwohner: "ca. 560.000", flaeche: "328,5 km\u00B2", hoehe: "113 m", autobahnen: "A4, A13, A17", bahnhof: "Dresden Hbf", heroDesc: "Hightech-Standort und Kulturmetropole an der Elbe — Europas größtes Halbleiter-Cluster.", branchen: "Halbleiter, Maschinenbau, Pharma, Tourismus", unternehmen: "Infineon, Globalfoundries, Bosch, SAP", messen: ["SemperOpernball", "SEMICON Europa"], stadtteile: [{ name: "Neustadt", desc: "Alternatives Szeneviertel." }, { name: "Blasewitz", desc: "Grüne Villengegend." }, { name: "Striesen", desc: "Beliebtes Familienviertel." }], industrie: [{ name: "Silicon Saxony", desc: "Größtes Halbleiter-Cluster Europas." }, { name: "Bosch Halbleiterwerk", desc: "Milliarden-Investition." }], sights: ["Frauenkirche", "Zwinger", "Semperoper", "Brühls Terrasse"] },
  { slug: "bremen", name: "Bremen", emoji: "\u2693", tagline: "Hafen & Luft-/Raumfahrt", bundesland: "Bremen (Stadtstaat)", einwohner: "ca. 570.000", flaeche: "326,7 km\u00B2", hoehe: "11 m", autobahnen: "A1, A27, A28, A281", bahnhof: "Bremen Hbf", heroDesc: "Hafenstadt mit Schwerpunkt auf Luft- und Raumfahrt, Logistik und Lebensmittelindustrie.", branchen: "Luft-/Raumfahrt, Logistik, Lebensmittel, Automobil", unternehmen: "Airbus Defence, OHB, Mercedes-Benz, Beck's", messen: ["Hanselife", "Fish International"], stadtteile: [{ name: "Viertel", desc: "Studentisches Szeneviertel." }, { name: "Schwachhausen", desc: "Gehoben mit Villen." }, { name: "Überseestadt", desc: "Modernes Hafenquartier." }], industrie: [{ name: "Airbus-Werk Bremen", desc: "Tragflächenproduktion." }, { name: "Mercedes-Benz Werk", desc: "Autoherstellung." }], sights: ["Bremer Stadtmusikanten", "Rathaus", "Schnoor", "Überseestadt"] },
  { slug: "duisburg", name: "Duisburg", emoji: "\uD83D\uDEA2", tagline: "Europas größter Binnenhafen", bundesland: "NRW", einwohner: "ca. 500.000", flaeche: "232,8 km\u00B2", hoehe: "33 m", autobahnen: "A2, A3, A40, A42, A59", bahnhof: "Duisburg Hbf", heroDesc: "Standort des größten Binnenhafens Europas und im Wandel vom Stahl zur Logistik.", branchen: "Stahl, Logistik, Hafen, Chemie", unternehmen: "thyssenkrupp Steel, Klöckner, duisport", messen: ["Logistik-Konferenzen am Hafen"], stadtteile: [{ name: "Innenhafen", desc: "Revitalisiertes Hafenviertel." }, { name: "Rheinhausen", desc: "Ehemaliges Krupp-Viertel." }, { name: "Meiderich", desc: "Nahe am Landschaftspark." }], industrie: [{ name: "duisport", desc: "Größter Binnenhafen Europas." }, { name: "thyssenkrupp Steel", desc: "Stahlproduktion." }], sights: ["Landschaftspark Nord", "Innenhafen", "Tiger & Turtle", "Lehmbruck Museum"] },
  { slug: "bochum", name: "Bochum", emoji: "\u2699", tagline: "Uni & Innovation", bundesland: "NRW", einwohner: "ca. 365.000", flaeche: "145,7 km\u00B2", hoehe: "100 m", autobahnen: "A40, A43, A44, A448", bahnhof: "Bochum Hbf", heroDesc: "Universitätsstadt im Ruhrgebiet mit wachsendem IT- und Gesundheitssektor.", branchen: "IT-Sicherheit, Gesundheit, Automobil, Bildung", unternehmen: "Vonovia, GEA, Knappschaft", messen: ["it-sa Community (IT-Security)"], stadtteile: [{ name: "Ehrenfeld", desc: "Studentisches Viertel." }, { name: "Stiepel", desc: "Grün am Kemnader See." }, { name: "Langendreer", desc: "Kulturell vielfältig." }], industrie: [{ name: "MARK 51 7", desc: "Innovationscampus auf ex-Opel-Gelände." }, { name: "Gesundheitscampus", desc: "Medizinforschung NRW." }], sights: ["Deutsches Bergbau-Museum", "Starlight Express Theater", "Bermuda3eck", "Kemnader See"] },
  { slug: "wuppertal", name: "Wuppertal", emoji: "\uD83D\uDE9F", tagline: "Schwebebahn & Handwerk", bundesland: "NRW", einwohner: "ca. 355.000", flaeche: "168,4 km\u00B2", hoehe: "160 m", autobahnen: "A1, A46, A535", bahnhof: "Wuppertal Hbf", heroDesc: "Industriestadt im Bergischen Land, bekannt für die Schwebebahn und starke Handwerkstradition.", branchen: "Chemie, Textil, Maschinenbau, Handwerk", unternehmen: "Bayer (Standort), Vorwerk, Knipex", messen: [], stadtteile: [{ name: "Elberfeld", desc: "Stadtzentrum mit Einkaufsmeile." }, { name: "Barmen", desc: "Historisches Zentrum." }, { name: "Cronenberg", desc: "Handwerker-Stadtteil." }], industrie: [{ name: "Industriegebiet Nützenberg", desc: "Vielfältiger Gewerbestandort." }, { name: "Technologiezentrum W-tec", desc: "Gründerförderung." }], sights: ["Schwebebahn", "Von der Heydt-Museum", "Botanischer Garten", "Skulpturenpark"] },
  { slug: "bielefeld", name: "Bielefeld", emoji: "\uD83C\uDFED", tagline: "Maschinenbau & IT", bundesland: "NRW", einwohner: "ca. 335.000", flaeche: "258,8 km\u00B2", hoehe: "118 m", autobahnen: "A2, A33", bahnhof: "Bielefeld Hbf", heroDesc: "Ostwestfälische Wirtschaftsmetropole mit starkem Mittelstand und IT-Branche.", branchen: "Maschinenbau, Lebensmittel, IT, Textil", unternehmen: "Dr. Oetker, Schüco, DMG Mori, Goldbeck", messen: ["Bethel-Lauf", "Weinbrunnenfest"], stadtteile: [{ name: "Mitte", desc: "Kompaktes Stadtzentrum." }, { name: "Schildesche", desc: "Nah am Obersee." }, { name: "Brackwede", desc: "Nahe Teutoburger Wald." }], industrie: [{ name: "Schüco Zentrale", desc: "Fenster- und Fassadensysteme." }, { name: "Dr. Oetker Werk", desc: "Lebensmittelproduktion." }], sights: ["Sparrenburg", "Teutoburger Wald", "Kunsthalle", "Botanischer Garten"] },
  { slug: "bonn", name: "Bonn", emoji: "\uD83C\uDFDB", tagline: "UN-Stadt & Telekom", bundesland: "NRW", einwohner: "ca. 330.000", flaeche: "141,1 km\u00B2", hoehe: "60 m", autobahnen: "A555, A559, A565", bahnhof: "Bonn Hbf", heroDesc: "Ehemalige Bundeshauptstadt und UN-Standort mit starkem öffentlichen Sektor und Telekommunikation.", branchen: "Telekommunikation, UN/NGOs, Öffentlicher Dienst, Logistik", unternehmen: "Deutsche Telekom, Deutsche Post, United Nations", messen: ["Bonner Matheturnier"], stadtteile: [{ name: "Bad Godesberg", desc: "Diplomatenviertel am Rhein." }, { name: "Beuel", desc: "Rechtsrheinisch, lebendig." }, { name: "Zentrum", desc: "Kompakt mit Uni-Flair." }], industrie: [{ name: "Telekom Campus", desc: "Europas größtes Telekommunikationszentrum." }, { name: "UN Campus", desc: "23 UN-Organisationen." }], sights: ["Beethoven-Haus", "Bundeskunsthalle", "Alter Zoll", "Drachenfels"] },
  { slug: "mannheim", name: "Mannheim", emoji: "\uD83C\uDFED", tagline: "Quadratestadt & Industrie", bundesland: "BW", einwohner: "ca. 310.000", flaeche: "144,9 km\u00B2", hoehe: "97 m", autobahnen: "A6, A656, A659", bahnhof: "Mannheim Hbf", heroDesc: "Mannheim ist ein bedeutender Industriestandort in der Metropolregion Rhein-Neckar mit starker Chemie- und Maschinenbaubranche.", branchen: "Chemie, Maschinenbau, Pharma, Logistik", unternehmen: "Roche, John Deere, Caterpillar, Pepperl+Fuchs", messen: ["Maimarkt", "Explore Science"], stadtteile: [{ name: "Quadrate", desc: "Einzigartiges Straßensystem im Stadtzentrum." }, { name: "Jungbusch", desc: "Kreatives Hafenviertel." }, { name: "Neckarstadt", desc: "Multikulturelles Wohnviertel." }, { name: "Feudenheim", desc: "Grüner Vorort im Osten." }], industrie: [{ name: "John Deere Werk", desc: "Europaweites Produktionszentrum." }, { name: "Roche Mannheim", desc: "Pharma- und Diagnostikstandort." }], sights: ["Wasserturm", "Barockschloss Mannheim", "Luisenpark", "Technoseum"] },
  { slug: "augsburg", name: "Augsburg", emoji: "\uD83C\uDFDB", tagline: "Fuggerstadt & Maschinenbau", bundesland: "Bayern", einwohner: "ca. 300.000", flaeche: "146,8 km\u00B2", hoehe: "489 m", autobahnen: "A8, A30 (B17)", bahnhof: "Augsburg Hbf", heroDesc: "Eine der ältesten Städte Deutschlands mit starker Industrie und der ältesten Sozialsiedlung der Welt.", branchen: "Maschinenbau, Luft- und Raumfahrt, IT, Textil", unternehmen: "Premium AEROTEC, KUKA, MAN Energy Solutions, Faurecia", messen: ["Intersana", "Jagen und Fischen"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Rathaus." }, { name: "Lechhausen", desc: "Größter Stadtteil östlich des Lechs." }, { name: "Göggingen", desc: "Beliebter Wohnstadtteil im Süden." }, { name: "Oberhausen", desc: "Vielfältiges Viertel im Norden." }], industrie: [{ name: "Premium AEROTEC Werk", desc: "Flugzeugstrukturkomponenten." }, { name: "Innovationspark", desc: "Technologie- und Gründerzentrum." }], sights: ["Fuggerei", "Rathaus mit Goldenem Saal", "Augsburger Puppenkiste", "Dom"] },
  { slug: "karlsruhe", name: "Karlsruhe", emoji: "\u2696", tagline: "Recht & Technologie", bundesland: "BW", einwohner: "ca. 310.000", flaeche: "173,5 km\u00B2", hoehe: "115 m", autobahnen: "A5, A8, A65", bahnhof: "Karlsruhe Hbf", heroDesc: "Sitz des Bundesverfassungsgerichts und bedeutender IT- und Forschungsstandort am Oberrhein.", branchen: "IT, Forschung, Energie, Recht", unternehmen: "1&1, dm-drogerie markt, EnBW, SEW-Eurodrive", messen: ["art KARLSRUHE", "LEARNTEC", "REHAB"], stadtteile: [{ name: "Südstadt", desc: "Beliebtes Gründerzeit-Viertel." }, { name: "Durlach", desc: "Historische Altstadt im Osten." }, { name: "Weststadt", desc: "Junges, urbanes Quartier." }, { name: "Mühlburg", desc: "Zentrumsnaher Stadtteil." }], industrie: [{ name: "Technologiepark KIT", desc: "Forschung am KIT Campus." }, { name: "Rheinhafen", desc: "Zweitgrößter Binnenhafen in BW." }], sights: ["Schloss Karlsruhe", "ZKM", "Bundesverfassungsgericht", "Botanischer Garten"] },
  { slug: "mainz", name: "Mainz", emoji: "\uD83C\uDFAD", tagline: "Medien & Pharma", bundesland: "Rheinland-Pfalz (LH)", einwohner: "ca. 220.000", flaeche: "97,7 km\u00B2", hoehe: "89 m", autobahnen: "A60, A63, A643", bahnhof: "Mainz Hbf", heroDesc: "Landeshauptstadt, ZDF-Stadt und Sitz von BioNTech — Medien- und Pharmastandort am Rhein.", branchen: "Pharma, Medien, Chemie, Weinbau", unternehmen: "BioNTech, ZDF, Schott, Werner & Mertz", messen: ["Mainzer Minipressen-Messe"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Neustadt", desc: "Lebendiges Gründerzeitviertel." }, { name: "Gonsenheim", desc: "Grüner Wohnstadtteil." }, { name: "Bretzenheim", desc: "Familienfreundlich im Westen." }], industrie: [{ name: "BioNTech Campus", desc: "Weltweit bekannter Impfstoffentwickler." }, { name: "Schott AG Werk", desc: "Spezialglas-Produktion." }], sights: ["Mainzer Dom", "Gutenberg-Museum", "Zitadelle", "Rheinufer"] },
  { slug: "kiel", name: "Kiel", emoji: "\u2693", tagline: "Werft & Ostsee", bundesland: "Schleswig-Holstein (LH)", einwohner: "ca. 250.000", flaeche: "118,7 km\u00B2", hoehe: "5 m", autobahnen: "A210, A215", bahnhof: "Kiel Hbf", heroDesc: "Landeshauptstadt an der Ostsee mit Marinebasis, Werften und starker maritimer Wirtschaft.", branchen: "Schiffbau, Marine, Meeresforschung, Medizintechnik", unternehmen: "thyssenkrupp Marine Systems, GEOMAR, Vossloh", messen: ["Kieler Woche"], stadtteile: [{ name: "Altstadt", desc: "Stadtzentrum an der Förde." }, { name: "Gaarden", desc: "Multikulturelles Ostufer." }, { name: "Schilksee", desc: "Olympiastandort am Meer." }, { name: "Holtenau", desc: "Am Nord-Ostsee-Kanal." }], industrie: [{ name: "thyssenkrupp Werft", desc: "U-Boot- und Marineschiffbau." }, { name: "Ostuferhafen", desc: "Fährverkehr nach Skandinavien." }], sights: ["Kieler Förde", "Laboe Marine-Ehrenmal", "Nord-Ostsee-Kanal", "Holstenstraße"] },
  { slug: "rostock", name: "Rostock", emoji: "\u2693", tagline: "Hafen & Tourismus", bundesland: "Mecklenburg-Vorpommern", einwohner: "ca. 210.000", flaeche: "181,3 km\u00B2", hoehe: "13 m", autobahnen: "A19, A20", bahnhof: "Rostock Hbf", heroDesc: "Größte Stadt Mecklenburg-Vorpommerns mit bedeutendem Ostseehafen und Kreuzfahrtschiffsterminal.", branchen: "Schiffbau, Tourismus, Logistik, Windenergie", unternehmen: "Aida Cruises, Nordex, Liebherr, Caterpillar", messen: ["Hanse Sail", "Rostocker Jobmesse"], stadtteile: [{ name: "Warnemünde", desc: "Beliebtes Ostseebad an der Warnow-Mündung." }, { name: "KTV", desc: "Studentisches Szeneviertel." }, { name: "Stadtmitte", desc: "Historische Innenstadt." }, { name: "Dierkow", desc: "Wohngebiet im Osten." }], industrie: [{ name: "Rostocker Hafen", desc: "Größter deutscher Ostseehafen." }, { name: "Neptun Werft", desc: "Traditioneller Schiffbaustandort." }], sights: ["Warnemünde Strand", "Marienkirche", "Stadthafen", "Zoo Rostock"] },
  { slug: "freiburg", name: "Freiburg", emoji: "\u2600", tagline: "Green City & Uni-Stadt", bundesland: "BW", einwohner: "ca. 230.000", flaeche: "153,1 km\u00B2", hoehe: "278 m", autobahnen: "A5", bahnhof: "Freiburg (Breisgau) Hbf", heroDesc: "Sonnenreichste Großstadt Deutschlands und Vorreiter in Sachen Nachhaltigkeit und Solarenergie.", branchen: "Erneuerbare Energien, Medizintechnik, Tourismus, Forschung", unternehmen: "Testo, Sick AG, Haufe Group, Cerdia", messen: ["GETEC", "Intersolar Kongress"], stadtteile: [{ name: "Altstadt", desc: "Mittelalterliches Zentrum mit Bächle." }, { name: "Vauban", desc: "Ökologisches Modellviertel." }, { name: "Wiehre", desc: "Beliebtes Gründerzeitviertel." }, { name: "Herdern", desc: "Gehoben am Schlossbergrand." }], industrie: [{ name: "Solar Info Center", desc: "Kompetenzzentrum Solarenergie." }, { name: "Gewerbegebiet Haid", desc: "Größtes Gewerbegebiet der Stadt." }], sights: ["Freiburger Münster", "Schlossberg", "Bächle", "Augustinermuseum"] },
  { slug: "kassel", name: "Kassel", emoji: "\uD83C\uDFA8", tagline: "documenta & Verkehr", bundesland: "Hessen", einwohner: "ca. 200.000", flaeche: "106,8 km\u00B2", hoehe: "166 m", autobahnen: "A7, A44, A49", bahnhof: "Kassel-Wilhelmshöhe", heroDesc: "Documenta-Stadt und zentraler Verkehrsknotenpunkt in der Mitte Deutschlands.", branchen: "Fahrzeugbau, Logistik, Erneuerbare Energien, Kultur", unternehmen: "VW Werk Kassel, Bombardier, SMA Solar, Krauss-Maffei Wegmann", messen: ["documenta", "DEKOMETA"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum mit Königsplatz." }, { name: "Vorderer Westen", desc: "Beliebtes Wohnviertel." }, { name: "Bad Wilhelmshöhe", desc: "Villen am Bergpark." }, { name: "Unterneustadt", desc: "Saniertes Quartier an der Fulda." }], industrie: [{ name: "VW Werk Kassel", desc: "Getriebe- und Komponentenwerk." }, { name: "SMA Solar Zentrale", desc: "Weltweit führender Wechselrichter-Hersteller." }], sights: ["Bergpark Wilhelmshöhe", "Herkules", "documenta-Halle", "Orangerie"] },
  { slug: "luebeck", name: "Lübeck", emoji: "\uD83C\uDFDB", tagline: "Hanse & Marzipan", bundesland: "Schleswig-Holstein", einwohner: "ca. 220.000", flaeche: "214,2 km\u00B2", hoehe: "13 m", autobahnen: "A1, A20, A226", bahnhof: "Lübeck Hbf", heroDesc: "Ehemaliges Haupt der Hanse und UNESCO-Welterbestadt mit Medizintechnik und Lebensmittelindustrie.", branchen: "Lebensmittel, Medizintechnik, Tourismus, Logistik", unternehmen: "Niederegger, Draeger, Bahlsen, Possehl", messen: ["Nordische Filmtage", "HanseKulturFestival"], stadtteile: [{ name: "Altstadt", desc: "UNESCO-Welterbe auf einer Insel." }, { name: "St. Jürgen", desc: "Grüner Stadtteil im Süden." }, { name: "Travemünde", desc: "Ostseebad an der Trave-Mündung." }, { name: "Moisling", desc: "Wohngebiet im Südwesten." }], industrie: [{ name: "Draegerwerk", desc: "Medizin- und Sicherheitstechnik." }, { name: "Hafen Lübeck", desc: "Bedeutender Ostsee-Fährhafen." }], sights: ["Holstentor", "Marienkirche", "Buddenbrookhaus", "Travemünde Strand"] },
  { slug: "erfurt", name: "Erfurt", emoji: "\uD83C\uDF3B", tagline: "Blumenstadt & Logistik", bundesland: "Thüringen (LH)", einwohner: "ca. 215.000", flaeche: "269,9 km\u00B2", hoehe: "195 m", autobahnen: "A4, A71", bahnhof: "Erfurt Hbf", heroDesc: "Landeshauptstadt Thüringens und wichtiger Logistik-Knotenpunkt in der Mitte Deutschlands.", branchen: "Logistik, Gartenbau, Mikroelektronik, Medien", unternehmen: "Zalando (Logistik), Bosch, N3 Engine Overhaul", messen: ["egapark Blumenausstellungen", "Erfurter Herbstlese"], stadtteile: [{ name: "Altstadt", desc: "Besterhaltene mittelalterliche Altstadt." }, { name: "Brühlervorstadt", desc: "Beliebtes grünes Wohnviertel." }, { name: "Ilversgehofen", desc: "Aufstrebender Norden." }, { name: "Hochheim", desc: "Ruhiger Vorort." }], industrie: [{ name: "GVZ Erfurt", desc: "Güterverkehrszentrum an A4 und A71." }, { name: "Erfurter Kreuz", desc: "Größtes Industriegebiet Thüringens." }], sights: ["Krämerbrücke", "Erfurter Dom", "Zitadelle Petersberg", "egapark"] },
  { slug: "magdeburg", name: "Magdeburg", emoji: "\u2699", tagline: "Otto-Stadt & Maschinenbau", bundesland: "Sachsen-Anhalt (LH)", einwohner: "ca. 240.000", flaeche: "201,0 km\u00B2", hoehe: "56 m", autobahnen: "A2, A14", bahnhof: "Magdeburg Hbf", heroDesc: "Landeshauptstadt Sachsen-Anhalts mit Tradition im Maschinenbau und wachsender Halbleiterindustrie.", branchen: "Maschinenbau, Halbleiter, Logistik, Gesundheit", unternehmen: "FAUN, IFA Group, Regiocom, Intel (geplant)", messen: ["SWM TalentTage", "Magdeburger Kulturnacht"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Dom." }, { name: "Buckau", desc: "Kreatives Industrieviertel." }, { name: "Stadtfeld", desc: "Gründerzeitviertel mit Villen." }, { name: "Cracau", desc: "Grüner Stadtteil an der Elbe." }], industrie: [{ name: "Industriehafen", desc: "Logistikzentrum an der Elbe." }, { name: "Intel-Chipfabrik (geplant)", desc: "Milliarden-Investition im Bau." }], sights: ["Magdeburger Dom", "Grüne Zitadelle", "Elbauenpark", "Jahrtausendturm"] },
  { slug: "braunschweig", name: "Braunschweig", emoji: "\uD83E\uDD81", tagline: "Forschung & Automobil", bundesland: "Niedersachsen", einwohner: "ca. 250.000", flaeche: "192,1 km\u00B2", hoehe: "75 m", autobahnen: "A2, A39, A391", bahnhof: "Braunschweig Hbf", heroDesc: "Forschungsstadt mit höchster Dichte an Forschungseinrichtungen in Europa und VW-Standort.", branchen: "Automobil, Forschung, Biotechnologie, IT", unternehmen: "VW Financial Services, Siemens Mobility, New Yorker", messen: ["Überregionales Forschungsforum"], stadtteile: [{ name: "Innenstadt", desc: "Rund um den Burgplatz." }, { name: "Östliches Ringgebiet", desc: "Beliebtes Wohnviertel." }, { name: "Riddagshausen", desc: "Naturnah mit Klosterkirche." }, { name: "Lehndorf", desc: "Familienfreundlicher Stadtteil." }], industrie: [{ name: "VW Financial Services", desc: "Europazentrale der Finanzsparte." }, { name: "Forschungsflughafen", desc: "DLR und TU Braunschweig." }], sights: ["Burgplatz mit Löwe", "Dom St. Blasii", "Happy Rizzi House", "Naturhistorisches Museum"] },
  { slug: "chemnitz", name: "Chemnitz", emoji: "\u2699", tagline: "Kulturhauptstadt 2025 & Industrie", bundesland: "Sachsen", einwohner: "ca. 250.000", flaeche: "221,0 km\u00B2", hoehe: "296 m", autobahnen: "A4, A72", bahnhof: "Chemnitz Hbf", heroDesc: "Europäische Kulturhauptstadt 2025 mit starker Automobil- und Maschinenbautradition.", branchen: "Automobil, Maschinenbau, IT, Textil", unternehmen: "VW Motorenwerk, Niles-Simmons, Starrag", messen: ["Chemnitzer Modellbahn-Ausstellung", "SACHSENarena Events"], stadtteile: [{ name: "Zentrum", desc: "Modernes Stadtzentrum." }, { name: "Kasberg", desc: "Größtes Gründerzeitviertel Sachsens." }, { name: "Schlosschemnitz", desc: "Nahe am Schloss." }, { name: "Sonnenberg", desc: "Aufstrebendes Wohnviertel." }], industrie: [{ name: "VW Motorenwerk", desc: "Motorenproduktion für den Konzern." }, { name: "Industriemuseum", desc: "Historischer Maschinenpark." }], sights: ["Karl-Marx-Monument", "Schloss Chemnitz", "Kasberg-Viertel", "Industriemuseum"] },
  { slug: "aachen", name: "Aachen", emoji: "\u2696", tagline: "RWTH & Karlspreis", bundesland: "NRW", einwohner: "ca. 250.000", flaeche: "160,8 km\u00B2", hoehe: "173 m", autobahnen: "A4, A44, A544", bahnhof: "Aachen Hbf", heroDesc: "Universitätsstadt mit der renommierten RWTH Aachen und Sitz des Karlspreises im Dreiländereck.", branchen: "IT, Maschinenbau, Forschung, Automotive", unternehmen: "e.GO, FEV Group, Aixtron, Gruen Software", messen: ["CHIO Aachen (Reitsport)", "Karlspreisverleihung"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum um den Dom." }, { name: "Burtscheid", desc: "Thermalquellen-Viertel." }, { name: "Frankenberger Viertel", desc: "Beliebtes Studentenviertel." }, { name: "Brand", desc: "Wohngebiet im Südosten." }], industrie: [{ name: "RWTH Campus Melaten", desc: "Technologie- und Forschungscampus." }, { name: "Gewerbegebiet Avantis", desc: "Grenzüberschreitender Gewerbepark." }], sights: ["Aachener Dom", "Rathaus", "Elisenbrunnen", "Ponttor"] },
  { slug: "halle", name: "Halle", emoji: "\uD83C\uDFB5", tagline: "Händel-Stadt & Chemie", bundesland: "Sachsen-Anhalt", einwohner: "ca. 240.000", flaeche: "135,0 km\u00B2", hoehe: "87 m", autobahnen: "A9, A14, A143", bahnhof: "Halle (Saale) Hbf", heroDesc: "Geburtsstadt Händels und bedeutender Chemiestandort im mitteldeutschen Chemiedreieck.", branchen: "Chemie, Pharma, Medien, Forschung", unternehmen: "Total Energies (Raffinerie Leuna), IDT Biologika, Halloren", messen: ["Händel-Festspiele", "Laternenfest"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Marktkirche." }, { name: "Paulusviertel", desc: "Gründerzeitviertel mit Villen." }, { name: "Giebichenstein", desc: "Kunsthochschul-Viertel an der Saale." }, { name: "Kröllwitz", desc: "Grün an der Saale." }], industrie: [{ name: "Chemiepark Leuna", desc: "Einer der größten Chemieparks Europas." }, { name: "Star Park Halle", desc: "Moderner Gewerbepark." }], sights: ["Marktplatz mit Händel-Denkmal", "Burg Giebichenstein", "Franckesche Stiftungen", "Landesmuseum für Vorgeschichte"] },
  { slug: "krefeld", name: "Krefeld", emoji: "\uD83E\uDDF5", tagline: "Samt- und Seidenstadt", bundesland: "NRW", einwohner: "ca. 230.000", flaeche: "137,8 km\u00B2", hoehe: "39 m", autobahnen: "A44, A57", bahnhof: "Krefeld Hbf", heroDesc: "Traditionsreiche Textilstadt am Niederrhein mit wachsender Chemieindustrie.", branchen: "Chemie, Textil, Maschinenbau, Stahl", unternehmen: "Covestro, Siemens (Schienenfahrzeuge), Fressnapf (HQ)", messen: ["Krefelder Textiltage"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum mit Einkaufsmeile." }, { name: "Uerdingen", desc: "Chemiestandort am Rhein." }, { name: "Bockum", desc: "Beliebtes Wohnviertel." }, { name: "Fischeln", desc: "Grüner Süden." }], industrie: [{ name: "Chempark Uerdingen", desc: "Großer Chemiestandort am Rhein." }, { name: "Siemens Werk", desc: "Schienenfahrzeugproduktion." }], sights: ["Kaiser-Wilhelm-Museum", "Burg Linn", "Krefelder Zoo", "Stadtwald"] },
  { slug: "oberhausen", name: "Oberhausen", emoji: "\uD83D\uDED2", tagline: "Centro & Neue Mitte", bundesland: "NRW", einwohner: "ca. 210.000", flaeche: "77,1 km\u00B2", hoehe: "42 m", autobahnen: "A2, A3, A42, A516", bahnhof: "Oberhausen Hbf", heroDesc: "Ehemalige Stahlstadt im Ruhrgebiet, heute bekannt für das Centro und den Strukturwandel.", branchen: "Handel, Logistik, Chemie, Dienstleistungen", unternehmen: "Oxea, MAN Turbo, Centro (Westfield)", messen: ["Oberhausener Kurzfilmtage"], stadtteile: [{ name: "Neue Mitte", desc: "Rund um das Centro." }, { name: "Sterkrade", desc: "Eigener Stadtteilcharakter." }, { name: "Osterfeld", desc: "Im Norden der Stadt." }, { name: "Alt-Oberhausen", desc: "Historischer Kern." }], industrie: [{ name: "Oxea Werk", desc: "Chemische Produktion." }, { name: "Gewerbegebiet Centro", desc: "Größtes Einkaufszentrum Europas." }], sights: ["Gasometer Oberhausen", "Centro", "Sea Life", "LVR-Industriemuseum"] },
  { slug: "gelsenkirchen", name: "Gelsenkirchen", emoji: "\u26BD", tagline: "Schalke & Solarstadt", bundesland: "NRW", einwohner: "ca. 260.000", flaeche: "104,9 km\u00B2", hoehe: "60 m", autobahnen: "A2, A40, A42, A52", bahnhof: "Gelsenkirchen Hbf", heroDesc: "Vom Bergbau zur Solarindustrie — Gelsenkirchen setzt auf Strukturwandel und erneuerbare Energien.", branchen: "Solarenergie, Chemie, Glas, Logistik", unternehmen: "BP (Raffinerie), Vivawest, Gelsenwasser", messen: ["Emscher-Lippe-Wirtschaftskonferenz"], stadtteile: [{ name: "Buer", desc: "Zweites Zentrum im Norden." }, { name: "Altstadt", desc: "Stadtzentrum im Umbau." }, { name: "Horst", desc: "Am Nordsternpark." }, { name: "Erle", desc: "Wohngebiet im Nordosten." }], industrie: [{ name: "BP Raffinerie", desc: "Große Erdölraffinerie." }, { name: "Wissenschaftspark", desc: "Technologie- und Gründerzentrum." }], sights: ["Veltins-Arena", "Nordsternpark", "Zoom Erlebniswelt", "Wissenschaftspark"] },
  { slug: "moenchengladbach", name: "Mönchengladbach", emoji: "\u26BD", tagline: "Textil & Logistik", bundesland: "NRW", einwohner: "ca. 260.000", flaeche: "170,5 km\u00B2", hoehe: "70 m", autobahnen: "A44, A46, A52, A61", bahnhof: "Mönchengladbach Hbf", heroDesc: "Traditionsreiche Textilstadt am Niederrhein, heute wichtiger Logistik- und Handelsstandort.", branchen: "Textil, Logistik, Maschinenbau, IT", unternehmen: "SMS Group, Scheidt & Bachmann, Santander Consumer Bank", messen: ["Gladbacher Textiltage"], stadtteile: [{ name: "Altstadt", desc: "Rund um den Alten Markt." }, { name: "Eicken", desc: "Kreatives Viertel." }, { name: "Rheydt", desc: "Zweites Stadtzentrum." }, { name: "Wickrath", desc: "Historisch mit Schloss." }], industrie: [{ name: "Nordpark", desc: "Moderner Gewerbe- und Büropark." }, { name: "Regiopark", desc: "Logistikzentrum an der A61." }], sights: ["Abteiberg Museum", "Schloss Rheydt", "Borussia-Park", "Bunter Garten"] },
  { slug: "wolfsburg", name: "Wolfsburg", emoji: "\uD83D\uDE97", tagline: "VW-Stadt", bundesland: "Niedersachsen", einwohner: "ca. 125.000", flaeche: "204,0 km\u00B2", hoehe: "63 m", autobahnen: "A2, A39", bahnhof: "Wolfsburg Hbf", heroDesc: "Volkswagen-Stadt und eine der wirtschaftsstärksten Städte Deutschlands pro Kopf.", branchen: "Automobil, IT, Zulieferer, Logistik", unternehmen: "Volkswagen AG, AutoVision, Wolfsburg AG", messen: ["IdeenExpo (regional)"], stadtteile: [{ name: "Stadtmitte", desc: "Modernes Zentrum rund um die Autostadt." }, { name: "Fallersleben", desc: "Historischer Stadtkern." }, { name: "Vorsfelde", desc: "Eigenständiger Charakter." }, { name: "Detmerode", desc: "Großes Wohngebiet." }], industrie: [{ name: "VW Stammwerk", desc: "Eines der größten Automobilwerke der Welt." }, { name: "InnovationsCampus", desc: "Zukunftstechnologien rund um Mobilität." }], sights: ["Autostadt", "Phaeno", "Allerpark", "Schloss Wolfsburg"] },
  { slug: "heidelberg", name: "Heidelberg", emoji: "\uD83C\uDFDB", tagline: "Uni-Stadt & Forschung", bundesland: "BW", einwohner: "ca. 160.000", flaeche: "108,8 km\u00B2", hoehe: "114 m", autobahnen: "A5, A656", bahnhof: "Heidelberg Hbf", heroDesc: "Älteste Universitätsstadt Deutschlands mit Weltruf in Forschung und Romantik am Neckar.", branchen: "Forschung, Pharma, IT, Tourismus", unternehmen: "Heidelberg Materials, SAS Institute, Springer Nature", messen: ["Heidelberger Frühling", "Heidelberger Literaturtage"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum unter dem Schloss." }, { name: "Neuenheim", desc: "Universitätsviertel am Neckar." }, { name: "Handschuhsheim", desc: "Ältester Stadtteil." }, { name: "Bergheim", desc: "Zentral mit Bahnhofsnähe." }], industrie: [{ name: "Heidelberg Materials HQ", desc: "Weltweit größter Baustoffkonzern." }, { name: "Technology Park", desc: "Biotech- und IT-Unternehmen." }], sights: ["Heidelberger Schloss", "Alte Brücke", "Philosophenweg", "Heiliggeistkirche"] },
  { slug: "darmstadt", name: "Darmstadt", emoji: "\uD83D\uDE80", tagline: "Wissenschaftsstadt", bundesland: "Hessen", einwohner: "ca. 160.000", flaeche: "122,2 km\u00B2", hoehe: "144 m", autobahnen: "A5, A67, A672", bahnhof: "Darmstadt Hbf", heroDesc: "Wissenschaftsstadt mit ESA-Kontrollzentrum, GSI und starker IT- und Chemiebranche.", branchen: "Raumfahrt, IT, Chemie, Pharma", unternehmen: "Merck, ESA/ESOC, Software AG, Schenck Process", messen: ["Heinerfest", "Darmstädter Residenzfestspiele"], stadtteile: [{ name: "Mitte", desc: "Stadtzentrum am Luisenplatz." }, { name: "Bessungen", desc: "Beliebtes Altbauviertel." }, { name: "Martinsviertel", desc: "Lebendiges Studentenviertel." }, { name: "Kranichstein", desc: "Ökologische Mustersiedlung." }], industrie: [{ name: "Merck Zentrale", desc: "Ältestes Pharma- und Chemieunternehmen der Welt." }, { name: "ESA/ESOC", desc: "Europäisches Satellitenkontrollzentrum." }], sights: ["Mathildenhöhe", "Hessisches Landesmuseum", "Waldspirale", "Schloss Darmstadt"] },
  { slug: "regensburg", name: "Regensburg", emoji: "\uD83C\uDFDB", tagline: "Welterbe & BMW", bundesland: "Bayern", einwohner: "ca. 155.000", flaeche: "80,8 km\u00B2", hoehe: "343 m", autobahnen: "A3, A93", bahnhof: "Regensburg Hbf", heroDesc: "UNESCO-Welterbestadt mit mittelalterlicher Altstadt und modernem BMW-Werk.", branchen: "Automobil, Elektrotechnik, IT, Tourismus", unternehmen: "BMW, Continental, Infineon, Krones", messen: ["Regensburger Dult", "IT-Sicherheitskongress"], stadtteile: [{ name: "Altstadt", desc: "UNESCO-Welterbe am Donaustrand." }, { name: "Stadtamhof", desc: "Historisches Viertel nördlich der Donau." }, { name: "Kumpfmühl", desc: "Beliebtes Wohnviertel." }, { name: "Reinhausen", desc: "Am Regen-Fluss." }], industrie: [{ name: "BMW Werk Regensburg", desc: "Über 9.000 Mitarbeiter." }, { name: "Conti Standort", desc: "Automotive-Elektronik." }], sights: ["Steinerne Brücke", "Regensburger Dom", "Walhalla", "Thurn und Taxis Schloss"] },
  { slug: "potsdam", name: "Potsdam", emoji: "\uD83C\uDFF0", tagline: "Schlösser & Film", bundesland: "Brandenburg (LH)", einwohner: "ca. 185.000", flaeche: "188,6 km\u00B2", hoehe: "32 m", autobahnen: "A10, A115", bahnhof: "Potsdam Hbf", heroDesc: "UNESCO-Welterbestadt mit Schlössern und Gärten, Filmstandort Babelsberg und wachsende Wissenschaftsstadt.", branchen: "Film & Medien, Forschung, IT, Tourismus", unternehmen: "Studio Babelsberg, SAP Innovation Center, Hasso-Plattner-Institut", messen: ["Potsdamer Schlössernacht", "Filmfestival"], stadtteile: [{ name: "Innenstadt", desc: "Barockes Zentrum." }, { name: "Babelsberg", desc: "Filmstadtteil mit Park." }, { name: "Potsdam West", desc: "Villen und Gärten." }, { name: "Drewitz", desc: "Modernisiertes Wohngebiet." }], industrie: [{ name: "Medienstadt Babelsberg", desc: "Ältestes Großfilmstudio der Welt." }, { name: "Wissenschaftspark Golm", desc: "Max-Planck- und Fraunhofer-Institute." }], sights: ["Schloss Sanssouci", "Park Sanssouci", "Holländisches Viertel", "Filmpark Babelsberg"] },
  { slug: "ulm", name: "Ulm", emoji: "\u26EA", tagline: "Höchster Kirchturm der Welt", bundesland: "BW", einwohner: "ca. 130.000", flaeche: "118,7 km\u00B2", hoehe: "478 m", autobahnen: "A7, A8", bahnhof: "Ulm Hbf", heroDesc: "Universitätsstadt an der Donau mit dem höchsten Kirchturm der Welt und starker Hightech-Industrie.", branchen: "Pharma, Automobil, IT, Forschung", unternehmen: "Daimler Truck, Wieland-Werke, Uzin Utz, Hensoldt", messen: ["Ulmer Zelt", "Schwörmontag"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Münster." }, { name: "Weststadt", desc: "Junges Wohnviertel." }, { name: "Böfingen", desc: "Ruhiger Stadtteil im Norden." }, { name: "Wiblingen", desc: "Bekannt für das Kloster." }], industrie: [{ name: "Donautal", desc: "Industriegebiet entlang der Donau." }, { name: "Science Park", desc: "Technologie- und Gründerzentrum." }], sights: ["Ulmer Münster", "Fischerviertel", "Stadtmauer an der Donau", "Museum der Brotkultur"] },
  { slug: "wuerzburg", name: "Würzburg", emoji: "\uD83C\uDF47", tagline: "Wein & Residenz", bundesland: "Bayern", einwohner: "ca. 130.000", flaeche: "87,6 km\u00B2", hoehe: "177 m", autobahnen: "A3, A7, A81", bahnhof: "Würzburg Hbf", heroDesc: "Frankens Weinhauptstadt mit UNESCO-Welterbe Residenz und starker Medizintechnikbranche.", branchen: "Medizintechnik, Wein, Tourismus, Druck", unternehmen: "König & Bauer, Flyeralarm, va-Q-tec, Brose", messen: ["Mainfranken Messe", "Würzburger Weinfest"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum am Main." }, { name: "Sanderau", desc: "Beliebtes Wohnviertel." }, { name: "Zellerau", desc: "Im Wandel zum kreativen Viertel." }, { name: "Frauenland", desc: "Universitätsnahes Wohngebiet." }], industrie: [{ name: "König & Bauer Werk", desc: "Ältester Druckmaschinenhersteller der Welt." }, { name: "Hubland Campus", desc: "Neues Technologieviertel." }], sights: ["Residenz (UNESCO)", "Festung Marienberg", "Alte Mainbrücke", "Käppele"] },
  { slug: "oldenburg", name: "Oldenburg", emoji: "\uD83C\uDF3F", tagline: "Übermorgenstadt", bundesland: "Niedersachsen", einwohner: "ca. 170.000", flaeche: "103,0 km\u00B2", hoehe: "4 m", autobahnen: "A28, A29, A293", bahnhof: "Oldenburg Hbf", heroDesc: "Universitäts- und Dienstleistungsstadt im Nordwesten mit starker Informatik- und Energiebranche.", branchen: "Energie, IT, Einzelhandel, Forschung", unternehmen: "EWE AG, CEWE, Bito-Lagertechnik, OFFIS", messen: ["Oldenburger Münsterlandschau"], stadtteile: [{ name: "Innenstadt", desc: "Kompaktes Zentrum mit Fußgängerzone." }, { name: "Dobbenviertel", desc: "Beliebtes Altbauviertel." }, { name: "Eversten", desc: "Grünes Wohngebiet." }, { name: "Osternburg", desc: "Im Wandel zum modernen Quartier." }], industrie: [{ name: "EWE Zentrale", desc: "Regionaler Energieversorger." }, { name: "Technologie- und Gründerzentrum", desc: "Startup-Förderung." }], sights: ["Schloss Oldenburg", "Horst-Janssen-Museum", "Schlossgarten", "Botanischer Garten"] },
  { slug: "osnabrueck", name: "Osnabrück", emoji: "\u262E", tagline: "Friedensstadt", bundesland: "Niedersachsen", einwohner: "ca. 165.000", flaeche: "119,8 km\u00B2", hoehe: "64 m", autobahnen: "A1, A30, A33", bahnhof: "Osnabrück Hbf", heroDesc: "Friedensstadt und wichtiger Wirtschaftsstandort zwischen Münster und dem Teutoburger Wald.", branchen: "Metallverarbeitung, Lebensmittel, Logistik, Automotive", unternehmen: "KME, Homann, Hellmann Logistics, Solarlux", messen: ["Maiwoche", "European Media Art Festival"], stadtteile: [{ name: "Altstadt", desc: "Historisches Zentrum mit Rathaus." }, { name: "Westerberg", desc: "Universitätsviertel." }, { name: "Schinkel", desc: "Multikultureller Stadtteil." }, { name: "Haste", desc: "Am Piesberg gelegen." }], industrie: [{ name: "Hafen Osnabrück", desc: "Logistikzentrum am Stichkanal." }, { name: "Gewerbegebiet Fledder", desc: "Größtes Gewerbegebiet der Stadt." }], sights: ["Rathaus des Westfälischen Friedens", "Dom St. Peter", "Felix-Nussbaum-Haus", "Botanischer Garten"] },
  { slug: "heilbronn", name: "Heilbronn", emoji: "\uD83C\uDF47", tagline: "Käthchenstadt & KI-Campus", bundesland: "BW", einwohner: "ca. 130.000", flaeche: "99,9 km\u00B2", hoehe: "157 m", autobahnen: "A6, A81", bahnhof: "Heilbronn Hbf", heroDesc: "Weinstadt am Neckar mit neuem KI-Campus und starker Industrie in der Region.", branchen: "Lebensmittel, IT/KI, Handel, Automobil", unternehmen: "Schwarz-Gruppe (Lidl/Kaufland), Bechtle, Audi (Standort Neckarsulm)", messen: ["Heilbronner Weindorf", "BUGA-Nachnutzung"], stadtteile: [{ name: "Innenstadt", desc: "Rund um die Kilianskirche." }, { name: "Böckingen", desc: "Größter Stadtteil." }, { name: "Sontheim", desc: "Südlich am Neckar." }, { name: "Neckargartach", desc: "Nördlich der Stadt." }], industrie: [{ name: "Schwarz-Gruppe HQ", desc: "Größter Einzelhändler Europas (Lidl, Kaufland)." }, { name: "Bildungscampus", desc: "KI- und Hochschulstandort." }], sights: ["Experimenta", "Kilianskirche", "Trappenseeschlösschen", "Botanischer Obstgarten"] },
  { slug: "ingolstadt", name: "Ingolstadt", emoji: "\uD83D\uDE97", tagline: "Audi-Stadt", bundesland: "Bayern", einwohner: "ca. 140.000", flaeche: "133,4 km\u00B2", hoehe: "374 m", autobahnen: "A9, A9a", bahnhof: "Ingolstadt Hbf", heroDesc: "Audi-Hauptsitz und eine der wirtschaftsstärksten Städte Bayerns mit hoher Kaufkraft.", branchen: "Automobil, Zulieferer, Raffinerien, IT", unternehmen: "Audi AG, MediaMarktSaturn, AIRBUS Helicopters, Gunvor Raffinerie", messen: ["Audi Sommerkino", "Ingolstädter Wissenschaftstage"], stadtteile: [{ name: "Altstadt", desc: "Historischer Kern an der Donau." }, { name: "Nordost", desc: "Wohngebiet mit Audi-Nähe." }, { name: "Friedrichshofen", desc: "Modernes Wohnviertel." }, { name: "Oberhaunstadt", desc: "Familienfreundlicher Stadtteil." }], industrie: [{ name: "Audi Stammwerk", desc: "Hauptsitz und größtes Werk." }, { name: "Raffinerie Ingolstadt", desc: "Große Erdölraffinerie." }], sights: ["Audi Forum", "Neues Schloss", "Kreuztor", "Liebfrauenmünster"] },
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
    excerpt: "Erfahren Sie, welche Kosten für Monteurzimmer steuerlich absetzbar sind und worauf Unternehmen und Arbeitnehmer achten müssen.",
    category: "Steuern & Recht",
    readTime: "5 Min.",
    date: "2026-02-20",
    content: `<h2>Monteurzimmer als Betriebsausgabe</h2>
<p>Unternehmen, die ihre Mitarbeiter auf Montage oder zu Projekten in andere Städte entsenden, können die Kosten für Monteurzimmer in der Regel als Betriebsausgaben steuerlich geltend machen. Dies gilt sowohl für die reine Unterkunft als auch für damit verbundene Nebenkosten.</p>
<h2>Welche Kosten sind absetzbar?</h2>
<ul>
<li><strong>Übernachtungskosten:</strong> Die tatsächlichen Kosten für das Monteurzimmer sind vollständig als Betriebsausgabe absetzbar.</li>
<li><strong>Verpflegungsmehraufwand:</strong> Für die ersten drei Monate einer Auswärtstätigkeit gelten Pauschalen — 14 Euro bei mehr als 8 Stunden, 28 Euro bei 24 Stunden Abwesenheit.</li>
<li><strong>Fahrtkosten:</strong> An- und Abreise zum Montageort sowie Fahrten zwischen Unterkunft und Einsatzort sind absetzbar.</li>
<li><strong>Nebenkosten:</strong> WLAN, Parkplatzgebühren und Reinigungskosten können ebenfalls geltend gemacht werden.</li>
</ul>
<h2>Doppelte Haushaltsführung</h2>
<p>Bei längeren Einsätzen kann eine doppelte Haushaltsführung vorliegen. In diesem Fall sind die Unterkunftskosten bis zu 1.000 Euro monatlich absetzbar. Voraussetzung ist, dass der Arbeitnehmer am Heimatort einen eigenen Haushalt unterhält.</p>
<h2>Tipps für die Praxis</h2>
<p>Bewahren Sie alle Belege sorgfältig auf. Bei Monteurzimmern über Schlaf-Platz erhalten Sie automatisch eine ordnungsgemäße Rechnung, die alle steuerlich relevanten Angaben enthält. Fragen Sie im Zweifel Ihren Steuerberater — die Investition in professionelle Beratung lohnt sich bei regelmäßigen Montage-Einsätzen.</p>`,
  },
  {
    slug: "monteurzimmer-preise-2026",
    title: "Monteurzimmer Preise 2026 — Was kostet ein Monteurzimmer?",
    excerpt: "Aktuelle Preise für Monteurzimmer in Deutschland: Von günstigen Angeboten ab 15€/Nacht bis zu Premium-Apartments in Großstädten.",
    category: "Preise & Markt",
    readTime: "4 Min.",
    date: "2026-02-15",
    content: `<h2>Aktuelle Preisspanne 2026</h2>
<p>Die Preise für Monteurzimmer in Deutschland variieren je nach Stadt, Lage, Ausstattung und Buchungsdauer erheblich. Im Durchschnitt liegen die Kosten zwischen 15 und 45 Euro pro Nacht und Person.</p>
<h2>Preise nach Städten</h2>
<ul>
<li><strong>Berlin:</strong> 18-35 EUR/Nacht — Große Auswahl, besonders günstig in Randlagen wie Marzahn oder Spandau.</li>
<li><strong>München:</strong> 25-50 EUR/Nacht — Höchstes Preisniveau, hohe Nachfrage durch BMW, Siemens und Messe-Events.</li>
<li><strong>Hamburg:</strong> 20-40 EUR/Nacht — Gute Verfügbarkeit, besonders im Hafenumfeld.</li>
<li><strong>Köln/Düsseldorf:</strong> 18-35 EUR/Nacht — Während großer Messen (gamescom, MEDICA) deutlich teurer.</li>
<li><strong>Stuttgart:</strong> 22-42 EUR/Nacht — Automobilindustrie treibt die Nachfrage.</li>
<li><strong>Leipzig/Dortmund/Essen:</strong> 15-28 EUR/Nacht — Günstigstes Preisniveau unter den Großstädten.</li>
</ul>
<h2>Was beeinflusst den Preis?</h2>
<p>Die wichtigsten Preisfaktoren sind die Buchungsdauer (längere Aufenthalte sind pro Nacht günstiger), die Apartment-Größe, die Nähe zu Industriegebieten und die Jahreszeit. Während großer Messen und Events können Preise um 30-50% steigen.</p>
<h2>Spartipps</h2>
<p>Buchen Sie frühzeitig, wählen Sie Randlagen mit guter ÖPNV-Anbindung, und fragen Sie nach Langzeit-Rabatten. Bei Schlaf-Platz ist die Vermittlung komplett kostenlos — Sie zahlen nur die reine Miete, ohne versteckte Gebühren oder Provisionen.</p>`,
  },
  {
    slug: "monteurzimmer-vermieten-leitfaden",
    title: "Monteurzimmer vermieten — Der komplette Leitfaden",
    excerpt: "Von der Einrichtung bis zur ersten Buchung: Alles, was Vermieter über die Vermietung von Monteurzimmern wissen müssen.",
    category: "Für Vermieter",
    readTime: "7 Min.",
    date: "2026-02-10",
    content: `<h2>Warum Monteurzimmer vermieten?</h2>
<p>Die Vermietung von möblierten Apartments an Monteure und Handwerker ist ein lukratives Geschäftsmodell. Die Nachfrage ist hoch, die Mieten liegen deutlich über dem regulären Wohnungsmarkt, und die Auslastung ist bei professioneller Vermarktung nahezu ganzjährig gewährleistet.</p>
<h2>Voraussetzungen für Ihr Apartment</h2>
<ul>
<li><strong>Voll möbliert:</strong> Bett, Schrank, Tisch, Stühle — alles, was man zum Wohnen braucht.</li>
<li><strong>Küche:</strong> Mindestens eine Kochgelegenheit mit Herd, Kühlschrank und Grundausstattung (Töpfe, Geschirr, Besteck).</li>
<li><strong>Bad:</strong> Eigenes Bad mit Dusche oder Badewanne, Handtücher und Grundhygieneartikel.</li>
<li><strong>WLAN:</strong> Stabiles Internet ist heute Pflicht — Monteure müssen Berichte schreiben und mit der Familie kommunizieren.</li>
<li><strong>Waschmöglichkeit:</strong> Waschmaschine im Apartment oder Zugang zu einer Gemeinschaftswaschmaschine.</li>
</ul>
<h2>Rechtliche Rahmenbedingungen</h2>
<p>Informieren Sie sich über lokale Vorschriften zur Kurzzeitvermietung. In manchen Städten ist eine Genehmigung oder Registrierung erforderlich. Steuerlich gelten Einnahmen aus Monteurzimmer-Vermietung als Einnahmen aus Vermietung und Verpachtung.</p>
<h2>Vermarktung über Schlaf-Platz</h2>
<p>Bei Schlaf-Platz ist das Inserieren Ihres Monteurzimmers dauerhaft und zu 100% kostenlos. Sie profitieren von unserer Reichweite mit über 1.500 verifizierten Partnern, dem einzigartigen Transparenzregister und persönlicher Betreuung durch unser Team.</p>`,
  },
  {
    slug: "monteurzimmer-ausstattung-checkliste",
    title: "Monteurzimmer Ausstattung — Die komplette Checkliste",
    excerpt: "Was gehört in ein gutes Monteurzimmer? Die ultimative Checkliste für Vermieter, die ihre Gäste begeistern wollen.",
    category: "Für Vermieter",
    readTime: "5 Min.",
    date: "2026-02-05",
    content: `<h2>Grundausstattung (Pflicht)</h2>
<ul>
<li><strong>Schlafzimmer:</strong> Bett (mind. 90x200), Matratze, Bettzeug, Kissen, Bettwäsche, Nachttisch, Kleiderschrank</li>
<li><strong>Küche:</strong> Kühlschrank, Herd/Kochplatte, Töpfe, Pfanne, Geschirr, Besteck, Wasserkocher, Grundgewürze</li>
<li><strong>Bad:</strong> Dusche/Badewanne, Toilette, Waschbecken, Spiegel, Handtücher, Toilettenpapier, Seife</li>
<li><strong>Wohnbereich:</strong> Tisch, Stühle, Beleuchtung, Müllbeutel, Staubsauger/Besen</li>
<li><strong>Technik:</strong> WLAN (mind. 16 Mbit/s), Steckdosen, Rauchmelder</li>
</ul>
<h2>Komfort-Extras (empfohlen)</h2>
<ul>
<li><strong>Unterhaltung:</strong> TV, Streaming-Zugang</li>
<li><strong>Komfort:</strong> Waschmaschine, Trockner, Bügeleisen, Föhnen</li>
<li><strong>Küche Plus:</strong> Mikrowelle, Geschirrspüler, Kaffeemaschine, Toaster</li>
<li><strong>Outdoor:</strong> Parkplatz, Fahrradstellplatz, Balkon/Terrasse</li>
<li><strong>Service:</strong> Regelmäßige Reinigung, Bettwäsche-Wechsel, Willkommenspaket</li>
</ul>
<h2>Tipps für 5-Sterne-Bewertungen</h2>
<p>Kleine Aufmerksamkeiten machen den Unterschied: Ein Willkommenspaket mit Kaffee, Tee und Snacks, eine Mappe mit lokalen Informationen (Supermärkte, Restaurants, ÖPNV), und schnelle Reaktionszeit bei Problemen. Monteure schätzen Zuverlässigkeit und Sauberkeit über luxuriöse Ausstattung.</p>`,
  },
  {
    slug: "monteurzimmer-portale-vergleich-2026",
    title: "Monteurzimmer-Portale im Vergleich 2026",
    excerpt: "DMZ, Monteurzimmer.de oder Schlaf-Platz? Wir vergleichen die größten Plattformen für Monteurzimmer in Deutschland.",
    category: "Ratgeber",
    readTime: "6 Min.",
    date: "2026-01-28",
    content: `<h2>Die drei größten Portale</h2>
<p>Der deutsche Markt für Monteurzimmer wird von drei Plattformen dominiert: Deutschland-Monteurzimmer.de (DMZ), Monteurzimmer.de und Schlaf-Platz (monteurzimmerapartments.de). Jede Plattform hat ihre Stärken und Schwächen.</p>
<h2>Deutschland-Monteurzimmer.de (DMZ)</h2>
<ul>
<li><strong>Reichweite:</strong> Marktführer mit über 825.000 Besuchern/Monat</li>
<li><strong>Listings:</strong> 14.000+ Unterkünfte</li>
<li><strong>Kosten für Vermieter:</strong> Kostenpflichtig (bis zu 300 EUR/Jahr)</li>
<li><strong>Schwächen:</strong> Veraltetes Design, kein echtes Buchungssystem, keine App</li>
</ul>
<h2>Monteurzimmer.de</h2>
<ul>
<li><strong>Träger:</strong> FUNKE Mediengruppe (starkes SEO-Backing)</li>
<li><strong>Kosten für Vermieter:</strong> Kostenpflichtig</li>
<li><strong>Schwächen:</strong> Hohe Gebühren, keine native App, reines Listing-Portal</li>
</ul>
<h2>Schlaf-Platz (monteurzimmerapartments.de)</h2>
<ul>
<li><strong>Alleinstellungsmerkmale:</strong> Einziges Transparenzregister, 100% kostenlos für Vermieter, eigene App (iOS & Android), Full-Service statt reines Listing</li>
<li><strong>Bewertungen:</strong> 5.0 Sterne bei 266 Google-Bewertungen</li>
<li><strong>Kosten für Vermieter:</strong> Dauerhaft kostenlos</li>
<li><strong>Schwäche:</strong> Noch geringere Markenbekanntheit als DMZ</li>
</ul>
<h2>Fazit</h2>
<p>Für Vermieter bietet Schlaf-Platz das beste Gesamtpaket: kostenlos, mit persönlicher Betreuung und dem einzigartigen Transparenzregister. Für Mieter bedeutet die Full-Service-Vermittlung weniger Aufwand und mehr Sicherheit als bei reinen Listing-Portalen.</p>`,
  },
  {
    slug: "monteurzimmer-langzeitmiete-vorteile",
    title: "Monteurzimmer Langzeitmiete — Vorteile gegenüber Hotel",
    excerpt: "Warum eine Langzeitmiete im Monteurzimmer für Unternehmen und Monteure günstiger, flexibler und komfortabler ist als ein Hotelaufenthalt.",
    category: "Ratgeber",
    readTime: "5 Min.",
    date: "2026-01-20",
    content: `<h2>Warum Langzeitmiete statt Hotel?</h2>
<p>Wer Mitarbeiter für mehrere Wochen oder Monate auf Montage schickt, steht vor der Frage: Hotel oder Monteurzimmer? Auf den ersten Blick wirkt das Hotel bequem — doch bei längeren Aufenthalten überwiegen die Vorteile einer Langzeitmiete im Monteurzimmer deutlich. Sowohl finanziell als auch in Bezug auf Lebensqualität und Produktivität.</p>
<h2>Kostenvergleich: Monteurzimmer vs. Hotel</h2>
<ul>
<li><strong>Hotelkosten:</strong> In deutschen Großstädten liegen einfache Business-Hotels bei 70-120 EUR pro Nacht. Bei einem 4-Wochen-Aufenthalt summiert sich das auf 2.000-3.400 EUR — ohne Verpflegung.</li>
<li><strong>Monteurzimmer:</strong> Langzeitmieten starten ab 15-30 EUR pro Nacht, bei monatlicher Buchung oft noch günstiger. Vier Wochen kosten somit nur 420-840 EUR inklusive Küche und Nebenkosten.</li>
<li><strong>Ersparnis:</strong> Unternehmen sparen bei Langzeitbuchungen im Monteurzimmer bis zu 70% gegenüber vergleichbaren Hotelkosten.</li>
</ul>
<h2>Mehr Komfort und Eigenständigkeit</h2>
<p>Ein Monteurzimmer bietet deutlich mehr Platz als ein Hotelzimmer. Die eigene Küche ermöglicht es, selbst zu kochen — das spart nicht nur Geld, sondern ist auf Dauer auch gesünder als tägliches Essen im Restaurant. Waschmaschine, separater Wohnbereich und oft ein eigener Parkplatz gehören bei guten Monteurzimmern zum Standard.</p>
<h2>Produktivität und Mitarbeiterzufriedenheit</h2>
<p>Studien zeigen, dass Mitarbeiter auf längeren Montage-Einsätzen in wohnungsähnlichen Unterkünften zufriedener und produktiver sind. Ein eigenes Zuhause auf Zeit reduziert Stress und fördert die Erholung nach anstrengenden Arbeitstagen. Für Arbeitgeber bedeutet das: weniger Krankheitstage und höhere Motivation.</p>
<h2>Vertragliche Flexibilität</h2>
<p>Anders als bei Hotels mit starren Stornierungsbedingungen bieten viele Monteurzimmer-Vermieter flexible Vertragslaufzeiten. Bei Schlaf-Platz können Langzeitmieten individuell angepasst werden — ob 2 Wochen oder 6 Monate. Änderungen der Personenzahl oder Verlängerungen sind unkompliziert möglich.</p>`,
  },
  {
    slug: "monteurzimmer-fuer-teams",
    title: "Gruppenunterkünfte für große Teams — 10 bis 100 Personen",
    excerpt: "So finden Unternehmen die passende Unterkunft für große Montage-Teams: Planung, Auswahl und Tipps für Gruppen ab 10 Personen.",
    category: "Für Unternehmen",
    readTime: "6 Min.",
    date: "2026-01-15",
    content: `<h2>Große Teams, große Herausforderung</h2>
<p>Wenn ein Unternehmen 10, 30 oder sogar 100 Mitarbeiter gleichzeitig an einen Projektstandort entsendet, wird die Unterkunftssuche zur logistischen Herausforderung. Hotels sind in dieser Größenordnung oft nicht verfügbar oder unbezahlbar. Monteurzimmer und Gruppenunterkünfte bieten hier die ideale Lösung.</p>
<h2>Welche Unterkunftstypen eignen sich?</h2>
<ul>
<li><strong>Monteurwohnungen (3-6 Personen):</strong> Ideal für kleine Teams. Jede Einheit hat Küche, Bad und Gemeinschaftsraum. Mehrere Wohnungen im selben Gebäude ermöglichen Teamnähe.</li>
<li><strong>Monteurhäuser (10-30 Personen):</strong> Ganze Häuser mit mehreren Schlafzimmern, Gemeinschaftsküche und Aufenthaltsraum. Perfekt für mittlere Teams auf längeren Projekten.</li>
<li><strong>Containerdörfer und Wohnmodule (30-100+ Personen):</strong> Für Großprojekte wie Kraftwerksbauten oder Infrastrukturprojekte. Professionelle Anbieter liefern komplett ausgestattete Wohnmodule inklusive Versorgung.</li>
<li><strong>Pensionen und Gasthäuser:</strong> In ländlichen Regionen oft die einzige Option für größere Gruppen. Vorteil: Verpflegung inklusive.</li>
</ul>
<h2>Planung und Organisation</h2>
<p>Bei der Unterbringung großer Teams kommt es auf frühzeitige Planung an. Beginnen Sie mindestens 4-6 Wochen vor Projektstart mit der Suche. Klären Sie vorab: Wie viele Einzelzimmer werden benötigt? Gibt es Schichtarbeit, sodass Betten geteilt werden können? Welche Infrastruktur (Parkplätze, ÖPNV, Einkaufsmöglichkeiten) muss in der Nähe sein?</p>
<h2>Kosten im Griff behalten</h2>
<p>Bei großen Gruppen lohnt es sich, Mengenrabatte zu verhandeln. Viele Vermieter bieten ab 10 Personen Sonderkonditionen. Rechnen Sie mit 12-25 EUR pro Person und Nacht bei Langzeitbuchungen für größere Gruppen. Vergleichen Sie unbedingt die Gesamtkosten inklusive Nebenkosten, Reinigung und Bettwäsche.</p>
<h2>So hilft Schlaf-Platz</h2>
<p>Über Schlaf-Platz können Unternehmen kostenlos Gruppenanfragen stellen. Unser Team übernimmt die komplette Recherche und Koordination — von der Bedarfsanalyse über die Angebotserstellung bis zur Buchungsbestätigung. Mit über 1.500 Partnern in ganz Deutschland finden wir auch für große Teams passende Unterkünfte, oft innerhalb von 15 Minuten.</p>`,
  },
  {
    slug: "monteurzimmer-sicherheit-tipps",
    title: "Sicherheitstipps für Monteurzimmer — Für Mieter und Vermieter",
    excerpt: "Worauf Mieter und Vermieter bei der Buchung und Vermietung von Monteurzimmern achten sollten, um Betrug und Probleme zu vermeiden.",
    category: "Ratgeber",
    readTime: "5 Min.",
    date: "2026-01-10",
    content: `<h2>Sicherheit bei der Buchung</h2>
<p>Der Markt für Monteurzimmer ist groß und leider nicht frei von schwarzen Schafen. Ob Sie ein Zimmer suchen oder eines vermieten — mit den richtigen Vorsichtsmaßnahmen schützen Sie sich vor Betrug, Schäden und unangenehmen Überraschungen.</p>
<h2>Tipps für Mieter</h2>
<ul>
<li><strong>Nur über seriöse Plattformen buchen:</strong> Nutzen Sie bekannte Portale mit Bewertungssystem und Verifizierung. Schlaf-Platz bietet als einzige Plattform ein Transparenzregister, das die Identität aller Vermieter prüft.</li>
<li><strong>Vorauszahlung begrenzen:</strong> Zahlen Sie maximal eine Monatsmiete im Voraus. Seriöse Vermieter verlangen keine hohen Vorauszahlungen oder Kautionen per Überweisung an Privatkonten.</li>
<li><strong>Mietvertrag verlangen:</strong> Bestehen Sie auf einem schriftlichen Mietvertrag, der Mietdauer, Preis, Nebenkosten und Kündigungsfristen klar regelt.</li>
<li><strong>Besichtigung oder aktuelle Fotos:</strong> Wenn möglich, besichtigen Sie die Unterkunft vorab. Alternativ fordern Sie aktuelle Fotos oder einen Video-Rundgang an.</li>
<li><strong>Kontaktdaten prüfen:</strong> Der Vermieter sollte telefonisch erreichbar sein und eine vollständige Adresse angeben.</li>
</ul>
<h2>Tipps für Vermieter</h2>
<ul>
<li><strong>Mieter identifizieren:</strong> Lassen Sie sich einen Personalausweis zeigen und notieren Sie die Daten. Bei Firmenkunden sollte eine offizielle Buchungsbestätigung des Unternehmens vorliegen.</li>
<li><strong>Kaution vereinbaren:</strong> Eine angemessene Kaution (1-2 Wochenmieten) schützt vor Schäden. Dokumentieren Sie den Zustand der Wohnung bei Übergabe mit Fotos.</li>
<li><strong>Hausordnung aufstellen:</strong> Klare Regeln zu Ruhezeiten, Rauchen, Gästen und Müllentsorgung vermeiden Konflikte.</li>
<li><strong>Versicherung prüfen:</strong> Stellen Sie sicher, dass Ihre Haftpflicht- und Gebäudeversicherung die Vermietung an Monteure abdeckt.</li>
</ul>
<h2>Warnsignale erkennen</h2>
<p>Seien Sie misstrauisch bei unrealistisch niedrigen Preisen, fehlenden Kontaktdaten, Druck zur schnellen Zahlung oder Angeboten, die nur per E-Mail kommuniziert werden. Im Zweifel nutzen Sie eine Plattform wie Schlaf-Platz, die alle Vermieter verifiziert und bei Problemen als Ansprechpartner zur Verfügung steht.</p>`,
  },
  {
    slug: "monteurzimmer-kuechentipps-fuer-monteure",
    title: "Schnelle Rezepte und Küchentipps für Monteure",
    excerpt: "Gesund und günstig kochen im Monteurzimmer: Einfache Rezepte und praktische Tipps für den Alltag auf Montage.",
    category: "Lifestyle",
    readTime: "4 Min.",
    date: "2026-01-05",
    content: `<h2>Kochen auf Montage — Warum es sich lohnt</h2>
<p>Wer wochen- oder monatelang auf Montage ist, gibt beim täglichen Essen im Restaurant oder an der Imbissbude schnell 15-25 EUR pro Tag aus. Das sind 300-500 EUR im Monat allein für Verpflegung. Selbst kochen im Monteurzimmer spart nicht nur Geld, sondern ist auch deutlich gesünder und steigert das Wohlbefinden auf längeren Einsätzen.</p>
<h2>Grundausstattung für die Monteursküche</h2>
<ul>
<li><strong>Basics:</strong> Salz, Pfeffer, Öl, Nudeln, Reis, Kartoffeln, Eier, Brot — damit lassen sich dutzende einfache Gerichte zubereiten.</li>
<li><strong>Frischware:</strong> Kaufen Sie 2-3 Mal pro Woche frisches Gemüse, Obst und Fleisch oder Wurst ein. Ein kleiner Wochenplan hilft gegen Lebensmittelverschwendung.</li>
<li><strong>Konserven:</strong> Kidneybohnen, Mais, passierte Tomaten und Thunfisch sind lange haltbar und vielseitig einsetzbar.</li>
</ul>
<h2>5 schnelle Rezepte unter 20 Minuten</h2>
<ul>
<li><strong>Spaghetti Bolognese Express:</strong> Hackfleisch anbraten, passierte Tomaten dazu, würzen, fertig. Während die Nudeln kochen, ist die Sauce bereit.</li>
<li><strong>Bauernfrühstück:</strong> Kartoffeln (vorgekocht oder Restekartoffeln) in der Pfanne braten, Eier und Speck dazu — satt und zufrieden.</li>
<li><strong>Wrap mit allem:</strong> Tortilla-Wraps mit Salat, Käse, Schinken und Sauce belegen. Keine Kochzeit, trotzdem satt.</li>
<li><strong>Reispfanne:</strong> Reis kochen, Gemüse und Hähnchenbrust anbraten, Sojasauce dazu — gesund und füllend.</li>
<li><strong>Ofengemüse:</strong> Paprika, Zucchini, Kartoffeln und Zwiebeln auf ein Blech legen, Öl und Gewürze drüber, 20 Minuten im Ofen.</li>
</ul>
<h2>Meal Prep: Vorkochen am Wochenende</h2>
<p>Nutzen Sie den Sonntag, um größere Portionen vorzukochen. Chili con Carne, Gulasch oder Eintopf lassen sich gut portionieren und halten im Kühlschrank 3-4 Tage. So müssen Sie unter der Woche nach einem langen Arbeitstag nur aufwärmen — und sparen trotzdem Geld und essen gesund.</p>
<h2>Gemeinsam kochen im Team</h2>
<p>Wenn Sie mit Kollegen im selben Monteurzimmer oder Haus wohnen, teilen Sie die Kocharbeit auf. Jeder kocht an einem anderen Abend für die Gruppe — das spart Zeit, macht mehr Spaß und stärkt den Teamzusammenhalt auf Montage.</p>`,
  },
  {
    slug: "monteurzimmer-recht-mietvertrag",
    title: "Rechtliche Grundlagen — Was gehört in den Mietvertrag?",
    excerpt: "Mietvertrag für Monteurzimmer richtig aufsetzen: Die wichtigsten Klauseln, rechtlichen Grundlagen und Fallstricke für Vermieter und Mieter.",
    category: "Steuern & Recht",
    readTime: "7 Min.",
    date: "2025-12-28",
    content: `<h2>Warum ein schriftlicher Mietvertrag wichtig ist</h2>
<p>Auch bei kurzfristiger Vermietung von Monteurzimmern ist ein schriftlicher Mietvertrag dringend empfohlen. Er schützt beide Seiten — Vermieter und Mieter — vor Missverständnissen und bietet im Streitfall eine klare rechtliche Grundlage. Mündliche Vereinbarungen sind zwar grundsätzlich gültig, aber im Ernstfall kaum beweisbar.</p>
<h2>Wesentliche Vertragsbestandteile</h2>
<ul>
<li><strong>Vertragsparteien:</strong> Vollständiger Name und Adresse von Vermieter und Mieter. Bei Firmenbuchungen: Firmenname, Ansprechpartner und Handelsregisternummer.</li>
<li><strong>Mietobjekt:</strong> Genaue Bezeichnung des Zimmers oder der Wohnung, inklusive Adresse, Etage, Zimmergröße und Inventarliste.</li>
<li><strong>Mietdauer:</strong> Beginn und Ende des Mietverhältnisses. Bei unbestimmter Dauer: Kündigungsfristen klar regeln (üblich sind 1-2 Wochen).</li>
<li><strong>Mietpreis:</strong> Höhe der Miete pro Nacht, Woche oder Monat. Angabe, ob Nebenkosten (Strom, Wasser, Heizung, WLAN) inklusive sind oder separat abgerechnet werden.</li>
<li><strong>Kaution:</strong> Höhe der Kaution, Zahlungsart und Bedingungen für die Rückgabe. Üblich sind 1-2 Wochenmieten.</li>
<li><strong>Hausordnung:</strong> Verweis auf eine beiliegende Hausordnung mit Regeln zu Ruhezeiten, Rauchen, Tierhaltung und Gästen.</li>
</ul>
<h2>Besonderheiten bei Monteurzimmern</h2>
<p>Die Vermietung von Monteurzimmern unterscheidet sich rechtlich von normaler Wohnraumvermietung. Bei möblierter Kurzzeitvermietung (unter 6 Monate) gelten gelockerte Kündigungsschutzregeln. Der Mieterschutz des BGB greift bei vorübergehender Unterbringung von Monteuren nur eingeschränkt. Dennoch sollten Vermieter die Zweckbindung (gewerbliche Nutzung) im Vertrag klar festhalten.</p>
<h2>Steuerliche Pflichten</h2>
<p>Einnahmen aus der Vermietung von Monteurzimmern sind steuerpflichtig und müssen in der Einkommensteuererklärung angegeben werden. Bei kurzfristiger Beherbergung (unter 6 Monate) fällt zudem der ermäßigte Umsatzsteuersatz von 7% an, sofern der Vermieter umsatzsteuerpflichtig ist. Zusatzleistungen wie Reinigung oder Bettwäsche werden mit 19% besteuert.</p>
<h2>Häufige Fehler vermeiden</h2>
<ul>
<li><strong>Fehlende Inventarliste:</strong> Ohne dokumentierten Zustand bei Einzug sind Schäden schwer nachzuweisen. Erstellen Sie ein Übergabeprotokoll mit Fotos.</li>
<li><strong>Unklare Nebenkostenregelung:</strong> Pauschale oder nach Verbrauch? Klare Regelung im Vertrag verhindert Streit bei der Abrechnung.</li>
<li><strong>Keine Regelung zur vorzeitigen Kündigung:</strong> Was passiert, wenn das Projekt früher endet? Vereinbaren Sie eine faire Stornierungsregelung für beide Seiten.</li>
<li><strong>Fehlende Meldepflicht:</strong> In Deutschland müssen Gäste, die länger als 3 Tage bleiben, beim Einwohnermeldeamt angemeldet werden. Vermieter sind verpflichtet, eine Wohnungsgeberbescheinigung auszustellen.</li>
</ul>
<h2>Mustervertrag nutzen</h2>
<p>Nutzen Sie einen geprüften Mustervertrag als Basis und passen Sie ihn an Ihre Situation an. Schlaf-Platz stellt seinen Vermietern kostenlos eine Vertragsvorlage zur Verfügung, die alle relevanten Klauseln enthält und regelmäßig von Juristen aktualisiert wird.</p>`,
  },
];

export function getBlogBySlug(slug: string) { return BLOG_ARTICLES.find(a => a.slug === slug); }
export function getAllBlogSlugs() { return BLOG_ARTICLES.map(a => a.slug); }
