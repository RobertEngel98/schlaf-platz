"use client";
import { useState } from "react";

export default function FaqClient({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-100 last:border-b-0 transition-colors ${open ? "bg-sp/[0.02]" : ""}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-5 py-4 bg-transparent border-none flex items-center justify-between gap-4 cursor-pointer text-left">
        <span className="font-bold text-[15px] text-ink">{q}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${open ? "bg-sp text-white rotate-45" : "bg-gray-50 text-gray-400"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[400px] pb-4" : "max-h-0"}`}>
        <p className="text-sm text-gray-400 leading-relaxed m-0 px-5 pr-14">{a}</p>
      </div>
    </div>
  );
}
