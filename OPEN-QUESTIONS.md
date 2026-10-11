# Open questions

Things the audit (11 Oct 2026) could not settle from public pages. Each is isolated in one place in the code so it can be changed quickly.

1. **Pricing: fixed prices or contact sales?**
   The homepage pricing table shows Individual $12.99/year and Enterprise $249.99/year. The Pricing link everywhere goes to app.inveeto.com/pricing.html, which shows no prices and says "Get in touch to learn about pricing". Following the live pricing page, the new site shows plan limits and "pricing on request".
   → To show the amounts: set `showPrices = true` in `src/content/plans.ts`.
   Also: both plans are labelled "Most Popular" on the live homepage; the new site labels neither.

2. **Which signup URL should trial buttons use?**
   The live site uses three: `/pricing.html` (homepage hero, Features, Use Cases), `/selectpackage` (plan cards, "Try it free"), `/registration` (pricing page). The new site uses `/registration` for "Start your free trial" and `/selectpackage` for plan-specific trial buttons.
   → `site.links.trial` in `src/content/site.ts`.

3. **Email providers: Mailgun only, or Mailgun + Mailchimp + SMTP?**
   Homepage feature copy says invitations are "powered by MailGun integration" and Features says "Send from your own domain with MailGun", while the FAQs describe three options (own SMTP, Mailgun, Mailchimp). The new site follows the FAQs where it names providers. Please confirm all three are live.

4. **Tourism & Hospitality page returns 404.**
   https://inveeto.com/en/usecases/tourism-hospitality/ is linked in the brief and from the Use Cases menu but no longer exists; Venues appears to replace it. Hotels & Hospitality on the use-cases page now links to Venues. If there is separate hospitality content, it was not reachable.

5. **Customer-stories counters.**
   The live page shows "Organizations / Attendees managed / Sectors" counters that render as 0 without JavaScript, so their real values are unknown. They are not reproduced. Send the numbers and they can be added.

6. **Self-hosting customer photos and videos.**
   Story photos and the PLEX / team videos are loaded from inveeto.com/wp-content. If that site is retired or blocks hotlinking, copy them into `/public` and update `src/content/stories.ts`. Industry photos are the same Unsplash images the live site uses.

7. **Arabic tagline wording.**
   The official Arabic tagline is "نظّم. حدّد. ادعو. تأكّد". The standard imperative is "ادعُ" (as used elsewhere in the new Arabic copy). It is kept exactly as published; confirm whether to keep "ادعو".

8. **Media institutions image.** The live page reuses the event-planner photo for Media. Kept as-is; a dedicated image would help.

9. **Arabic translations need review.**
   inveeto.com/ar serves most body copy in English (features page, 11 of 12 FAQs, venues, feature blocks). All Arabic not marked `// AR: official` in `src/content` is a new translation.

10. **Inquiry form delivery.**
    The live "Send Inquiry" anchor (#contact-form) has no visible form. The new form opens the visitor's email app unless `NEXT_PUBLIC_INQUIRY_ENDPOINT` is set to a real endpoint. Decide where inquiries should go (email service, CRM).

11. **Favicon.** Uses the official icon URL on inveeto.com. If you want it self-hosted, add the official square icon file to `/public` (the logo itself is not altered or cropped).

12. **"Book a demo" destination.** The live site's "Book a Demo" goes to the contact section. The new site sends it to /contact. A calendar booking link could replace it.
