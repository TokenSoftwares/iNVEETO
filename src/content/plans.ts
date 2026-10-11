import type { T } from "./i18n";

/**
 * PRICING POLICY — REQUIRES BUSINESS APPROVAL (see BUSINESS-APPROVAL.md #1)
 *
 * Two official sources disagree (audited 11 Oct 2026):
 *   A. inveeto.com/en/#pricing (homepage table): Individual $12.99/year, Enterprise $249.99/year,
 *      both labelled "Most Popular".
 *   B. app.inveeto.com/pricing.html (the page every "Pricing" link opens): no amounts —
 *      "We offer plans for individuals and organizations. Get in touch to learn about pricing."
 *
 * Until the business confirms one policy, the site follows B (the live pricing destination):
 * plan limits are published, amounts are not. No price is invented or estimated.
 *
 * To publish prices after approval: set `pricingPolicy = "published"` and confirm the amounts
 * in `plans.*.price`. Nothing else needs to change.
 */
export type PricingPolicy = "contact-sales" | "published";
export const pricingPolicy: PricingPolicy = "contact-sales";

export type PlanId = "individual" | "enterprise";

export const plans: Record<PlanId, { name: T; blurb: T; price: { amount: string; period: T } }> = {
  individual: {
    name: { en: "Individual", ar: "فرد" }, // AR: official
    blurb: { en: "For one organizer running a few events at a time.", ar: "لمنظّم واحد يدير بضع فعاليات في الوقت نفسه." },
    // Source A only — NOT displayed while pricingPolicy is "contact-sales".
    price: { amount: "$12.99", period: { en: "per year", ar: "سنويًا" } },
  },
  enterprise: {
    name: { en: "Enterprise", ar: "مؤسسة" }, // AR: official
    blurb: { en: "For teams managing many events, contacts and stakeholders.", ar: "للفرق التي تدير فعاليات وجهات اتصال وأصحاب مصلحة كُثُر." },
    // Source A only — NOT displayed while pricingPolicy is "contact-sales".
    price: { amount: "$249.99", period: { en: "per year", ar: "سنويًا" } },
  },
};

/** A cell is a limit/value, or an explicit included / not-included flag. */
export type PlanCellValue = { kind: "value"; text: T } | { kind: "included" } | { kind: "excluded" };
const v = (en: string, ar: string = en): PlanCellValue => ({ kind: "value", text: { en, ar } });
const yes: PlanCellValue = { kind: "included" };
const no: PlanCellValue = { kind: "excluded" };

export type PlanRow = { id: string; label: T; individual: PlanCellValue; enterprise: PlanCellValue };

/**
 * Every line from the official plan table on inveeto.com/en/#pricing (Arabic from /ar/#pricing),
 * in the original order, plus the 3-month trial that both plan cards offer.
 */
export const planRows: PlanRow[] = [
  { id: "contacts", label: { en: "Contacts", ar: "جهات الاتصال" }, individual: v("900"), enterprise: v("25,000") },
  { id: "events", label: { en: "Active events", ar: "الفعاليات النشطة" }, individual: v("2"), enterprise: v("100") },
  { id: "campaigns", label: { en: "Active campaigns", ar: "الحملات النشطة" }, individual: v("2"), enterprise: v("100") },
  { id: "fields", label: { en: "Custom contact fields", ar: "حقول جهات الاتصال المخصصة" }, individual: no, enterprise: v("3") },
  { id: "walkin", label: { en: "Walk-in attendee registry", ar: "تسجيل الحاضرين غير المدعوين" }, individual: no, enterprise: yes },
  {
    id: "support",
    label: { en: "Customer support", ar: "دعم العملاء" },
    individual: v("Standard response time", "وقت استجابة عادي"),
    enterprise: v("Dedicated, priority", "دعم مخصص بأولوية"),
  },
  { id: "reports", label: { en: "Contact and event reports", ar: "تقارير جهات الاتصال والفعاليات" }, individual: no, enterprise: yes },
  { id: "team", label: { en: "Team creation and member invitations", ar: "إنشاء فريق ودعوة الأعضاء إليه" }, individual: no, enterprise: yes },
  { id: "roles", label: { en: "Roles for team members", ar: "تعيين أدوار لأعضاء الفريق" }, individual: no, enterprise: yes },
  { id: "private", label: { en: "Private contacts", ar: "جهات اتصال خاصة" }, individual: no, enterprise: yes },
  { id: "trial", label: { en: "Free 3-month trial", ar: "تجربة مجانية لمدة 3 أشهر" }, individual: yes, enterprise: yes },
];

export const pricingCopy = {
  title: { en: "Every event is different. Your setup should be too.", ar: "كل فعالية مختلفة، وكذلك يجب أن يكون إعدادك." },
  body: {
    en: "We offer plans for individuals and organizations. Get in touch to learn about pricing, or start a free 3-month trial first.",
    ar: "نقدّم خططًا للأفراد والمؤسسات. تواصل معنا لمعرفة الأسعار، أو ابدأ أولًا تجربة مجانية لمدة 3 أشهر.",
  },
  trialNote: { en: "No credit card information requested.", ar: "لن يتم طلب أي معلومات عن بطاقة الائتمان." }, // AR: official
  onRequest: { en: "Pricing on request", ar: "الأسعار عند الطلب" },
  tableCaption: {
    en: "Plan comparison: limits and features included in each plan",
    ar: "مقارنة الخطط: الحدود والميزات المتضمنة في كل خطة",
  },
  limitsNote: {
    en: "Plan limits as published by iNVEETO. Pricing is shared on request.",
    ar: "حدود الخطط كما نشرتها إنفيتو. تُشارك الأسعار عند الطلب.",
  },
};
