import type { Localized } from "@/lib/types";

/**
 * COMPANY CONFIGURATION — single source of truth for all company details.
 * ------------------------------------------------------------------
 * Only the company name and Facebook page are verified.
 * Everything marked PLACEHOLDER must be replaced with real information
 * confirmed by Jeddah Tourism. Do NOT invent values.
 *
 * Placeholder values (e.g. "PHONE_NUMBER") are detected automatically by
 * `isConfigured()` — while a field still holds its placeholder, the website
 * hides the related link and gracefully falls back to the Facebook page.
 */

export const PLACEHOLDERS = [
  "PHONE_NUMBER",
  "WHATSAPP_NUMBER",
  "EMAIL_ADDRESS",
  "OFFICE_ADDRESS",
  "INSTAGRAM_URL",
] as const;

export const company = {
  /** Verified */
  name: "Jeddah Tourism",
  /** Verified — Arabic / English display names */
  displayName: { en: "Jeddah Tourism", ar: "جدة للسياحة" } satisfies Localized,
  /** Verified alternative English name */
  alternateName: "Jeddah For Tourism",
  /** Logo lockup (two lines) */
  logo: { top: "JEDDAH", bottom: "TOURISM" },

  /** Verified */
  facebook: {
    username: "JeddahTourism196",
    url: "https://www.facebook.com/JeddahTourism196",
    photosUrl: "https://www.facebook.com/JeddahTourism196/photos",
    messengerUrl: "https://m.me/JeddahTourism196",
  },

  /** Verified contact numbers */
  phones: ["01223374023", "01055590351", "034333455", "01015202257", "01024941073", "01553471642"],

  /**
   * PLACEHOLDER — no number has been designated as WhatsApp.
   * Digits only incl. country code once confirmed (e.g. "2010…").
   * Until then, chat buttons open Facebook Messenger.
   */
  whatsapp: "WHATSAPP_NUMBER",
  /** PLACEHOLDER — not provided */
  email: "EMAIL_ADDRESS",
  /** PLACEHOLDER — not provided */
  instagram: "INSTAGRAM_URL",

  /** Verified branch */
  branch: {
    name: { en: "Alexandria Branch", ar: "فرع الإسكندرية" } satisfies Localized,
    area: { en: "Al-Agamy, Al-Bitash", ar: "العجمي، البيطاش" } satisfies Localized,
    address: {
      en: "In front of Al-Agamy district building, next to Halwani Khaled.",
      ar: "أمام مبنى حي العجمي، بجوار حلواني خالد.",
    } satisfies Localized,
  },

  /** Built only from verified information (programs offered + branch). */
  description: {
    en: "Jeddah Tourism (جدة للسياحة) organizes Hajj and Umrah programs and summer trips to Marsa Matrouh, with a branch in Al-Agamy, Alexandria.",
    ar: "جدة للسياحة تنظم برامج الحج والعمرة والرحلات الصيفية إلى مرسى مطروح، ولها فرع في العجمي بالإسكندرية.",
  } satisfies Localized,

  copyrightYear: 2026,

  /**
   * Company data is verified, so the "sample content" notes are off.
   * (Photos are still placeholders — the gallery keeps its "illustrative" label.)
   */
  demoMode: false,
};

export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false;
  return !(PLACEHOLDERS as readonly string[]).includes(value.trim());
}

/** WhatsApp link when configured, otherwise Facebook Messenger. */
export function chatLink(message?: string) {
  if (isConfigured(company.whatsapp)) {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return { href: `https://wa.me/${company.whatsapp.replace(/\D/g, "")}${text}`, channel: "whatsapp" as const };
  }
  return { href: company.facebook.messengerUrl, channel: "messenger" as const };
}
