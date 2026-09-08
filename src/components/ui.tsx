import { useEffect, useRef, useState, type ReactNode } from "react";

/* Scroll-reveal wrapper: fades/slides content in when it enters the viewport.
   Respects prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Editorial section heading with eyebrow + serif title + gold rule */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      <p
        className={`text-[0.72rem] font-bold uppercase tracking-[0.35em] text-[#d3ab63] ${
          centered ? "" : ""
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-[#f6efe0] sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}{" "}
        {accent && (
          <em className="gold-text not-italic" style={{ fontStyle: "italic" }}>
            {accent}
          </em>
        )}
      </h2>
      <div
        className={`gold-hr mt-6 w-40 ${centered ? "mx-auto" : ""}`}
        aria-hidden="true"
      />
      {sub && (
        <p
          className={`mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-[#b9b9c6] ${
            centered ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* Subtle 3D tilt for cards (desktop pointers only, reduced-motion safe) */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${(-py * max).toFixed(
          2
        )}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);

  return ref;
}
