import type { T } from "./i18n";

/**
 * Complete feature catalog from inveeto.com/en/features (audited 11 Oct 2026).
 * Every feature, group and description from the live page is here; wording lightly edited
 * for punctuation only. `isNew` marks the 12 items in "What's new in iNVEETO".
 * Arabic: inveeto.com/ar/features serves English body copy, so all Arabic below is a new
 * translation for review.
 */

export type ModuleId = "addressBook" | "events" | "campaigns";
export type Feature = { id: string; title: T; desc: T; isNew?: boolean };
export type FeatureGroup = { id: string; title: T; items: Feature[] };
export type Module = {
  id: ModuleId;
  name: T;
  verbs: T;
  intro: T;
  outro: T;
  groups: FeatureGroup[];
};

export const featuresHero = {
  title: { en: "One platform to organize, select, invite and confirm", ar: "منصة واحدة لتنظّم وتحدّد وتدعو وتتأكّد" },
  body: {
    en: "Stop juggling spreadsheets and separate tools. iNVEETO brings your contacts, events and campaigns into one seamless system, so you can focus on the people, not the process.",
    ar: "توقّف عن التنقل بين جداول البيانات والأدوات المتفرقة. يجمع إنفيتو جهات اتصالك وفعالياتك وحملاتك في نظام واحد متكامل، لتركّز على الناس لا على الإجراءات.",
  },
  stats: [
    { value: "3", label: { en: "Integrated modules", ar: "وحدات متكاملة" } },
    { value: "25K+", label: { en: "Contacts supported", ar: "جهة اتصال مدعومة" } },
    { value: "100", label: { en: "Active events & campaigns", ar: "فعالية وحملة نشطة" } },
    { value: "0", label: { en: "Credit card needed for the trial", ar: "بطاقة ائتمان مطلوبة للتجربة" } },
  ],
};

export const modules: Module[] = [
  {
    id: "addressBook",
    name: { en: "Address Book", ar: "دفتر العناوين" },
    verbs: { en: "Organize", ar: "نظّم" },
    intro: {
      en: "Manage and structure all your contacts in one centralized system: clean, searchable and always ready for your next event.",
      ar: "أدِر جميع جهات اتصالك ونظّمها في نظام مركزي واحد: نظيف، وقابل للبحث، وجاهز دائمًا لفعاليتك القادمة.",
    },
    outro: {
      en: "See how the Address Book works in real events: manage VIPs, teams and stakeholders all in one place.",
      ar: "شاهد كيف يعمل دفتر العناوين في الفعاليات الحقيقية: أدِر كبار الشخصيات والفرق وأصحاب المصلحة في مكان واحد.",
    },
    groups: [
      {
        id: "ab-management",
        title: { en: "Contact management & organization", ar: "إدارة جهات الاتصال وتنظيمها" },
        items: [
          {
            id: "import-export",
            title: { en: "Import & export contacts", ar: "استيراد جهات الاتصال وتصديرها" },
            desc: {
              en: "Bring your existing contact database into iNVEETO with seamless field mapping, structured, clean and ready to use immediately.",
              ar: "انقل قاعدة بيانات جهات اتصالك الحالية إلى إنفيتو مع مطابقة سلسة للحقول، لتكون منظمة ونظيفة وجاهزة للاستخدام فورًا.",
            },
          },
          {
            id: "centralized",
            title: { en: "Centralized address book", ar: "دفتر عناوين مركزي" },
            desc: {
              en: "One place for all your contacts, up to 25,000 on the Enterprise plan, with full details including emails and phone numbers.",
              ar: "مكان واحد لجميع جهات اتصالك، حتى 25,000 جهة في خطة المؤسسات، مع كامل التفاصيل بما فيها البريد الإلكتروني وأرقام الهواتف.",
            },
          },
          {
            id: "multi-titles",
            isNew: true,
            title: { en: "Multiple job titles & affiliations", ar: "مسميات وظيفية وانتماءات متعددة" },
            desc: {
              en: "Link one contact to several job titles and companies, so every profile reflects the real roles people hold.",
              ar: "اربط جهة الاتصال الواحدة بعدة مسميات وظيفية وشركات، ليعكس كل ملف الأدوار الحقيقية التي يشغلها الشخص.",
            },
          },
          {
            id: "tagging",
            title: { en: "Contact & organization tagging", ar: "وسوم جهات الاتصال والمؤسسات" },
            desc: {
              en: "Label contacts with unlimited free-text tags so you can find, filter and segment the right people in seconds.",
              ar: "صنّف جهات الاتصال بوسوم نصية حرة غير محدودة لتجد الأشخاص المناسبين وتفلترهم وتقسّمهم في ثوانٍ.",
            },
          },
          {
            id: "bilingual-contacts",
            title: { en: "Bilingual contact management", ar: "إدارة جهات اتصال ثنائية اللغة" },
            desc: {
              en: "Store contact names in two languages so your team pronounces them right at every event. No awkward moments.",
              ar: "احفظ أسماء جهات الاتصال بلغتين ليلفظها فريقك بشكل صحيح في كل فعالية، دون أي مواقف محرجة.",
            },
          },
          {
            id: "private-contacts",
            title: { en: "Private contact visibility", ar: "خصوصية عرض جهات الاتصال" },
            desc: {
              en: "Keep sensitive contacts hidden from specific team members while keeping your team fully collaborative.",
              ar: "أخفِ جهات الاتصال الحساسة عن أعضاء محددين في الفريق مع الحفاظ على تعاون الفريق الكامل.",
            },
          },
          {
            id: "bulk",
            title: { en: "Bulk contact actions", ar: "إجراءات جماعية على جهات الاتصال" },
            desc: {
              en: "Tag, export or archive hundreds of contacts in one action. No more repetitive manual updates.",
              ar: "أضف الوسوم أو صدّر أو أرشف مئات جهات الاتصال بإجراء واحد، دون تحديثات يدوية متكررة.",
            },
          },
          {
            id: "participation-history",
            title: { en: "Contact participation history", ar: "سجل مشاركات جهة الاتصال" },
            desc: {
              en: "See every event and campaign a contact was part of, right on their profile, so you always know the full story.",
              ar: "اطّلع على كل فعالية وحملة شاركت فيها جهة الاتصال مباشرة من ملفها، لتعرف القصة كاملة دائمًا.",
            },
          },
          {
            id: "employment-history",
            title: { en: "Complete employment history", ar: "سجل وظيفي كامل" },
            desc: {
              en: "Track job changes and status updates so your contact data stays relevant long after the first import.",
              ar: "تابع التغييرات الوظيفية وتحديثات الحالة لتبقى بيانات جهات الاتصال محدّثة بعد الاستيراد الأول بوقت طويل.",
            },
          },
        ],
      },
      {
        id: "ab-segmentation",
        title: { en: "Segmentation & classification", ar: "التقسيم والتصنيف" },
        items: [
          {
            id: "filtering",
            title: { en: "Advanced filtering & segmentation", ar: "فلترة وتقسيم متقدم" },
            desc: {
              en: "Find exactly the right people using tags, job title, company, event history or custom fields, instantly.",
              ar: "اعثر على الأشخاص المناسبين تمامًا باستخدام الوسوم أو المسمى الوظيفي أو الشركة أو سجل الفعاليات أو الحقول المخصصة، فورًا.",
            },
          },
          {
            id: "guest-classification",
            title: { en: "Event guest classification", ar: "تصنيف ضيوف الفعالية" },
            desc: {
              en: "Label each guest as VIP, Speaker or Guest, so your team treats every attendee exactly as they should be treated.",
              ar: "صنّف كل ضيف كشخصية مهمة أو متحدث أو ضيف، ليتعامل فريقك مع كل حاضر بالشكل الذي يليق به.",
            },
          },
          {
            id: "role-selection",
            isNew: true,
            title: { en: "Role-based invitation selection", ar: "اختيار المدعوين حسب الدور" },
            desc: {
              en: "Select invitees based on their role, so the right people get the right invitation every time.",
              ar: "اختر المدعوين بناءً على أدوارهم، لتصل الدعوة المناسبة إلى الأشخاص المناسبين في كل مرة.",
            },
          },
          {
            id: "csv-tags",
            title: { en: "Unlimited CSV tag import", ar: "استيراد غير محدود للوسوم من CSV" },
            desc: {
              en: "Import all your existing tags along with your contacts. No manual re-tagging after migration.",
              ar: "استورد جميع وسومك الحالية مع جهات اتصالك، دون إعادة وسم يدوية بعد النقل.",
            },
          },
          {
            id: "custom-fields",
            title: { en: "Custom contact data fields", ar: "حقول بيانات مخصصة لجهات الاتصال" },
            desc: {
              en: "Capture the data your organization actually needs, beyond names and emails, with fully custom fields.",
              ar: "اجمع البيانات التي تحتاجها مؤسستك فعلًا، إلى جانب الأسماء والبريد الإلكتروني، عبر حقول مخصصة بالكامل.",
            },
          },
        ],
      },
      {
        id: "ab-quality",
        title: { en: "Data quality & team collaboration", ar: "جودة البيانات وتعاون الفريق" },
        items: [
          {
            id: "duplicates",
            title: { en: "Duplicate detection & merge", ar: "كشف التكرار والدمج" },
            desc: {
              en: "Advanced detection rules catch duplicates before they cause confusion, then you merge them yourself with a full comparison view.",
              ar: "تكتشف قواعد متقدمة جهات الاتصال المكررة قبل أن تسبب الالتباس، ثم تدمجها بنفسك عبر عرض مقارنة كامل.",
            },
          },
          {
            id: "auto-duplicates",
            isNew: true,
            title: { en: "Automatic duplicate resolution", ar: "معالجة تلقائية للتكرار" },
            desc: {
              en: "Let iNVEETO resolve and merge duplicates for you, so your address book stays clean without manual review.",
              ar: "دع إنفيتو يعالج التكرارات ويدمجها نيابةً عنك، ليبقى دفتر عناوينك نظيفًا دون مراجعة يدوية.",
            },
          },
          {
            id: "tags-management",
            isNew: true,
            title: { en: "Tags management", ar: "إدارة الوسوم" },
            desc: {
              en: "Update, delete or merge tags across your entire address book without touching each contact.",
              ar: "حدّث الوسوم أو احذفها أو ادمجها في دفتر العناوين بالكامل دون تعديل كل جهة اتصال على حدة.",
            },
          },
          {
            id: "roles-permissions",
            title: { en: "User roles & permissions", ar: "أدوار المستخدمين وصلاحياتهم" },
            desc: {
              en: "Give every team member the right level of access. No more over-sharing or under-sharing sensitive contact data.",
              ar: "امنح كل عضو في الفريق مستوى الوصول المناسب، دون إفراط أو تقصير في مشاركة بيانات جهات الاتصال الحساسة.",
            },
          },
          {
            id: "multi-user",
            title: { en: "Multi-user access", ar: "وصول متعدد المستخدمين" },
            desc: {
              en: "Your whole team works from the same address book and manages it together across teams. No more duplicate files or outdated contact lists.",
              ar: "يعمل فريقك بالكامل على دفتر العناوين نفسه ويديره معًا عبر الفرق، دون ملفات مكررة أو قوائم قديمة.",
            },
          },
          {
            id: "team-invitations",
            isNew: true,
            title: { en: "Team member invitations", ar: "دعوة أعضاء الفريق" },
            desc: {
              en: "Invite colleagues to your account and assign their role from day one.",
              ar: "ادعُ زملاءك إلى حسابك وحدّد أدوارهم من اليوم الأول.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "events",
    name: { en: "Events", ar: "الفعاليات" },
    verbs: { en: "Select. Invite. Confirm.", ar: "حدّد. ادعُ. تأكّد." },
    intro: {
      en: "Plan, invite and manage your events from start to finish, from building the guest list to the last check-in.",
      ar: "خطّط لفعالياتك وادعُ ضيوفك وأدِرها من البداية إلى النهاية، من بناء قائمة الضيوف إلى آخر تسجيل حضور.",
    },
    outro: {
      en: "See how iNVEETO handles events end to end, from the first invitation to the final attendance report.",
      ar: "شاهد كيف يدير إنفيتو الفعاليات من البداية إلى النهاية، من الدعوة الأولى إلى تقرير الحضور النهائي.",
    },
    groups: [
      {
        id: "ev-setup",
        title: { en: "Event setup & guest management", ar: "إعداد الفعالية وإدارة الضيوف" },
        items: [
          {
            id: "create-events",
            title: { en: "Create & manage events", ar: "إنشاء الفعاليات وإدارتها" },
            desc: {
              en: "Run up to 100 active events at once, each with its own guest list, invitations and tracking, without losing control.",
              ar: "أدِر حتى 100 فعالية نشطة في آن واحد، لكل منها قائمة ضيوف ودعوات ومتابعة خاصة، دون أن تفقد السيطرة.",
            },
          },
          {
            id: "invitation-lists",
            isNew: true,
            title: { en: "Create & edit invitation lists", ar: "إنشاء قوائم الدعوات وتعديلها" },
            desc: {
              en: "Build your invitation list, then add or remove guests whenever plans change.",
              ar: "أنشئ قائمة الدعوات، ثم أضف الضيوف أو أزلهم كلما تغيّرت الخطط.",
            },
          },
          {
            id: "public-registration",
            title: { en: "Public pre-registration URL", ar: "رابط تسجيل مسبق عام" },
            desc: {
              en: "Share a registration link so people sign up themselves. No manual data entry, no back-and-forth emails.",
              ar: "شارك رابط تسجيل ليسجّل الناس بأنفسهم، دون إدخال يدوي للبيانات أو رسائل متبادلة.",
            },
          },
          {
            id: "reusable-lists",
            title: { en: "Reusable lists & recurring events", ar: "قوائم قابلة لإعادة الاستخدام وفعاليات متكررة" },
            desc: {
              en: "Reuse guest lists for regular events, save hours on setup and keep your recurring attendees organized.",
              ar: "أعد استخدام قوائم الضيوف للفعاليات الدورية، ووفّر ساعات من الإعداد مع إبقاء الحضور المتكرر منظمًا.",
            },
          },
          {
            id: "guest-roles",
            title: { en: "Guest classification (VIP, Speaker…)", ar: "تصنيف الضيوف (شخصية مهمة، متحدث…)" },
            desc: {
              en: "Assign roles per event so your team knows exactly how to welcome and handle each guest on the day.",
              ar: "حدّد الأدوار لكل فعالية ليعرف فريقك بالضبط كيف يستقبل كل ضيف ويتعامل معه يوم الفعالية.",
            },
          },
          {
            id: "registration-fields",
            title: { en: "Custom registration fields", ar: "حقول تسجيل مخصصة" },
            desc: {
              en: "Collect exactly the information you need from registrants: dietary needs, t-shirt size, session preference, anything.",
              ar: "اجمع المعلومات التي تحتاجها تمامًا من المسجّلين: الاحتياجات الغذائية، مقاس القميص، الجلسة المفضلة، أو أي شيء آخر.",
            },
          },
          {
            id: "time-zones",
            title: { en: "Time zone support", ar: "دعم المناطق الزمنية" },
            desc: {
              en: "Run international events without confusion. Every attendee sees accurate local times, automatically.",
              ar: "أدِر فعاليات دولية دون التباس؛ يرى كل حاضر التوقيت المحلي الصحيح تلقائيًا.",
            },
          },
        ],
      },
      {
        id: "ev-invitations",
        title: { en: "Invitations & communication", ar: "الدعوات والتواصل" },
        items: [
          {
            id: "personalized-invites",
            title: { en: "Personalized invitation emails", ar: "رسائل دعوة مخصصة" },
            desc: {
              en: "Send invitations that feel personal: each guest receives an email addressed directly to them.",
              ar: "أرسل دعوات بطابع شخصي؛ يتلقى كل ضيف رسالة موجّهة إليه مباشرة.",
            },
          },
          {
            id: "branded-templates",
            isNew: true,
            title: { en: "Branded invitation templates", ar: "قوالب دعوات بهوية مؤسستك" },
            desc: {
              en: "Add your own header and footer to every invitation so it looks like your organization, every time.",
              ar: "أضف ترويستك وتذييلك الخاصين إلى كل دعوة لتظهر بهوية مؤسستك في كل مرة.",
            },
          },
          {
            id: "bilingual-invites",
            isNew: true,
            title: { en: "Bilingual invitation delivery", ar: "إرسال الدعوات بلغتين" },
            desc: {
              en: "Send each invitation in two languages, so every guest reads it in the one they prefer.",
              ar: "أرسل كل دعوة بلغتين ليقرأها كل ضيف باللغة التي يفضّلها.",
            },
          },
          {
            id: "updates-cancellations",
            title: { en: "Event updates & cancellations", ar: "تحديثات الفعالية وإلغاؤها" },
            desc: {
              en: "Notify your entire guest list of any change in real time. No more individual emails or missed communications.",
              ar: "أبلغ قائمة ضيوفك كاملة بأي تغيير فورًا، دون رسائل فردية أو تواصل فائت.",
            },
          },
          {
            id: "own-domain",
            title: { en: "Send via your own domain", ar: "الإرسال من نطاقك الخاص" },
            desc: {
              en: "Emails arrive from your organization's address, not a generic platform, keeping your brand front and center.",
              ar: "تصل الرسائل من عنوان مؤسستك لا من منصة عامة، لتبقى هويتك في الواجهة.",
            },
          },
          {
            id: "invitation-types",
            title: { en: "Multiple invitation types", ar: "أنواع متعددة من الدعوات" },
            desc: {
              en: "Public, personal, manual or automatic invites: choose what fits each event best.",
              ar: "دعوات عامة أو شخصية أو يدوية أو تلقائية: اختر ما يناسب كل فعالية.",
            },
          },
        ],
      },
      {
        id: "ev-checkin",
        title: { en: "RSVP, attendance & check-in", ar: "الردود والحضور وتسجيل الدخول" },
        items: [
          {
            id: "rsvp",
            title: { en: "RSVP & attendance tracking", ar: "متابعة الردود والحضور" },
            desc: {
              en: "Know exactly who's coming before the event: track confirmations, apologies and pending responses in real time.",
              ar: "اعرف بالضبط من سيحضر قبل الفعالية: تابع التأكيدات والاعتذارات والردود المعلّقة لحظة بلحظة.",
            },
          },
          {
            id: "qr",
            title: { en: "QR code check-in", ar: "تسجيل الحضور برمز QR" },
            desc: {
              en: "Eliminate long queues and manual lists. Run controlled check-in at the door, or let attendees check themselves in with a personal QR code.",
              ar: "تخلّص من الطوابير الطويلة والقوائم اليدوية. أدِر تسجيل حضور محكومًا عند الباب، أو دع الحضور يسجّلون بأنفسهم برمز QR شخصي.",
            },
          },
          {
            id: "multi-checkin",
            isNew: true,
            title: { en: "Multiple check-ins", ar: "تسجيل حضور متعدد" },
            desc: {
              en: "Check guests in up to 6 times per event, ideal for multi-session days, workshops and conferences.",
              ar: "سجّل حضور الضيوف حتى 6 مرات في الفعالية الواحدة، وهو مثالي للأيام متعددة الجلسات وورش العمل والمؤتمرات.",
            },
          },
          {
            id: "checkin-cancel",
            isNew: true,
            title: { en: "Check-in cancellation", ar: "إلغاء تسجيل الحضور" },
            desc: {
              en: "Checked in the wrong guest? Cancel it in one click and keep your attendance numbers accurate.",
              ar: "سجّلت حضور الضيف الخطأ؟ ألغِه بنقرة واحدة وحافظ على دقة أرقام الحضور.",
            },
          },
          {
            id: "walk-in",
            title: { en: "Walk-in registration", ar: "تسجيل الحضور غير المدعوين" },
            desc: {
              en: "Never turn away an unexpected guest. Register walk-ins on the spot with a QR code and include them in your attendance report.",
              ar: "لا تردّ ضيفًا غير متوقع أبدًا. سجّل الحضور غير المدعوين في الموقع برمز QR وأدرجهم في تقرير الحضور.",
            },
          },
          {
            id: "passes",
            title: { en: "Event pass printing", ar: "طباعة بطاقات الحضور" },
            desc: {
              en: "Print professional personalized passes for your guests, ready before they arrive or printed at the door.",
              ar: "اطبع بطاقات حضور احترافية مخصصة لضيوفك، جاهزة قبل وصولهم أو تُطبع عند الباب.",
            },
          },
          {
            id: "participant-info",
            title: { en: "Participant info at check-in", ar: "معلومات المشارك عند تسجيل الحضور" },
            desc: {
              en: "Your team sees each guest's full profile at check-in, so every welcome feels informed and personal.",
              ar: "يرى فريقك الملف الكامل لكل ضيف عند تسجيل الحضور، ليكون كل استقبال مطّلعًا وشخصيًا.",
            },
          },
          {
            id: "self-checkin",
            title: { en: "Self check-in via email", ar: "تسجيل حضور ذاتي عبر البريد" },
            desc: {
              en: "Attendees check themselves in from their invitation email, reducing staff load at busy event entrances.",
              ar: "يسجّل الحضور أنفسهم من رسالة الدعوة، مما يخفف الضغط على الفريق عند المداخل المزدحمة.",
            },
          },
        ],
      },
      {
        id: "ev-reporting",
        title: { en: "Event reporting", ar: "تقارير الفعاليات" },
        items: [
          {
            id: "realtime-attendance",
            title: { en: "Real-time attendance reporting", ar: "تقارير حضور لحظية" },
            desc: {
              en: "Watch attendance grow live: see who's in the room, who hasn't arrived, and how many walked in unregistered.",
              ar: "تابع نمو الحضور مباشرة: من في القاعة، ومن لم يصل بعد، وكم شخصًا حضر دون تسجيل مسبق.",
            },
          },
          {
            id: "participation-reports",
            title: { en: "Event participation reports", ar: "تقارير المشاركة في الفعاليات" },
            desc: {
              en: "Get a full picture after every event: RSVPs, attendance rates and exportable summaries ready to share.",
              ar: "احصل على صورة كاملة بعد كل فعالية: الردود ونسب الحضور وملخصات قابلة للتصدير والمشاركة.",
            },
          },
          {
            id: "team-ops",
            title: { en: "Team-based event operations", ar: "إدارة الفعاليات بروح الفريق" },
            desc: {
              en: "Multiple team members can manage the same event with role-based support. No overlap, no confusion on the day.",
              ar: "يمكن لعدة أعضاء في الفريق إدارة الفعالية نفسها بصلاحيات حسب الدور، دون تداخل أو ارتباك يوم الفعالية.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "campaigns",
    name: { en: "Campaigns", ar: "الحملات" },
    verbs: { en: "Engage", ar: "تواصل" },
    intro: {
      en: "Reach your audience with targeted communication beyond events: newsletters, announcements and follow-ups that actually land.",
      ar: "تواصل مع جمهورك برسائل موجّهة تتجاوز الفعاليات: نشرات إخبارية وإعلانات ومتابعات تصل فعلًا.",
    },
    outro: {
      en: "Keep your audience engaged between events. Campaigns are how you stay top of mind all year long.",
      ar: "حافظ على تفاعل جمهورك بين الفعاليات؛ فالحملات هي طريقتك للبقاء حاضرًا في أذهانهم طوال العام.",
    },
    groups: [
      {
        id: "cp-delivery",
        title: { en: "Campaign creation & delivery", ar: "إنشاء الحملات وإرسالها" },
        items: [
          {
            id: "launch",
            title: { en: "Create & launch campaigns", ar: "إنشاء الحملات وإطلاقها" },
            desc: {
              en: "Send newsletters, announcements, updates and thank-you messages to the right people, all managed in one campaign dashboard.",
              ar: "أرسل النشرات والإعلانات والتحديثات ورسائل الشكر إلى الأشخاص المناسبين، وأدِرها كلها من لوحة حملات واحدة.",
            },
          },
          {
            id: "100-campaigns",
            isNew: true,
            title: { en: "Up to 100 active campaigns", ar: "حتى 100 حملة نشطة" },
            desc: {
              en: "Run many campaigns side by side, each with its own audience, content and schedule.",
              ar: "أدِر حملات عديدة جنبًا إلى جنب، لكل منها جمهورها ومحتواها وجدولها.",
            },
          },
          {
            id: "reuse-segments",
            isNew: true,
            title: { en: "Reuse segments & guest lists", ar: "إعادة استخدام الشرائح وقوائم الضيوف" },
            desc: {
              en: "Launch a campaign from a saved contact segment or an event guest list. No rebuilding audiences from scratch.",
              ar: "أطلق حملة من شريحة جهات اتصال محفوظة أو من قائمة ضيوف فعالية، دون إعادة بناء الجمهور من الصفر.",
            },
          },
          {
            id: "resend",
            title: { en: "Resend campaign emails", ar: "إعادة إرسال رسائل الحملة" },
            desc: {
              en: "Didn't get a response? Resend to non-openers with one click. No duplicate campaigns, no extra setup.",
              ar: "لم يصلك رد؟ أعد الإرسال لمن لم يفتحوا الرسالة بنقرة واحدة، دون حملات مكررة أو إعداد إضافي.",
            },
          },
          {
            id: "templates",
            title: { en: "Reusable campaign templates", ar: "قوالب حملات قابلة لإعادة الاستخدام" },
            desc: {
              en: "Build once, use forever. Save your best-performing email designs as templates and launch faster every time.",
              ar: "صمّم مرة واستخدم دائمًا. احفظ أفضل تصاميم رسائلك كقوالب وأطلق حملاتك أسرع في كل مرة.",
            },
          },
          {
            id: "branded-sending",
            title: { en: "Branded sending via your domain", ar: "إرسال بهويتك عبر نطاقك" },
            desc: {
              en: "Every campaign email arrives from your organization's domain and mailing setup, building trust and keeping your brand consistent.",
              ar: "تصل كل رسالة حملة من نطاق مؤسستك وإعدادات بريدها، مما يبني الثقة ويحافظ على اتساق هويتك.",
            },
          },
        ],
      },
      {
        id: "cp-targeting",
        title: { en: "Targeting & segmentation", ar: "الاستهداف والتقسيم" },
        items: [
          {
            id: "filters",
            title: { en: "Tag, classification & custom filters", ar: "فلاتر الوسوم والتصنيفات والحقول المخصصة" },
            desc: {
              en: "Send only to who matters: target by tags, classifications, participation history or custom filters so every message is relevant.",
              ar: "أرسل لمن يهمّ فقط: استهدف حسب الوسوم أو التصنيفات أو سجل المشاركة أو فلاتر مخصصة لتكون كل رسالة في مكانها.",
            },
          },
          {
            id: "event-audiences",
            title: { en: "Event-based audiences", ar: "جماهير مبنية على الفعاليات" },
            desc: {
              en: "Your event guest lists become campaign audiences instantly, perfect for post-event follow-ups and thank-yous.",
              ar: "تتحول قوائم ضيوف فعالياتك إلى جماهير للحملات فورًا، وهو مثالي للمتابعة ورسائل الشكر بعد الفعالية.",
            },
          },
          {
            id: "personalized",
            title: { en: "Personalized communication", ar: "تواصل مخصص" },
            desc: {
              en: "Insert each contact's name and details dynamically, so mass emails feel like personal ones.",
              ar: "أدرج اسم كل جهة اتصال وتفاصيلها تلقائيًا، لتبدو الرسائل الجماعية كأنها شخصية.",
            },
          },
          {
            id: "response-status",
            title: { en: "Response status tracking", ar: "متابعة حالة الردود" },
            desc: {
              en: "See who responded, who pledged and who needs a follow-up, so no contact falls through the cracks.",
              ar: "اعرف من ردّ ومن تعهّد ومن يحتاج إلى متابعة، حتى لا تفوتك أي جهة اتصال.",
            },
          },
        ],
      },
    ],
  },
];

export const sharedCapabilities: { id: string; title: T; desc: T }[] = [
  {
    id: "search",
    title: { en: "Search & filtering", ar: "البحث والفلترة" },
    desc: {
      en: "Find anyone or anything across contacts, events and campaigns in seconds.",
      ar: "اعثر على أي شخص أو أي شيء عبر جهات الاتصال والفعاليات والحملات في ثوانٍ.",
    },
  },
  {
    id: "fields",
    title: { en: "Custom data fields", ar: "حقول بيانات مخصصة" },
    desc: {
      en: "Capture exactly the data your organization needs, not what a generic tool decided for you.",
      ar: "اجمع البيانات التي تحتاجها مؤسستك تمامًا، لا ما تقرره أداة عامة نيابةً عنك.",
    },
  },
  {
    id: "audience",
    title: { en: "Audience selection", ar: "اختيار الجمهور" },
    desc: {
      en: "Pick the right people for every event or campaign with precision. Never blast the wrong list again.",
      ar: "اختر الأشخاص المناسبين لكل فعالية أو حملة بدقة، ولا ترسل إلى القائمة الخطأ مجددًا.",
    },
  },
  {
    id: "comms",
    title: { en: "Invitations & communication", ar: "الدعوات والتواصل" },
    desc: {
      en: "Branded, bilingual, personalized: every email feels like it came from your team, not a platform.",
      ar: "بهويتك، وبلغتين، وبطابع شخصي: تبدو كل رسالة كأنها من فريقك لا من منصة.",
    },
  },
  {
    id: "reporting",
    title: { en: "Reporting & insights", ar: "التقارير والرؤى" },
    desc: {
      en: "Measure what matters: attendance, response rates and engagement across all your activity.",
      ar: "قِس ما يهم: الحضور ونسب الرد والتفاعل عبر جميع أنشطتك.",
    },
  },
  {
    id: "email",
    title: { en: "Email integration & branding", ar: "تكامل البريد والهوية" },
    desc: {
      en: "Send from your own domain with Mailgun, so every email looks and feels like it's truly from you.",
      ar: "أرسل من نطاقك الخاص عبر Mailgun، لتبدو كل رسالة وكأنها منك حقًا.",
    },
  },
];

export const workflow: { id: string; title: T; desc: T }[] = [
  { id: "organize", title: { en: "Organize", ar: "نظّم" }, desc: { en: "Clean, tagged, searchable contacts", ar: "جهات اتصال نظيفة وموسومة وقابلة للبحث" } },
  { id: "engage", title: { en: "Engage", ar: "تواصل" }, desc: { en: "Newsletters and announcements to the right segments", ar: "نشرات وإعلانات للشرائح المناسبة" } },
  { id: "events", title: { en: "Manage events", ar: "أدِر الفعاليات" }, desc: { en: "Select, invite and confirm your guests", ar: "حدّد ضيوفك وادعُهم وتأكّد من حضورهم" } },
  { id: "follow", title: { en: "Follow up", ar: "تابع" }, desc: { en: "Event-based audiences for thank-yous and next steps", ar: "جماهير من الفعاليات لرسائل الشكر والخطوات التالية" } },
  { id: "grow", title: { en: "Grow relationships", ar: "نمِّ العلاقات" }, desc: { en: "A full participation history for every contact", ar: "سجل مشاركة كامل لكل جهة اتصال" } },
];

/** Flattened helper for search/filter UIs. */
export const allFeatures = modules.flatMap((m) =>
  m.groups.flatMap((g) => g.items.map((f) => ({ ...f, module: m.id, group: g.id, groupTitle: g.title }))),
);
