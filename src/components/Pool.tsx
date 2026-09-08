import { useState } from "react";
import { Waves, Sun, Armchair, CalendarCheck, ChevronDown } from "lucide-react";
import Particles from "./Particles";
import { Reveal, SectionHeading } from "./ui";

const POOL_FACTS = [
  { icon: Waves, title: "Outdoor pool", text: "A verified outdoor swimming pool — the social heart of the hotel." },
  { icon: Sun, title: "Sun terrace", text: "Terrace and sun-lounger space for slow afternoons and golden-hour swims." },
  { icon: Armchair, title: "Poolside calm", text: "Outdoor dining areas nearby, so refreshments are never far away." },
];

export default function Pool({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="pool" className="relative scroll-mt-20 overflow-hidden" aria-label="Swimming pool">
      <div className="grain relative">
        <div className="absolute inset-0" aria-hidden="true">
          <img src="/images/pool.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#07070a]/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07070a] via-transparent to-[#07070a]" />
        </div>
        <Particles density={0.7} />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Blue hour, every hour"
                title="The Outdoor"
                accent="Pool"
                sub="Cool water, warm light, swaying palms. The verified outdoor pool at Thy Favour Hotel turns every stay into a small escape — whether you swim laps at dawn or drift at dusk."
              />
              <Reveal delay={150} className="mt-8">
                <button onClick={onBook} className="btn-gold px-8 py-4 text-[0.72rem]">
                  <CalendarCheck size={16} /> BOOK A POOLSIDE STAY
                </button>
              </Reveal>
            </div>
            <div className="space-y-3">
              {POOL_FACTS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.title} delay={i * 100}>
                    <div className={`glass-deep overflow-hidden rounded-2xl transition-colors ${isOpen ? "border-[rgba(233,207,154,0.5)]" : ""}`}>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center gap-4 p-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(211,171,99,0.4)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a]">
                          <f.icon size={20} />
                        </span>
                        <span className="flex-1 text-base font-bold">{f.title}</span>
                        <ChevronDown size={18} className={`text-[#d3ab63] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className="grid transition-all duration-400"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 pl-[5.25rem] text-sm leading-relaxed text-[#c6c1b2]">{f.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={300}>
                <p className="px-1 text-xs leading-relaxed text-[#9b9ba8]">
                  Pool information reflects current public listings (outdoor swimming pool verified). Opening hours and
                  poolside service may vary — please confirm with the front desk.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
