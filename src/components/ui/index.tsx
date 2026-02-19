"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

export function AnimatedNumber({ end, suffix = "", dur = 2000 }: { end: number; suffix?: string; dur?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !go) setGo(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [go]);
  useEffect(() => {
    if (!go) return;
    let c = 0; const step = end / (dur / 16);
    const t = setInterval(() => { c += step; if (c >= end) { setCount(end); clearInterval(t); } else setCount(Math.floor(c)); }, 16);
    return () => clearInterval(t);
  }, [go, end, dur]);
  return <span ref={ref}>{count.toLocaleString("de-DE")}{suffix}</span>;
}

export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return <div className="flex gap-[3px]">{[...Array(count)].map((_, i) => (
    <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#029fde"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
  ))}</div>;
}

export function Arrow({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}

export function Check({ size = 20, color = "#2D8A4E" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>;
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white rounded-xl border transition-colors duration-300 overflow-hidden ${open ? "border-sp-blue" : "border-sp-bg-alt"}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-6 py-5 bg-transparent border-none flex items-center justify-between gap-4 cursor-pointer text-left">
        <span className="font-display font-semibold text-base text-sp-blue">{q}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={open ? "#E8AA42" : "#5A5A5A"} strokeWidth="2" className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? "max-h-[300px]" : "max-h-0"}`}>
        <div className="px-6 pb-5 text-[15px] text-gray-500 leading-relaxed">{a}</div>
      </div>
    </div>
  );
}

export function Section({ children, className = "", bg = "surface", id }: { children: ReactNode; className?: string; bg?: "surface" | "white" | "dark"; id?: string }) {
  const cls = { surface: "bg-sp-bg", white: "bg-white", dark: "hero-bg text-white" };
  return <section id={id} className={`py-24 ${cls[bg]} ${className}`}><div className="wrap">{children}</div></section>;
}

export function SectionHeader({ label, title, center = true }: { label: string; title: string; center?: boolean }) {
  return <div className={`max-w-[640px] mb-14 ${center ? "mx-auto text-center" : ""}`}><p className="label-sm">{label}</p><h2 className="heading-lg">{title}</h2></div>;
}
