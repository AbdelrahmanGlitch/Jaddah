import type { Localized } from "@/lib/types";
import { images } from "./images";

/**
 * MARKETING CONTENT
 * Services come from the Facebook page description ("شركة سياحة داخلية وحجز
 * تذاكر طيران") and the hotel offers in the posts. No statistics, years of
 * experience, customer counts or awards are used.
 */

export type ServiceId = "domestic" | "hotels" | "flights";

export const services: {
  id: ServiceId;
  title: Localized;
  text: Localized;
  cta: Localized;
  /** Where the CTA goes */
  href: string;
  /** Booking-form trip type the CTA pre-selects (when it points to the form) */
  bookingType?: "hotel" | "flight" | "domestic";
  image?: string;
}[] = [
  {
    id: "domestic",
    title: { en: "Domestic tourism", ar: "السياحة الداخلية" },
    text: {
      en: "Summer stays on the sea inside Egypt — from New Alamein on the North Coast to Ain Sokhna.",
      ar: "مصايف وإقامات على البحر جوه مصر — من العلمين الجديدة في الساحل الشمالي للعين السخنة.",
    },
    cta: { en: "See the offers", ar: "شوف العروض" },
    href: "/trips",
    image: images.gewanResort,
  },
  {
    id: "hotels",
    title: { en: "Hotels & resorts", ar: "الفنادق والمنتجعات" },
    text: {
      en: "Gewan and Dayz Inn in New Alamein, Tolip Galala Heights in Ain Sokhna — half board or full board, depending on the hotel.",
      ar: "جيوان و Dayz Inn في العلمين الجديدة، وتوليب الجلالة هايتس في العين السخنة — هاف بورد أو فول بورد حسب الفندق.",
    },
    cta: { en: "Request a hotel booking", ar: "اطلب حجز فندق" },
    href: "/#booking",
    bookingType: "hotel",
    image: images.tulipAquaPark,
  },
  {
    id: "flights",
    title: { en: "Flight tickets", ar: "حجز تذاكر الطيران" },
    text: {
      en: "Send us your destination, travel date and number of travellers, and we'll get back to you with the booking options.",
      ar: "ابعتلنا وجهتك وتاريخ السفر وعدد المسافرين، وإحنا نرجعلك بخيارات الحجز المتاحة.",
    },
    cta: { en: "Book your ticket", ar: "احجز تذكرتك" },
    href: "/#flights",
  },
];

export const steps: { title: Localized; text: Localized }[] = [
  {
    title: { en: "Pick an offer", ar: "اختار العرض" },
    text: { en: "Browse the hotel offers — or tell us where you'd like to go and when.", ar: "شوف عروض الفنادق — أو قولنا عايز تروح فين وإمتى." },
  },
  {
    title: { en: "Call or WhatsApp", ar: "كلمنا أو ابعت واتساب" },
    text: { en: "On any of our booking lines, or send the booking request from this website.", ar: "على أي رقم من أرقام الحجز، أو ابعت طلب الحجز من الموقع." },
  },
  {
    title: { en: "Confirm & pay", ar: "أكد الحجز وادفع" },
    text: {
      en: "We confirm the details and price with you. Pay by bank transfer, Vodafone Cash, InstaPay or valU installments.",
      ar: "بنأكد معاك التفاصيل والسعر، وتدفع تحويل بنكي أو فودافون كاش أو إنستاباي أو تقسيط valU.",
    },
  },
  {
    title: { en: "Enjoy your trip", ar: "استمتع برحلتك" },
    text: { en: "Pack your bag — the sea is waiting.", ar: "جهّز شنطتك… والبحر مستنيك." },
  },
];

/**
 * FACEBOOK POSTS — the latest posts on facebook.com/LAVIE55555
 * (text shortened from the original; dates are the post dates).
 * Facebook doesn't expose post permalinks publicly, so each card links to the page.
 */
export const facebookPosts: {
  date: string;
  kind: Localized;
  text: Localized;
  image?: string;
  tripId?: string;
}[] = [
  {
    date: "2026-07-15",
    kind: { en: "Album · 14 photos", ar: "ألبوم · 14 صورة" },
    text: {
      en: "Dayz Inn El Alamein — exclusive summer 2026. Your room at the beach: a prime spot in front of the Alamein Towers, all rooms sea view.",
      ar: "Dayz Inn العلمين — صيف 2026 حصري، أوضتك على البحر: موقع مميز أمام أبراج العلمين، وكل الغرف سي فيو.",
    },
    image: images.dayzCourtyardNight,
    tripId: "dayz-inn-alamein",
  },
  {
    date: "2026-07-07",
    kind: { en: "Contest", ar: "مسابقة" },
    text: {
      en: "Predict the Egypt vs Argentina match: a free two-night room at Tolip Galala Hills, Ain Sokhna, for the first correct prediction. Terms & conditions apply.",
      ar: "يلا بينا نتوقع ماتش مصر والأرجنتين — صاحب أول توقع صحيح له غرفة فري لمدة ليلتين في توليب الجلالة هيلز العين السخنة. تطبق الشروط والأحكام.",
    },
  },
  {
    date: "2026-06-08",
    kind: { en: "Video", ar: "فيديو" },
    text: {
      en: "Tolip Galala Heights (Aqua Park) — all rooms pool view, one of the newest hotels in Ain Sokhna. Half board, full board available.",
      ar: "توليب الجلالة هايتس (أكوا بارك) — جميع الغرف بوول فيو، من أحدث فنادق العين السخنة. هاف بورد، ومتاح فول بورد.",
    },
    image: images.tulipAquaPark,
    tripId: "tolip-galala-heights-sokhna",
  },
  {
    date: "2026-06-08",
    kind: { en: "Video", ar: "فيديو" },
    text: {
      en: "A different summer in New Alamein — choose between Gewan Resort Aqua Park and Gewan White Beach, 5-star ultra deluxe, first row on the sea.",
      ar: "تجربة صيف مختلفة في العلمين الجديدة — اختار بين جيوان ريزورت أكوا بارك وجيوان وايت بيتش، 5 نجوم ألترا ديلوكس صف أول على البحر.",
    },
    image: images.gewanPool,
    tripId: "gewan-new-alamein",
  },
];
