import type { T } from "@/content/i18n";

/**
 * ONE sample event used by every homepage demo, so the numbers tell a consistent story.
 * All of it is illustrative sample data (each demo window is labelled as such).
 *
 *   Address book            1,248 contacts
 *   Select                  "Partners" who attended last year → 300 guests
 *                           classified as 12 VIP + 8 Speakers + 280 Guests        (= 300)
 *   Invite / RSVP           247 confirmed + 38 pending + 15 apologized            (= 300)
 *   Confirm (mid-morning)   183 checked in + 64 not yet arrived                   (= 247 confirmed)
 *                           + 4 walk-ins registered on the spot
 *   Engage (after event)    232 attendees = 226 confirmed guests + 6 walk-ins
 *                           opened 186 → 205 after resending to non-openers
 *                           responded 92 (≤ opened), pledged 17 (≤ responded), follow-up 23
 */
export const sample = {
  event: { en: "Annual Conference", ar: "المؤتمر السنوي" } as T,
  contacts: 1248,
  selected: 300,
  roles: { vip: 12, speaker: 8, guest: 280 },
  rsvp: { confirmed: 247, pending: 38, apologized: 15 },
  checkin: { before: 182, after: 183, walkIns: 4 },
  attendance: { confirmedAttended: 226, walkIns: 6 },
  campaign: { opened: 186, openedAfterResend: 205, responded: 92, pledged: 17, followUp: 23 },
} as const;

export const attendees = sample.attendance.confirmedAttended + sample.attendance.walkIns; // 232

export type Role = "vip" | "speaker" | "guest";
export const roleLabel: Record<Role, T> = {
  vip: { en: "VIP", ar: "شخصية مهمة" },
  speaker: { en: "Speaker", ar: "متحدث" },
  guest: { en: "Guest", ar: "ضيف" },
};

export const tagLabel = {
  partners: { en: "Partners", ar: "شركاء" },
  academia: { en: "Academia", ar: "أكاديميون" },
  government: { en: "Government", ar: "حكومة" },
  donors: { en: "Donors", ar: "مانحون" },
  venues: { en: "Venues", ar: "منشآت" },
  business: { en: "Business", ar: "قطاع خاص" },
} satisfies Record<string, T>;
export type Tag = keyof typeof tagLabel;

/**
 * Sample people. Names come from the samples on inveeto.com; organizations are generic so
 * no real affiliation is implied. `selected` follows from the tags: only "Partners" are invited.
 */
export const people: { id: string; en: string; ar: string; org: T; initials: string; tags: Tag[]; role: Role }[] = [
  { id: "layla", en: "Layla Nasser", ar: "ليلى ناصر", org: { en: "City University", ar: "جامعة المدينة" }, initials: "LN", tags: ["partners", "academia"], role: "vip" },
  { id: "ahmed", en: "Ahmed Al-Rashid", ar: "أحمد الراشد", org: { en: "Ministry of Trade", ar: "وزارة التجارة" }, initials: "AR", tags: ["partners", "government"], role: "speaker" },
  { id: "sara", en: "Sara Khalil", ar: "سارة خليل", org: { en: "Development agency", ar: "وكالة تنموية" }, initials: "SK", tags: ["partners", "donors"], role: "vip" },
  { id: "omar", en: "Omar Mansour", ar: "عمر منصور", org: { en: "Grand hotel", ar: "فندق جراند" }, initials: "OM", tags: ["venues"], role: "guest" },
  { id: "rania", en: "Rania Haddad", ar: "رانيا حداد", org: { en: "Chamber of Commerce", ar: "غرفة التجارة" }, initials: "RH", tags: ["partners", "business"], role: "guest" },
];

export const isInvited = (p: (typeof people)[number]) => p.tags.includes("partners");

/** Locale-aware number formatting (Latin digits in both languages, matching inveeto.com). */
export const fmt = (n: number) => n.toLocaleString("en-US");
