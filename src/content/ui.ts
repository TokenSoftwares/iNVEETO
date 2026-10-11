import type { T } from "./i18n";

/** Interface strings (navigation, buttons, labels, form copy). */
export const ui = {
  nav: {
    platform: { en: "Platform", ar: "المنصة" },
    features: { en: "Features", ar: "الميزات" },
    usecases: { en: "Use cases", ar: "حالات الاستخدام" },
    stories: { en: "Customer stories", ar: "قصص العملاء" },
    pricing: { en: "Pricing", ar: "الأسعار" },
    faqs: { en: "FAQs", ar: "الأسئلة الشائعة" },
    contact: { en: "Contact", ar: "تواصل معنا" },
    login: { en: "Log in", ar: "تسجيل الدخول" },
    menu: { en: "Menu", ar: "القائمة" },
    close: { en: "Close menu", ar: "إغلاق القائمة" },
    skip: { en: "Skip to content", ar: "انتقل إلى المحتوى" },
    switchTo: { en: "العربية", ar: "English" },
    switchLabel: { en: "Switch to Arabic", ar: "التبديل إلى الإنجليزية" },
  },
  cta: {
    trial: { en: "Start your free trial", ar: "ابدأ تجربتك المجانية" },
    explore: { en: "Explore the platform", ar: "استكشف المنصة" },
    allFeatures: { en: "See all features", ar: "اعرض كل الميزات" },
    talk: { en: "Talk to us about pricing", ar: "تواصل معنا بشأن الأسعار" },
    demo: { en: "Book a demo", ar: "احجز عرضًا توضيحيًا" },
    viewUsecase: { en: "Read the venues use case", ar: "اقرأ حالة استخدام المنشآت" },
    allStories: { en: "Read all customer stories", ar: "اقرأ كل قصص العملاء" },
    allUsecases: { en: "Explore all use cases", ar: "استكشف كل حالات الاستخدام" },
    pricing: { en: "Compare plans", ar: "قارن الخطط" },
  },
  sections: {
    modulesTitle: { en: "Three modules. One connected address book.", ar: "ثلاث وحدات ودفتر عناوين واحد مترابط." },
    modulesBody: {
      en: "Contacts, events and campaigns share the same people, so a tag you add once works everywhere.",
      ar: "تتشارك جهات الاتصال والفعاليات والحملات الأشخاص أنفسهم، فالوسم الذي تضيفه مرة يعمل في كل مكان.",
    },
    whatCanIDo: { en: "What can I do with iNVEETO?", ar: "ماذا يمكنني أن أفعل مع إنفيتو؟" },
    highlightsTitle: { en: "Everything an event team touches, in one place", ar: "كل ما يحتاجه فريق الفعاليات، في مكان واحد" },
    whatsNew: { en: "New in iNVEETO", ar: "الجديد في إنفيتو" },
    whatsNewBody: { en: "12 new features across Address Book, Events and Campaigns.", ar: "12 ميزة جديدة في دفتر العناوين والفعاليات والحملات." },
    industriesTitle: { en: "Built for organizations that run on relationships", ar: "مصمم للمؤسسات التي تقوم على العلاقات" },
    industriesBody: {
      en: "Nine industries use iNVEETO to manage contacts, invitations, attendance and stakeholder communication.",
      ar: "تستخدم تسعة قطاعات إنفيتو لإدارة جهات الاتصال والدعوات والحضور والتواصل مع أصحاب المصلحة.",
    },
    storiesTitle: { en: "Real events, run with iNVEETO", ar: "فعاليات حقيقية أُديرت بإنفيتو" },
    benefitsTitle: { en: "The platform behind the events", ar: "المنصة التي تقف خلف الفعاليات" },
    pricingTitle: { en: "Start free for three months", ar: "ابدأ مجانًا لمدة ثلاثة أشهر" },
    faqTitle: { en: "Frequently asked questions", ar: "الأسئلة المتداولة" },
    contactTitle: { en: "Talk to the iNVEETO team", ar: "تحدّث مع فريق إنفيتو" },
    contactBody: { en: "We value your connection. Reach out for any inquiries or feedback.", ar: "نقدّر تواصلك معنا. راسلنا لأي استفسار أو ملاحظة." },
    finalTitle: { en: "Run your next event with iNVEETO", ar: "أدِر فعاليتك القادمة مع إنفيتو" },
    finalBody: { en: "Start a free 3-month trial. No credit card required.", ar: "ابدأ تجربة مجانية لمدة 3 أشهر، دون الحاجة إلى بطاقة ائتمان." },
    shared: { en: "Built into every part of iNVEETO", ar: "مدمج في كل جزء من إنفيتو" },
    sharedBody: {
      en: "Core capabilities that power your entire workflow, from the first contact to the last campaign.",
      ar: "قدرات أساسية تدعم سير عملك بالكامل، من أول جهة اتصال إلى آخر حملة.",
    },
    workflowTitle: { en: "From first contact to lasting relationship", ar: "من أول تواصل إلى علاقة دائمة" },
    workflowBody: { en: "Every module feeds the next, so nothing you build gets rebuilt.", ar: "كل وحدة تغذّي التالية، فلا يُعاد بناء شيء أنشأته." },
  },
  demo: {
    sample: { en: "Product demo · sample data", ar: "عرض توضيحي · بيانات نموذجية" },
  },
  contact: {
    general: { en: "General questions and business inquiries", ar: "الأسئلة العامة والاستفسارات التجارية" }, // AR: official
    support: { en: "Technical support and product feedback", ar: "الدعم الفني وملاحظات المنتج" }, // AR: official
    sales: { en: "Sales team", ar: "فريق المبيعات" }, // AR: official
    whatsapp: { en: "MENA (WhatsApp)", ar: "الشرق الأوسط وشمال أفريقيا (واتساب)" },
    feedbackTitle: { en: "Feedback form", ar: "نموذج الملاحظات" },
    feedbackBody: {
      en: "Have insights or improvement suggestions for the software? We'd love to receive them.",
      ar: "لديك أفكار أو اقتراحات لتحسين البرنامج؟ يسعدنا أن نستقبلها.",
    },
    feedbackCta: { en: "Open the feedback form", ar: "افتح نموذج الملاحظات" },
  },
  form: {
    title: { en: "Send an inquiry", ar: "أرسل استفسارًا" },
    name: { en: "Full name", ar: "الاسم الكامل" },
    email: { en: "Work email", ar: "البريد الإلكتروني للعمل" },
    org: { en: "Organization", ar: "المؤسسة" },
    topic: { en: "What can we help with?", ar: "كيف يمكننا المساعدة؟" },
    topics: {
      demo: { en: "Book a demo", ar: "حجز عرض توضيحي" },
      pricing: { en: "Pricing", ar: "الأسعار" },
      support: { en: "Technical support", ar: "الدعم الفني" },
      other: { en: "Something else", ar: "أمر آخر" },
    },
    message: { en: "Message", ar: "الرسالة" },
    optional: { en: "optional", ar: "اختياري" },
    submit: { en: "Send inquiry", ar: "أرسل الاستفسار" },
    submitMail: { en: "Continue in your email app", ar: "تابع في تطبيق البريد" },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    errName: { en: "Enter your name.", ar: "أدخل اسمك." },
    errEmail: { en: "Enter a valid email address, like name@company.com.", ar: "أدخل بريدًا إلكترونيًا صالحًا، مثل name@company.com." },
    errMessage: { en: "Add a short message of at least 10 characters.", ar: "أضف رسالة قصيرة من 10 أحرف على الأقل." },
    successTitle: { en: "Inquiry sent", ar: "تم إرسال الاستفسار" },
    successBody: { en: "Thanks. The iNVEETO team will reply to the email you entered.", ar: "شكرًا لك. سيرد فريق إنفيتو على البريد الذي أدخلته." },
    mailtoTitle: { en: "Your email app should open", ar: "يُفترض أن يفتح تطبيق البريد" },
    mailtoBody: {
      en: "Your message is pre-filled to info@inveeto.com. Send it from there. Nothing opened? Copy the address and email us directly.",
      ar: "رسالتك معبأة مسبقًا إلى info@inveeto.com. أرسلها من هناك. لم يُفتح شيء؟ انسخ العنوان وراسلنا مباشرة.",
    },
    errorTitle: { en: "The inquiry didn't send", ar: "لم يُرسل الاستفسار" },
    errorBody: {
      en: "The connection to our inbox failed. Try again, or email info@inveeto.com directly.",
      ar: "فشل الاتصال بصندوق بريدنا. حاول مجددًا، أو راسلنا مباشرة على info@inveeto.com.",
    },
    mailtoNote: {
      en: "This form opens your email app with your message ready to send to info@inveeto.com.",
      ar: "يفتح هذا النموذج تطبيق البريد لديك مع رسالتك جاهزة للإرسال إلى info@inveeto.com.",
    },
  },
  footer: {
    product: { en: "Product", ar: "المنتج" },
    company: { en: "Company", ar: "الشركة" },
    legal: { en: "Legal", ar: "قانوني" },
    privacy: { en: "Privacy policy", ar: "سياسة الخصوصية" }, // AR: official
    terms: { en: "Terms and conditions", ar: "شروط وأحكام" }, // AR: official
    feedback: { en: "Feedback", ar: "الملاحظات" },
    rights: { en: "© 2026 iNVEETO. All rights reserved.", ar: "© 2026 إنفيتو. جميع الحقوق محفوظة." },
    blurb: {
      en: "Event, contact and campaign management. Organize. Select. Invite. Confirm.",
      ar: "إدارة الفعاليات وجهات الاتصال والحملات. نظّم. حدّد. ادعو. تأكّد",
    },
  },
  features: {
    searchLabel: { en: "Search features", ar: "ابحث في الميزات" },
    searchPlaceholder: { en: "Try “QR”, “duplicate” or “bilingual”", ar: "جرّب «QR» أو «التكرار» أو «لغتين»" },
    all: { en: "All modules", ar: "كل الوحدات" },
    shared: { en: "Shared platform", ar: "المنصة المشتركة" },
    newOnly: { en: "New only", ar: "الجديد فقط" },
    newBadge: { en: "New", ar: "جديد" },
    results: { en: "features", ar: "ميزة" },
    empty: { en: "No feature matches that search. Try a broader word, or clear the filters.", ar: "لا توجد ميزة تطابق هذا البحث. جرّب كلمة أعم أو امسح الفلاتر." },
    clear: { en: "Clear filters", ar: "امسح الفلاتر" },
  },
  stories: {
    customer: { en: "Customer story", ar: "قصة عميل" },
    sponsorship: { en: "Event tech sponsorship", ar: "رعاية تقنية" },
    soon: { en: "Full story coming soon", ar: "القصة الكاملة قريبًا" },
    verified: { en: "Verified customer stories", ar: "قصص عملاء حقيقية" },
    watch: { en: "Watch PLEX 2026 with iNVEETO in action", ar: "شاهد PLEX 2026 مع إنفييتو في التطبيق" },
  },
  pricing: {
    individual: { en: "Individual", ar: "فرد" },
    enterprise: { en: "Enterprise", ar: "مؤسسة" },
    included: { en: "Included", ar: "متضمن" },
    notIncluded: { en: "Not included", ar: "غير متضمن" },
    feature: { en: "Plan limits", ar: "حدود الخطة" },
  },
  usecases: {
    filter: { en: "Filter by industry", ar: "تصفية حسب القطاع" }, // AR: official
    all: { en: "All industries", ar: "جميع القطاعات" }, // AR: official
    why: { en: "Built for how your organization actually works", ar: "مصمم ليتناسب مع طريقة عمل مؤسستك فعلياً" }, // AR: official
    venuesHow: { en: "How venue teams put iNVEETO to work", ar: "كيف تستخدم فرق المنشآت إنفيتو" },
    venuesGain: { en: "What venue teams gain with iNVEETO", ar: "ما تكسبه فرق المنشآت مع إنفيتو" },
    venuesWhy: { en: "Built for how venue teams actually coordinate", ar: "مصمم لطريقة تنسيق فرق المنشآت فعليًا" },
    readMore: { en: "Read more", ar: "اقرأ المزيد" },
    showLess: { en: "Show less", ar: "عرض أقل" },
    dedicated: { en: "Dedicated page", ar: "صفحة مخصصة" },
  },
} satisfies Record<string, Record<string, T | Record<string, T>>>;
