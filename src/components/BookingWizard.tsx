import { useEffect, useMemo, useState } from "react";
import {
  X, ChevronLeft, ChevronRight, CalendarDays, Users, BedDouble,
  UserRound, ClipboardCheck, PartyPopper, Phone, Check, Pencil, Loader2, ShieldCheck,
} from "lucide-react";
import { ROOMS, PHONE_DISPLAY, PHONE_TEL, todayISO, fmtDate, nightsBetween, roomName, type BookingDraft } from "../lib/data";

const STEPS = [
  { n: 1, label: "Dates", icon: CalendarDays },
  { n: 2, label: "Guests", icon: Users },
  { n: 3, label: "Room", icon: BedDouble },
  { n: 4, label: "Details", icon: UserRound },
  { n: 5, label: "Review", icon: ClipboardCheck },
  { n: 6, label: "Done", icon: PartyPopper },
];

interface GuestInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  requests: string;
  agree: boolean;
}

const EMPTY_GUEST: GuestInfo = { firstName: "", lastName: "", phone: "", email: "", requests: "", agree: false };

export default function BookingWizard({
  open,
  onClose,
  draft,
  setDraft,
}: {
  open: boolean;
  onClose: () => void;
  draft: BookingDraft;
  setDraft: (d: BookingDraft) => void;
}) {
  const [step, setStep] = useState(1);
  const [guest, setGuest] = useState<GuestInfo>(EMPTY_GUEST);
  const [err, setErr] = useState("");
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");

  useEffect(() => {
    if (open) {
      setStep(1);
      setErr("");
      setSending(false);
      setRef("");
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  const nights = useMemo(() => nightsBetween(draft.checkIn, draft.checkOut), [draft]);
  const guests = draft.adults + draft.children;

  if (!open) return null;

  const set = (patch: Partial<BookingDraft>) => {
    setDraft({ ...draft, ...patch });
    setErr("");
  };
  const setG = (patch: Partial<GuestInfo>) => {
    setGuest({ ...guest, ...patch });
    setErr("");
  };

  const validStep = (s: number): boolean => {
    if (s === 1) {
      if (!draft.checkIn || !draft.checkOut) { setErr("Please choose both check-in and check-out dates."); return false; }
      if (draft.checkIn < todayISO()) { setErr("Check-in can't be in the past."); return false; }
      if (draft.checkOut <= draft.checkIn) { setErr("Check-out must be after check-in."); return false; }
      return true;
    }
    if (s === 2) {
      if (draft.adults < 1) { setErr("At least one adult is required."); return false; }
      if (guests > 8) { setErr("For parties above 8, please call the hotel directly so the team can arrange adjoining rooms."); return false; }
      return true;
    }
    if (s === 3) {
      if (!ROOMS.some((r) => r.id === draft.roomId)) { setErr("Please choose a room."); return false; }
      return true;
    }
    if (s === 4) {
      if (guest.firstName.trim().length < 2) { setErr("Please enter your first name."); return false; }
      if (guest.lastName.trim().length < 2) { setErr("Please enter your last name."); return false; }
      if (!/^[+\d][\d\s\-()]{6,}$/.test(guest.phone.trim())) { setErr("Please enter a valid phone number so the hotel can confirm."); return false; }
      if (guest.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) { setErr("That email address doesn't look right."); return false; }
      return true;
    }
    if (s === 5) {
      if (!guest.agree) { setErr("Please confirm you understand this is a booking request confirmed by phone."); return false; }
      return true;
    }
    return true;
  };

  const next = () => {
    if (!validStep(step)) return;
    setErr("");
    setStep((s) => Math.min(6, s + 1));
  };
  const back = () => {
    setErr("");
    setStep((s) => Math.max(1, s - 1));
  };

  const confirm = () => {
    if (!validStep(5)) return;
    setSending(true);
    setTimeout(() => {
      const reference = "TFH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      try {
        const log = JSON.parse(localStorage.getItem("tfh_bookings") || "[]");
        log.push({ ref: reference, draft, guest: { ...guest, agree: undefined }, at: new Date().toISOString() });
        localStorage.setItem("tfh_bookings", JSON.stringify(log));
      } catch { /* storage unavailable — still show confirmation */ }
      setRef(reference);
      setSending(false);
      setStep(6);
    }, 1500);
  };

  const counter = (label: string, value: number, min: number, max: number, onChange: (v: number) => void) => (
    <div className="flex items-center justify-between rounded-2xl border border-[rgba(211,171,99,0.25)] bg-black/30 px-5 py-4">
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-xs text-[#9b9ba8]">{label === "Adults" ? "Ages 13+" : "Ages 0–12"}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(211,171,99,0.45)] text-lg font-bold text-[#f1ddab] disabled:opacity-30" aria-label={`Fewer ${label.toLowerCase()}`}>−</button>
        <span className="w-6 text-center text-lg font-extrabold" aria-live="polite">{value}</span>
        <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(211,171,99,0.45)] text-lg font-bold text-[#f1ddab] disabled:opacity-30" aria-label={`More ${label.toLowerCase()}`}>+</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-label="Book your stay">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
      <div className="glass-deep relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(211,171,99,0.2)] px-5 py-4 sm:px-7">
          <div>
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#d3ab63]">Thy Favour Hotel</p>
            <h3 className="text-xl font-semibold sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>
              {step === 6 ? "Request received" : `Book your stay — step ${step} of 5`}
            </h3>
          </div>
          <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(233,207,154,0.5)] text-[#f1ddab] hover:bg-white/10" aria-label="Close booking">
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {step < 6 && (
          <div className="border-b border-[rgba(211,171,99,0.15)] px-5 py-4 sm:px-7">
            <div className="flex items-center justify-between gap-1">
              {STEPS.slice(0, 5).map((s) => (
                <button key={s.n} onClick={() => { if (s.n < step) setStep(s.n); }} className="flex flex-1 flex-col items-center gap-1.5" aria-label={`Go to step ${s.n}: ${s.label}`} disabled={s.n > step}>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all ${s.n < step ? "border-[#7fc98a] bg-[#7fc98a]/15 text-[#7fc98a]" : s.n === step ? "border-[#e9cf9a] bg-gradient-to-br from-[#f0d9a0] to-[#a87f33] text-[#161005]" : "border-[rgba(211,171,99,0.3)] text-[#8b8b98]"}`}>
                    {s.n < step ? <Check size={16} /> : <s.icon size={16} />}
                  </span>
                  <span className={`hidden text-[0.6rem] font-extrabold uppercase tracking-[0.14em] sm:block ${s.n === step ? "text-[#f1ddab]" : "text-[#8b8b98]"}`}>{s.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#9a742e] via-[#e9cf9a] to-[#d3ab63] transition-all duration-500" style={{ width: `${(step / 5) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
          {step === 1 && (
            <div>
              <h4 className="text-lg font-bold">When are you visiting?</h4>
              <p className="mt-1 text-sm text-[#9b9ba8]">Choose your dates — availability is confirmed by the hotel, never assumed.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Check-in *</span>
                  <input type="date" className="field" min={todayISO()} value={draft.checkIn} onChange={(e) => set({ checkIn: e.target.value })} aria-label="Check-in date" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Check-out *</span>
                  <input type="date" className="field" min={draft.checkIn || todayISO()} value={draft.checkOut} onChange={(e) => set({ checkOut: e.target.value })} aria-label="Check-out date" />
                </label>
              </div>
              {nights > 0 && (
                <p className="mt-4 rounded-xl border border-[rgba(211,171,99,0.25)] bg-[rgba(211,171,99,0.08)] px-4 py-3 text-sm text-[#f1ddab]">
                  {fmtDate(draft.checkIn)} → {fmtDate(draft.checkOut)} · <strong>{nights} night{nights !== 1 ? "s" : ""}</strong>
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="text-lg font-bold">Who's coming?</h4>
              <p className="mt-1 text-sm text-[#9b9ba8]">Tell us your party size so the hotel can prepare the right room.</p>
              <div className="mt-5 space-y-3">
                {counter("Adults", draft.adults, 1, 6, (v) => set({ adults: v }))}
                {counter("Children", draft.children, 0, 4, (v) => set({ children: v }))}
              </div>
              <p className="mt-4 text-sm text-[#f1ddab]">Total guests: <strong>{guests}</strong></p>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="text-lg font-bold">Choose your room</h4>
              <p className="mt-1 text-sm text-[#9b9ba8]">Verified room categories only. Rates are confirmed by phone — we never invent prices.</p>
              <div className="mt-5 space-y-3">
                {ROOMS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => set({ roomId: r.id })}
                    aria-pressed={draft.roomId === r.id}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all ${
                      draft.roomId === r.id
                        ? "border-[#e9cf9a] bg-[rgba(211,171,99,0.12)] shadow-[0_0_30px_-10px_rgba(211,171,99,0.5)]"
                        : "border-[rgba(211,171,99,0.22)] bg-black/30 hover:border-[rgba(233,207,154,0.55)]"
                    }`}
                  >
                    <img src={r.image} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" loading="lazy" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-extrabold text-white">{r.name}</span>
                      <span className="mt-0.5 block text-xs text-[#d3ab63]">{r.tagline}</span>
                      <span className="mt-1 block truncate text-xs text-[#9b9ba8]">{r.idealFor}</span>
                    </span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${draft.roomId === r.id ? "border-[#e9cf9a] bg-[#e9cf9a] text-[#161005]" : "border-[rgba(211,171,99,0.4)] text-transparent"}`}>
                      <Check size={15} strokeWidth={3} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h4 className="text-lg font-bold">Your information</h4>
              <p className="mt-1 text-sm text-[#9b9ba8]">The hotel uses this to confirm your request. Nothing is shared elsewhere.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">First name *</span>
                  <input className="field" placeholder="e.g. Ama" value={guest.firstName} onChange={(e) => setG({ firstName: e.target.value })} autoComplete="given-name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Last name *</span>
                  <input className="field" placeholder="e.g. Mensah" value={guest.lastName} onChange={(e) => setG({ lastName: e.target.value })} autoComplete="family-name" />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Phone *</span>
                  <input className="field" placeholder="e.g. +233 24 000 0000" value={guest.phone} onChange={(e) => setG({ phone: e.target.value })} inputMode="tel" autoComplete="tel" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Email (optional)</span>
                  <input type="email" className="field" placeholder="you@example.com" value={guest.email} onChange={(e) => setG({ email: e.target.value })} autoComplete="email" />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#b9b9c6]">Special requests (optional)</span>
                <textarea rows={3} className="field resize-y" placeholder="Early check-in, ground floor, kitchenette room…" value={guest.requests} onChange={(e) => setG({ requests: e.target.value })} />
              </label>
            </div>
          )}

          {step === 5 && (
            <div>
              <h4 className="text-lg font-bold">Review your request</h4>
              <p className="mt-1 text-sm text-[#9b9ba8]">Check everything before sending. Tap the pencil to edit a section.</p>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  { label: "Dates", value: `${fmtDate(draft.checkIn)} → ${fmtDate(draft.checkOut)} · ${nights} night${nights !== 1 ? "s" : ""}`, go: 1 },
                  { label: "Guests", value: `${draft.adults} adult${draft.adults !== 1 ? "s" : ""}${draft.children ? `, ${draft.children} child${draft.children !== 1 ? "ren" : ""}` : ""}`, go: 2 },
                  { label: "Room", value: roomName(draft.roomId), go: 3 },
                  { label: "Guest", value: `${guest.firstName} ${guest.lastName} · ${guest.phone}${guest.email ? ` · ${guest.email}` : ""}${guest.requests ? ` · “${guest.requests}”` : ""}`, go: 4 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 rounded-2xl border border-[rgba(211,171,99,0.22)] bg-black/30 px-4 py-3.5">
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-[#d3ab63]">{row.label}</p>
                      <p className="mt-0.5 line-clamp-2 text-white">{row.value}</p>
                    </div>
                    <button onClick={() => setStep(row.go)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(211,171,99,0.4)] text-[#f1ddab] hover:bg-white/10" aria-label={`Edit ${row.label}`}>
                      <Pencil size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[rgba(211,171,99,0.25)] bg-[rgba(211,171,99,0.06)] p-4">
                <input type="checkbox" checked={guest.agree} onChange={(e) => setG({ agree: e.target.checked })} className="mt-1 h-4 w-4 accent-[#d3ab63]" />
                <span className="text-xs leading-relaxed text-[#d8d3c4]">
                  I understand this is a <strong className="text-white">booking request, not an instant reservation</strong>.
                  Thy Favour Hotel will confirm availability and rates by phone at <strong className="text-white">{PHONE_DISPLAY}</strong>.
                </span>
              </label>
            </div>
          )}

          {step === 6 && (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#f0d9a0] to-[#a87f33] text-[#161005] shadow-[0_0_60px_-10px_rgba(211,171,99,0.8)]">
                <PartyPopper size={34} />
              </span>
              <h4 className="mt-5 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Medaase, {guest.firstName || "traveller"}!</h4>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#c6c1b2]">
                Your booking request has been recorded. Quote this reference when you call:
              </p>
              <p className="mx-auto mt-4 inline-block rounded-2xl border border-dashed border-[rgba(233,207,154,0.6)] bg-black/40 px-8 py-4 text-2xl font-extrabold tracking-[0.2em] text-[#f1ddab]" aria-live="polite">
                {ref}
              </p>
              <div className="mx-auto mt-4 max-w-md rounded-2xl border border-[rgba(211,171,99,0.25)] bg-black/30 p-4 text-left text-sm">
                <p className="text-[#d8d3c4]"><strong className="text-white">{roomName(draft.roomId)}</strong> · {fmtDate(draft.checkIn)} → {fmtDate(draft.checkOut)} · {nights} night{nights !== 1 ? "s" : ""} · {guests} guest{guests !== 1 ? "s" : ""}</p>
              </div>
              <p className="mx-auto mt-4 flex max-w-md items-start gap-2 rounded-2xl border border-[#7fc98a]/30 bg-[#7fc98a]/8 p-4 text-left text-xs leading-relaxed text-[#c6c1b2]">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#7fc98a]" />
                To finish: call <a href={PHONE_TEL} className="font-bold text-white underline-offset-4 hover:underline">{PHONE_DISPLAY}</a> and
                mention <strong>{ref}</strong>. The front desk confirms your room and rate — no online payment needed.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={PHONE_TEL} className="btn-gold px-8 py-4 text-[0.72rem]"><Phone size={16} /> CALL TO CONFIRM</a>
                <button onClick={onClose} className="btn-ghost px-8 py-4 text-[0.72rem]">DONE</button>
              </div>
            </div>
          )}

          {err && step < 6 && (
            <p role="alert" className="mt-4 rounded-xl border border-[#e0685c]/40 bg-[#e0685c]/10 px-4 py-3 text-xs font-semibold text-[#f3c9c4]">{err}</p>
          )}
        </div>

        {/* Footer nav */}
        {step < 6 && (
          <div className="flex items-center justify-between gap-3 border-t border-[rgba(211,171,99,0.2)] px-5 py-4 sm:px-7">
            <button onClick={step === 1 ? onClose : back} className="btn-ghost px-6 py-3 text-[0.68rem]">
              <ChevronLeft size={15} /> {step === 1 ? "CANCEL" : "BACK"}
            </button>
            {step < 5 ? (
              <button onClick={next} className="btn-gold px-8 py-3 text-[0.68rem]">
                CONTINUE <ChevronRight size={15} />
              </button>
            ) : (
              <button onClick={confirm} disabled={sending} className="btn-gold px-8 py-3 text-[0.68rem] disabled:cursor-wait disabled:opacity-70">
                {sending ? (<><Loader2 size={15} className="animate-spin" /> SENDING…</>) : (<><Check size={15} /> SEND REQUEST</>)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
