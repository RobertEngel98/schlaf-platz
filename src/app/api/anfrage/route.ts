import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firma, ansprechpartner, email, telefon, stadt, personen, zeitraum, nachricht } = body;

    // Validate required fields
    if (!firma || !ansprechpartner || !email || !telefon || !stadt || !personen) {
      return NextResponse.json({ error: "Pflichtfelder fehlen" }, { status: 400 });
    }

    // Log the inquiry (for development/monitoring)
    console.log("[Anfrage]", JSON.stringify({ firma, ansprechpartner, email, telefon, stadt, personen, zeitraum, nachricht, timestamp: new Date().toISOString() }));

    // TODO: Integrate email service (e.g. Resend, SendGrid, Brevo) to send notification
    // Example with Resend:
    // await resend.emails.send({
    //   from: "anfragen@monteurzimmerapartments.de",
    //   to: "info@schlaf-platz.com",
    //   subject: `Neue Anfrage: ${firma} - ${stadt}`,
    //   html: `<h2>Neue Monteurzimmer-Anfrage</h2>
    //          <p><strong>Firma:</strong> ${firma}</p>
    //          <p><strong>Ansprechpartner:</strong> ${ansprechpartner}</p>
    //          <p><strong>E-Mail:</strong> ${email}</p>
    //          <p><strong>Telefon:</strong> ${telefon}</p>
    //          <p><strong>Stadt:</strong> ${stadt}</p>
    //          <p><strong>Personen:</strong> ${personen}</p>
    //          <p><strong>Zeitraum:</strong> ${zeitraum || "Nicht angegeben"}</p>
    //          <p><strong>Nachricht:</strong> ${nachricht || "Keine"}</p>`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
