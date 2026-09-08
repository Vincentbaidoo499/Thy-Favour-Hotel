import { useState } from "react";
import { BedDouble, Users, ArrowRight, Check, Phone, CalendarCheck, Info } from "lucide-react";
import { ROOMS, PHONE_TEL, type Room } from "../lib/data";
import { Reveal, SectionHeading, useTilt } from "./ui";

function RoomCard({ room, onOpen, onBook }: { room: Room; onOpen: () => void; onBook: () => void }) {
  const tiltRef = useTilt<HTMLDivElement>(6);
  return (
    <div
      ref={tiltRef}
      className="card-lift glass-deep group relative flex flex-col overflow-hidden rounded-3xl"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button onClick={onOpen} className="img-frame relative block h-64 w-full text-left sm:h-72" aria-label={`View details of ${room.name}`}>
        <img src={room.image} alt={`${room.name} at Thy Favour Hotel, Takoradi`} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent" />
        <span className="chip absolute left-4 top-4">{room.tagline}</span>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(233,207,154,0.6)] bg-black/50 text-[#f1ddab] backdrop-blur-md transition-transform group-hover:scale-110">
          <ArrowRight size={18} />
        </span>
      </button>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{room.name}</h3>
        <p className="mt-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d3ab63]">
          <Users size={13} /> {room.idealFor}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#b9b9c6]">{room.description}</p>
        <ul className="mt-4 grid grid-cols-2 gap-2">
          {room.amenities.slice(0, 4).map((a) => (
            <li key={a} className="flex items-start gap-1.5 text-xs text-[#d8d3c4]">
              <Check size={13} className="mt-0.5 shrink-0 text-[#d3ab63]" /> {a}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2.5 pt-1">
          <button onClick={onOpen} className="btn-ghost flex-1 px-4 py-3 text-[0.68rem]">VIEW DETAILS</button>
          <button onClick={onBook} className="btn-gold flex-1 px-4 py-3 text-[0.68rem]">
            <CalendarCheck size={14} /> BOOK
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Rooms({ onOpenRoom, onBookRoom }: { onOpenRoom: (r: Room) => void; onBookRoom: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="rooms" className="relative scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8" aria-label="Rooms">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Stay with us"
          title="Rooms &"
          accent="Suites"
          sub="Verified room categories at Thy Favour Hotel. Every room includes air conditioning, a flat-screen TV, a private bathroom with free toiletries, daily housekeeping, free Wi-Fi and free breakfast. Room rates are confirmed directly with the hotel — no hidden fees, ever."
        />
        <div className="mt-6 flex justify-center">
          <span className="chip"><Info size={13} className="text-[#d3ab63]" /> PRICING CONFIRMED BY PHONE — WE NEVER INVENT RATES</span>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {ROOMS.map((r, i) => (
            <Reveal key={r.id} delay={i * 120}>
              <RoomCard room={r} onOpen={() => onOpenRoom(r)} onBook={() => onBookRoom(r.id)} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="glass rounded-3xl p-6 text-center sm:p-8">
            <BedDouble size={26} className="mx-auto text-[#d3ab63]" />
            <h3 className="mt-3 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Travelling with family or a group?</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b9b9c6]">
              The hotel also lists family-friendly room options and ironing facilities. Call the front desk and the team will match your
              party to the perfect configuration {expanded ? "— including rooms with outdoor dining areas and kitchen facilities in selected units." : ""}
              {!expanded && (
                <button onClick={() => setExpanded(true)} className="ml-1 font-bold text-[#f1ddab] underline-offset-4 hover:underline">Read more</button>
              )}
            </p>
            {expanded && (
              <button onClick={() => setExpanded(false)} className="mt-2 text-xs font-bold text-[#f1ddab] underline-offset-4 hover:underline">Show less</button>
            )}
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={PHONE_TEL} className="btn-ghost px-7 py-3.5 text-[0.7rem]"><Phone size={15} /> ASK ABOUT FAMILY ROOMS</a>
              <button onClick={() => onBookRoom("extended")} className="btn-gold px-7 py-3.5 text-[0.7rem]">REQUEST AVAILABILITY <ArrowRight size={15} /></button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
