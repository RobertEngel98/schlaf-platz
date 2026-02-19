"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

// ─── Animated Counter (scroll-triggered) ──────────────────────────────
export function AnimatedNumber({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("de-DE")}
      {suffix}
    </span>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────
export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#E8AA42"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Google Logo SVG ──────────────────────────────────────────────────
export function GoogleLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ─── Arrow Icon ───────────────────────────────────────────────────────
export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// ─── Checkmark Icon ───────────────────────────────────────────────────
export function Check({ size = 20, color = "#2D8A4E" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────
export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl border transition-colors duration-300 overflow-hidden ${
        open ? "border-brand-accent" : "border-brand-surface-alt"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 bg-transparent border-none flex items-center justify-between gap-4 cursor-pointer text-left"
      >
        <span className="font-display font-semibold text-base text-brand-primary">
          {question}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={open ? "#E8AA42" : "#5A5A5A"}
          strokeWidth="2"
          className={`transition-transform duration-300 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ${
          open ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5 text-[15px] text-gray-500 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────
export function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role?: string;
}) {
  return (
    <div className="card p-7 flex flex-col gap-5">
      <Stars />
      <p className="text-gray-900 text-[15px] leading-relaxed flex-1 italic">
        „{quote}"
      </p>
      <div className="border-t border-brand-surface-alt pt-4">
        <p className="font-bold text-brand-primary text-[15px] m-0">
          {author}
        </p>
        {role && (
          <p className="text-gray-500 text-[13px] mt-0.5">{role}</p>
        )}
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────
export function Section({
  children,
  className = "",
  bg = "surface",
  id,
}: {
  children: ReactNode;
  className?: string;
  bg?: "surface" | "white" | "dark";
  id?: string;
}) {
  const bgClasses = {
    surface: "bg-brand-surface",
    white: "bg-white",
    dark: "hero-gradient text-white",
  };

  return (
    <section id={id} className={`py-24 ${bgClasses[bg]} ${className}`}>
      <div className="container-sp">{children}</div>
    </section>
  );
}

// ─── Section Header ───────────────────────────────────────────────────
export function SectionHeader({
  label,
  title,
  centered = true,
}: {
  label: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-[640px] mb-14 ${centered ? "mx-auto text-center" : ""}`}>
      <p className="section-label">{label}</p>
      <h2 className="section-heading">{title}</h2>
    </div>
  );
}
