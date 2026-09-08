import { MapPin, Star, Wifi, Coffee, Waves, CarFront, Phone, CalendarCheck } from "lucide-react";
import { PHONE_TEL, TRIPADVISOR_URL } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

const PILLS = [
  { icon: Waves, label: "Outdoor pool" },
  { icon: Coffee, label: "Free breakfast" },
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: CarFront, label: "Free parking" },
];

export default function About({ onBook }: { onBook: () => void }) {
  return (
    <section id="about" className="relative scroll-mt-20 bg-[#0b0b10] px-4 py-24 sm:px-6 lg:px-8" aria-label="About the hotel">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="img-frame overflow-hidden rounded-3xl border border-[rgba(211,171,99,0.3)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <img src="/images/lobby.jpg" alt="Warm reception lobby of Thy Favour Hotel in Anaji, Takoradi" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="glass-deep absolute -bottom-6 -right-2 w-64 rounded-2xl p-5 shadow-2xl sm:right-6">
              <div className="flex items-center gap-1 text-[#e9cf9a]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
                <span className="ml-1 text-xs font-extrabold text-white">4.0 / 5</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#d8d3c4]">
                Rated 4 of 5 from verified reviews, and ranked among the top stays in Sekondi-Takoradi on TripAdvisor.
              </p>
              <a href={TRIPADVISOR_URL} target="_blank" rel="noreferrer" className="mt-2 inline-block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#f1ddab] underline-offset-4 hover:underline">
                Read verified reviews
              </a>
            </div>
            <div className="glass animate-floaty absolute -left-2 -top-5 rounded-2xl px-4 py-3 sm:left-6" aria-hidden="true">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#d3ab63]">Anaji · Takoradi</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-white"><MapPin size={12} /> Western Region, Ghana</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title="Comfort with a"
            accent="Ghanaian heart"
          />
          <Reveal delay={120}>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-[#c6c1b2]">
              <p>
                Tucked beside ICMS Primary School in Anaji, near the Shellyco Gas Station,{" "}
                <strong className="text-[#f1ddab]">Thy Favour Hotel</strong> is a welcoming Takoradi stay built
                around the things travellers actually need: cool, quiet air-conditioned rooms, a sparkling outdoor
                pool, honest food and genuinely warm service.
              </p>
              <p>
                Public listings describe flat-screen TVs and private bathrooms with free toiletries in every unit,
                daily housekeeping, free high-speed Wi-Fi, free breakfast and free private parking — alongside a
                restaurant, a bar, verified room service, a 24-hour front desk and airport transfers.
              </p>
              <p>
                Whether you are in town for business in Ghana's oil city, visiting family, or exploring the Western
                Region's beaches and heritage, Thy Favour offers a calm, well-kept base minutes from Takoradi Market
                Circle and Takoradi Airport.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {PILLS.map((p) => (
                <span key={p.label} className="chip"><p.icon size={13} className="text-[#d3ab63]" /> {p.label}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={onBook} className="btn-gold px-8 py-4 text-[0.72rem]">
                <CalendarCheck size={16} /> BOOK YOUR STAY
              </button>
              <a href={PHONE_TEL} className="btn-ghost px-8 py-4 text-[0.72rem]">
                <Phone size={15} /> TALK TO THE FRONT DESK
              </a>
            </div>
            <p className="mt-4 text-xs italic text-[#8b8b98]">
              This story is drawn only from currently available public listing information. We make no claims about
              history, awards or stars — just a comfortable, honestly described hotel.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
