/**
 * The industries the contact form offers, in display order.
 *
 * ITS OWN MODULE, not an export from the route. The form is a client component
 * and the route is server-only; importing the list from the route would pull
 * `resend` and the rate limiter into the browser bundle. One list, two
 * consumers, so a value the select can produce is always a value the schema
 * accepts.
 */
export const INDUSTRIES = [
  "Insurance",
  "Financial services",
  "Fintech",
  "Retail and consumer goods",
  "Wellness and healthcare",
  "Fragrance and beauty",
  "Logistics and supply chain",
  "Real estate and construction",
  "Professional services",
  "Technology and SaaS",
  "Manufacturing",
  "Hospitality",
  "Education",
  "Other",
] as const;
