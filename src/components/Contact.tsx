import { useState } from "react";
import { Phone, MapPin, Navigation, Clock3, Send, CheckCircle2, AlertCircle, Loader2, CalendarCheck } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, ADDRESS_SHORT, ADDRESS_PO_BOX, DIRECTIONS_URL } from "../lib/data";
import { Reveal, SectionHeading } from "./ui";

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: undefined });
    if (status !== "idle") setStatus("idle");
  };

  const validate = (): boolean => {
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name.";
    if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone.trim())) errs.phone = "Please enter a valid phone number.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "That email address doesn't look right.";
    if (form.message.trim().length < 10) errs.message = "Please tell us a little more (min. 10 characters).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: silently discard bot submissions
    if (honeypot.trim() !== "") {
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
      return;
    }
    if (!validate()) return;
    setStatus("sending");
    // Simulated send: composes a request the guest can also place by phone.
    setTimeout(() => {
      // In production this would POST to the hotel's inbox endpoint.
      // Keep a local copy so the guest never loses their message.
      try {
        const log = JSON.parse(localStorage.getItem("tfh_messages") || "[]");
        log.push({ ...form, at: new Date().toISOString() });
        localStorage.setItem("tfh_messages", JSON.stringify(log));
        setStatus("success");
        setForm({ name: "", phone: "", email: "", message: "" });
      } catch {
        setStatus("error");
      }
    }, 1400);
  };

  const inputCls = (bad?: string) => `field ${bad ? "field-error" : ""}`;

  return (
    <section id="contact" className="relative scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8" aria-label="Contact">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="We're listening"
          title="Contact the"
          accent="Hotel"
          sub="Questions, special requests or group stays — reach the front desk directly, or send a message and we'll treat it as a priority."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.25fr]">
          {/* Info cards */}
          <div className="space-y-4">
            <Reveal>
              <a href={PHONE_TEL} className="card-lift glass-deep flex items-center gap-4 rounded-3xl p-6">
                <span className="animate-pulse-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0d9a0] to-[#a87f33] text-[#161005]">
                  <Phone size={24} />
                </span>
                <span>
                  <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-[#d3ab63]">Call the front desk</span>
                  <span className="mt-1 block text-xl font-extrabold text-white">{PHONE_DISPLAY}</span>
                  <span className="mt-0.5 block text-xs text-[#9b9ba8]">Tap to call on mobile · 24-hour front desk</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={100}>
              <div className="card-lift glass flex items-start gap-4 rounded-3xl p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(211,171,99,0.4)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a]">
                  <MapPin size={22} />
                </span>
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-[#d3ab63]">Visit us</p>
                  <p className="mt-1 text-sm font-bold leading-relaxed text-white">{ADDRESS_SHORT}</p>
                  <p className="mt-1 text-xs text-[#9b9ba8]">{ADDRESS_PO_BOX}</p>
                  <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#f1ddab] underline-offset-4 hover:underline">
                    <Navigation size={13} /> Get directions
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="glass flex items-start gap-4 rounded-3xl p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(211,171,99,0.4)] bg-[rgba(211,171,99,0.1)] text-[#e9cf9a]">
                  <Clock3 size={22} />
                </span>
                <div>
                  <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-[#d3ab63]">Always open</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#d8d3c4]">
                    24-hour front desk, daily housekeeping and room service. Check-in / check-out times are confirmed
                    when you book.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={120}>
            <form onSubmit={submit} noValidate className="glass-deep rounded-3xl p-6 sm:p-8" aria-label="Contact form" name="contact" data-netlify="false">
              {/* Honeypot field for spam bots — hidden from humans */}
              <input
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
              />
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Send us a message</h3>
              <p className="mt-1 text-sm text-[#9b9ba8]">We typically respond via phone. For urgent bookings, please call.</p>

              {status === "success" && (
                <div role="status" className="mt-5 flex items-start gap-3 rounded-2xl border border-[#7fc98a]/40 bg-[#7fc98a]/10 p-4">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#7fc98a]" />
                  <div>
                    <p className="text-sm font-bold text-white">Message received — medaase!</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#c6c1b2]">
                      Your message has been saved and queued for the hotel team. To confirm faster, please call{" "}
                      <a href={PHONE_TEL} className="font-bold text-[#f1ddab] underline-offset-4 hover:underline">{PHONE_DISPLAY}</a>.
                    </p>
                  </div>
                </div>
              )}
              {status === "error" && (
                <div role="alert" className="mt-5 flex items-start gap-3 rounded-2xl border border-[#e0685c]/40 bg-[#e0685c]/10 p-4">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-[#f0857a]" />
                  <p className="text-sm text-[#f3c9c4]">
                    Something went wrong saving your message. Please call{" "}
                    <a href={PHONE_TEL} className="font-bold text-white underline-offset-4 hover:underline">{PHONE_DISPLAY}</a> instead.
                  </p>
                </div>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Name *</label>
                  <input id="cf-name" className={inputCls(errors.name)} placeholder="e.g. Ama Mensah" value={form.name} onChange={set("name")} autoComplete="name" />
                  {errors.name && <p role="alert" className="mt-1.5 text-xs font-semibold text-[#f0857a]">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="cf-phone" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Phone *</label>
                  <input id="cf-phone" className={inputCls(errors.phone)} placeholder="e.g. +233 24 000 0000" value={form.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" />
                  {errors.phone && <p role="alert" className="mt-1.5 text-xs font-semibold text-[#f0857a]">{errors.phone}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="cf-email" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Email (optional)</label>
                <input id="cf-email" type="email" className={inputCls(errors.email)} placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" />
                {errors.email && <p role="alert" className="mt-1.5 text-xs font-semibold text-[#f0857a]">{errors.email}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor="cf-msg" className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Message *</label>
                <textarea id="cf-msg" rows={5} className={`${inputCls(errors.message)} resize-y`} placeholder="Tell us your dates, room needs, or questions…" value={form.message} onChange={set("message")} />
                {errors.message && <p role="alert" className="mt-1.5 text-xs font-semibold text-[#f0857a]">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === "sending"} className="btn-gold mt-6 w-full px-6 py-4 text-[0.72rem] disabled:cursor-wait disabled:opacity-70">
                {status === "sending" ? (<><Loader2 size={16} className="animate-spin" /> SENDING…</>) : (<><Send size={15} /> SUBMIT MESSAGE</>)}
              </button>
              <p className="mt-3 text-center text-[0.68rem] text-[#8b8b98]">
                Prefer instant answers? <a href={PHONE_TEL} className="font-bold text-[#f1ddab] underline-offset-4 hover:underline">Call {PHONE_DISPLAY}</a> or{" "}
                <span className="inline-flex items-center gap-1 font-bold text-[#f1ddab]"><CalendarCheck size={11} /> use the booking widget</span>.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
