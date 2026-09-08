import { Phone, MapPin, Navigation, CalendarCheck, ArrowUp, Star } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, ADDRESS_SHORT, ADDRESS_PO_BOX, DIRECTIONS_URL, TRIPADVISOR_URL } from "../lib/data";

export default function Footer({ onBook }: { onBook: () => void }) {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-[rgba(211,171,99,0.25)] bg-[#050508]" aria-label="Footer">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[50rem] max-w-full -translate-x-1/2 rounded-full opacity-15 blur-[100px]"
        style={{ background: "radial-gradient(circle, #d3ab63, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.6)] bg-[#0b0b0f] font-bold text-[#e9cf9a]" style={{ fontFamily: "var(--font-display)" }}>TF</span>
              <span className="leading-tight">
                <span className="block text-base font-extrabold tracking-[0.18em]">THY FAVOUR</span>
                <span className="block text-[0.62rem] font-semibold tracking-[0.42em] text-[#d3ab63]">HOTEL · TAKORADI</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9b9ba8]">
              A comfortable stay in the heart of Anaji, Takoradi — outdoor pool, free breakfast, free Wi-Fi, free
              parking, restaurant & bar.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[#e9cf9a]">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
              <span className="ml-1 font-bold text-white">4.0</span>
              <a href={TRIPADVISOR_URL} target="_blank" rel="noreferrer" className="ml-1 underline-offset-4 hover:underline">TripAdvisor verified</a>
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button onClick={onBook} className="btn-gold px-6 py-3 text-[0.68rem]"><CalendarCheck size={15} /> BOOK NOW</button>
              <a href={PHONE_TEL} className="btn-ghost px-6 py-3 text-[0.68rem]"><Phone size={14} /> {PHONE_DISPLAY}</a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-[#d3ab63]">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button onClick={() => go(l.href)} className="text-sm text-[#b9b9c6] transition-colors hover:text-[#f1ddab]">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-[#d3ab63]">Find us</p>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-[#b9b9c6]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#d3ab63]" /> {ADDRESS_SHORT}
            </p>
            <p className="mt-1.5 text-xs text-[#8b8b98]">{ADDRESS_PO_BOX}</p>
            <a href={PHONE_TEL} className="mt-3 flex items-center gap-2 text-sm font-bold text-[#f1ddab] hover:text-white">
              <Phone size={15} className="text-[#d3ab63]" /> {PHONE_DISPLAY}
            </a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#f1ddab] underline-offset-4 hover:underline">
              <Navigation size={13} /> Get directions
            </a>
          </div>
        </div>

        <div className="gold-hr mt-10" aria-hidden="true" />
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-[#8b8b98] sm:flex-row">
          <p>© {new Date().getFullYear()} Thy Favour Hotel, Anaji — Takoradi, Ghana. All rights reserved.</p>
          <p className="max-w-md text-center sm:text-right">
            Facilities & distances reflect current public listings. Rates & availability confirmed directly with the hotel.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(211,171,99,0.45)] text-[#f1ddab] transition-colors hover:bg-[rgba(211,171,99,0.15)]"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 sm:hidden" role="navigation" aria-label="Quick actions">
        <a href={PHONE_TEL} className="btn-ghost flex-1 bg-[#0d0d12]/90 px-4 py-3.5 text-[0.68rem] shadow-2xl" aria-label={`Call hotel at ${PHONE_DISPLAY}`}>
          <Phone size={15} /> CALL
        </a>
        <button onClick={onBook} className="btn-gold flex-[1.4] px-4 py-3.5 text-[0.68rem] shadow-2xl">
          <CalendarCheck size={15} /> BOOK YOUR STAY
        </button>
      </div>
    </footer>
  );
}
