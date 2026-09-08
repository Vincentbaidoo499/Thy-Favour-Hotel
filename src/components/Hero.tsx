import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  BedDouble,
  Phone,
  ChevronDown,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Waves,
  ShieldCheck,
} from "lucide-react";
import Particles from "./Particles";
import {
  PHONE_TEL,
  PHONE_DISPLAY,
  ROOMS,
  EMPTY_DRAFT,
  todayISO,
  type BookingDraft,
} from "../lib/data";

export default function Hero({
  draft,
  setDraft,
  onBook,
}: {
  draft: BookingDraft;
  setDraft: (d: BookingDraft) => void;
  onBook: () => void;
}) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [err, setErr] = useState("");

  const onMouse = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setParallax({
      x: ((e.clientX - cx) / cx) * 10,
      y: ((e.clientY - cy) / cy) * 8,
    });
  };

  const set = (patch: Partial<BookingDraft>) => {
    setDraft({ ...draft, ...patch });
    setErr("");
  };

  const check = () => {
    if (!draft.checkIn || !draft.checkOut) {
      setErr("Please choose your check-in and check-out dates.");
      return;
    }
    if (draft.checkOut <= draft.checkIn) {
      setErr("Check-out must be after check-in.");
      return;
    }
    onBook();
  };

  return (
    <section
      id="home"
      onMouseMove={onMouse}
      className="grain vignette relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Welcome to Thy Favour Hotel"
    >
      {/* Layered cinematic background */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero.jpg"
          alt=""
          className="animate-kenburns h-full w-full object-cover"
          style={{
            transform: `scale(1.08) translate(${parallax.x * -1}px, ${parallax.y * -1}px)`,
          }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/80 via-[#07070a]/45 to-[#07070a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/70 via-transparent to-[#07070a]/40" />
        <div
          className="animate-drift absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-25 blur-[110px]"
          style={{ background: "radial-gradient(circle, #d3ab63, transparent 70%)" }}
        />
        <div
          className="animate-drift absolute -right-24 bottom-1/4 h-80 w-80 rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #4a6fa5, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
      </div>
      <Particles />

      {/* Floating side panel (desktop) */}
      <div
        className="absolute right-8 top-1/2 z-10 hidden xl:block"
        aria-hidden="true"
        style={{
          transform: `translate(${parallax.x * 1.6}px, calc(-50% + ${parallax.y * 1.6}px))`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="glass animate-floaty w-60 rounded-3xl p-5 shadow-2xl">
          <div className="flex items-center gap-1 text-[#e9cf9a]">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <span className="ml-1 text-xs font-bold text-white">4.0</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#d8d3c4]">
            Ranked among Takoradi's top stays by verified TripAdvisor travellers.
          </p>
          <div className="gold-hr my-3" />
          <div className="space-y-2 text-xs text-[#efe3c6]">
            <p className="flex items-center gap-2">
              <Waves size={13} className="text-[#d3ab63]" /> Outdoor pool
            </p>
            <p className="flex items-center gap-2">
              <Coffee size={13} className="text-[#d3ab63]" /> Free breakfast
            </p>
            <p className="flex items-center gap-2">
              <Wifi size={13} className="text-[#d3ab63]" /> Free Wi-Fi
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-[#d3ab63]" /> Free parking
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <MapPin size={13} className="text-[#d3ab63]" /> ANAJI · TAKORADI · GHANA
            </span>
            <span className="chip">
              <Star size={13} className="text-[#d3ab63]" /> 4.0 RATED STAY
            </span>
          </div>
          <p className="mt-6 text-[0.72rem] font-bold uppercase tracking-[0.5em] text-[#e9cf9a]">
            Thy Favour Hotel presents
          </p>
          <h1
            className="mt-4 text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-[5.2rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WELCOME TO
            <br />
            <span className="gold-text font-semibold">THY FAVOUR HOTEL</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8d3c4] sm:text-lg">
            A comfortable stay in the heart of Anaji, Takoradi — warm Ghanaian
            hospitality, a sparkling outdoor pool and restful air-conditioned
            rooms, minutes from the city's business and culture.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button onClick={onBook} className="btn-gold px-8 py-4 text-[0.75rem]">
              <CalendarCheck size={17} /> BOOK YOUR STAY
            </button>
            <button
              onClick={() =>
                document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-ghost px-8 py-4 text-[0.75rem]"
            >
              <BedDouble size={17} /> EXPLORE ROOMS
            </button>
            <a href={PHONE_TEL} className="btn-ghost px-8 py-4 text-[0.75rem]">
              <Phone size={16} /> CONTACT HOTEL
            </a>
          </div>
          <p className="mt-4 text-xs text-[#9b9ba8]">
            Prefer to talk? Call{" "}
            <a href={PHONE_TEL} className="font-bold text-[#f1ddab] underline-offset-4 hover:underline">
              {PHONE_DISPLAY}
            </a>{" "}
            — the front desk is happy to help.
          </p>
        </motion.div>

        {/* Futuristic booking widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="glass-deep relative overflow-hidden rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-6">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #e9cf9a, transparent)",
              }}
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-[#e9cf9a]">
                Plan your stay
              </p>
              <p className="hidden text-[0.7rem] text-[#9b9ba8] sm:block">
                Instant request · confirmed by phone
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-[1.2fr_1.2fr_0.9fr_0.9fr_1.2fr_auto]">
              <label className="block">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">
                  Check-in
                </span>
                <input
                  type="date"
                  className="field"
                  min={todayISO()}
                  value={draft.checkIn}
                  onChange={(e) => set({ checkIn: e.target.value })}
                  aria-label="Check-in date"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">
                  Check-out
                </span>
                <input
                  type="date"
                  className="field"
                  min={draft.checkIn || todayISO()}
                  value={draft.checkOut}
                  onChange={(e) => set({ checkOut: e.target.value })}
                  aria-label="Check-out date"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">
                  Adults
                </span>
                <select
                  className="field"
                  value={draft.adults}
                  onChange={(e) => set({ adults: Number(e.target.value) })}
                  aria-label="Adults"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} adult{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">
                  Children
                </span>
                <select
                  className="field"
                  value={draft.children}
                  onChange={(e) => set({ children: Number(e.target.value) })}
                  aria-label="Children"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} child{n !== 1 ? "ren" : ""}
                    </option>
                  ))}
                </select>
              </label>
              <label className="col-span-2 block lg:col-span-1">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">
                  Room
                </span>
                <select
                  className="field"
                  value={draft.roomId}
                  onChange={(e) => set({ roomId: e.target.value })}
                  aria-label="Room selection"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="col-span-2 flex items-end lg:col-span-1">
                <button
                  onClick={check}
                  className="btn-gold w-full px-7 py-[0.9rem] text-[0.72rem] lg:w-auto"
                >
                  <CalendarCheck size={16} /> CHECK DATES
                </button>
              </div>
            </div>
            {err && (
              <p role="alert" className="mt-3 text-xs font-semibold text-[#f0857a]">
                {err}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.68rem] text-[#9b9ba8]">
              <span>No payment online — your request goes straight to the hotel.</span>
              <button
                onClick={() => {
                  setDraft({ ...EMPTY_DRAFT, roomId: draft.roomId });
                  setErr("");
                }}
                className="underline-offset-4 hover:text-[#f1ddab] hover:underline"
              >
                Reset dates
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <button
            onClick={() =>
              document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-1 text-[#9b9ba8] transition-colors hover:text-[#f1ddab]"
            aria-label="Scroll to rooms"
          >
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.35em]">
              Discover
            </span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
