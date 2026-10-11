# iNVEETO website redesign

Public marketing site for iNVEETO (event, contact and campaign management), rebuilt as a white-and-purple, bilingual (English / Arabic) Next.js app with an interactive Three.js story on the homepage.

This is the marketing site only. Login, signup and the product itself stay on `app.inveeto.com`.

## Run it

Requires Node.js 20.9+ (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /en (or /ar if the browser prefers Arabic)
npm run build      # production build (all pages are statically prerendered)
npm start          # serve the production build
npm run lint
```

Optional environment variable (`.env.local`):

```bash
# POST endpoint for the inquiry form (Formspree, a CRM webhook, your own API route…)
NEXT_PUBLIC_INQUIRY_ENDPOINT=
```

Without it, the inquiry form validates input and then opens the visitor's email app with the message pre-filled to info@inveeto.com. The form says this up front and never claims a message was delivered.

## Pages

| Route | Content |
|---|---|
| `/en`, `/ar` | Homepage: 3D hero → scroll story (Organize, Select, Invite, Confirm, Engage, unified) → modules → highlights & what's new → industries → customer stories → platform benefits → plans → FAQs → contact |
| `/[locale]/features` | Full feature catalog (54 features) with search (English + Arabic), module filter and "new only" filter |
| `/[locale]/use-cases` | All 9 industries with filter, plus "why organizations choose iNVEETO" |
| `/[locale]/use-cases/venues` | The full Venues use case |
| `/[locale]/customer-stories` | The 5 verified stories, PLEX video, team message |
| `/[locale]/pricing` | Plan limits and contact-for-pricing (see OPEN-QUESTIONS.md #1) |
| `/[locale]/contact` | Contact channels, inquiry form, feedback form link |

## Project structure

```
src/
  app/[locale]/…            routes (layout sets lang/dir per locale)
  proxy.ts                  redirects / to /en or /ar
  content/                  ALL copy and business data, EN + AR, edit here
    site.ts                   links, emails, WhatsApp, logo path, form endpoint
    home.ts                   homepage copy, story chapters, highlights, benefits
    features.ts               full feature catalog, shared capabilities, workflow
    usecases.ts               industries + Venues page
    stories.ts                verified customer stories
    plans.ts                  plan limits; `showPrices` switch for amounts
    faqs.ts                   all 12 FAQs
    ui.ts                     interface strings (nav, buttons, form messages)
  components/
    three/                    WebGL scene: formations.ts (8 node arrangements), NetworkScene.tsx, StaticNetwork.tsx (SVG fallback)
    home/                     homepage sections (HeroStory drives the scroll story)
    mocks/                    animated product demos (sample data, labelled as such)
    pages/                    inner-page components
    layout/, ui/              header, footer, logo, buttons, contact form
public/brand/inveeto-logo.png official logo, used unmodified
```

### Editing content

Every string is a `{ en, ar }` pair in `src/content`. Arabic copied from inveeto.com is marked `// AR: official`; all other Arabic is a new translation that should be reviewed by a native speaker on the team.

## Design system

Colors come from the official logo and live as CSS variables in `src/app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--brand` | `#7D5BA6` | Logo purple. Buttons, links, 3D nodes (5.36:1 on white, passes AA) |
| `--mint` | `#55D6BE` | Logo mint. Graphics and fills only (too light for text) |
| `--mint-ink` | `#0F6E5D` | Text on mint surfaces, "Checked in" status |
| `--brand-deep` | `#3D2A5C` | Display accents |
| `--ink` / `--slate` | `#1B1626` / `#58536A` | Text |
| `--mist` / `--lavender` | `#F8F6FC` / `#F0EAF8` | Section surfaces |

Typeface: Readex Pro (variable, Latin + Arabic in one family), self-hosted via `@fontsource-variable/readex-pro`. Display sizes use its width axis; Arabic drops negative tracking and gets more line height.

Stack: Next.js 16 (App Router, TypeScript), Tailwind CSS 4, HeroUI 3 (tabs, accordions, search, form fields), Three.js via React Three Fiber + Drei, GSAP ScrollTrigger (scroll story), Motion (UI transitions), Lucide icons.

## The 3D story

One WebGL canvas sits behind the hero and the five chapters. The same nodes move through eight arrangements as you scroll (`components/three/formations.ts`): a living network with three module hubs, scattered data, tidy address-book clusters, a selected segment, guests orbiting an event, an attendance board where checked-in guests turn mint, campaign rings, and the unified platform.

Performance and accessibility:
- Loaded after first paint; renders only while the story is on screen.
- Fewer nodes and cheaper materials on small screens, slow CPUs or Save-Data; resolution drops automatically if frame rate falls.
- No WebGL → a static SVG of the same network.
- `prefers-reduced-motion` → formations snap, nothing drifts, demos show their final state.
- The canvas is decorative (`aria-hidden`); all content is real HTML.

## Inquiry form

`POST /api/inquiry` validates input, checks the request origin, rate-limits by IP (5 per 10 minutes) and traps spam bots (a honeypot field plus a minimum fill time). The form only appears once a delivery provider is configured in the Vercel environment variables:

- **Email via Resend:** `INQUIRY_RESEND_API_KEY`, `INQUIRY_FROM`, and optionally `INQUIRY_TO` (default info@inveeto.com)
- **Webhook:** `INQUIRY_WEBHOOK_URL` (must be https) and optionally `INQUIRY_WEBHOOK_SECRET`, which adds an HMAC-SHA256 signature in the `X-Inveeto-Signature` header
- `INQUIRY_ALLOWED_ORIGINS` (optional, comma-separated) for any extra allowed origins

Redeploy after setting these. Until then, the contact page shows only the official email and WhatsApp channels.

See `BUSINESS-APPROVAL.md` for the items still awaiting a business decision before launch.
