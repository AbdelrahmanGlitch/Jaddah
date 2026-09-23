import type { FaqItem } from "@/lib/types";

/**
 * GENERAL FAQ — answers use only information supplied by Jeddah Tourism
 * (or describe how this website works). Add verified policies here.
 */
export const faqs: FaqItem[] = [
  {
    question: { en: "How do I book a trip?", ar: "كيف أحجز رحلة؟" },
    answer: {
      en: "Choose a trip, open its page and press “Book This Trip”, or fill in the booking request form. You can also call us on any of our numbers or message us on Facebook.",
      ar: "اختر رحلتك وافتح صفحتها واضغط «احجز هذه الرحلة»، أو املأ نموذج طلب الحجز. ويمكنك أيضًا الاتصال بنا على أي من أرقامنا أو مراسلتنا على فيسبوك.",
    },
  },
  {
    question: { en: "What is included in the package?", ar: "ماذا تشمل الباقة؟" },
    answer: {
      en: "Every trip page lists what is included — hotels, meals, transportation and beaches, depending on the trip.",
      ar: "توضح صفحة كل رحلة ما تشمله الباقة، مثل الفنادق والوجبات والانتقالات والشواطئ حسب الرحلة.",
    },
  },
  {
    question: { en: "Is the flight ticket included in the Hajj price?", ar: "هل سعر الحج شامل تذكرة الطيران؟" },
    answer: {
      en: "No. The Hajj 1447 AH price (267,000 EGP per person) does not include the flight ticket.",
      ar: "لا، سعر الحج 1447 هـ (267,000 جنيه للفرد) غير شامل تذكرة الطيران.",
    },
  },
  {
    question: { en: "Are there prices for children on summer trips?", ar: "هل توجد أسعار للأطفال في الرحلات الصيفية؟" },
    answer: {
      en: "Yes. Each Marsa Matrouh trip lists its child price. On Rio Hotel and New Royal Palace Hotel trips, children under 6 are free, and an extra bus seat costs 800 EGP.",
      ar: "نعم، توضح كل رحلة إلى مرسى مطروح سعر الطفل. وفي رحلات فندق ريو وفندق نيو رويال بالاس، الأطفال أقل من 6 سنوات مجانًا، وكرسي الأتوبيس الإضافي بـ 800 جنيه.",
    },
  },
  {
    question: { en: "How can I contact you?", ar: "كيف يمكنني التواصل معكم؟" },
    answer: {
      en: "Call us on 01223374023, 01055590351, 034333455, 01015202257, 01024941073 or 01553471642, message us on Facebook, or visit our Alexandria branch in Al-Agamy, Al-Bitash.",
      ar: "اتصل بنا على 01223374023 أو 01055590351 أو 034333455 أو 01015202257 أو 01024941073 أو 01553471642، أو راسلنا على فيسبوك، أو زر فرعنا بالإسكندرية في العجمي، البيطاش.",
    },
  },
  {
    question: { en: "What happens after I submit a booking request?", ar: "ماذا يحدث بعد إرسال طلب الحجز؟" },
    answer: {
      en: "Our team reviews your request and contacts you to confirm the trip details.",
      ar: "يراجع فريقنا طلبك ويتواصل معك لتأكيد تفاصيل الرحلة.",
    },
  },
];
