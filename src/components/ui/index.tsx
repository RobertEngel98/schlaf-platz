"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

export function AnimNum({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let c = 0; const s = end / 60;
    const t = setInterval(() => { c += s; if (c >= end) { setN(end); clearInterval(t); } else setN(Math.floor(c)); }, 16);
    return () => clearInterval(t);
  }, [go, end]);
  return <span ref={ref}>{n.toLocaleString("de-DE")}{suffix}</span>;
}

export function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#f59e0b">
          <path d="M10 1l2.47 5.01L18 6.89l-4 3.9.94 5.51L10 13.56l-4.94 2.74.94-5.51-4-3.9 5.53-.88L10 1z"/>
        </svg>
      ))}
    </div>
  );
}

export const Arr = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

export const Chk = () => (
  <div className="w-4 h-4 rounded-full bg-sp/15 flex items-center justify-center shrink-0">
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#029fde" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
  </div>
);

export function Faq({ q, a }: { q: string; a: string }) {
  const [o, setO] = useState(false);
  return (
    <div className={`border-b transition-colors ${o ? "border-sp/20" : "border-gray-100"}`}>
      <button onClick={() => setO(!o)} className="w-full py-4 bg-transparent border-none flex items-center justify-between gap-4 cursor-pointer text-left">
        <span className="font-bold text-[15px] text-ink">{q}</span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${o ? "bg-sp text-white rotate-45" : "bg-gray-50 text-gray-400"}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${o ? "max-h-[400px] pb-4" : "max-h-0"}`}>
        <p className="text-sm text-gray-400 leading-relaxed m-0 pr-12">{a}</p>
      </div>
    </div>
  );
}

export function Section({ children, className = "", bg = "white", id }: { children: ReactNode; className?: string; bg?: "white" | "warm" | "cool" | "dark"; id?: string }) {
  const cls = { white: "bg-white", warm: "bg-gray-50/50", cool: "bg-gray-50", dark: "bg-[#0b1220] text-white" };
  return <section id={id} className={`py-14 md:py-20 ${cls[bg]} ${className}`}><div className="wrap">{children}</div></section>;
}

export function Tag({ children, variant = "blue" }: { children: ReactNode; variant?: "blue" | "dark" | "light" }) {
  const cls = {
    blue: "bg-sp/8 text-sp border-sp/15",
    dark: "bg-gray-100 text-gray-500 border-gray-200",
    light: "bg-white/10 text-white/80 border-white/10",
  };
  return <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] border ${cls[variant]}`}>{children}</span>;
}

export function Heading({ tag, title, sub, center = true, dark = false }: { tag?: string; title: string; sub?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={`max-w-[580px] mb-10 ${center ? "mx-auto text-center" : ""}`}>
      {tag && <Tag variant={dark ? "light" : "blue"}>{tag}</Tag>}
      <h2 className={`font-display text-4xl md:text-5xl leading-[0.95] uppercase tracking-wide mt-3 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {sub && <p className={`text-[17px] leading-relaxed mt-3 ${dark ? "text-white/45" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}

export function FadeIn({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
