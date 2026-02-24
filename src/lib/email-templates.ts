/**
 * HTML E-Mail Templates fuer Schlaf-Platz
 * Verwendung: import { anfrageBestaetigungMieter } from "@/lib/email-templates";
 */

interface AnfrageData {
  firma: string;
  ansprechpartner: string;
  stadt: string;
  personen: string;
  zeitraum: string;
}

/** Bestaetigung an den Mieter nach Anfrage */
export function anfrageBestaetigungMieter(data: AnfrageData): string {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f6f8fa;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#029fde 0%,#0178a8 100%);padding:32px 40px;text-align:center;">
    <h1 style="color:#ffffff;font-size:24px;margin:0;font-weight:bold;">Schlaf-Platz</h1>
    <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:8px 0 0;">Ihre Anfrage ist eingegangen</p>
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:32px 40px;">
    <p style="color:#0d1117;font-size:16px;line-height:1.6;margin:0 0 16px;">Guten Tag ${data.ansprechpartner},</p>
    <p style="color:#484f58;font-size:15px;line-height:1.6;margin:0 0 24px;">vielen Dank fuer Ihre Anfrage. Ihr persoenlicher Berater wird sich innerhalb von <strong style="color:#029fde;">15 Minuten</strong> telefonisch bei Ihnen melden.</p>
    <!-- Details Box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;border-radius:12px;margin:0 0 24px;">
    <tr><td style="padding:20px 24px;">
      <p style="color:#8b949e;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;font-weight:bold;margin:0 0 12px;">Ihre Anfrage</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="color:#8b949e;font-size:13px;padding:4px 0;width:120px;">Firma</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:4px 0;">${data.firma}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:4px 0;">Stadt</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:4px 0;">${data.stadt}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:4px 0;">Personen</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:4px 0;">${data.personen}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:4px 0;">Zeitraum</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:4px 0;">${data.zeitraum}</td></tr>
      </table>
    </td></tr>
    </table>
    <p style="color:#484f58;font-size:14px;line-height:1.6;margin:0 0 8px;">Was passiert als naechstes?</p>
    <ol style="color:#484f58;font-size:14px;line-height:1.8;margin:0 0 24px;padding-left:20px;">
      <li>Ihr Berater prueft verfuegbare Apartments in ${data.stadt}</li>
      <li>Sie erhalten einen persoenlichen Rueckruf mit Vorschlaegen</li>
      <li>Sie waehlen das passende Apartment — fertig!</li>
    </ol>
    <p style="color:#484f58;font-size:14px;line-height:1.6;margin:0;">Bei Fragen erreichen Sie uns jederzeit unter <a href="tel:+4916095460613" style="color:#029fde;text-decoration:none;font-weight:bold;">+49 160 95460613</a> oder <a href="mailto:info@schlaf-platz.com" style="color:#029fde;text-decoration:none;">info@schlaf-platz.com</a>.</p>
  </td></tr>
  <!-- Footer -->
  <tr><td style="padding:24px 40px;border-top:1px solid #f0f2f4;text-align:center;">
    <p style="color:#8b949e;font-size:11px;margin:0;">Schlaf-Platz e.G. | Weyertal 109, 50931 Koeln | +49 160 95460613</p>
    <p style="color:#c6cdd5;font-size:10px;margin:8px 0 0;">Diese E-Mail wurde automatisch versendet. Bitte antworten Sie nicht direkt auf diese Nachricht.</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/** Interne Benachrichtigung ans Team */
export function anfrageInternTeam(data: AnfrageData & { email: string; telefon: string; nachricht?: string }): string {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f8fa;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
  <tr><td style="background:#0b1220;padding:24px 40px;">
    <h1 style="color:#ffffff;font-size:20px;margin:0;">Neue Anfrage eingegangen</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;border-radius:12px;">
    <tr><td style="padding:20px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;width:140px;">Firma</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:6px 0;">${data.firma}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">Ansprechpartner</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:6px 0;">${data.ansprechpartner}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">E-Mail</td><td style="padding:6px 0;"><a href="mailto:${data.email}" style="color:#029fde;font-size:13px;font-weight:bold;">${data.email}</a></td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">Telefon</td><td style="padding:6px 0;"><a href="tel:${data.telefon}" style="color:#029fde;font-size:13px;font-weight:bold;">${data.telefon}</a></td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">Stadt</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:6px 0;">${data.stadt}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">Personen</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:6px 0;">${data.personen}</td></tr>
        <tr><td style="color:#8b949e;font-size:13px;padding:6px 0;">Zeitraum</td><td style="color:#0d1117;font-size:13px;font-weight:bold;padding:6px 0;">${data.zeitraum}</td></tr>
        ${data.nachricht ? `<tr><td style="color:#8b949e;font-size:13px;padding:6px 0;vertical-align:top;">Nachricht</td><td style="color:#484f58;font-size:13px;padding:6px 0;">${data.nachricht}</td></tr>` : ""}
      </table>
    </td></tr>
    </table>
    <p style="color:#029fde;font-size:14px;font-weight:bold;margin:20px 0 0;text-align:center;">Bitte innerhalb von 15 Minuten zurueckrufen!</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

/** Newsletter-Willkommens-E-Mail */
export function newsletterWillkommen(email: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f6f8fa;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fa;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
  <tr><td style="background:linear-gradient(135deg,#029fde 0%,#0178a8 100%);padding:32px 40px;text-align:center;">
    <h1 style="color:#ffffff;font-size:24px;margin:0;">Willkommen bei Schlaf-Platz!</h1>
  </td></tr>
  <tr><td style="padding:32px 40px;">
    <p style="color:#0d1117;font-size:16px;line-height:1.6;margin:0 0 16px;">Vielen Dank fuer Ihre Newsletter-Anmeldung!</p>
    <p style="color:#484f58;font-size:15px;line-height:1.6;margin:0 0 24px;">Ab sofort erhalten Sie monatlich:</p>
    <ul style="color:#484f58;font-size:14px;line-height:2;margin:0 0 24px;padding-left:20px;">
      <li>Aktuelle <strong style="color:#0d1117;">Markt-Updates</strong> zu Monteurzimmer-Preisen</li>
      <li>Praktische <strong style="color:#0d1117;">Steuertipps</strong> fuer Unternehmen und Vermieter</li>
      <li>Exklusive <strong style="color:#0d1117;">Branchen-Insights</strong> und Trends</li>
      <li>Neue <strong style="color:#0d1117;">Blog-Artikel</strong> und Ratgeber</li>
    </ul>
    <table cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
    <tr><td style="background:linear-gradient(135deg,#029fde,#0178a8);border-radius:50px;padding:14px 32px;text-align:center;">
      <a href="https://monteurzimmerapartments.de/blog" style="color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">Zum Blog</a>
    </td></tr>
    </table>
    <p style="color:#8b949e;font-size:12px;line-height:1.6;margin:0;">Sie koennen sich jederzeit abmelden. Kein Spam — versprochen.</p>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #f0f2f4;text-align:center;">
    <p style="color:#8b949e;font-size:11px;margin:0;">Schlaf-Platz e.G. | info@schlaf-platz.com</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}
