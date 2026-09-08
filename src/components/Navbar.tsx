import { useEffect, useState } from "react";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from "../lib/data";

export function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href).filter((h) => h !== "#home");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((h) => {
      const el = document.querySelector(h);
      if (el) obs.observe(el);
    });
    const onTop = () => {
      if (window.scrollY < 300) setActive("#home");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // wait for menu close on mobile
    setTimeout(() => scrollTo(href), open ? 120 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-deep shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">
          {/* Brand */}
          <button
            onClick={() => go("#home")}
            className="flex items-center gap-3 text-left"
            aria-label="Thy Favour Hotel — home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.6)] bg-[#0b0b0f] font-bold text-[#e9cf9a] shadow-[0_0_24px_-6px_rgba(211,171,99,0.6)]" style={{ fontFamily: "var(--font-display)" }}>
              TF
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-extrabold tracking-[0.18em] text-[#f6efe0]">
                THY FAVOUR
              </span>
              <span className="block text-[0.6rem] font-semibold tracking-[0.42em] text-[#d3ab63]">
                HOTEL · TAKORADI
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`rounded-full px-2.5 py-2 text-[0.66rem] font-bold uppercase tracking-[0.12em] transition-colors ${
                  active === l.href
                    ? "bg-[rgba(211,171,99,0.16)] text-[#f1ddab]"
                    : "text-[#cfcfda] hover:text-[#f1ddab]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 text-sm font-bold text-[#f1ddab] hover:text-white"
            >
              <Phone size={15} className="text-[#d3ab63]" />
              {PHONE_DISPLAY}
            </a>
            <button onClick={onBook} className="btn-gold px-6 py-2.5 text-[0.72rem]">
              <CalendarCheck size={15} /> BOOK NOW
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.4)] bg-black/40 text-[#f1ddab] xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-[rgba(211,171,99,0.3)] bg-[#0d0d12]/95 backdrop-blur-2xl transition-transform duration-400 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
        >
          <div className="flex items-center justify-between border-b border-[rgba(211,171,99,0.2)] p-5">
            <div>
              <p className="text-sm font-extrabold tracking-[0.2em]">THY FAVOUR</p>
              <p className="text-[0.62rem] font-semibold tracking-[0.4em] text-[#d3ab63]">
                HOTEL · TAKORADI
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.4)] text-[#f1ddab]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="grid gap-1 p-4" aria-label="Mobile">
            {NAV_LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-[0.85rem] font-bold uppercase tracking-[0.14em] text-[#e8e2d2] transition-colors hover:bg-[rgba(211,171,99,0.12)] hover:text-[#f1ddab]"
              >
                <span>{l.label}</span>
                <span className="text-[0.65rem] text-[#9a742e]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-3 border-t border-[rgba(211,171,99,0.2)] p-5">
            <a
              href={PHONE_TEL}
              className="btn-ghost flex w-full items-center justify-center px-5 py-3.5 text-[0.75rem]"
            >
              <Phone size={16} /> CALL {PHONE_DISPLAY}
            </a>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(onBook, 150);
              }}
              className="btn-gold w-full px-5 py-3.5 text-[0.75rem]"
            >
              <CalendarCheck size={16} /> BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
