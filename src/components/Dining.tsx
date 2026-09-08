import { Coffee, UtensilsCrossed, Wine, ConciergeBell, Clock, Info } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const PILLARS = [
  {
    icon: Coffee,
    title: "Free Breakfast",
    text: "Every stay begins with a complimentary breakfast. Listings describe à la carte, Full English/Irish and American options, plus buffet service — hearty fuel for business days and slow coastal mornings alike.",
    img: "/images/breakfast.jpg",
    alt: "Fresh breakfast spread served at Thy Favour Hotel restaurant",
  },
  {
    icon: UtensilsCrossed,
    title: "On-site Restaurant",
    text: "The hotel's restaurant serves guests on the property with a welcoming dining room and terrace seating. Enjoy familiar Ghanaian comfort and continental favourites without leaving the hotel.",
    img: "/images/dining.jpg",
    alt: "Restaurant dining room set for evening service",
  },
  {
    icon: Wine,
    title: "Bar & Terrace",
    text: "Unwind at the hotel bar or out on the terrace as the Anaji evening cools. A relaxed setting for drinks, conversation and watching the day settle over Takoradi.",
    img: "/images/bar.jpg",
    alt: "Hotel bar with warm ambient lighting",
  },
  {
    icon: ConciergeBell,
    title: "Room Service",
    text: "Verified room service means dinner, drinks and essentials come to your door. Perfect after a long drive, a late flight, or a day at the pool.",
    img: "/images/terrace.jpg",
    alt: "Outdoor terrace dining area at sunset",
  },
];

export default function Dining() {
  return (
    <section id="dining" className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 lg:px-8" aria-label="Dining">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full opacity-15 blur-[110px]"
        style={{ background: "radial-gradient(circle, #d3ab63, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Taste of the house"
          title="Restaurant"
          accent="& Bar"
          sub="Verified dining at Thy Favour Hotel — free breakfast, an on-site restaurant, a bar and room service. We describe only what public listings confirm: no invented menus, no invented prices."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 120}>
              <article className="card-lift glass-deep group grid overflow-hidden rounded-3xl sm:grid-cols-2">
                <div className="img-frame relative h-56 sm:h-full sm:min-h-[280px]">
                  <img src={p.img} alt={p.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(211,171,99,0.4)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a]">
                    <p.icon size={20} />
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#b9b9c6]">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="glass mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl px-6 py-5 text-center sm:flex-row sm:text-left">
            <Clock size={22} className="shrink-0 text-[#d3ab63]" />
            <p className="text-sm leading-relaxed text-[#d8d3c4]">
              <span className="font-bold text-[#f1ddab]">Good to know:</span> breakfast is included with your stay.
              For meal times, group dining or special requests, call the front desk before you arrive and the kitchen team will prepare.
            </p>
          </div>
          <p className="mx-auto mt-4 flex max-w-4xl items-start justify-center gap-2 text-center text-xs text-[#8b8b98]">
            <Info size={13} className="mt-0.5 shrink-0" />
            Dining details are drawn from current public hotel listings. Menus and serving times may vary — please confirm directly with the hotel.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
