import type { T } from "./i18n";

/**
 * Industries from inveeto.com/en/usecases (EN + official AR on the same page).
 * Images are the same Unsplash photos the live page uses.
 * Only "venues" has a dedicated page on the live site; the old
 * /usecases/tourism-hospitality/ URL returns 404 (see OPEN-QUESTIONS.md #4).
 */
export type Industry = {
  id: string;
  name: T;
  tag: T;
  image: string;
  alt: T;
  points: T[];
  detailSlug?: string;
};

export const usecasesHero = {
  title: { en: "How organizations use iNVEETO", ar: "كيف تستخدم المؤسسات إنفيتو" }, // AR: official
  body: {
    en: "From government ceremonies to hotel events and university registrations, organizations across industries use iNVEETO to manage contacts, invitations, attendance and stakeholder communication in one place.",
    ar: "من المراسم الحكومية إلى فعاليات الفنادق وفعاليات التسجيل الجامعي — تعتمد المؤسسات في مختلف القطاعات على إنفيتو لإدارة جهات الاتصال، والدعوات، والحضور، والتواصل مع أصحاب المصلحة من خلال منصة واحدة.", // AR: official
  },
  stats: [
    { value: "9+", label: { en: "Industry types", ar: "قطاعًا مختلفًا" } },
    { value: "25K", label: { en: "Contacts supported", ar: "جهة اتصال" } },
    { value: "AR/EN", label: { en: "Bilingual by design", ar: "مصمم للعمل باللغتين" } },
  ],
};

const u = (id: string) => `https://images.unsplash.com/${id}?w=900&q=75&auto=format&fit=crop`;

export const industries: Industry[] = [
  {
    id: "hospitality",
    name: { en: "Hotels & hospitality", ar: "الفنادق والضيافة" },
    tag: { en: "Hospitality", ar: "الضيافة" },
    image: u("photo-1566073771259-6a8506099945"),
    alt: { en: "Hotel venue event space", ar: "فعاليات الفنادق" },
    detailSlug: "venues",
    points: [
      { en: "Guest events and in-hotel conferences", ar: "فعاليات الضيوف والمؤتمرات داخل الفندق" },
      { en: "Corporate meeting registration and check-in", ar: "تسجيل اجتماعات الشركات وإدارة الحضور" },
      { en: "VIP invitation management and personalized passes", ar: "إدارة دعوات كبار الشخصيات وإصدار بطاقات حضور مخصصة" },
    ],
  },
  {
    id: "government",
    name: { en: "Government & public sector", ar: "الحكومة والقطاع العام" },
    tag: { en: "Public sector", ar: "القطاع العام" },
    image: u("photo-1529107386315-e1a2ed48a620"),
    alt: { en: "Government meeting hall", ar: "قاعة اجتماعات حكومية" },
    points: [
      { en: "Official ceremonies and state-level event management", ar: "إدارة المراسم والفعاليات الرسمية" },
      { en: "Stakeholder and delegate registration at scale", ar: "تسجيل أصحاب المصلحة والوفود على نطاق واسع" },
      { en: "Multi-agency coordination with role-based access", ar: "تنسيق متعدد الجهات مع صلاحيات وصول حسب الدور" },
    ],
  },
  {
    id: "ngos",
    name: { en: "NGOs & development organizations", ar: "المنظمات غير الحكومية والتنموية" },
    tag: { en: "Non-profit", ar: "غير ربحي" },
    image: u("photo-1559027615-cd4628902d4a"),
    alt: { en: "NGO community gathering", ar: "تجمع مجتمعي لمنظمة غير حكومية" },
    points: [
      { en: "Donor relations events and beneficiary programs", ar: "فعاليات المانحين وبرامج المستفيدين" },
      { en: "Community outreach campaigns and follow-ups", ar: "حملات التواصل المجتمعي والمتابعة" },
      { en: "Volunteer coordination and attendance tracking", ar: "إدارة المتطوعين وتتبع الحضور" },
    ],
  },
  {
    id: "universities",
    name: { en: "Universities & training providers", ar: "الجامعات وجهات التدريب" },
    tag: { en: "Education", ar: "التعليم" },
    image: u("photo-1576495199011-eb94736d05d6"),
    alt: { en: "University graduation ceremony", ar: "حفل تخرج جامعي" },
    points: [
      { en: "Graduation ceremonies and alumni invitations", ar: "حفلات التخرج ودعوات الخريجين" },
      { en: "Campus event registration with QR check-in", ar: "تسجيل فعاليات الحرم الجامعي باستخدام رمز QR" },
      { en: "Academic conferences and faculty coordination", ar: "المؤتمرات الأكاديمية وتنسيق أعضاء هيئة التدريس" },
    ],
  },
  {
    id: "municipalities",
    name: { en: "Municipalities", ar: "البلديات" },
    tag: { en: "Municipalities", ar: "البلديات" },
    image: u("photo-1444723121867-7a241cacace9"),
    alt: { en: "Municipal council meeting and public forum", ar: "اجتماع المجلس البلدي ومنتدى عام" },
    points: [
      { en: "City council meetings and public forums", ar: "اجتماعات المجلس البلدي والمنتديات العامة" },
      { en: "Community engagement events and town halls", ar: "فعاليات التفاعل المجتمعي واللقاءات المفتوحة" },
      { en: "Public service announcements and information sessions", ar: "إعلانات الخدمة العامة والجلسات التعريفية" },
    ],
  },
  {
    id: "planners",
    name: { en: "Event planners", ar: "منظمو الفعاليات" },
    tag: { en: "Event planners", ar: "منظمو الفعاليات" },
    image: u("photo-1556761175-4b46a572b786"),
    alt: { en: "Event planner coordinating a conference registration", ar: "منظم فعاليات ينسق تسجيل مؤتمر" },
    points: [
      { en: "Conferences, seminars and workshops", ar: "المؤتمرات والندوات وورش العمل" },
      { en: "Exhibitions and networking events", ar: "المعارض وفعاليات التواصل" },
      { en: "Product launches and community events", ar: "إطلاق المنتجات والفعاليات المجتمعية" },
    ],
  },
  {
    id: "corporate",
    name: { en: "Corporate & enterprise", ar: "الشركات والمؤسسات" },
    tag: { en: "Enterprise", ar: "مؤسسات" },
    image: u("photo-1515187029135-18ee286d815b"),
    alt: { en: "Corporate boardroom event", ar: "اجتماع شركات" },
    points: [
      { en: "Board meetings and executive summits", ar: "اجتماعات مجلس الإدارة والقمم التنفيذية" },
      { en: "Company-wide town halls and internal events", ar: "اللقاءات العامة للشركة والفعاليات الداخلية" },
      { en: "Client hospitality and partner engagement programs", ar: "برامج ضيافة العملاء وإشراك الشركاء" },
    ],
  },
  {
    id: "facilities",
    name: { en: "Building & facility management", ar: "إدارة المباني والمرافق" },
    tag: { en: "Facilities", ar: "إدارة المباني والمرافق" },
    image: u("photo-1486406146926-c627a92ad1ab"),
    alt: { en: "Facility manager coordinating building visitor access", ar: "مسؤول مرافق ينسق دخول الزوار إلى المبنى" },
    points: [
      { en: "Building access and contractor coordination", ar: "إدارة الوصول إلى المباني وتنسيق المقاولين" },
      { en: "Visitor and guest management", ar: "إدارة الزوار والضيوف" },
      { en: "Internal events and stakeholder engagement", ar: "الفعاليات الداخلية والتواصل مع أصحاب المصلحة" },
    ],
  },
  {
    id: "media",
    name: { en: "Media institutions", ar: "المؤسسات الإعلامية" },
    tag: { en: "Media", ar: "المؤسسات الإعلامية" },
    // The live page reuses the event-planner photo for Media; kept as-is (OPEN-QUESTIONS.md #8).
    image: u("photo-1556761175-4b46a572b786"),
    alt: { en: "Press conference and media event coordination", ar: "مؤتمر صحفي وتنسيق فعالية إعلامية" },
    points: [
      { en: "Press conferences and public events", ar: "المؤتمرات الصحفية والفعاليات العامة" },
      { en: "Editorial coordination and production meetings", ar: "التنسيق التحريري واجتماعات الإنتاج" },
      { en: "Journalist, guest and stakeholder management", ar: "إدارة الصحفيين والضيوف وأصحاب المصلحة" },
    ],
  },
];

export const whyChoose: { id: string; title: T; body: T }[] = [
  {
    id: "every-org",
    title: { en: "Built for every organization", ar: "مصمم لكل المؤسسات" },
    body: {
      en: "Whether you manage 50 or 5,000 contacts, iNVEETO scales to your operations without changing how your team works.",
      ar: "سواء كنت تدير 50 أو 5,000 جهة اتصال، يتوسع إنفيتو مع عملياتك دون تغيير طريقة عمل فريقك.",
    },
  },
  {
    id: "secure",
    title: { en: "Secure & reliable", ar: "آمن وموثوق" },
    body: {
      en: "Role-based access, private contact visibility and secure email delivery through your own domain keep your data in control.",
      ar: "صلاحيات وصول حسب الدور، وخصوصية في عرض جهات الاتصال، وإرسال بريد إلكتروني آمن عبر نطاقك الخاص يبقيان بياناتك تحت السيطرة.",
    },
  },
  {
    id: "bilingual",
    title: { en: "Bilingual by design", ar: "ثنائي اللغة بالتصميم" },
    body: {
      en: "Arabic and English are first-class citizens: contacts, invitations and interfaces work seamlessly in both directions.",
      ar: "اللغتان العربية والإنجليزية أساسيتان في التصميم — جهات الاتصال والدعوات والواجهات تعمل بسلاسة في كلا الاتجاهين.",
    },
  },
  {
    id: "smarter",
    title: { en: "Smarter engagement", ar: "تفاعل أذكى" },
    body: {
      en: "From QR check-in to real-time attendance reports, every event generates insights that improve your next one.",
      ar: "من تسجيل الدخول بالرمز الرقمي إلى تقارير الحضور الفورية، كل فعالية تولّد رؤى تحسّن فعاليتك القادمة.",
    },
  },
];

/** inveeto.com/en/usecases/venues — full substantive content. AR is a new translation. */
export const venues = {
  hero: {
    kicker: { en: "Venue event management", ar: "إدارة فعاليات المنشآت" },
    title: { en: "Simplify guest engagement, internal coordination and venue events", ar: "بسّط التواصل مع الضيوف والتنسيق الداخلي وفعاليات منشأتك" },
    body: {
      en: "Venues coordinate a wide range of daily operations involving teams, guests, clients, suppliers, partners and event participants, all requiring organized communication and participant management.",
      ar: "تنسّق المنشآت مجموعة واسعة من العمليات اليومية التي تشمل الفرق والضيوف والعملاء والموردين والشركاء والمشاركين في الفعاليات، وكلها تتطلب تواصلًا منظمًا وإدارة للمشاركين.",
    },
    image: "https://images.unsplash.com/photo-1677129663241-5be1f17fe6fe?w=1200&q=80&auto=format&fit=crop",
  },
  intro: [
    {
      en: "As venues work with multiple teams and external stakeholders, managing invitations, registrations, attendance, guest information and communication across different activities can become increasingly complex. Relying on separate tools and manual processes makes coordination more time-consuming.",
      ar: "مع تعامل المنشآت مع فرق متعددة وأصحاب مصلحة خارجيين، تصبح إدارة الدعوات والتسجيلات والحضور ومعلومات الضيوف والتواصل عبر أنشطة مختلفة أكثر تعقيدًا. والاعتماد على أدوات متفرقة وإجراءات يدوية يجعل التنسيق أكثر استهلاكًا للوقت.",
    },
    {
      en: "iNVEETO provides a centralized platform for managing invitations, registrations, attendance tracking, stakeholder communication and participation records. Venue teams can coordinate internal meetings, manage employee training, organize relationships with guests, clients and partners, and support conferences, events, exhibitions and other venue activities through structured workflows.",
      ar: "يوفّر إنفيتو منصة مركزية لإدارة الدعوات والتسجيلات وتتبع الحضور والتواصل مع أصحاب المصلحة وسجلات المشاركة. يمكن لفرق المنشأة تنسيق الاجتماعات الداخلية، وإدارة تدريب الموظفين، وتنظيم العلاقات مع الضيوف والعملاء والشركاء، ودعم المؤتمرات والفعاليات والمعارض وغيرها من الأنشطة عبر سير عمل منظم.",
    },
    {
      en: "By bringing communication, participant management and stakeholder engagement together in one platform, iNVEETO helps venues improve coordination, enhance guest engagement and streamline the management of events and daily operations.",
      ar: "بجمع التواصل وإدارة المشاركين والتفاعل مع أصحاب المصلحة في منصة واحدة، يساعد إنفيتو المنشآت على تحسين التنسيق وتعزيز تفاعل الضيوف وتبسيط إدارة الفعاليات والعمليات اليومية.",
    },
  ],
  areas: [
    {
      id: "internal",
      title: { en: "Internal coordination", ar: "التنسيق الداخلي" },
      summary: {
        en: "Coordinate venue teams, employee training, management meetings, event teams and internal updates with structured invitations, reminders and attendance tracking.",
        ar: "نسّق فرق المنشأة وتدريب الموظفين واجتماعات الإدارة وفرق الفعاليات والتحديثات الداخلية عبر دعوات منظمة وتذكيرات وتتبع للحضور.",
      },
      featured: {
        label: { en: "Venue team management", ar: "إدارة فرق المنشأة" },
        short: { en: "Organize team meetings and track attendance.", ar: "نظّم اجتماعات الفريق وتابع الحضور." },
        title: { en: "Keep venue teams connected across daily operations", ar: "أبقِ فرق المنشأة مترابطة عبر العمليات اليومية" },
        body: [
          {
            en: "Venues rely on multiple teams working together throughout the day. Operations, events, sales, guest services, maintenance and management teams often need to coordinate meetings, briefings, training sessions and operational updates to keep activities running smoothly.",
            ar: "تعتمد المنشآت على فرق متعددة تعمل معًا طوال اليوم. وغالبًا ما تحتاج فرق العمليات والفعاليات والمبيعات وخدمات الضيوف والصيانة والإدارة إلى تنسيق الاجتماعات والإحاطات والدورات التدريبية والتحديثات التشغيلية لضمان سير الأنشطة بسلاسة.",
          },
          {
            en: "Managing these activities through emails, messaging apps or manual attendance lists can make it difficult to ensure everyone receives the right information and participates when needed.",
            ar: "إدارة هذه الأنشطة عبر البريد الإلكتروني أو تطبيقات المراسلة أو قوائم الحضور اليدوية تجعل من الصعب التأكد من وصول المعلومات الصحيحة للجميع ومشاركتهم عند الحاجة.",
          },
          {
            en: "iNVEETO provides a structured way to organize internal meetings, invite the right teams, send reminders and maintain attendance records. Whether it's an operations briefing, a department meeting or staff training, venue managers can coordinate activities through one platform while keeping a complete participation history.",
            ar: "يوفّر إنفيتو طريقة منظمة لتنظيم الاجتماعات الداخلية ودعوة الفرق المناسبة وإرسال التذكيرات والاحتفاظ بسجلات الحضور. سواء كانت إحاطة تشغيلية أو اجتماع قسم أو تدريبًا للموظفين، يمكن لمديري المنشأة تنسيق الأنشطة عبر منصة واحدة مع الاحتفاظ بسجل مشاركة كامل.",
          },
          {
            en: "By centralizing communication and attendance management, venues can reduce administrative work and improve coordination between teams.",
            ar: "بمركزة التواصل وإدارة الحضور، تستطيع المنشآت تقليل العمل الإداري وتحسين التنسيق بين الفرق.",
          },
        ],
      },
      more: [
        { label: { en: "Employee training", ar: "تدريب الموظفين" }, short: { en: "Manage registrations, participation and attendance records.", ar: "أدِر التسجيلات والمشاركة وسجلات الحضور." } },
        { label: { en: "Event team coordination", ar: "تنسيق فرق الفعاليات" }, short: { en: "Coordinate teams and communication for venue events.", ar: "نسّق الفرق والتواصل لفعاليات المنشأة." } },
        { label: { en: "Management meetings", ar: "اجتماعات الإدارة" }, short: { en: "Organize invitations and participant lists.", ar: "نظّم الدعوات وقوائم المشاركين." } },
        { label: { en: "Internal updates", ar: "التحديثات الداخلية" }, short: { en: "Send targeted updates by department.", ar: "أرسل تحديثات موجّهة حسب القسم." } },
      ],
    },
    {
      id: "stakeholders",
      title: { en: "Stakeholder management", ar: "إدارة أصحاب المصلحة" },
      summary: {
        en: "Maintain organized communication with guests, clients, suppliers, partners and other stakeholders through centralized contact management.",
        ar: "حافظ على تواصل منظم مع الضيوف والعملاء والموردين والشركاء وأصحاب المصلحة الآخرين عبر إدارة مركزية لجهات الاتصال.",
      },
      featured: {
        label: { en: "Guest management", ar: "إدارة الضيوف" },
        short: { en: "Manage guest information and communication.", ar: "أدِر معلومات الضيوف والتواصل معهم." },
        title: { en: "Improve guest communication before, during and after their event", ar: "حسّن التواصل مع الضيوف قبل فعاليتهم وأثناءها وبعدها" },
        body: [
          {
            en: "Guest experience begins long before arrival and continues after the event. Venues regularly communicate with guests regarding event participation, special services, updates and follow-up requests. As guest databases continue to grow, maintaining organized communication becomes increasingly important.",
            ar: "تبدأ تجربة الضيف قبل وصوله بوقت طويل وتستمر بعد الفعالية. تتواصل المنشآت بانتظام مع الضيوف بشأن المشاركة في الفعاليات والخدمات الخاصة والتحديثات وطلبات المتابعة. ومع نمو قواعد بيانات الضيوف، يزداد أهمية الحفاظ على تواصل منظم.",
          },
          {
            en: "iNVEETO enables venues to maintain a centralized guest database, organize contacts and communicate with different guest segments based on specific needs or activities. Venues can send invitations to events, share important updates, communicate with participants and maintain a history of guest engagement.",
            ar: "يتيح إنفيتو للمنشآت الاحتفاظ بقاعدة بيانات مركزية للضيوف، وتنظيم جهات الاتصال، والتواصل مع شرائح مختلفة من الضيوف حسب احتياجات أو أنشطة محددة. ويمكنها إرسال دعوات الفعاليات ومشاركة التحديثات المهمة والتواصل مع المشاركين والاحتفاظ بسجل لتفاعل الضيوف.",
          },
          {
            en: "Having guest information and communication in one place helps venues deliver a more organized and consistent experience while building stronger long-term relationships.",
            ar: "وجود معلومات الضيوف والتواصل معهم في مكان واحد يساعد المنشآت على تقديم تجربة أكثر تنظيمًا واتساقًا مع بناء علاقات أقوى على المدى الطويل.",
          },
        ],
      },
      more: [
        { label: { en: "Clients & partners", ar: "العملاء والشركاء" }, short: { en: "Organize relationships and communication with clients and partners.", ar: "نظّم العلاقات والتواصل مع العملاء والشركاء." } },
        { label: { en: "Suppliers", ar: "الموردون" }, short: { en: "Maintain supplier information and manage invitations and updates.", ar: "احتفظ بمعلومات الموردين وأدِر الدعوات والتحديثات." } },
        { label: { en: "Partners", ar: "الشركاء" }, short: { en: "Coordinate collaboration and communication.", ar: "نسّق التعاون والتواصل." } },
        { label: { en: "Other stakeholders", ar: "أصحاب مصلحة آخرون" }, short: { en: "Support stakeholder communication and coordination.", ar: "ادعم التواصل والتنسيق مع أصحاب المصلحة." } },
      ],
    },
    {
      id: "engagement",
      title: { en: "Venue engagement", ar: "تفاعل المنشأة" },
      summary: {
        en: "Manage registrations, attendance and communication for conferences, corporate events, exhibitions, venue activities and guest engagement initiatives.",
        ar: "أدِر التسجيلات والحضور والتواصل للمؤتمرات وفعاليات الشركات والمعارض وأنشطة المنشأة ومبادرات تفاعل الضيوف.",
      },
      featured: {
        label: { en: "Conferences", ar: "المؤتمرات" },
        short: { en: "Manage registrations, attendance and participant communication.", ar: "أدِر التسجيلات والحضور والتواصل مع المشاركين." },
        title: { en: "Deliver better conference experiences with organized participant management", ar: "قدّم تجارب مؤتمرات أفضل بإدارة منظمة للمشاركين" },
        body: [
          {
            en: "Venues host a wide variety of conferences, seminars, business meetings and professional events. Event organizers expect more than just a space: they need an efficient way to manage participant registration, attendance and communication throughout the event lifecycle.",
            ar: "تستضيف المنشآت مجموعة واسعة من المؤتمرات والندوات واجتماعات الأعمال والفعاليات المهنية. ويتوقع المنظمون أكثر من مجرد مساحة: يحتاجون طريقة فعّالة لإدارة تسجيل المشاركين وحضورهم والتواصل معهم طوال دورة حياة الفعالية.",
          },
          {
            en: "iNVEETO supports conference management by allowing organizers and venue teams to manage registrations, send invitations and reminders, communicate with participants and track attendance from a single platform. Venues can also maintain participation records that support post-event reporting and future engagement.",
            ar: "يدعم إنفيتو إدارة المؤتمرات بتمكين المنظمين وفرق المنشأة من إدارة التسجيلات وإرسال الدعوات والتذكيرات والتواصل مع المشاركين وتتبع الحضور من منصة واحدة. كما يمكن للمنشآت الاحتفاظ بسجلات مشاركة تدعم التقارير بعد الفعالية والتفاعل المستقبلي.",
          },
          {
            en: "Offering structured participant management alongside venue facilities allows venues to enhance their event services while providing organizers with a more efficient event experience.",
            ar: "تقديم إدارة منظمة للمشاركين إلى جانب مرافق المنشأة يتيح لها تعزيز خدمات الفعاليات ومنح المنظمين تجربة أكثر كفاءة.",
          },
        ],
      },
      more: [
        { label: { en: "Corporate & professional events", ar: "فعاليات الشركات والفعاليات المهنية" }, short: { en: "Organize participants and track attendance.", ar: "نظّم المشاركين وتابع الحضور." } },
        { label: { en: "Venue events", ar: "فعاليات المنشأة" }, short: { en: "Manage invitations, registrations and engagement.", ar: "أدِر الدعوات والتسجيلات والتفاعل." } },
        { label: { en: "Exhibitions", ar: "المعارض" }, short: { en: "Organize attendees and participation.", ar: "نظّم الحضور والمشاركة." } },
        { label: { en: "Guest experiences", ar: "تجارب الضيوف" }, short: { en: "Support guest engagement and experience participation.", ar: "ادعم تفاعل الضيوف ومشاركتهم في التجارب." } },
      ],
    },
  ],
  benefits: [
    { en: "Centralized communication across venue teams", ar: "تواصل مركزي عبر فرق المنشأة" },
    { en: "Registration and attendance management", ar: "إدارة التسجيل والحضور" },
    { en: "Organized guest and stakeholder databases", ar: "قواعد بيانات منظمة للضيوف وأصحاب المصلحة" },
    { en: "Streamlined event and activity coordination", ar: "تنسيق مبسّط للفعاليات والأنشطة" },
    { en: "Improved participant engagement tracking", ar: "تتبع أفضل لتفاعل المشاركين" },
    { en: "Reduced manual administrative work", ar: "عمل إداري يدوي أقل" },
  ],
  why: {
    en: "Venues depend on effective coordination between teams, guests, clients, partners and event participants. Whether managing venue operations, employee activities, client relationships or events, iNVEETO helps organize communication, registrations, attendance and stakeholder engagement through a single platform that supports everyday venue operations.",
    ar: "تعتمد المنشآت على تنسيق فعّال بين الفرق والضيوف والعملاء والشركاء والمشاركين في الفعاليات. سواء في إدارة عمليات المنشأة أو أنشطة الموظفين أو علاقات العملاء أو الفعاليات، يساعد إنفيتو على تنظيم التواصل والتسجيلات والحضور والتفاعل مع أصحاب المصلحة عبر منصة واحدة تدعم العمليات اليومية.",
  },
};
