export type Lang = "en" | "ar";

/** A string provided in both English and Arabic. */
export type Localized = { en: string; ar: string };

export type TripCategory =
  | "beach"
  | "family"
  | "adventure"
  | "honeymoon"
  | "religious"
  | "cultural"
  | "international"
  | "domestic"
  | "summer";

export type Availability = "available" | "limited" | "soldOut" | "onRequest";

export type Currency = "EGP" | "SAR" | "USD" | "AED";

/** Short service tags shown as icons on trip cards. */
export type ServiceTag = "flights" | "hotel" | "meals" | "transfers" | "tours" | "guide" | "visa" | "cruise";

export interface ItineraryDay {
  day: number;
  title: Localized;
  description: Localized;
}

export interface FaqItem {
  question: Localized;
  answer: Localized;
}

/** Departure date as "MM-DD" — no year is stored unless the company supplies one. */
export type MonthDay = string;

export interface PriceOption {
  label: Localized;
  amount: number;
  /** "adult" prices are used for the "starting from" figure; "child" prices are listed only */
  kind: "adult" | "child";
  note?: Localized;
}

/** One row of a date-based price table (e.g. Delmar Hotel) */
export interface ScheduleRow {
  dates: MonthDay[];
  nights: number;
  adult: number;
  child: number;
}

export interface Trip {
  /** URL slug — /trips/{id} */
  id: string;
  title: Localized;
  /** City / area, e.g. "Marsa Matrouh" */
  destination: Localized;
  /** Must match an id in data/destinations.ts */
  destinationId: string;
  country: Localized;
  categories: TripCategory[];
  /** e.g. "Summer 2026" */
  season?: Localized;
  /** e.g. "Tahseen" */
  program?: Localized;
  /** Free-text period, e.g. "From 2 to 19 Dhu al-Hijjah" */
  period?: Localized;
  shortDescription: Localized;
  description: Localized;
  heroImage: string;
  gallery: string[];
  durationDays?: number;
  durationNights?: number;
  /** Departure dates ("MM-DD"). For trips with a pricingSchedule, dates come from the schedule. */
  departures?: MonthDay[];
  departureCity?: Localized;
  currency: Currency;
  /** Fixed prices (per person / child). Leave empty when pricingSchedule is used. */
  priceOptions?: PriceOption[];
  /** Date-based prices — when present, no single fixed price is displayed. */
  pricingSchedule?: ScheduleRow[];
  priceNote?: Localized;
  availability?: Availability;
  featured?: boolean;
  services: ServiceTag[];
  included: Localized[];
  excluded: Localized[];
  itinerary: ItineraryDay[];
  highlights: Localized[];
  importantInfo: Localized[];
  faq: FaqItem[];
}

export interface Destination {
  id: string;
  name: Localized;
  country: Localized;
  tagline: Localized;
  image: string;
  scope: "domestic" | "international";
}

export interface GalleryItem {
  src: string;
  alt: Localized;
  category: Localized;
  /** Aspect used by the masonry layout */
  shape: "tall" | "wide" | "square";
}
