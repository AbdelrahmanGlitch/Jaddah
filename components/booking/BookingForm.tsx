"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Phone, Plus, Send, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { trips } from "@/data/trips";
import { destinations } from "@/data/destinations";
import { chatLink, company } from "@/data/company";
import { formatDate } from "@/lib/format";
import { PREFILL_EVENT, type BookingPrefill, type BookingType } from "@/lib/booking";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

type FormState = {
  fullName: string;
  phone: string;
  tripType: BookingType | "";
  /** Destination id, OTHER, or free text for flights */
  destination: string;
  travelers: number;
  date: string;
  message: string;
  tripId: string;
};

type Errors = Partial<Record<"fullName" | "phone", string>>;

const OTHER = "other";
const TYPES: BookingType[] = ["hotel", "flight", "domestic", "other"];

/**
 * BOOKING REQUEST FORM — there is no backend.
 * On submit it validates, then opens WhatsApp to LAVIE TOURS' booking line
 * with every field written into the message, ready to send.
 */
export function BookingForm({ defaultTripId = "", className }: { defaultTripId?: string; className?: string }) {
  const { t, l, lang } = useLang();
  const uid = useId();
  const defaultTrip = trips.find((tr) => tr.id === defaultTripId);
  const initial: FormState = {
    fullName: "",
    phone: "",
    tripType: defaultTrip ? "hotel" : "",
    destination: defaultTrip?.destinationId ?? "",
    travelers: 2,
    date: "",
    message: "",
    tripId: defaultTripId,
  };
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ form: FormState; href: string } | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Buttons elsewhere on the page (services, flights) can pre-select fields.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { type, destination, tripId } = (e as CustomEvent<BookingPrefill>).detail;
      setForm((f) => ({
        ...f,
        tripType: type ?? f.tripType,
        destination: destination ?? (type && type !== f.tripType ? "" : f.destination),
        tripId: tripId ?? (type ? "" : f.tripId),
      }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const isFlight = form.tripType === "flight";
  const selectedTrip = trips.find((tr) => tr.id === form.tripId);

  const destinationLabel = (f: FormState) => {
    if (f.tripType === "flight") return f.destination.trim();
    if (f.destination === OTHER) return t.booking.otherDestination;
    const d = destinations.find((x) => x.id === f.destination);
    return d ? l(d.name) : "";
  };

  const buildMessage = (f: FormState) => {
    const trip = trips.find((tr) => tr.id === f.tripId);
    const lines = [
      `*${t.booking.waHeader}*`,
      `${t.booking.fullName}: ${f.fullName.trim()}`,
      `${t.booking.phone}: ${f.phone.trim()}`,
      trip && `${t.booking.selectedOffer}: ${l(trip.title)}`,
      f.tripType && `${t.booking.tripType}: ${t.booking.tripTypes[f.tripType]}`,
      destinationLabel(f) && `${t.booking.destination}: ${destinationLabel(f)}`,
      `${t.booking.travelers}: ${f.travelers}`,
      f.date && `${t.booking.date}: ${formatDate(f.date, lang)}`,
      f.message.trim() && `${t.booking.message}: ${f.message.trim()}`,
    ];
    return lines.filter(Boolean).join("\n");
  };

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    if (!f.fullName.trim()) e.fullName = t.booking.required;
    if (!f.phone.trim()) e.phone = t.booking.required;
    else if (f.phone.replace(/[^\d]/g, "").length < 8) e.phone = t.booking.invalidPhone;
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    const href = chatLink(buildMessage(form)).href;
    // Opened inside the submit handler so browsers treat it as a user action.
    window.open(href, "_blank", "noopener,noreferrer");
    setSent({ form, href });
  };

  const reset = () => {
    setForm(initial);
    setSent(null);
  };

  const today = new Date().toISOString().slice(0, 10);
  const fid = (name: string) => `${uid}-${name}`;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className={cn("grid gap-5 sm:grid-cols-2", className)}>
        {selectedTrip && (
          <div className="flex items-center justify-between gap-3 rounded-md border border-sun/40 bg-sand-50 px-4 py-3 sm:col-span-2">
            <p className="min-w-0 text-sm">
              <span className="text-muted">{t.booking.selectedOffer}: </span>
              <span className="font-semibold text-navy-900">{l(selectedTrip.title)}</span>
            </p>
            {!defaultTripId && (
              <button type="button" onClick={() => set("tripId", "")} className="grid size-7 shrink-0 place-items-center rounded-full text-muted hover:bg-white hover:text-navy-900" aria-label={t.nav.close}>
                <X className="size-4" />
              </button>
            )}
          </div>
        )}

        <Field id={fid("name")} label={t.booking.fullName} error={errors.fullName}>
          <input id={fid("name")} className="field" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} aria-invalid={!!errors.fullName} />
        </Field>

        <Field id={fid("phone")} label={t.booking.phone} error={errors.phone}>
          <input id={fid("phone")} className="field" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="01xxxxxxxxx" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
        </Field>

        <Field id={fid("type")} label={t.booking.tripType}>
          <select
            id={fid("type")}
            className="field select-chevron cursor-pointer"
            value={form.tripType}
            onChange={(e) => {
              const next = e.target.value as FormState["tripType"];
              // Flight destinations are free text; hotel destinations come from the list.
              setForm((f) => ({ ...f, tripType: next, destination: (next === "flight") !== (f.tripType === "flight") ? "" : f.destination }));
            }}
          >
            <option value="">—</option>
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {t.booking.tripTypes[type]}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fid("dest")} label={t.booking.destination}>
          {isFlight ? (
            <input id={fid("dest")} className="field" value={form.destination} onChange={(e) => set("destination", e.target.value)} />
          ) : (
            <select id={fid("dest")} className="field select-chevron cursor-pointer" value={form.destination} onChange={(e) => set("destination", e.target.value)}>
              <option value="">{t.booking.anyDestination}</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {l(d.name)}
                </option>
              ))}
              <option value={OTHER}>{t.booking.otherDestination}</option>
            </select>
          )}
        </Field>

        <Field id={fid("travelers")} label={t.booking.travelers}>
          <div className="flex items-center rounded-md border border-line bg-white">
            <button type="button" onClick={() => set("travelers", Math.max(1, form.travelers - 1))} className="grid size-[50px] place-items-center text-muted transition hover:text-navy-900" aria-label={t.booking.decrease}>
              <Minus className="size-4" />
            </button>
            <input
              id={fid("travelers")}
              type="number"
              min={1}
              max={50}
              className="w-full [appearance:textfield] bg-transparent text-center text-[15px] font-semibold text-navy-900 outline-none [&::-webkit-inner-spin-button]:appearance-none"
              value={form.travelers}
              onChange={(e) => set("travelers", Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
            />
            <button type="button" onClick={() => set("travelers", Math.min(50, form.travelers + 1))} className="grid size-[50px] place-items-center text-muted transition hover:text-navy-900" aria-label={t.booking.increase}>
              <Plus className="size-4" />
            </button>
          </div>
        </Field>

        <Field id={fid("date")} label={t.booking.date}>
          <input id={fid("date")} type="date" min={today} className="field" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </Field>

        <Field id={fid("msg")} label={t.booking.message} optional={t.booking.optional} className="sm:col-span-2">
          <textarea id={fid("msg")} rows={4} className="field resize-none" placeholder={t.booking.messagePlaceholder} value={form.message} onChange={(e) => set("message", e.target.value)} />
        </Field>

        <div className="sm:col-span-2">
          <button type="submit" className="btn btn-whatsapp w-full py-4 text-[15px]">
            <WhatsAppIcon className="size-5" />
            {t.booking.submit}
            <Send className="size-4 rtl:-scale-x-100" />
          </button>
        </div>
      </form>

      {/* Confirmation — WhatsApp has been opened with the request */}
      <AnimatePresence>
        {sent && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            role="dialog"
            aria-modal="true"
            aria-labelledby={fid("success")}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-t-2xl bg-white text-ink shadow-2xl sm:rounded-xl"
            >
              <div className="relative bg-navy-900 px-8 pt-10 pb-8 text-center text-white">
                <motion.span
                  className="mx-auto grid size-16 place-items-center rounded-full bg-[#25D366] text-navy-950"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
                >
                  <Check className="size-8" strokeWidth={2.5} />
                </motion.span>
                <h3 id={fid("success")} className="mt-6 text-2xl leading-snug font-semibold text-balance">
                  {t.booking.successTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{t.booking.successText}</p>
              </div>

              <div className="px-8 py-7">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">{t.booking.successSummary}</p>
                <dl className="mt-4 divide-y divide-line text-sm">
                  <Row label={t.booking.fullName} value={sent.form.fullName} />
                  {selectedTrip && <Row label={t.booking.selectedOffer} value={l(selectedTrip.title)} />}
                  {sent.form.tripType && <Row label={t.booking.tripType} value={t.booking.tripTypes[sent.form.tripType]} />}
                  {destinationLabel(sent.form) && <Row label={t.booking.destination} value={destinationLabel(sent.form)} />}
                  <Row label={t.booking.travelers} value={String(sent.form.travelers)} />
                  {sent.form.date && <Row label={t.booking.date} value={formatDate(sent.form.date, lang)} />}
                </dl>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href={sent.href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <WhatsAppIcon className="size-4" />
                    {t.booking.openWhatsapp}
                  </a>
                  <a href={`tel:${company.bookingLines[0]}`} className="btn btn-outline">
                    <Phone className="size-4" />
                    {t.booking.call}
                  </a>
                </div>
                <button type="button" onClick={reset} className="mt-3 w-full py-2 text-sm font-semibold text-muted hover:text-navy-900">
                  {t.booking.done}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-semibold text-navy-900">
        {label}
        {optional && <span className="ms-1.5 font-normal text-muted">({optional})</span>}
      </label>
      <div className={cn(error && "[&_.field]:border-red-400 [&_.field]:ring-red-100")}>{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs font-medium text-red-500">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2.5">
      <dt className="text-muted">{label}</dt>
      <dd className="text-end font-semibold text-navy-900">{value}</dd>
    </div>
  );
}
