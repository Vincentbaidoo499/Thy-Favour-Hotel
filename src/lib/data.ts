export const PHONE_DISPLAY = "+233 20 042 9990";
export const PHONE_TEL = "tel:+233200429900";
export const ADDRESS_SHORT =
  "ICMS Primary School, Anaji, Near Shellyco Gas Station, Takoradi, Ghana";
export const ADDRESS_PO_BOX = "P.O. Box EF 276, Anaji – Takoradi, Ghana";
export const MAPS_QUERY = "Thy Favour Hotel, Anaji, Takoradi, Ghana";
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAPS_QUERY
)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  MAPS_QUERY
)}&output=embed`;
export const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Hotel_Review-g1015897-d23257004-Reviews-Thy_Favour_Hotel-Sekondi_Takoradi_Western_Region.html";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Amenities", href: "#amenities" },
  { label: "Pool", href: "#pool" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export interface BookingDraft {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
}

export const EMPTY_DRAFT: BookingDraft = {
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  roomId: "double",
};

export interface Room {
  id: string;
  name: string;
  tagline: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  idealFor: string;
  note: string;
}

export const ROOMS: Room[] = [
  {
    id: "double",
    name: "Double Room",
    tagline: "Signature comfort for two",
    image: "/images/room-double.jpg",
    gallery: ["/images/room-double.jpg", "/images/bathroom.jpg", "/images/terrace.jpg"],
    description:
      "A warm, restful double room dressed in crisp whites and rich golden tones. Fall asleep under soft lamplight, wake to the Anaji sunrise, and step out to breakfast on the terrace. Every double room pairs modern convenience with calm, uncluttered African elegance.",
    amenities: [
      "Air conditioning",
      "Flat-screen TV",
      "Private bathroom",
      "Free toiletries",
      "Daily housekeeping",
      "Free high-speed Wi-Fi",
      "Free breakfast included",
      "Room service available",
    ],
    idealFor: "Couples, friends & business travellers",
    note: "Double rooms are among the hotel's listed room categories. Final room configuration is confirmed directly with the hotel.",
  },
  {
    id: "single",
    name: "Single Room",
    tagline: "Smart serenity for solo stays",
    image: "/images/room-single.jpg",
    gallery: ["/images/room-single.jpg", "/images/bathroom.jpg", "/images/lobby.jpg"],
    description:
      "A beautifully kept single room designed for deep rest and easy work. Cool air conditioning, a comfortable bed, flat-screen TV and a private bathroom with free toiletries — everything the solo traveller needs, minutes from Takoradi's commercial heart.",
    amenities: [
      "Air conditioning",
      "Flat-screen TV",
      "Private bathroom",
      "Free toiletries",
      "Daily housekeeping",
      "Free high-speed Wi-Fi",
      "Free breakfast included",
      "24-hour front desk",
    ],
    idealFor: "Solo travellers & business guests",
    note: "Single rooms are among the hotel's listed room categories. Occupancy for your party is confirmed at booking.",
  },
  {
    id: "extended",
    name: "Extended-Stay Room with Kitchenette",
    tagline: "Stay longer, live easier",
    image: "/images/kitchen.jpg",
    gallery: ["/images/kitchen.jpg", "/images/room-family.jpg", "/images/bathroom.jpg"],
    description:
      "Planning a longer visit to Takoradi? Selected rooms at Thy Favour Hotel offer kitchen facilities, giving you the freedom to prepare your own meals alongside full hotel comfort — daily housekeeping, free breakfast and room service whenever you want them.",
    amenities: [
      "Kitchen facilities (selected rooms)",
      "Air conditioning",
      "Flat-screen TV",
      "Private bathroom",
      "Free toiletries",
      "Daily housekeeping",
      "Free high-speed Wi-Fi",
      "Free breakfast included",
    ],
    idealFor: "Long stays, families & relocations",
    note: "Kitchens are available in selected rooms only — please confirm a kitchenette room when you book.",
  },
];

export interface GalleryItem {
  src: string;
  alt: string;
  category: string;
}

export const GALLERY: GalleryItem[] = [
  { src: "/images/hero.jpg", alt: "Thy Favour Hotel exterior glowing at dusk in Anaji, Takoradi", category: "Exterior" },
  { src: "/images/pool.jpg", alt: "Outdoor swimming pool at Thy Favour Hotel at twilight", category: "Pool" },
  { src: "/images/room-double.jpg", alt: "Double room with king bed, warm lighting and flat-screen TV", category: "Rooms" },
  { src: "/images/room-single.jpg", alt: "Single room with comfortable bed and modern furnishings", category: "Rooms" },
  { src: "/images/room-family.jpg", alt: "Spacious room with generous bedding and seating area", category: "Rooms" },
  { src: "/images/dining.jpg", alt: "Restaurant dining room set for evening service", category: "Dining" },
  { src: "/images/breakfast.jpg", alt: "Fresh breakfast spread served at the hotel restaurant", category: "Dining" },
  { src: "/images/bar.jpg", alt: "Hotel bar with warm ambient lighting", category: "Dining" },
  { src: "/images/lobby.jpg", alt: "Hotel reception and lobby with warm welcome lighting", category: "Interior" },
  { src: "/images/bathroom.jpg", alt: "Private bathroom with walk-in shower and gold fixtures", category: "Interior" },
  { src: "/images/kitchen.jpg", alt: "Kitchenette available in selected rooms", category: "Facilities" },
  { src: "/images/terrace.jpg", alt: "Outdoor terrace dining area at sunset", category: "Facilities" },
];

export const GALLERY_CATS = ["All", "Rooms", "Exterior", "Pool", "Dining", "Interior", "Facilities"];

export interface Attraction {
  name: string;
  detail: string;
  distance: string;
  maps: string;
}

export const ATTRACTIONS: Attraction[] = [
  {
    name: "Bisa Aberwa Museum",
    detail:
      "One of Africa's celebrated private museums of African art and heritage, located close to the hotel.",
    distance: "Nearby · short drive",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("Bisa Aberwa Museum, Takoradi, Ghana"),
  },
  {
    name: "Takoradi Market Circle",
    detail:
      "The beating commercial heart of the oil city — fabrics, craft, produce and everyday Ghanaian life.",
    distance: "≈ 4.1 km from hotel",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("Takoradi Market Circle, Ghana"),
  },
  {
    name: "Takoradi Airport (TDI)",
    detail:
      "Quick, easy arrivals and departures with the hotel's airport shuttle and transfer service.",
    distance: "≈ 3.1 miles from hotel",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("Takoradi Airport, Ghana"),
  },
];

export function roomName(id: string): string {
  return ROOMS.find((r) => r.id === id)?.name ?? "Best available room";
}

export function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function nightsBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const ms =
    new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime();
  return Math.max(0, Math.round(ms / 86400000));
}
