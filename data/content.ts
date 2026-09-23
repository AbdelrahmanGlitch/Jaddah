import type { Localized } from "@/lib/types";
import { images } from "./images";

/**
 * MARKETING CONTENT
 * Every "why us" point is based on information supplied by Jeddah Tourism.
 * No statistics, years of experience or customer counts are used.
 */

export type WhyUsIcon = "compass" | "clipboard" | "tag" | "headset" | "sliders" | "sparkles";

export const whyUs: { icon: WhyUsIcon; title: Localized; text: Localized }[] = [
  {
    icon: "compass",
    title: { en: "Hajj & Umrah Programs", ar: "برامج الحج والعمرة" },
    text: { en: "Hajj 1447 AH at Anjam Hotel on the Haram courtyard, and 15-day Umrah programs in Makkah and Madinah.", ar: "حج 1447 هـ في فندق انجم على ساحة الحرم، وبرامج عمرة 15 يومًا في مكة المكرمة والمدينة المنورة." },
  },
  {
    icon: "clipboard",
    title: { en: "Religious Supervision", ar: "إشراف ديني" },
    text: { en: "Our Umrah programs include religious supervision throughout the trip, plus religious visits.", ar: "تشمل برامج العمرة إشرافًا دينيًا طوال الرحلة وزيارات دينية." },
  },
  {
    icon: "headset",
    title: { en: "24/7 Customer Service", ar: "خدمة عملاء على مدار الساعة" },
    text: { en: "Umrah travelers are supported by customer service around the clock.", ar: "يحظى معتمرونا بخدمة عملاء على مدار الساعة." },
  },
  {
    icon: "sliders",
    title: { en: "Modern Transportation", ar: "وسائل انتقال حديثة" },
    text: { en: "Modern, comfortable transportation on Umrah, and round-trip buses from Alexandria on our Rio Hotel summer trips.", ar: "وسائل انتقال حديثة ومريحة في العمرة، وأتوبيسات ذهاب وعودة من الإسكندرية في رحلات فندق ريو الصيفية." },
  },
  {
    icon: "sparkles",
    title: { en: "Summer in Marsa Matrouh", ar: "الصيف في مرسى مطروح" },
    text: { en: "Summer 2026 trips with many departure dates and six beaches: Al-Gharram, Cleopatra, Rommel, Al-Obayed, Al-Hana and Al-Fayrouz.", ar: "رحلات صيف 2026 بمواعيد متعددة و6 شواطئ: الغرام، كليوباترا، روميل، الأبيض، الهنا، والفيروز." },
  },
  {
    icon: "tag",
    title: { en: "Clear Prices for Families", ar: "أسعار واضحة للعائلات" },
    text: { en: "Prices per person and for children are listed on every trip — all in Egyptian Pounds.", ar: "أسعار الفرد والطفل موضحة في كل رحلة — وكلها بالجنيه المصري." },
  },
];

export const steps: { title: Localized; text: Localized }[] = [
  {
    title: { en: "Choose Your Trip", ar: "اختر رحلتك" },
    text: { en: "Browse trips by destination, date, budget or travel style and compare every detail.", ar: "تصفح الرحلات حسب الوجهة أو التاريخ أو الميزانية أو نوع الرحلة وقارن كل التفاصيل." },
  },
  {
    title: { en: "Contact & Confirm", ar: "تواصل وأكّد" },
    text: { en: "Send a booking request or message us — we confirm availability, price and payment.", ar: "أرسل طلب حجز أو راسلنا، وسنؤكد لك التوافر والسعر وطريقة الدفع." },
  },
  {
    title: { en: "Prepare For Your Journey", ar: "استعد لرحلتك" },
    text: { en: "Get the final details of your trip and everything you need to know before you go.", ar: "احصل على التفاصيل النهائية لرحلتك وكل ما تحتاج معرفته قبل الانطلاق." },
  },
  {
    title: { en: "Enjoy The Experience", ar: "استمتع بالتجربة" },
    text: { en: "Travel with confidence while our team takes care of the details along the way.", ar: "سافر بثقة بينما يهتم فريقنا بالتفاصيل طوال الطريق." },
  },
];

/**
 * SOCIAL FEED PREVIEW
 * Illustrates how Facebook posts could appear on the website. Photos are
 * placeholders — replace with real post photos/captions from
 * https://www.facebook.com/JeddahTourism196/photos
 */
export const socialPosts: { image: string; caption: Localized }[] = [
  { image: images.matrouhAgibaFlowers, caption: { en: "Summer 2026 in Marsa Matrouh", ar: "صيف 2026 في مرسى مطروح" } },
  { image: images.makkahKaabaDay, caption: { en: "Hajj 1447 AH", ar: "الحج 1447 هـ" } },
  { image: images.matrouhAgibaSwimmers, caption: { en: "Summer coastal trips", ar: "رحلات صيفية" } },
  { image: images.madinahDomeMinaret, caption: { en: "Umrah Programs", ar: "برامج العمرة" } },
  { image: images.matrouhObayed, caption: { en: "Al-Obayed Beach, Marsa Matrouh", ar: "شاطئ الأبيض، مرسى مطروح" } },
  { image: images.makkahClockTower, caption: { en: "Religious Tourism", ar: "السياحة الدينية" } },
  { image: images.matrouhCleopatraRock, caption: { en: "Cleopatra Beach, Marsa Matrouh", ar: "شاطئ كليوباترا، مرسى مطروح" } },
  { image: images.delmarCafeView, caption: { en: "Delmar Hotel — Marsa Matrouh", ar: "فندق دليمار - مرسى مطروح" } },
  { image: images.matrouhCleopatraClear, caption: { en: "Summer by the sea", ar: "صيف على البحر" } },
];
