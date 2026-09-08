import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand, LayoutGrid } from "lucide-react";
import { GALLERY, GALLERY_CATS } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const items = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat)),
    [cat]
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  return (
    <section id="gallery" className="relative scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8" aria-label="Photo gallery">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Step inside"
          title="The Hotel in"
          accent="Pictures"
          sub="Explore rooms, the pool, dining and shared spaces. Tap any photo for a fullscreen view — swipe on mobile, or use arrow keys on desktop."
        />

        {/* Category filter */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Gallery categories">
            <LayoutGrid size={15} className="mr-1 text-[#d3ab63]" />
            {GALLERY_CATS.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => {
                  setCat(c);
                  setLightbox(null);
                }}
                className={`rounded-full px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.14em] transition-all ${
                  cat === c
                    ? "bg-gradient-to-r from-[#f0d9a0] to-[#c69a4b] text-[#161005] shadow-[0_8px_24px_-8px_rgba(211,171,99,0.7)]"
                    : "border border-[rgba(211,171,99,0.3)] bg-black/30 text-[#cfcfda] hover:border-[rgba(233,207,154,0.7)] hover:text-[#f1ddab]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Mosaic grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal
              key={g.src + g.category}
              delay={(i % 4) * 80}
              y={20}
              className={i % 7 === 0 ? "col-span-2 row-span-2" : ""}
            >
              <button
                onClick={() => setLightbox(i)}
                className={`img-frame group relative block w-full overflow-hidden rounded-2xl border border-[rgba(211,171,99,0.18)] ${
                  i % 7 === 0 ? "aspect-square h-full" : "aspect-[4/3]"
                }`}
                aria-label={`View fullscreen: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-full border border-[rgba(233,207,154,0.5)] bg-black/55 px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.18em] text-[#f1ddab] backdrop-blur-md">
                  {g.category}
                </span>
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-[#f1ddab] opacity-0 backdrop-blur-md transition-all group-hover:opacity-100">
                  <Expand size={16} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-[#8b8b98]">
          Photography shown here is illustrative of the hotel's verified room categories and facilities.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-[85] flex flex-col bg-black/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen photo viewer"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e9cf9a]">
              {lightbox + 1} / {items.length} · {items[lightbox].category}
            </p>
            <button
              onClick={close}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] text-[#f1ddab] hover:bg-white/10"
              aria-label="Close fullscreen viewer"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-2 sm:px-16">
            {items.map((g, i) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                className={`max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl transition-all duration-500 ${
                  i === lightbox
                    ? "relative opacity-100 scale-100"
                    : "pointer-events-none absolute opacity-0 scale-95"
                }`}
                draggable={false}
              />
            ))}
            <button
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] bg-black/60 text-[#f1ddab] backdrop-blur-md hover:bg-black/85 sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] bg-black/60 text-[#f1ddab] backdrop-blur-md hover:bg-black/85 sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </div>
          <p className="px-6 pb-6 text-center text-sm text-[#d8d3c4]">
            {items[lightbox].alt}
          </p>
          {/* Thumbnails */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-6 sm:justify-center">
            {items.map((g, i) => (
              <button
                key={g.src}
                onClick={() => setLightbox(i)}
                aria-label={`View photo ${i + 1}`}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === lightbox ? "border-[#e9cf9a]" : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img src={g.src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
