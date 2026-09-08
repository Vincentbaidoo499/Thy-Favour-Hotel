import { Briefcase, Users, Landmark, Plane, CalendarCheck, ArrowUpRight } from "lucide-react";
import { DIRECTIONS_URL } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

const EXPS = [
  {
    icon: Briefcase,
    title: "Business in the Oil City",
    text: "Free high-speed Wi-Fi, air-conditioned rooms, free private parking and a 24-hour front desk make Thy Favour a smart base for work trips to Takoradi — with Takoradi Airport only about 3.1 miles away.",
    img: "/images/lobby.jpg",
    alt: "Hotel lobby and reception, a calm base for business travellers",
  },
  {
    icon: Users,
    title: "Family & Group Stays",
    text: "Double rooms, family-friendly options, kitchens in selected rooms and free breakfast for everyone — space for the whole party to rest, eat and regroup.",
    img: "/images/room-family.jpg",
    alt: "Spacious room suited to families and groups",
  },
  {
    icon: Landmark,
    title: "Culture on Your Doorstep",
    text: "The celebrated Bisa Aberwa Museum of African art sits nearby, and Takoradi Market Circle — about 4.1 km away — pulses with fabrics, craft and everyday Ghanaian life.",
    img: "/images/terrace.jpg",
    alt: "Terrace at sunset before a day exploring Takoradi",
  },
  {
    icon: Plane,
    title: "Easy Arrivals",
    text: "Touch down at Takoradi Airport and let the hotel's listed airport shuttle and transfer service smooth your way to Anaji. Late arrival? The 24-hour front desk has you covered.",
    img: "/images/hero.jpg",
    alt: "Hotel exterior glowing at dusk to welcome arriving guests",
  },
];

export default function Experiences({ onBook }: { onBook: () => void }) {
  return (
    <section id="experiences" className="relative scroll-mt-20 bg-[#0b0b10] px-4 py-24 sm:px-6 lg:px-8" aria-label="Experiences">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Ways to stay"
          title="Experiences at"
          accent="Thy Favour"
          sub="Every experience below is built only from verified hotel facilities and real nearby places — business comfort, family ease, poolside calm and the culture of Takoradi."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {EXPS.map((e, i) => (
            <Reveal key={e.title} delay={(i % 4) * 100}>
              <article className="card-lift glass-deep group flex h-full flex-col overflow-hidden rounded-3xl">
                <div className="img-frame relative h-52">
                  <img src={e.img} alt={e.alt} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(233,207,154,0.5)] bg-black/55 text-[#e9cf9a] backdrop-blur-md">
                    <e.icon size={20} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold leading-snug" style={{ fontFamily: "var(--font-display)" }}>{e.title}</h3>
                  <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-[#b9b9c6]">{e.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button onClick={onBook} className="btn-gold px-8 py-4 text-[0.72rem]">
            <CalendarCheck size={16} /> START YOUR EXPERIENCE
          </button>
          <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="btn-ghost px-8 py-4 text-[0.72rem]">
            PLAN YOUR ROUTE <ArrowUpRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
