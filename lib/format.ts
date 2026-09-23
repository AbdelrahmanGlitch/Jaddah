import type { Currency, Lang } from "./types";

const locale = (lang: Lang) => (lang === "ar" ? "ar-EG-u-nu-latn" : "en-GB");

const currencyLabel: Record<Currency, { en: string; ar: string }> = {
  EGP: { en: "EGP", ar: "ج.م" },
  SAR: { en: "SAR", ar: "ر.س" },
  USD: { en: "USD", ar: "دولار" },
  AED: { en: "AED", ar: "د.إ" },
};

export function formatNumber(value: number, lang: Lang) {
  return new Intl.NumberFormat(locale(lang)).format(value);
}

export function formatCurrencyLabel(currency: Currency, lang: Lang) {
  return currencyLabel[currency][lang];
}

/** Parse YYYY-MM-DD as a local calendar date (avoids timezone shifts). */
function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(iso: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Intl.DateTimeFormat(locale(lang), opts).format(parseDate(iso));
}

export function formatDateShort(iso: string, lang: Lang) {
  return formatDate(iso, lang, { day: "numeric", month: "short" });
}

/** "2026-10" style key used by the departure-month filter */
export function monthKey(iso: string) {
  return iso.slice(0, 7);
}

export function formatMonthKey(key: string, lang: Lang) {
  return formatDate(`${key}-01`, lang, { month: "long", year: "numeric" });
}

/** Format a "MM-DD" departure (no year is shown or assumed). */
export function formatMonthDay(md: string, lang: Lang) {
  const [m, d] = md.split("-").map(Number);
  // Year 2000 is only a carrier for Intl formatting (leap year, so 02-29 is valid); it is never displayed.
  return new Intl.DateTimeFormat(locale(lang), { day: "numeric", month: "short" }).format(new Date(2000, m - 1, d));
}

/** "07" → "July" */
export function formatMonthName(mm: string, lang: Lang) {
  return new Intl.DateTimeFormat(locale(lang), { month: "long" }).format(new Date(2000, Number(mm) - 1, 1));
}

/** Count + unit with correct Arabic plural forms. */
export function countLabel(n: number, unit: "day" | "night", lang: Lang) {
  if (lang === "en") return `${n} ${unit === "day" ? (n === 1 ? "Day" : "Days") : n === 1 ? "Night" : "Nights"}`;
  const forms = unit === "day" ? { one: "يوم", few: "أيام", many: "يومًا" } : { one: "ليلة", few: "ليالٍ", many: "ليلة" };
  if (n === 1) return `${forms.one} واحد`.replace("ليلة واحد", "ليلة واحدة");
  if (n === 2) return unit === "day" ? "يومان" : "ليلتان";
  return `${n} ${n <= 10 ? forms.few : forms.many}`;
}
