"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Minus, Plus, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { trips } from "@/data/trips";
import { chatLink } from "@/data/company";
import { formatDate } from "@/lib/format";
import { ChatIcon } from "@/components/ui/ChatIcon";

type FormState = {
  fullName: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  email: string;
  tripId: string;
  travelers: number;
  date: string;
  message: string;
};

type Errors = Partial<Record<"fullName" | "phone" | "email" | "whatsapp", string>>;

const CUSTOM = "custom";

/**
 * UI-ONLY BOOKING FORM — nothing is sent anywhere.
 * On submit it validates, simulates a short delay and shows a success modal.
 */
export function BookingForm({ defaultTripId = "", className }: { defaultTripId?: string; className?: string }) {
  const { t, l, lang } = useLang();
  const uid = useId();
  const initial: FormState = {
    fullName: "",
    phone: "",
    whatsapp: "",
    sameAsPhone: true,
    email: "",
    tripId: defaultTripId,
    travelers: 2,
    date: "",
    message: "",
  };
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (f: FormState): Errors => {
    const e: Errors = {};
    const phoneOk = (v: string) => v.replace(/[^\d]/g, "").length >= 8;
    if (!f.fullName.trim()) e.fullName = t.booking.required;
    if (!f.phone.trim()) e.phone = t.booking.required;
    else if (!phoneOk(f.phone)) e.phone = t.booking.invalidPhone;
    if (!f.sameAsPhone && f.whatsapp.trim() && !phoneOk(f.whatsapp)) e.whatsapp = t.booking.invalidPhone;
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = t.booking.invalidEmail;
    return e;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    // Simulated submission — demo only, no network request.
    window.setTimeout(() => {
      setSubmitted(form);
      setStatus("success");
    }, 1100);
  };

  const reset = () => {
    setForm(initial);
    setSubmitted(null);
    setStatus("idle");
  };

  const selectedTrip = trips.find((tr) => tr.id === submitted?.tripId);
  const today = new Date().toISOString().slice(0, 10);
  const fid = (name: string) => `${uid}-${name}`;

  const chatMessage = selectedTrip ? `${t.booking.eyebrow}: ${l(selectedTrip.title)}` : t.booking.eyebrow;

  return (
    <>
      <form onSubmit={onSubmit} noValidate className={cn("grid gap-5 sm:grid-cols-2", className)}>
        <Field id={fid("name")} label={t.booking.fullName} error={errors.fullName} className="sm:col-span-2">
          <input id={fid("name")} className="field" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} aria-invalid={!!errors.fullName} />
        </Field>

        <Field id={fid("phone")} label={t.booking.phone} error={errors.phone}>
          <input id={fid("phone")} className="field" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
        </Field>

        <Field
          id={fid("wa")}
          label={t.booking.whatsapp}
          error={errors.whatsapp}
          aside={
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
              <input type="checkbox" className="size-3.5 accent-ocean" checked={form.sameAsPhone} onChange={(e) => set("sameAsPhone", e.target.checked)} />
              {t.booking.sameAsPhone}
            </label>
          }
        >
          <input
            id={fid("wa")}
            className="field disabled:bg-mist disabled:text-muted"
            type="tel"
            inputMode="tel"
            dir="ltr"
            disabled={form.sameAsPhone}
            value={form.sameAsPhone ? form.phone : form.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
          />
        </Field>

        <Field id={fid("email")} label={t.booking.email} optional={t.booking.optional} error={errors.email} className="sm:col-span-2">
          <input id={fid("email")} className="field" type="email" dir="ltr" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
        </Field>

        <Field id={fid("trip")} label={t.booking.trip} className="sm:col-span-2">
          <select id={fid("trip")} className="field select-chevron cursor-pointer" value={form.tripId} onChange={(e) => set("tripId", e.target.value)}>
            <option value="">{t.booking.chooseTrip}</option>
            {trips.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {l(tr.title)}
              </option>
            ))}
            <option value={CUSTOM}>{t.booking.customTrip}</option>
          </select>
        </Field>

        <Field id={fid("travelers")} label={t.booking.travelers}>
          <div className="flex items-center rounded-md border border-line bg-white">
            <button type="button" onClick={() => set("travelers", Math.max(1, form.travelers - 1))} className="grid size-[50px] place-items-center text-muted transition hover:text-navy-900" aria-label="−">
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
            <button type="button" onClick={() => set("travelers", Math.min(50, form.travelers + 1))} className="grid size-[50px] place-items-center text-muted transition hover:text-navy-900" aria-label="+">
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
          <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full py-4 text-[15px]">
            {status === "sending" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t.booking.sending}
              </>
            ) : (
              <>
                {t.booking.submit}
                <Send className="size-4 rtl:-scale-x-100" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success modal */}
      <AnimatePresence>
        {status === "success" && submitted && (
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
                  className="mx-auto grid size-16 place-items-center rounded-full bg-teal text-navy-950"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
                >
                  <motion.span initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                    <Check className="size-8" strokeWidth={2.5} />
                  </motion.span>
                </motion.span>
                <h3 id={fid("success")} className="mt-6 text-2xl leading-snug font-semibold text-balance">
                  {t.booking.successTitle}
                </h3>
                <p className="mt-3 text-sm text-white/70">{t.booking.successText}</p>
              </div>

              <div className="px-8 py-7">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">{t.booking.successSummary}</p>
                <dl className="mt-4 divide-y divide-line text-sm">
                  <Row label={t.booking.fullName} value={submitted.fullName} />
                  <Row label={t.booking.trip} value={selectedTrip ? l(selectedTrip.title) : t.booking.customTrip} />
                  <Row label={t.booking.travelers} value={String(submitted.travelers)} />
                  {submitted.date && <Row label={t.booking.date} value={formatDate(submitted.date, lang)} />}
                </dl>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <a href={chatLink(chatMessage).href} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                    <ChatIcon className="size-4" />
                    {t.booking.chat}
                  </a>
                  <button type="button" onClick={reset} className="btn btn-outline">
                    {t.booking.done}
                  </button>
                </div>
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
  aside,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-semibold text-navy-900">
          {label}
          {optional && <span className="ms-1.5 font-normal text-muted">({optional})</span>}
        </label>
        {aside}
      </div>
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
