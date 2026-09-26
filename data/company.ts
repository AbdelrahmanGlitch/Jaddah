import type { Localized } from "@/lib/types";

/**
 * COMPANY CONFIGURATION — single source of truth for all LAVIE TOURS details.
 * ------------------------------------------------------------------
 * Source: the official Facebook page https://www.facebook.com/LAVIE55555
 * (page info + posts dated 17 May – 15 Jul 2026, checked 26 Sep 2026).
 *
 * VERIFIED on the Facebook page
 *   - Page name "La Vie travel", logo lockup "LAVIE TOURS", city: Cairo
 *   - Page description: "شركة سياحة داخلية وحجز تذاكر طيران"
 *   - Page phone: +20 10 09914432
 *   - Booking numbers ("للحجز و الاستعلام اتصال او واتس اب"):
 *     01009316766, 01003293097, 01001523504, 01009065570
 *   - Offices ("مقر الشركة"): Cairo — 28 عمارات العبور، صلاح سالم;
 *     Kafr El Sheikh — شارع ٤٧، عمارة الرئيسي، أمام مركز شرابي
 *   - Payment: bank account transfer, Vodafone Cash, InstaPay, valU installments
 *
 * NEEDS CONFIRMATION — deliberately NOT shown on the website
 *   - Cairo office floor: posts say both "الدور ال12" and "الدور ال ١٣"
 *   - Email reservation@lavietours-eg.com, phone 01277778973 and the
 *     New Nozha address (37 El Moarekh Mohamed Refaat) come from third-party
 *     listings and do not appear on the Facebook page
 *   - Hajj & Umrah, organized group trips, international trips: not advertised
 *     in the page description or any available post
 *   - Numbers printed only on a promo design (01146216715, 01550363673,
 *     01094377279, 01152396522) — not listed as booking lines in post text
 *
 * Placeholder values (e.g. "EMAIL_ADDRESS") are detected by `isConfigured()` —
 * while a field holds its placeholder, the website hides it.
 */

export const PLACEHOLDERS = ["PHONE_NUMBER", "WHATSAPP_NUMBER", "EMAIL_ADDRESS", "OFFICE_ADDRESS", "INSTAGRAM_URL"] as const;

export const company = {
  name: "LAVIE TOURS",
  displayName: { en: "LAVIE TOURS", ar: "لافي تورز" } satisfies Localized,
  /** Name of the Facebook page */
  pageName: "La Vie travel",

  /** Logo files (from the Facebook profile picture) */
  logo: {
    full: "/images/lavie/lavie-tours-logo.webp",
    mark: "/images/lavie/lavie-tours-mark.webp",
  },

  facebook: {
    username: "LAVIE55555",
    url: "https://www.facebook.com/LAVIE55555",
    messengerUrl: "https://m.me/LAVIE55555",
  },

  /** Booking lines — "call or WhatsApp" per every offer post */
  bookingLines: ["01009316766", "01003293097", "01001523504", "01009065570"],
  /** Phone listed in the Facebook page info */
  pagePhone: "01009914432",

  /** Default WhatsApp line (first booking line), digits incl. country code */
  whatsapp: "201009316766",
  /** NEEDS CONFIRMATION — see header */
  email: "EMAIL_ADDRESS",
  /** No Instagram account found — never invent one */
  instagram: "INSTAGRAM_URL",

  offices: [
    {
      city: { en: "Cairo", ar: "القاهرة" },
      address: { en: "28 El Obour Buildings, Salah Salem Street", ar: "٢٨ عمارات العبور، شارع صلاح سالم" },
    },
    {
      city: { en: "Kafr El Sheikh", ar: "كفر الشيخ" },
      address: { en: "47 Street, Al-Raeesi Building, in front of Sharabi Center", ar: "شارع ٤٧، عمارة الرئيسي، أمام مركز شرابي" },
    },
  ] satisfies { city: Localized; address: Localized }[],

  /** Payment methods listed in the offer posts */
  payment: [
    { en: "Bank transfer", ar: "تحويل على حساباتنا البنكية" },
    { en: "Vodafone Cash", ar: "فودافون كاش" },
    { en: "InstaPay", ar: "إنستاباي" },
    { en: "valU installments", ar: "تقسيط valU" },
  ] satisfies Localized[],

  /** Built only from the page description and posts */
  description: {
    en: "LAVIE TOURS is an Egyptian travel company for domestic tourism and flight bookings, with offices in Cairo and Kafr El Sheikh.",
    ar: "لافي تورز شركة سياحة داخلية وحجز تذاكر طيران، ولها مقر في القاهرة وكفر الشيخ.",
  } satisfies Localized,

  copyrightYear: 2026,
  demoMode: false,
};

/** Every phone number the company lists, booking lines first. */
export const allPhones = [...company.bookingLines, company.pagePhone];

export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false;
  return !(PLACEHOLDERS as readonly string[]).includes(value.trim());
}

/** "01009316766" → "201009316766" */
export const toWhatsAppDigits = (local: string) => `20${local.replace(/\D/g, "").replace(/^0/, "")}`;

/** WhatsApp link when configured, otherwise Facebook Messenger. */
export function chatLink(message?: string, number = company.whatsapp) {
  if (isConfigured(number)) {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return { href: `https://wa.me/${number.replace(/\D/g, "")}${text}`, channel: "whatsapp" as const };
  }
  return { href: company.facebook.messengerUrl, channel: "messenger" as const };
}
