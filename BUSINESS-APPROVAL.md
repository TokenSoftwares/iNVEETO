# Items requiring business approval before launch

1. **Pricing policy.** The original homepage listed Individual $12.99 / Enterprise $249.99; the live app pricing page differs. The site currently shows "Pricing on request" (`pricingPolicy = "contact-sales"` in `src/content/plans.ts`). To publish prices, confirm the correct figures, update `plans.ts`, and set `pricingPolicy = "published"`.
2. **Trial link.** "Start your free trial" points to `app.inveeto.com/registration`. Confirm this is the right sign-up URL and that the 3-month trial needs no credit card.
3. **Arabic slogan.** Corrected to «نظّم. حدّد. ادعُ. تأكّد.» (the imperative of دعا is ادعُ). Confirm with the brand owner.
4. **Arabic brand spelling.** The site uses «إنفيتو». Confirm the official spelling.
5. **Inquiry form delivery.** The form is hidden until a provider is configured on Vercel: either `INQUIRY_RESEND_API_KEY` + `INQUIRY_FROM` (+ optional `INQUIRY_TO`, default info@inveeto.com), or `INQUIRY_WEBHOOK_URL` (https) + `INQUIRY_WEBHOOK_SECRET`. Redeploy after setting these. Choose the provider and recipient, and approve the privacy-note wording.
6. **Email-provider claims.** The FAQ says users can send through their own SMTP, Mailgun or Mailchimp. Confirm these are still supported.
7. **Customer stories.** The "What they used" chips on each story are drawn from the original copy. Confirm with each customer, along with the published metrics and quotes.
8. **Demo sample data.** The animated demos use invented sample names and figures (all internally consistent). Confirm it's acceptable to show these as illustrative.
9. **Images and favicon.** Some industry and story images are stock or remote. Confirm the rights, and supply an official favicon (the logo was not modified to make one).
