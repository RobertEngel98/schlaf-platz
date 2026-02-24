import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Bitte geben Sie eine gueltige E-Mail-Adresse ein." }, { status: 400 });
    }

    // TODO: Connect to Brevo (formerly Sendinblue) API
    // const response = await fetch("https://api.brevo.com/v3/contacts", {
    //   method: "POST",
    //   headers: { "api-key": process.env.BREVO_API_KEY!, "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, listIds: [2], updateEnabled: true }),
    // });

    console.log("[Newsletter] New subscriber:", email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
