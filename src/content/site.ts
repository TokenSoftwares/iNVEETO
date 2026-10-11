/**
 * Business destinations and contact details.
 * Source: inveeto.com/en (header, footer, Contact Us) and app.inveeto.com/pricing.html,
 * audited 11 Oct 2026. Change URLs here, never inline in components.
 */
export const site = {
  name: "iNVEETO",
  url: "https://inveeto.com",

  /**
   * Official logo, supplied by iNVEETO and used unmodified. Colors: purple #7D5BA6, mint #55D6BE.
   * Favicon: the official icon published on inveeto.com, also unmodified.
   */
  logo: {
    full: "/brand/inveeto-logo.png",
    icon: "https://inveeto.com/wp-content/uploads/2023/09/Icon-300ppi-PNG-format.png",
  },

  links: {
    login: "https://app.inveeto.com",
    /**
     * Trial signup. The live site uses three different trial destinations:
     *   - homepage hero + Features/Use Cases CTAs → https://app.inveeto.com/pricing.html
     *   - plan cards + "Try it free"           → https://app.inveeto.com/selectpackage
     *   - pricing page "Start your free trial" → https://app.inveeto.com/registration
     * We point every trial CTA at the most direct one. See OPEN-QUESTIONS.md #2.
     */
    trial: "https://app.inveeto.com/registration",
    selectPackage: "https://app.inveeto.com/selectpackage",
    pricingLive: "https://app.inveeto.com/pricing.html",
    feedbackForm:
      "https://docs.google.com/forms/d/e/1FAIpQLScb_0U-svLEFp5vZCKigKIbmgdTr2Lvu0NmNFBdP_cUj7bzxg/viewform?usp=sf_link",
    privacy: "https://inveeto.com/wp-content/uploads/2024/03/iNVEETOs-Privacy-Policy-.pdf",
    terms: "https://inveeto.com/wp-content/uploads/2024/03/iNVEETOs-Terms-and-Conditions.pdf",
    linkedin: "https://www.linkedin.com/company/inveeto/",
  },

  contact: {
    general: "info@inveeto.com",
    support: "support@inveeto.com",
    sales: "sales@inveeto.com",
    whatsappDisplay: "+962 79 784 0535",
    whatsappUrl: "https://wa.me/962797840535",
  },

  // Inquiry form delivery is configured with server-side environment variables;
  // see src/lib/inquiry/delivery.ts and README "Inquiry form".
} as const;
