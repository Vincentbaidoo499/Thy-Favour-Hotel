import { MapPin, Navigation, Phone, CalendarCheck, ArrowUpRight, Clock3, Plane, ShoppingBag, Landmark } from "lucide-react";
import { ADDRESS_SHORT, DIRECTIONS_URL, MAPS_EMBED, PHONE_TEL, PHONE_DISPLAY, ATTRACTIONS } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

const ICONS = [Landmark, ShoppingBag, Plane];

export default function Location({ onBook }: { onBook: () => void }) {
  return (
    <section id="location" className="relative scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8" aria-label="Location">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Find us"
          title="In the Heart of"
          accent="Anaji, Takoradi"
          sub="Easy to reach, easy to love. Follow the map, call ahead, or send a booking request — the team will take it from there."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Map */}
          <Reveal>
            <div className="glass-deep relative overflow-hidden rounded-3xl">
              <iframe
                title="Map showing Thy Favour Hotel, Anaji, Takoradi, Ghana"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 grayscale-[35%] contrast-[1.05] sm:h-[440px]"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07070a]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto">
                <div className="glass-deep flex items-start gap-3 rounded-2xl p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0d9a0] to-[#a87f33] text-[#161005]">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-white">Thy Favour Hotel</p>
                    <p className="mt-0.5 max-w-xs text-xs leading-relaxed text-[#cfc9b8]">{ADDRESS_SHORT}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Action panel */}
          <Reveal delay={140}>
            <div className="glass flex h-full flex-col rounded-3xl p-7">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.3em] text-[#d3ab63]">Getting here</p>
              <h3 className="mt-2 text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                Minutes from everything that matters
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b9b9c6]">
                Near Shellyco Gas Station by ICMS Primary School — simple for taxis and ride-hailing to find, with free
                private parking if you drive yourself.
              </p>
              <div className="mt-5 space-y-2.5">
                <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-gold w-full px-5 py-3.5 text-[0.7rem]">
                  <Navigation size={15} /> GET DIRECTIONS
                </a>
                <a href={PHONE_TEL} className="btn-ghost w-full px-5 py-3.5 text-[0.7rem]">
                  <Phone size={15} /> CALL HOTEL · {PHONE_DISPLAY}
                </a>
                <button onClick={onBook} className="btn-ghost w-full px-5 py-3.5 text-[0.7rem]">
                  <Clock3 size={15} /> BOOK YOUR STAY
                </button>
              </div>
              <div className="gold-hr my-5" />
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.25em] text-[#d3ab63]">Nearby attractions</p>
              <ul className="mt-3 space-y-3">
                {ATTRACTIONS.map((a, i) => {
                  const Icon = ICONS[i % ICONS.length];
                  return (
                    <li key={a.name} className="rounded-2xl border border-[rgba(211,171,99,0.18)] bg-black/30 p-3.5">
                      <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.35)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a]">
                          <Icon size={17} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-white">{a.name}</p>
                          <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#d3ab63]">{a.distance}</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#b9b9c6]">{a.detail}</p>
                          <a href={a.maps} target="_blank" rel="noreferrer" className="mt-1.5 inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#f1ddab] underline-offset-4 hover:underline">
                            Directions <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[0.68rem] leading-relaxed text-[#8b8b98]">
                Distances (Market Circle ≈ 4.1 km, Airport ≈ 3.1 miles) come from current public hotel listings.
                <button onClick={onBook} className="ml-1 inline-flex items-center gap-1 font-bold text-[#f1ddab] underline-offset-4 hover:underline">
                  <CalendarCheck size={11} /> Book your stay
                </button>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
