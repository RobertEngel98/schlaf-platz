"use client";
import { useState } from "react";
import { Arr, Chk } from "@/components/ui";
import { BRAND, CITIES } from "@/lib/constants";

interface Props {
  /** Pre-select city by slug */
  defaultCity?: string;
  /** Compact mode (no sidebar) */
  compact?: boolean;
}

interface FormData {
  firma: string;
  ansprechpartner: string;
  email: string;
  telefon: string;
  stadt: string;
  personen: string;
  zeitraum: string;
  nachricht: string;
}

const INITIAL: FormData = { firma: "", ansprechpartner: "", email: "", telefon: "", stadt: "", personen: "", zeitraum: "", nachricht: "" };

export default function AnfrageForm({ defaultCity, compact }: Props) {
  const [form, setForm] = useState<FormData>({ ...INITIAL, stadt: defaultCity || "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setSent(true);
    } catch {
      setError("Es gab einen Fehler. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-sp/20 rounded-2xl p-8 text-center bg-sp/[0.03]">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #029fde, #0178a8)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 className="font-display text-2xl text-ink uppercase tracking-wide mb-2">Anfrage gesendet!</h3>
        <p className="text-gray-400 text-sm">Wir melden uns innerhalb von 15 Minuten persönlich bei Ihnen.</p>
      </div>
    );
  }

  const formEl = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="border border-red-200 rounded-xl p-4 bg-red-50 text-red-600 text-sm">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Firma *</label>
          <input type="text" required placeholder="Mustermann GmbH" className="input-light" value={form.firma} onChange={set("firma")} />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Ansprechpartner *</label>
          <input type="text" required placeholder="Max Mustermann" className="input-light" value={form.ansprechpartner} onChange={set("ansprechpartner")} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">E-Mail *</label>
          <input type="email" required placeholder="max@firma.de" className="input-light" value={form.email} onChange={set("email")} />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Telefon *</label>
          <input type="tel" required placeholder="+49 170 1234567" className="input-light" value={form.telefon} onChange={set("telefon")} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Stadt *</label>
          <select required className="input-light appearance-none" value={form.stadt} onChange={set("stadt")}>
            <option value="">Stadt wählen</option>
            {CITIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Personen *</label>
          <input type="number" required min="1" placeholder="z.B. 5" className="input-light" value={form.personen} onChange={set("personen")} />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Zeitraum</label>
          <input type="text" placeholder="z.B. 3 Monate" className="input-light" value={form.zeitraum} onChange={set("zeitraum")} />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Nachricht</label>
        <textarea rows={3} placeholder="Weitere Informationen..." className="input-light resize-none" value={form.nachricht} onChange={set("nachricht")} />
      </div>
      <button type="submit" disabled={loading} className="cta-primary w-full sm:w-auto !py-4 !px-10 text-base mt-2 disabled:opacity-50">
        {loading ? "Wird gesendet..." : <>Kostenlos anfragen <Arr s={16} /></>}
      </button>
    </form>
  );

  if (compact) return formEl;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
      <div className="lg:col-span-7">
        <h2 className="font-display text-3xl text-ink uppercase tracking-wide mb-5">Jetzt kostenlos anfragen</h2>
        {formEl}
      </div>
      <div className="lg:col-span-5">
        <div className="border border-gray-100 rounded-2xl bg-white p-6 mb-4">
          <h3 className="font-display text-xl text-ink uppercase tracking-wide mb-4">Ihre Vorteile</h3>
          <div className="space-y-3">
            {["Persönlicher Rückruf in 15 Min.", "Komplett möblierte Apartments", "Keine Buchungsgebühren", "Transparenzregister für Sicherheit", "Flexible Verlängerungen"].map(t => (
              <div key={t} className="flex items-center gap-3"><Chk /><span className="text-sm text-gray-500">{t}</span></div>
            ))}
          </div>
        </div>
        <div className="border border-sp/15 rounded-2xl p-6 bg-sp/[0.03]">
          <p className="text-[10px] uppercase tracking-[0.15em] text-sp font-bold mb-2">Direkter Kontakt</p>
          <p className="text-ink text-xl font-display uppercase tracking-wide mb-1">{BRAND.phonePretty}</p>
          <p className="text-gray-400 text-sm mb-4">Mo–Fr, 08:00–18:00 Uhr</p>
          <a href={`tel:${BRAND.phone}`} className="cta-primary w-full text-center text-sm">Jetzt anrufen <Arr s={14} /></a>
        </div>
      </div>
    </div>
  );
}
