import type { T } from "./i18n";

/**
 * Verified customer stories from inveeto.com/en/customer-stories (bilingual page; all
 * Arabic here is official). Nothing is added: no logos, no invented metrics.
 * The live page's headline counters ("Organizations / Attendees managed / Sectors")
 * render as 0 in the HTML (JS-animated), so their real values are unknown and they are
 * not reproduced. See OPEN-QUESTIONS.md #5.
 */
export type Story = {
  id: string;
  kind: "customer" | "sponsorship";
  org: T;
  context: T;
  summary: T;
  quote?: { text: T; name: T; role: T; rating: 5 };
  metric?: { value: string; label: T };
  tags?: T[];
  images: { src: string; alt: T }[];
  video?: string;
};

const wp = (p: string) => `https://inveeto.com/wp-content/uploads/${p}`;

export const storiesIntro = {
  title: { en: "Every event below was managed with iNVEETO", ar: "كل فعالية أدناه استخدمت إنفييتو" },
  body: {
    en: "No simulated results. No stock photos. Real organizations with real events.",
    ar: "لا نتائج محاكاة. لا صور افتراضية. منظمات حقيقية بفعاليات حقيقية.",
  },
};

export const stories: Story[] = [
  {
    id: "aba-plex",
    kind: "customer",
    org: { en: "ABA Technology at PLEX 2026", ar: "شركة ABA Technology في PLEX 2026" },
    context: {
      en: "PLEX 2026, e-commerce & logistics conference. 500+ invitees, 2 days",
      ar: "PLEX 2026 | مؤتمر التجارة الإلكترونية · 500+ مدعو · يومان",
    },
    summary: {
      en: "ABA Technology used iNVEETO to manage attendee communication, support self check-in and streamline event operations for more than 500 invitees across two days.",
      ar: "استخدمت ABA Technology منصة إنفييتو لإدارة التواصل مع الحضور ودعم التسجيل الذاتي للحضور لأكثر من 500 مدعو على مدار يومين.",
    },
    quote: {
      text: {
        en: "It helped me manage emails smoothly instead of manually sending them to attendees.",
        ar: "ساعدني على إدارة رسائل البريد الإلكتروني بسهولة بدلًا من إرسالها يدويًا إلى الحضور.",
      },
      name: { en: "Suhaib Dweekat", ar: "صهيب دويكات" },
      role: { en: "ABA Technology", ar: "ABA Technology" },
      rating: 5,
    },
    metric: { value: "500+", label: { en: "Invitees across 2 days", ar: "مدعو على مدار يومين" } },
    images: [],
    video: wp("2026/09/Plex-2026-V.4.mp4"),
  },
  {
    id: "alquds",
    kind: "customer",
    org: { en: "Al-Quds University", ar: "جامعة القدس" },
    context: {
      en: "Moroccan Studies Chair, academic lecture event",
      ar: "كرسي الدراسات المغربية | محاضرة أكاديمية",
    },
    summary: {
      en: "The Moroccan Studies Chair used iNVEETO to organize a university lecture, managing guest attendance and sending a follow-up survey after the event.",
      ar: "استخدم كرسي الدراسات المغربية منصة إنفييتو لتنظيم محاضرة جامعية، بما في ذلك تسجيل الحضور وإرسال استبيان للمتابعة بعد الفعالية.",
    },
    quote: {
      text: {
        en: "Inveeto contributed to the better organization and follow-up after the event through effective attendance registration and sending follow-up survey after the event.",
        ar: "ساهمت إنفييتو في تحسين تنظيم الفعالية والمتابعة بعدها من خلال تسجيل الحضور بفعالية وإرسال استبيان للمتابعة بعد الفعالية.",
      },
      name: { en: "Dr. Safa Nassereldin", ar: "د. صفاء نصر الدين" },
      role: { en: "President, Moroccan Studies Chair, Al-Quds University", ar: "رئيسة كرسي الدراسات المغربية | جامعة القدس" },
      rating: 5,
    },
    images: [{ src: wp("2026/09/IMG_8098-scaled.jpg"), alt: { en: "Al-Quds University Moroccan Studies Chair lecture", ar: "محاضرة كرسي الدراسات المغربية في جامعة القدس" } }],
  },
  {
    id: "sehhatech",
    kind: "sponsorship",
    org: { en: "SehhaTech 2025", ar: "صحة تيك 2025" },
    context: {
      en: "PITA, Palestinian Information Technology Association. Dec 8, 2025",
      ar: "PITA | جمعية شركات أنظمة المعلومات الفلسطينية · 8 كانون الأول 2025",
    },
    summary: {
      en: "iNVEETO was the official Event Tech Sponsor for SehhaTech 2025, powering online pre-registration, on-site check-in and organized contact lists for post-event follow-up.",
      ar: "كانت إنفييتو الراعي التقني الرسمي لفعالية صحة تيك 2025، فعالية وطنية حول التحول الرقمي في قطاع الصحة. دعمت إنفييتو التسجيل المسبق عبر الإنترنت، وتسجيل الحضور في الموقع، وتنظيم قوائم جهات الاتصال للمتابعة بعد الفعالية.",
    },
    images: [
      { src: wp("2026/09/IMG_8614-scaled.jpg"), alt: { en: "SehhaTech 2025", ar: "صحة تيك 2025" } },
      { src: wp("2026/09/IMG_8590-scaled.jpg"), alt: { en: "SehhaTech 2025 conference", ar: "مؤتمر صحة تيك 2025" } },
      { src: wp("2026/09/20251208_085728-scaled.jpg"), alt: { en: "iNVEETO at SehhaTech", ar: "إنفييتو في صحة تيك" } },
    ],
  },
  {
    id: "pef",
    kind: "customer",
    org: { en: "Palestinian Employment Fund", ar: "صندوق التشغيل الفلسطيني" },
    context: { en: "PEF, registration support for an introductory program session", ar: "PEF | دعم التسجيل لجلسة برنامج تعريفية" },
    summary: {
      en: "The Palestinian Employment Fund used iNVEETO to support participant registration for an introductory program session, ensuring a smooth and well-organized experience.",
      ar: "استخدم صندوق التشغيل الفلسطيني منصة إنفييتو لدعم تسجيل المشاركين في جلسة تعريفية، مما ساعد على تنظيم عملية التسجيل وتسهيل تجربة المشاركين.",
    },
    images: [
      { src: wp("2026/09/WhatsApp-Image-2025-11-13-at-12.08.39-PM-2.jpeg"), alt: { en: "PEF session", ar: "جلسة صندوق التشغيل" } },
      { src: wp("2026/09/WhatsApp-Image-2025-11-13-at-12.08.39-PM-3.jpeg"), alt: { en: "PEF participants", ar: "المشاركون في جلسة صندوق التشغيل" } },
    ],
  },
  {
    id: "byu",
    kind: "customer",
    org: { en: "BYU Arab Student Association", ar: "جمعية الطلاب العرب في BYU" },
    context: { en: "Iftar 2026, event management", ar: "إفطار 2026 | إدارة الفعالية" },
    summary: {
      en: "BYU Arab Student Association used iNVEETO for Iftar 2026 to manage contacts, invitations and QR check-in. Tags structured guest groups, and duplicate detection kept the contact list clean and accurate.",
      ar: "استخدمت جمعية الطلاب العرب في BYU منصة إنفييتو لإدارة جهات الاتصال والدعوات وتسجيل الحضور عبر رمز QR. وساعدت العلامات على تنظيم مجموعات الضيوف، كما ساهمت ميزة كشف التكرار في الحفاظ على قائمة جهات اتصال منظمة وخالية من التكرار.",
    },
    metric: { value: "350+", label: { en: "Attendees managed", ar: "من الحضور" } },
    tags: [
      { en: "QR check-in", ar: "تسجيل QR" },
      { en: "Contact tagging", ar: "تصنيف جهات الاتصال" },
      { en: "Duplicate detection", ar: "كشف التكرار" },
    ],
    images: [],
  },
];

export const teamMessage = {
  title: { en: "Why we built iNVEETO", ar: "لماذا بنينا إنفييتو؟" },
  body: {
    en: "Our team shares the problem iNVEETO was built to solve: the disconnect between contact lists, invitations and attendance tracking that most organizers manage across separate tools.",
    ar: "يشارك فريقنا المشكلة التي بُنيت إنفييتو لمعالجتها، وهي تشتّت قوائم جهات الاتصال والدعوات ومتابعة الحضور بين أدوات مختلفة يستخدمها منظمو الفعاليات.",
  },
  video: wp("2026/09/Inveeto.mp4"),
  disclaimer: { en: "Message from the iNVEETO team, not a customer testimonial.", ar: "رسالة من فريق إنفييتو، وليست شهادة من عميل." },
};
