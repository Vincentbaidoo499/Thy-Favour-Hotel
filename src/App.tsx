import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Rooms from "./components/Rooms";
import RoomModal from "./components/RoomModal";
import Dining from "./components/Dining";
import Amenities from "./components/Amenities";
import Pool from "./components/Pool";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Location from "./components/Location";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import BookingWizard from "./components/BookingWizard";
import Footer from "./components/Footer";
import { EMPTY_DRAFT, type BookingDraft, type Room } from "./lib/data";

export default function App() {
  const [draft, setDraft] = useState<BookingDraft>(EMPTY_DRAFT);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  const openBooking = () => {
    setActiveRoom(null);
    setBookingOpen(true);
  };

  const bookRoom = (roomId: string) => {
    setDraft({ ...draft, roomId });
    setActiveRoom(null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-[#f6efe0]">
      <a
        href="#rooms"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#e9cf9a] focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-black"
      >
        Skip to content
      </a>
      <Navbar onBook={openBooking} />
      <main>
        <Hero draft={draft} setDraft={setDraft} onBook={openBooking} />
        <Rooms onOpenRoom={setActiveRoom} onBookRoom={bookRoom} />
        <Dining />
        <Amenities />
        <Pool onBook={openBooking} />
        <Experiences onBook={openBooking} />
        <Gallery />
        <About onBook={openBooking} />
        <Location onBook={openBooking} />
        <Reviews />
        <Contact />
      </main>
      <div className="h-20 sm:hidden" aria-hidden="true" />
      <Footer onBook={openBooking} />
      <RoomModal
        room={activeRoom}
        onClose={() => setActiveRoom(null)}
        onBook={bookRoom}
      />
      <BookingWizard
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        draft={draft}
        setDraft={setDraft}
      />
    </div>
  );
}
