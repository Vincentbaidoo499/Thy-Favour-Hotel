import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Check, Phone, CalendarCheck, Users, Info } from "lucide-react";
import { PHONE_TEL, PHONE_DISPLAY, type Room } from "../lib/data";

export default function RoomModal({
  room,
  onClose,
  onBook,
}: {
  room: Room | null;
  onClose: () => void;
  onBook: (id: string) => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
    if (room) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") setIdx((i) => (room ? (i + 1) % room.gallery.length : i));
        if (e.key === "ArrowLeft")
          setIdx((i) => (room ? (i - 1 + room.gallery.length) % room.gallery.length : i));
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [room, onClose]);

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${room.name} details`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="glass-deep relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl sm:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] bg-black/60 text-[#f1ddab] backdrop-blur-md hover:bg-black/80"
          aria-label="Close room details"
        >
          <X size={20} />
        </button>

        {/* Carousel */}
        <div className="relative h-64 overflow-hidden sm:h-[380px]">
          {room.gallery.map((g, i) => (
            <img
              key={g}
              src={g}
              alt={i === 0 ? `${room.name} at Thy Favour Hotel` : `${room.name} — photo ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-black/30" />
          {room.gallery.length > 1 && (
            <>
              <button
                onClick={() => setIdx((idx - 1 + room.gallery.length) % room.gallery.length)}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] bg-black/55 text-[#f1ddab] backdrop-blur-md"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setIdx((idx + 1) % room.gallery.length)}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] bg-black/55 text-[#f1ddab] backdrop-blur-md"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {room.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-[#e9cf9a]" : "w-2 bg-white/40 hover:bg-white/70"}`}
                  />
                ))}
              </div>
            </>
          )}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <span className="chip">{room.tagline}</span>
            <h3 className="mt-2 text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              {room.name}
            </h3>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d3ab63]">
              <Users size={14} /> {room.idealFor}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#d8d3c4]">{room.description}</p>
            <h4 className="mt-6 text-sm font-extrabold uppercase tracking-[0.25em] text-[#e9cf9a]">Verified amenities</h4>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-start gap-2 rounded-xl border border-[rgba(211,171,99,0.18)] bg-black/30 px-3 py-2.5 text-[0.82rem] text-[#e8e2d2]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[#d3ab63]" /> {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 rounded-xl border border-[rgba(211,171,99,0.2)] bg-[rgba(211,171,99,0.07)] p-3.5 text-xs leading-relaxed text-[#cfc9b8]">
              <Info size={15} className="mt-0.5 shrink-0 text-[#d3ab63]" /> {room.note} Rates are confirmed directly with the hotel — this website never invents prices.
            </p>
          </div>
          <div className="lg:pl-2">
            <div className="glass rounded-2xl p-5">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.25em] text-[#d3ab63]">Reserve this room</p>
              <p className="mt-2 text-sm leading-relaxed text-[#b9b9c6]">
                Send a booking request in under a minute. The hotel confirms availability by phone.
              </p>
              <button onClick={() => onBook(room.id)} className="btn-gold mt-4 w-full px-5 py-3.5 text-[0.7rem]">
                <CalendarCheck size={15} /> REQUEST THIS ROOM
              </button>
              <a href={PHONE_TEL} className="btn-ghost mt-2.5 w-full px-5 py-3.5 text-[0.7rem]">
                <Phone size={15} /> CALL {PHONE_DISPLAY}
              </a>
              <p className="mt-3 text-center text-[0.68rem] text-[#8b8b98]">
                Free breakfast · Free Wi-Fi · Free parking included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
