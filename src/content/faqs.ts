import type { T } from "./i18n";

/**
 * All 12 FAQs from inveeto.com/en/#faqs, in the original order, answers unchanged in meaning.
 * Arabic: only "What is the difference between an event and a campaign?" has an official
 * Arabic question on inveeto.com/ar; every other Arabic string here is a new translation.
 */
export type Faq = { id: string; q: T; a: T };

export const faqIntro: T = {
  en: "Couldn't find your question below? Email it to us at",
  ar: "إذا لم تتمكن من العثور على إجابة لسؤالك أدناه، فلا تتردد في إرسال سؤالك إلينا عبر البريد الإلكتروني على", // AR: official
};

export const faqs: Faq[] = [
  {
    id: "arabic",
    q: { en: "Does iNVEETO support the Arabic language?", ar: "هل يدعم إنفيتو اللغة العربية؟" },
    a: {
      en: "Yes, iNVEETO provides a fully supported Arabic interface.",
      ar: "نعم، يوفر إنفيتو واجهة عربية مدعومة بالكامل.",
    },
  },
  {
    id: "unsubscribe",
    q: {
      en: "Who is responsible for providing an unsubscribe option in emails?",
      ar: "من المسؤول عن توفير خيار إلغاء الاشتراك في الرسائل الإلكترونية؟",
    },
    a: {
      en: "The account owner is responsible for including a valid unsubscribe link in any email they send through iNVEETO. This helps recipients opt out of future communications and supports compliance with applicable privacy and email regulations, such as GDPR and similar laws.",
      ar: "صاحب الحساب مسؤول عن تضمين رابط صالح لإلغاء الاشتراك في أي رسالة يرسلها عبر إنفيتو. يساعد ذلك المستلمين على إيقاف استلام الرسائل المستقبلية، ويدعم الامتثال لأنظمة الخصوصية والبريد الإلكتروني المعمول بها، مثل اللائحة العامة لحماية البيانات (GDPR) والقوانين المشابهة.",
    },
  },
  {
    id: "mailchimp",
    q: { en: "Can I connect my Mailchimp account with iNVEETO?", ar: "هل يمكنني ربط حسابي في Mailchimp بإنفيتو؟" },
    a: {
      en: "Yes, iNVEETO is integrated with Mailchimp. Connect your own Mailchimp account and your existing campaign templates are imported automatically. You can then create and send campaigns and invitation emails directly from iNVEETO using your own domain.",
      ar: "نعم، إنفيتو متكامل مع Mailchimp. اربط حسابك الخاص وسيتم استيراد قوالب حملاتك الحالية تلقائيًا، ثم أنشئ الحملات ورسائل الدعوة وأرسلها مباشرة من إنفيتو باستخدام نطاقك الخاص.",
    },
  },
  {
    id: "mailgun",
    q: { en: "Can I connect my Mailgun account with iNVEETO?", ar: "هل يمكنني ربط حسابي في Mailgun بإنفيتو؟" },
    a: {
      en: "Yes, iNVEETO is integrated with Mailgun. Connect your own Mailgun account and your existing campaign templates are imported automatically. You can then create and send campaigns and invitation emails directly from iNVEETO using your own domain.",
      ar: "نعم، إنفيتو متكامل مع Mailgun. اربط حسابك الخاص وسيتم استيراد قوالب حملاتك الحالية تلقائيًا، ثم أنشئ الحملات ورسائل الدعوة وأرسلها مباشرة من إنفيتو باستخدام نطاقك الخاص.",
    },
  },
  {
    id: "event-vs-campaign",
    q: { en: "What is the difference between an event and a campaign?", ar: "ما الفرق بين الفعالية والحملة؟" }, // AR q: official
    a: {
      en: "An event is a scheduled gathering, virtual or in-person. A campaign is a communication tool for announcements or fundraising.",
      ar: "الفعالية لقاء مجدول، افتراضي أو حضوري. أما الحملة فهي أداة تواصل للإعلانات أو جمع التبرعات.",
    },
  },
  {
    id: "event-types",
    q: {
      en: "What types of events can iNVEETO cover, from an access-control perspective?",
      ar: "ما أنواع الفعاليات التي يغطيها إنفيتو من حيث التحكم في الدخول؟",
    },
    a: {
      en: "iNVEETO can cover all types of events, from fully controlled to completely open events.",
      ar: "يغطي إنفيتو جميع أنواع الفعاليات، من الفعاليات المحكومة بالكامل إلى الفعاليات المفتوحة.",
    },
  },
  {
    id: "customize-invitations",
    q: { en: "Can I customize invitations?", ar: "هل يمكنني تخصيص الدعوات؟" },
    a: {
      en: "Yes. iNVEETO supports extensive invitation customization: choose from multiple template types, add custom header and footer images, and personalize the invitation description with a rich text editor.",
      ar: "نعم. يدعم إنفيتو تخصيصًا واسعًا للدعوات: اختر من بين عدة أنواع من القوالب، وأضف صور ترويسة وتذييل مخصصة، وخصّص وصف الدعوة باستخدام محرر نصوص متقدم.",
    },
  },
  {
    id: "public",
    q: {
      en: "Can I invite the public and collect simple data about them?",
      ar: "هل يمكنني دعوة الجمهور وجمع بيانات بسيطة عنهم؟",
    },
    a: {
      en: "Yes. iNVEETO supports a public registration URL that anyone can use to register for an event, and you can add up to five custom fields per event.",
      ar: "نعم. يدعم إنفيتو رابط تسجيل عام يمكن لأي شخص استخدامه للتسجيل في الفعالية، ويمكنك إضافة ما يصل إلى خمسة حقول مخصصة لكل فعالية.",
    },
  },
  {
    id: "own-domain",
    q: { en: "Can I send emails from my own domain?", ar: "هل يمكنني إرسال الرسائل من نطاقي الخاص؟" },
    a: {
      en: "Yes, through three options: configure your own SMTP, connect your own Mailgun account, or connect your Mailchimp account with iNVEETO.",
      ar: "نعم، عبر ثلاثة خيارات: إعداد خادم SMTP خاص بك، أو ربط حسابك في Mailgun، أو ربط حسابك في Mailchimp بإنفيتو.",
    },
  },
  {
    id: "self-checkin",
    q: {
      en: "Can I use self check-in alongside manual check-in?",
      ar: "هل يمكنني استخدام تسجيل الحضور الذاتي إلى جانب التسجيل اليدوي؟",
    },
    a: { en: "Yes, you can use both at the same time.", ar: "نعم، يمكنك استخدام الطريقتين في الوقت نفسه." },
  },
  {
    id: "newsletters",
    q: { en: "Can I send newsletters through iNVEETO?", ar: "هل يمكنني إرسال نشرات إخبارية عبر إنفيتو؟" },
    a: {
      en: "Yes. You can create and send newsletters using campaign templates.",
      ar: "نعم. يمكنك إنشاء النشرات الإخبارية وإرسالها باستخدام قوالب الحملات.",
    },
  },
  {
    id: "invitation-vs-attendance",
    q: {
      en: "What is the difference between the event invitation list and the attendance list?",
      ar: "ما الفرق بين قائمة دعوات الفعالية وقائمة الحضور؟",
    },
    a: {
      en: "Invitation lists track RSVPs, while attendance lists show who actually attended the event.",
      ar: "تتابع قوائم الدعوات الردود على الدعوة، بينما تُظهر قوائم الحضور من حضر الفعالية فعليًا.",
    },
  },
];
