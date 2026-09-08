import {
  Waves,
  Wifi,
  Coffee,
  CarFront,
  UtensilsCrossed,
  Wine,
  ConciergeBell,
  Snowflake,
  CookingPot,
  Plane,
  Clock3,
  Sparkles,
  Shirt,
  Sun,
} from "lucide-react";
import { Reveal, SectionHeading } from "./ui";

const AMENITIES = [
  { icon: Waves, title: "Outdoor Swimming Pool", text: "A sparkling outdoor pool at the heart of the hotel — swim, lounge and cool off under the palms.", tag: "Verified" },
  { icon: Wifi, title: "Free Wi-Fi", text: "Free Wi-Fi throughout the property. Work from your room or the terrace with ease.", tag: "Free" },
  { icon: Coffee, title: "Free Breakfast", text: "Complimentary breakfast with every stay — à la carte, English/Irish, American and buffet styles listed.", tag: "Free" },
  { icon: CarFront, title: "Free Private Parking", text: "Free private parking on site. Drive in, park steps from reception, and relax.", tag: "Free" },
  { icon: UtensilsCrossed, title: "Restaurant", text: "On-site restaurant with dining room and terrace seating for relaxed hotel meals.", tag: "Verified" },
  { icon: Wine, title: "Bar", text: "Hotel bar for evening drinks and easy conversation after a day in the oil city.", tag: "Verified" },
  { icon: ConciergeBell, title: "Room Service", text: "Verified room service brings food and essentials straight to your door.", tag: "Verified" },
  { icon: Snowflake, title: "Air Conditioning", text: "Air-conditioned rooms confirmed across listings — cool, quiet comfort day and night.", tag: "Verified" },
  { icon: CookingPot, title: "Kitchens in Selected Rooms", text: "Kitchen facilities available in some rooms — ideal for longer, self-catered stays.", tag: "Selected rooms" },
  { icon: Plane, title: "Airport Shuttle", text: "Airport transfers and shuttle service listed — smooth arrivals via Takoradi Airport.", tag: "On request" },
  { icon: Clock3, title: "24-Hour Front Desk", text: "A 24-hour front desk for late arrivals, early departures and anything in between.", tag: "Verified" },
  { icon: Sparkles, title: "Daily Housekeeping", text: "Daily housekeeping and free toiletries in every unit keep your stay fresh.", tag: "Verified" },
  { icon: Shirt, title: "Ironing Facilities", text: "Ironing facilities listed — step out crisp for meetings, weddings and nights out.", tag: "Verified" },
  { icon: Sun, title: "Terrace & Outdoor Dining", text: "Terrace and outdoor dining areas for breakfasts and evenings under the sky.", tag: "Verified" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative scroll-mt-20 bg-[#0b0b10] px-4 py-24 sm:px-6 lg:px-8" aria-label="Amenities">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Everything included"
          title="Amenities &"
          accent="Facilities"
          sub="Only facilities supported by current public listings are shown here. Nothing invented, nothing exaggerated — just a genuinely comfortable hotel."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AMENITIES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 4) * 90}>
              <article className="card-lift glass group relative h-full overflow-hidden rounded-3xl p-6">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ background: "#d3ab63" }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(211,171,99,0.4)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <a.icon size={22} />
                  </span>
                  <span className="rounded-full border border-[rgba(211,171,99,0.3)] bg-black/40 px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-[#e9cf9a]">
                    {a.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold leading-snug">{a.title}</h3>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-[#b9b9c6]">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
