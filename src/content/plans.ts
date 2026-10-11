import type { T } from "./i18n";

/**
 * PRICING STATUS (audited 11 Oct 2026) — see OPEN-QUESTIONS.md #1
 *
 * - inveeto.com/en/#pricing lists INDIVIDUAL $12.99/year and ENTERPRISE $249.99/year,
 *   both labelled "Most Popular".
 * - The live pricing destination (app.inveeto.com/pricing.html), which every
 *   "Pricing" nav link points to, shows NO amounts: "We offer plans for individuals
 *   and organizations. Get in touch to learn about pricing."
 *
 * The brief says to verify against the live pricing destination, so this site shows
 * plan limits and a "talk to us" pricing model, and does not render the amounts.
 * The amounts are kept here so they can be switched on in one place once confirmed.
 */
export const showPrices = false;

export type PlanRow = { id: string; label: T; individual: T | boolean; enterprise: T | boolean };

export const plans = {
  individual: {
    name: { en: "Individual", ar: "فرد" }, // AR: official
    unconfirmedPrice: "$12.99 / year",
    blurb: { en: "For one organizer running a few events at a time.", ar: "لمنظّم واحد يدير بضع فعاليات في الوقت نفسه." },
  },
  enterprise: {
    name: { en: "Enterprise", ar: "مؤسسة" }, // AR: official
    unconfirmedPrice: "$249.99 / year",
    blurb: { en: "For teams managing many events, contacts and stakeholders.", ar: "للفرق التي تدير فعاليات وجهات اتصال وأصحاب مصلحة كُثُر." },
  },
};

/** Plan limits exactly as listed on inveeto.com/en/#pricing (Arabic from inveeto.com/ar/#pricing). */
export const planRows: PlanRow[] = [
  { id: "contacts", label: { en: "Contacts", ar: "جهات الاتصال" }, individual: { en: "900", ar: "900" }, enterprise: { en: "25,000", ar: "25,000" } },
  { id: "events", label: { en: "Active events", ar: "الفعاليات النشطة" }, individual: { en: "2", ar: "2" }, enterprise: { en: "100", ar: "100" } },
  { id: "campaigns", label: { en: "Active campaigns", ar: "الحملات النشطة" }, individual: { en: "2", ar: "2" }, enterprise: { en: "100", ar: "100" } },
  { id: "fields", label: { en: "Custom contact fields", ar: "حقول جهات الاتصال المخصصة" }, individual: false, enterprise: { en: "3", ar: "3" } },
  { id: "walkin", label: { en: "Walk-in attendee registry", ar: "تسجيل الحاضرين غير المدعوين" }, individual: false, enterprise: true },
  {
    id: "support",
    label: { en: "Customer support", ar: "دعم العملاء" },
    individual: { en: "Standard response time", ar: "دون أولوية" },
    enterprise: { en: "Dedicated, priority", ar: "أولوية مخصصة" },
  },
  { id: "reports", label: { en: "Contact and event reports", ar: "تقارير جهات الاتصال والفعاليات" }, individual: false, enterprise: true },
  { id: "team", label: { en: "Team creation & member invitations", ar: "إنشاء فريق ودعوة الأعضاء إليه" }, individual: false, enterprise: true },
  { id: "roles", label: { en: "Roles for team members", ar: "اختيار الأدوار لأعضاء الفريق" }, individual: false, enterprise: true },
  { id: "private", label: { en: "Private contacts", ar: "جهات اتصال خاصة" }, individual: false, enterprise: true },
];

export const pricingCopy = {
  title: { en: "Every event is different. Your setup should be too.", ar: "كل فعالية مختلفة، وكذلك يجب أن يكون إعدادك." },
  body: {
    en: "We offer plans for individuals and organizations. Get in touch to learn about pricing, or start a free 3-month trial first.",
    ar: "نقدّم خططًا للأفراد والمؤسسات. تواصل معنا لمعرفة الأسعار، أو ابدأ أولًا تجربة مجانية لمدة 3 أشهر.",
  },
  trialNote: { en: "No credit card information requested.", ar: "لن يتم طلب أي معلومات عن بطاقة الائتمان." }, // AR: official
  limitsNote: {
    en: "Plan limits as published on inveeto.com. Pricing is shared on request.",
    ar: "حدود الخطط كما هي منشورة على inveeto.com. تُشارك الأسعار عند الطلب.",
  },
};
