import type { T } from "./i18n";

/** Homepage-only content. Feature blocks come from inveeto.com/en (all 10, same order). */

export const tagline = {
  en: ["Organize.", "Select.", "Invite.", "Confirm."],
  /**
   * AR proofread: the published slogan reads "نظّم. حدّد. ادعو. تأكّد". "ادعو" is not the correct
   * imperative (it should be "ادعُ"), so the site uses the corrected form. Needs sign-off:
   * BUSINESS-APPROVAL.md #3.
   */
  ar: ["نظّم.", "حدّد.", "ادعُ.", "تأكّد."],
};

export const hero = {
  title: { en: "Every connection.\nOne platform.", ar: "كل علاقاتك.\nفي منصة واحدة." },
  body: {
    en: "Organize your contacts. Run events from invitation to check-in. Keep the people who matter engaged, in English and Arabic.",
    ar: "نظّم جهات اتصالك. أدِر فعالياتك من الدعوة حتى تسجيل الحضور. وحافظ على تواصلك مع من يهمّك، بالعربية والإنجليزية.",
  },
  trialNote: { en: "3-month free trial · No credit card information requested", ar: "تجربة مجانية لثلاثة أشهر · لن يتم طلب أي معلومات عن بطاقة الائتمان" },
  categories: {
    en: ["Contact management", "Event management", "Campaign management"],
    ar: ["إدارة جهات الاتصال", "إدارة الفعاليات", "إدارة الحملات"],
  },
};

export const problem = {
  title: {
    en: "Contacts in one spreadsheet. Invitations in another inbox. Attendance on paper.",
    ar: "جهات الاتصال في جدول، والدعوات في بريد آخر، والحضور على الورق.",
  },
  body: {
    en: "Most organizers manage contact lists, invitations and attendance across separate tools. iNVEETO was built to close that gap, so every relationship, event and follow-up lives in one connected system.",
    ar: "يدير معظم المنظّمين قوائم جهات الاتصال والدعوات ومتابعة الحضور عبر أدوات متفرقة. بُني إنفيتو لسدّ هذه الفجوة، لتعيش كل علاقة وفعالية ومتابعة في نظام واحد مترابط.",
  },
};

/** The six-chapter scroll story. Copy is derived from the official feature catalog. */
export const chapters: { id: string; verb: T; title: T; body: T; points: T[] }[] = [
  {
    id: "organize",
    verb: { en: "Organize", ar: "نظّم" },
    title: { en: "One address book your whole team trusts", ar: "دفتر عناوين واحد يثق به فريقك كله" },
    body: {
      en: "Import your contacts, tag them freely, store names in two languages and let duplicate detection keep the list clean.",
      ar: "استورد جهات اتصالك، وأضف الوسوم بحرية، واحفظ الأسماء بلغتين، ودع كشف التكرار يُبقي القائمة نظيفة.",
    },
    points: [
      { en: "Multiple emails, phone numbers, job titles and affiliations per contact", ar: "عدة عناوين بريد وأرقام هواتف ومسميات وظيفية وانتماءات لكل جهة اتصال" },
      { en: "Automatic duplicate resolution, or merge with a full comparison view", ar: "معالجة تلقائية للتكرار، أو دمج عبر عرض مقارنة كامل" },
      { en: "Private contacts, roles and permissions for teams", ar: "جهات اتصال خاصة وأدوار وصلاحيات للفرق" },
    ],
  },
  {
    id: "select",
    verb: { en: "Select", ar: "حدّد" },
    title: { en: "The right people for every invitation", ar: "الأشخاص المناسبون لكل دعوة" },
    body: {
      en: "Filter by tag, job title, company, event history or custom field. Classify guests as VIP, Speaker or Guest, then save the segment for next time.",
      ar: "صفِّ جهات الاتصال حسب الوسم أو المسمى الوظيفي أو الشركة أو سجل الفعاليات أو الحقول المخصصة. صنّف الضيوف كشخصية مهمة أو متحدث أو ضيف، ثم احفظ الشريحة للمرة القادمة.",
    },
    points: [
      { en: "Role-based invitation selection", ar: "اختيار المدعوين حسب الدور" },
      { en: "Reusable guest lists for recurring events", ar: "قوائم ضيوف قابلة لإعادة الاستخدام للفعاليات المتكررة" },
    ],
  },
  {
    id: "invite",
    verb: { en: "Invite", ar: "ادعُ" },
    title: { en: "Invitations that feel personal, in two languages", ar: "دعوات بطابع شخصي وبلغتين" },
    body: {
      en: "Send branded invitations from your own domain, addressed to each guest, with RSVP buttons built in. Or share a public registration link and let people sign up themselves.",
      ar: "أرسل دعوات بهوية مؤسستك من نطاقك الخاص، موجّهة لكل ضيف باسمه، مع أزرار رد مدمجة. أو شارك رابط تسجيل عامًا ليسجّل الناس بأنفسهم.",
    },
    points: [
      { en: "Custom header and footer on every invitation", ar: "ترويسة وتذييل مخصصان لكل دعوة" },
      { en: "Send via your own SMTP, Mailgun or Mailchimp", ar: "أرسل عبر SMTP الخاص بك أو Mailgun أو Mailchimp" },
      { en: "Up to five custom registration fields per event", ar: "حتى خمسة حقول تسجيل مخصصة لكل فعالية" },
    ],
  },
  {
    id: "confirm",
    verb: { en: "Confirm", ar: "تأكّد" },
    title: { en: "From confirmed to checked in, in one scan", ar: "من التأكيد إلى تسجيل الحضور بمسحة واحدة" },
    body: {
      en: "Track confirmations, apologies and pending replies. On the day, check guests in by QR code at the door or let them check themselves in, and register walk-ins on the spot.",
      ar: "تابع التأكيدات والاعتذارات والردود المعلّقة. وفي يوم الفعالية، سجّل حضور الضيوف برمز QR عند الباب أو دعهم يسجّلون بأنفسهم، وسجّل غير المدعوين في الموقع.",
    },
    points: [
      { en: "Up to 6 check-ins per event for multi-session days", ar: "حتى 6 تسجيلات حضور لكل فعالية للأيام متعددة الجلسات" },
      { en: "One-click check-in cancellation", ar: "إلغاء تسجيل الحضور بنقرة واحدة" },
      { en: "Personalized event passes and real-time attendance", ar: "بطاقات حضور مخصصة وحضور لحظي" },
    ],
  },
  {
    id: "engage",
    verb: { en: "Engage", ar: "تواصل" },
    title: { en: "Stay in touch between events", ar: "ابقَ على تواصل بين الفعاليات" },
    body: {
      en: "Turn a guest list or saved segment into a campaign audience. Send newsletters, announcements and thank-yous, then resend to non-openers in one click.",
      ar: "حوّل قائمة ضيوف أو شريحة محفوظة إلى جمهور حملة. أرسل النشرات والإعلانات ورسائل الشكر، ثم أعد الإرسال لمن لم يفتحوا الرسالة بنقرة واحدة.",
    },
    points: [
      { en: "Up to 100 active campaigns side by side", ar: "حتى 100 حملة نشطة جنبًا إلى جنب" },
      { en: "Response status tracking: who responded, who pledged, who needs a follow-up", ar: "متابعة الردود: من ردّ، ومن تعهّد، ومن يحتاج إلى متابعة" },
    ],
  },
];

export const unified = {
  title: { en: "One platform. Every relationship, every event, every follow-up.", ar: "منصة واحدة. كل علاقة، وكل فعالية، وكل متابعة." },
  body: {
    en: "Every module feeds the next, so nothing you build gets rebuilt. A contact you tag today becomes a guest tomorrow and a campaign audience next month, with their full participation history on one profile.",
    ar: "كل وحدة تغذّي التالية، فلا يُعاد بناء شيء أنشأته. جهة الاتصال التي تضيف إليها وسمًا اليوم تصبح ضيفًا غدًا وجمهور حملة الشهر القادم، مع سجل مشاركتها الكامل في ملف واحد.",
  },
};

export const highlights: { id: string; title: T; body: T; module: "addressBook" | "events" | "campaigns" | "platform" }[] = [
  {
    id: "contacts",
    module: "addressBook",
    title: { en: "Contact management made simple", ar: "إدارة جهات الاتصال ببساطة" },
    body: {
      en: "Organize your address book with free-text tags and labels. Add multiple emails, phone numbers and job titles per contact.",
      ar: "نظّم دفتر عناوينك بوسوم وتصنيفات نصية حرة، وأضف عدة عناوين بريد وأرقام هواتف ومسميات وظيفية لكل جهة اتصال.",
    },
  },
  {
    id: "dual-language",
    module: "addressBook",
    title: { en: "Dual-language contact management", ar: "إدارة جهات الاتصال بلغتين" },
    body: {
      en: "Store names in two languages to avoid mispronouncing them at the time of the event.",
      ar: "احفظ الأسماء بلغتين لتجنّب الخطأ في نطقها وقت الفعالية.",
    },
  },
  {
    id: "events",
    module: "events",
    title: { en: "Streamline your events from start to finish", ar: "نظّم فعالياتك من البداية إلى النهاية" },
    body: {
      en: "Manage virtual or in-person events, track RSVPs and check in attendees from a single platform.",
      ar: "أدِر الفعاليات الافتراضية أو الحضورية، وتابع الردود، وسجّل حضور الضيوف من منصة واحدة.",
    },
  },
  {
    id: "invitations",
    module: "campaigns",
    title: { en: "Personalized invitations & newsletters", ar: "دعوات ونشرات إخبارية مخصصة" },
    body: {
      en: "Send personalized event invitations and newsletters, delivered through your own Mailgun, Mailchimp or SMTP setup.",
      ar: "أرسل دعوات فعاليات ونشرات إخبارية مخصصة عبر إعدادات Mailgun أو Mailchimp أو SMTP الخاصة بك.",
    },
  },
  {
    id: "rsvp",
    module: "events",
    title: { en: "Stay organized with RSVP tracking", ar: "ابقَ منظّمًا مع متابعة الردود" },
    body: {
      en: "From RSVP buttons in invitation emails to follow-up activities, stay on top of your guest list.",
      ar: "من أزرار الرد في رسائل الدعوة إلى أنشطة المتابعة، ابقَ مطّلعًا على قائمة ضيوفك.",
    },
  },
  {
    id: "qr",
    module: "events",
    title: { en: "QR check-ins & smooth walk-in registration", ar: "تسجيل حضور برمز QR وتسجيل سلس لغير المدعوين" },
    body: {
      en: "Use a QR code for quick attendee check-ins and register walk-ins (uninvited attendees) effortlessly.",
      ar: "استخدم رمز QR لتسجيل حضور سريع، وسجّل الحاضرين غير المدعوين بسهولة.",
    },
  },
  {
    id: "reports",
    module: "events",
    title: { en: "Generate event reports", ar: "أنشئ تقارير الفعاليات" },
    body: {
      en: "Analyze RSVP responses against attendance before and after your events.",
      ar: "حلّل الردود مقارنةً بالحضور قبل فعالياتك وبعدها.",
    },
  },
  {
    id: "share",
    module: "events",
    title: { en: "Share events, collect registrations, grow engagement", ar: "شارك فعالياتك، واجمع التسجيلات، وعزّز التفاعل" },
    body: {
      en: "Share your event as a URL or scannable QR code to increase attendee participation.",
      ar: "شارك فعاليتك كرابط أو رمز QR قابل للمسح لزيادة مشاركة الحضور.",
    },
  },
];

export const benefits: { id: string; title: T; body: T }[] = [
  {
    id: "support",
    title: { en: "Here for you, every step of the way", ar: "معك في كل خطوة" },
    body: {
      en: "Same-day response and review for all your inquiries, with no waiting line.",
      ar: "رد ومراجعة في اليوم نفسه لجميع استفساراتك، دون قوائم انتظار.",
    },
  },
  {
    id: "data",
    title: { en: "Take full control of your data", ar: "تحكّم كامل في بياناتك" },
    body: {
      en: "User-controlled data hosted on Microsoft Azure servers in East US. Delete your data anytime.",
      ar: "بيانات يتحكم بها المستخدم ومستضافة على خوادم Microsoft Azure في شرق الولايات المتحدة. احذف بياناتك متى شئت.",
    },
  },
  {
    id: "teams",
    title: { en: "Built for teams", ar: "مصمم للفرق" },
    body: {
      en: "Invite colleagues, assign roles, keep sensitive contacts private and run the same event together without overlap.",
      ar: "ادعُ زملاءك، وحدّد الأدوار، وأبقِ جهات الاتصال الحساسة خاصة، وأديروا الفعالية نفسها معًا دون تداخل.",
    },
  },
  {
    id: "bilingual",
    title: { en: "Bilingual by design", ar: "ثنائي اللغة بالتصميم" }, // AR: official (Use Cases)
    body: {
      en: "Arabic and English are first-class citizens: contacts, invitations and interfaces work seamlessly in both directions.",
      ar: "اللغتان العربية والإنجليزية أساسيتان في التصميم — جهات الاتصال والدعوات والواجهات تعمل بسلاسة في كلا الاتجاهين.", // AR: official
    },
  },
];

/** "What can I do with iNVEETO?" — homepage section, verbatim meaning. */
export const whatCanIDo: { id: string; title: T; body: T }[] = [
  {
    id: "organize",
    title: { en: "Organize your address book", ar: "نظّم دفتر عناوينك" },
    body: {
      en: "Centralize contacts, classify guests, manage tags and keep your address book clean for every event.",
      ar: "اجمع جهات اتصالك في مكان واحد، وصنّف الضيوف، وأدِر الوسوم، وأبقِ دفتر عناوينك نظيفًا لكل فعالية.",
    },
  },
  {
    id: "create",
    title: { en: "Create events & newsletters", ar: "أنشئ الفعاليات والنشرات" },
    body: {
      en: "Create events, send invitations, manage RSVPs and run follow-up campaigns from one place.",
      ar: "أنشئ الفعاليات، وأرسل الدعوات، وأدِر الردود، وأطلق حملات المتابعة من مكان واحد.",
    },
  },
  {
    id: "reports",
    title: { en: "Generate reports", ar: "أنشئ التقارير" },
    body: {
      en: "Track attendance, responses and participation history, and generate clearer reports after every event.",
      ar: "تابع الحضور والردود وسجل المشاركة، وأنشئ تقارير أوضح بعد كل فعالية.",
    },
  },
];
