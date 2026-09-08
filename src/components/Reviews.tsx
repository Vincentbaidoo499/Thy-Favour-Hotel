import { Star, Quote, BadgeCheck, ArrowUpRight, StarHalf } from "lucide-react";
import { TRIPADVISOR_URL } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5 text-[#e9cf9a]" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" />
      ))}
      {half && (
        <span className="relative inline-block" style={{ width: 15, height: 15 }}>
          <Star size={15} className="absolute inset-0 text-[#5a5a66]" />
          <StarHalf size={15} className="absolute inset-0" fill="currentColor" />
        </span>
      )}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} size={15} className="text-[#5a5a66]" />
      ))}
    </span>
  );
}

const SOURCES = [
  {
    source: "TripAdvisor",
    rating: "4.0 / 5",
    value: 4,
    detail: "5 traveller reviews · ranked #9 of 19 hotels in Sekondi-Takoradi",
    link: TRIPADVISOR_URL,
    linkLabel: "Read reviews on TripAdvisor",
  },
  {
    source: "Google Hotels",
    rating: "Listed & reviewed",
    value: 4,
    detail: "Public guest feedback highlights the pool, breakfast and location; one guest noted low water pressure in upper-floor rooms.",
    link: "https://www.google.com.gh/travel/hotels/entity/CgoImvbZzcS_n-x9EAE",
    linkLabel: "See listing on Google Hotels",
  },
  {
    source: "Booking partners",
    rating: "Verified property",
    value: 4,
    detail: "Listed across Expedia, Hotels.com, Trivago and partner sites with consistent facilities: pool, free breakfast, Wi-Fi and parking.",
    link: "https://www.hoteles.com/en/ho3435742528/thy-favour-hotel/",
    linkLabel: "See listing on Hotels.com",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-20 bg-[#0b0b10] px-4 py-24 sm:px-6 lg:px-8" aria-label="Guest reviews">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Word on the street"
          title="Loved by"
          accent="Travellers"
          sub="We only publish genuine, attributable review information from public platforms — never invented testimonials. Overall, guests rate Thy Favour Hotel 4 out of 5."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SOURCES.map((s, i) => (
            <Reveal key={s.source} delay={i * 120}>
              <article className="card-lift glass-deep flex h-full flex-col rounded-3xl p-7">
                <Quote size={26} className="text-[#d3ab63]" aria-hidden="true" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#e9cf9a]">{s.source}</p>
                  <BadgeCheck size={17} className="shrink-0 text-[#7fc98a]" aria-label="Verified source" />
                </div>
                <p className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{s.rating}</p>
                <div className="mt-2"><Stars value={s.value} /></div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#b9b9c6]">{s.detail}</p>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#f1ddab] underline-offset-4 hover:underline"
                >
                  {s.linkLabel} <ArrowUpRight size={14} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="glass mx-auto max-w-4xl rounded-2xl px-6 py-5 text-center">
            <p className="text-sm leading-relaxed text-[#d8d3c4]">
              <span className="font-bold text-[#f1ddab]">Our promise:</span> every rating on this page comes from a real
              public listing. Individual guest comments are shown only as short attributed summaries — full reviews live
              on the platforms linked above.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
